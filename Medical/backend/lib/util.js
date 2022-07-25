require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const bycrpt = require('bcrypt');
const salt = bycrpt.genSaltSync(16);

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 * 
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 * 
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */


function  bycrptverifyPassword(password, hash){
    var HashVerify = bycrpt.compare(password, hash)
    return HashVerify;
}

/**
 * 
 * @param {*} password - The password string that the user inputs to the password field in the register form
 * 
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 * 
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
function bycrptgenPass(password){
    var hash = bycrpt.hashSync(password, salt)
    return hash;
}

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(user) {
  // const _id = user._id;
  const _id = user.user_id;
  const expiresIn = '1d';

  const payload = {
    uc: _id,
    ito: user.fname +''+ user.lname,
    iby: 'Jaye Developer',
    idate: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.ACCESS_TOKEN_SECRET);

  return {
    token: signedToken,
    expires: expiresIn
  }
}


function JWTverify(token, res){
  jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, Authdata)=>{
    if(err){
        res.sendStatus(403);
    }else{
        res.send("You are Authenticated");
    }
  })
}



function verifyToken(req, res, next) {

  const bearerHeader = req.headers["authorization"];


  if (typeof bearerHeader !== "undefined") {

    const bearerToken = bearerHeader.split(" ")[1];

    req.token = bearerToken;

    next();

  } else {

    res.sendStatus(403);

  }

}







module.exports.bycrptverifyPassword = bycrptverifyPassword;
module.exports.bycrptgenPass = bycrptgenPass;
module.exports.issueJWT = issueJWT;
module.exports.JWTverify = JWTverify;
module.exports.verifyToken = verifyToken;