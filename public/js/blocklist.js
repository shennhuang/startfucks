function liskBtnOnclick(){
    var status = document.getElementsByClassName("blockList")[0].style.display;
    document.getElementsByClassName("blockList")[0].style.display = status == "none" ?  "" : "none";
}

function optionClick(account){
    
    console.log(typeof(account))
}