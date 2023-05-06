const UserService = require('../services/userServices')

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const result = await UserService.regUser(email, password)

        res.json({ status: true, message: 'User created successfully' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ status: false, message: 'Error creating user' })
    }
}
