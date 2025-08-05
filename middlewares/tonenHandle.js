const e = require('express');
let jwt = require('jsonwebtoken');

function tokenVerify(req, res, next) {
   try {
     const TOKEN = req.headers['authorization'];
    //  console.log(TOKEN);

        if (!TOKEN) {
            throw new Error("Token is required.");
        }
        let tokentrue = TOKEN.split(' ')[1];
        let tokenData = jwt.verify(tokentrue, 'shhhhh');
        req.user = tokenData;
        next();

   } catch (error) {
     return res.status(401).json({ message: error.message });
    
   }
}

module.exports = tokenVerify;
