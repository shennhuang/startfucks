let city = 'New Taipei City';
let country = 'tw';

//var xhr = new XMLHttpRequest();
function weather(city, country){
    
    // xhr.open("GET", url);
    // xhr.send(null);
    // xhr.onload = function () {
    //     let res = JSON.parse(this.responseText);
    //     console.log(this.responseText);

    //     document.getElementById('Weather_Taipei').children[1].innerHTML = '現在天氣： ' + res.weather[0].description + '<br>最低溫： ' + res.main.temp_min + ' C' + '<br>最高溫： ' + res.main.temp_max + ' C' + '<br>更新時間： ' + new Date(res.dt*1000).toLocaleString();
    // };

    let host = 'http://127.0.0.1:8080';

    $.ajax({
        url: host + '/apis?q=weather',
        method: 'POST',
        data:{
            city,
            country
        },
        success: function(result) {
            if(result)
                document.getElementById('Weather_Taipei').children[1].innerHTML = '現在天氣： ' + result.weather[0].description + '<br>最低溫： ' + result.main.temp_min + ' C' + '<br>最高溫： ' + result.main.temp_max + ' C' + '<br>更新時間： ' + new Date(result.dt*1000).toLocaleString();  
        }
    });

    setTimeout('weather(city, country)',900000);
}
weather(city, country);