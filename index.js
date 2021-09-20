const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const usersRoute = require('./routes/users-routes')

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/users', usersRoute)

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 5000)
  })
  .catch(err => console.log(err))
