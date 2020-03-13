require('dotenv').config();
module.exports ={

    sendMail = (emailAddress,code) =>{
        var transporter = nodemailer.createTransport({
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
        })

        let info = await transporter.sendMail({
            from: '"Mattstacey"', // sender address
            to: emailAddress, // list of receivers
            subject: `Gamming Community`, // Tieu de email
            text: "Validation Code", // plain text body
            html: `<b>Hello ✔ ${userID}. Your code is ${code}</b>` // html body
        });   
    }
}