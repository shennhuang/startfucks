function postsGet(title,size){
    title = "Post(" + size  + ")_" + title;
    let element = document.getElementById(title);
    if(element){
                    
        //內文有括號會被html視為function,所以要取代掉
        let titleReplace = title.replace("(","/a").replace(")","/b");
        let postValue = "";
        if(settings[title] && settings[title].postWords) {
            postValue = settings[title].postWords;
        }
        
        //設定btn
        let btn = document.createElement("button");
        let btnId = document.createAttribute("id");
        btnId.value = title + "~btn";
        btn.setAttributeNode(btnId);
        let btnOnclick = document.createAttribute("onclick");
        btnOnclick.value = "postBtnOnclick(this,'" + titleReplace + "')";
        btn.setAttributeNode(btnOnclick);

        element.appendChild(btn);
        btn.innerHTML = "Edit"

        //設定info
        let infoStyle = document.createAttribute("style");
        infoStyle.value = "margin:0";
        let info = element.querySelector('p[name=info]');
        info.setAttributeNode(infoStyle);

        //取代回setting
        if(settings[title].postWords){
            settings[title].postWords = JSON.stringify(postValue).replace(/\"/g,'');
            userData.settings = settings;
        }

        if(size == "s"){
            element.querySelector('p[name=info]').innerHTML = "<div id = '" + title  + "~div' class = 'smallPostContent' style='display:block;'><pre>" + postValue + "</pre></div><textarea id='" + titleReplace + "'class='smallPosttextarea' style='display:none;'></textarea>";
            return;
        }
        if(size == "l"){
            element.querySelector('p[name=info]').innerHTML = "<div id = '" + title  + "~div' class = 'largePostContent' style='display:block;'><pre>" + postValue + "</pre></div><textarea id='" + titleReplace + "'class='largePosttextarea' style='display:none;'></textarea>";
            return;
        }

        
           
    }
}
function postsPut(title,words){
    let host = 'http://localhost:8080';
    userData.settings[title].postWords = words;
    $.ajax({
        url: host + '/home',
        type: 'POST',
        data:{
            userData,
            _csrf: $('meta[name="_csrf"]').attr('content')
        },
        error: function(){
            //alert('您的頁面已經過期,請重新登入！');
            window.open(host + '/start', '_self');
        },
        success: function(result) {
            if(result) {
                console.log("Save post success");
            }
        }
    })
    
}