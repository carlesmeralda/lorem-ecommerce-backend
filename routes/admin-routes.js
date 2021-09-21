const express = require('express')
const router = express.Router()

const adminController = require('../controllers/admin-controllers')

router.post('/add-product', adminController.addProduct)

router.patch('/update-product', adminController.updateProduct)

router.delete('/:productId', adminController.deleteProduct)

module.exports = router
