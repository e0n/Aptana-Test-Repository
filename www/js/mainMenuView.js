/**
 * User: pascal
 * Date: 27.01.13
 */

function diff(x, y) {//berechnet den winkel relativ zum bild
    var centerItem = $('header div#mainmenu div#menubody div#menuPointer'),
        centerLoc = centerItem.offset();
    var dx = x - (centerLoc.left + (centerItem.width() / 2));
    dy = y - (centerLoc.top + (centerItem.height() / 2));
    return Math.atan2(dy, dx) * (180 / Math.PI);
}

function setMenuText(val){
    var text = 'header div#mainmenu div#menubody a#text';
    if(val != ''){
        $(text).html(val);
        if(document.menuTextLeft == undefined) {
            document.menuTextLeft = $(text).offset().left;
        }
        $(text).css('margin-left', document.menuTextLeft - ($(text).width() / 2));
        if(document.menuTextTop == undefined){
            document.menuTextTop = $(text).offset().top;
        }
        $(text).css('margin-top', document.menuTextTop - ($(text).height() / 2) - 130);
    } else {
        $(text).html('');
        $(text).css('margin-left', '50%');
        $(text).css('margin-top', '48%');
    }

}

$(document).ready(function() {

    $('header div#mainmenu div#menubutton').on('click', function() {
        var body = 'header div#mainmenu div#menubody';
        var overlay = '#overlay';
        var pointer = 'header div#mainmenu div#menubody div#menuPointer';
        var neW = 'header div#mainmenu div#menubody div#new';
        var load = 'header div#mainmenu div#menubody div#load';
        var save = 'header div#mainmenu div#menubody div#save';
        var imporT = 'header div#mainmenu div#menubody div#import';
        var exporT = 'header div#mainmenu div#menubody div#export';
        var logout = 'header div#mainmenu div#menubody div#logout';
        var text = 'header div#mainmenu div#menubody a#text';
        if($(body).css('display') == 'none') {  //Wenn Menü nicht angezeigt wird
            $(body).css('display', 'block');   //dann mach es sichtbar
        }

        $(overlay).on('click', function() {
            $(body).css('display', 'none'); //wird das overlay angeklickt soll das Menu wieder verschwinden
        });

        setMenuText('');

        $(document).mousemove(function(event) {  //rotiere Menü mitte immer passend zum mauszeiger
            var x = event.pageX;
            var y = event.pageY;

            var myAngle = diff(x, y) + 90;
            var rotationValue = 'rotate(' + myAngle + 'deg)';
            $(pointer).css({
                '-moz-transform': rotationValue,
                '-webkit-transform': rotationValue,
                '-o-transform': rotationValue,
                '-ms-transform': rotationValue,
                'transform': rotationValue
            });;
        });

        $(neW).mouseover(function() {
            setMenuText('New');
        });
        $(neW).mouseleave(function() {
            setMenuText('');
        });
        $(neW).on('click', function(){
            //TODO ask for save mindmap
            location.reload();
        });

        $(load).mouseover(function() {
            setMenuText('Load');
        });
        $(load).mouseleave(function() {
            setMenuText('');
        });
        $(load).on('click', function(){
            //TODO get saved json stage
            //transform
            //replace actual stage
        });

        $(save).mouseover(function() {
            setMenuText('Save');
        });
        $(save).mouseleave(function() {
            setMenuText('');
        });
        $(save).on('click', function(){
            //TODO get stage
            //stage = document.getElementById('container').get....;
            //jsonStage = stage.toJSON();
            //save json Stage
        });

        $(imporT).mouseover(function() {
            setMenuText('Import');
        });
        $(imporT).mouseleave(function() {
            setMenuText('');
        });
        $(imporT).on('click', function(){
            //TODO handle import
        });

        $(exporT).mouseover(function() {
            setMenuText('Export');
        });
        $(exporT).mouseleave(function() {
            setMenuText('');
        });
        $(exporT).on('click', function(){
            //TODO handle export
        });

        $(logout).mouseover(function() {
            setMenuText('Logout');
        });
        $(logout).mouseleave(function() {
            setMenuText('');
        });
        $(logout).on('click', function(){
            document.getElementById('logoutAction').click();
        });

    });
});