function allowDrop(event){
    event.preventDefault();
    hiddenBlockList();
}
function itemDrag(event){  
    //check new item
    if((event.currentTarget.id.split('_'))[1] === 'default'){

        let selectValue = event.currentTarget.querySelector("select").value;
        let checkItemId = (event.currentTarget.id.split("_"))[0] + "_" + selectValue;

        //check item has in settings
        if(settings.hasOwnProperty(checkItemId)){
            alert('The item has exist');
            return;
        }
    }
    event.dataTransfer.setData("text", event.currentTarget.id);
}
var n = 60;
function dropOnItem(event){
    event.preventDefault();
    let selectItemId = event.dataTransfer.getData("text");

    if(selectItemId && selectItemId !== event.currentTarget.id){ 

        let selectItemWidth = parseInt((document.getElementById(selectItemId).style.cssText.split(' '))[5]);
        
        //save selectItem in temp
        let selectItem = document.getElementById(selectItemId);

        //add item
        if(!settings.hasOwnProperty(selectItemId)){
            let title = (selectItem.id.split("_"))[0];
            let subtitle = selectItem.querySelector("select").value;

            selectItem = document.getElementById(selectItemId).cloneNode(true);

            selectItem.id = title + "_" + subtitle;

            selectItem.removeChild(selectItem.querySelector("font"));
            selectItem.removeChild(selectItem.querySelector("select"));

            //update item content
            selectItem.querySelector("p[name=remove]").removeAttribute("hidden");
            selectItem.querySelector("p[name=title]").removeAttribute("hidden");
            selectItem.querySelector("p[name=info]").removeAttribute("hidden");

            selectItem.querySelector("p[name=title]").innerHTML = title + "-" + subtitle;

            let scriptElement = document.createElement("script");
            scriptElement.innerHTML = "callApi(\"" + title + "\",\"" + subtitle + "\")";
            selectItem.appendChild(scriptElement);

            //update settings
            settings[selectItem.id] = {
                title,
                subtitle,
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

    if(selectItemId && selectItemId !== event.currentTarget.id) {

        let selectItemWidth = parseInt((document.getElementById(selectItemId).style.cssText.split(' '))[5]);
        
        //save selectItem in temp
        let selectItem = document.getElementById(selectItemId);

        //add item
        if(!settings.hasOwnProperty(selectItemId)){

            let title = (selectItem.id.split("_"))[0];
            let subtitle = selectItem.querySelector("select").value;

            selectItem = document.getElementById(selectItemId).cloneNode(true);

            selectItem.id = title + "_" + subtitle;

            selectItem.removeChild(selectItem.querySelector("font"));
            selectItem.removeChild(selectItem.querySelector("select"));

            //update item content
            selectItem.querySelector("p[name=remove]").removeAttribute("hidden");
            selectItem.querySelector("p[name=title]").removeAttribute("hidden");
            selectItem.querySelector("p[name=info]").removeAttribute("hidden");

            selectItem.querySelector("p[name=title]").innerHTML = title + "-" + subtitle;

            let scriptElement = document.createElement("script");
            scriptElement.innerHTML = "callApi(\"" + title + "\",\"" + subtitle + "\")";
            selectItem.appendChild(scriptElement);

            //update settings
            settings[selectItem.id] = {
                title,
                subtitle,
                gridItemSize: {width: selectItemWidth, height: 1},
                gridItemIndex: -1,
            };
        }
        else if(settings.hasOwnProperty(selectItemId)){

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