const callSendAPI = require('./callbackHandler'),
    catalogHelper = require('./helpers/catalogHelper');

module.exports = function handleMessage(sender_psid, received_message) {
    let response;
    let payload = received_message.payload;

    if (received_message.text && payload === 'SHOP') {
        catalogHelper.handle(function (err, response) {
            callSendAPI(sender_psid, response);
        });
        return;
    } else if (payload === 'MY_PURCHASES') {

    } else if (payload === 'FAVORITES') {

    } else if (payload === 'INVITE_FRIEND') {

    }

    // Checks if the message contains text
    /*if (received_message.text) {
        // Create the payload for a basic text message, which
        // will be added to the body of our request to the Send API
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
        }
    } else if (received_message.attachments) {
        // Get the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url;
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Is this the right picture?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": attachment_url,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Yes!",
                                "payload": "yes"
                            },
                            {
                                "type": "postback",
                                "title": "No!",
                                "payload": "no"
                            }
                        ]
                    }]
                }
            }
        }
    }
*/
    // Send the response message
    callSendAPI(sender_psid, response);
};