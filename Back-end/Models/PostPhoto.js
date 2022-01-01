const table = 'PostPhoto';
const DB = require("../DB/pool");
const tableName = 'PostPhoto';

module.exports = {

    tableName: tableName,

  createPostPhoto: async  (post_id,photos) => {
    for (const photo of photos) {
        let insertQuery = `INSERT INTO ${tableName}  VALUES  ("${post_id}","${photo}" ) ;`;
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
}

