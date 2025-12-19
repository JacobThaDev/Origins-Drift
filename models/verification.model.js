module.exports = (sequelize, DataTypes) => {
    const verification = sequelize.define("verification", {
        id: {
            type: DataTypes.STRING(36),
            primaryKey: true
        },
        identifier: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        timestamps: true,
        underscored: false
    });
    return verification;
};