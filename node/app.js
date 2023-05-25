const express = require('express')
const bodyparser = require('body-parser')
const userRouter = require('./routes/userRoute')
const todoRouter = require('./routes/todoRoute')
const cors = require('cors')
const app = express()

app.use(cors());
app.use(bodyparser.json())
//all routes will be in this file
app.use('/', userRouter)
app.use('/', todoRouter)

module.exports = app  