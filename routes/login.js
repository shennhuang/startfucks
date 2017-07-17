var express = require('express');

function login(req, res) {
    res.render('login');
}

module.exports = login;