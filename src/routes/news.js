const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/newController');

// newController.index

// router.get('/:slug', newsController.show);
router.get('/contact', newsController.index);
// router.get('/reduce/:id', newsController.Minus)
// router.get('/plus/:id', newsController.Plus)

module.exports = router;
