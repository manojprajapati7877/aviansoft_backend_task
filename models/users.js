const { DataTypes,Model } = require("sequelize");
const sequelize = require("../config/db");

class Users extends Model { }

Users.init({
    id: {
        type: DataTypes.INET,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255)
    },
    email: {
        type: DataTypes.STRING(255)
    },
    password: {
        type: DataTypes.TEXT
    },
    created_at: {
        type: DataTypes.DATE
    },
    updated_at: {
        type: DataTypes.DATE
    },
    deleted_at: {
        type: DataTypes.DATE
    }
},
    {
        sequelize: sequelize,
        modelName: "Users",
        tableName: "users",
        timestamps: false,
    }
)

module.exports = Users