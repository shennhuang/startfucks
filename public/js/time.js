function time(timeCountry){
    for(let element of document.getElementsByName('Time')){
        element.children[2].setAttribute("style","font-size:20px");
    
        //let element = document.getElementById('Time_'+timeCountry);
        if(element) {
            element.children[2].innerHTML = new Date().toLocaleString();
            setTimeout(function(){
                time(timeCountry);
            },1000);
        }
    }
}