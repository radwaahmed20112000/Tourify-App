const table = 'PostLocation';
const DB = require("../DB/pool");
const tableName = 'PostLocation';

module.exports = {

    tableName: tableName,

  createPostLocation: async  (post_id,newPost) => {
        let insertQuery = `INSERT INTO ${tableName}  VALUES
          ("${post_id}","${newPost.latitude}","${newPost.longititude}") ;`;
        try {
            let res = await DB(insertQuery)
            console.log(res)
            return cb(null, res);

        } catch (e) {
            console.log(e)
            return cb(e, null);
        }
    }
}


