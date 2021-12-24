const table = 'PostPhoto';
const DB = require("../DB/pool");
const tableName = 'PostPhoto';

var PostPhoto = function(postId,photoId){
        this.post_id = postId;
        this.photo_id = photoId;
}

PostPhoto.createPostPhoto = (newPostPhotos, result) =>{

        DB('INSERT INTO PostPhotos SET ?', newPostPhotos, (err, res) => {
            if (err) {
                console.log("Error while inserting in PostPhotos");
                result(null, err);
            }
            else {
                console.log("PostPhotos inserted successfuly");
                result(null, res);
            }
        });
}

module.exports = PostPhoto;


