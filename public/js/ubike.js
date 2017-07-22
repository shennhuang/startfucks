let stationName = (document.getElementsByName('Ubike')[0].getAttribute('id').split('_'))[1];


function ubike(stationName){

    let host = 'http://localhost:8080';
    let element = document.getElementById('Ubike_'+stationName);

    if(element){

        $.ajax({
            url: host + '/apis?q=ubike',
            method: 'POST',
            data:{
                stationName,
                _csrf: $('meta[name="_csrf"]').attr('content')
            },
            error: function(){
                window.open(host + '/start', '_self');
            },
            success: function(result) {
                if(result) {
                    
                    element.children[2].innerHTML = '剩餘數量： ' + result + '<br><br>更新時間： <br>' + new Date().toLocaleString();
                }
            }
        });

        setTimeout('ubike(stationName)',300000);
    }
}
ubike(stationName);