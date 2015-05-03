(function($){
    $.fn.center = function(){
        var jqDialog = this.show(),
            h = jqDialog.height(),
            w = jqDialog.width(),
            top = (document.body.clientHeight - h) / 2
            left = (document.body.clientWidth - w) / 2 + 140;
        jqDialog.css({
            top: top,
            left: left
        });
        return this;
    }
})(jQuery)