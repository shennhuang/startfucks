var express = require('express');
var getWeather = require('../apis/getWeather');
var getUbike = require('../apis/getUbike');
var getUbikeNTP = require('../apis/getUbikeNTP');
var getNews = require('../apis/getNews');
var getPosts = require('../apis/getPosts');
var postPosts = require('../apis/postPosts');
var getcwbWarning = require('../apis/getcwbWarning');

function apis(req, res){
    if(req.query.q === 'weather'){     
        return getWeather(req, res);
    }
    if(req.query.q === 'ubike'){
        return getUbike(req, res);
    }
    if(req.query.q === 'ubikeNTP'){
        return getUbikeNTP(req, res);
    }
    if(req.query.q === 'news'){
        return getNews(req, res);
    }
    if(req.query.q === 'getPosts_s' || req.query.q === 'getPosts_l'){
        return getPosts(req, res);
    }
    if(req.query.q === 'postPosts'){
        return postPosts(req, res);
    }
    if(req.query.q === 'cwbWarning'){
        return getcwbWarning(req, res);
    }
}

module.exports = apis;