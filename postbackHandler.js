const callSendAPI = require('./callbackHandler'),
    letStartHelper = require('./helpers/letStartHelper'),
    shopListHelper = require('./helpers/shopListHelper'),
    catalogHelper = require('./helpers/catalogHelper');

module.exports = function postbackHandler(sender_psid, received_postback) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'yes') {
        response = {"text": "Thanks!"}
    } else if (payload === 'no') {
        response = {"text": "Oops, try sending another image."}
    } else if (payload === 'lets_start') {
        response = letStartHelper();
    } else if (payload === 'MAIN_MENU') {
        response = letStartHelper();
    } else if (payload === 'CATALOG') {
        catalogHelper.handle(function (err, response) {
            callSendAPI(sender_psid, response);
        });
        return;
    } else if (payload === 'SHOP') {
        response = shopListHelper();
    }

    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
};