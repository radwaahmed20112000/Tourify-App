const Notify = require('../Models/Notification')

module.exports = {

   getNotifications: (req, res) => {

        const reciever_id = req.body.reciever_id

        Notify.findAll(reciever_id, (err, notifications) => {
            if (err)
                return res.status(500).json(err);

            console.log(notifications)
            return res.send(notifications);
        })

    },

    viewNotification: (req, res) => {

        const id = req.params.id

        Notify.markAsRead(id, (err) => {
            if (err)
                return res.status(500).json(err);
            return res.json();
        })
    },

    

}