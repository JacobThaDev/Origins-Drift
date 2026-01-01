module.exports = (sequelize, DataTypes) => {
    const carsfh5 = sequelize.define("cars_fh5", {
        make: {
            type: DataTypes.STRING,
            allowNull: false
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rarity: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        speed: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        handling: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        acceleration: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        launch: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        braking: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        offroad: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        car_class: {
            type: DataTypes.STRING(2),
            allowNull: false,
            defaultValue: 0
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        car_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        build_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        powertrain_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        electric_motors: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        engine_size: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        aspiration: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        engine_type: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        power: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        torque: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        engine_placement: {
            type: DataTypes.STRING(12),
            allowNull: false
        },
        drivetrain: {
            type: DataTypes.STRING(17),
            allowNull: false
        },
        gears: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight_distribution: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        B60: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: null
        },
        B100: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: null
        },
        G60: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: null
        },
        G120: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: null
        },
        A60: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: null
        },
        A100: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: null
        },
        top_speed: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    });
    return carsfh5;
};