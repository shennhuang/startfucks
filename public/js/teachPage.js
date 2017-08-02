
let pages = ["Welcome.png","step1.png","step2.png","step3.png","step4.png","step5.png"];
var nowPage = 0;
function nextPage(){
    if(document.getElementsByClassName('nextPage')[0].innerHTML == "Start!!"){
        document.getElementsByClassName('teachPage')[0].style.display = "none";
    }
    
    nowPage ++ ;
    if(nowPage > 0) document.getElementsByClassName('prePage')[0].style.display = "block";
    document.getElementsByClassName('teachPage')[0].style.backgroundImage = "url('/img/teachPage/" + pages[nowPage] + "')";
    console.log({now:document.getElementsByClassName('teachPage')[0].style.backgroundImage})
    console.log({to:"url('/img/teachPage/" + pages[nowPage] + "')"});
    if(nowPage == pages.length -1){
        console.log("Start")
        document.getElementsByClassName('nextPage')[0].style.display = "none";
        document.getElementsByClassName('startBtn')[0].style.display = "block";
    }

}
function prePage(){

    nowPage --

    document.getElementsByClassName('nextPage')[0].style.display = "block";
    document.getElementsByClassName('teachPage')[0].style.backgroundImage = "url('/img/teachPage/" + pages[nowPage] + "')";
    if(nowPage == 0) document.getElementsByClassName('prePage')[0].style.display = "none";
    document.getElementsByClassName('startBtn')[0].style.display = "none";
}
function startBtn(){
    document.getElementsByClassName('teachPage')[0].style.display = "none";
}
function skipBtn(){
    document.getElementsByClassName('teachPage')[0].style.display = "none";
}