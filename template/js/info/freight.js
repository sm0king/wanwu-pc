requirejs.config({
    baseUrl: '../js',
    paths: {
        'config': 'config',
    }
})
require(['config'], function() {
    require(['jquery','bootstrapValidator','bootstrap'], function($,addr) {
        $('#freightForm').bootstrapValidator({
            fields:{
              firstWeight: {
                  validators: {
                      notEmpty: {
                          message: '请输入首量'
                      },
                      numeric:{
                          message: '请输入数字'
                      }
                  }
              },
              firstWeightPrice:{
                  validators: {
                      notEmpty: {
                          message: '请输入首量金额'
                      },
                      numeric:{
                          message: '请输入数字'
                      }
                  }
              },
              afterWeight:{
                  validators: {
                      notEmpty: {
                          message: '请输入续重'
                      },
                      numeric:{
                          message: '请输入数字'
                      }
                  }
              },
              afterWeightPrice:{
                  validators: {
                      notEmpty: {
                          message: '请输入续重金额'
                      },
                      numeric:{
                          message: '请输入数字'
                      }
                  }
              },
            }
        }).on('error.field.bv', function(e, data) {
            data.element
                .data('bv.messages')
                .find('.help-block[data-bv-for="' + data.field + '"]').hide();
            var messages = data.bv.getMessages(data.field);
            for (var i in messages) {
              var item = $('#msgerror').find('li[data-bv-for="' + data.field + '"]');
              if(item.length===0){
                var  li = '<li data-bv-for="' + data.field + '">'+messages[i]+'</li>';
                $('<li/>').attr('data-bv-for', data.field).html(messages[i]).appendTo('#msgerror>ul');
              }
            }
            item.html(messages);
            $('#msgerror').removeClass('hide');
        })
        .on('success.field.bv', function(e, data) {
            $('#msgerror').find('li[data-bv-for="' + data.field + '"]').remove();
        })
        .on('success.form.bv', function(e) {
            $('#msgerror').addClass('hide');
        });
    })
})
