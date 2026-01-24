module.exports = (sequelize, DataTypes) => {
    const garage = sequelize.define("car_garage", {
        owner: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'user', // Name of the target table
                key: 'id'      // Name of the target column
            }
        },
        car_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'cars_fh5', // Name of the target table
                key: 'id'      // Name of the target column
            }
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        delete_hash: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['owner', 'car_id']
            }
        ],
        freezeTableName: true,
        underscored: true
    });
    return garage;
};