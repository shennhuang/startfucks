function weather(weatherCity, weatherCountry){

    let host = 'http://localhost:8080';
    let element = document.getElementById('Weather_'+weatherCity);

    if(element){

        $.ajax({
            url: host + '/apis?q=weather',
            type: 'POST',
            data:{
                weatherCity,
                weatherCountry,
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
        setTimeout(function(){
            weather(weatherCity, weatherCountry);
        },900000);
    }
}