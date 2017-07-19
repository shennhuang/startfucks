function time(){
　document.getElementsByName('Time')[0].children[1].innerHTML = new Date().toLocaleString();
　setTimeout('time()',1000);
}
time();