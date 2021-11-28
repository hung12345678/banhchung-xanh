const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/AdminController')
// newController.index
//map từ trên xuống dưới
router.get('/admin', adminController.index);


module.exports = router;