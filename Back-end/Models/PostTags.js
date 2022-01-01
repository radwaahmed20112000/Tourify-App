const table = 'PostTags';
const DB = require("../DB/pool");
const tableName = 'PostTags';


module.exports = {

    tableName: tableName,

    createPostTags: async  (post_id, tags) => {
        for (const tag of tags) {
            let insertQuery = `INSERT INTO ${tableName}  VALUES  ("${post_id}","${tag}" ) ;`;
            try {
                let res = await DB(insertQuery)
                return res
            }
            catch (e) {
                return e
            }
        }
    }
}