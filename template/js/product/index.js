requirejs.config({
    baseUrl: '../js',
    paths: {
      'config':'config'
    }
})
require(['config'], function() {
  require(['jquery','dropkick'], function($) {
      $('select').dropkick();

      $('#formDate,#toDate').datetimepicker({
          format: 'yyyy-mm-dd',
          language: 'zh-CN',
          minView: 2,
          autoclose: true
      });
      $(document.body).delegate('.upAction','click',function(e){
          $.dialog({
              content:'商品状态 <label class="radio-inline"><input type="radio">上架</label><label class="radio-inline"><input type="radio">下架</label>',
              title:"修改商品状态",
              buttons:[{
                      text:'保存',
                      style:'blue',
                      click:function(dialog){
                          dialog.modal('hide');
                      }
              }]
          })
      });
      $('.product-desc').hover(
        function(){
            if($(this).has('.eidt-btn').length===0){
              var link = '<a class="edit-quick" href="javascript:;">【快速编辑】</a>';
              $(this).find('.edit-desc').html(link);
            }
        },
        function(){
            $(this).find('.edit-quick').remove();
        }
      );
      $('.edit-desc').on('click','.edit-quick',function(){
          var title = $(this).parent().siblings('p').html();
          var goodid = $(this).parents('tr').data('id');
          $(this).parent().siblings('.product-title').html('<input type="text" value="'+title+'" class="form-control input-title" data-back="'+title+'" data-id="'+goodid+'"/>');
          $('.product-title').find('.input-title').focus();
          var save = '<div class="eidt-btn"><a class="edit-save" href="javascript:;">【保存】</a><a class="edit-cancel" href="javascript:;">【取消】</a></div>';
          $(this).parent().html(save);
      })
        .on('click','.edit-cancel',function(){
            var product = $(this).parents('.edit-desc').siblings('.product-title');
            product.html(product.children('input').data('back'));
            $(this).parents('.edit-desc').html('');
        })
        .on('click','.edit-save',function(){
            var $item =  $(this).parents('.product-desc');
            var goodsId = $(this).parents('tr').data('id');
            var goodsName = $item.find('input').val();
            $.post("http://123.59.58.104/supplier/product/edit/quick_edit",{goods_id:goodsId,goods_name:goodsName},
              function(result){
                if(result.error == 0){
                    $item.find('.product-title').html(goodsName);
                    $item.find('.edit-desc').html('');
                }else{
                    alert(result.error_tip);
                }
            },'json');
        });
      $('.mprice').dblclick(function(){
          $(this).html('<input type="text" value="'+$(this).text().trim()+'" data-back="'+$(this).text().trim()+'" class="form-control input-price">');
          $(this).find('.input-price').focus();
      });
      $('.mprice').on('blur','.input-price',function(){
          var _this = $(this);
          var goodsId = _this.parents('tr').data('id');
          var price = parseFloat($(this).val()).toFixed(2);
          $.post("http://123.59.58.104/supplier/product/edit/quick_edit",{goods_id:goodsId,goods_price:price},
            function(result){
              if(result.error == 0){
                  _this.parent().html(price);
              }else{
                  _this.parent().html(_this.data('back'));
                  alert(result.error_tip);
              }
          },'json');
      });
  });
});
