const { is } = require('express/lib/request');
const pool = require('../DB/pool');
const Post = require('../Models/Post')
const PostLocation = require('../Models/PostLocation')
const PostPhoto = require('../Models/PostPhoto')
const PostTags = require('../Models/PostTags')
const { uploadPhotosToAzure } = require('../Services/PhotoUpload')

module.exports= {

   getFeedPosts: (req, res) =>{
      let limit = req.query.limit || 100;
      let offset = req.query.offset || 0;

      var base64Url = req.body.email.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const email = JSON.parse(jsonPayload).email;
      console.log(email)

      let query = `USER.email != '${email}'`;

      Post.findAll(query, limit, offset, (err, posts) =>{
         
         if(err)
            return res.status(500).json(err);
         
         return res.json(posts);
      })

   },

   getProfilePosts: (req, res) => {
      let limit = req.query.limit || 100;
      let offset = req.query.offset || 0;

      var base64Url = req.body.email.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const email = JSON.parse(jsonPayload).email;


      let query = `USER.email = '${email}'`;

      Post.findAll(query, limit, offset, (err, posts) => {

         if (err)
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

   deletePost :(req ,res )=>{
      Post.delete(req.query.postId, (err) => {

         if (err)
            return res.status(500).json(err);

         return res.json();


      })
   },


   edit: (req, res) => {     
      var base64Url = req.body.email.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const email = JSON.parse(jsonPayload);
      const post_id = req.body.post_id;

      Post.findOne(post_id,email, (err, post) =>{
         if(err)
            return res.status(500).json(err);
         
         return res.json(post);
      })
   
   },

   parseJwt: (token) => {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload).email;
   },


   createPost: async  (req, res) =>{  
      var base64Url = req.body.email.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const email = JSON.parse(jsonPayload);
      var post_id;
   
      await Post.createPost(email.email, req.body, (err, post) => {
         post_id = post.insertId;
      })
      .then(() => {
         PostPhoto.createPostPhoto(post_id, req.body.photos)
         PostLocation.createPostLocation(post_id, req.body)
         PostTags.createPostTags(post_id, req.body.tags)
         uploadPhotosToAzure(req.body.photos)
         console.log(post_id)
         return
      })

      .then(() => res.status(200).json({}) )

      .catch((err) => {
         return res.status(500).json(err);
      });
   
   },

   editPost: async  (req, res) => {  
      var base64Url = req.body.email.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const email = JSON.parse(jsonPayload);
   
      await Post.editPost(email.email, req.body)
      .then(() => {
         PostPhoto.editPostPhoto(post_id, req.body.photos)
         PostLocation.editPostLocation(post_id, req.body)
         PostTags.editPostTags(post_id, req.body.tags)
         console.log(post_id)
         return
      })

      .then(() => res.status(200))

      .catch((err) => {
         return res.status(500).json(err);
      });
   
   }

}
