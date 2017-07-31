function postBtnOnclick(x,textareaId){
    let xId = x.id;
    let elementId = xId.split("~")[0];
    let inner = x.innerHTML;
    let textareaValue = document.getElementById(textareaId).value;
    let divValue = document.getElementById(elementId+"~div").value || "";
    if(inner == "Save"){
        // id = id.replace("/a","(").replace("/b",")")
        let postWords = document.getElementById(textareaId).value;
        let size = xId.split('_')[0];
        let title = xId.split('_')[1].split('~')[0];
        console.log({size:size})
        if(size == 'Post(s)') postsPut(title,"s",postWords);
        else if(size == 'Post(l)') postsPut(title,"l",postWords);

        document.getElementById(textareaId).style.display = "none"
        document.getElementById(elementId + '~div').style.display = "block"
        textareaValue = document.getElementById(textareaId).value + "";
        textareaValue = textareaValue.toString();
        console.log({textareaValue : textareaValue})
        document.getElementById(elementId + '~div').querySelector('pre').innerHTML = textareaValue;
        document.getElementById(xId).innerHTML = "Edit";
    }
    if(inner == "Edit"){
        document.getElementById(textareaId).style.display = "block"
        document.getElementById(elementId + '~div').style.display = "none"
        document.getElementById(textareaId).value = document.getElementById(elementId + '~div').querySelector('pre').innerHTML;
        document.getElementById(xId).innerHTML = "Save";
    }
}