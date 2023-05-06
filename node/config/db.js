const mongoose = require('mongoose')
const express = require('express')
const app = express()


const URI = "mongodb+srv://smahesh7736:x!_WAQ!NMYfy23N@cluster0.p9vxhp1.mongodb.net/mernDB?retryWrites=true&w=majority"

// listen for request
const connection = mongoose.connect(URI)
   .then((result) => {
      app.listen(5000)
      console.log('Connected')
   })
   .catch((err) => console.log(err))

module.exports = mongoose