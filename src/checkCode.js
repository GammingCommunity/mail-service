const verifyCode = require('./schema/codeValidation');

const checkCode = async (userID)=>{
    
    var result = await verifyCode.find({ "requestID": userID });
    console.log(result);
    
    if(result.length == 0){
        // expire code
        return false;
    }
    else
    {
        // has code
        return true;
    }
} 
module.exports = checkCode;