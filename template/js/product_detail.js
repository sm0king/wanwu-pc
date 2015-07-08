$(function(){
    var ue = UE.getEditor('productDetail');
    $('#tagsinput').tagsInput();
    $('#flags').delegate('button','click', function(e){
        //获取tags内容
        var val = $(this).text();
        //检查该tags是否存在
        if ($('#tagsinput').tagExist(val)) {
            //.1 存在 删除，删除css
            $('#tagsinput').removeTag(val);
            $(e.currentTarget).parent().removeClass('selected');
            // debugger;
        }else{
            //.2 不存在，添加，增加css
            $('#tagsinput').addTag(val);
            $(e.currentTarget).parent().addClass('selected');
            // debugger;
        }
        //debugger;
        //$(e.currentTarget).parent().toggleClass('selected');
    });

    $('.save-draft').on('click',function(){
        verify.productName();
    });

    // 表单验证
    var verify = {
      productName : function(){
        var item = $('#productName');
        if (!item.val()) {
          item.siblings('div.alert').removeClass('hide');
          var h = item.offset().top-5;
          $("html,body").animate({scrollTop: h}, 500);
        }
      },
      productImg : function(){
        
      }
    };
});
