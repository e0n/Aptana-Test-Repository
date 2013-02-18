/**
 * User: pascal
 * Date: 08.05.12
 */

menuController = {
    index: function(){
        menuView.index();
    },

    preferencesAction: function(){
        var data = {};//
        data.push({"id":deineJsonobjekt});
        $.ajax({
            url: "<?php echo $this->baseUrl('mindmap/save'); ?>",
            type: "POST",
            dataType:'json',
            data: data,
            success:function(data){
                console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown){

            }
        });
    }
}
