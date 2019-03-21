const env = require('node-env-file');

try {
    env(__dirname + '/.env');
} catch (e) {
    console.log("Cant load environment" + e)
}

const config = {
    port: process.env.PORT,
    verifyToken: process.env.VERIFY_TOKEN,
    pageToken: process.env.PAGE_TOKEN
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
module.exports = config;