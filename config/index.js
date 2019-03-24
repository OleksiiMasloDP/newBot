const env = require('node-env-file');

try {
    env(__dirname + '/.env');
} catch (e) {
    console.log("Cant load environment" + e)
}

const config = {
    port: process.env.PORT,
    verifyToken: process.env.VERIFY_TOKEN,
    pageToken: process.env.PAGE_TOKEN,
    bestBuyToken: process.env.BBY_API_KEY
};

if(!config.port){
    throw new Error("Cant find PORT variable")
}
if(!config.pageToken){
    throw new Error("Cant find PAGE_TOKEN variable")
}
if(!config.verifyToken){
    throw new Error("Cant find VERIFY_TOKEN variable")
}
if(!config.bestBuyToken){
    throw new Error("Cant find BBY_API_KEY variable")
}
module.exports = config;