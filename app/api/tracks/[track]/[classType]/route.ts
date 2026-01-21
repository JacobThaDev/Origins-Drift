import { TracksTypes } from "@/utils/types/TracksTypes";
import db from "@/models";
import { Sequelize } from "sequelize";
import { revalidateTag, unstable_cache } from "next/cache";
import { LeadersTypes } from "@/utils/types/LeadersTypes";
import { formatNumber } from "@/utils/Functions";
import { getCachedTrack, getCachedUser, getUserRecord } from "@/app/api/data";
import { UsersTypes } from "@/utils/types/UsersTypes";

const getTrackData = (track:string, classType:string) => unstable_cache(
    async () => {
        const trackData = await db.tracks.findOne({
            attributes: {
                exclude: ['webhook_url'],
                include: [
                    // Subquery to get the MAX score for THIS specific track and class
                    [
                        Sequelize.literal(`(
                            SELECT MAX(CAST(score AS SIGNED))
                            FROM scores AS s
                            WHERE s.track = tracks.id
                                and s.class = '${classType}'
                        )`), 'top_score'
                    ],
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(DISTINCT user_id)
                            FROM scores AS s
                            WHERE s.track = tracks.id 
                                and s.class = '${classType}'
                        )`), 'user_count'
                    ],
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(DISTINCT id)
                            FROM scores AS s
                            WHERE s.track = tracks.id 
                                and s.class = '${classType}'
                        )`), 'entries'
                    ]
                ]
            },
            where: parseInt(track) 
                ? { id: track, } 
                : { short_name: track },
            include: {
                model: db.games,
                as: "Game"
            }
        });
        
        return trackData;
    },
    ['track-data', parseInt(track) ? String(track) : track.toLowerCase(), classType], {
        revalidate: 3600,
        tags: [
            'track-data',
            `track-data-${parseInt(track) ? String(track) : track.toLowerCase()}`,
            `track-data-${parseInt(track) ? String(track) : track.toLowerCase()}-${classType}`,
        ]
    }
)();


/**
 * Get a specific tracks details
 * @param req 
 * @param res 
 * @returns 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const bodyData  = await res.params;
        const trackName = bodyData?.track.toLowerCase();
        const classType = bodyData?.classType.toLowerCase();

        if (classType != "a" && classType != "s1") {
            return Response.json({
                error: "Invalid car class. Must be either a or s1"
            });
        }

        const trackData:TracksTypes|undefined = await getTrackData(trackName, classType);

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
 * POST endpoint for submitting a score for a specific track
 * @param req 
 * @returns 
 */
// eslint-disable-next-line
export async function POST(req: any, res:any) {
    try {
        const { 
            user_id, game, track:trackName, score, proof_url, delete_hash
        }:RequestTypes = await req.json();

        const bodyData  = await res.params;
        const classType = bodyData?.classType.toLowerCase();

        if (!user_id || !game || !trackName || !classType || !score) {
             return Response.json({
                error: "Missing required parameters."
            });
        }

        if (classType.toUpperCase() != "A" && classType.toUpperCase() != "S1") {
            return Response.json({
                error: "Invalid class type. Must be A or S1."
            });
        }

        if (score < 0) {
             return Response.json({
                error: "Score can not be less than 0."
            });
        }

        const user:UsersTypes = await getCachedUser(user_id);

        if (!user) {
            return Response.json({
                error: "User not found."
            });
        }

        if (user.banned) {
            return Response.json({
                error: "You are blocked from submitting new scores."
            });
        }
        
        const trackData:TracksTypes|undefined = await getCachedTrack(game, trackName);

        if (!trackData || trackData.error) {
            return Response.json({
                error: trackData ? trackData.error : "Track not found."
            });
        }
        
        let new_pb = false;

        if (trackData.webhook_url) {
            const personal_best = await getUserRecord(user.id, trackData.id, classType);
            
            if (!personal_best) {
                personal_best.score = score;
            }
            
            const difference = score - (personal_best ? personal_best.score : 0);
            new_pb = difference > 0;

            if (new_pb) {
                try {
                    const embedPayload = {
                        embeds: [
                            {
                                author: {
                                    name: trackData.name+" | Origins Drift",
                                    url: process.env.PREVIEW_URL + "/track/"+trackData.short_name
                                },
                                //title: "🏆 Score Added",
                                description: 
                                    (score > personal_best.score 
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
                                        value: formatNumber(personal_best.score),
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
                    
                    // send the embed payload
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
                        revalidateTag(`user-record-${trackData.id}-${classType.toUpperCase()}-${user_id}`);
                    }
                } catch(err:any) {
                    console.log(err);
                    return Response.json({
                        error: err.message
                    }, { status: 500 });
                }
            }
        }

        const result = await db.scores.create({
            user_id: user.id,
            game: trackData.game,
            track: trackData.id,
            class: classType.toUpperCase(),
            score: score,
            proof_url: proof_url,
            proof_delete_hash: delete_hash
        }) as LeadersTypes;

        if (!result) {
            return Response.json({
                error: "Failed to insert new entry."
            });
        }

        //update the leaderboards for this specific track and class
        revalidateTag(`leaders-${trackData.id}-${classType.toUpperCase()}`);
        //update the recent entries cache
        revalidateTag(`recent-${trackData.id}-${classType.toUpperCase()}`);
        
        if (new_pb) // only revalidate if user has a new pb for this track and class
            revalidateTag(`user-record-${trackData.id}-${classType.toUpperCase()}-${user_id}`);

        return Response.json({
            success: true,
            message: "Your score has been submitted.",
            new_pb: new_pb,
            result: result
        });
    } catch (e:any) {
        console.log(e);
        return Response.json({
            error: e.message
        });
    }
}

interface RequestTypes {
    user_id: string,
    game: string,
    track: string,
    class: string,
    score: number,
    proof_url: string,
    delete_hash: string;
}