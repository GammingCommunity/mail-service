module.exports= {
    generateCode : ()=>{
        // get fixed length number
        var code = Math.floor(100000 + Math.random() * 900000 );
        return code;
    }
}