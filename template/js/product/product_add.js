$(function(){
    var site_url = $('#hidden_site_url').val();
    var ue = UE.getEditor('productDetail');
    var wanwu_props_select = '';
    var cat_id = $('#hidden_cat_id').val();
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
                        $('#loading_img').show();
                        $.ajax({
                            type: "post",
                            url:site_url + "/product/add/ajax_get_props",
                            async:false,
                            data:'cat_id=' + category_id,
                            success:function(res){
                                if (res) {
                                    res = JSON.parse(res);
                                    if (res.error == 0) {
                                        var wanwu_props = res.error_tip;
                                        var select_html = '';
                                        $(wanwu_props).each(function(){
                                            if(this.propertyValues.length>=3 && this.multi != 1) {
                                                if (this.required) {
                                                    select_html += "<span class='require'>" + this.name + "</span>:<select id='pid_" + this.pid + "' name='pid_" + this.pid + "'>";
                                                } else {
                                                    select_html += "<span class=''>" + this.name + "</span>:<select id='pid_" + this.pid + "' name='pid_" + this.pid + "'>";
                                                }
                                                select_html += "<option value=''>请选择</option>";
                                                for (var i = 0; i < this.propertyValues.length; i++) {
                                                    select_html += "<option value='"+ this.pid + ':' + this.propertyValues[i].vid+"'>"+this.propertyValues[i].name+"</option>";
                                                }
                                                // if(this.isInputProp) {
                                                //     select_html += "<option class='self_props'>自定义</option>";
                                                // }
                                                select_html += "</select>";                                              
                                            } else if (this.propertyValues.length == 0) {
                                                // if (this.isInputProp) {
                                                    if (this.required) {
                                                        select_html += "<span class='require'>" + this.name + "</span>:<input type='text' id='pid_" + this.pid + "' name='pid_" + this.pid + "' />";
                                                    } else {
                                                        select_html += "<span class=''>" + this.name + "</span>:<input type='text' id='pid_" + this.pid + "' name='pid_" + this.pid + "' />";
                                                    }
                                                // } else {
                                                //     if (this.required) {
                                                //         select_html += "<span class='require'>" + this.name + "</span>:";
                                                //     } else {
                                                //         select_html += "<span class=''>" + this.name + "</span>:";
                                                //     }
                                                // }
                                            } else if (this.propertyValues.length<3 && this.propertyValues.length>0 && this.multi != 1) {
                                                if (this.required) {
                                                    select_html += "<span class='require'>" + this.name + "</span>:";
                                                } else {
                                                    select_html += "<span class=''>" + this.name + "</span>:";
                                                }
                                                for (var i = 0; i < this.propertyValues.length; i++) {
                                                    select_html += "<input type='radio' id='pid_" + this.pid + "' name='pid_" + this.pid + "' value='" + this.pid + ':' + this.propertyValues[i].vid+"' />"+this.propertyValues[i].name;
                                                }
                                            } else if (this.multi == 1) {
                                                if (this.required) {
                                                    select_html += "<span class='require'>" + this.name + "</span>:";
                                                } else {
                                                    select_html += "<span class=''>" + this.name + "</span>:";
                                                }
                                                for (var i = 0; i < this.propertyValues.length; i++) {
                                                    select_html += "<input type='checkbox' name='pid_" + this.pid + "' id='pid_" + this.pid + "' value='" + this.pid + ':' + this.propertyValues[i].vid + "' />" + this.propertyValues[i].name;
                                                }
                                            }
                                            select_html += '<br />';
                                        });
                                        $('#loading_img').hide();
                                        $('#props_area').html(select_html);
                                        // console.log(select_html);
                                    } else {
                                        $('#loading_img').hide();
                                        $('#props_area').html('属性加载失败');
                                        return false;
                                    }
                                }
                            }
                        });
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
        if ( (!goods_number) || (!goods_price) ) {
            // alert(1);
            return false;
        }

        now_price.parent().prev().prev().html('<div class="buyNumber"><span>' + goods_number + '</span></div>');
        now_price.parent().prev().html('<span>' + goods_price + '</span>');
        now_price.attr("class", "btn-dustbin drop_price");
        now_price.parent().parent().attr("class", "old_tr");
        now_price.next().remove();
        return true;
    });

    // 增加价格区间
    $('#add_price_area').click(function(){
        // var is_add = $('.price_tr').find('input');
        // alert(is_add);
        var html = '<tr class="price_tr"><td><div class="buyNumber"><input type="text" class="form-control goods_number" name="buyNumber[]" style="width:70px;"></div></td><td><input type="text" class="form-control goods_price" name="discount[]"></td><td><a href="javascript:;" class="btn-ok save price"></a><a href="javascript:;" class="btn-dustbin drop_price"></a></td></tr>';
        $('.old_tr:last').after(html);
        $('.old_tr').attr("class", "");
        return true;
    });

    // 删除价格区间
    $(document.body).delegate('.drop_price','click', function (e){
        var indexTr = $(this).parents('tr').index();
        var now = $(e.currentTarget);
        if (now.parent().parent().parent().find('tr').length > 1) {
            now.parent().parent().siblings().attr("class", "old_tr");
        } else {
            var html = '<tr class="price_tr"><td><div class="buyNumber">1</div></td><td><input type="text" class="form-control goods_price" name="discount[]"></td><td><a href="javascript:;" class="btn-ok save price"></a></td></tr>';
            now.parent().parent().parent().html(html);
            $('#table-price-show tbody').html('<tr><td colspan="2">可根据分销商采购的不同数量设置不同折扣</td></tr>');
            // $('#price_body').find("input.goods_number[type='text']").attr('type','hidden');
            // $('#price_body').find('input.goods_number').val(1);
            // $('#price_body').find('.buyNumber').append('<span>1</span>');
        }
        now.parent().parent().remove();
        $('#table-price-show tr:eq('+(indexTr+1)+')').remove()
        return true;
    });

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
        if (now.parent().parent().parent().find('tr').length > 1) {
            now.parent().parent().siblings().attr("class", "old_attr_tr");
        } else {
            var html = '<tr class="attribute_tr"><td><input type="text" class="form-control goods_version"></td><td><input type="text" class="form-control goods_stock"></td><td><input type="text" class="form-control goods_stock"></td><td><input type="text" class="form-control merchant_code"></td><td><a href="javascript:;" class="btn-ok save attribute"></a></td></tr>';
            now.parent().parent().parent().html(html);
        }
        now.parent().parent().remove();
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
    
    
     //处理别名
    $('.sellvirtue').on('blur',':text',function(e){
        var odata = $(this).attr("data");
        var odata1 =  "<span>"+odata+"</span>";
        var odata2 =  "<span>"+odata+"--";
        var odata3 = "--"+odata+"</span>";
        var ndata = this.value;
        var tdHtml = $('#version_body').html();
        // var tdHtml_hidden = $("#version_body_hidden").html();
        var pattern = new RegExp(odata1,"g");
        var pattern2 = new RegExp(odata2,"g");
        var pattern3 = new RegExp(odata3,"g");
        $(this).parent().append(ndata);
        $(this).remove();
//        console.log(ndata)
        // debugger;
        if(pattern.test(tdHtml))
        {
            ndata = "<span>"+ndata+"</span>";
            tdHtml = tdHtml.replace(pattern, ndata);
            // tdHtml_hidden = tdHtml_hidden.replace(pattern, ndata);
        }
        if(pattern2.test(tdHtml))
        {
            ndata = "<span>"+ndata+"--";
            tdHtml =tdHtml.replace(pattern2, ndata);
            // tdHtml_hidden = tdHtml_hidden.replace(pattern2, ndata);
        }
        if(pattern3.test(tdHtml))
        {
            ndata = "--"+ndata+"</span>";
            tdHtml = tdHtml.replace(pattern3, ndata);
            // tdHtml_hidden = tdHtml_hidden.replace(pattern3, ndata);
        }
        $('#version_body').html(tdHtml);
        // $("#version_body_hidden").html(tdHtml_hidden);
    });
    // 为分类绑定事件
    $('#props_area').on('change','.sellvirtue input',function(e){
          //$(this).parents('.sellvirtue').index('.sellvirtue')
          if(this.checked)
            {
                var parent = $(this).parent();
                var input_props = "<input value='"+$(this).parent().text()+"' data='"+$(this).parent().text()+"' style='width:100px;height:20px;'  />";
                $(this).parent().text("")
                parent.append(this)
                parent.append(input_props);
                parent.children().eq(1).focus();
            }
          var virLen = $('.sellvirtue').length;
          var virArr =[]
          for(var i = 0; i < virLen;i++){
              var sellDom = $('input:checked',$('.sellvirtue').eq(i));
              var tm = [];
              var cu_tm = [];//自定义属性
              for(var j = 0; j < sellDom.length; j++){
//                  console.log($(sellDom[j]).attr('is_custom'));
                  tm.push(sellDom[j].value);
              }
              tm.length && virArr.push(tm);
          }
          var tdHtml = '';
          if(virArr.length === virLen){
            var ArrValue = doExchange(virArr);
            
            var cutdHtml = '';
            if($.isArray(ArrValue)){
                for(var n = 0; n < ArrValue.length; n++){
                    var valArr = ArrValue[n].split(';');
                    var newArr =[];
                    for(var m =0; m < valArr.length;m++){
                        var tem = valArr[m];
                        var tt = $('.sellvirtue input[value = "'+tem+'"]');
                        var vv = $.trim(tt.parent().text());
                        if(vv == "")
                        {
                            vv = $.trim(tt.next().val());
                        }
                        newArr.push(vv);
                    }
                    var newStr = newArr.join('--');
                    var is_cus = "";
                    if(ArrValue[n].indexOf("{1}") != -1)
                    {
                        is_cus = "is_custom=1";
                    }
                    tdHtml += '<tr><td><input type="hidden" value="'+delCustom(ArrValue[n])+'" '+is_cus+'> <span>'+newStr+'</span></td><td><input type="text" class="form-control"></td><td><input type="text" class="form-control"></td><td><input type="text" class="form-control"></td></tr>';
                }
            }
          }
          if(tdHtml == "")
          {
              tdHtml = "<tr class=\"\"><td><input type=\"hidden\" value=\"\"><span>默认</span></td><td><input type=\"text\" value=\"0\" class=\"form-control\"></td><td><input type=\"text\" value=\"0\" class=\"form-control\"></td><td><input type=\"text\" value=\"0\" class=\"form-control\"></td><td style=\"display:none;\"><input type=\"hidden\" value=\"0\" class=\"form-control\"></td></tr>";
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
     
     function delCustom(str)
     {
         return str.replace(/\{1\}/g,"");//去掉所有{1}
     }
     
     


    // 保存商品
    var submit_flag = true; // 防止重复提交
    $('.save_button').click(function(){
        if (submit_flag) {
            submit_flag = false;
            var is_draft = parseInt($(this).attr('draft'));
            console.log(is_draft);
            var goodsname    = $('#productName').val(); // 商品名称
            var cat_id       = $('#hidden_cat_id').val(); // 分类ID
            // var brand_id     = $('#productBrand').val(); // 品牌ID
            var goods_desc   = $('#productDescription').val(); // 商品描述
            var goods_detail = ue.getContent(); // 商品详情
            var goods_detail_length = delHtmlTag(goods_detail).length; // 商品详情长度
            var keywords     = $('#tagsinput').val();        // 标签
            var su_price        = $('#productAdvice').val();      // 参考零售价
            var minSuggestionPrice = $('#minSuggestionPrice').val();//分销商限价
            var shop_price   = $('#shopPrice').val(); // 基础分销价
            var productLocation = $('#productLocation').val(); // 商品所在地（对应商品说明）
            var goods_img = $("#uploadGoodsImg").find(".imgval").val(); // 商品图片
            var province_id = $('#province').val();
            var province_name = $("#province").find("option:selected").text();
            var city_id = $('#city').val();
            var city_name = $("#city").find("option:selected").text();
            var food_security = {};
            if ($('#prdLicenseNo').length > 0) {
                food_security.prdLicenseNo       = $('#prdLicenseNo').val();
                food_security.designCode         = $('#designCode').val();
                food_security.factory            = $('#factory').val();
                food_security.factorySite        = $('#factorySite').val();
                food_security.contact            = $('#contact').val();
                food_security.mix                = $('#mix').val();
                food_security.planStorage        = $('#planStorage').val();
                food_security.period             = $('#period').val() ? parseInt($('#period').val()) : '';
                food_security.foodAdditive       = $('#foodAdditive').val();
                food_security.supplier           = $('#supplier').val();
                food_security.productDateStart   = $('#productDateStart').val();
                food_security.productDateEnd     = $('#productDateEnd').val();
                food_security.stockDateStart     = $('#stockDateStart').val();
                food_security.stockDateEnd       = $('#stockDateEnd').val();
                food_security.healthProductNo    = $('#healthProductNo').val();
            }

            var props = '';
            var input_pids = '';
            var input_str  = '';
            var brand_id = 0;
            var select = $('#props_area').find('select').selected();
            brand_id = $("#wanwu_brand").val();
            if(is_draft==0)
            {
                var error_tip = [];
                var rqobjs = $(".require").parent().find('select');
                for(var i=0;i<rqobjs.length;i++)
                {
                    if(rqobjs[i].value == undefined || rqobjs[i].value == "")
                    {
                        if($(rqobjs[i]).attr("attr-is_sub") == 1)
                        {//子属性需要判断是否自定义
                            if($(rqobjs[i]).next().val().length > 0)continue;
                        }
                        error_tip.push($(rqobjs[i]).attr("val")+"不能为空<br />");
                    }
                }
            }
            for (var i = 0; i < select.length; i++) {
                if ( select[i].attributes['isBrand'] && select[i].attributes['isBrand'].nodeValue == 1 ) {
                    if (select[i].value) {
                        input_pids += select[i].name.substr(4) + ',';
                        input_str += select[i].value + ',';
                        //brand_id = $(select[i]).find('option:selected').attr('bid');
                    }
                } else {
                    if (select[i].value) {
                        props += select[i].value + ';';
                        if($(select[i]).attr('attr-is_sub') == 1)
                        {
                            if($(select[i]).next().length >0 && $(select[i]).next().val().length > 0)continue;
                            input_pids += select[i].name.substr(4) + ',';
                            input_str += select[i].value.substr(select[i].value.indexOf(":") +1 ) + ',';
                        }
                    }
                }
            }
            var checkbox = $('#props_area').find(':checkbox');
            for (var a = 0; a < checkbox.length; a++) {
                if (checkbox[a].checked) {
                    props += delCustom(checkbox[a].value) + ';';
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
                    props += delCustom(radio[c].value)  + ';';
                }
            }

            if (!goodsname) {
                submit_flag = true;
                $.alert('请填写商品名称！');
                return false;
            }

            var price_list   = []; // 价格列表
            var price_tr        = $('#price_body').find('tr');
            for (var i = 0; i < price_tr.length; i++) { // 获取商品数量和商品价格对应关系
                var number = $(price_tr[i]).find('span')[0] ? $(price_tr[i]).find('span')[0].innerHTML : 0;
                var discount = $(price_tr[i]).find('span')[1] ? $(price_tr[i]).find('span')[1].innerHTML : 0;
                if (number && discount) {
                    price_list.push({'number':number,'discount':discount});
                }
            }
            var version_list = []; // 商品规格列表
            var version_tr      = $('#version_body').find('tr');
            var version_error = [];
            for (var a = 0; a < version_tr.length; a++) { // 获取商品规格
                if($(version_tr[a]).find('input')[0])
                {  
                    if($(version_tr[a]).find('input')[0])
                    {
                        if($($(version_tr[a]).find('input')[0]).attr('is_custom') == 1)
                        {
                            var pvalue = $(version_tr[a]).find('input')[0].value;
                            pvalue = pvalue.split(";");
                            for(pi in pvalue)
                            {
                                tpv = pvalue[pi].split(":");
                                if(tpv.length == 2)
                                {
                                    if(tpv[1] < 0)
                                    {//自定义属性
                                        input_pids += tpv[1]+",";
                                        input_str += $("input[is_custom='1'][type='checkbox'][value*='"+tpv[1]+"']").parent().children().eq(1).html()+","; 
                                    }
                                }
                            }
//                            input_str
                        }
                    }
                    var version_name = $(version_tr[a]).find('span')[0] ? $(version_tr[a]).find('span')[0].innerHTML : '';
                    var sku_props = $(version_tr[a]).find('input')[0] ? $(version_tr[a]).find('input')[0].value : '';
//                    console.log($(version_tr[a]).find('input')[0]);
//                    console.log(sku_props);
                    var stock = $(version_tr[a]).find('input')[1] ? $(version_tr[a]).find('input')[1].value : 0;
                    var weight = $(version_tr[a]).find('input')[2] ? $(version_tr[a]).find('input')[2].value : 0;
                    if (parseInt(weight) != weight && !isNaN(parseInt(weight))) {
                        version_error.push(version_name + '的重量必须为整数！<br />');
                    }
                    var merchant_code = $(version_tr[a]).find('input')[3] ? $(version_tr[a]).find('input')[3].value : 0;
                    if (is_draft==0 && !stock) {
                        version_error.push(version_name + '库存未填写！<br />');
                        // $.alert(version_name + '库存未填写');
                        // return false;
                    }
                    version_list.push({'version_name':version_name, 'sku_props':sku_props, 'stock':stock, 'weight':weight, 'merchant_code':merchant_code});
                }
            }

            if (version_error.length) {
                var version_error_tip_str = '';
                for (var vi = 0; vi < version_error.length; vi++) {
                    version_error_tip_str += (vi+1) + '、' + version_error[vi];
                };
                submit_flag = true;
                $.alert(version_error_tip_str);
                return false;
            }

            if (is_draft == 0) { // 提交产品时，要验证必填项是否都已经填写
                if (!goodsname) {
                    error_tip.push('商品名不能为空！<br />');
                }
                if (version_list.length < 1) {
                    error_tip.push('至少要有一个商品规格！<br />');
                }
                if (!cat_id) {
                    error_tip.push('必须要选择一个分类！<br />');
                }
                if(!shop_price)
                {
                    error_tip.push('分销价不能为空！<br />');
                }
                if(!su_price)
                {
                    error_tip.push('建议零售价不能为空！<br />');
                }
                if (goods_detail_length < 1) {
                    error_tip.push('商品详情不能为空！<br />');
                }
                if (!goods_img) {
                    error_tip.push('必须上传商品图片！<br />');
                }
                if (error_tip.length) {
                    var error_tip_str = '';
                    for (var i = 0; i < error_tip.length; i++) {
                        error_tip_str += (i+1) + '、' + error_tip[i];
                    };
                    submit_flag=true;
                    $.alert(error_tip_str);
                    return false;
                }
            }
            $.ajax({
                type: "post",
                url: site_url + "/product/add/do_add_goods",
                async: false,
                data:{
                    "goodsname": goodsname,
                    "cat_id"   : cat_id,
                    "brand_id" : brand_id,
                    "goods_desc":goods_desc,
                    "goods_detail":goods_detail,
                    "keywords": keywords,
                    "price"   : su_price,
                    "minSuggestionPrice"          :minSuggestionPrice,
                    "productLocation": productLocation,
                    "price_list" : price_list,
                    "version_list": version_list,
                    "goods_img":goods_img,
                    "province_id":province_id,
                    "province_name":province_name,
                    "city_id":city_id,
                    "city_name":city_name,
                    "is_draft":is_draft,
                    "props":props,
                    "input_pids":input_pids,
                    "input_str":input_str,
                    "shopPrice":shop_price,
                    "food_security":food_security
                },
                success:function (msg) {
                    msg = JSON.parse(msg);
                    if (msg.error != 0) {
                        submit_flag = true;
                        $.alert(msg.error_tip);
                        return false;
                    } else {
                        $.alertSuccess('提交成功','成功',site_url + "/product/plist/index");
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
    $("#uploadGoodsImg").foxupload('/supplier/upload/file.php?action=add');
    
    // 获取单件商品
    $('#sigle_move').click(function(){
        var shop_url = $('#taobaoLink').val();
        if (!shop_url) {
            $.alert('请输入淘宝链接地址！');
            return false;
        }
        $('#loading').show();
        $.ajax({
            type: "post",
            url: site_url + "/product/taobao/get_one_goods_info",
            async: false,
            data:{
                "url": shop_url
            },
            success:function (msg) {
                $('#loading').hide();
                msg = JSON.parse(msg);
                if (msg.error != 0) {
                    $.alert(msg.error_tip, 'waring');
                    return false;
                } else {
                    var price_area = '<tr class="old_tr"><td><div class="buyNumber"><span>1</span></div></td><td><span>'+ msg.error_tip.promo_price + '</span></td><td><a class="btn-dustbin drop_price" href="javascript:;"></a></td></tr>';
                    var version_area = '';
                    var version_length = msg.error_tip.goods_sku.length;
                    for (var i = 0; i < version_length; i++) {
                        if (i+1 == version_length ) {
                            version_area += '<tr class="old_attr_tr"><td><span>' + msg.error_tip.goods_sku[i].name;
                            version_area += '</span></td><td><span>' + msg.error_tip.goods_sku[i].stock;
                            version_area += '</span></td><td><span>0</span></td><td><span>' + msg.error_tip.goods_sku[i].skuId;
                            version_area += '</span></td><td><a class="btn-dustbin drop_attribute" href="javascript:;"></a></td></tr>';
                        } else {
                            version_area += '<tr class=""><td><span>' + msg.error_tip.goods_sku[i].name;
                            version_area += '</span></td><td><span>' + msg.error_tip.goods_sku[i].stock;
                            version_area += '</span></td><td><span>0</span></td><td><span>' + msg.error_tip.goods_sku[i].skuId;
                            version_area += '</span></td><td><a class="btn-dustbin drop_attribute" href="javascript:;"></a></td></tr>';
                        }                   
                    }
                    if (!version_area) {
                        version_area = '<tr class="attribute_tr"><td><input type="text" class="form-control"></td><td><input type="text" class="form-control"></td><td><input type="text" class="form-control"></td><td><input type="text" class="form-control"></td><td><a class="btn-ok save attribute" href="javascript:;"></a></td></tr>';
                    }
                    var gallery_area = '';
                    var gallery_str  = '';
                    var gallery_length = msg.error_tip.goods_gallery_name.length;
                    for (var i = 0; i < gallery_length; i++) {
                        if ((i+1) == gallery_length) {
                            gallery_str += msg.error_tip.goods_gallery_name[i];
                        } else {
                            gallery_str  += msg.error_tip.goods_gallery_name[i] + ',';    
                        }
                        gallery_area += '<div data-filename="' + msg.error_tip.goods_gallery_name[i];
                        gallery_area += '"><img class="img-responsive" src="' + msg.error_tip.goods_gallery_url[i];
                        gallery_area += '"><a class="removeImg glyphicon glyphicon-remove" href="javascript:;"></a></div>';
                    }

                    $('.imgval').val(gallery_str);
                    $('#productName').val(msg.error_tip.goodsName);
                    // $('#search_words').val(msg.error_tip.catName);
                    $('#price_body').html(price_area);
                    $('#version_body').html(version_area);
                    $('#productAdvice').val(msg.error_tip.goods_price);
                    $('.uploadImgs').html(gallery_area);
                    if (msg.error_tip.goods_desc) {
                        ue.setContent(msg.error_tip.goods_desc);
                    }
                    
                    return true;
                }
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
