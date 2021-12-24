const table = 'Post';
const DB = require("../DB/pool");
const tableName = 'Post';
module.exports = {

    tableName: tableName,

    findOne : ()=>{

    },

    findAll : async ( query, limit ,offset, cb )=>{
    
       query =query || '';
     
        let selectQuery = `SELECT
                              post.postId , user.userId, title, body,rating ,name as userName ,photo as userPhoto , photos
                            FROM
                                (post join user)
                                LEFT JOIN (
                                    SELECT 
                                        postId, 
                                        JSON_ARRAYAGG(JSON_OBJECT('id', photoId, 'photo', photo)) photos 
                                    FROM photo 
                                    GROUP BY postId
                                ) ph ON POST.postId = ph.postId
                            ${query ? 'WHERE ' + query : ''}    LIMIT ${limit} OFFSET ${offset} `

        try {
            let posts = await DB(selectQuery)
            posts.forEach(p => {
                if (p.photos)
                    p.photos = JSON.parse(p.photos)                
            });

            return cb(null, posts);

        } catch (e) {
            console.log(e)
            return cb(e, null);

        }

    
    },

    count: async (query, cb) => {

        query = query || '';

        let selectQuery = `SELECT  count(*) AS count FROM  ${tableName}  ${query? 'WHERE '+query : ''} ;`;

        try {
            let count = await DB(selectQuery)
          
            return cb(null, count[0]);

        } catch (e) {
            console.log(e)
            return cb(e, null);

        }


    },




}