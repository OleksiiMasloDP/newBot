const request = require('request'),
    config = require("./config");


    module.exports = function (sender_psid) {
    const request_body = {
        "get_started": {"payload": "lets_start"}
    };
    request({
        "uri": "https://graph.facebook.com/v3.2/me/messenger_profile",
        "qs": {"access_token": config.pageToken},
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (
            !err
        ) {
            console.log('Profile configured')
        }
        else {
            console.error("Unable to configure profile:" + err);
        }
    });
    const menu_request_body = {
        "persistent_menu":[
            {
                "locale":"default",
                "composer_input_disabled": true,
                "call_to_actions":[
                            {
                                "type":"postback",
                                "title":"Main Menu",
                                "payload":"MAIN_MENU"
                            },
                            {
                                "type":"postback",
                                "title":"Catalog",
                                "payload":"CATALOG"
                            }
                ]
            }
        ]
    };
    request({
        "uri": "https://graph.facebook.com/v3.2/me/messenger_profile",
        "qs": {"access_token": config.pageToken},
        "method": "POST",
        "json": menu_request_body
    }, (err, res, body) => {
        if (
            !err
        ) {
            console.log('Menu configured')
        }
        else {
            console.error("Unable to configure menu:" + err);
        }
    });
    const greeting = {
        "get_started": {"payload": "lets_start"},
        "greeting": [
            {
                "locale":"default",
                "text":"Hello {{user_first_name}}!"
            }
        ]
    };
    request({
        "uri": "https://graph.facebook.com/v3.2/me/messenger_profile",
        "qs": {"access_token": config.pageToken},
        "method": "POST",
        "json": greeting
    }, (err, res, body) => {
        if (
            !err
        ) {
            console.log('Greeting configured')
        }
        else {
            console.error("Unable to configure greeting:" + err);
        }
    });
};