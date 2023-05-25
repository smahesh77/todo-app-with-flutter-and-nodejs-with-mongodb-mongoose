const app = require('./app')
const db = require('./config/db')
const userModel = require('./models/userModel')
const http = require('http')

const server = http.createServer(function(req, res) {

})

app.get('/', (req, res) => {
    res.send("connected")
})
const port = 3000
app.listen(port, () => {
    console.log('listening to', port)
})