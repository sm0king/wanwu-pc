$(function(){
    var site_url = $('#hidden_site_url').val();
    var goods_detail = $('#hidden_area').val();
    var ue = UE.getEditor('productDetail');
    ue.ready(function(){
      ue.setContent(goods_detail);  
    });

    var model_id_list = '';
    var models = $('.effect');
      
    if (models.length) {
        for (var m = 0; m < models.length; m++) {
            model_id_list += models[m].value + ',';    
        }
    }

    $('#flags').delegate('button','click', function(e){
        $(e.currentTarget).parent().toggleClass('selected');
        // console.log($(this));
        var target_area = $('#target_area');
        var target = $(this)[0].firstChild.textContent; // 选中的标签
        target_area.val(target_area.val() + ' ' + target);
        // $(this).attr("disabled", true);
        return true;
    });
    // 分类联动
    $(document.body).delegate('.my_category','change', function (e){
        var category_id = parseInt($(e.currentTarget).val());
        var now_cat = $(e.currentTarget);
        if (category_id > 0) {
            $.ajax({
                type: "post",
                url: site_url + "/product/add/ajax_get_category_list",
                async: false,
                data: 'category_id=' + category_id + '&m=' + Math.random(),
                success:function (msg) {
                    msg = JSON.parse(msg);
                    if (msg.length) {
                        var msg_length = msg.length;
                        var new_category = '<div class="col-lg-2 col-md-4 category"><select id="product-catalog-2" class="form-control my_category"><option value="">请选择分类</option>';
                    for (var i = 0; i < msg_length; i++) {
                        new_category += '<option value="' + msg[i].catId + '">' + msg[i].catName + '</option>';
                    }
                    new_category += '</select></div>';
                    now_cat.parent().after(new_category);
                    now_cat.parent().next('.category').nextAll('.category').remove();
                    } else {
                        now_cat.parent().nextAll('.category').remove();
                    }    
                }
            });
        }
    });
    
    // 保存商品价格
    $(document.body).delegate('.price','click', function (e){
        var now_price = $(e.currentTarget);
        var goods_number = parseInt(now_price.parent().prev().prev().find('input').val());

        ////判断是否是第一个tr
        if(now_price.parent().prev().prev().find('input').length < 1){
           goods_number = parseInt(now_price.parent().prev().prev().find('.buyNumber').html());
        }

        var goods_price  = parseFloat((now_price.parent().prev().find('input').val()));
        var goods_id = $('#hidden_goods_id').val();
        if ( (!goods_number) || (!goods_price) || (!goods_id) ) {
            return false;
        }
        $.ajax({
            type: "post",
            url: site_url + "/product/edit/add_goods_price_area",
            async: false,
            data: 'goods_id=' + goods_id + '&goods_price=' + goods_price + '&goods_number=' + goods_number,
            success:function (msg) {
                msg = JSON.parse(msg);
                if (msg.error != 0) {
                    $.alert(msg.error_tip);
                    return false;
                } else {
                    now_price.parent().prev().prev().html('<div class="buyNumber"><span>' + goods_number + '</span></div>');
                    now_price.parent().prev().html('<span>' + goods_price + '</span>');
                    now_price.attr("class", "btn-dustbin drop_price");
                    now_price.attr("val", msg.gpId);
                    now_price.parent().parent().attr("class", "old_tr");
                    now_price.next().remove();
                }
            }
        });
        return true;
    });

    // 增加价格区间
    $('#add_price_area').click(function(){
        // var is_add = $('.price_tr').find('input');
        // alert(is_add);
        var html = '<tr class="price_tr"><td><div class="buyNumber"><input type="text" class="form-control goods_number"></div></td><td><input type="text" class="form-control goods_price"></td><td><a href="javascript:;" class="btn-ok save price"></a><a href="javascript:;" class="btn-dustbin drop_price"></a></td></tr>';
        $('.old_tr:last').after(html);
        $('.old_tr').attr("class", "");
        return true;
    });

    // 删除价格区间
    $(document.body).delegate('.drop_price','click', function (e){
        var now = $(e.currentTarget);
        var price_id = now.attr('val');
        // var goods_id = $('#hidden_goods_id');
        if (now.parent().parent().parent().find('tr').length > 1) {
            now.parent().parent().siblings().attr("class", "old_tr");
        } else {
            var html = '<tr class="price_tr"><td><div class="buyNumber">1</div></td><td><input type="text" class="form-control goods_price"></td><td><a href="javascript:;" class="btn-ok save price"></a></td></tr>';
            now.parent().parent().parent().html(html);
            // $('#price_body').find("input.goods_number[type='text']").attr('type','hidden');
            // $('#price_body').find('input.goods_number').val(1);
            // $('#price_body').find('.buyNumber').append('<span>1</span>');
        }
        now.parent().parent().remove();
        $.ajax({
            type: "post",
            url: site_url + "/product/edit/delete_goods_price_area",
            async: false,
            data: 'price_id=' + price_id + '&m=' + Math.random(),
            success:function (msg) {
            }
        });
        return true;
    });


    // // 保存商品规格
    // $(document.body).delegate('.attribute','click', function (e){
    //     var now_attribute = $(e.currentTarget);
    //     var version       = now_attribute.parent().prev().prev().prev().prev().find('input').val();
    //     var stock         = now_attribute.parent().prev().prev().prev().find('input').val();
    //     var weight        = now_attribute.parent().prev().prev().find('input').val();
    //     var merchant_code = now_attribute.parent().prev().find('input').val();
    //     var goods_id      = $('#hidden_goods_id').val();
    //     var goods_price   = $('#productAdvice').val();
    //     if ( (!version) || (!stock) || (!goods_id) ) {
    //         return false;
    //     }
        
    //     $.ajax({
    //         type: "post",
    //         url: site_url + "/product/edit/add_goods_version",
    //         async: false,
    //         data: 'goods_id=' + goods_id + '&goods_price=' + goods_price + '&version=' + version + '&stock=' + stock + '&weight=' + weight + '&merchant_code=' + merchant_code,
    //         success:function (msg) {
    //             msg = JSON.parse(msg);
    //             if (msg.error != 0) {
    //                 $.alert(msg.error_tip);
    //                 return false;
    //             } else {
    //                 now_attribute.parent().prev().prev().prev().prev().html('<span>' + version + '</span>');
    //                 now_attribute.parent().prev().prev().prev().html('<span>' + stock + '</span>');
    //                 now_attribute.parent().prev().prev().html('<span>' + weight + '</span>');
    //                 now_attribute.parent().prev().html('<span>' + merchant_code + '</span>');
    //                 now_attribute.attr("class", "btn-dustbin drop_attribute");
    //                 now_attribute.attr("val", msg.goodsModelId);
    //                 now_attribute.parent().parent().attr("class", "old_attr_tr");
    //                 now_attribute.next().remove();
    //             }
    //         }
    //     });
    //     return true;
    // });

   $('#props_area').on('change','.sellvirtue input',function(e){
          //$(this).parents('.sellvirtue').index('.sellvirtue')
      
       var virLen = $('.sellvirtue').length;
          var virArr =[]
          for(var i = 0; i < virLen;i++){
              var sellDom = $('input:checked',$('.sellvirtue').eq(i));
              var tm = [];
              for(var j = 0; j < sellDom.length; j++){
                  tm.push(sellDom[j].value);
              }
              tm.length && virArr.push(tm);
          }
		  var tdHtml = ''
          if(virArr.length === virLen){
              var ArrValue = doExchange(virArr);
              
              if($.isArray(ArrValue)){
                  for(var n = 0; n < ArrValue.length; n++){
                      var valArr = ArrValue[n].split(';');
                      var newArr =[]
                      for(var m =0; m < valArr.length;m++){
                          var tem = valArr[m];
                          newArr.push($.trim($('.sellvirtue input[value = "'+tem+'"]').parent().text()));
                      }
                      var newStr = newArr.join('--');
                      if($('#version_body_hidden input[value="'+ArrValue[n]+'"]').length > 0){
                          tdHtml += '<tr>' + $('#version_body_hidden input[value="'+ArrValue[n]+'"]').parent().parent().html() +'</tr>';
                      }else{
                          tdHtml += '<tr><td><input type="hidden" value="'+ArrValue[n]+'"> <span>'+newStr+'</span></td><td><input type="text" class="form-control"></td><td><input type="text" class="form-control"></td><td><input type="text" class="form-control"></td><td style="display:none"><input type="hidden" class="form-control"></td></tr>';

                      }
                  }
              }
              
             $('#handdle').remove();
             
          }
		  $('#version_body').html(tdHtml);
            
      })
    function doExchange(x){
        var h = x.length;
        var w = x[0].length;
        var i, j;
        var m = [], n;
        m[i = h] = 1;
        while (i--)
                m[i] = m[i + 1] * x[i].length;
        n = m[0];
        var newArray =[];
        for (i = 0; i < n; i++) {
            var tem = [];
            for (j = 0; j < h; j++){
                tem.push(x[j][~~(i % m[j] / m[j + 1])]);
            }
            newArray.push(tem.join(';'));
        }
        return newArray;
    }

    // 增加商品规格
    $('#add_attribute_area').click(function(){
        // var is_add = $('.price_tr').find('input');
        // alert(is_add);
        var html = '<tr class="attribute_tr"><td><input type="text" class="form-control goods_version"></td><td><input type="text" class="form-control goods_stock"></td><td><input type="text" class="form-control goods_stock"></td><td><input type="text" class="form-control merchant_code"></td><td><a href="javascript:;" class="btn-ok save attribute"></a><a href="javascript:;" class="btn-dustbin drop_attribute"></a></td></tr>';
        $('.old_attr_tr:last').after(html);
        $('.old_attr_tr').attr("class", "");
        return true;
    });

    // 删除商品规格
    $(document.body).delegate('.drop_attribute','click', function (e){
        var now = $(e.currentTarget);
        var version_id = now.attr('val');
        if (now.parent().parent().parent().find('tr').length > 1) {
            now.parent().parent().siblings().attr("class", "old_attr_tr");
        } else {
            var html = '<tr class="attribute_tr"><td><input type="text" class="form-control goods_version"></td><td><input type="text" class="form-control goods_stock"></td><td><input type="text" class="form-control goods_stock"></td><td><input type="text" class="form-control merchant_code"></td></tr>';
            now.parent().parent().parent().html(html);
        }
        now.parent().parent().remove();
        $.ajax({
            type: "post",
            url: site_url + "/product/edit/delete_goods_version",
            async: false,
            data: 'version_id=' + version_id + '&m=' + Math.random(),
            success:function (msg) {
            }
        });

        return true;
    });

    // 搜索分类
    $('#search_button').click(function(){
        var search_words = $('#search_words').val();
        if (!search_words) {
            $.alert('请输入要搜索的分类名称');
            return false;
        }
        $.ajax({
            type: "post",
            url: site_url + "/product/add/search_category_by_name",
            async: false,
            data: 'cat_name=' + search_words + '&m=' + Math.random(),
            success:function (msg) {
                msg = JSON.parse(msg);
                if (msg.length == 0) {
                    $('#search_result_area').html();
                    $.alert('未找到相关类');
                    return false;
                } else {
                    $('#search_result_area').show();
                    var html = '<div class="col-lg-12"><div class="panel panel-default"><div class="panel-body" id="search_result_area">';
                    for (var i = 0; i < msg.length; i++) {
                        html += '<div><a class="category_a" href="javascript:;">';
                        if (msg[i].level == 6) { // 六级分类(设置为最多六级分类)
                            html += "<span parent='" + msg[i].parentCat.parentCat.parentCat.parentCat.parentCat.parentId + "' self='" + msg[i].parentCat.parentCat.parentCat.parentCat.parentCat.catId + "'>" + msg[i].parentCat.parentCat.parentCat.parentCat.parentCat.catName + '</span>>' + "<span parent='" + msg[i].parentCat.parentCat.parentCat.parentCat.parentId + "' self='" + msg[i].parentCat.parentCat.parentCat.parentCat.catId + "'>" + msg[i].parentCat.parentCat.parentCat.parentCat.catName + '</span>>' + "<span parent='" + msg[i].parentCat.parentCat.parentCat.parentId + "' self='" + msg[i].parentCat.parentCat.parentCat.catId + "'>" + msg[i].parentCat.parentCat.parentCat.catName + '</span>>' + "<span parent='" + msg[i].parentCat.parentCat.parentId + "' self='" + msg[i].parentCat.parentCat.catId + "'>" + msg[i].parentCat.parentCat.catName + '</span>>' + "<span parent='" + msg[i].parentCat.parentId + "' self='" + msg[i].parentCat.catId + "'>" + msg[i].parentCat.catName + '</span>>' + "<span parent='" + msg[i].parentId + "' self='" + msg[i].catId + "'>" + msg[i].catName + '</span>';
                        } else if (msg[i].level == 5) {
                            html += "<span parent='" + msg[i].parentCat.parentCat.parentCat.parentCat.parentId + "' self='" + msg[i].parentCat.parentCat.parentCat.parentCat.catId + "'>" + msg[i].parentCat.parentCat.parentCat.parentCat.catName + '</span>>' + "<span parent='" + msg[i].parentCat.parentCat.parentCat.parentId + "' self='" + msg[i].parentCat.parentCat.parentCat.catId + "'>" + msg[i].parentCat.parentCat.parentCat.catName + '</span>>' + "<span parent='" + msg[i].parentCat.parentCat.parentId + "' self='" + msg[i].parentCat.parentCat.catId + "'>" + msg[i].parentCat.parentCat.catName + '</span>>' + "<span parent='" + msg[i].parentCat.parentId + "' self='" + msg[i].parentCat.catId + "'>" + msg[i].parentCat.catName + '</span>>' + "<span parent='" + msg[i].parentId + "' self='" + msg[i].catId + "'>" + msg[i].catName + '</span>';
                        } else if (msg[i].level == 4) {
                            html += "<span parent='" + msg[i].parentCat.parentCat.parentCat.parentId + "' self='" + msg[i].parentCat.parentCat.parentCat.catId + "'>" + msg[i].parentCat.parentCat.parentCat.catName + '</span>>' + "<span parent='" + msg[i].parentCat.parentCat.parentId + "' self='" + msg[i].parentCat.parentCat.catId + "'>" + msg[i].parentCat.parentCat.catName + '</span>>' + "<span parent='" + msg[i].parentCat.parentId + "' self='" + msg[i].parentCat.catId + "'>" + msg[i].parentCat.catName + '</span>>' + "<span parent='" + msg[i].parentId + "' self='" + msg[i].catId + "'>" + msg[i].catName + '</span>';
                        } else if (msg[i].level == 3) {
                            html += "<span parent='" + msg[i].parentCat.parentCat.parentId  + "' self='" + msg[i].parentCat.parentCat.catId + "'>" + msg[i].parentCat.parentCat.catName + '</span>>' + "<span parent='" + msg[i].parentCat.parentId + "' self='" + msg[i].parentCat.catId + "'>" + msg[i].parentCat.catName + '</span>>' + "<span parent='" + msg[i].parentId + "' self='" + msg[i].catId + "'>" + msg[i].catName + '</span>';
                        } else if (msg[i].level == 2) {
                            html += "<span parent='" + msg[i].parentCat.parentId  + "' self='" + msg[i].parentCat.catId + "'>" + msg[i].parentCat.catName + '</span>>' + "<span parent='" + msg[i].parentId  + "' self='" + msg[i].catId + "'>" + msg[i].catName + '</span>';
                        } else if (msg[i].level == 1) {
                            html += "<span parent='" + msg[i].parentId + "' self='" + msg[i].catId + "'>" + msg[i].catName + '</span>';
                        }
                        html += '</a></div>';
                    }
                    html     += '</div></div></div>';

                    $('#search_result_area').html(html);
                    return true;
                }
                
            }
        });
    });

    // 点击切换商品分类
    $(document.body).delegate('.category_a','click', function (e){
        var checked_a = $(e.currentTarget);
        var category_list = checked_a.find('span');
        $('.category:first').nextAll('.category').remove();
        if (category_list.length > 0) {
            for (var i = 0; i < category_list.length; i++) {
                var parent_id = category_list[i].getAttribute('parent');
                var cat_id    = category_list[i].getAttribute('self');
                if (i == 0) { // 第一级分类，不用发送ajax请求
                    $('#search_result_area').attr("style","display:none");
                    $('.my_category:first').val(cat_id);
                } else {
                    $('#search_result_area').attr("style","display:none");
                    $.ajax({
                        type: "post",
                        url: site_url + "/product/add/ajax_get_category_list",
                        async: false,
                        data: 'category_id=' + parent_id + '&m=' + Math.random(),
                        success:function (msg) {
                            msg = JSON.parse(msg);
                            if (msg.length) {
                                var msg_length = msg.length;
                                var new_category = '<div class="col-lg-2 col-md-4 category"><select id="product-catalog-2" class="form-control my_category"><option value="">请选择分类</option>';
                                for (var i = 0; i < msg_length; i++) {
                                    new_category += '<option value="' + msg[i].catId + '">' + msg[i].catName + '</option>';
                                }
                                new_category += '</select></div>';
                                $('.category:last').after(new_category);
                                // $('.category:last').nextAll('.category').remove();
                                // console.log($('.my_category:last').find("option[value=" + cat_id + "]"));
                                $('.my_category:last').find("option[value=" + cat_id + "]").attr('selected', true);
                            } else {
                                $('.category:last').nextAll('.category').remove();
                            }
                        }
                    });
                }
            };
        }
    });

    function delHtmlTag(str){
      return str.replace(/<[^>|^img]+>/g,"");//去掉所有的html标记
     }
    // 保存商品
    var submit_flag = true; // 防止重复提交
    $('.save_button').click(function(){
        if (submit_flag) {
            // submit_flag = false;
            var is_draft = parseInt($(this).attr('draft')); // 草稿状态
            var goods_id     = $('#hidden_goods_id').val(); // 商品名称
            var goodsname    = $('#productName').val(); // 商品名称
            var productScore    = $('#productScore').val();
            var cat_id       = $('#hidden_cat_id').val(); // 商品分类
            var goods_desc   = $('#productDescription').val(); // 商品描述
            var goods_detail = ue.getContent(); // 商品详情
            var goods_detail_length = delHtmlTag(goods_detail).length; // 商品详情长度
            var keywords     = $('#tagsinput').val();        // 标签
            var su_price        = $('#productAdvice').val();      // 参考零售价
            var minSuggestionPrice = $('#minSuggestionPrice').val();//分销商限价
            var shopPrice     = $('#shopPrice').val();  // 参考分销价
            var productLocation = $('#productLocation').val(); // 商品所在地（对应商品说明）
            var goods_img = $("#uploadGoodsImg").find(".imgval").val(); // 商品图片
            var province_id = $('#province').val();
            var province_name = $("#province").find("option:selected").text();
            var city_id = $('#city').val();
            var city_name = $("#city").find("option:selected").text();
            var provider_id = $("#providerId").val();

            var props = '';
            var input_pids = '';
            var input_str  = '';
            var brand_id = 0;
            var select = $('#props_area').find('select').selected();
            for (var i = 0; i < select.length; i++) {
                if ( $('#props_area').find('select').selected()[i].attributes['isBrand'] && $('#props_area').find('select').selected()[i].attributes['isBrand'].nodeValue == 1 ) {
                    // alert($('#props_area').find('select').selected()[i].attributes['val'].nodeValue);
                    if (select[i].value) {
                        input_pids += select[i].name.substr(4) + ',';
                        input_str += $('#props_area').find('select').selected()[i].value + ',';
                        brand_id = $($('#props_area').find('select').selected()[i]).find('option:selected').attr('bid');
                    }
                } else {
                    if (select[i].value) {
                        props += select[i].value + ';';
                    }
                }
            }
            var checkbox = $('#props_area').find(':checkbox');
            for (var a = 0; a < checkbox.length; a++) {
                if (checkbox[a].checked) {
                    props += checkbox[a].value + ';';
                }
            }
            var text = $('#props_area').find(':text');
            for (var b = 0; b < text.length; b++) {
                if (text[b].value) {
                    input_pids += text[b].name.substr(4) + ',';
                    input_str  += text[b].value + ',';
                }
            }
            var radio = $('#props_area').find(':radio');
            for (var c = 0; c < radio.length; c++) {
                if (radio[c].checked) {
                    props += radio[c].value + ';';
                }
            }


            if (!goodsname) {
                $.alert('请填写商品名称！');
                return false;
            }

            var model_id_list = [];
            var model_ids = $('.effect');
            for (var d = 0; d < model_ids.length; d++) {
                model_id_list.push(model_ids[d].value);
            }

            var version_list = []; // 商品规格列表
            var version_tr      = $('#version_body').find('tr');
            for (var a = 0; a < version_tr.length; a++) { // 获取商品规格
                var version_name = $(version_tr[a]).find('span')[0] ? $(version_tr[a]).find('span')[0].innerHTML : '';
                var sku_props = $(version_tr[a]).find('input')[0] ? $(version_tr[a]).find('input')[0].value : '';
                var stock = $(version_tr[a]).find('input')[1] ? $(version_tr[a]).find('input')[1].value : 0;
                var weight = $(version_tr[a]).find('input')[2] ? $(version_tr[a]).find('input')[2].value : 0;
                var merchant_code = $(version_tr[a]).find('input')[3] ? $(version_tr[a]).find('input')[3].value : 0;
                var modelId = $(version_tr[a]).find('input')[4] ? $(version_tr[a]).find('input')[4].value : 0;
                if (is_draft==0 && !stock) {
                    $.alert(version_name + '库存未填写');
                    return false;
                }
                version_list.push({'version_name':version_name, 'sku_props':sku_props, 'stock':stock, 'weight':weight, 'merchant_code':merchant_code, 'modelId':modelId});
            }
            console.log(version_list);
            if (is_draft == 0) { // 提交产品时，要验证必填项是否都已经填写
                var error_tip = [];
                if (!goodsname) {
                    error_tip.push('商品名不能为空！<br />');
                }
                if (version_list.length < 1) {
                    error_tip.push('至少要有一个商品规格！<br />');
                }
                if (!cat_id) {
                    error_tip.push('必须要选择一个分类！<br />');
                }
                if (goods_detail_length < 5) {
                    error_tip.push('商品详情不少于五个字符！<br />');
                }
                if (!$('.img-responsive').length) {
                    error_tip.push('请上传商品图片！<br />');
                }
                if (error_tip.length) {
                    var error_tip_str = '';
                    for (var i = 0; i < error_tip.length; i++) {
                        error_tip_str += (i+1) + '、' + error_tip[i];
                    }
                    $.alert(error_tip_str);
                    return false;
                }
            }

            $.ajax({
                type: "post",
                url: site_url + "/product/edit/do_edit_goods",
                async: false,
                data:{
                    "goods_id" : goods_id,
                    "goodsname": goodsname,
                    "score":productScore,
                    "cat_id"   : cat_id,
                    "brand_id" : brand_id,
                    "goods_desc":goods_desc,
                    "goods_detail":goods_detail,
                    "keywords": keywords,
                    "price"   : su_price,
                    "minSuggestionPrice"          :minSuggestionPrice,
                    "shopPrice":shopPrice,
                    "productLocation": productLocation,
                    "goods_img":goods_img,
                    "province_id":province_id,
                    "province_name":province_name,
                    "city_id":city_id,
                    "city_name":city_name,
                    "is_draft":is_draft,
                    "version_list": version_list,
                    "props":props,
                    "input_pids":input_pids,
                    "input_str":input_str,
                    "model_id_list":model_id_list
                    },
                success:function (msg) {
                    msg = JSON.parse(msg);
                    if (msg.error != 0) {
                        submit_flag = true;
                        $.alert(msg.error_tip);
                        return false;
                    } else {
                        $.alertSuccess('提交成功','成功',site_url + "/product/plist/index?cache=false");
                        // window.location.href = site_url + "/product/plist/index?cache=false";
                        return true;
                    }
                }
            });
        } else {
            $.alert('请不要重复提交');
            return false;
        }
    });
    
    // 添加图片出发操作
    $("#uploadGoodsImg").foxupload('/supplier/upload/file.php?action=add').bind('fileuploaded',function(msg, data){
       // console.log(data);
        var goods_id = $('#hidden_goods_id').val();
        var imgName  = data.fileName;
        // alert(imgName);
        if ( (!goods_id) || (!imgName) ) {
            return false;
        }


    }).bind('fileremoved',function(msg, data){
        if (!data.id) {
            return false;
        }
        var imgId = data.id;
        $.ajax({
            type: "post",
            url: site_url + "/product/edit/delete_goods_gallery",
            async: false,
            data: 'imgId=' + imgId,
            success:function (msg) {
            }
        });
    });

    // 省市联动
    $('#province').change(function(){
        var region_id = $('#province').val();
        if(!region_id){
            $('#city_area').hide();
            $('#city').empty();
            return false;
        } else {
            $('#city_area').show();
        }
        if ( (region_id == 110000) || (region_id == 120000) || (region_id == 500000) || (region_id == 310000) || (region_id == 710000) || (region_id == 810000) || (region_id == 820000) ) {
            $('#city_area').hide();
            $('#city').empty();
            return false;
        } else {
            $('#city_area').show();
            $('#city').empty();
        }
        $.ajax({
            type: "post",
            url: site_url + '/product/add/ajax_getexpress',
            async: false,
            data: 'regionId=' + region_id,
            success:function (msg) {
                msg = JSON.parse(msg);
                $('#city').empty();
                $(msg.regions).each(function(){
                    $('#city').append("<option value='"+this.regionId+"'>"+this.regionName+"</option>");
                });
            }
        });
    });

    // 验证
    $('#productForm').bootstrapValidator({
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            productName:{
                validators:{
                    notEmpty: {
                        message: '商品名不能为空'
                    }
                }
            },
            shopPrice:{
                validators:{
                    notEmpty: {
                        message: '基础分销价不能为空'
                    },
                    numeric:{
                        message: '价格只能为数字'
                    }
                }
            },
            productAdvice:{
                validators:{
                    numeric:{
                        message: '价格只能为数字'
                    }
                }
            },
            purchprice:{
                validators:{
                    numeric:{
                        message: '价格只能为数字'
                    }
                }
            }
        }
    });
});
