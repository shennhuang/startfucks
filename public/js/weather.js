let city = 'Taipei';
let country = 'tw';
let apiKey = '19a431e591bcb2bdd42c26f8275025fe';
var xhr = new XMLHttpRequest();
function weather(city, country){
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&units=metric&mode=json&lang=zh_tw&appid=' + apiKey;
    
    xhr.open("GET", url);
    xhr.send(null);
    xhr.onload = function () {  
        let res = JSON.parse(this.responseText);
        console.log(this.responseText);

        document.getElementsByName('Weather')[0].children[1].innerHTML = '現在天氣： ' + res.weather[0].description + '<br>最低溫： ' + res.main.temp_min + ' C' + '<br>最高溫： ' + res.main.temp_max + ' C' + '<br>更新時間： ' + new Date(res.dt*1000).toLocaleString();
    };
    setTimeout('weather(city, country)',900000);
}
weather(city, country);