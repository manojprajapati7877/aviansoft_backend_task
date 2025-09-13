const Tasks = require("../models/tasks")
const { successResponse, errorResponse } = require('../utils/response');
const MESSAGES = require('../constants');

const tasksController = {
    createTasks: async (req, res) => {
        try {
            const { title, description, status } = req.body
            const task = await Tasks.create({ user_id: req.user.id, title, description, status });
            return successResponse(res, task, MESSAGES.SUCCESS.TASK_CREATED, MESSAGES.STATUS_CODE.CREATED);
        } catch (error) {
            return errorResponse(res, MESSAGES.ERROR.INTERNAL_SERVER, MESSAGES.STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
        }
    },
    fetchAllTasks: async (req, res) => {
        try {
            const tasks = await Tasks.findAll({
                where: { user_id: req.user.id, deleted_at: null },
                attributes: {
                    exclude: [MESSAGES.ATTRIBUTES.CREATED_AT, MESSAGES.ATTRIBUTES.UPDATED_AT,
                    MESSAGES.ATTRIBUTES.DELETED_AT]
                }
            });
            return successResponse(res, tasks, MESSAGES.SUCCESS.TASK_FETCHED);
        } catch (error) {
            return errorResponse(res, MESSAGES.ERROR.INTERNAL_SERVER, MESSAGES.STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
        }
    },
    updateTask: async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;
            updates.updated_at = new Date();
            const task = await Tasks.findOne({
                where: { id, user_id: req.user.id, deleted_at: null }
            });
            if (!task) {
                return errorResponse(res, MESSAGES.ERROR.TASK_NOT_FOUND, MESSAGES.STATUS_CODE.NOT_FOUND);
            }
            await task.update(updates);
            return successResponse(res, task, MESSAGES.SUCCESS.TASK_UPDATE);
        } catch (error) {
            return errorResponse(res, MESSAGES.ERROR.INTERNAL_SERVER, MESSAGES.STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
        }
    }
}

module.exports = tasksController