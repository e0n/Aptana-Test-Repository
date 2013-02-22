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
            document.menuTextLeft = $(text).offset().left + 240;
        }
        $(text).css('margin-left', document.menuTextLeft - ($(text).width() / 2));
        if(document.menuTextTop == undefined){
            document.menuTextTop = $(text).offset().top + 90;
        }
        $(text).css('margin-top', document.menuTextTop - ($(text).height() / 2) - 130);
    } else {
        $(text).html('');
        $(text).css('margin-left', '960px');
        $(text).css('margin-top', '500px');
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
            $('div#container').css("visibility","hidden");
        }

        $(overlay).on('click', function() {
            $(body).css('display', 'none'); //wird das overlay angeklickt soll das Menu wieder verschwinden
            $('div#container').css("visibility","visible");
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
            });
        });

        $(neW).mouseover(function() {
            setMenuText('New');
        });
        $(neW).mouseleave(function() {
            setMenuText('');
        });
        $(neW).on('click', function(){
            location.reload();
        });

        $(load).mouseover(function() {
            setMenuText('Load');
        });
        $(load).mouseleave(function() {
            setMenuText('');
        });
        var testSavedStage;
        $(load).on('click', function(){
            $('#loadDialog').css("visibility","visible");
            $('#fileTree').fileTree({ root: '',script: baseUrl + '/menu/load' }, function(file) {
                var data = {};//
                data.file = file;

                $.ajax({
                    url: baseUrl + '/menu/load',
                    type: "GET",
                    dataType:'json',
                    data: data
                }).done(function(data){
                        if(typeof data.success != "undefined"){
                            //document.stage.remove();
                            $('div#container > div :last').remove();
                            Kinetic.Node.create(JSON.stringify(data.success), 'container');
                            //document.stage = Kinetic.Node.create(JSON.stringify(data.success), 'container');
                            document.stage.draw();
                        } else {
                            title = 'Error';
                            val.remove();
                            val.append('<p>'+data.error+'</p>');
                        }
                        $( "#loadDialog" ).dialog( "close" );
                        $('#overlay').trigger("click");
                    });
            });
            $('#loadDialog').dialog({
                autoOpen: false,
                modal: true
            });
            $( "#loadDialog" ).dialog( "open" );

            //get saved json stage
            //jsonStage = testSavedStage;
            // create a stage from JSON
            //aNewStage = Kinetic.Node.create(jsonStage, 'container');//or like Kinetic.Node.create(jsonStage);
            //TODO replace actual stage
            //http://www.html5canvastutorials.com/kineticjs/html5-canvas-load-complex-stage-with-kineticjs/
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
            var name = 'input#filename';
            var parent = $(name).parent('fieldset');
            $(parent).css("visibility","visible");

            $( "#saveDialog" ).dialog({
                autoOpen: false,
                modal: true,
                buttons: {
                    Save: function(){
                        var val = $(name).val();
                        if(val.length >= 3 && val.length <= 255){
                            var jsonStage = stage.toJSON();

                            var data = {};//
                            data.save = jsonStage;
                            data.mindmap = val;
                            $.ajax({
                                url: baseUrl + '/menu/save',
                                type: "POST",
                                dataType:'json',
                                data: data
                            }).done(function(data){
                                    var title = '';
                                    var val = $("div#confirmDialog");
                                    val.css("visibility","visible");
                                    if(typeof data.success != "undefined"){
                                        title = 'Erfolgreich';
                                        val.remove();
                                        val.append('<p>'+data.success+'</p>');
                                    } else {
                                        title = 'Error';
                                        val.remove();
                                        val.append('<p>'+data.error+'</p>');
                                    }
                                    $("#confirmDialog").dialog({
                                        autoOpen: false,
                                        modal: true,
                                        title: title,
                                        buttons:{
                                            OK: function(){
                                                $("#confirmDialog").dialog( "close" );
                                            }
                                        }
                                    });
                                    $( "#saveDialog" ).dialog( "close" );
                                    $("#confirmDialog").dialog( "open" );

                                });
                        }
                    },
                    Cancel: function() {
                        $(parent).css("visibility","hidden");
                        $( "#saveDialog" ).dialog( "close" );
                    }
                }
            });
            $( "#saveDialog" ).dialog( "open" );
        });

        $(imporT).mouseover(function() {
            setMenuText('Import');
        });
        $(imporT).mouseleave(function() {
            setMenuText('');
        });
        $(imporT).on('click', function(){
            $('#file').trigger("click");
            mmWrapper.import();
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