const moong = require('mongoose')
const db = require('../config/db')
const bcrypt = require('bcrypt')
const userModel = require("./userModel")
const {Schema} = moong



const todoSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: userModel.modelName,
        required:true
    },
    email: {
        type: String
    },
    title:{
        type: String,
        required:true,
    },
    desc:{
        type: String,
        required:true,
    },
})

const todoModel = db.model('todoe', todoSchema)

module.exports = todoModel