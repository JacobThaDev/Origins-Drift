module.exports = (sequelize, DataTypes) => {
    const classes = sequelize.define("classes", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: true,
        underscored: true
    });
    return classes;
};