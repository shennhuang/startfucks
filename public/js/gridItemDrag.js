function allowDrop(event){
    event.preventDefault();
}
function itemDrag(event){
    event.dataTransfer.setData("text", event.currentTarget.id);

    //check hasItem in settings
    //console.log(event.currentTarget.id)
    
    if((event.currentTarget.id.split('_'))[2]){
        let checkItemId = (event.currentTarget.id.split("_"))[0] + "_" + (event.currentTarget.id.split("_"))[1];
        if(settings.hasOwnProperty(checkItemId)){
            alert('The item has exist');
        }
    }
}
var n = 60;
function dropOnItem(event){
    event.preventDefault();
    let selectItemId = event.dataTransfer.getData("text");
    let selectItemWidth = parseInt((document.getElementById(selectItemId).style.cssText.split(' '))[5]);

    if(selectItemId !== event.currentTarget.id){ 

        //save selectItem in temp
        let selectItem = document.getElementById(selectItemId);

        if(!settings.hasOwnProperty(selectItemId)){
            //console.log('dropOnItem')
            selectItem = document.getElementById(selectItemId).cloneNode(true);
            selectItem.id = (selectItem.id.split("_"))[0] + "_" + (selectItem.id.split("_"))[1];

            settings[selectItem.id] = {
                title: (selectItem.id.split("_"))[0],
                subtitle: (selectItem.id.split("_"))[1],
                gridItemSize: {width: selectItemWidth, height: 1},
                gridItemIndex: -1,
            };

 
            //delete hidden grid
            let items = document.getElementById("main").children;
            for(let i = items.length-1, n = selectItemWidth; i >= 0 && n > 0; i--){
                let item = items[i];
                let itemId = items[i].id;
                if((/hiddenGrid[0-9]+/).test(itemId)) {
                    document.getElementById('main').removeChild(document.getElementById(itemId));
                    n--;
                }
            }
            
        }

        document.getElementById('main').insertBefore(selectItem,document.getElementById(event.currentTarget.id));

        updateLocation();
    }
    
}
function dropOnHiddenItem(event){
    event.preventDefault();

    
    let selectItemId = event.dataTransfer.getData("text");
    let selectItemWidth = parseInt((document.getElementById(selectItemId).style.cssText.split(' '))[5]);


    if(selectItemId !== event.currentTarget.id) {

        //save selectItem in temp
        let selectItem = document.getElementById(selectItemId);

        if(!settings.hasOwnProperty(selectItemId)){
            selectItem = document.getElementById(selectItemId).cloneNode(true);
            selectItem.id = (selectItem.id.split("_"))[0] + "_" + (selectItem.id.split("_"))[1];

            settings[selectItem.id] = {
                title: (selectItem.id.split("_"))[0],
                subtitle: (selectItem.id.split("_"))[1],
                gridItemSize: {width: selectItemWidth, height: 1},
                gridItemIndex: -1,
            };
        }
        //console.log(settings)

        if(settings.hasOwnProperty(selectItemId)){

            //insert hidden grid
            for(let i = 0; i < selectItemWidth; i++) {
                let hiddenGrid = document.createElement("DIV");
                let gId = "hiddenGrid"+ n++;
                hiddenGrid.setAttribute("id", gId);
                hiddenGrid.setAttribute("ondrop","dropOnHiddenItem(event);");
                hiddenGrid.setAttribute("class","gridHidden");
                //hiddenGrid.innerHTML = "<p>" + gId + "</p>"
                document.getElementById('main').insertBefore(hiddenGrid, document.getElementById(selectItemId));
            }

            //remove origin item
            document.getElementById('main').removeChild(document.getElementById(selectItemId));
        
        }


        //remove targetLocation item
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
        //insert selectItem by targetItem
        document.getElementById('main').insertBefore(selectItem, document.getElementById(event.currentTarget.id));

        //remove targetItem
        document.getElementById('main').removeChild(document.getElementById(event.currentTarget.id));

        updateLocation();
    }
}
/** 
 * the function current not use maybe...
function dropOnMain(event){
    let tempDiv = document.createElement("DIV");
    tempDiv.setAttribute("id", "tempDiv")
    document.getElementById('main').appendChild(tempDiv);
    let selectItemId = event.dataTransfer.getData("text");
    document.getElementById('main').insertBefore(document.getElementById(selectItemId),document.getElementById('tempDiv'));
    document.getElementById('main').removeChild(document.getElementById('tempDiv'));
}

**/