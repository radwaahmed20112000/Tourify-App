const table = 'Photo';
const DB = require("../DB/pool");
const tableName = 'Photo';

class Photo {
    constructor(postId,photo) {
        this.post_id = postId;
        this.photo = photo.photo;
    }

    static creatPhoto(newPhotos, result) {

        DB('INSERT INTO Photo SET ?', newPhotos, (err, res) => {
            if (err) {
                console.log("Error while inserting photos");
                result(null, err);
            }
            else {
                console.log("Photos inserted successfuly");
                result(null, res);
            }
        });
    }
}
module.exports = Photo;

