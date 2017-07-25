
    function editName(){
        document.getElementsByClassName('modalContainer')[0].style.display = "block";
        var name = document.getElementsByClassName('userName')[0].innerHTML;
        document.getElementsByClassName('newName')[0].value = name;
    }
    function saveName(){
        var newName = document.getElementsByClassName('newName')[0].value;
        if (!newName || newName.length > 20) {
            document.getElementsByClassName('newName')[0].value = 
                document.getElementsByClassName('userName')[0].innerHTML;
            alert('不能好好取名字膩？')
            return;
        }
        document.getElementsByClassName('userName')[0].innerHTML = newName;

        document.getElementsByClassName('modalContainer')[0].style.display = "none";
        
        userData.name = newName;

        let host = 'http://localhost:8080';
        $.ajax({
            url: host + '/home',
            type: 'POST',
            data:{
                userData,
                _csrf: $('meta[name="_csrf"]').attr('content')
            },
            error: function(){
                alert('Save Failed!');
            },
            success: function(result) {
                if(result) {
                    console.log(result);
                }
            }
        });
        
    }
window.onclick = function(event) {
    let modal = document.getElementsByClassName('modalContainer')[0];
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
