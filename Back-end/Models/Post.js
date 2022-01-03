const table = 'Post';
const { TIMESTAMP } = require("mysql/lib/protocol/constants/types");
const DB = require("../DB/pool");
const tableName = 'Post';

module.exports = {

    tableName: tableName,

    findOne: async (post_id, email, cb) => {
        let selectQuery = `SELECT
                                body, duration, organisation, rate, budget, currency, latitude, longititude, photos, tags
                                FROM
                                    (Post JOIN PostLocation)
                                    JOIN (
                                        SELECT 
                                            post_id, 
                                            JSON_ARRAYAGG(photo) photos 
                                        FROM PostPhoto 
                                        GROUP BY post_id
                                    ) ph ON Post.post_id = ph.post_id
                                    JOIN (
                                        SELECT 
                                        post_id, 
                                        JSON_ARRAYAGG(tag_name) tags 
                                        FROM PostTags 
                                        GROUP BY post_id
                                    ) t ON Post.post_id = t.post_id
                                WHERE Post.post_id = ${post_id} AND email = ${email}`
        try {
            let post = await DB(selectQuery)
                .then(
                    post.forEach(p => {
                        if (p.photos)
                            p.photos = JSON.parse(p.photos)
                    }),

                    post.forEach(t => {
                        if (t.tags)
                            t.tags = JSON.parse(t.tags)
                    })
                )

            return cb(null, post);

        } catch (e) {
            console.log(e)
            return cb(e, null);
        }
    },

    findAll: async (query, limit, offset, cb) => {

        query = query || '';

        let selectQuery = `SELECT
                              post.post_id , user.email,  body,name as userName , photo as userPhoto , photos
                            FROM
                                (post join user  on user.email = post.email )
                                LEFT JOIN (
                                    SELECT 
                                        post_id, 
                                        JSON_ARRAYAGG(JSON_OBJECT('photo', photo)) photos 
                                    FROM PostPhoto 
                                    GROUP BY post_id
                                ) ph ON Post.post_id = ph.post_id
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

        let selectQuery = `SELECT  count(*) AS count FROM  ${tableName}  ${query ? 'WHERE ' + query : ''} ;`;

        try {
            let count = await DB(selectQuery)

            return cb(null, count[0]);

        } catch (e) {
            console.log(e)
            return cb(e, null);

        }
    },
    delete: async (postId,cb) => {

        let query = `DELETE FROM  ${tableName} WHERE  post_id = ${postId} `;

        try {

            await DB(query)

            return cb(null);

        } catch (e) {
            console.log(e)
            return cb(e);

        }

    },

    createPost: async (email, newPost, cb) => {
        let insertQuery = `INSERT INTO ${tableName} 
            (email, body, duration, organisation, rate, budget, currency, number_of_comments, number_of_likes)  VALUES
            ("${email}","${newPost.body}","${newPost.duration}","${newPost.organisation}",${newPost.rate}, "${newPost.budget}","${newPost.currency}", 0, 0 ) ;`;
        try {
            let res = await DB(insertQuery)
            console.log(res)
            return cb(null, res);

        } catch (e) {
            console.log(e)
            return cb(e, null);
        }
    },

    editPost: async (email, editedPost) => {
        let editQuery = `UPDATE ${tableName} 
            SET body = "${editedPost.body}" , duration = "${editedPost.duration}",
                organisation = ,"${editedPost.organisation}", rate = ${editedPost.rate},
                budget = "${editedPost.budget}", currency = "${editedPost.currency}"  
            WHERE
                email = "${email}" AND post_id = "${editedPost.post_id}";`;
        try {
            let res = await DB(editQuery)
            return res
        }
        catch (e) {
            return e
        }
    },
    getOne: async (postId, cb)=>{
        if(!postId)
            return cb (null,null)
        
        let query = `SELECT FROM  ${tableName} WHERE  post_id = ${postId} `;

        try {

            let post = await DB(query)

            return cb(null,post );

        } catch (e) {
            console.log(e)
            return cb(e,null);

        }
    }


}
