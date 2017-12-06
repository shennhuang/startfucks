
function switchSheet(n){
    for (let i = 0 ; i < $(".sheetContainer").children("li").length; i++){
        if (i == n) {
            $('li[name=sheet' + i +']').attr('class', 'chooseSheet');
            $('table[name=optionsContainer' + i +']').attr('class', 'optionsContainer');
        } else {
            $('li[name=sheet' + i +']').attr('class', 'sheet');
            $('table[name=optionsContainer' + i +']').attr('class', 'optionsContainerHide');
        }
    }
}