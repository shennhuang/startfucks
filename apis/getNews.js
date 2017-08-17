var config = require('../config.json');
var apidata = require('../public/data/apidata.json')
var express = require('express');
var request = require('request');
var xmlparser = require('xml2json');
function getNews(req, res){

    if(req.body.articleUrl){
        return getImg(req, res);
    }

    let newsSite = (req.body.newsSite.split('_'))[0];
    let subSite = (req.body.newsSite.split('_'))[1];

    if(newsSite === '聯合(udn)'){
        return udn(req, res, newsSite, subSite);
    }
    if(newsSite === 'BBC(中文網)'){
        return bbcchinese(req, res, newsSite, subSite);
    }
    if(newsSite === 'ETNEWS新聞雲'){
        return etnews(req, res, newsSite, subSite);
    }
    if(newsSite === '蘋果即時新聞'){
        return appledaily(req, res, newsSite, subSite);
    }


    return newsOrg(req, res, newsSite, subSite);

}
function newsOrg(req, res, newsSite ,subSite){

    let newsSiteId = apidata.news.list[newsSite];
    let url = "https://newsapi.org/v1/articles?source=" + newsSiteId + "&apiKey=" + config.newsorgApiKey;
    let options = { 
        method: 'GET',
        url,
        json: true,
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        let result = [];
        let articles = body.articles;
        for(let i in articles){
            let articleUrl = articles[i].url;
            let articleTitle = articles[i].title
            let articleImg = articles[i].urlToImage;
            let articleDate = articles[i].publishedAt;
            let articleDes = articles[i].description;
            result.push({articleUrl, articleTitle, articleImg, articleDate, articleDes});
        }

        return res.status(200).send(result);
    });
}
function udn(req, res, newsSite, subSite){

    let newsSiteId = apidata.news.sublist[newsSite][subSite];
    let url = "https://udn.com/rssfeed/news/2/" + newsSiteId + "?ch=news";
    let options = { 
        method: 'GET',
        url,
        json: true,
    };

    request(options, function (error, response, body) {
        if (error) console.log(error);
        //rss xml to json object
        try {
            body = xmlparser.toJson(body,{object: true});
        } catch (error) {
            return res.send('');
        }

        let result = [];
        let articles = body.rss.channel.item;
        for(let i in articles){
            let articleUrl = articles[i].link;
            let articleTitle = articles[i].title
            let articleDate = articles[i].pubDate;

            let articleImg = "";
            let des = articles[i].description;
            let imgTagIndex = des.indexOf("<img src=");
            if(imgTagIndex >= 0){
                for(let i = imgTagIndex+9; i < des.length; i++){
                    articleImg += des[i];
                    if(des[i] === '\'' && des[i+1] === '>'){
                        break;
                    }
                }
            }
            des = des.replace(/<[^>]*>/g,'');
            result.push({articleUrl, articleTitle, articleImg, articleDate, articleDes: des});
        }

        return res.status(200).send(result);
    });
}
function bbcchinese(req, res, newsSite, subSite){
    let url = "http://www.bbc.co.uk/zhongwen/trad/index.xml";
    let options = { 
        method: 'GET',
        url,
        json: true,
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        try {
            body = xmlparser.toJson(body,{object: true});
        } catch (error) {
            return res.send('');
        }

        let result = [];
        let articles = body.rss.channel.item;
        for(let i in articles){
            let articleUrl = articles[i].link;
            let articleTitle = articles[i].title
            let articleDate = articles[i].pubDate;
            let des = articles[i].description;
            let articleImg = "";
            if(articles[i].hasOwnProperty("media:thumbnail")){
                articleImg = articles[i]["media:thumbnail"].url;
            }
            result.push({articleUrl, articleTitle, articleImg, articleDate, articleDes: des});
        }
        return res.status(200).send(result);
    });
}
function etnews(req, res, newsSite, subSite){
    let url = "http://feeds.feedburner.com/ettoday/realtime?format=xml";
    let options = { 
        method: 'GET',
        url,
        json: true,
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        try {
            body = xmlparser.toJson(body,{object: true});
        } catch (error) {
            return res.send('');
        }

        let result = [];
        let articles = body.rss.channel.item;
        for(let i in articles){
            let articleUrl = articles[i]["feedburner:origLink"];
            let articleTitle = articles[i].title
            let articleDate = articles[i].pubDate;

            let articleImg = "";
            let des = articles[i].description;
            let imgTagIndex = des.indexOf("<img src=");
            let imgUrlEnd = des.indexOf(".jpg\"")+4;
            if(imgTagIndex >= 0){
                for(let i = imgTagIndex+9; i < des.length && i <= imgUrlEnd; i++){
                    articleImg += des[i];
                }
            }
            des = des.replace(/<[^>]*>/g,'');
            des = des.substring(0, des.indexOf('《詳全文...》'));
            result.push({articleUrl, articleTitle, articleImg, articleDate, articleDes: des});
        }
        return res.status(200).send(result);
    });
}
function appledaily(req, res, newsSite, subSite){
    let newsSiteId = apidata.news.sublist[newsSite][subSite];
    let url = "http://www.appledaily.com.tw/rss/newcreate/kind/rnews/type/" + newsSiteId;
    let options = { 
        method: 'GET',
        url,
        json: true,
    };

    request(options, function(error, response, body){
        if(error) throw new Error(error);

        try {
            body = xmlparser.toJson(body,{object: true});
        } catch (error) {
            return res.send('');
        }

        let result = [];
        let articles = body.rss.channel.item;
        if(!articles){
            return res.status(200).send('');
        }

        let promiseGroup = [];
        //新聞顯示篇數
        let postNum = (articles.length > 20)? 20: articles.length;

        for(let i = 0; i < postNum; i++){
            let articleUrl = articles[i].link;
            let articleTitle = articles[i].title;
            let articleDate = articles[i].pubDate;
            let des = articles[i].description;
            des = des.replace(/<[^>]*>/g,'');
            des = des.substring(0, des.indexOf('詳全文：'));

            promiseGroup[i] = new Promise((resolve, reject)=>{
                result.push({articleUrl, articleTitle, articleImg:'click', articleDate, articleDes: des});
                return resolve();
            });
        }
        Promise
        .all(promiseGroup)
        .then(()=>{
            //console.log('-appledaily promiseGroup success.');
            return res.status(200).send(result);
        })
        .catch(reason => { 
            console.log(reason);
            return res.send('');
        });
            
    });
}
function getImg(req, res){
    request({method:'GET',url:req.body.articleUrl},function(error, response, body){
        if(error) console.log(error);

        let articleImg = "";
        try {
            let imgTagIndex = body.indexOf("<link href=\"http://img.appledaily.com.tw/images/ReNews");

            if(imgTagIndex >= 0){
                for(let i = imgTagIndex+12; i < body.length; i++){
                    articleImg += body[i];
                    if(body[i+1] === '\"'){
                        break;
                    }
                }
                return res.send({articleImg});
            }
        } catch (error) {
            console.log("error: " + error);
        }
        return res.send({articleImg:""});
    });
}
module.exports = getNews;