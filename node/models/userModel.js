const moong = require('mongoose')
const db = require('../config/db')
const bcrypt = require('bcrypt')

const {Schema} = moong



const userSchema = new Schema({
    email:{
        type: String,
        lowercase:true,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required:true,
    },
})
//gets called whenever a doc is saved to encypt the pass
userSchema.pre('save', async function(){
    try {
        var user = this
        const salt = await(bcrypt.genSalt(10))
        const hashpass = await bcrypt.hash(user.password, salt)
        user.password = hashpass

    } catch (err) {
        throw err
    }
})
//creating our own method in schema to check pass
userSchema.methods.comparePass = async function(userPassword){
    try {
        // checks the passed pass with the pass in db i.e of the the model which has called this function
        const ismatch = bcrypt.compare(userPassword, this.password/*to get pass of the current user model */)
        return ismatch;
    } catch (err) {
        throw err  
    }
}

const userModel = db.model('user', userSchema)

module.exports = userModel