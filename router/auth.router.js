const router = require('express').Router();

const controller = require('../controler/auth.controller')
const mdlwr = require('../middleware/auth.middleware');
const userMdlwr = require('../middleware/user.middleware')


router.post('/login',mdlwr.isBodyValid, userMdlwr.getUsersDynamically('email'), controller.login)

module.exports = router;