const UserSchema = require("../dataBase/user")
const ApiError = require("../error/ApiError")

module.exports = {
    checkIsUserExist:async (req, res, next) => {
        try {
            const {userId} = req.params;
            // console.log(req.params);

            const user = await UserSchema.findById(userId)

            if (!user) {
              throw new ApiError(`User with id ${userId} not found`, 503);
            }
            req.user = user;
            next()
        } catch (e) {
            next(e);
        }

    },

    checkIsEmailExist:async (req, res, next) => {
        try {
            // const {email} = req.body;
            console.log(req.body);
            if(!email) {
                throw new ApiError('Email is not present',400)
            }
            const user = await UserSchema.findOne({email});

            if (user) {
              throw new ApiError(`User with this email already exist`, 409);
            }

            next()
        } catch (e) {
            next(e);
        }

    }
}