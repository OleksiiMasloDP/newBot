const prepareCategories = function (obj, callback) {
    const elements = obj.categories.map(item => {
        const carousel = {};
        carousel.title = item.name;
        carousel.id = item.id;
        return {
            "title": carousel.title,
            "default_action": {
                "type": "web_url",
                "url": "https://petersfancybrownhats.com/view?item=103",
                "webview_height_ratio": "tall",
            },
            "buttons": [
                {
                    "type": "postback",
                    "title": "Choose " + carousel.title,
                    "payload": "CHOOSE_" + carousel.id
                }
            ]
        };
    });
    const response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": elements
            }
        }
    };
    callback(null, response);
};
module.exports.prepareCategories = prepareCategories;
module.exports.handle = function (callbackFromHelper) {
    const async = require('async');
    async.waterfall([
        function (callback) {
            const bby = require('bestbuy')();
            bby.categories('', {pageSize: 10}, function (err, data) {
                if (err) {
                    console.warn(err);
                    callback(err, null)
                } else if (!data && !err) {
                    console.log('Data is undefiend');
                    err = {msg: "data undifiend"};
                    callback(err, null)
                }
                else if (data.total === 0) {
                    console.log('No categories found');
                    callback(null, data)
                }
                else {
                    console.log('Found %d categories. First category (%s): %s', data.total, data.categories[0].id, data.categories[0].name);
                    callback(null, data)
                }
            });
        },
        prepareCategories
    ], function (err, result) {
        callbackFromHelper(err, result)
    });
};