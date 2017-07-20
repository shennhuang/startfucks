function allowDrop(event){
    event.preventDefault();
}
function itemDrag(event){
    event.dataTransfer.setData("text", event.currentTarget.id);
    //console.log(event.currentTarget.style.cssText)
}
var n = 58;
function dropOnItem(event){
    event.preventDefault();
    let selectItemId = event.dataTransfer.getData("text");

    document.getElementById('main').insertBefore(document.getElementById(selectItemId),document.getElementById(event.currentTarget.id));

}
function dropOnHiddenItem(event){
    event.preventDefault();
    let selectItemId = event.dataTransfer.getData("text");

    let selectItemWidth = (document.getElementById(selectItemId).style.cssText.split(' '))[5];
   

    if(selectItemId !== event.currentTarget.id){
        for(let i = 0; i < selectItemWidth; i++) {
            let hiddenGrid = document.createElement("DIV");
            let gId = "hiddenGrid"+ n++;
            hiddenGrid.setAttribute("id", gId);
            hiddenGrid.setAttribute("ondrop","dropOnHiddenItem(event," + n + ")" );
            hiddenGrid.setAttribute("class","gridHidden");
            //hiddenGrid.innerHTML = "<p>" + gId + "</p>"
            document.getElementById('main').insertBefore(hiddenGrid, document.getElementById(selectItemId));
        }

        let selectItem = document.getElementById(selectItemId);
        document.getElementById('main').removeChild(document.getElementById(selectItemId));

        
        for(let i = 0; i < selectItemWidth-1; i++) {
            let divElements = document.getElementsByTagName('div');
            for(let j = 0; j < divElements.length; j++){
                
                if(divElements[j].id === event.currentTarget.id){
                    
                    if(j-1 >= 0 && (/hiddenGrid[0-9]+/).test(divElements[j-1].id) && divElements[j].offsetLeft > 10){

                        document.getElementById('main').removeChild(divElements[j-1]);

                        break;
                    }
                    if((/hiddenGrid[0-9]+/).test(divElements[j+1].id)){
                        document.getElementById('main').removeChild(divElements[j+1]);
                        break;
                    }
                    break;
                }
            }
        }
        document.getElementById('main').insertBefore(selectItem, document.getElementById(event.currentTarget.id));


        document.getElementById('main').removeChild(document.getElementById(event.currentTarget.id));

    }
}
function dropOnMain(event){
    let tempDiv = document.createElement("DIV");
    tempDiv.setAttribute("id", "tempDiv")
    document.getElementById('main').appendChild(tempDiv);
    let selectItemId = event.dataTransfer.getData("text");
    document.getElementById('main').insertBefore(document.getElementById(selectItemId),document.getElementById('tempDiv'));
    document.getElementById('main').removeChild(document.getElementById('tempDiv'));
}