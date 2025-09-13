const Users = require("../models/users")
const bcrypt = require("bcrypt");
const { successResponse, errorResponse } = require('../utils/response');
const MESSAGES = require('../constants');
const { validateUserInput, validateUserLoginInput } = require("../utils/validator");
const jwt = require("jsonwebtoken");

const usersController = {
    createUsers: async (req, res) => {
        try {
            const { name, email, password } = req.body
            const validationError = validateUserInput({ name, email, password });
            if (validationError) {
                return errorResponse(res, validationError, MESSAGES.STATUS_CODE.BAD_REQUEST);
            }
            const existingUser = await Users.findOne({ where: { email, deleted_at: null, } });
            if (existingUser) {
                return errorResponse(res, MESSAGES.ERROR.USER_EXISTS, MESSAGES.STATUS_CODE.BAD_REQUEST);
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await Users.create({ name, email, password: hashedPassword });
            const responseData = {
                id: user.id,
                name: user.name,
                email: user.email,
            };
            return successResponse(res, responseData, MESSAGES.SUCCESS.USERS_CREATED, MESSAGES.STATUS_CODE.CREATED);

        } catch (error) {
            console.error("Errorr", error)
            return errorResponse(res, MESSAGES.ERROR.INTERNAL_SERVER, MESSAGES.STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const validationError = validateUserLoginInput({ email, password });
            if (validationError) {
                return errorResponse(res, validationError, MESSAGES.STATUS_CODE.BAD_REQUEST);
            }
            const user = await Users.findOne({ where: { email, deleted_at: null } });
            if (!user) return errorResponse(res, MESSAGES.ERROR.USER_NOT_FOUND, MESSAGES.STATUS_CODE.NOT_FOUND);
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) return errorResponse(res, MESSAGES.ERROR.INVALID_CREDENTIALS, MESSAGES.STATUS_CODE.UNAUTHORIZED);
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: MESSAGES.EXPIRES_IN_TIME }
            );
            return successResponse(res, { token }, MESSAGES.SUCCESS.LOGIN_SUCCESS);
        } catch (error) {
            console.error("error---", error)
            return errorResponse(res, MESSAGES.ERROR.INTERNAL_SERVER, MESSAGES.STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
        }
    }
}
module.exports = usersController