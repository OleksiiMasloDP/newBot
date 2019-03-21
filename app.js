'use strict';

// Imports dependencies and set up http server
const
    request = require('request'),
    express = require('express'),
    bodyParser = require('body-parser'),
    handleMessage = require('./messageHandler'),
    handlePostback = require('./postbackHandler'),
    botProfile = require("./botProfile"),
    app = express().use(bodyParser.json()), // creates express http server
    aws = require('aws-sdk');

// env = require('node-env-file');
//env(__dirname + '/.env');

let heroku = new aws.heroku({
    accessPageToken: process.env.PAGE_TOKEN,
    accessVerifyToken: process.env.VERIFY_TOKEN,
    port: process.env.PORT
});
// Sets server port and logs message on success
app.listen(process.env.PORT, () => console.log('webhook is listening'));
botProfile();
app.post('/webhook', function (req, res) {
    const body = req.body;

    if (body.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }

        });

        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');

    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
});
app.get('/webhook', function (req, res) {

    const VERIFY_TOKEN = "webhook_oleksiidp_chatbot";

// Parse params from the webhook verification request
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

// Check if a token and mode were sent
    if (mode && token) {

        // Check the mode and token sent are correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Respond with 200 OK and challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(403)
    }
});