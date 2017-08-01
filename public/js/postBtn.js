function postBtnOnclick(x,textareaId){
    let xId = x.id;
    let elementId = xId.split("~")[0];
    let inner = x.innerHTML;
    let textareaValue = document.getElementById(textareaId).value;
    let divValue = document.getElementById(elementId+"~div").value || "";
    if(inner == "Save"){
        
        let postWords = document.getElementById(textareaId).value;
        console.log("----------"+postWords+"$");
        postWords = postWords.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g,"&#039;");
        postWords = JSON.stringify(postWords).replace(/\"/g,'');
        let size = xId.split('_')[0];
        let title = xId.split('~')[0];
        postsPut(title,postWords);

        document.getElementById(textareaId).style.display = "none";
        document.getElementById(elementId + '~div').style.display = "block";
        document.getElementById(elementId + '~div').querySelector('pre').innerHTML = JSON.parse("\"" + postWords + "\"");
        document.getElementById(xId).innerHTML = "Edit";
    }
    if(inner == "Edit"){
        document.getElementById(textareaId).style.display = "block";
        document.getElementById(elementId + '~div').style.display = "none";
        let textValue = document.getElementById(elementId + '~div').querySelector('pre').innerHTML;
        textValue = textValue.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, "\"").replace(/&#039;/g,"'");
        document.getElementById(textareaId).value = textValue;
        document.getElementById(xId).innerHTML = "Save";
    }
}