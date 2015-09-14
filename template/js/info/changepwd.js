requirejs.config({
    baseUrl: '../js',
    paths: {
        'config': 'config',
    }
})
require(['config'], function() {
    require(['jquery','bootstrapValidator','bootstrap'], function($,addr) {
      $('#pwdForm').bootstrapValidator({
          fields:{
            oldPwd:{
                validators: {
                    notEmpty: {
                        message: '请输入原密码'
                    }
                }
            },
            newPwd:{
                validators: {
                    notEmpty: {
                        message: '请输入新密码'
                    }
                }
            },
            comparePwd:{
                validators: {
                    notEmpty: {
                        message: '请再次输入新密码'
                    },
                    identical:{
                      field: 'newPwd',
                      message: '两次输入密码不一致'
                    }
                }
            },
          }
      });
    })
})
