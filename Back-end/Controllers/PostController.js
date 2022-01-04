const { is } = require('express/lib/request');
const pool = require('../DB/pool');
const Post = require('../Models/Post')
const PostLocation = require('../Models/PostLocation')
const PostPhoto = require('../Models/PostPhoto')
const PostTags = require('../Models/PostTags')
const {uploadPhotosToAzure} = require('../Services/PhotoUpload')
const atob = require('atob')
module.exports = {

   getFeedPosts: (req, res) => {
      let limit = req.query.limit || 100;
      let offset = req.query.offset || 0;

      if (!req.user_id)
         res.status(403)

      let query = `user.email != '${req.user_id}'`;

      Post.findAll(query, limit, offset, (err, posts) => {
         if (err)
            return res.status(500).json(err);
         console.log("MAMA")
         console.log(posts)
         return res.send(posts);
      })

   },

   getProfilePosts: (req, res) => {
      let limit = req.query.limit || 100;
      let offset = req.query.offset || 0;

      // var base64Url = req.body.email.split('.')[1];
      // var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      // var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      //    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      // }).join(''));
      // const email = JSON.parse(jsonPayload).email;


      let query = `user.email = '${req.user_id}'`;

      Post.findAll(query, limit, offset, (err, posts) => {

         if (err)
            return res.status(500).json(err);

         return res.send(posts);
      })

   },

   getFeedPostsCount: (req, res) => {

      Post.count(null, (err, count) => {

         if (err)
            return res.status(500).json(err);

         return res.json(count);


      })

   },

   deletePost: (req, res) => {
      console.log(req.query)
      Post.delete(req.query.id, (err) => {

         if (err)
            return res.status(500).json(err);

         return res.json();


      })
   },


   getPost: (req, res) => {
      console.log("recieved")
      console.log(req.params) 
      var base64Url = req.params.token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const email = JSON.parse(jsonPayload);
      const post_id = req.params.id;

      Post.findOne(post_id, email.email, (err, post) => {
         if (err){
            console.log(err);
            return res.status(500).json(err);
         }
         console.log(post);
         return res.send(post);
      })

   },

   parseJwt: (token) => {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload).email;
   },


   createPost: async (req, res) => {
      var base64Url = req.body.email.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const email = JSON.parse(jsonPayload);
      var post_id;
      let photos = await uploadPhotosToAzure(req.body.photos)
      console.log("hi from photos")
      console.log(photos)
      console.log("hi")
      await Post.createPost(email.email, req.body, (err, post) => {
         post_id = post.insertId;
      })
      .then(() => {
         console.log("hi")
         console.log(photos)
         PostPhoto.createPostPhoto(post_id, photos)
         PostLocation.createPostLocation(post_id, req.body)
         PostTags.createPostTags(post_id, req.body.tags)
         console.log(post)
         return
      })
      .then(() => {
         console.log("hi")
         console.log(photos)
         PostPhoto.createPostPhoto(post_id, photos)
         PostLocation.createPostLocation(post_id, req.body)
         PostTags.createPostTags(post_id, req.body.tags)
         console.log(post)
         return
      })

      .then(() => {return res.status(200).json({})})

      .catch((err) => {
         return res.status(500).json(err);
      });

   },

   editPost: async (req, res) => {
      console.log("received");
      var base64Url = req.body.email.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const email = JSON.parse(jsonPayload);

      await Post.editPost(email.email, req.body)
      .then(() => {
         PostPhoto.createPostPhoto(post_id, req.body.photos)
         PostPhoto.deletePostPhoto(post_id, req.body.deletedPhotos)
         PostTags.createPostTags(post_id, req.body.tags)
         PostTags.deletePostTags(post_id, req.body.deletedTags)
         PostLocation.editPostLocation(post_id, req.body)
         console.log(post_id)
         return
      })

      .then(() => res.status(200))

         .catch((err) => {
            return res.status(500).json(err);
         });

   }

}