module.exports = (sequelize, DataTypes) => {
    const account_data = sequelize.define("account_data", {
        user_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true
        },
        display_name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        platform: {
            type: DataTypes.STRING,
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