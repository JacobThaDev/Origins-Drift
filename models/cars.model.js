module.exports = (sequelize, DataTypes) => {
    const cars = sequelize.define("cars", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        },
        make: {
            type: DataTypes.STRING,
            allowNull: false
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false
        },
        added: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        sources: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    });
    return cars;
};