const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class Tasks extends Model { }

Tasks.init({
    id: {
        type: DataTypes.INET,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INET,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(255)
    },
    description: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.ENUM(
            "pending",
            "in_progress",
            "completed"
        )
    },
    created_at: {
        type: DataTypes.DATE
    },
    updated_at: {
        type: DataTypes.DATE
    },
    deleted_at: {
        type: DataTypes.DATE
    },
},
    {
        sequelize: sequelize,
        modelName: "Tasks",
        tableName: "tasks",
        timestamps: false,
    }
)
module.exports = Tasks