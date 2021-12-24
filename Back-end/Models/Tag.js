const table = 'Tag';
const DB = require("../DB/pool");
const tableName = 'Tag';

var Tag = function(tag){
        this.tag_name = tag.tag_name;
}

     createTag= (newTag, result) => {

        DB('INSERT INTO Tag SET ?', newTag, (err, res) => {
            if (err) {
                console.log("Error while inserting Tag");
                result(null, err);
            }
            else {
                console.log("Tag inserted successfuly");
                result(null, res);
            }
        });
}

module.exports = Tag;


