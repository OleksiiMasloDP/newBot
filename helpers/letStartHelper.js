module.exports = function() {
    return {
        attachment: {
            type: "template",
            payload: {
                template_type: "button",
                text: "Welcome to the Bot Toad, I cant help but i can jump.",
                buttons:[{
                    type: "postback",
                    title: "Lets jump",
                    payload: "sample_get_started_payload"
                }]
            }
        }
    }
};