function cwbAQI(areaAndStationName){
    let element = document.getElementById('空氣品質指標(AQI)_'+areaAndStationName);

    if(element){

        $.ajax({
            url: '/apis?q=AQI',
            type: 'POST',
            data:{
                areaAndStationName,
                _csrf: $('meta[name="_csrf"]').attr('content')
            },
            error: function(){
                // alert('您的頁面已經過期,請重新登入！');
                window.open('/start', '_self');
            },
            success: function(result) {
                if(result) {
                    if(result.data.AQI){
                        let hour = result.data.Time.split(" ")[1].split(":")[0];
                        let amOrpm = hour < 12? " 上午" : " 下午";
                        let getTime = result.data.Time.replace(/-/g,"/").replace(" ",amOrpm)
                        let aqi = result.data.AQI;
                        let pm25 = result.data.PM25;
                        let siteName = result.data.SiteName;

                        pm25 = pm25 === "ND" ? "未檢出" : pm25;
                        pm25 = pm25 === "" ? "設備維護" : pm25;
                        aqi = aqi === "" ? "設備維護" : aqi;

                        element.querySelector('p[name=info]').innerHTML = 
                        "<div>監測站類型:" + result.data.MonobjName + "</div>" +
                        "<div class = \"AQIValueDiv AQIValueDiv_" + siteName + "\">AQI指數:" + aqi + "</div>" +
                        "<div class = \"PM25ValueDiv PM25ValueDiv_" + siteName + "\">PM2.5指數:" + pm25 + "</div>" +
                        "<div>Update：" + getTime + "</div>";

                        // 檢查AQI
                        if(0 <= aqi && aqi <= 50){
                            document.getElementsByClassName("AQIValueDiv_"+siteName)[0].style.backgroundColor = "#00e800";
                        }else if(51 <= aqi && aqi <= 100){
                            document.getElementsByClassName("AQIValueDiv_"+siteName)[0].style.backgroundColor = "#ffff00";
                        }else if(101 <= aqi && aqi <= 150){
                            document.getElementsByClassName("AQIValueDiv_"+siteName)[0].style.backgroundColor = "#ff7e00";
                        }else if(151 <= aqi && aqi <= 200){
                            document.getElementsByClassName("AQIValueDiv_"+siteName)[0].style.backgroundColor = "#ff0000";
                        }else if(201 <= aqi && aqi <= 300){
                            document.getElementsByClassName("AQIValueDiv_"+siteName)[0].style.backgroundColor = "#8f3f97";
                        }else if(301 <= aqi && aqi <= 500){
                            document.getElementsByClassName("AQIValueDiv_"+siteName)[0].style.backgroundColor = "#7e0023";
                        }

                        // 檢查pm2.5
                        if(pm25 === "ND"){
                            document.getElementsByClassName("PM25ValueDiv_"+siteName)[0].style.backgroundColor = "none";
                        }else if(0 <= pm25 && pm25 <= 11){
                            document.getElementsByClassName("PM25ValueDiv_"+siteName)[0].style.backgroundColor = "lightgreen";
                        }else if(12 <= pm25 && pm25 <= 23){
                            document.getElementsByClassName("PM25ValueDiv_"+siteName)[0].style.backgroundColor = "#00FF00";
                        }else if(24 <= pm25 && pm25 <= 35){
                            document.getElementsByClassName("PM25ValueDiv_"+siteName)[0].style.backgroundColor = "green";
                        }else if(36 <= pm25 && pm25 <= 41){
                            document.getElementsByClassName("PM25ValueDiv_"+siteName)[0].style.backgroundColor = "yellow";
                        }else if(42 <= pm25 && pm25 <= 47){
                            document.getElementsByClassName("PM25ValueDiv_"+siteName)[0].style.backgroundColor = "#FFCC66";
                        }else if(48 <= pm25 && pm25 <= 53){
                            document.getElementsByClassName("PM25ValueDiv_"+siteName)[0].style.backgroundColor = "orange";
                        }else if(54 <= pm25 && pm25 <= 58){
                            document.getElementsByClassName("PM25ValueDiv_"+siteName)[0].style.backgroundColor = "#FF6666";
                        }else if(59 <= pm25 && pm25 <= 64){
                            document.getElementsByClassName("PM25ValueDiv_"+siteName)[0].style.backgroundColor = "red";
                        }else if(65 <= pm25 && pm25 <= 70){
                            document.getElementsByClassName("PM25ValueDiv_"+siteName)[0].style.backgroundColor = "brown";
                        }else if(pm25 > 71){
                            document.getElementsByClassName("PM25ValueDiv_"+siteName)[0].style.backgroundColor = "#FF00FF";
                        }
                        return 

                    }
                    return element.querySelector('p[name=info]').innerHTML = "設備維護中";
                }
                
            }
        });
    }
}