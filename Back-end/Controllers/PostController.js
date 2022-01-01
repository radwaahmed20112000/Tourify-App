const { is } = require('express/lib/request');
const pool = require('../DB/pool');
const DB = require('../DB/pool')
const Post = require('../Models/Post')
const Photo = require('../Models/Photo')
const PostLocation = require('../Models/PostLocation')
const PostPhoto = require('../Models/PostPhoto')
const PostTags = require('../Models/PostTags')
const Tag = require('../Models/Tag')
const jwt = require("jsonwebtoken");
const { createPostLocation } = require('../Models/PostLocation');
const { createPostTags } = require('../Models/PostTags');

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


   async create:(req, res) =>{    
      //const decoded = jwt.decode(req.body.token); 
      //const temp = decoded.split("'");
      const userId = "Radwa";
      var postId;
      
         if(req.body.constructor === Object && Object(req.body).length === 0){
            res.send(400).send({success: false, message: 'Please fill all field'});
            console.log("no data");
         }

         const newPost = new Post(userId,req.body);
         await Post.createPost(newPost,(err,post)=>{
            if(err) res.send(err); 
            postId = post.insertId;
            res.json({status: true, message: 'Post created successfuly',data: post.insertId});
         });
         //createPhoto(req,res,postId);
         //createPostLocation(req,res,postId);
         //createTags(req,res,postId);
         
   },
 
   createPhoto:(req,res,postId) =>{
      for(let i = 0;i < req.body.photos;i++){
         var photoId;
         var photo = req.body.photos[i];
         var newPhoto = new Photo(postId,photo);
         
         Photo.createPhoto(newPhoto,(err,photo)=>{
         if(err)res.send(err);  
         photoId = photo.insertId;
         res.json({status: true, message: 'Photo created successfuly',data: photo.insertId});
         });
         createPostPhoto(res,postId,photoId);
      }
   },
   
   createPostPhoto:(res,postId,photoId) =>{
      var newPostPhoto = new PostPhoto(postId,photoId);
      PostPhoto.createPostPhoto(newPostPhoto,(err,post_photo)=>{
         if(err)res.send(err);
         res.json({status: true, message: 'PostPhoto created successfuly'});
      });
   },

   createPostLocation:(req,res,postId) =>{
      const newPostLocation = new PostLocation(postId,req.body);
      PostLocation.createPostLocation(newPostLocation,(err,post_location)=>{
         if(err)res.send(err);
         res.json({status: true, message: 'PostLocation created successfuly'});
      });
   },

   createTags:(req,res,postId) =>{
      for(let i = 0;i < req.body.tags;i++){
         var tag = req.body.tags[i];
         const newTag = new Tag(tag);

         Tag.createTag(newTag,(err,tag)=>{
            if(err)res.send(err);
            tagId = tag.insertId;
            res.json({status: true, message: 'Tag created successfuly',data: tag.insertId});
         });
         createPostTags(postId,tagId);

      }
   },

   createPostTag:(postId,tagId) =>{
      var newPostTags = new PostTags(postId,tagId);
      PostTags.createPostTags(newPostTags,(err,post_tags)=>{
         if(err)res.send(err);
         res.json({status: true, message: 'PostTags created successfuly'});
      });
   }

}

