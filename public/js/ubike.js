function ubike(stationName){

    let host = "http://" + window.location.hostname;
    let port = ":" + window.location.port;
    let element = document.getElementById('Ubike_'+stationName);

    if(element){

        $.ajax({
            url: host + port + '/apis?q=ubike',
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
                    return element.querySelector('p[name=info]').innerHTML = '剩餘數量： ' + result.sbi +  '<br>剩餘空位: ' + result.bemp +
                        '<br><br><br>Update: ' + new Date().toLocaleString();
                }
                element.querySelector('p[name=info]').innerHTML = 'No Service. <br><br><br>Update: ' + new Date().toLocaleString();
            }
        });

        // setTimeout(function(){
        //     ubike(stationName);
        // },300000);
    }
}