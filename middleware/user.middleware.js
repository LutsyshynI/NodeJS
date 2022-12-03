const userDb = require("../dataBase/users.json")
const ApiError = require("../error/ApiError")

module.exports = {
    checkIsUserExist: (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = userDb[userId];

            if (!user) {
              throw new ApiError(`User with id ${userId} not found`, 503);
            }

            req.user = user;
            next()
        } catch (e) {
            next(e);
        }

    }
}