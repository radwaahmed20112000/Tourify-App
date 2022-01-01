const table = 'PostLocation';
const DB = require("../DB/pool");
const tableName = 'PostLocation';

module.exports = {

    tableName: tableName,

    createPostLocation: async  (post_id, newPost) => {
        let insertQuery = `INSERT INTO ${tableName}  VALUES
            ("${post_id}","${newPost.latitude}","${newPost.longitude}") ;`;
        try {
            let res = await DB(insertQuery)
            return res
        }
        catch (e) {
            return e
        }
    }
}


