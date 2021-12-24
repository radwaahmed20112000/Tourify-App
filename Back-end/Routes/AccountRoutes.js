const express = require('express');
const accountController = require('../Controllers/AccountController');
const router = express.Router();

router.post('/login', accountController.login);
router.post('/signup',accountController.signup);

module.exports = router;