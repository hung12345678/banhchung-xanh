const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/courseController');
// newController.index
//map từ trên xuống dưới
router.get('/create', courseController.create);

//map từ trên xuống dưới

// router.get('/:id', courseController.add)
router.post('/store', courseController.store);
router.get('/products', courseController.product);

router.get('/:slug', courseController.show);

router.get('/:id/edit', courseController.edit)

router.put('/:id', courseController.update)

router.delete('/:id', courseController.delete)

router.delete('/:id/delete-forever', courseController.deleteForever)

router.patch('/:id/restore', courseController.restore)
// router.get('/', courseController.index);
// router.get('/:id', courseController.Minus)
// router.get('/:id', courseController.Plus)

module.exports = router;