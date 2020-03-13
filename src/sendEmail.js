require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
module.exports = {
    sendMail: async (emailAddress, userID, code) => {
        var info = "";

        try {
           /* const oauth2Client = new OAuth2(
                process.env.clientId, process.env.clientSecret,
                "https://developers.google.com/oauthplayground" // Redirect URL
            );
            oauth2Client.setCredentials({
                refresh_token: process.env.refreshToken
            });
            console.log(await oauth2Client.getAccessToken());*/
            
            /*var transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: 'yes', // true for 465, false for other ports
                auth: {
                    type: "OAuth2",
                    user: process.env.email,
                    clientId: process.env.clientId,
                    clientSecret: process.env.clientSecret,
                    refreshToken: process.env.refreshToken,
                    accessToken: process.env.accessToken
                }
            })*/
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.email,
                    pass: 'hoanglee1998'
                }
            })
            

            info = await transporter.sendMail({
                from: '"Gamming Community" <noreply@gmail.com>', // sender address
                to: emailAddress, // list of receivers
                subject: "Verify your email address", // Tieu de email
                text: "Validation Code", // plain text body
                html: `<b>Hey ${userID}</b>
                        <br/>
                        <b>Your code is ${code}</b>
                
                ` // html body
            });

            return true;

        } catch (error) {
            console.log(error);

            return false;
        }
    }
}