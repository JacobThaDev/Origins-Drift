'use strict';

import Sequelize from 'sequelize';
import { env as _env } from 'process';
import mysql2 from "mysql2";
import gamesModel from './games.model';
import classesModel from './classes.model';
import tracksModel from './tracks.model';
import scoresModel from './scores.model';
import userModel from './user.model';
import accountModel from './account.model';
import accountDataModel from './accountdata.model';
import verificationModel from './verification.model';
import sessionModel from './session.model';
import passkeyModel from './passkey.model';
import carsModel from './cars.model';

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

db.cars_fh5     = carsModel(sequelize, Sequelize);
db.games        = gamesModel(sequelize, Sequelize);
db.classes      = classesModel(sequelize, Sequelize);
db.tracks       = tracksModel(sequelize, Sequelize);
db.scores       = scoresModel(sequelize, Sequelize);
db.users        = userModel(sequelize, Sequelize);
db.account      = accountModel(sequelize, Sequelize);
db.accountData  = accountDataModel(sequelize, Sequelize);
db.verification = verificationModel(sequelize, Sequelize);
db.session      = sessionModel(sequelize, Sequelize);
db.passkey      = passkeyModel(sequelize, Sequelize);

db.games.hasMany(db.tracks, {
    targetKey: "id",
    foreignKey: 'game',
    onDelete: "CASCADE"
});

db.tracks.belongsTo(db.games, {
    targetKey: "id",
    foreignKey: 'game',
    as: 'Game',
    onDelete: "NO ACTION"
});

db.tracks.hasMany(db.scores, {
    targetKey: "id",
    foreignKey: 'track',
    as: 'Scores',
    onDelete: "NO ACTION",
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

db.scores.hasOne(db.account, {
    targetKey: "user_id",
    foreignKey: 'id',
    as: 'Account',
    onDelete: "NO ACTION"
});

db.scores.belongsTo(db.users, {
    targetKey: "id",
    foreignKey: 'user_id',
    as: 'User',
    onDelete: "NO ACTION"
});

db.users.hasOne(db.accountData, {
    targetKey: "id",
    foreignKey: 'user_id',
    as: 'AccountData',
    onDelete: "CASCADE"
});

db.users.hasOne(db.account, {
    targetKey: "id",
    foreignKey: 'userId',
    as: 'Account',
    onDelete: "CASCADE"
});

db.account.belongsTo(db.users, {
    targetKey: "id",
    foreignKey: 'userId',
    as: 'User',
    onDelete: "CASCADE"
});

db.accountData.belongsTo(db.users, {
    targetKey: "id",
    foreignKey: 'user_id',
    as: 'UserData',
    onDelete: "NO ACTION"
});

db.accountData.belongsTo(db.cars_fh5, {
    targetKey: "id",
    foreignKey: 'fav_car_fh5',
    onDelete: "NO ACTION",
    as: "fav_car",
});

try {
    db.sequelize.sync();
} catch (e) {
    console.error("Failed to sync db", e.message);
}

export default db;