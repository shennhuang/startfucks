var crypto = require('crypto');
var salt = "bearbeer9487";
// console.log(genRandomString(16))
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return value;
};


function saltHashPassword(userpassword) { 
    var passwordData = sha512(userpassword, salt);
    return passwordData;
}

module.exports = {saltHashPassword};

