const table = 'PostPhoto';
const DB = require("../DB/pool");
const tableName = 'PostPhoto';

module.exports = {

    tableName: tableName,

    createPostPhoto: async  (post_id, photos) => {
        for (const photo of photos) {
            let insertQuery = `INSERT INTO ${tableName}  VALUES  ("${post_id}","${photo.name}" ) ;`;
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

