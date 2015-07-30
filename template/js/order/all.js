requirejs.config({
    baseUrl: '../js',
    paths: {
      'config':'config'
    }
})
require(['config'], function() {
    require(['jquery','bootstrap','datetimepicker','bootstrapValidator'], function($) {
      $(function(){
          $('#timeBegin,#timeEnd').datetimepicker({
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
