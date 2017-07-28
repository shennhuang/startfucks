function allowDrop(event){
    event.preventDefault();
    hiddenBlockList();
    hiddenSettingList();
}
function itemDrag(event){  

    //判斷要不要新增，用id是否有default來判斷
    if((event.currentTarget.id.split('_'))[1] === 'default'){

        let checkItemId = (event.currentTarget.id.split("_"))[0];
        let checkItemListType = apidata[checkItemId.toLowerCase()].listType;
        
        //判斷listType
        if(checkItemListType == "select"){
            let selectValue = event.currentTarget.querySelector("select").value;
            checkItemId =  checkItemId + "_" + selectValue;

            let subselectValue;
            if(event.currentTarget.querySelector("select[id=subselect]")){
                subselectValue = event.currentTarget.querySelector("select[id=subselect]").value;
                checkItemId += ("_" + subselectValue);
            }
        }

        //確認拖曳的item是否已經存在
        if(settings.hasOwnProperty(checkItemId)){
            alert('The item has exist');
            return;
        }
    }
    //將要記錄的資訊放入事件中(這裡紀錄目前拖曳的目標物件id)
    event.dataTransfer.setData("text", event.currentTarget.id);
}
var n = 60; // 不明生物
function dropOnItem(event){ 
    event.preventDefault();
    let selectItemId = event.dataTransfer.getData("text"); //壓別人的id
    console.log({壓別人的id:selectItemId})
    console.log({被壓的id:event.currentTarget.id})
    
    //若壓別人的不為空值(?) && 不是自己壓自己
    if(selectItemId && selectItemId !== event.currentTarget.id){ 

        let selectItemWidth = parseInt((document.getElementById(selectItemId).style.cssText.split(' '))[5]); //壓別人的寬度
        // console.log({壓別人的寬度:selectItemWidth})
        let selectItem = document.getElementById(selectItemId); //壓別人的物件
        
        //新增block
        if(!settings.hasOwnProperty(selectItemId)){
            console.log({壓人的物件:selectItemId})
            let title = (selectItem.id.split("_"))[0];
            let checkItemListType = apidata[title.toLowerCase()].listType;

            //一定要先取選單的值
            let subtitle = selectItem.querySelector(checkItemListType).value;
            
            if(checkItemListType == "select"){ //判斷listType
                let subselectValue;
                //取得子選單的值,加在subtitle裡
                if(selectItem.querySelector("select[id=subselect]")){
                    subselectValue = selectItem.querySelector("select[id=subselect]").value;
                    subtitle += ("_" + subselectValue);
                }
            }
            console.log({subtitle : subtitle})
            //接下來的操作用複製的物件,這樣選單的才不會消失(這時選取的值會變預設,所以前面要先存起來)
            selectItem = document.getElementById(selectItemId).cloneNode(true);

            //改變狀態 從list樣式 -> 格字內的格式
            //刪除list的title
            selectItem.id = title + "_" + subtitle;
            selectItem.removeChild(selectItem.querySelector("font"));
            selectItem.removeChild(selectItem.querySelector("select"));//**choose
            if(selectItem.querySelector("select[id=subselect]")){
                selectItem.removeChild(selectItem.querySelector("select[id=subselect]"));
            }

            //update item content
            selectItem.querySelector("p[name=remove]").removeAttribute("hidden");
            selectItem.querySelector("p[name=title]").removeAttribute("hidden");
            selectItem.querySelector("p[name=info]").removeAttribute("hidden");


            selectItem.querySelector("p[name=title]").innerHTML = title + "-" + subtitle.replace("_","-");

            // 用append方式產生callapi(已棄用)
            // let scriptElement = document.createElement("script");
            // scriptElement.innerHTML = "callApi(\"" + title + "\",\"" + subtitle + "\")";
            // selectItem.appendChild(scriptElement);

            selectItem.querySelector("script[name=callapi]").innerHTML = "callApi(\"" + title + "\",\"" + subtitle + "\")";
            console.log({id:selectItem.id})

            //update settings
            settings[selectItem.id] = {
                title,
                subtitle,
                gridItemSize: {width: selectItemWidth, height: 1},
                gridItemIndex: -1,
            };

            //delete hidden grid
            let items = document.getElementById("main").children;
            // console.log({mainChikdren : items})
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

    if(selectItemId && selectItemId !== event.currentTarget.id) {

        let selectItemWidth = parseInt((document.getElementById(selectItemId).style.cssText.split(' '))[5]);
        
        //save selectItem in temp
        let selectItem = document.getElementById(selectItemId);

        //add item
        if(!settings.hasOwnProperty(selectItemId)){

            let title = (selectItem.id.split("_"))[0];
            let subtitle = selectItem.querySelector("select").value;

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
            

            //update item content
            selectItem.querySelector("p[name=remove]").removeAttribute("hidden");
            selectItem.querySelector("p[name=title]").removeAttribute("hidden");
            selectItem.querySelector("p[name=info]").removeAttribute("hidden");

            selectItem.querySelector("p[name=title]").innerHTML = title + "-" + subtitle.replace("_","-");

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