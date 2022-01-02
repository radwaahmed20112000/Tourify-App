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
    },

    editPostTags: async  (post_id,tags) => {
        for (const tag of tags) {
            let editQuery = `UPDATE ${tableName}  SET tag = "${tag}" WHERE post_id =  "${post_id}" AND tag = "${tag}" ;`;
            try {
                let res = await DB(editQuery)
                return res
            }
            catch (e) {
                return e
            }
        }
    }
}