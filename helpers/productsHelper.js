const prepareProducts = function (obj, callback) {
    const elements = obj.products.map(item => {
        const carousel = {};
        carousel.title = item.name;
        carousel.image = item.url;
        carousel.price = item.salePrice;
        return {
            "title": carousel.title,
            "image_url": carousel.image,
            "default_action": {
                "type": "web_url",
                "url": "https://petersfancybrownhats.com/view?item=103",
                "webview_height_ratio": "tall",
            },
            "buttons": [
                {
                    "type": "payment",
                    "title": "But Button",
                    "payload": "DEVELOPER_DEFINED_PAYLOAD",
                    "payment_summary": {
                        "currency": "USD",
                        "payment_type": "FIXED_AMOUNT",
                        "is_test_payment": true,
                        "merchant_name": carousel.title,
                        "requested_user_info": [
                            "shipping_address",
                            "contact_name",
                            "contact_phone",
                            "contact_email"
                        ],
                        "price_list": [
                            {
                                "label": carousel.title,
                                "amount": carousel.salePrice
                            }
                        ]
                    }
                }
            ]
        };
    });
   const response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": elements
            }
        }
    };
    callback(null, response);
};

module.exports.prepareProducts = prepareProducts;
module.exports.handle = function (payload, callbackFromHelper) {
    const async = require('async');
    const categorieId = payload.replace('CHOOSE_', '');
    async.waterfall([
            function (callback) {
                const bby = require('bestbuy')();
                bby.products('(categoryPath.id=' + categorieId + ')', {
                    show: 'salePrice,name',
                    pageSize: 10
                }, function (err, data) {
                    if (err) {
                        console.warn(err);
                        callback(err, null)
                    } else if (!data && !err) {
                        console.log('Data is undefiend');
                        err = {msg: "data undifiend"};
                        callback(err, null)
                    }
                    else if (data.total === 0) {
                        console.log('No products found');
                        callback(err, null)
                    }
                    else {
                        console.log('Found %d products. First match "%s" is $%d', data.total, data.products[0].name, data.products[0].salePrice);
                        callback(null, data)
                    }
                });
            },
            prepareProducts
        ], function (err, result) {
            callbackFromHelper(err, result)
        }
    )
};