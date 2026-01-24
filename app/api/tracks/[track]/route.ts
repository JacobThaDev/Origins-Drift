import { TracksTypes } from "@/utils/types/TracksTypes";
import db from "@/models";
import { Sequelize } from "sequelize";
import { unstable_cache } from "next/cache";

const getTrackData = (track:string) => unstable_cache(
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
            where: parseInt(track) 
                ? { id: track } 
                : { short_name: track },
            include: {
                model: db.games,
                as: "Game"
            }
        });
        
        return trackData;
    },
    ['track-data', parseInt(track) ? String(track) : track.toLowerCase()], {
        revalidate: 3600,
        tags: [
            'track-data',
            `track-data-${parseInt(track) ? String(track) : track.toLowerCase()}`,
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
export async function GET(req: any, { params }: { params: Promise<{ track: string }> }) {
    try {
        const { track }  = await params;
        const trackData:TracksTypes|undefined = await getTrackData(track.toLowerCase());

        if (!trackData) {
            return Response.json({
                error: "Track not found."
            }, { status: 400 });
        }

        return Response.json(trackData);
    } catch (e:any) {
        console.log(e.message);
        return Response.json({
            error: e.message
        });
    }
}