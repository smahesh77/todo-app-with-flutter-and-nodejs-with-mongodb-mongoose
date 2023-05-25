const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken')

class UserService {
    static async regUser(email, password) {
        try {
            const createUser = new userModel({email, password})
            console.log(email + " " + password)
            return await createUser.save();
        } catch (err) {
            throw err;
        }
    }
//returns usermodel if the said email exists
    static async checkUser(email){
        try {
            //console.log(userModel.findOne({email}))
            //to find bt email
            return await userModel.findOne({email})
        } catch (err) {
            throw err;
            
        }
    }

    static async genToken(tokenData, secretKey, jwt_expire){
        return jwt.sign(tokenData, secretKey, {expiresIn:jwt_expire})
    }
}

module.exports = UserService