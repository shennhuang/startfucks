function createSelectOptions(){
    // apidata = JSON.parse(apidata);
    let apiKeys = Object.keys(apidata);

    for (let item of apiKeys) {
        let listKeys = Object.keys(apidata[item].list);
        let selectClass = document.getElementsByClassName(item+"Select")[0];
        
        if(!selectClass) return;

        for (let listItem of listKeys){
            var option = document.createElement("option");
            option.text = listItem;
            selectClass.options.add(option);
        }
        let event = {};
        event.currentTarget = selectClass;
        addSubselect(event);
    }
}
function bata_createSelectOptions(target){//bata???
    console.log({apidata : apidata[target].list})
    
}