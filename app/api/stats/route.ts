import db from "@/models";
import { unstable_cache } from "next/cache";
import { Sequelize } from "sequelize";


const getUsersCreated = () => db.users.count();
const getScoresCount  = () => db.scores.count();
const getSumOfScores  = () => db.scores.sum('score');
const getTracksCount  = () => db.tracks.count();
const getCarsCount    = () => db.cars_fh5.count();

const getAverageScore = () => db.scores.findOne({
    attributes: [
        [Sequelize.fn("AVG", Sequelize.col("score")), "averageScore"]
    ],
    raw: true
});

const getHighestScore = () => db.scores.findOne({
    attributes: [
        [Sequelize.fn("MAX", Sequelize.col("score")), "maxScore"]
    ],
    include: [
        {
            model: db.tracks,
            as: "Track",
            attributes: ["name", "short_name", "length", "game", "favorite", "track_image"]
        },
        {
            model: db.users,
            as: "User",
            attributes: ["name", "image", "role", "banned", "createdAt"]
        }
    ],
    group: ['Track.id', 'scores.id'],
    order: [[Sequelize.literal('maxScore'), 'DESC']],
    nest: true,
    raw: true
});

const getTrackRecords = () => db.scores.findAll({
    attributes: [
        'class',
        [Sequelize.fn('MAX', Sequelize.col('score')), 'max_score'],
         [Sequelize.fn('COUNT', Sequelize.col('*')), 'entries']
    ],
    where: {
        class: "a"
    },
    include: [
        {
            model: db.tracks,
            as: "Track",
            attributes: ["name", "short_name", "length", "game", "favorite", "track_image"]
        },
        {
            model: db.users,
            as: "User",
            attributes: ["name", "image", "role", "banned", "createdAt", "updatedAt"]
        }
    ],
    group: [
        'scores.track', 
        'Track.id', // Ensure this matches your Track model's PK name
        'scores.class',
        'User.id'
    ], // Group by track to get the MAX for each one
    raw: true,
    nest: true
});

const getHomepageStats = () => unstable_cache(
    async () => {
        const [ 
            user_created, submitted, score_sum, tracks, cars, avg_scores, max_score, track_leaders 
        ] = await Promise.all([
            getUsersCreated(),
            getScoresCount(),
            getSumOfScores(),
            getTracksCount(),
            getCarsCount(),
            getAverageScore(),
            getHighestScore(),
            getTrackRecords()
        ]);
        
        return {
            users: user_created,
            submitted: submitted,
            tracks: tracks,
            cars: cars,
            score_sum: score_sum,
            avg_score: parseFloat(avg_scores.averageScore),
            max_score: max_score,
            track_leaders
        }
    },
    ['home-stats'], 
    {
        revalidate: 3600, // 3600 = 1 hour cache time
        tags: [
            'home-stats'
        ]
    }
)();

// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const stats = await getHomepageStats();

        return Response.json(stats);
    } catch (e:any) {
        console.error(e.response);
        return Response.json({ 
            message: e.message
        });
    }
}