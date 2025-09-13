const express = require("express")
const router = express.Router()
const usersController = require("../controllers/users")
const tasksController = require("../controllers/tasks")
const authenticate = require("../middleware/authenticate");

router.post("/register", usersController.createUsers)
router.post("/login", usersController.loginUser);

// protected routes
router.post("/tasks", authenticate ,tasksController.createTasks);
router.get("/tasks",authenticate,tasksController.fetchAllTasks)
router.put("/tasks/:id", authenticate ,tasksController.updateTask);

module.exports = router