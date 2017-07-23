function time(timeCountry){
    let element = document.getElementById('Time_'+timeCountry);
    //let element = document.getElementById('Time_'+timeCountry);
    if(element) {
        element.children[2].setAttribute("style","font-size:20px");

        element.children[2].innerHTML = new Date().toLocaleString();
        setTimeout(function(){
            time(timeCountry);
        },1000);
    }
}