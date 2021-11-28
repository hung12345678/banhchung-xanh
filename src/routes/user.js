const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController')
const csrf = require('csurf')
const csrfProtecsion = csrf();
router.use(csrfProtecsion);

router.get('/singin', userController.singin);
router.post('/admin', userController.admin);
module.exports = router;