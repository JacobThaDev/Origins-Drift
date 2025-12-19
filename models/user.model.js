module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("user", {
        id: {
            type: DataTypes.STRING(36),
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        emailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        twoFactorEnabled: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        banned: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },
        banReason: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        banExpires: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        }
    }, {
        freezeTableName: true,
        timestamps: true,
        underscored: false
    });
    return user;
};