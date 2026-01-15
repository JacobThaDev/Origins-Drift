import { getCachedTrack, getUserRecord } from '@/app/api/data';
import { getCachedUser } from '@/app/api/profile/route';
import db from '@/models/index';
import { formatNumber } from '@/utils/Functions';
import { LeadersTypes } from '@/utils/types/LeadersTypes';
import { TracksTypes } from '@/utils/types/TracksTypes';
import { UsersTypes } from '@/utils/types/UsersTypes';
import { revalidateTag } from 'next/cache';

/**
 * Get all users for game mode
 * @param req 
 * @returns 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const bodyData  = await res.params;
        const gameType  = bodyData?.game.toLowerCase().replace("_", " ");
        const trackName = bodyData?.trackName.toLowerCase().replace("_", " ");
        
        const trackData:TracksTypes|undefined = await db.tracks.findOne({
            attributes: ["id", "name", "short_name", "length", "game", "favorite", "track_image"],
            where: {
                short_name: trackName
            },
            include: {
                model: db.games,
                as: "Game",
                where: { symbol: gameType }
            }
        });

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
            user_id, game, track:trackName, class:classType, score, proof_url, delete_hash
        }:RequestTypes = await req.json();

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

        revalidateTag(`track-${game.toUpperCase()}-${trackName.toLowerCase()}`);
        
        const trackData:TracksTypes|undefined = await getCachedTrack(game, trackName);

        if (!trackData || trackData.error) {
            return Response.json({
                error: trackData ? trackData.error : "Track not found."
            });
        }

        if (trackData.webhook_url) {
            let new_record:boolean = false;
            let old_score = 0;

            let { max_score }:{ max_score: number } = await getUserRecord(user.id, trackData.id, classType.toUpperCase());
            
            if (!max_score)
                max_score = score;

            const broken = score > max_score;

            if (broken) {
                old_score  = max_score;
                new_record = true;
                revalidateTag(`user-record-${trackData.id}-${classType.toUpperCase()}-${user_id}`);
            }

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
                                (new_record 
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
                                    name: new_record ? "Previous Record" : "Record",
                                    value: formatNumber(new_record ? old_score : (max_score ? max_score : score)),
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
            } catch(err:any) {
                console.log(err);
                return Response.json({
                    error: err.message
                }, { status: 500 });
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
        

        return Response.json({
            success: true,
            message: "Your score has been submitted.",
            result: result
        });
    } catch (e:any) {
        console.log(e.message);
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