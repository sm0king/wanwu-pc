requirejs.config({
    baseUrl: '../js',
    paths: {
      'config':'config'
    }
})
require(['config'], function() {
    require(['jquery','bootstrap','bootstrapValidator'], function($) {
      $(function(){
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
                waybill:{
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
                },
              }
          });
        });
    });
});
