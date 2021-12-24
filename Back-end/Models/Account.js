const DB = require("../DB/pool");
const tableName = 'user';
module.exports = {

    tableName: tableName,



    findEmail : async ( email, cb )=>{
    
        email =email || '';
      
         let selectQuery = `SELECT * FROM ${tableName} WHERE userId = "${email}" ;`;
    
         try {
             let user = await DB(selectQuery)
             console.log("user : ", user)
             return cb(null, user);
    
         } catch (e) {
             console.log(e)
             return cb(e, null);
    
         }
    
     
     },

     getPassword : async ( email, cb )=>{
    
        email =email || '';
      
         let selectQuery = `SELECT password FROM ${tableName} WHERE userId = "${email}" ;`;
    
         try {
             let password = await DB(selectQuery)
             console.log("user : ", password)
             return cb(null, password);
    
         } catch (e) {
             console.log(e)
             return cb(e, null);
    
         }
    
     
     },


    create: async (account, cb) => {
        let insertQuery = `INSERT INTO ${tableName}  VALUES  ("${account.email}","${account.name}","${account.password}","${account.photo}","${account.googleBool}", "${account.country}" ) ;`;
        try {
            let user = await DB(insertQuery)
            console.log("inserted account : ", user)
            return cb(null, user);

        } catch (e) {
            console.log(e)
            return cb(e, null);

        }


    },




}










