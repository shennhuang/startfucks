function allowDrop(event){
    event.preventDefault();
}
function itemDrag(event){
    event.dataTransfer.setData("text", event.currentTarget.id)
    console.log(event.currentTarget.id);
}
function dropOnItem(event){
    event.preventDefault();
    let selectItemId = event.dataTransfer.getData("text");
    document.getElementById('main').insertBefore(document.getElementById(selectItemId),document.getElementById(event.currentTarget.id))
}
function dropOnMain(event){
    let tempDiv = document.createElement("DIV");
    tempDiv.setAttribute("id", "tempDiv")
    document.getElementById('main').appendChild(tempDiv);
    let selectItemId = event.dataTransfer.getData("text");
    document.getElementById('main').insertBefore(document.getElementById(selectItemId),document.getElementById('tempDiv'));
    document.getElementById('main').removeChild(document.getElementById('tempDiv'));
}