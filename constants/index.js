module.exports = {
    SUCCESS: {
        USERS_FETCHED: "Data fetched successfully",
        USERS_CREATED: "User created successfully",
        LOGIN_SUCCESS: "Login successful",
        TASK_CREATED: "Task created",
        TASK_FETCHED: "Tasks loaded successfully",
        TASK_UPDATE: "Task updated successfully"
    },
    ERROR: {
        INTERNAL_SERVER: "Internal Server Error",
        USER_EXISTS: "User already exists",
        ACCESS_DENIED: "Access denied",
        INVALID_TOKEN: "Invalid token",
        USER_NOT_FOUND: "User not found",
        INVALID_CREDENTIALS: "Invalid credentials",
        TASK_NOT_FOUND: "Task not found",
        USER_ID_REQUIRED: "user_id is required"
    },
    ATTRIBUTES: {
        CREATED_AT: "created_at",
        UPDATED_AT: "updated_at",
        DELETED_AT: "deleted_at"
    },
    STATUS_CODE: {
        SUCCESS: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
    },
    EXPIRES_IN_TIME:"1h"
};