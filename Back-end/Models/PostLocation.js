const table = 'PostLocation';
const DB = require("../DB/pool");
const tableName = 'PostLocation';

var PostLocation = function(postId,post_location){
        this.post_id = postId;
        this.latitude = post_location.latitude;
        this.longitude = post_location.longitude;
}

    PostLocation.createPostLocation = (newPostLocation, result) => {

        DB('INSERT INTO PostLocation SET ?', newPostLocation, (err, res) => {
            if (err) {
                console.log("Error while inserting location");
                result(null, err);
            }
            else {
                console.log("Location inserted successfuly");
                result(null, res);
            }
        });

}
module.exports = PostLocation;


