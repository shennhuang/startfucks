function logout(){
    req.session.account = users.account;

    let host = 'http://localhost:8080';
    $.ajax({
        url: host + '/home',
        type: 'GET',
        error: function(){
            alert('???');
        },
        success: function(result) {
            if(result) {
                console.log(Logout);
            }
        }
    });
}