const request = require('request'),
    config = require("./config");

module.exports = function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v3.2/me/messages",
        "qs": {"access_token": config.pageToken},
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (
            !err
        ) {
            console.log('message sent!')
        }
        else {
            console.error("Unable to send message:" + err);
        }
    });
};