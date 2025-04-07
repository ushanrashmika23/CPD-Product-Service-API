const express = require('express');
const CartController = require('../controller/CartController');

const router = express.Router();

router.post('/create-cart', CartController.createCart);
router.put('/update-cart/:id', CartController.updateCart);
router.delete('/delete-cart/:id', CartController.deleteCart);
router.get('/find-cart/:id', CartController.findByIdCart);
router.get('/all-cart', CartController.findAllCart);

module.exports = router;
