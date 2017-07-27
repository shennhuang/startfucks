function ubike(stationName){

    let host = 'http://localhost:8080';
    let element = document.getElementById('Ubike_'+stationName);

    if(element){

        $.ajax({
            url: host + '/apis?q=ubike',
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
                    element.querySelector('p[name=info]').innerHTML = '剩餘數量： ' + result + '<br><br><br>Update: ' + new Date().toLocaleString();
                }
            }
        });

        setTimeout(function(){
            ubike(stationName);
        },300000);
    }
}