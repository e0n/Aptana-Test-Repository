/**
 * User: pascal
 * Date: 08.05.12
 */

menuView = {
    toggled : undefined,
    index : function () {
        $.each($('div#Menu div'), function(index, value){
            var id = value.id;
            $(value).on("click", function(){
                if(typeof menuView.toggled == 'undefined'){
                    $('div#Menu ul#'+id).toggle("fast", function(){
                        menuView.toggled = id;
                    });
                } else {
                    $('div#Menu ul#'+id).toggle(true);
                    $('div#Menu ul#'+menuView.toggled).toggle("fast", function(){
                        menuView.toggled = id;
                    });
                }
            });
        });
    }
}
