const express = require('express');
const router = express.Router();
let PostController = require('../Controllers/PostController');

router.post('/TripCreation',PostController.createPost);
router.post('/edit',PostController.edit);
router.post('/TripEdition',PostController.editPost);
router.get('/feed' , PostController.getFeedPosts);
router.get('/feedCount', PostController.getFeedPostsCount);
router.delete('/delete', PostController.deletePost);
router.get('/profilePosts', PostController.getProfilePosts);

module.exports = router ;