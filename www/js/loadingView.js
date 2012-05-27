/**
 * User: pascal
 * Date: 03.05.12
 */
loadingView = {
    init : function () {
        this.interval = window.setInterval("loadingView.loading()", 500);
    },
    dots : 3,
    interval: null,

    loading : function () {
    var active = $("div#loading div div.active");
    var id = parseInt(active.attr('id').split('_')[1]);
    active.removeClass('active');
    if(id != this.dots) {
        id++;
    } else {
        id = 0;
    }
    $("div#loading div div#loading_" + id).addClass('active');
    }
}
