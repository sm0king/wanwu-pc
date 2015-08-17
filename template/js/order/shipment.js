requirejs.config({
    baseUrl: '../js',
    paths: {
      'config':'config'
    }
})
require(['config'], function() {
    require(['jquery','bootstrap','datetimepicker','bootstrapValidator'], function($) {
      $(function(){
          $('#checkAll').change(function(){
              var checked = $(this).prop('checked');
              $('.orderlist input[type=checkbox]').prop('checked', checked);
          });
          $(document.body).delegate('a.removeImg','click', function(e){
              $(e.currentTarget).parent().remove();
          });
          $(document.body).delegate('.doReject', 'click', function(e){
              $.dialog({
                  content: $('#returnofgoodsForm').clone(),
                  title: '拒绝退货',
                  buttons: [
                      {
                          text: '取消',
                          click: function(dialog){ dialog.modal('hide'); }
                      },
                      {
                          text: '确定',
                          style: 'primary',
                          click: function(dialog){
                              //TODO:
                              dialog.modal('hide');
                          }
                      }
                  ]
              });
          });
          $('#orderStart,#orderEnd').datetimepicker({
              format: 'yyyy-mm-dd',
              language: 'zh-CN',
              minView: 2,
              autoclose: true
          });
          $('#myform').bootstrapValidator({
              fields:{
                orderNum: {
                    validators: {
                      stringLength: {
                          max: 30,
                          message: '输入文本不超过30字符'
                      },
                      regexp: {
                          regexp: /^[a-zA-Z0-9_\.]+$/,
                          message: '请输入正确的采购订单号'
                      }
                    }
                },
                receiver:{
                    validators: {
                      stringLength: {
                          max: 30,
                          message: '输入文本不超过30字符'
                        }
                    }
                },
                concat:{
                    validators: {
                      stringLength: {
                          max: 30,
                          message: '输入文本不超过30字符'
                        }
                    }
                }
              }
          });
      });

    });
});
