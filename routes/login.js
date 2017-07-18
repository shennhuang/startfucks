var express = require('express');

function login(req, res) {
    return res.render('login');
}

module.exports = login;