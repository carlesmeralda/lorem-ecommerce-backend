const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()

dotenv.config()

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT || 5000)
  })
  .catch(err => console.log(err))
