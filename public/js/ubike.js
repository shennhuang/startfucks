let stationName = (document.getElementsByName('Ubike')[0].getAttribute('id').split('_'))[1];


function ubike(stationName){

    let host = 'http://localhost:8080';
    
    $.ajax({
        url: host + '/apis?q=ubike',
        method: 'POST',
        data:{
            stationName
        },
        success: function(result) {
            if(result) {
                
                document.getElementById('Ubike_'+stationName).children[1].innerHTML = '剩餘數量： ' + result + '<br><br>更新時間： <br>' + new Date().toLocaleString();

            }
        }
    });

    setTimeout('ubike(stationName)',600000);
}
ubike(stationName);