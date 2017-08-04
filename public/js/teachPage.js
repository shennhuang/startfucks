let pages = ["Welcome.jpg","step1.png","step2.png","step3.png","step4.png"];
var nowPage = 0;
function nextPage(){
    if(document.getElementsByClassName('nextPage')[0].innerHTML == "Start!!"){
        document.getElementsByClassName('teachPageContainer')[0].style.display = "none";
    }
    
    nowPage ++ ;
    document.getElementsByClassName('footer')[0].innerHTML = nowPage+1 + "/" + pages.length + " step";
    document.getElementsByClassName('imageContainer')[0].style.backgroundImage = "url('img/teachPage/" + pages[nowPage] + "')";
    if(nowPage > 0) document.getElementsByClassName('prePageDiv')[0].style.display = "block";
    if(nowPage == pages.length -1){
        console.log("Start")
        document.getElementsByClassName('nextPage')[0].style.display = "none";
        document.getElementsByClassName('startBtn')[0].style.display = "block";
    }

}
function prePage(){

    nowPage -- ;
    document.getElementsByClassName('footer')[0].innerHTML = nowPage+1 + "/" + pages.length + " step";
    document.getElementsByClassName('nextPage')[0].style.display = "block";
    document.getElementsByClassName('imageContainer')[0].style.backgroundImage = "url('img/teachPage/" + pages[nowPage] + "')";
    document.getElementsByClassName('startBtn')[0].style.display = "none";
    if(nowPage == 0) document.getElementsByClassName('prePageDiv')[0].style.display = "none";
}
function startBtn(){
    document.getElementsByClassName('nextPage')[0].style.display = "block";
    document.getElementsByClassName('startBtn')[0].style.display = "none";
    document.getElementsByClassName('teachPageContainer')[0].style.display = "none";
}
function skipBtn(){
    document.getElementsByClassName('teachPageContainer')[0].style.display = "none";
}
function animation(){
    setInterval(function(){ 
        let w = document.getElementsByClassName('nextPage')[0].style.left.slice(0,-2);
        w = +w > 0 ? +w - 30 : +w + 15;
        document.getElementsByClassName('nextPage')[0].style.left = w  + "px";
    }, 1000);
    setInterval(function(){ 
        let w = document.getElementsByClassName('prePage')[0].style.right.slice(0,-2);
        w = +w > 0 ? +w - 30 : +w + 15;
        document.getElementsByClassName('prePage')[0].style.right = w  + "px";
    }, 1000);
}
function teachPageOnload(){
    document.getElementsByClassName('teachPageContainer')[0].style.display = "block";
}
