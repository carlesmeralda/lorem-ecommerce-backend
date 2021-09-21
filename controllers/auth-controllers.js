const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const HttpError = require('../models/http-error')

const signup = async (req, res, next) => {
  const errorValidation = validationResult(req)

  if (!errorValidation.isEmpty()) {
    return next(new HttpError('Invalid entered inputs.'), 422)
  }

  const { name, email, password } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    return next(
      new HttpError('Signing up failed, please try again later.'),
      500
    )
  }

  if (existingUser) {
    return next(new HttpError('User already exist'), 422)
  }

  let hashPassword
  try {
    hashPassword = await bcrypt.hash(password, 10)
  } catch (err) {
    return next(new HttpError('Could not create a user, please try again.'))
  }

  const createdUser = new User({
    name,
    email,
    password: hashPassword,
    cart: {
      items: [],
    },
    wishList: {
      items: [],
    },
  })

  try {
    await createdUser.save()
  } catch (err) {
    return next(new HttpError('Signing up failed, try again later', 500))
  }

  let token
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    )
  } catch (err) {
    return next(new HttpError('Signing up failed, try again later', 500))
  }

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    token,
  })
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    return next(new HttpError('Something went wrong, try again later'), 500)
  }

  if (!existingUser) {
    return next(new HttpError('Invalid credentials, try again'), 403)
  }

  let isValidPassword
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password)
  } catch (err) {
    return next(new HttpError('Something went wrong, try again later'), 500)
  }

  if (!isValidPassword) {
    return next(new HttpError('Invalid credentials, try again'))
  }

  let token
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    )
  } catch (err) {
    return next(new HttpError('Loggin in failed, try again later', 500))
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token,
  })
}

module.exports = {
  signup,
  login,
}
