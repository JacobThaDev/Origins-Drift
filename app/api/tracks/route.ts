import { TracksTypes } from "@/utils/types/TracksTypes";
import db from "@/models";
import { Sequelize } from "sequelize";
import { unstable_cache } from "next/cache";

const getTrackData = (classType:string = 'a') => unstable_cache(
    async () => {
        const trackData = await db.tracks.findAll({
            attributes: {
                exclude: ['webhook_url'],
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(DISTINCT user_id)
                            FROM scores AS s
                            WHERE s.track = tracks.id
                                AND s.class = '${classType}'
                        )`), 'user_count'
                    ],
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(DISTINCT id)
                            FROM scores AS s
                            WHERE s.track = tracks.id
                                AND s.class = '${classType}'
                        )`), 'entries'
                    ]
                ]
            },
            include: [
                {
                    model: db.games,
                    as: "Game"
                }, 
                {
                    model: db.scores,
                    as: "Scores",
                    where: { class: classType },
                    attributes: {
                        exclude: ['proof_url', 'updatedAt', 'track', 'game', 'proof_delete_hash']
                    },
                    required: false,
                    separate: true,  // This runs a separate query, making the order below work
                    order: [["score", "DESC"]],
                    limit: 1,
                    include: {
                        model: db.users,
                        as: "User",
                        attributes: {
                            exclude: ['email', 'emailVerified', 'updatedAt','twoFactorEnabled', 'banReason', 'banExpires']
                        }
                    }
                }
            ],
        });
        
        return trackData;
    },
    ['tracks-data', classType], {
        tags: [
            'tracks-data',
            `tracks-data-${classType}`
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
    const searchParams = req.nextUrl.searchParams;
    const classType    = searchParams.get("class") || "a";

    if (classType != "a" && classType != "s1") {
        return Response.json({
            error: { 
                message: "Invalid class. Must be either A or S1."
            }
        })
    }
    
    try {
        const trackData:TracksTypes[]|undefined = await getTrackData(classType);

        if (!trackData) {
            return Response.json({
                error: "Tracks not found."
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