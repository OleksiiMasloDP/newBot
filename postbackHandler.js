const callSendAPI = require('./callbackHandler'),
    letStartHelper = require('./helpers/letStartHelper'),
    shopListHelper = require('./helpers/shopListHelper'),
    productsHelper = require('./helpers/productsHelper'),
    catalogHelper = require('./helpers/catalogHelper');

module.exports = function postbackHandler(sender_psid, received_postback) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'lets_start') {
        response = letStartHelper();
    } else if (payload === 'MAIN_MENU') {
        response = letStartHelper();
    } else if (payload === 'CATALOG') {
        catalogHelper.handle(function (err, response) {
            callSendAPI(sender_psid, response);
        });
        return;
    } else if (payload.startsWith('CHOOSE_')) {
        productsHelper.handle(payload, function (err, response) {
            callSendAPI(sender_psid, response);
        });
        return;
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
};