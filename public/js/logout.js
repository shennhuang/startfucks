function logout(){
    settingListBtnOnclick();
    let host = "http://" + window.location.hostname;
    let port = ":" + window.location.port;
    document.location.href=host+port;
}