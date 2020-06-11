
const express = require('express');
const app = express();
const { verify } = require('jsonwebtoken');
const { generateCode } = require('./src/generateCode');
const { sendMail } = require('./src/sendEmail');
var device = require('express-device');
const isCodeUsable = require('./middleware/isCodeUsable');
const checkConfirmCode = require('./middleware/checkConfirmCode');
const verifyCode = require('./src/schema/codeValidation');
require('dotenv').config()
app.use(device.capture());

// only need userEmail header
app.post('/validation/no-id', async (req, res) => {
    const userEmail = req.get('userEmail');
    try {
        // generate code for userID
        var code = await generateCode(userID);
      
        if (token.id == userID) {
            var result = await sendMail(userEmail, userID, code);
            if (result == true) {
                return res.json({
                    code: true,
                    message: "Email sent ! Check your inbox"
                });
            }
            else res.send("Try again")
        }
        else res.send("Wrong credenital...")

    } catch (error) {
        console.log(error);
        res.send(error);
    }
})


// both request code,and send again if code not usable
// validate for already create account
app.post("/validation", isCodeUsable, async (req, res) => {
    const userToken = req.get('token');
    const userID = req.get('userID')
    const userEmail = req.get('userEmail');

    try {
        // generate code for userID
        var code = await generateCode(userID);
        // check token 
        var token = verify(userToken, process.env.mail_jwt_secret_key);

        if (token.id == userID) {
            var result = await sendMail(userEmail, userID, code);
            if (result == true) {
                return res.json({
                    code: true,
                    message: "Email sent ! Check your inbox"
                });
            }
            else res.send("Try again")
        }
        else res.send("Wrong credenital...")

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
app.post('/resend', async (req, res) => {
    const userID = req.get('userID');
    const userEmail = req.get('userEmail');
    
    var result = await verifyCode.deleteOne({ "requestID": userID });
    if (result.ok) {
        var code = await generateCode(userID);
        var result = await sendMail(userEmail, userID, code);
        if (result == true) {
            return res.json({
                code: true,
                message: "Email sent ! Check your inbox"
            });
        }
        else res.send("Try again")

    }
});
//verify with link 

app.post('/verify', async (req, res) => {

    try {
        const checkToken = verify(req.query.token, process.env.mail_jwt_secret_key);

        // code is expire
        const isValidate = await checkConfirmCode(checkToken.userID, checkToken.confirmCode)
        if (isValidate) {
            res.send("Your email has bean verified. You can login with your email or username")
        }
        // code is usable
        else {
            res.status(403).send("Wrong code. Resend new code ????")
        }
    } catch (error) {
        res.status(403).send("Wrong code. Resend new code ????")
    }
});
//verify with code
app.post('/verify/code', async (req, res) => {
    try {
        const confirmCode = req.get('confirmCode');
        const userID = req.get('userID');

        const isValidate = await checkConfirmCode(userID, confirmCode);
        if (isValidate) {
            //delete code
            var result = await verifyCode.deleteOne({ "requestID": userID });
            if (result.ok) {
                res.send("Your email has bean verified. You can login with your email or username")

            }
        }
        // code is usable
        else {
            res.status(403).send("Wrong code. Resend new code ????")
        }

    } catch (error) {
        console.log(error);

    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listen on ${PORT}`);
})