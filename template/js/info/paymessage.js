requirejs.config({
    baseUrl: '../js',
    paths: {
        'config': 'config',
    }
})
require(['config'], function() {
    require(['jquery','bootstrapValidator','bootstrap'], function($,addr) {
      $('#payForm').bootstrapValidator({
          fields:{
            bankName:{
                validators: {
                    notEmpty: {
                        message: '请输入银行名称'
                    }
                }
            },
            bankCard:{
                validators: {
                    notEmpty: {
                        message: '请输入卡号'
                    },
                    integer:{
                        message: '请输入数字'
                    }
                }
            },
            getMoney:{
                validators: {
                    notEmpty: {
                        message: '请输入收款人/收款公司'
                    }
                }
            },
          }
      });
    })
})
