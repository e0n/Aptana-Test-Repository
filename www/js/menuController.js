/**
 * User: pascal
 * Date: 08.05.12
 */

menuController = {
    index: function(){
        menuView.index();
    },

    preferencesAction: function(){
        $.ajax({
            url: "http://localhost/teamp/Public/menu/preferences",
            type: "GET",
            data: {"ff": "asd"},
            success:function(data){
                console.log(data);
            }
        });
    }
}
