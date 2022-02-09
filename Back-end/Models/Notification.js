const DB = require("../DB/pool");
const tableName = 'Notification';

module.exports = {

    tableName: tableName,

    findAll: async (reciever_email, cb) => {
        
        let selectQuery = `SELECT 
                                ${tableName}.id, ${tableName}.comment_id, user.name,
                                ${tableName}.post_id, ${tableName}.sender_email, user.photo,
                                ${tableName}.viewed, ${tableName}.created_at
                            FROM 
                                (${tableName} JOIN user 
                                            ON ${tableName}.sender_email = user.email)
                            WHERE 
                                receiver_email = '${reciever_email}' 
                            ORDER BY 
                                created_at DESC;`

        try {

            let notifications = await DB(selectQuery)
            return cb(null, notifications)
        } 
        catch(e) {
            return cb(e, null)
        }
    },

    addNotification: async  (post_id, sender_email, receiver_email, comment_id=null) => {
        
        if (sender_email === reciever_email) return

        let insertQuery = `INSERT INTO
                                    ${tableName} (post_id, sender_email,
                                                receiver_email, comment_id, viewed)
                            VALUES  
                                    (${post_id}, '${sender_email}', 
                                    '${receiver_email}', ${comment_id}, false) ;`;
        try {
            DB(insertQuery)
            return
        }
        catch (e) {
             return e
        }
    },

    markAsRead: async  (notification_id, cb) => {
        
        let deleteQuery = `UPDATE 
                                ${tableName}  
                            SET 
                                viewed = true
                            WHERE 
                                id = ${notification_id};`;

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


