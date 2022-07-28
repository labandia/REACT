const crypto = require("crypto");
require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");

function genPassword(password) {
   var salt = crypto.randomBytes(32).toString("hex");
   var genHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");

   return {
      salt: salt,
      hash: genHash,
   };
}

function validatepassword(password, hash, salt) {
   var Hashverify = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");
   return hash === Hashverify;
}

function issueJWT(user, token) {
   const id = user.user_id;

   const expiresIn = "30s";
   let accesstoken = "";

   // const payload = {
   //    { username: founduser.username },
   //    iat: Date.now(),
   // };

   if (token === true) {
      accesstoken = jsonwebtoken.sign(
         { username: user.username },
         process.env.ACCESS_TOKEN,
         {
            expiresIn: "30s",
         }
      );
   } else {
      accesstoken = jsonwebtoken.sign(
         { username: user.username },
         process.env.REFRESH_TOKEN,
         {
            expiresIn: "1d",
         }
      );
   }

   // const signedToken = jsonwebtoken.sign(payload, token, {
   //    expiresIn: "30s",
   // });

   return {
      token: accesstoken,
      // token: accesstoken,
      expiresIn: expiresIn,
   };
}

function authMiddleware(req, res, next) {
   // console.log(req.headers);
   const authHeader = req.headers.authorization || req.headers.Authorization;
   if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
   const token = authHeader.split(" ")[1];
   jsonwebtoken.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) return res.sendStatus(403);
      //invalid token
      req.user = decoded.user;
      next();
   });
}

module.exports.genPassword = genPassword;
module.exports.validatepassword = validatepassword;
module.exports.issueJWT = issueJWT;
module.exports.authMiddleware = authMiddleware;
