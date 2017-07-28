function news(newsSite){

    let host = 'http://localhost:8080';
    let element = document.getElementById('News_'+newsSite);

    if(element){

        $.ajax({
            url: host + '/apis?q=news',
            type: 'POST',
            data:{
                newsSite,
                _csrf: $('meta[name="_csrf"]').attr('content')
            },
            error: function(){
                //alert('您的頁面已經過期,請重新登入！');
                window.open(host + '/start', '_self');
            },
            success: function(result) {
                if(result) {
                    element.querySelector('p[name=info]').innerHTML = "";
                    for(let i in result){
                        if(result[i].articleImg === 'click'){
                            element.querySelector('p[name=info]').innerHTML += '<a href=' + result[i].articleUrl + ' target="_blank">' + result[i].articleTitle + '</a><br><img class="articleImg src="" alt="點我看圖" onclick="openImg(event,\'' + result[i].articleUrl + '\');"><br>' + ((result[i].articleDate)? new Date(result[i].articleDate).toLocaleString() : '') + '<br><br>';
                            continue;
                        }
                        if(result[i].articleImg){
                            element.querySelector('p[name=info]').innerHTML += '<a href=' + result[i].articleUrl + ' target="_blank">' + result[i].articleTitle + '</a><br><img class="articleImg" src='+ result[i].articleImg + '><br>' + ((result[i].articleDate)? new Date(result[i].articleDate).toLocaleString() : '') + '<br><br>';
                        }else {
                            element.querySelector('p[name=info]').innerHTML += '<a href=' + result[i].articleUrl + ' target="_blank">' + result[i].articleTitle + '</a><br>' + ((result[i].articleDate)? new Date(result[i].articleDate).toLocaleString() : '') + '<br><br>';
                        }
                    }
                    return;
                }
                element.querySelector('p[name=info]').innerHTML = 'Can not loading or no data :(';
            }
        });
        setTimeout(function(){
            news(newsSite);
        },1800000);
    }
}
function openImg(event, articleUrl){
    let target = event.currentTarget;
    target.alt = "loading...";
    let host = 'http://localhost:8080';
    $.ajax({
        url: host + '/apis?q=news',
        type: 'POST',
        data:{
            articleUrl,
            _csrf: $('meta[name="_csrf"]').attr('content')
        },
        error: function(){
            target.alt = "error";
        },
        success: function(result) {
            if(!result.articleImg){
                target.style.display = 'none';
            }
            target.src = result.articleImg;
        }
    });
}