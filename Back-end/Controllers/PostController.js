const DB = require('../DB/pool')
const Post = require('../Models/Post')

module.exports= {

   getFeedPosts: (req, res) =>{
      let limit = req.query.limit || 100;
      let offset = req.query.offset || 0;
      
      if (!userId)
         res.status(403)
      
      let query = `USER.userId != ${userId}`;

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



}

