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
}