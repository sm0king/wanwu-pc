requirejs.config({
    baseUrl: '../js',
    paths: {
      'config':'config'
    }
})
require(['config'], function() {
  require(['jquery','bootstrapValidator','bootstrapTable'], function($) {
      $('#distributorList').bootstrapTable({
          url: '../testData2.json'
      });
      function actionFormatter(value, row) {
          var html ='<a class="action" href="#'+row.action.supplierID+'">终止</a><a class="action" href="./detail.html#'+row.action.distributorID+'">查看分销商品</a>';
          <!-- console.log(value); -->
          <!-- console.log() -->
          return html;
      }
      $('#distributorForm').bootstrapValidator({
          fields:{
            exampleInputAmount: {
                validators: {
                  stringLength: {
                      max: 30,
                      message: '输入文本不超过30字符'
                  }
                }
            },
            formDate:{
                validators: {
                    numeric:{
                        message: '请输入数字'
                    }
                }
            },
            toDate:{
                validators: {
                    numeric:{
                        message: '请输入数字'
                    }
                }
            }
          }
      }).on('error.field.bv', function(e, data) {
          data.element
              .data('bv.messages')
              .find('.help-block[data-bv-for="' + data.field + '"]').hide();
          var messages = data.bv.getMessages(data.field);
          for (var i in messages) {
            var l = $('#msgerror').find('li[data-bv-for="' + data.field + '"]');
            if(l.length===0){
              var  li = '<li data-bv-for="' + data.field + '">'+messages[i]+'</li>';
              $('<li/>').attr('data-bv-for', data.field).html(messages[i]).appendTo('#msgerror>ul');
            }
          }
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
