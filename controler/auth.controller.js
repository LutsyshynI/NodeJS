const oAuthService = require("../service/oauth.service");
const emailService = require("../service/email.service");
const OAuth = require('../dataBase/OAuth')
const {WELCOME} = require("../config/email-action.enum");


module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await emailService.sendEmail('irusyapryyma1999@gmail.com',WELCOME);

            await oAuthService.comparePasswords(user.password, body.password);

            const tokenPair = oAuthService.generateAccessTokenPair({id: user._id});

            await OAuth.create({...tokenPair, _user_id: user._id})

            res.json({
                user,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    }
}