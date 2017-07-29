function updateLocation() {

    let items = document.getElementById("main").children;

    for(let i = 0, j = 0; i < items.length; i++) {
        let item = items[i];
        let itemId = items[i].id;
        if(!(/hiddenGrid[0-9]+/).test(itemId)) {
            let itemWidth = parseInt((item.style.cssText.split(' '))[5]);
            settings[itemId].gridItemIndex = i+j;
            j += (itemWidth - 1);
        }
        
    }
    userData.settings = settings;

    //send settings to server for save
    let host = 'http://localhost:8080';
    $.ajax({
        url: host + '/home',
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