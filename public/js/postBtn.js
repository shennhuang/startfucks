function postBtnOnclick(x,id){
    let xId = x.id;
    if(inner = "Save"){
        // id = id.replace("/a","(").replace("/b",")")
        console.log({id:id});
        var textareaValue = document.getElementById(id).value;
        console.log({inner : innerHTML + "????"})

        document.getElementById(xId).innerHTML = "Edit";
    }
    if(inner = "Edit"){
        document.getElementById(xId).innerHTML = "Save";
    }
}