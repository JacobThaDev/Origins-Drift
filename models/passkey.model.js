module.exports = (sequelize, DataTypes) => {
    const passkey = sequelize.define("passkey", {
        id: {
            type: DataTypes.STRING(36),
            primaryKey: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        publicKey: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING(36),
            allowNull: false
        },
        credentialID: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        counter: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deviceType: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        backedUp: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        transports: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        aaguid: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: false
    });
    return passkey;
};