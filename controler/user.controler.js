const {fileServices} = require('../services');
const fs = require("fs/promises");
const path = require("path");

const UserSchema = require('../dataBase/user')
const oAuthService = require("../service/oauth.service");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const Users = await UserSchema.find({});

            res.json(Users);
        } catch (e) {
            next(e)
        }
    },

    getUserById: async (req, res, next) => {
        try {
            res.json(req.user);

        } catch (e) {
            next(e)
        }

    },
    put: async (req, res, next) => {
        try {
            const newUserInfo = req.body;
            const userId = req.params.userId;

            await UserSchema.findByIdAndUpdate(userId, newUserInfo);
            res.json('Updated')
        } catch (e) {
            next(e);
        }
    },
    post: async (req, res, next) => {
        try {
            const hashPassword = await oAuthService.hashPassword(req.body.password);

            await UserSchema.create({...req.body, password:hashPassword});
            res.status(201).json('OK')

        } catch (e) {
            next(e)
        }
    },
    delete: async (req, res, next) => {
        try {
            await UserSchema.deleteOne({_id: req.params.userId});
            res.status(204).send('OK')
        } catch (e) {
            next(e)
        }

    }

}
