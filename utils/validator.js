const validateUserInput = ({ name, email, password }) => {
    if (!name) return "Name is required";
    if (!email) return "Email is required";
    if (!password) return "Password is required";
    return null;
};
const validateUserLoginInput = ({  email, password }) => {
    if (!email) return "Email is required";
    if (!password) return "Password is required";
    return null;
};

module.exports = { validateUserInput ,validateUserLoginInput};
