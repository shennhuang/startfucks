let country = 'tw';
let city = (document.getElementsByName('Weather')[0].getAttribute('id').split('_'))[1];

// let newImg = document.createElement('img');
// document.getElementById('Weather_'+city).children[0].appendChild(newImg);

function weather(city, country){

    let host = 'http://localhost:8080';

    $.ajax({
        url: host + '/apis?q=weather',
        method: 'POST',
        data:{
            city,
            country
        },
        success: function(result) {
            if(result) {
                let icon = 'http://openweathermap.org/img/w/' + result.weather[0].icon + '.png'
                document.getElementById('Weather_'+city).children[1].innerHTML = '現在天氣： ' + result.weather[0].description + '<img style=vertical-align:middle; src='+ icon + '><br>最低溫： ' + result.main.temp_min + ' C' + '<br>最高溫： ' + result.main.temp_max + ' C' + '<br>更新時間： ' + new Date(result.dt*1000).toLocaleString();

            }
        }
    });

    setTimeout('weather(city, country)',900000);
}
weather(city, country);