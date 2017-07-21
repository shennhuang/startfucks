let timeCountry = (document.getElementsByName('Time')[0].getAttribute('id').split('_'))[1];
function time(){
    let element = document.getElementById('Time_'+timeCountry);
    if(element)
        element.children[2].innerHTML = new Date().toLocaleString();
    setTimeout('time()',1000);
}
document.getElementById('Time_Taiwan').children[2].setAttribute("style","font-size:20px");
time();