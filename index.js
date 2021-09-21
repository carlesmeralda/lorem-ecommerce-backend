const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const usersRoute = require('./routes/users-routes')
const productsRoute = require('./routes/products-routes')

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATH, DELETE')

  next()
})

app.use('/api/users', usersRoute)
app.use('/api/products', productsRoute)

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 5000)
  })
  .catch(err => console.log(err))
