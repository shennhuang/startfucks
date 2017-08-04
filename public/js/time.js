function time(timeCountry){
    let element = document.getElementById('Time_'+timeCountry);
    //let element = document.getElementById('Time_'+timeCountry);
    if(element) {
        element.querySelector('p[name=info]').setAttribute("style","font-size:20px");

        element.querySelector('p[name=info]').innerHTML = "<br><br>" + new Date().toLocaleString();
        // setTimeout(function(){
        //     time(timeCountry);
        // },1000);
    }
}