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
                    element.querySelector('p[name=info]').innerHTML = '剩餘數量： ' + result.AvailableRentBikes + '<br>剩餘空位： ' + result.AvailableReturnBikes + '<br><br>Update: ' + new Date(result.UpdateTime).toLocaleString();
                }
            }
        });

        setTimeout(function(){
            ubikeNTP(stationName);
        },300000);
    }
}