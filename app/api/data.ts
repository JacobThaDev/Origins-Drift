import db from "@/models";
import { unstable_cache } from "next/cache";
import { Op, Sequelize } from "sequelize";

/**
 * get a tracks data including the game it belongs to
 * @param gameSymbol the game as either `fh4`, `fh5`, or `fh6`
 * @param trackName the short name of the track.
 * @returns 
 */
export const getCachedTrack = (gameSymbol:string, trackName:string) => unstable_cache(
    async () => {
        const track = await db.tracks.findOne({
            where: {
                short_name: trackName
            },
            include: {
                model: db.games,
                as: "Game",
                where: { symbol: gameSymbol }
            }
        });
        
        return track;
    },
    ['tracks', gameSymbol, trackName.toLowerCase()], {
        tags: [
            'tracks',
            `track-${gameSymbol.toUpperCase()}`,
            `track-${gameSymbol.toUpperCase()}-${trackName.toLowerCase()}`,
        ]
    }
)();

/**
 * 
 * @param user_id the user id
 * @param trackId the track id
 * @param classType the PI class as either `a` or `s1` 
 * @returns 
 */
export const getUserRecord = (user_id:string, trackId: number, classType: string) => unstable_cache(
    async () => {
        return await db.scores.findOne({
            attributes: [
                [Sequelize.fn('MAX', Sequelize.col('score')), 'score'] // Use an alias for the result
            ],
            where: {
                user_id: user_id,
                track: trackId,
                class: classType
            },
            raw: true
        });
    },
    ['user-record', String(trackId), classType.toUpperCase(), user_id], {
        tags: [
            'user-records',
            `user-record-${trackId}-${classType.toUpperCase()}-${user_id}`
        ]
    }
)();


/**
 * Gets a list of scores for a provided track and class, 
 * caching the result until it's revalidated manually.
 * @param trackId the track id
 * @param classType car class (`a` or `s1`)
 * @returns 
 */
export const getCachedScores = (trackId: number, classType: string) => unstable_cache(
    async () => {
        return await db.scores.findAll({
            attributes: ["class", "score", "verified", "proof_url", "createdAt"],
            where: {
                id: {
                    [Op.in]: Sequelize.literal(`(
                        SELECT MAX(id) FROM scores AS s1
                        WHERE s1.track = ${trackId} AND s1.class = '${classType}'
                        AND s1.score = (
                            SELECT MAX(score) FROM scores AS s2 
                            WHERE s2.user_id = s1.user_id AND s2.track = ${trackId} AND s2.class = '${classType}'
                        ) GROUP BY user_id
                    )`)
                }
            },
            order: [["score", "DESC"]],
            limit: 50,
            include: [{
                model: db.users,
                as: "User",
                attributes: ["name", "image", "createdAt"],
                include: [
                    { 
                        model: db.accountData, 
                        as: "AccountData",
                        attributes: ["display_name", "platform"] 
                    },
                    { 
                        model: db.account, 
                        as: "Account", 
                        attributes: ["accountId", "providerId"] 
                    }
                ]
            }]
        });
    },
    ['leaderboards', String(trackId), classType.toUpperCase()], {
        tags: [
            'leaders',
            `leaders-${trackId}`,
            `leaders-${trackId}-${classType.toUpperCase()}`
        ]
    }
)();

export const getCachedRecentScores = (gameId: number, trackId: number, classType: string) => unstable_cache(
    async () => {
        return await db.scores.findAll({
            where: {
                [Op.and]: {
                    game: gameId,
                    track: trackId,
                    class: classType
                }
            },
            order: [
                ["id", "DESC"]
            ],
            limit: [10],
            include: [{
                model: db.users,
                as: "User",
                attributes: ["name", "image", "createdAt"],
                include: [
                    { 
                        model: db.accountData, 
                        as: "AccountData",
                        attributes: ["display_name", "platform"] 
                    },
                    { 
                        model: db.account, 
                        as: "Account", 
                        attributes: ["accountId", "providerId"] 
                    }
                ]
            }]
        });
    },
    ['recent', String(trackId), classType.toUpperCase()], {
        tags: [
            'recent',
            `recent-${trackId}`,
            `recent-${trackId}-${classType.toUpperCase()}`
        ]
    }
)();

/**
 * Gets a list of games and all tracks for each game.
 * @param gameSymbol the games symbol. (`fh4`, `fh5`, `fh6`)
 * @returns a list of games and available tracks for each game
 */
export const getCachedGames = (gameSymbol:string) => unstable_cache(
    async () => {
        return await db.games.findOne({
            where: {
                symbol: gameSymbol
            },
            include: [
                {
                    model: db.tracks,
                    as: 'tracks',
                    include: [{
                        model: db.games,
                        as: 'Game'
                    }],
                },
            ],
            order: [
                ['tracks', 'favorite', 'DESC'],
                ['tracks', 'id', 'ASC']
            ]
        });
    },
    ['games', String(gameSymbol)], {
        tags: [
            'games',
            `games-${gameSymbol}`
        ] 
    }
)();

export const getCachedUser = (user_id:string) => unstable_cache(
    async () => {
        return await db.users.findOne({
            attributes: [
                "id", "name", "image", "role", "createdAt"
            ],
            where: {
                id: user_id
            },
            include: [
                {
                    model: db.accountData,
                    as: "AccountData",
                    include: {
                        model: db.cars_fh5,
                        as: "fav_car",
                    }
                },
                {
                    model: db.account,
                    as: "Account",
                    attributes: ["accountId", "providerId"]
                }
            ]
        });
    },
    ['users', user_id], {
        tags: [
            'users',
            `users-${user_id}`,
        ]
    }
)();