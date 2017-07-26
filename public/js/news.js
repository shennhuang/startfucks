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
                window.open(host + '/start', '_self');
            },
            success: function(result) {
                if(result && result.status === 'ok') {
                    let articles = result.articles;
                    element.querySelector('p[name=info]').innerHTML = "";
                    for(let i in articles){
                        let img = articles[i].urlToImage;
                        element.querySelector('p[name=info]').innerHTML += '<a href=' + articles[i].url + '>' + articles[i].title + '</a><br><img style="vertical-align:middle;width:50%;height:50%;" src='+ img + '><br>' + new Date(articles[i].publishedAt).toLocaleString() + '<br><br>';
                    }
                    return;
                }
                element.querySelector('p[name=info]').innerHTML = 'Can not loading :(';
            }
        });
        setTimeout(function(){
            news(newsSite);
        },1800000);
    }
}