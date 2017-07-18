var express = require('express');

function home(req, res) {
    res.render('home');
}

module.exports = home;