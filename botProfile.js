const request = require('request');

module.exports = function () {
    const request_body = {
        "get_started": {"payload": "lets_start"}
    };
    request({
        "uri": "https://graph.facebook.com/v3.2/me/messenger_profile",
        "qs": {"access_token": process.env.page_token},
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
                        "title":"My Account",
                        "type":"nested",
                        "call_to_actions":[
                            {
                                "title":"Pay Bill",
                                "type":"postback",
                                "payload":"PAYBILL_PAYLOAD"
                            },
                            {
                                "type":"web_url",
                                "title":"Latest News",
                                "url":"https://www.messenger.com/",
                                "webview_height_ratio":"full"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    request({
        "uri": "https://graph.facebook.com/v3.2/me/messenger_profile",
        "qs": {"access_token": process.env.page_token},
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
};