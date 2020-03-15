
const express = require('express');
const app = express();
const { verify } = require('jsonwebtoken');
const { generateCode } = require('./src/generateCode');
const { sendMail } = require('./src/sendEmail');
var device = require('express-device');
require('dotenv').config()
app.use(device.capture());
app.post("/validation", async (req, res) => {
    const userToken = req.get('token');
    const userID = req.get('userID')
    const userEmail = req.get('userEmail');
    try {
        // generate code here
        var code = generateCode();
        var token = verify(userToken, process.env.mail_jwt_secret_key);
        if (token.id == userID) {
            var result = await sendMail(userEmail, userID, code);
            if (result == true) {
                res.send("Email sent ! Check your inbox");
            }
            else res.send("Try again")
        }
        else res.send("Wrong credenital...")

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
app.get('/verify', async (req, res) => {
    const confirmCode = req.get('confirmCode');
    console.log(confirmCode);
    console.log(req.device);

    if (confirmCode != null) {
        res.send("Verified.")
    } else res.send('Try again')

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listen on ${PORT}`);
})