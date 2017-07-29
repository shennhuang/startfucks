function cwbWarning(){
    let host = 'http://localhost:8080';
    let element = document.getElementById('中央氣象局警、特報_null');

    if(element){

        $.ajax({
            url: host + '/apis?q=cwbWarning',
            type: 'POST',
            data:{
                _csrf: $('meta[name="_csrf"]').attr('content')
            },
            error: function(){
                //alert('您的頁面已經過期,請重新登入！');
                window.open(host + '/start', '_self');
            },
            success: function(result) {
                if(result) {
                    element.querySelector('p[name=title]').setAttribute("onclick", 'window.open(\"' + result.link + '\" ,  "_blank")');
                    element.querySelector('p[name=title]').removeAttribute("class");
                    element.querySelector('p[name=title]').setAttribute("class", "itemTitleLink");
                    element.querySelector('p[name=info]').innerHTML = result.title + '<br><br>' + result.description +'<a href="http://www.cwb.gov.tw/V7/prevent/warning/Data/TEDPTA/TEDptaweb_C.htm" target="_blank">路徑潛勢圖</a><br>Update: ' + new Date(result.date).toLocaleString();


                }
            }
        });

        setTimeout(function(){
            cwbWarning();
        },1800000);
    }
}