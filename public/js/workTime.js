function workTime(onWorkTime){
    let element = document.getElementById('Work1O4_'+onWorkTime);

    if(element) {
        element.querySelector('p[name=info]').innerHTML = "</br></br>";
        element.querySelector('p[name=info]').setAttribute("style","font-size:20px");

        checkHour = onWorkTime.split(":")[0];
        if(!(0 < checkHour && checkHour <= 12)){
            element.querySelector('p[name=info]').innerHTML += "set time error";
        } 
        if(checkHour > 0 && checkHour <= 12){

            let nowDate = new Date();
            let today = nowDate.getDay();

            onWorkTime = new Date(nowDate.toLocaleDateString() + " " + onWorkTime).getTime();
            let nodTime = new Date(nowDate.toLocaleDateString() + " " + "12:0:0").getTime();
            let offWorkTime = new Date(onWorkTime + 9*60*60*1000).getTime();
            let nowTime = Date.now();
            if(1 <= today && today <= 5){
                if(onWorkTime < nowTime && nowTime < nodTime){
                    element.querySelector('p[name=info]').innerHTML += "距離午休剩餘:" 
                    diffTime = nodTime - nowTime;
                }else if(nodTime <= nowTime && nowTime < nodTime + 60*60*1000){
                    element.querySelector('p[name=info]').innerHTML += "距離午休結束:"
                    diffTime = nodTime + 60*60*1000 - nowTime;
                }else if(nodTime + 60*60*1000 <= nowTime && nowTime < offWorkTime){
                    //星期五距離下班改為距離放假
                    if(today == 5){
                        element.querySelector('p[name=info]').innerHTML += "距離放假剩餘:";
                    } else {
                        element.querySelector('p[name=info]').innerHTML += "距離下班剩餘:";
                    }
                    diffTime = offWorkTime - nowTime;
                } else {
                    element.querySelector('p[name=info]').innerHTML += "距離上班剩餘:";
                    diffTime = onWorkTime - nowTime;
                }
                diffTime = new Date(diffTime);
                element.querySelector('p[name=info]').innerHTML += addZero(diffTime.getUTCHours()) + ":" + addZero(diffTime.getUTCMinutes()) + ":" + addZero(diffTime.getUTCSeconds())
        
            }
            if(today == 6 || today == 7){
                //星期天上班前12小時會倒數
                if(today == 7 && nowTime - onWorkTime <= 12*60*60*1000){
                    element.querySelector('p[name=info]').innerHTML += "距離上班剩餘:";
                    diffTime = onWorkTime - nowTime;
                } else {
                    element.querySelector('p[name=info]').innerHTML += "今天放假"
                }
            }
        }
    }
}

function addZero(time){
    return time < 10 ? "0"+time : time;
}