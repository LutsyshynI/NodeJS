const router = require('express').Router()
const controller = require('../controler/user.controler')
const mdlwr = require("../middleware/user.middleware");



router.get('/',controller.getAllUsers);
router.get('/:userId',mdlwr.checkIsUserExist,controller.getUserById);
router.post('/',controller.post);
router.put('/:userId',controller.put);
router.delete('/:userId',controller.delete);



module.exports = router;