module.exports = (sequelize, DataTypes) => {
    const classes = sequelize.define("classes", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
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