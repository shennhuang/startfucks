var express = require('express');

function home(req, res) {
    if(!req.session || !req.session.account || !req.session.pwd){
        return res.redirect('/start');
    }

    let account = req.session.account;

    var result = {

    [account]: {
            name: account,
            settings: [
            {
                title: "Time",
                subtitle: "Taiwan",
                gridItemSize: {width: 1, height: 1},
                gridItemLocation: {x: 0, y: 0},
            },
            {
                title: "Weather",
                subtitle: "New Taipei City",
                gridItemSize: {width: 2, height: 1},
                gridItemLocation: {x: 0, y: 0},
            },
            {
                title: "Ubike",
                subtitle: "南港公園",
                gridItemSize: {width: 1, height: 1},
                gridItemLocation: {x: 0, y: 0},
            },]
        }

    };

    return res.render('home', {result: result[account], gridRowNum:10});
}

module.exports = home;
