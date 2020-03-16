const mongoose = require('mongoose');
const verifyCode= require('./schema/codeValidation');

module.exports= {
    generateCode : async (userID)=>{
        // get fixed length number
        var code = Math.floor(100000 + Math.random() * 900000 );
        try {
            await verifyCode.create({ "requestID": userID, code: code });
            return code;
        } catch (error) {
            return ""
        }
        
    }
    
}