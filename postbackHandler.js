const callSendAPI = require('./callbackHandler'),
    letStartHelper = require ('./helpers/letStartHelper');

module.exports = function postbackHandler (sender_psid, received_postback) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'yes') {
        response = {"text": "Thanks!"}
    } else if (payload === 'no') {
        response = {"text": "Oops, try sending another image."}
    } else if(payload === 'sample_get_started_payload') {
        response = {
            "text": 'Lets start'
        }
    } else if (payload === 'lets_start') {
        response = letStartHelper();
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
};