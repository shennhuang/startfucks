function ubikeNTP(stationName){

    let host = "http://" + window.location.hostname;
    let port = ":" + window.location.port;
    let element = document.getElementById('Ubike(新北)_'+stationName);

    if(element){

        $.ajax({
            url: host + port + '/apis?q=ubikeNTP',
            type: 'POST',
            data:{
                stationName,
                _csrf: $('meta[name="_csrf"]').attr('content')
            },
            error: function(){
                //alert('您的頁面已經過期,請重新登入！');
                window.open(host + port + '/start', '_self');
            },
            success: function(result) {
                if(result) {
                    let lat = result.stationLoc.PositionLat;
                    let lon = result.stationLoc.PositionLon;
                    let mapUrl = "https://www.google.com.tw/maps/place/" + lat+"N+" + lon+"E";
                    //設定點選事件並更換class(with pseudo class)
                    element.querySelector('p[name=title]').setAttribute("onclick", 'window.open(\"' + mapUrl + '\" ,  "_blank")');
                    element.querySelector('p[name=title]').removeAttribute("class");
                    element.querySelector('p[name=title]').setAttribute("class", "itemTitleLink");
                    element.querySelector('p[name=info]').innerHTML = '剩餘數量： ' + result.data.AvailableRentBikes + '<br>剩餘空位： ' + result.data.AvailableReturnBikes + '<br><br><br>Update: ' + new Date(result.data.UpdateTime).toLocaleString();
                }
            }
        });

        // setTimeout(function(){
        //     ubikeNTP(stationName);
        // },300000);
    }
}