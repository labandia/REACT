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
   let accesstoken = "";

   if (token == true) {
      accesstoken = jsonwebtoken.sign(
         { name: user.fname_fld },
         process.env.ACCESS_TOKEN,
         {
            expiresIn: "30s",
         }
      );
   } else {
      accesstoken = jsonwebtoken.sign(
         { name: user.fname_fld },
         process.env.REFRESH_TOKEN,
         {
            expiresIn: "1d",
         }
      );
   }

   return { token: accesstoken };
}

function authMiddleware(req, res, next) {
   const authHeader = req.headers.authorization || req.headers.Authorization;
   if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
   const token = authHeader.split(" ")[1];
   jsonwebtoken.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) return res.sendStatus(403);
      //invalid token
      req.user = decoded.name;
      next();
   });
}

function padTo2Digits(num) {
   return num.toString().padStart(2, "0");
}

const formatDate = (date) => {
   return (
      [
         date.getFullYear(),
         padTo2Digits(date.getMonth() + 1),
         padTo2Digits(date.getDate()),
      ].join("-") +
      " " +
      [
         padTo2Digits(date.getHours()),
         padTo2Digits(date.getMinutes()),
         padTo2Digits(date.getSeconds()),
      ].join(":")
   );
};

module.exports.genPassword = genPassword;
module.exports.validatepassword = validatepassword;
module.exports.issueJWT = issueJWT;
module.exports.authMiddleware = authMiddleware;
module.exports.formatDate = formatDate;
