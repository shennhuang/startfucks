var fs = require('fs');
var keyPath = './ssl/private-key.pem';
var certPath = './ssl/cert.pem';
var key = fs.readFileSync(keyPath);
var cert = fs.readFileSync(certPath);

var options = {
    key, cert
};

var ssl = {};
ssl.options = options;

module.exports = ssl;