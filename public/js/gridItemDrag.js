function allowDrop(event){
    //target: main
    event.preventDefault();
    document.getElementsByTagName("header")[0].removeAttribute("hidden");

    hiddenBlockList();
    hiddenSettingList();
}
var infoTemp;
//ondragstart
function itemDrag(event){
    let selectItemWidth = parseInt((event.currentTarget.style.cssText.split(' '))[5]);

    let title = (event.currentTarget.id.split("_"))[0];
    if(title === 'News' && event.currentTarget.querySelector("p[name=info]")){
        infoTemp = event.currentTarget.querySelector("p[name=info]");
        event.currentTarget.removeChild(event.currentTarget.querySelector("p[name=info]"));
    }
    document.getElementsByTagName("header")[0].hidden = "true";
    event.dataTransfer.setDragImage(event.currentTarget, 150 * selectItemWidth, 200);

    //判斷要不要新增，用id是否有default來判斷
    if((event.currentTarget.id.split('_'))[1] === 'default'){

        let checkItemId = title;
        let checkItemListType = apidata[checkItemId.toLowerCase()].listType;

        //判斷listType
        if(event.currentTarget.querySelector("select")){

            let selectValue = event.currentTarget.querySelector("select").value;
            checkItemId += ("_" + selectValue);

            let subselectValue;
            if(event.currentTarget.querySelector("select[id=subselect]")){
                subselectValue = event.currentTarget.querySelector("select[id=subselect]").value;
                checkItemId += ("_" + subselectValue);
            }
        }
        else if(event.currentTarget.querySelector("input")){
            let inputValue = event.currentTarget.querySelector("input").value;
            checkItemId += ("_" + inputValue);
            let regexp = /[&<>/\\"']/;
            if(regexp.test(inputValue)){
                alert("The title can not contain the following characters: &<>/\\ \" ' ")
            }
            if(inputValue == ""){
                alert("Title can not empty.")
                return;
            }
            let len = inputValue.length;
            if(len > 20 || len < 1){
                alert("Title length is between 1 and 20 words")
                return;
            }
        }else{
            checkItemId += "_null";
        }
        //確認拖曳的item是否已經存在
        if(settings.hasOwnProperty(checkItemId)){
            alert('The item has exist');
            document.getElementsByTagName("header")[0].removeAttribute("hidden");
            return;
        }
    }
    //將要記錄的資訊放入事件中(這裡紀錄目前拖曳的目標物件id)
    event.dataTransfer.setData("text", event.currentTarget.id);

}
var n = 60;
function dropOnItem(event){ 
    event.preventDefault();
    let selectItemId = event.dataTransfer.getData("text");
    if((selectItemId.split("_"))[0] === 'News'){
        document.getElementById(selectItemId).appendChild(infoTemp);
        delete infoTemp;
    }

    if(selectItemId && selectItemId !== event.currentTarget.id){ 
        let selectItemWidth = parseInt((document.getElementById(selectItemId).style.cssText.split(' '))[5]); //壓別人的寬度
        let selectItem = document.getElementById(selectItemId); //壓別人的物件
        
        //新增block
        if(!settings.hasOwnProperty(selectItemId)){
            let title = (selectItem.id.split("_"))[0];
            let subtitle = "null";

            if(selectItem.querySelector("select")){
                //一定要先取選單的值
                subtitle = selectItem.querySelector("select").value;
                //取得子選單的值,加在subtitle裡
                let subselectValue;
                if(selectItem.querySelector("select[id=subselect]")){
                    subselectValue = selectItem.querySelector("select[id=subselect]").value;
                    subtitle += ("_" + subselectValue);
                }

                //接下來的的操作用複製的物件,這樣選單的才不會消失(這時選取的值會變預設,所以前面要先存起來)
                selectItem = document.getElementById(selectItemId).cloneNode(true);

                selectItem.id = title + "_" + subtitle;

                selectItem.removeChild(selectItem.querySelector("font"));
                selectItem.removeChild(selectItem.querySelector("select"));
                if(selectItem.querySelector("select[id=subselect]")){
                    selectItem.removeChild(selectItem.querySelector("select[id=subselect]"));
                }
            }
            else if(selectItem.querySelector("input")){
                subtitle = selectItem.querySelector("input").value;
                console.log({sub : subtitle})
                selectItem = document.getElementById(selectItemId).cloneNode(true);
                selectItem.removeChild(selectItem.querySelector("input"));
                selectItem.id = title + "_" + subtitle;
                selectItem.removeChild(selectItem.querySelector("font"));
            }else{                
                selectItem = document.getElementById(selectItemId).cloneNode(true);
                selectItem.id = title + "_" + subtitle;
                selectItem.removeChild(selectItem.querySelector("font"));
            }

            //update item content
            selectItem.querySelector("i[name=remove]").removeAttribute("hidden");
            selectItem.querySelector("i[name=reload]").style.display = "block";
            selectItem.querySelector("p[name=title]").removeAttribute("hidden");
            selectItem.querySelector("p[name=info]").removeAttribute("hidden");

            if(subtitle === "null"){
                selectItem.querySelector("p[name=title]").innerHTML = title;
            }else{
                selectItem.querySelector("p[name=title]").innerHTML = selectItem.id.replace(/_/g,"-");
            }
            
            selectItem.querySelector("script[name=callapi]").innerHTML = "callApi(\"" + title + "\",\"" + subtitle + "\")";
            
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
            
        }//新增block
        document.getElementById('main').insertBefore(selectItem,document.getElementById(event.currentTarget.id));

        updateLocation();
    }
    
}
function dropOnHiddenItem(event){
    event.preventDefault();
    
    let selectItemId = event.dataTransfer.getData("text");
    if((selectItemId.split("_"))[0] === 'News'){
        document.getElementById(selectItemId).appendChild(infoTemp);
        delete infoTemp;
    }
    if(selectItemId && selectItemId !== event.currentTarget.id) {

        let selectItemWidth = parseInt((document.getElementById(selectItemId).style.cssText.split(' '))[5]);
        
        //save selectItem in temp
        let selectItem = document.getElementById(selectItemId);

        //add item
        if(!settings.hasOwnProperty(selectItemId)){
            
            let title = (selectItem.id.split("_"))[0];
            let subtitle = "null";
            if(selectItem.querySelector("select")){
                subtitle = selectItem.querySelector("select").value;

                //取得子選單的值,加在subtitle裡
                let subselectValue;
                if(selectItem.querySelector("select[id=subselect]")){
                    subselectValue = selectItem.querySelector("select[id=subselect]").value;
                    subtitle += ("_" + subselectValue);
                }

                selectItem = document.getElementById(selectItemId).cloneNode(true);
                selectItem.id = title + "_" + subtitle;
                selectItem.removeChild(selectItem.querySelector("font"));
                selectItem.removeChild(selectItem.querySelector("select"));
                if(selectItem.querySelector("select[id=subselect]")){
                    selectItem.removeChild(selectItem.querySelector("select[id=subselect]"));
                }
            }else if(selectItem.querySelector("input")){
                subtitle = selectItem.querySelector("input").value;
                
                selectItem = document.getElementById(selectItemId).cloneNode(true);
                selectItem.removeChild(selectItem.querySelector("input"));
                selectItem.id = title + "_" + subtitle;
                selectItem.removeChild(selectItem.querySelector("font"));
            }else{
                selectItem = document.getElementById(selectItemId).cloneNode(true);
                selectItem.id = title + "_" + subtitle;
                selectItem.removeChild(selectItem.querySelector("font"));
            }
            
            //update item content
            selectItem.querySelector("i[name=remove]").removeAttribute("hidden");
            selectItem.querySelector("i[name=reload]").style.display = "block";
            selectItem.querySelector("p[name=title]").removeAttribute("hidden");
            selectItem.querySelector("p[name=info]").removeAttribute("hidden");

            if(subtitle === "null"){
                selectItem.querySelector("p[name=title]").innerHTML = title;
            }else{
                selectItem.querySelector("p[name=title]").innerHTML = selectItem.id.replace(/_/g,"-");
            }

            selectItem.querySelector("script[name=callapi]").innerHTML = "callApi(\"" + title + "\",\"" + subtitle + "\")";


            //update settings
            settings[selectItem.id] = {
                title,
                subtitle,
                gridItemSize: {width: selectItemWidth, height: 1},
                gridItemIndex: -1,
            };
            
        }//move item
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