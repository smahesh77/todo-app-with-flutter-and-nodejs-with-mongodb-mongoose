const router = require('express').Router()
const todoController = require('../controller/todoController')

router.post('/store', todoController.createTodo/*this function will get called when some hits this api */)
router.post('/getUserTodoList', todoController.getUserTodo)
router.post('/deleteTodo', todoController.deleteTodo)


module.exports = router