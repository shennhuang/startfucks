if(!userData.colors){
    initColors();
}else{
    loadColors();
}
//for old users
function initColors(){
    //default colors
    userData.colors = {
        headColor:"#3a170f",
        nameColor:"#f0ffff",
        fontColor:"#000000",
        itemColor:"#c6ecf6",
        backColor:"#f0ffff"
    }
}
//set colors in css
function loadColors(){
    let docElement = document.documentElement;
    docElement.style.setProperty("--headColor", userData.colors.headColor);
    docElement.style.setProperty("--nameColor", userData.colors.nameColor);
    docElement.style.setProperty("--fontColor", userData.colors.fontColor);
    docElement.style.setProperty("--itemColor", userData.colors.itemColor);
    docElement.style.setProperty("--backColor", userData.colors.backColor);
}
function changeColors(event){
    let picker = event.target;
    if(picker.name === "headColorPicker"){
        return document.querySelector("header").style["background-color"] = picker.value;
    }
    if(picker.name === "nameColorPicker"){
        document.querySelector(".hi").style["color"] = picker.value;
        document.querySelector(".userName").style["color"] = picker.value;
        return;
    }

    let gridItems = document.querySelectorAll(".gridItem");
    let property = "background-color";
    if(picker.name === "backColorPicker"){
        gridItems = document.querySelectorAll(".gridHidden");
    }
    if(picker.name === "fontColorPicker"){
        property = "color";
    }
    for(let item of gridItems){
        item.style[property] = picker.value;
    }

}
function setPickerInitColor(){
    let modal = document.getElementsByClassName('modalContainer')[1];
    modal.querySelector("input[name=headColorPicker]").value = userData.colors.headColor;
    modal.querySelector("input[name=nameColorPicker]").value = userData.colors.nameColor;
    modal.querySelector("input[name=fontColorPicker]").value = userData.colors.fontColor;
    modal.querySelector("input[name=itemColorPicker]").value = userData.colors.itemColor;
    modal.querySelector("input[name=backColorPicker]").value = userData.colors.backColor;
}
function editColors(){
    hiddenSettingList();
    document.getElementsByClassName('modalContainer')[1].style.display = "block";
    setPickerInitColor();
}
function saveColors(){
    let modal = document.getElementsByClassName('modalContainer')[1];
    modal.style.display = "none";
    userData.colors.headColor = modal.querySelector("input[name=headColorPicker]").value;
    userData.colors.nameColor = modal.querySelector("input[name=nameColorPicker]").value;
    userData.colors.fontColor = modal.querySelector("input[name=fontColorPicker]").value;
    userData.colors.itemColor = modal.querySelector("input[name=itemColorPicker]").value;
    userData.colors.backColor = modal.querySelector("input[name=backColorPicker]").value;

    //post userData to backend for save
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
            alert('Save Failed!');
        },
        success: function(result) {
            if(result) {
                console.log(result);
            }
        }
    });
}
function reColors(){
    document.querySelector("header").style["background-color"] = userData.colors.headColor;
    document.querySelector(".hi").style["color"] = userData.colors.nameColor;
    document.querySelector(".userName").style["color"] = userData.colors.nameColor;

    let gridItems = document.querySelectorAll(".gridItem");
    for(let item of gridItems){
        item.style["color"] = userData.colors.fontColor;
        item.style["background-color"] = userData.colors.itemColor;
    }
    gridItems = document.querySelectorAll(".gridHidden");
    for(let item of gridItems){
        item.style["background-color"] = userData.colors.backColor;
    }
    setPickerInitColor();
}
