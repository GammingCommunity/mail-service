const mongoose= require('mongoose');
const db= require('../connection/connection');
const codeValidation = mongoose.Schema({
    requestID:{
        type:String,
        unique:true
    },
    code:{
        type:Number
    },
    createAt: { type: Date, expires: 600, default: Date.now } 
})
module.exports = db.model('verify_code', codeValidation)