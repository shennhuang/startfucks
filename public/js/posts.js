function postsGet(title,size){
    let host = 'http://localhost:8080';
    let elementId = "Post(" + size  + ")_" + title;
    let element = document.getElementById(elementId);
    if(element){

        $.ajax({
            url: host + '/apis?q=getPosts_'+size,
            type: 'POST',
            data:{
                title : elementId,
                _csrf: $('meta[name="_csrf"]').attr('content')
            },
            error: function(){
                //alert('您的頁面已經過期,請重新登入！');
                window.open(host + '/start', '_self');
            },
            success: function(result) {
                    
                //內文有括號會被html視為function,所以要取代掉
                let newElementId = elementId.replace("(","/a").replace(")","/b");
                
                //設定btn
                let btn = document.createElement("button");
                let btnId = document.createAttribute("id");
                btnId.value = elementId + "~btn";
                btn.setAttributeNode(btnId);
                let btnOnclick = document.createAttribute("onclick");
                btnOnclick.value = "postBtnOnclick(this,'" + newElementId + "')";
                btn.setAttributeNode(btnOnclick);

                element.appendChild(btn);
                btn.innerHTML = "Edit"

                //設定info
                let infoStyle = document.createAttribute("style");
                infoStyle.value = "margin:0";
                let info = element.querySelector('p[name=info]');
                info.setAttributeNode(infoStyle);

                console.log({result:result})
                if(size == "s"){
                    console.log("SSSS")
                    element.querySelector('p[name=info]').innerHTML = "<div id = '" + elementId  + "~div' class = 'smallPostContent' style='display:block;'><pre>" + result.replace(/\\n/g,"\n") + "</pre></div><textarea id='" + newElementId + "'class='smallPosttextarea' style='display:none;'></textarea>";
                    return;
                }
                if(size == "l"){
                    console.log("LLLLL")
                    element.querySelector('p[name=info]').innerHTML = "<div id = '" + elementId  + "~div' class = 'largePostContent' style='display:block;'><pre>" + result.replace(/\\n/g,"\n") + "</pre></div><textarea id='" + newElementId + "'class='largePosttextarea' style='display:none;'></textarea>";
                    return;
                }
            }
            
        });
    }
}
function postsPut(title,size,words){
    let host = 'http://localhost:8080';
    let elementId = "Post(" + size  + ")_" + title;
    let element = document.getElementById(elementId);
    if(!words) words = "";

    if(element){

        $.ajax({
            url: host + '/apis?q=postPosts_' + size,
            type: 'POST',
            data:{
                title : elementId,
                words : words,
                _csrf: $('meta[name="_csrf"]').attr('content')
            },
            error: function(){
                //alert('您的頁面已經過期,請重新登入！');
                window.open(host + '/start', '_self');
            },
            success: function(result) {
                if(result) {
                    console.log(result);
                }
            }
        });
    }
}