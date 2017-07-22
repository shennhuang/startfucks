
function liskBtnOnclick(){
    var status = document.getElementsByClassName("blockList")[0].style.display;
    document.getElementsByClassName("blockList")[0].style.display = status == "none" ?  "" : "none";
}

function optionClick(account,apiName){
    
    blockAdded(account,apiName)
}

function blockAdded(account,apiName){
    console.log({account : account})
    console.log({apiName : apiName})
}
function blockRemove(){

}