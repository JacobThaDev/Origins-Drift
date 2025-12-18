module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("user", {
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
            allowNull: true
        },
        banned: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        banReason: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        banReason: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        banExpires: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        freezeTableName: true,
        timestamps: true,
        underscored: false
    });
    return user;
};