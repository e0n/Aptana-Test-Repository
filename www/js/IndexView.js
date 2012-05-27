/**
 * User: pascal
 * Date: 03.05.12
 */
IndexView = {
    loadingView : {
        init : function () {
            $.each($("div#loading div div"), function() {
                this.dots++;
            });
            this.loading();
        },
        dots : 0,

        loading : function () {
            var active = $("div#loading div div.active");
            active.attr('id')
            var id = active.attr('id').split('_')[1];
            active.removeClass(active);
            if(id == this.dots) {
                id = 0;
            }
            $("div#loading div div#loading_" + id).addClass(active);
        }
    }
}
