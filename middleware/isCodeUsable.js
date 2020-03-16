const checkCode = require('../src/checkCode');
module.exports =async (req,res,next)=>{
    const userID = req.get('userID');
    const hasCode = await checkCode(userID);
    // check if user already has code
    if(hasCode){
        return res.status(403).send({
            success: false,
            message: 'Please check your inbox. We have send u a message with code'
        });
    }
    else {
        next()
    }
}