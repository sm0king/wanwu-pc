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
        if (options.buttons) {
            var foot = jqModal.find('.modal-footer').empty();
            for(var i = 0;i < options.buttons.length;i++){
                var button = options.buttons[ i ],
                    btn = $('<button class="btn btn-' + (button.style ? button.style : 'default') + '">' + button.text + '</button>').click(
                        (function(option){
                            return function(){
                                $.isFunction(option.click) && option.click($(this).parents('.modal:first'));
                            };
                        })(button)
                    );
                foot.append(btn);
            }
        }
        jqModal.modal(options);
    }

    function onDialogHidden(e){        
        var data = jqModal.data('options');
        if (data && $.isFunction(data.callback)) {
            data.callback(!!data.result);
        }
        jqModal
        .children('.modal-dialog').removeClass('modal-sm modal-lg')
        .find('#myModalLabel,.modal-body').empty();
    }

    $.alert = function(text, callback){
        showDialog({ 
            title: '警告', 
            content: text ,
            callback: callback, 
            size: 'sm',
            buttons: [
                {
                    text: '确定',
                    click: function(jqModal){
                        jqModal.modal('hide');
                    }
                }

            ] 
        });
    }

    $.confirm = function(text, callback){
        showDialog({ 
            title: '警告', 
            content: text, 
            callback: callback, 
            size: 'sm',
            buttons: [
                {
                    text: '关闭',
                    click: function(jqModal){
                        jqModal.modal('hide');
                    }
                },
                {
                    text: '确定',
                    style: 'primary',
                    click: function(jqModal){
                        jqModal.data('options').result = true;
                        jqModal.modal('hide');
                    }
                }

            ]
        })
    }

    $.dialog = showDialog;
})(jQuery);