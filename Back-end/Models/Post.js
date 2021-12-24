const table = 'Post';
const { TIMESTAMP } = require("mysql/lib/protocol/constants/types");
const DB = require("../DB/pool");
const tableName = 'Post';

class Post {
    constructor(user_id,post) {
        this.user_id = user_id;
        this.body = post.description;
        this.created_at = new TIMESTAMP;
        this.updated_at = post.updated_at;
        this.duration = post.duration;
        this.organisation = post.organisation;
        this.rate = post.rate;
        this.budget = post.budget;
    }

    static createPost(newPost, result) {

        DB('INSERT INTO Post SET ?', newPost, (err, res) => {
            if (err) {
                console.log("Error while inserting post");
                result(null, err);
            }
            else {
                console.log("Post created successfuly");
                result(null, res);
            }
        });
    }
}

module.exports = Post;

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
            console.log("posts count: ", count)
            return cb(null, count[0]);

        } catch (e) {
            console.log(e)
            return cb(e, null);

        }
    }

}