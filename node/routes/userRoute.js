const router = require('express').Router()
const UserController = require('../controller/userController')
router.post('/reg', UserController.register)

module.exports = router