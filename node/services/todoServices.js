const todoModel = require('../models/todoModel')

class TodoServices {
    static async createTodo(userId, email, title, desc) {
        const createTodo = new todoModel({userId, email, title, desc})
        return await createTodo.save();
    } 

    static async getTodo(userId, title) {
        //const TodoData = await todoModel.find({$and:[{'userId':userId}, {'title': title}]}) //returns only the data whee id and title matches
        const TodoData = await todoModel.find({userId}) //finds the todo list of user with this id and returns it
        return TodoData
    } 

    static async deleteTodo(id) {
        const deleted = todoModel.findOneAndDelete({_id:id})
        return deleted;
    }

}

module.exports = TodoServices