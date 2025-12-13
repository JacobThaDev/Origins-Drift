module.exports = (sequelize, DataTypes) => {
    const tracks = sequelize.define("tracks", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        game: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        track_image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    });
    return tracks;
};