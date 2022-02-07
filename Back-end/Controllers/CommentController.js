const Notification = require('../Services/SendNotification')
const Account = require('../Models/Account.js');

module.exports = {
    comment: (req, res) => {
        Account.findEmail(email, (err, user) => {

            if (err) {
                return res.status(500).json(err);

            }
            if (user.length == 0) {
                return res.status(404).json({ message: "user not found" });
            }
            else {
                // check
                const name = user.name
                const message = {
                    to: pushToken,
                    sound: 'default',
                    body: `'${name} commented on your post'`,
                    data: { post_id: req.post_id, comment_id: #TODO },
                }
                //get notification token of owner from post id
                //insert notification into database
                const pushToken = ''
                Notification.sendNotification([pushToken], message)
            }
        });


    }
}