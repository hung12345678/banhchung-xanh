const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/siteControllers');

// newController.index


router.get('/search', newsController.search);
router.get('/', newsController.index);
module.exports = router;
