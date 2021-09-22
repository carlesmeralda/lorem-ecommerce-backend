const express = require('express')
const router = express.Router()

const adminController = require('../controllers/admin-controllers')

router.get('/products', adminController.getProducts)

router.get('/products/:productId', adminController.getProductById)

router.delete('/products/:productId', adminController.deleteProduct)

router.post('/products/add', adminController.addProduct)

router.patch('/products/edit/:productId', adminController.editProduct)

module.exports = router
