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
    let docElement = document.documentElement;
    if(picker.name === "headColorPicker"){
        docElement.style.setProperty("--headColor", picker.value);
    }
    if(picker.name === "nameColorPicker"){
        docElement.style.setProperty("--nameColor", picker.value);
    }
    if(picker.name === "fontColorPicker"){
        docElement.style.setProperty("--fontColor", picker.value);
    }
    if(picker.name === "itemColorPicker"){
        docElement.style.setProperty("--itemColor", picker.value);
    }
    if(picker.name === "backColorPicker"){
        docElement.style.setProperty("--backColor", picker.value);
    }
}
function setPickerInitColor(){
    let modal = document.getElementsByClassName('modalContainer')[1];
    let docElement = document.documentElement;
    modal.querySelector("input[name=headColorPicker]").value = docElement.style.getPropertyValue("--headColor");
    modal.querySelector("input[name=nameColorPicker]").value = docElement.style.getPropertyValue("--nameColor");
    modal.querySelector("input[name=fontColorPicker]").value = docElement.style.getPropertyValue("--fontColor");
    modal.querySelector("input[name=itemColorPicker]").value = docElement.style.getPropertyValue("--itemColor");
    modal.querySelector("input[name=backColorPicker]").value = docElement.style.getPropertyValue("--backColor");
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

    loadColors();

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
    loadColors();
    setPickerInitColor();
}
