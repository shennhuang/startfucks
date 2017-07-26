function createSelectOptions(apidata){
    console.log(apidata)
    // apidata = JSON.parse(apidata);
    let apiKeys = Object.keys(apidata);
    
    for (let item of apiKeys) {
        let listKeys = Object.keys(apidata[item].list);
        let selectClass = document.getElementsByClassName(item+"Select")[0];
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