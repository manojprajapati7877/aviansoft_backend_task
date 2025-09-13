require("dotenv").config();
const express = require("express");
const sequelize = require("./config/db");
const users = require("./routes/users");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());
app.use("/api", users);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully");
        await sequelize.sync();
        console.log("✅ Database models synced");
        app.listen(process.env.PORT, () => {
            console.log(` Server running on http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.error("❌ Error starting server:", error.message);
        process.exit(1);
    }
};

startServer();
