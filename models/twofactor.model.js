module.exports = (sequelize, DataTypes) => {
    const twoFactor = sequelize.define("twofactor", {
        id: {
            type: DataTypes.STRING(36),
            primaryKey: true
        },
        secret: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        backupCodes: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING(36),
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: false
    });
    return twoFactor;
};