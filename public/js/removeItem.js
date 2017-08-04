function removeItem(event){
    
    event.preventDefault();

    let selectItemWidth = parseInt((event.currentTarget.parentNode.style.cssText.split(' '))[5]);

    for(let i = 0; i < selectItemWidth; i++) {
        let hiddenGrid = document.createElement("DIV");
        let gId = "hiddenGrid"+ n++;
        hiddenGrid.setAttribute("id", gId);
        hiddenGrid.setAttribute("ondrop","dropOnHiddenItem(event); updateLocation();");
        hiddenGrid.setAttribute("class","gridHidden");
        
        document.getElementById('main').insertBefore(hiddenGrid, event.currentTarget.parentNode);
    }

    let currentItemId = event.currentTarget.parentNode.id;
    document.getElementById('main').removeChild(event.currentTarget.parentNode);

    //從前端settings裡移除該item
    delete settings[currentItemId];
    delete intervalHandlers[currentItemId];

    while(document.body.querySelector('div[role=tooltip]')){
        document.body.removeChild(document.body.querySelector('div[role=tooltip]'));
    }
    updateLocation();
}