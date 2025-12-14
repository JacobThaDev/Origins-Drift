'use strict';

import Sequelize from 'sequelize';
import { env as _env } from 'process';
import mysql2 from "mysql2";
import gamesModel from './games.model';
import classesModel from './classes.model';
import tracksModel from './tracks.model';
import scoresModel from './scores.model';

let sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASS, {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
    logging: false,
    dialectModule: mysql2,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: process.env.MYSQL_CERT ? {
        ssl : {
           ca: process.env.MYSQL_CERT
        } 
    } : {}
});

const db = {};

db.sequelize  = sequelize;
db.Sequelize  = Sequelize;

db.games   = gamesModel(sequelize, Sequelize);
db.classes = classesModel(sequelize, Sequelize);
db.tracks  = tracksModel(sequelize, Sequelize);
db.scores  = scoresModel(sequelize, Sequelize);

db.games.hasMany(db.tracks, {
    targetKey: "id",
    foreignKey: 'game',
    onDelete: "CASCADE"
});

db.tracks.belongsTo(db.games, {
    targetKey: "id",
    foreignKey: 'game',
    as: 'Game', // **Crucial change:** Name the association on the 'Track' model
    onDelete: "NO ACTION"
});

db.scores.belongsTo(db.games, {
    targetKey: "id",
    foreignKey: 'game',
    as: 'Game',
    onDelete: "NO ACTION"
});

db.scores.belongsTo(db.tracks, {
    targetKey: "id",
    foreignKey: 'track',
    as: 'Track',
    onDelete: "NO ACTION"
});

try {
    db.sequelize.sync();
} catch (e) {
    console.error("Failed to sync db", e.message);
}

export default db;