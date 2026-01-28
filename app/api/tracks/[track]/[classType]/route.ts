import { TracksTypes } from "@/utils/types/TracksTypes";
import db from "@/models";
import { revalidateTag,  } from "next/cache";
import { LeadersTypes } from "@/utils/types/LeadersTypes";
import { formatNumber } from "@/utils/Functions";
import { getTrackByName, getTrackByNameWithHook, getUserRecord } from "@/app/api/data";
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

        const trackData:TracksTypes|undefined = await getTrackByName(track, classType);

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

        if (!session.discord || !session.discord.roles.includes("1326527827008421918")) {
            return Response.json({ 
                error: "Only club members can submit scores."
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
        const trackData:TracksTypes|undefined = await getTrackByNameWithHook(track);

        if (!trackData || trackData.error) {
            return Response.json({
                error: trackData ? trackData.error : "Track not found."
            });
        }

        // grab original record
        let personal_best = await getUserRecord(user_id, score, trackData.id, classType);

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

        if (!personal_best) {
            personal_best = { score: 0, rank: 0 };
        }

        const pb = personal_best.score;
        const isNewPb = score > pb;

        if (isNewPb) {
            sendWebhook(trackData, score, personal_best, session.user, classType, proof_url);
            // user has a new record so cache needs updated.
            revalidateTag(`user-record-${trackData.id}-${classType.toLowerCase()}-${user_id}`);
        }

        /**
         * Now we need to update the caches so it can show the new score
         * across the website properly
         */
        revalidateTag(`track-data-${track.toLowerCase()}-${classType.toLowerCase()}`);
        revalidateTag(`tracks-data-${classType.toLowerCase()}`);
        revalidateTag(`leaders-${trackData.id}-${classType.toUpperCase()}`);
        revalidateTag(`user-recent-${user_id}`);

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

const sendWebhook = async(trackData:TracksTypes, score:number, pb:{ score: number, rank: number }, user:UsersTypes, classType:string, proof_url:string|undefined) => {
    try {
        if (!trackData.webhook_url) {
            return null;
        }

        const difference = score - (pb ? pb.score : 0);

        const embedPayload = {
            embeds: [
                {
                    // Use the user's name as the author to make it feel personal
                    author: {
                        name: `${trackData.name} Circuit`,
                        icon_url: user.image, // If available
                        url: `${process.env.PREVIEW_URL}/track/${trackData.short_name}`,
                    },
                    title: `${user.name} reached a New Personal Best!`,
                    ...(proof_url && { 
                        image: { 
                            url: proof_url 
                        } 
                    }),
                    url: `${process.env.PREVIEW_URL}/profile/${user.discord_name}`,
                    color: 0xF1C40F, // Gold color for a PB
                    // Place the main achievement front and center
                    description: `## 🏆 ${formatNumber(score)}`,
                    fields: [
                        {
                            name: "Class",
                            value: `\`${classType.toUpperCase()}${classType.toUpperCase() === "A" ? "-800" : "-900"}\``,
                            inline: true,
                        },
                        {
                            name: "Previous Best",
                            value: formatNumber(pb.score),
                            inline: true,
                        },
                        {
                            name: "Imrovement",
                            value: `${difference > 0 ? "⬆️ +" : "⬇️ "}`+formatNumber(difference),
                            inline: true,
                        },
                        {
                            name: `Track Rank (${classType.toUpperCase()}-Class)`,
                            value: "#"+formatNumber(pb.rank + 1),
                            inline: true,
                        },
                    ],
                    thumbnail: {
                        url: process.env.PREVIEW_URL + trackData.track_image,
                    },
                    footer: {
                        text: "Origins Drift Club • Keep Drifting!",
                    },
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

            return {
                error: "Webhook error: "+errorText
            }
        }

        return discordRes;
    } catch(err:any) {
        console.error(err);
    }
}