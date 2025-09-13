const successResponse = (res, data = {}, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

const errorResponse = (res, message = 'Error', code = 500, details = null) => {
    return res.status(code).json({
        success: false,
        error: {
            code,
            message,
            details
        }
    });
};

module.exports = { successResponse, errorResponse };