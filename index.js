const nodemailer = require('nodemailer');
const express = require('express');
const app= express();
const {verify} = require('jsonwebtoken');
const {generateCode} = require('./src/generateCode')
require('dotenv').config()

app.post("/validation",async (req,res)=>{
    const userToken = req.get('token');
    const userID =req.get('userID')
    const userEmail= req.get('userEmail');
   try {
       console.log(userID);

       // generate code here

        var code = generateCode();

       //const checkUser = verify(userToken, process.env.secret_key, { algorithms: 'HS512' })
       res.send(code);
   } catch (error) {
    console.log(error);
       res.send(error);
    
   }

    
    
    //res.json(userEmail)
});
app.get('/verify',async(req,res)=>{
    const confirmCode = req.get('confirmCode');
    console.log(confirmCode);
    if(confirmCode != null){
        res.send("Verified.")
    }else res.send('Try again')
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Listen on ${PORT}`);
})