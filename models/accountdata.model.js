module.exports = (sequelize, DataTypes) => {
    const account_data = sequelize.define("account_data", {
        user_id: {
            type: DataTypes.STRING(36),
            primaryKey: true,
            unique: true
        },
        display_name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        platform: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        platform_name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        about_me: {
            type: DataTypes.TEXT('medium'),
            allowNull: true,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: false
    });
    return account_data;
};