const express = require('express');
const router = express.Router();

const CartController = require('../app/controllers/CartController');
//map từ trên xuống dưới
// router.get('/cartMe', CartController.cart);
router.get('/:id', CartController.add)
router.get('/reduce/:id', CartController.Minus)
router.get('/plus/:id', CartController.Plus)
router.get('/remove/:id', CartController.remove)
// router.get('/cartMe', CartController.cart)
module.exports = router;