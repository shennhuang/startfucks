var express = require('express');
var request = require('request');
var xmlparser = require('xml2json');
function getcwbWarning(req, res){
    let url = "http://www.cwb.gov.tw/rss/Data/cwb_warning.xml";
    var options = { 
        method: 'GET',
        url
    };
    return request(options, function (error, response, body) {
        if (error) throw new Error(error);

        body = xmlparser.toJson(body,{object: true});

        let items = body.rss.channel.item;
        if(items){
            let result = [];
            for(let i in items){
                let des = items[i].description;
                let keyWord = "";
                if(des.indexOf('颱風')>=0){
                    des = des.replace(/\n/g,"<br><br>");
                    des = des.replace(/[\s\t]/g,"");
                    let keyWordStart = des.indexOf("警報種類");
                    let keyWordEnd = des.indexOf("警報報數");

                    for(let i = keyWordStart; i < keyWordEnd; i++){
                        keyWord += des[i];
                    }
                    // keyWord = keyWord.replace(/\n/g,"<br><br>");
                    // keyWord = keyWord.replace(/[\s\t]/g,"");
                    keyWord = keyWord.replace(/：/,"：<br>");
                    keyWord = keyWord.replace(/編號：/,"編號：<br>");
                }
                else if(des.indexOf('地震')>=0){
                    des = des.replace(/\n                                    東  經/g,",東經");
                    des = des.replace(/\n/g,"<br><br>");
                    des = des.replace(/[\s\t]/g,"");
                    let keyWordStart = des.indexOf("發震時間");
                    let keyWordEnd = des.indexOf("各地震度級");

                    for(let i = keyWordStart; i < keyWordEnd; i++){
                        keyWord += des[i];
                    }
                }else{
                    keyWord = des;
                }
                
                result.push({
                    title: items[i].title,
                    link: items[i].link,
                    date: items[i].pubDate,
                    description: keyWord
                });
            }

            return res.status(200).send(result);
        }
        return res.send('');
    });
}
module.exports = getcwbWarning;