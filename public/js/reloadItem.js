function reloadItem(event){
    event.preventDefault();
    
    let target = event.currentTarget.parentNode;
    console.log(target.id);
    let idSplited = target.id.split("_");
    let title = idSplited[0];
    let subtitle = idSplited[1];
    if(idSplited[2]){
        subtitle += "_" + idSplited[2];
    }
    if(title.indexOf("Post") < 0){
        target.querySelector("p[name=info]").innerHTML = "<img src=\"/img/Rolling.gif\">";
        callApi(title, subtitle);
    }
}