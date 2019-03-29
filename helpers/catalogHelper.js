module.exports = function (callbackFromHelper) {

    const async = require('async');
    async.waterfall([
        function (callback) {
            const bby = require('bestbuy')();
            bby.categories('', {pageSize: 1}, function (err, data) {
                if (err) {
                    console.warn(err);
                    callback(err, null)
                } else if (data.total === 0) {
                    console.log('No categories found');
                    callback(null, data)
                }
                else {
                    console.log('Found %d categories. First category (%s): %s', data.total, data.categories[0].id, data.categories[0].name);
                    callback(null, data)
                }
            });
        },
        function (obj, callback) {
            for (let i = 0; i < obj.length; i++) {
                console.log(obj[i]);
            }
            const response = {};
            callback(null, response)
        }
    ], function (err, result) {
        callbackFromHelper(err, result)
    });
};