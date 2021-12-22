var normalizedPath = require("path").join(__dirname, "Models");

require("fs").readdirSync(normalizedPath).forEach(function (file) {
    let table = require("./Models/" + file);
    console.log(table.tableName)
    console.log(__dirname)
});
