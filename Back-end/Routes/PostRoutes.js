const express = require('express');
const router = express.Router();
let PostController = require('../Controllers/PostController');

router.post('/TripCreation',PostController.createPost);
router.post('/edit',PostController.editPost);
router.get('/:id/:token',PostController.getPost);
router.get('/feed' , PostController.getFeedPosts);
router.get('/feedCount', PostController.getFeedPostsCount);
router.delete('/delete', PostController.deletePost);
router.get('/profilePosts', PostController.getProfilePosts);

module.exports = router;