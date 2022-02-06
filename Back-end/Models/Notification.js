const DB = require("../DB/pool");
const tableName = 'Notification';

module.exports = {

    tableName: tableName,

    findAll: async (reciever_id, cb) => {
        try {
            let selectQuery = `SELECT * FROM ${tableName} 
                                WHERE reciever_id = '${reciever_id}'
                                ORDER BY created_at DESC;`
            let notifications = await DB(selectQuery)
            return cb(null, notifications)
        } 
        catch(e) {
            return cb(e, null)
        }
    },

    addNotification: async  (post_id, sender_id, reciever_id, content) => {
        if (sender_id === reciever_id) return
        try {
            let insertQuery = `INSERT INTO ${tableName} 
                                (post_id, sender_id, reciever_id, content, viewed)
                                VALUES  (${post_id}, '${sender_id}', 
                                '${reciever_id}', '${content}', false) ;`;
            DB(insertQuery)
            return
        }
        catch (e) {
             return e
        }
    },

    markAsRead: async  (notification_id, cb) => {
        let deleteQuery = `UPDATE ${tableName}  
                                SET viewed = true
                                WHERE id = ${notification_id};`;
        console.log({deleteQuery})
    
        try {
            DB(deleteQuery)
            return cb(null)
        }
        catch (e) {
            return cb(e)
        }
    },
    
    
}


