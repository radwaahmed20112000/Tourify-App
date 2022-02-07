const express = require('express');
const router = express.Router();
const auth = require("../Middleware/authentication")
let CommentController = require('../Controllers/CommentController');

router.post('/Comment', auth, CommentController.comment);


module.exports = router; 