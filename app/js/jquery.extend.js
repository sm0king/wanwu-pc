(function(){
    $.fn.center = function(){
        var jqDialog = $(this).show(),
            h = jqDialog.height(),
            w = jqDialog.width(),
            body = document.body,
            top = (body.clientHeight - h) /2,
            left = (body.clientWidth - w) / 2 + 140;
        jqDialog.css({
            top: top,
            left: left
        });
        return this;
    }
})(jQuery)