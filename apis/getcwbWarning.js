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

        let item = body.rss.channel.item;

        let des = item.description;
        let keyWordStart = des.indexOf("警    報    種    類");
        let keyWordEnd = des.indexOf("警    報    報    數");
        let keyWord = "";
        for(let i = keyWordStart; i < keyWordEnd; i++){
            keyWord += des[i];
        }
        keyWord = keyWord.replace(/\n/g,"<br><br>");
        keyWord = keyWord.replace(/[\s\t]/g,"");
        keyWord = keyWord.replace(/：/,"：<br>");
        keyWord = keyWord.replace(/編號：/,"編號：<br>");

        return res.status(200).send({
            title: item.title,
            link: item.link,
            date: item.pubDate,
            description: keyWord
        });
    });
}
module.exports = getcwbWarning;