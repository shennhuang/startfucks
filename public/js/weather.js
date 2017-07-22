let country = 'tw';
let city = (document.getElementsByName('Weather')[0].getAttribute('id').split('_'))[1];


function weather(city, country){

    let host = 'http://localhost:8080';
    let element = document.getElementById('Weather_'+city);

    if(element){

        $.ajax({
            url: host + '/apis?q=weather',
            method: 'POST',
            data:{
                city,
                country,
                _csrf: $('meta[name="_csrf"]').attr('content')
            },
            error: function(){
                window.open(host + '/start', '_self');
            },
            success: function(result) {
                if(result) {
                    let icon = 'http://openweathermap.org/img/w/' + result.weather[0].icon + '.png'
                    element.children[2].innerHTML = result.weather[0].description + '<img style=vertical-align:middle; src='+ icon + '><br>最低溫： ' + result.main.temp_min + ' C' + '<br>最高溫： ' + result.main.temp_max + ' C' + '<br>更新時間： ' + new Date(result.dt*1000).toLocaleString();

                }
            }
        });

        setTimeout('weather(city, country)',900000);
    }
}
weather(city, country);