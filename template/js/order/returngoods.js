requirejs.config({
  baseUrl: '../js',
  paths: {
    'config': 'config'
  }
})
require(['config'], function() {
  require(['jquery', 'bootstrap', 'bootstrapValidator','foxUpload','jqueryForm','datetimepicker'], function($) {
    $(function() {
      // 表单验证
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

      $(document.body).delegate('a.removeImg', 'click', function(e) {
        $(e.currentTarget).parent().remove();
      });

      $('.doReturn').on('click', function(e) {
        $.confirm('确认退货？', function(result) {
          if (result) {
            var orderid = $(e.currentTarget).attr('data-orderid');
            var goodsid = $(e.currentTarget).attr('data-goodsid');
            $.ajax({
              url: site + "/order/returnorder/doreturn",
              type: "POST",
              data: {
                orderid: orderid,
                goodsid: goodsid
              },
              dataType: "json",
              success: function(data) {
                if (data.error_no == 0) {
                  $.alertSuccess('退货操作成功', '成功', "", function(e) {
                    window.location.href = "";
                  });
                } else {
                  $.alert(data.error_desc);
                }
              }
            })
          }
        })
      });

      $('.doReject').on('click', function(e) {
        var form = $('#refusefgoodsForm').clone();
        form.find('#uploadQuJj').attr('id', 'form').foxupload('/supplier/upload/file.php?action=add'); //克隆后，绑定获取图片参数到dialog
        $.dialog({
          content: form,
          title: '拒绝退货',
          buttons: [{
            text: '取消',
            click: function(dialog) {
              dialog.modal('hide');
            }
          }, {
            text: '确定',
            style: 'primary',
            click: function(dialog) {
              var inputreturn = dialog.find("#input-return").val();
              var orderid = $(e.currentTarget).attr('rejectorder');
              var goodsid = $(e.currentTarget).attr('rejectgoods');
              var uploaddir = $('#myuploadform').find('.imgval').val();
              var errorMsg = [];
              if (!inputreturn) {
                dialog.find('#input-return').parents('.form-group:first').addClass('has-error');
                errorMsg.push('请选择拒绝退货原因');
              } else {
                dialog.find('#input-return').parents('.form-group:first').removeClass('has-error');
              }
              dialog.find('.form-group:first').prevAll().remove();
              if (errorMsg.length > 0) {
                var html = '<div class="alert alert-danger" role="alert">',
                  msg = null;
                while (msg = errorMsg.shift()) {
                  html += '<p>' + msg + '</p>';
                }
                html += '</div>';
                dialog.find('.form-group:first').before(html);
                return;
              }

              $.ajax({
                url: site + "/order/returnorder/refreturn",
                type: "POST",
                data: {
                  orderid: orderid,
                  goodsid: goodsid,
                  inputreturn: inputreturn,
                  logoimg: uploaddir
                },
                dataType: "json",
                success: function(data) {
                  if (data.error_no == 0) {
                    $.alertSuccess('操作成功', '成功', "", function(e) {
                      window.location.href = "";
                    });
                  } else {
                    $.alert(data.error_desc);
                  }
                }
              })
              dialog.modal('hide');
            }
          }]
        });
      });

    });
  });
});
