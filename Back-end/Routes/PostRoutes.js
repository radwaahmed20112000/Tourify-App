const express = require('express');
const router = express.Router();
let PostController = require('../Controllers/PostController');


router.get('/' , PostController.getFeedPosts);

module.exports = router ;