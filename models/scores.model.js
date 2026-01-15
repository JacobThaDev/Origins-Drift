module.exports = (sequelize, DataTypes) => {
    const scores = sequelize.define("scores", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        game: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        track: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        class: {
            type: DataTypes.STRING,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        proof_url: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        proof_delete_hash: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        freezeTableName: true,
        timestamps: true,
        underscored: true
    });
    return scores;
};