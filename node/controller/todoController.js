const todoServices = require('../services/todoServices')
const userModel = require('../models/userModel')
exports.createTodo = async (req, res, next) => {
    try {
        const {userId, desc, title} = req.body
        const user = await userModel.findById(userId)//stores the data of teh user with this id
        let todo = await todoServices.createTodo(userId,user.email, title, desc)
        res.json({status:true, success:todo, messag:"saved"})
    } catch (err) {
        next(err)
    }
}

exports.getUserTodo = async (req, res, next) => {
    try {
        const {userId, title} = req.body
        let todo = await todoServices.getTodo(userId, title)
        res.json({status:true, success:todo, messag:"saved"})
    } catch (err) {
        next(err)
    }
}

exports.deleteTodo = async (req, res, next) => {
    try {
        const { id} = req.body
        let deleted = await todoServices.deleteTodo(id)
        res.json({status:true, success:deleted, messag:"deleted"})
    } catch (err) {
        next(err)
    }
}