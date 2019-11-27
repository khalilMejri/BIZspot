require('dotenv').config({ path: __dirname + '/./../env' });
module.exports = {
    atlasMongo: {
        connector: 'mongodb',
        url: process.env.MONGODB_URL_DEV
    }
}