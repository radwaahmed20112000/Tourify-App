const { is } = require('express/lib/request');
const pool = require('../DB/pool');
const Post = require('../Models/Post')
const PostLocation = require('../Models/PostLocation')
const PostPhoto = require('../Models/PostPhoto')
const PostTags = require('../Models/PostTags')
const jwt = require("jsonwebtoken");

module.exports= {

   getFeedPosts: (req, res) =>{
      let limit = req.query.limit || 100;
      let offset = req.query.offset || 0;
      
      if (!req.userId)
         res.status(403)

      let query = `USER.userId != ${req.userId}`;

      Post.findAll(query, limit, offset, (err, posts) =>{
         
         if(err)
            return res.status(500).json(err);
         
         return res.json(posts);


      })

   },
   getFeedPostsCount: (req, res) => {

      Post.count(null, (err, count) => {

         if (err)
            return res.status(500).json(err);

         return res.json(count);


      })

   },


   createPost: async  (req, res) =>{  
      //token should be handled here  
      var post_id;
   
      await Post.createPost(req.body, (err, post) => {
         post_id = post.insertId;
      })
      .then(() => {
         PostPhoto.createPostPhoto(post_id, req.body.photos)
         PostLocation.createPostLocation(post_id, req.body)
         PostTags.createPostTags(post_id, req.body.tags)
         console.log(post_id)
         return
      })

      .then(() => res.status(200) )

      .catch((err) => {
         return res.status(500).json(err);
      });
   
   }
}
