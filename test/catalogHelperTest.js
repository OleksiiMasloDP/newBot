const catalogHelper = require("../helpers/catalogHelper"),
    fs = require("fs");
const categories = JSON.parse(fs.readFileSync(__dirname + '/categories.json', 'utf8'));
catalogHelper.prepareCategories(categories, function(err, response) {
    console.log(response);
});