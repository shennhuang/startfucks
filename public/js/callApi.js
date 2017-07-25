function callApi(title, subtitle){
    if(title === "Weather"){
        weather(subtitle, "tw");
    }
    if(title === "Time"){
        time(subtitle);
    }
    if(title === "Ubike"){
        ubike(subtitle);
    }
    if(title === "Ubike(新北)"){
        ubikeNTP(subtitle);
    }
}