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
    if(title === "News"){
        news(subtitle);
    }
    if(title === "中央氣象局警、特報"){
        cwbWarning();
    }
    if(title === "Post(s)"){
        postsGet(subtitle,"s");
    }
    if(title === "Post(l)"){
        postsGet(subtitle,"l");
    }
}