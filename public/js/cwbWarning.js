function cwbWarning(){
    let host = "http://" + window.location.hostname;
    let port = ":" + window.location.port;
    let element = document.getElementById('中央氣象局警、特報_null');

    if(element){

        $.ajax({
            url: host + port + '/apis?q=cwbWarning',
            type: 'POST',
            data:{
                _csrf: $('meta[name="_csrf"]').attr('content')
            },
            error: function(){
                //alert('您的頁面已經過期,請重新登入！');
                window.open(host + port + '/start', '_self');
            },
            success: function(result) {
                if(result) {
                    element.querySelector('p[name=info]').innerHTML = "";
                    for(let i in result){
                        element.querySelector('p[name=info]').innerHTML += '<a href="' + result[i].link +'"  target="_blank">' + result[i].title + '</a><br><br>' + result[i].description + (result[i].title.indexOf('颱風')>=0 ?'<a href="http://www.cwb.gov.tw/V7/prevent/typhoon/Data/PTA_NEW/index.htm" target="_blank">颱風消息</a>':'') + '<br><br>Update: ' + new Date(result[i].date).toLocaleString() + '<br>-----<br><br>';
                    }
                    return;
                }
                element.querySelector('p[name=info]').innerHTML = 'No Warning.';

            }
        });
    }
}