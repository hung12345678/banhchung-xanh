const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeCoursesController');

// newController.index
//map từ trên xuống dưới
router.get('/store/courses', meController.store);

router.get('/store/order', meController.order);
router.get('/store/orderdetail', meController.orderdetail);
router.get('/Recycle-Bin/courses', meController.RecycleBinstore);
// router.get('/', courseController.index);


module.exports = router;