function updateLocation() {

    let items = document.getElementById("main").children;
    let removeNum = 0;
    for(let i = 0, j = 0; i < items.length; i++) {
        let item = items[i];
        let itemId = items[i].id;
        if(!(/hiddenGrid[0-9]+/).test(itemId)) {
            let itemWidth = parseInt((item.style.cssText.split(' '))[5]);
            //補空格子
            if((i+j+1)%6 === 0 && itemWidth > 1){
                let hiddenGrid = document.createElement("DIV");
                let gId = "hiddenGrid"+ n++;
                hiddenGrid.setAttribute("id", gId);
                hiddenGrid.setAttribute("ondrop","dropOnHiddenItem(event);");
                hiddenGrid.setAttribute("class","gridHidden");
                document.getElementById("main").insertBefore(hiddenGrid,document.getElementById(itemId));
                removeNum++;
                i++;
                items = document.getElementById("main").children;
            }

            settings[itemId].gridItemIndex = i+j;
            j += (itemWidth - 1);
        }else{
            if(removeNum > 0){
                document.getElementById("main").removeChild(document.getElementById(itemId));
                removeNum--;
            }
        }
    }
    userData.settings = settings;

    //send settings to server for save
    let host = "http://" + window.location.hostname;
    let port = ":" + window.location.port;
    $.ajax({
        url: host + port + '/home',
        type: 'POST',
        data:{
            userData,
            _csrf: $('meta[name="_csrf"]').attr('content')
        },
        error: function(){
            alert('Save Failed!請重新登入');
        },
        success: function(result) {
            if(result) {
                console.log(result);
            }
        }
    });
}