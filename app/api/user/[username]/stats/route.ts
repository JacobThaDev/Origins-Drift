import { UsersTypes } from "@/utils/types/UsersTypes";
import { getUserByNameWithId } from "@/app/api/data";
import { unstable_cache } from "next/cache";
import db from "@/models";

const getEntries = (user_id:string) => db.scores.count({
    where: {
        user_id: user_id
    }
});

const getTotalScore = (user_id:string) => db.scores.sum('score', {
    where: {
        user_id: user_id
    }
});

const getHighestScore = (user_id:string) => db.scores.findOne({
    where: {
        user_id: user_id
    },
    attributes: {
        exclude: ['proof_delete_hash', 'user_id', 'id', 'track'],
    },
    order: [ ["score", "DESC"]],
    include: {
        model: db.tracks,
        attributes: {
            exclude: ['webhook_url']
        },
        as: "Track"
    },
    limit: 1
});

/**
 * Gets a list of games and all tracks for each game.
 * @param user_id the user id
 * @param classType the car class - `a` or `s1`
 * @returns user statistics
 */
const getUserStats = (user_id:string) => unstable_cache(
    async () => {
        const [ entries, max_score, total_score ] = await Promise.all([
            getEntries(user_id),
            getHighestScore(user_id),
            getTotalScore(user_id)
        ]);
        
        return {
            total_entries: entries,
            track_time: entries * 4, // 4 minute tracks
            total_score: total_score,
            highest_score: max_score
        }
    },
    ['user-stats', user_id ], {
        tags: [
            'user-stats',
            `user-stats-${user_id}`
        ],
        revalidate: 3600
    }
)();

/**
 * Get a user by user id
 * @param req 
 * @param res 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const { username }:RequestTypes = await res.params;

        const user:UsersTypes = await getUserByNameWithId(username);

        if (!user) {
            return Response.json({ 
                error: "Could not find profile"
            });
        }

        const stats = await getUserStats(user.id);

        return Response.json(stats);
    } catch (e:any) {
        console.error(e);
        return Response.json({ 
            message: e.message
        });
    }
}

interface RequestTypes {
    username: string;
}