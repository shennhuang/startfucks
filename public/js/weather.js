function weather(weatherCity, weatherCountry){

    let element = document.getElementById('Weather_'+weatherCity);

    if(element){

        $.ajax({
            url: '/apis?q=weather',
            type: 'POST',
            data:{
                weatherCity,
                weatherCountry,
                _csrf: $('meta[name="_csrf"]').attr('content')
            },
            error: function(err){
                //alert('您的頁面已經過期,請重新登入！');
                window.open('/start', '_self');
            },
            success: function(result) {
                if(result) {
                    if(result.weather){
                        let icon = 'http://openweathermap.org/img/w/' + result.weather[0].icon + '.png'
                        return element.querySelector('p[name=info]').innerHTML = result.weather[0].description + '<img style=vertical-align:middle; src='+ icon + '><br>最低溫： ' + result.main.temp_min + ' C' + '<br>最高溫： ' + result.main.temp_max + ' C' + '<br><br>Update： ' + new Date(result.dt*1000).toLocaleString();
                    }
                    element.querySelector('p[name=info]').innerHTML = 'Can not loading :(';

                }
            }
        });
    }
}