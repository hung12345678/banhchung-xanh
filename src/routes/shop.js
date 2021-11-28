const express = require('express');
const router = express.Router();

const ShopController = require('../app/controllers/ShopController');

//map từ trên xuống dưới
// router.get('/cartMe', CartController.cart);
router.get('/shop-cart', ShopController.cart)
router.get('/checkout', ShopController.checkout)
router.post('/checkout', ShopController.post);
module.exports = router;