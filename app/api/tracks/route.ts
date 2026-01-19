import { TracksTypes } from "@/utils/types/TracksTypes";
import db from "@/models";
import { Sequelize } from "sequelize";
import { unstable_cache } from "next/cache";

const getTrackData = () => unstable_cache(
    async () => {
        const trackData = await db.tracks.findAll({
            attributes: {
                exclude: ['webhook_url'],
                include: [
                    // Subquery to get the MAX score for THIS specific track and class
                    [
                        Sequelize.literal(`(
                            SELECT MAX(CAST(score AS SIGNED))
                            FROM scores AS s
                            WHERE s.track = tracks.id
                        )`), 'top_score'
                    ],
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(DISTINCT user_id)
                            FROM scores AS s
                            WHERE s.track = tracks.id 
                        )`), 'user_count'
                    ],
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(DISTINCT id)
                            FROM scores AS s
                            WHERE s.track = tracks.id 
                        )`), 'entries'
                    ]
                ]
            },
            include: {
                model: db.games,
                as: "Game"
            }
        });
        
        return trackData;
    },
    ['tracks-data'], {
        revalidate: 3600,
        tags: [
            'tracks-data'
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
        const trackData:TracksTypes[]|undefined = await getTrackData();

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