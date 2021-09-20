const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const usersRoute = require('./routes/user-routes')

const app = express()

dotenv.config()

app.use('/api/users', usersRoute)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT || 5000)
  })
  .catch(err => console.log(err))
