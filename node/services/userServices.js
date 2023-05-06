const userModel = require("../models/userModel");

class UserService {
    static async regUser(email, password) {
        try {
            const createUser = new userModel({email, password})
            console.log(email, password)
            return await createUser.save();
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UserService