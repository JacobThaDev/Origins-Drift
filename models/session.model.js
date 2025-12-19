module.exports = (sequelize, DataTypes) => {
    const session = sequelize.define("session", {
        id: {
            type: DataTypes.STRING(36),
            primaryKey: true
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        ipAddress: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        userAgent: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        userId: {
            type: DataTypes.STRING(36),
            allowNull: false
        },
        impersonatedBy: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    }, {
        freezeTableName: true,
        timestamps: true,
        underscored: false
    });
    return session;
};