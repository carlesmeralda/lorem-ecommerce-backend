const express = require('express')
const { check } = require('express-validator')
const router = express.Router()

const authController = require('../controllers/auth-controllers')

router.get('/:userId', authController.getUser)

router.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isStrongPassword(),
  ],
  authController.signup
)

router.post('/login', authController.login)

module.exports = router
