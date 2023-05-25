const router = require('express').Router()
const UserController = require('../controller/userController')

router.post('/reg', UserController.register)//gets called when the api gets hit
router.post('/login', UserController.login)

module.exports = router