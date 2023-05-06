const express = require('express')
const bodyparser = require('body-parser')
const userRouter = require('./routes/userRoute')

const app = express()

app.use(bodyparser.json())
//all routes will be in this file
app.use('/', userRouter)

module.exports = app  