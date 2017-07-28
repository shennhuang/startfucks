function addSubselect(event){
    let itemTitle = (event.currentTarget.parentNode.id.split("_"))[0].toLowerCase();
    let item = event.currentTarget.parentNode;
    let selectValue = event.currentTarget.value;

    if(item.querySelector("select[id=subselect]")){
        item.removeChild(item.querySelector("select[id=subselect]"));
    }
    
    if(apidata[itemTitle].sublist && apidata[itemTitle].sublist[selectValue]){
        let sublist = apidata[itemTitle].sublist[selectValue];
        let subselect = document.createElement("select");
        subselect.id = "subselect";
        for (let listItem in sublist){
            let option = document.createElement("option");
            option.text = listItem;
            subselect.options.add(option);
        }
        item.insertBefore(subselect, item.querySelector("p[name=remove]"));
    }
}