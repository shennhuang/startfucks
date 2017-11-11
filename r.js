var request = require("request");

var options = { method: 'GET',
  url: 'http://ptx.transportdata.tw/MOTC/v2/Bike/Station/NewTaipei',
  qs: { '': '', '$format': 'JSON' },
  headers: 
   { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729; rv:11.0) like Gecko',
     'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
