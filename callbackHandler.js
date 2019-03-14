const request = require('request');

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
        "qs": {"access_token": process.env.page_token},
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