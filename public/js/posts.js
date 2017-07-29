function postsGet(title,size){
    
    let host = 'http://localhost:8080';
    let elementId = "Post(" + size  + ")_" + title;
    let element = document.getElementById(elementId);
    if(element){

        $.ajax({
            url: host + '/apis?q=getpost_'+size,
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
                if(result) {
                    if(size = "s"){
                        //內文有括號會被html視為function,所以要取代掉
                        let newElementId = elementId.replace("(","/a").replace(")","/b");
                        
                        //設定btn
                        let btn = document.createElement("button");
                        let btnId = document.createAttribute("id");
                        btnId.value = "postBtn";
                        btn.setAttributeNode(btnId);
                        let btnOnclick = document.createAttribute("onclick");
                        btnOnclick.value = "postBtnOnclick(this,'" + newElementId + "')";
                        btn.setAttributeNode(btnOnclick);

                        element.appendChild(btn);
                        btn.innerHTML = "Save"

                        //設定info
                        let infoStyle = document.createAttribute("style");
                        infoStyle.value = "margin:0";
                        let info = element.querySelector('p[name=info]');
                        info.setAttributeNode(infoStyle);


                        element.querySelector('p[name=info]').innerHTML = "<textarea id='" + newElementId + "'class='smallPosttextarea'></textarea>";
                        // "<div id = 'smallPostContent'>HelloWorld</div>"
                        // "<textarea sytle='width:50px;height:50px;'>"
                    }
                }
            }
        });

        setTimeout(function(){
            posts(title,size);
        },300000);
    }
}