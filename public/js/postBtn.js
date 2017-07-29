function postBtnOnclick(x,id){
    let xId = x.id;
    if(inner = "Save"){
        // id = id.replace("/a","(").replace("/b",")")
        var textareaValue = document.getElementById(id).value;

        document.getElementById(xId).innerHTML = "Edit";
        let test = document.getElementById(xId);
    }
    if(inner = "Edit"){
        document.getElementById(xId).innerHTML = "Save";
    }
}