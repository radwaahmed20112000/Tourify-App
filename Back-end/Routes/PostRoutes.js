const express = require('express');
const router = express.Router();
let PostController = require('../Controllers/PostController');


router.get('/feed' , PostController.getFeedPosts);

module.exports = router ;