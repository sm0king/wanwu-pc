requirejs.config({
  baseUrl: '../js',
  paths: {
    'config': 'config'
  }
})
require(['config'], function() {
  require(['jquery', 'bootstrap', 'foxUpload'], function($) {
    // 无刷新上传发货信息回调函数
    function CallbackFunction(msg){
        // console.log(msg);
        // msg = JSON.parse(msg);
        if (msg.error != 0) {
          $.alert(msg.error_tip);
          return false;
        } else {
          $('#hidden_import_button').val('');
          $.alertSuccess('导入成功', '成功');
          // location.reload(); // 刷新页面，刷新发货状态
          return true;
        }
    }

    $(function() {

      // 下载订单
      $('#download_button').click(function() {
        window.location.href = "<?php echo $site_url; ?>/order/shipping/download_order";
        return true;
      });

      // 上传发货信息
      $('#upload_button').click(function() {
        $('#hidden_import_button').click();
      });

      $('#hidden_import_button').change(function() {
        var file_name = $('#hidden_import_button').val();
        var suffix = get_suffix(file_name);
        if ((suffix != '.xls') && (suffix != '.xlsx')) {
          $.alert('不允许的文件格式');
          return false;
        }
        $('#hidden_import_area').submit();
        return true;
      });

      // 获取文件后缀名
      function get_suffix(file_name) {
        var result = /\.[^\.]+/.exec(file_name);
        return result;
      }

      // 发货
      $('.doExpress').on('click', function(e) {
        var orderid = $(e.currentTarget).attr('data-orderid-a');
        $.dialog({
          content: $('#expressForm').clone(),
          title: '填写快递信息',
          buttons: [{
            text: '取消',
            click: function(dialog) {
              dialog.modal('hide');
            }
          }, {
            text: '确定',
            style: 'primary',
            click: function(dialog) {
              var inputWaybill = $.trim(dialog.find("#inputWaybill").val())
              var expresscompany = dialog.find("#expressCompany").find("option:selected").text();
              var expressid = dialog.find("#expressCompany").val();
              var errorMsg = [];
              var testStr = /^[0-9a-zA-Z]*$/g;
              if (!testStr.test(inputWaybill)) {
                dialog.find('#inputWaybill').parents('.form-group:first').addClass('has-error');
                errorMsg.push('运单号格式错误');
              } else {
                dialog.find('#inputWaybill').parents('.form-group:first').removeClass('has-error');
              }
              if (!inputWaybill) {
                dialog.find('#inputWaybill').parents('.form-group:first').addClass('has-error');
                errorMsg.push('请输入运单号');
              } else {
                dialog.find('#inputWaybill').parents('.form-group:first').removeClass('has-error');
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
                url: "<?php echo $site_url; ?>/order/shipping/deliver",
                type: "POST",
                data: {
                  orderid: orderid,
                  expressId: expressid,
                  expresscompany: expresscompany,
                  inputWaybill: inputWaybill
                },
                dataType: "json",
                success: function(data) {
                  if (data.error_no == 0) {
                    $.alert("已经发货成功", function() {
                      $("#t" + orderid).hide();
                      $("#c" + orderid).hide();
                    });
                  } else {
                    $.alert("订单发货失败");
                  }

                }
              })
              dialog.modal('hide');
            }
          }]
        });
      });


      // 无货反馈
      $('.doNoStock').on('click', function(e) {
        var imgs = '';
        $(e.currentTarget).parents('tr:first').children('.productImgs').children().each(function(i, e) {
          imgs += '<div data-goodsid="' + $(e).attr('data-goodsid') + '"' +
            ' data-orderid="' + $(e).attr('data-orderid') + '">' +
            '<img src="' + e.src + '" class="noStockProductImg"><div class="ok"></div></div>'
        });
        $('.noStockProducts').empty().append(imgs);
        $.dialog({
          content: $('#noStockForm').clone(),
          title: '无货反馈',
          buttons: [{
            text: '取消',
            click: function(dialog) {
              dialog.modal('hide');
            }
          }, {
            text: '确定',
            style: 'primary',
            click: function(dialog) {

              var errorMsg = [];
              checkedProducts = dialog.find('div.checked');
              if (checkedProducts.length == 0) {
                errorMsg.push('请选择无货商品！');
              }
              var text = $.trim(dialog.find('#input-noStock').val());
              if (!text) {
                dialog.find('#input-noStock').parents('.form-group:first').addClass('has-error');
                errorMsg.push('请输入反馈信息！');
              } else {
                dialog.find('#input-noStock').parents('.form-group:first').removeClass('has-error');
              }
              dialog.find('.noStockProducts').prevAll().remove();
              if (errorMsg.length > 0) {

                var html = '<div class="alert alert-danger" role="alert">',
                  msg = null;
                while (msg = errorMsg.shift()) {
                  html += '<p>' + msg + '</p>';
                }
                html += '</div>';
                dialog.find('.noStockProducts').before(html);
                return;
              }
              var inputnostock = dialog.find("#input-noStock").val();
              var goodsid = checkedProducts.map(function() {
                goodsid = $(this).attr('data-goodsid');
                return goodsid;
              });
              var orderid = checkedProducts.map(function() {
                orderid = $(this).attr('data-orderid');
                return orderid;
              });
              var goodsida = ""; //取产品选取数组，作为反馈传入参数
              for (var i = 0; i < checkedProducts.length; i++) {
                if (i == checkedProducts.length - 1) {
                  goodsida = goodsida + goodsid[i];
                } else {
                  goodsida = goodsida + goodsid[i] + ",";
                }
              }
              orderid = orderid[0];
              $.ajax({
                url: "<?php echo $site_url; ?>/order/shipping/feedback",
                type: "POST",
                data: {
                  orderid: orderid,
                  goodsid: goodsida,
                  inputnostock: inputnostock
                },
                dataType: "json",
                success: function(data) {
                  if (data.error_no == 0) {
                    $.alert("无货反馈提交成功!", function() {
                      $("#t" + orderid).hide();
                      $("#c" + orderid).hide();
                    });
                  } else {
                    $.alert(data.error_desc);
                  }
                }
              });
              dialog.modal('hide');
            }
          }]
        });
      });

      // 没货图片点击事件
      $(document.body).delegate('.noStockProductImg', 'click', function(e) {
        $(e.currentTarget).parent().toggleClass('checked');
      }).delegate('a.removeImg', 'click', function(e) {
        $(e.currentTarget).parent().remove();
      });
      // 取消订单
      $('.doCancelOrder').on('click', function(e) {
        var form = $('#returnofgoodsForm').clone();
        form.find('#uploadQuli').attr('id', 'form').foxupload('/supplier/upload/file.php?action=add');
        $.dialog({
          content: form,
          title: '取消订单',
          buttons: [{
            text: '取消',
            click: function(dialog) {
              dialog.modal('hide');
            }
          }, {
            text: '确定',
            style: 'primary',
            click: function(dialog) {
              var inputcancel = dialog.find("#input-cancel").val();
              var orderid = $(e.currentTarget).attr('cancelorder');
              var uploaddir = $('#myuploadform').find('.uploadquli').find('.imgval').val(); //获取取消订单上传图片

              var errorMsg = [];
              if (!inputcancel) {
                dialog.find('#input-cancel').parents('.form-group:first').addClass('has-error');
                errorMsg.push('请选择取消原因');
              } else {
                dialog.find('#input-cancel').parents('.form-group:first').removeClass('has-error');
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
                url: "<?php echo $site_url; ?>/order/shipping/cancelorder",
                type: "POST",
                data: {
                  orderid: orderid,
                  logoimg: uploaddir,
                  text: inputcancel
                },
                dataType: "json",
                success: function(data) {
                  if (data.error_no == 0) {
                    $.alert("订单取消提交成功!", function() {
                      $("#t" + orderid).hide();
                      $("#c" + orderid).hide();
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

  })
})
