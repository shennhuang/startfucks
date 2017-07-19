var express = require('express');

function home(req, res) {
    return res.render('home', {result, gridRowNum:5});
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
            subtitle: "Taipei City",
            grid_size: {width: 2, height: 2},
            grid_location: {x: 0, y: 0},
            info: "Small Rain , 28 C"
        },
        {
            title: "Pchome",
            subtitle: "3C",
            grid_size: {width: 2, height: 2},
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
            subtitle: "1x1",
            grid_size: {width: 1, height: 1},
            grid_location: {x: 0, y: 0},
            info: "Test Data"
        },
        {
            title: "1x1",
            subtitle: "1x1",
            grid_size: {width: 1, height: 1},
            grid_location: {x: 0, y: 0},
            info: "Test Data"
        },
        {
            title: "1x1",
            subtitle: "1x1",
            grid_size: {width: 1, height: 1},
            grid_location: {x: 0, y: 0},
            info: "Test Data"
        },
        {
            title: "2x1",
            subtitle: "2x1",
            grid_size: {width: 2, height: 1},
            grid_location: {x: 0, y: 0},
            info: "Test Data"
        },
        {
            title: "2x4",
            subtitle: "2x4",
            grid_size: {width: 2, height: 4},
            grid_location: {x: 0, y: 0},
            info: "Test Data"
        },
    ]
};