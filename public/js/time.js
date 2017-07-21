function time(){
    document.getElementById('Time_Taiwan').children[1].innerHTML = new Date().toLocaleString();
    setTimeout('time()',1000);
}
document.getElementById('Time_Taiwan').children[1].setAttribute("style","font-size:20px");
time();