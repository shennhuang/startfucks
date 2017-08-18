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
        if (error) {
            console.log(error);
            return res.send('');
        }

        body = xmlparser.toJson(body,{object: true});

        let items = body.rss.channel.item;
        if(items){
            if(!Array.isArray(items)){
                items = [items];
            }
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
                }
                else if(des.indexOf('豪雨')>=0 || des.indexOf('大雨')>=0){
                    des = des.replace(/[\s\t]/g,"");
                    des = des.replace(/\n/g,"<br><br>");
                    des = des.replace("豪雨特報","----");
                    des = des.replace("大雨特報","----");
                    let keyWordStart = (des.indexOf("豪雨特報")>=0)?des.indexOf("豪雨特報"):des.indexOf("大雨特報");
                    let keyWordEnd = des.length;

                    for(let i = keyWordStart; i < keyWordEnd; i++){
                        keyWord += des[i];
                    }
                    keyWord = keyWord.replace(/：/g,"：<br>");

                }else if(des.indexOf('大雷雨')>=0){
                    keyWord = des;
                    keyWord = keyWord.replace(/。/g, "。<br><br>");
                }else if(des.indexOf('即時訊息')>=0){
                    des = des.replace(/[\s\t]/g,"");
                    des = des.replace("即時訊息","----");
                    let keyWordStart = des.indexOf("即時訊息");
                    let keyWordEnd = des.length;
                    for(let i = keyWordStart; i < keyWordEnd; i++){
                        keyWord += des[i];
                    }
                    keyWord = keyWord.replace(/：/g,"：<br>");
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