const verifyCode = require('../src/schema/codeValidation');
module.exports = async(userID,code)=>{

    const result  = await verifyCode.find({"requestID":userID,"code":code});
    if(result.length ==0){
        // wrong
        return false;
    }
    else
    {
        // ok
        return true;
    }
}