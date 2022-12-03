const {fileServices} = require('../services');
const fs = require("fs/promises");
const path = require("path");

const UserSchema = require('../dataBase/user')

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
    post: async (req, res,next) => {
        await UserSchema.create(req.body)
        res.json('OK')
    },
    delete: async (req, res,next) => {
 try{
     await UserSchema.deleteOne({_id:req.params.userId});
     res.status(204).send('OK')
 } catch (e) {
     next(e)
 }
        
    }

}
