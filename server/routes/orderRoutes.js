const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);

router.get('/customer/:email', orderController.getOrdersByEmail);
router.get('/:id', orderController.getOrderById);

module.exports = router;
