(function($){
    var jqModal = null;

    function getContainer(){
        if (!jqModal) {
            jqModal = $(
                '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">'+
                    '<div class="modal-dialog">'+
                        '<div class="modal-content">'+
                            '<div class="modal-header">' +
                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                                '<h4 class="modal-title" id="myModalLabel"></h4>'+
                            '</div>'+
                            '<div class="modal-body">'+
                            '</div>' +
                            '<div class="modal-footer">'+
                                '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
            ).appendTo(document.body);
            jqModal.on('hidden.bs.modal', onDialogHidden)
        }
        return jqModal;
    };

    function showDialog(options){
        var jqModal = getContainer();
        jqModal.data('options', options);
        if (options.content) {
            jqModal.find('.modal-body').append(options.content);
        }
        if (options.title) {
            jqModal.find('#myModalLabel').append(options.title);
        }
        if (options.size) {
            jqModal.children('.modal-dialog').addClass('modal-' + options.size)
        }

        jqModal.modal(options);
    }

    function onDialogHidden(e){
        jqModal
        .children('.modal-dialog').removeClass('modal-sm modal-lg')
        .find('#myModalLabel,.modal-body').empty();
        var data = jqModal.data('options');
        if (data && $.isFunction(data.callback)) {
            data.callback();
        }
    }

    $.alert = function(text, callback){
        showDialog({ title: '警告', content: text ,callback: callback, size: 'sm'  });
    }
})(jQuery);