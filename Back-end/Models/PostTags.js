const table = 'PostTags';
const DB = require("../DB/pool");
const tableName = 'PostTags';


module.exports = {

    tableName: tableName,

    createPostTags: async  (post_id, tags) => {
        try {
            await tags.forEach(t = (tag) => {
            let insertQuery = `INSERT INTO ${tableName}  VALUES  (${post_id},"${tag}" ) ;`;
             DB(insertQuery)
            });
            return
        }
        catch (e) {
             return e
        }
    },

    deletePostTags: async  (post_id,tags) => {
        try {
            await tags.forEach(t = (tag) => {
                let deleteQuery = `DELETE FROM ${tableName} WHERE post_id = ${post_id} AND tag_name = "${tag}" ;`;
                DB(deleteQuery)
            });
        }
        catch (e) {
            return e
        }
     }
}