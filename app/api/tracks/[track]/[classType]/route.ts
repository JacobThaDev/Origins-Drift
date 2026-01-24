import { TracksTypes } from "@/utils/types/TracksTypes";
import db from "@/models";
import { Sequelize } from "sequelize";
import { revalidateTag, unstable_cache } from "next/cache";
import { LeadersTypes } from "@/utils/types/LeadersTypes";
import { formatNumber } from "@/utils/Functions";
import { getCachedTrack, getCachedUser, getTrackData, getUserRecord } from "@/app/api/data";
import { UsersTypes } from "@/utils/types/UsersTypes";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SessionsTypes } from "@/utils/types/SessionsTypes";
import { NextRequest } from "next/server";
import { z } from 'zod';

type RouteContext = {
    params: Promise<{ track:string, classType: string }>;
};

/**
 * Get a specific tracks details
 * @param req 
 * @param res 
 * @returns 
 */
// eslint-disable-next-line
export async function GET(req: any, { params } : RouteContext) {
    try {
        const { track, classType }  = await params;

        if (classType != "a" && classType != "s1") {
            return Response.json({
                error: "Invalid car class. Must be either a or s1"
            }, { status: 422 });
        }

        const trackData:TracksTypes|undefined = await getTrackData(track, classType);

        if (!trackData) {
            return Response.json({
                error: "Track not found."
            });
        }

        return Response.json(trackData);
    } catch (e:any) {
        console.log(e.message);
        return Response.json({
            error: e.message
        });
    }
}

/**
 * Post request schema
 */
const ScoreSchema = z.object({
    score: z.coerce.number().positive(),
    proof_url: z.url().optional(),
    delete_hash: z.string().optional(),
});

type ScoreInput = z.infer<typeof ScoreSchema>;

/**
 * POST endpoint for submitting a score for a specific track
 * @param req 
 * @returns 
 */
// eslint-disable-next-line
export async function POST(req: NextRequest, { params }: RouteContext) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        }) as SessionsTypes;

        if (!session || session.user.banned) {
            return Response.json({ 
                error: "Unauthorized"
            }, { status: 401 });
        }

        const json   = await req.json();
        const result = ScoreSchema.safeParse(json);

        if (!result.success) { // invalid post data types
            return Response.json({
                error: result.error.message
            }, { status: 400 })
        }
        
        // grab the user from the session
        const user_id = session.session.userId;
        const { score, proof_url, delete_hash }:ScoreInput = result.data;
        const { track, classType } = await params;

        // get the specific track data
        const trackData:TracksTypes|undefined = await getCachedTrack(track);

        if (!trackData || trackData.error) {
            return Response.json({
                error: trackData ? trackData.error : "Track not found."
            });
        }

        // now we just add a new score
        const score_result = await db.scores.create({
            user_id: user_id,
            game: trackData.game,
            track: trackData.id,
            class: classType.toUpperCase(),
            score: score,
            proof_url: proof_url,
            proof_delete_hash: delete_hash
        }) as LeadersTypes;

        if (!score_result) {
            return Response.json({
                error: "Failed to create new score."
            });
        }

        // do this after securing the score on record. 
        const personal_best = await getUserRecord(user_id, trackData.id, classType);
        let isNewPb = false;

        if (!personal_best) {
            personal_best.score = score;
        }

        const difference = score - (personal_best ? personal_best.score : 0);
        isNewPb = difference > 0;

        if (isNewPb) {
            // do not send this async. if it fails in the background
            // it's not that big of deal. record is already set. 
            sendWebhook(trackData, score, personal_best, session.user, classType, proof_url);

            // user has a new record so cache needs updated.
            revalidateTag(`user-record-${trackData.id}-${classType.toUpperCase()}-${user_id}`);
        }

        /**
         * Now we need to update the caches so it can show the new score
         * across the website properly
         */
        revalidateTag(`leaders-${trackData.id}-${classType.toUpperCase()}`);
        revalidateTag(`recent-${trackData.id}-${classType.toUpperCase()}`);
        revalidateTag(`tracks-data-${classType}`);

        return Response.json({
            success: true,
            message: "Your score has been submitted.",
            new_pb: isNewPb,
            result: score_result
        });
    } catch (e:any) {
        console.log(e);
        return Response.json({
            error: e.message
        });
    }
}

const sendWebhook = async(trackData:TracksTypes, score:number, pb:{ score: number }, user:UsersTypes, classType:string, proof_url:string|undefined) => {
    try {
        if (!trackData.webhook_url) {
            return;
        }

        const difference = score - (pb ? pb.score : 0);

        const embedPayload = {
            embeds: [
                {
                    author: {
                        name: trackData.name+" | Origins Drift",
                        url: process.env.PREVIEW_URL + "/track/"+trackData.short_name
                    },
                    //title: "🏆 Score Added",
                    description: 
                        (score > pb.score 
                            ? `**<@${user.Account.accountId}>** has hit a new ✨personal best✨ of **${formatNumber(score)}** 🥳!`
                            : `**<@${user.Account.accountId}>** has posted a score of **${formatNumber(score)}**!`),
                    fields: [
                        {
                            name: "Class",
                            value: classType.toUpperCase() + (classType.toUpperCase() == "A" ? "-800" : "-900"),
                            inline: true,
                        },
                        {
                            name: "Score",
                            value: formatNumber(score),
                            inline: true,
                        },
                        {
                            name: "Personal Best",
                            value: formatNumber(pb.score),
                            inline: true,
                        },
                        {
                            name: "Performance",
                            value: `${difference > 0 ? "⬆️ +" : "⬇️ "}`+formatNumber(difference),
                            inline: true,
                        },
                    ],
                    thumbnail: {
                        url: process.env.PREVIEW_URL + trackData.track_image,
                    },
                    footer: {
                        text: "Origins Drift Club"
                    },
                    ...(proof_url && { image: { url: proof_url } }),
                    timestamp: new Date().toISOString(),
                }
            ]
        };

        const discordRes = await fetch(trackData.webhook_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(embedPayload),
        });

        if (!discordRes.ok) {
            const errorText = await discordRes.text();
            console.error("Discord Webhook Error:", errorText);
            return Response.json({
                error: "Webhook error: "+errorText
            })
        }

        if (difference > 0) {
            // update the users record
            revalidateTag(`user-record-${trackData.id}-${classType.toUpperCase()}-${user.id}`);
        }
    } catch(err:any) {
        console.error(err);
    }
}