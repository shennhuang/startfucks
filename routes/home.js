var express = require('express');

function home(req, res) {
    if(!req.session || !req.session.account || !req.session.pwd){
        return res.redirect('/start');
    }

    return res.render('home', {result, gridRowNum:10});
}

module.exports = home;

// test data
var result = {
    name: "User",
    setting: [
        {
            title: "Time",
            subtitle: "Taiwan",
            grid_size: {width: 1, height: 1},
            grid_location: {x: 0, y: 0},
            info: new Date()
        },
        {
            title: "Weather",
            subtitle: "Taipei",
            grid_size: {width: 2, height: 1},
            grid_location: {x: 0, y: 0},
            info: "Small Rain , 28 C"
        },
        {
            title: "Pchome",
            subtitle: "3C",
            grid_size: {width: 2, height: 1},
            grid_location: {x: 0, y: 0},
            info: "Xbox720 - on sale $99999"
        },
        {
            title: "Breakfast",
            subtitle: "麥當當",
            grid_size: {width: 1, height: 1},
            grid_location: {x: 0, y: 0},
            info: "超值早餐 - $49"
        },
        {
            title: "1x1",
            subtitle: "a",
            grid_size: {width: 1, height: 1},
            grid_location: {x: 0, y: 0},
            info: "Test Data"
        },
        {
            title: "1x1",
            subtitle: "b",
            grid_size: {width: 1, height: 1},
            grid_location: {x: 0, y: 0},
            info: "Test Data"
        },
        {
            title: "1x1",
            subtitle: "c",
            grid_size: {width: 1, height: 1},
            grid_location: {x: 0, y: 0},
            info: "Test Data"
        },
        {
            title: "2x1",
            subtitle: "a",
            grid_size: {width: 2, height: 1},
            grid_location: {x: 0, y: 0},
            info: "Test Data"
        },
        {
            title: "2x4",
            subtitle: "a",
            grid_size: {width: 2, height: 1},
            grid_location: {x: 0, y: 0},
            info: "Test Data"
        },
    ]
};