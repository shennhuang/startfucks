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

    //document.body.removeChild(document.getElementById("script_" + event.currentTarget.parentNode.id));

    let currentItemId = event.currentTarget.parentNode.id;
    document.getElementById('main').removeChild(event.currentTarget.parentNode);

    delete settings[currentItemId];

    updateLocation();
}