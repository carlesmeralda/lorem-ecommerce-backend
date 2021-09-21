const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const adminRoute = require('./routes/admin-routes')
const authRoute = require('./routes/auth-routes')
const shopRoute = require('./routes/shop-routes')

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

app.use('/admin', adminRoute)
app.use('/auth', authRoute)
app.use('/shop', shopRoute)

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 5000)
  })
  .catch(err => console.log(err))
