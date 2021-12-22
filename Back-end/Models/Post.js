const table = 'Post';
const DB = require("../DB/pool");
const tableName = 'Post';
module.exports = {

    tableName: tableName,

    findOne : ()=>{

    },

    findAll : async ( query, limit ,offset, cb )=>{
    
       query =query || '';
     
        let selectQuery = `SELECT * FROM ${tableName} LIMIT ${limit} OFFSET ${offset}  ${query ? 'WHERE ' + query : ''} ;`;

        try {
            let posts = await DB(selectQuery)
            console.log("posts: ", posts)
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


    },




}