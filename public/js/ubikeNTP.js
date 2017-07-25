function ubikeNTP(stationName){

    let host = 'http://localhost:8080';
    let element = document.getElementById('Ubike(新北)_'+stationName);

    if(element){

        $.ajax({
            url: host + '/apis?q=ubikeNTP',
            type: 'POST',
            data:{
                stationName,
                _csrf: $('meta[name="_csrf"]').attr('content')
            },
            error: function(){
                window.open(host + '/start', '_self');
            },
            success: function(result) {
                if(result) {
                    //gps
                    let lat = result.stationLoc.PositionLat;
                    let lon = result.stationLoc.PositionLon;

                    let mapUrl = "https://www.google.com.tw/maps/place/" + lat+"N+" + lon+"E";
                    element.querySelector('p[name=title]').setAttribute("onclick", 'window.open(\"' + mapUrl + '\")');
                    element.querySelector('p[name=title]').removeAttribute("class");
                    element.querySelector('p[name=title]').setAttribute("class", "itemTitleLink");
                    element.querySelector('p[name=info]').innerHTML = '剩餘數量： ' + result.data.AvailableRentBikes + '<br>剩餘空位： ' + result.data.AvailableReturnBikes + '<br><br>Update: ' + new Date(result.data.UpdateTime).toLocaleString();
                }
            }
        });

        setTimeout(function(){
            ubikeNTP(stationName);
        },300000);
    }
}