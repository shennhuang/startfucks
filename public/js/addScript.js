function addScript(title, subtitle){
    let scriptName = title.toLowerCase();
    let newScript = document.createElement("script");
    newScript.setAttribute("type", "text/javascript");
    newScript.setAttribute("src", "/js/" + scriptName + ".js");
    document.body.appendChild(newScript);

}