const mongoose = require('mongoose');

require('dotenv').config();
const autoIndex = process.env.NODE_ENV !== 'production';
mongoose.Promise = global.Promise;
const db = mongoose.createConnection(process.env.mongodb_uri, { useUnifiedTopology: true, useNewUrlParser: true, autoIndex }, () => {
    console.log("Connect to MongoDB");

});
module.exports = db