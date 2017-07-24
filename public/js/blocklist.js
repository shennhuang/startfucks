
function liskBtnOnclick(){
    var status = document.getElementsByClassName("blockList")[0].style.display;
    document.getElementsByClassName("blockList")[0].style.display = status == "none" ?  "" : "none";
}

function optionClick(account,apiName){
    blockAdded(account,apiName)
}

function blockAdded(account,apiName){
    
    //改route
    // var getUserData =  {
    //     TableName: "users_data",
    //     Keys: {account,}
    // };
    
    // db.dbget(getUserData,function(data){
    //     console.log({Userdata : data})
    // })

}
function blockRemove(){

}