const express = require('express');
const router = express.Router();
let PostController = require('../Controllers/PostController');

router.post('/TripCreation',PostController.createPost);
router.get('/feed' , PostController.getFeedPosts);
router.get('/feedCount', PostController.getFeedPostsCount);


module.exports = router ;