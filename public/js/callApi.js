var intervalHandlers = {};
function callApi(title, subtitle){

    //如果計時器已經存在先移除掉
    if(intervalHandlers[title+"_"+subtitle]){
        clearInterval(intervalHandlers[title+"_"+subtitle]);
    }
    if(title === "Weather"){
        weather(subtitle, "tw");
        intervalHandlers[title+"_"+subtitle] = setInterval(()=>{weather(subtitle, "tw")}, 900000);
    }
    if(title === "Time"){
        time(subtitle);
        intervalHandlers[title+"_"+subtitle] = setInterval(()=>{time(subtitle)}, 1000);
    }
    if(title === "Work1O4"){
        workTime(subtitle);
        intervalHandlers[title+"_"+subtitle] = setInterval(()=>{workTime(subtitle)}, 1000);
    }
    if(title === "Ubike"){
        ubike(subtitle);
        intervalHandlers[title+"_"+subtitle] = setInterval(()=>{ubike(subtitle)}, 300000);
    }
    if(title === "Ubike(新北)"){
        ubikeNTP(subtitle);
        intervalHandlers[title+"_"+subtitle] = setInterval(()=>{ubikeNTP(subtitle)},300000);
    }
    if(title === "News"){
        news(subtitle);
        intervalHandlers[title+"_"+subtitle] = setInterval(()=>{news(subtitle)}, 1800000);
    }
    if(title === "中央氣象局警、特報"){
        cwbWarning();
        intervalHandlers[title+"_"+subtitle] = setInterval(()=>{cwbWarning()}, 600000);
    }
    if(title === "Post(S)"){
        postsGet(subtitle,"S");
    }
    if(title === "Post(L)"){
        postsGet(subtitle,"L");
    }
}