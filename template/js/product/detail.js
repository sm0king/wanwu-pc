requirejs.config({
    baseUrl: '../js',
    paths: {
        'config': 'config',
    }
})
require(['config'], function() {
    var isAdd = location.pathname.indexOf('add') !== -1;
    require(['jquery'], function($) {
        $(function() {
            function doSubProps(obj) {
                var is_parent = $(obj).children().eq(obj.selectedIndex).attr('attr-is_parent');
                if ($(obj).parent().next().attr('attr-is_sub') == 1) {
                    $(obj).parent().next().remove();
                }
                if (is_parent == 1) {
                    var value = $(obj).val();
                    var wher = value.indexOf(":");
                    if (wher === -1) {
                        var parent_pid = obj.name.substr(obj.name.indexOf('_') + 1)
                    } else {
                        var parent_pid = value.substr(0, wher);
                    }
                    var parent_vid = value.substr(wher + 1);
                    var url = "/supplier/product/add/ajax_get_sub_props?cid=" + cat_id + "&parent_pid=" + parent_pid + "&parent_vid=" + parent_vid;
                    $.get(url, function(result) {
                        if (result.error_code == 0) {
                            var require = result.properties[0].must ? "require" : "";
                            phtml = "";
                            if (result.properties[0].isEnumProp && result.properties[0].propertyValues.length > 0) {
                                var phtml = "<div class='attribute clearfix' attr-is_sub='1'><label for='' class='control-label " + require + "'>" + result.properties[0].name + ":</label>";
                                phtml += "<select isbrand class=\"form-control\" val=" + result.properties[0].name + " name='pid_" + result.properties[0].pid + "' attr-is_sub='1'>";
                                phtml += "<option>请选择</option>";
                                for (i in result.properties[0].propertyValues) {
                                    phtml += "<option value='" + result.properties[0].propertyValues[i].pid + ":" + result.properties[0].propertyValues[i].vid + "' >" + result.properties[0].propertyValues[i].name + "</option>";
                                }
                                //if(result.properties[0].isInputProp)
                                //{
                                //  phtml += "<option>自定义</option>";
                                //}
                                phtml += "</select>";
                                //判断是否能自定义
                                if (result.properties[0].isInputProp) {
                                    phtml += "&nbsp;&nbsp;<input class='form-control' placeholder='该选项允许自定义' type='text' value='' name='pid_" + result.properties[0].pid + "' />";
                                }
                                phtml += "</div>";
                            } else if (result.properties[0].isInputProp) {
                                var phtml = "<div class='attribute clearfix' attr-is_sub='1'><label for='' class='control-label " + require + "'>" + result.properties[0].name + ":</label><input class='form-control' type='text' value='' name='pid_" + result.properties[0].pid + "' /></div>";
                            }
                            $(obj).parent().after(phtml);
                            flag = true;
                        }
                    });
                }
            }
            $('.doSubProps').bind('change', function(e) {
                    var obj = this;
                    doSubProps(obj);
                })
                //检测标题字数。
            $('#productName').keyup(function(e) {
                var wordLength = ($.trim(this.value).replace(/[^\x00-\xFF]/g,'**').length/2).toFixed(0);
                if (wordLength <= 30) {
                    $('#titleWorldNumber').html(wordLength)
                }
                return;
            })
            $(document).ready(function() {
                var wordLength = $.trim($('#productName').val()).length;
                if (wordLength <= 30) {
                    $('#titleWorldNumber').html(wordLength)
                }
            });
            //检测商品描述字数
            $('#productDescription').keyup(function(e) {
                    var wordLength = $.trim(this.value).length;
                    if (wordLength <= 150) {
                        $('#DescriptionWorldNumber').html(wordLength)
                    }
                })
                //自定义销售属性
            $('.ortherVirtue').keypress(function(e) {
                if ((e.keyCode || e.charCode) == 13 && $.trim($(this).find('input').val()).length > 0) {
                    AddVirtue($.trim($(this).find('input').val()), $(this));
                }
            });
            $('.ortherVirtue').on('click', '.btn', function() {
                var tmNode = $(this).parent().parent();
                //      if($.trim(tmNode.find('input').val().length == 0)return false;
                AddVirtue($.trim(tmNode.find('input').val()), tmNode)
            })

            function AddVirtue(dataValue, JQObj) {
                //        console.log(dataValue.length);
                var tlength = dataValue.length;
                var pattern = new RegExp("[%`~!@#$^&*=|{}':;',\\[\\].<>?~@#￥……&*\\\\|‘；：”“'？]", "g");
                dataValue = dataValue.replace(pattern, '');
                if (tlength != dataValue.length) {
                    $.alert("自定义属性应由中英文、数字、“_”、“-”、（）、【】组成");
                    return;
                }
                if (dataValue.length == 0) {
                    return;
                }
                var VirtueHtml = '<label class="checkbox-inline"><input is_custom="1" type="checkbox" value="' + JQObj.prev().find('input')[0].value.split(':')[0] + ':{1}-' + (Math.floor(Math.random() * 100000) + 1) + '"><span>' + dataValue + '</span></input></label>';
                //    console.log(VirtueHtml);return;
                var ListJQDom = JQObj.prev();
                var searchNode = ListJQDom.children(':contains("' + dataValue + '")');
                //virtueList
                //      console.log(searchNode);
                if (searchNode.length <= 0) {
                    ListJQDom.append(VirtueHtml)
                    JQObj.find('input').val('')
                } else {
                    var ll = 0;
                    for (var i = 0; i < searchNode.length; i++) {
                        if ($.trim($(searchNode[i]).text()) == dataValue) {
                            ll++
                        }
                    }
                    if (ll > 0) {
                        alert('已有属性，请不要重复添加！');
                    } else {
                        ListJQDom.append(VirtueHtml)
                        JQObj.find('input').val('')
                    }
                }
                return false;
            }
            $('#productAdvice').bind('blur', function() {
                priceCheck();
            })

            function priceCheck() {
                var shopPrice = $("#shopPrice").val();
                var sugPrice = $("#productAdvice").val();
                if (sugPrice > shopPrice * 1.5) {
                    $("#productAdvice").parent().next().html("分销商预期利润超过50%");
                }
            }
        })
    });
    //验证模块
    require(['jquery', 'bootstrapValidator','datetimepicker','dateLang'], function($) {
        $('#productForm').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                productName: {
                    validators: {
                        notEmpty: {
                            message: '商品名不能为空'
                        },
                        callback: {
                            message: '商品名称不能超过30个字',
                            callback: function(value, validators, $fields) {
                                var wordLength = ($.trim(value).replace(/[^\x00-\xFF]/g, '**').length / 2).toFixed(0);
                                if (wordLength > 30) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        }
                    }
                },
                shopPrice: {
                    validators: {
                        notEmpty: {
                            message: '基础分销价不能为空'
                        },
                        numeric: {
                            message: '价格只能为数字'
                        },
                        callback:{
                            message:'价格不能小于0',
                            callback:function(value){
                                return value > 0;
                            }
                        }
                    }
                },
                productAdvice: {
                    validators: {
                        numeric: {
                            message: '价格只能为数字'
                        }
                    }
                },
                purchprice: {
                    validators: {
                        numeric: {
                            message: '价格只能为数字'
                        }
                    }
                },
                'discount[]': {
                    validators: {
                        between: {
                            min: 1,
                            max: 99,
                            message: '折扣为1-99的人意整数'
                        },
                        integer: {
                            message: '请输入正确的整数'
                        },
                        numeric: {
                            message: '价格只能为数字'
                        }
                    }
                },
                'buyNumber[]': {
                    validators: {
                        numeric: {
                            message: '请输入正确的整数'
                        }
                    }
                },
                'period':{
                    validators:{
                        numeric:{
                            message:'保质期请输入正确的整数'
                        }
                    }
                },
                'productDateStart':{
                    validators:{
                        date:{
                            format:'YYYY-MM-DD',
                            message:'时间格式错误'
                        },
                        callback:{
                            message:'生产日期需早于现在，请正确输入',
                            callback:function(value,validator){
                                var toDay = new Date();
                                var diffDay = new Date(value);
                                // var diffDay2 = new Date($('#productDateEnd').val()) || toDay;
                                return (toDay > diffDay)
                            }
                        }
                    }
                },
                'stockDateStart':{
                    validators:{
                        date:{
                            format:'YYYY-MM-DD',
                            message:'时间格式错误'
                        },
                        callback:{
                            message:'进货日期需晚于生产日期，并早于今天，请正确输入',
                            callback:function(value,validator){
                                //进货时间 
                                var diffDay = new Date(value);
                                var diffDay2 = new Date($('#productDateEnd').val());
                                // var diffDay3 = new Date($('#stockDateEnd').val()) || toDay;
                                var toDay = new Date();
                                return (diffDay >= diffDay2 && toDay > diffDay);
                            }
                        }
                    }
                },
                'productDateEnd':{
                    validators:{
                        date:{
                            format:'YYYY-MM-DD',
                            message:'时间格式错误'
                        },
                        callback:{
                            message:'第二个生产日期需晚于第一个生产日期，并早于今天，请正确输入',
                            callback:function(value,validator){
                                var diffDay = new Date(value);
                                var diffDay2 = new Date($('#productDateStart').val())
                                var toDay = new Date();
                                return (diffDay >= diffDay2 && toDay > diffDay );
                            }
                        }
                    }
                },
                'stockDateEnd':{
                    validators:{
                        date:{
                            format:'YYYY-MM-DD',
                            message:'时间格式错误'
                        },
                        callback:{
                            message:'第二个进货日期需晚于第一个生产日期，并早于今天，请正确输入',
                            callback:function(value,validator){
                                var diffDay = new Date(value);
                                var diffDay2 = new Date($('#stockDateStart').val())
                                var toDay = new Date();
                                return (diffDay >= diffDay2 && toDay > diffDay );
                            }
                        }
                    }
                }
            }
        });
        if ($('#productDateStart')) {
            var toDay = new  Date();
           $('#productDateStart,#productDateEnd,#stockDateStart,#stockDateEnd').datetimepicker({
                format: 'yyyy-mm-dd',
                language: 'zh-CN',
                minView: 2,
                autoclose: true,
                todayBtn: true,
                endDate:toDay
            }).on('changeDate', function (e) {
                $('#productForm').data('bootstrapValidator').updateStatus(this.name, 'NOT_VALIDATED', null).validateField(this.name);
            }).on('outOfRange',function(e){
                //$('#productForm').data('bootstrapValidator').updateStatus(this.name, 'NOT_VALIDATED', null).validateField(this.name);
                alert('错误的时间范围！所有时间不能晚于今天。')
            }) 
        };
    });
    require(['ueditor', 'ZeroClipboard'], function(UE, ZeroClipboard) {
        window['ZeroClipboard'] = ZeroClipboard;
        var ue = UE.getEditor('productDetail');
    });
    require(['jquery', 'jqueryTag'], function($) {
        $('#tagsinput').tagsInput();
        $('#flags').delegate('button', 'click', function(e) {
            //获取tags内容
            var val = $(this).text();
            //检查该tags是否存在
            if ($('#tagsinput').tagExist(val)) {
                //.1 存在 删除，删除css
                $('#tagsinput').removeTag(val);
                $(e.currentTarget).parent().removeClass('selected');
                // debugger;
            } else {
                //.2 不存在，添加，增加css
                $('#tagsinput').addTag(val);
                $(e.currentTarget).parent().addClass('selected');
                // debugger;
            }
            //debugger;
            //$(e.currentTarget).parent().toggleClass('selected');
        });
    });
    //增加 变化
    $('#branchAction').on('blur','input[name="buyNumber[]"],input[name="discount[]"]',function(e){
        var parents = $(this).parents('tr');
        var buyNumber = parents.find('[name = "buyNumber[]"]').val();
        var discount = parents.find('[name = "discount[]"]').val();
        var trIndex = parents.index();
        //判断是不是最后一个...
        // if ($('.table-price tr:last').index() === parents.index() ) {
        if(buyNumber && discount && discount >0 && buyNumber > 0){
            // $('#table-price-show tbody tr:last')
            if ($('#shopPrice').val() > 0) {
                priceShow(trIndex,buyNumber,discount);
            }else{
                alert('请正确输入基础分销价');
                $('#shopPrice')[0].focus();
            }
        }
    })
    function priceShow(trIndex,buyNumber,discount){
        trIndex += 1
        var showTr = $('#table-price-show tr:eq('+trIndex+')' );
        var html = '<td><p class="branchNumber">'+buyNumber+'</p></td><td><p class="branchPrice">'+count(discount)+'</p></td>';
        if (showTr[0]) {
            showTr.html(html);
        }else{
            html = '<tr>'+ html + '</tr>';
            $('#table-price-show tbody tr:last').after(html)
        }
    }
    //计算价格
    function count(rebate){
        var price = Number($('#shopPrice').val());
        return (price*rebate/100).toFixed(2);
    }
    //基础分销价变化.执行计算。
    $('#shopPrice').bind('change',function(e){
        $('#price_body tr').each(function(index){
            var rebate = Number($(this).find('td:eq(1)').text());
            if ($('.branchPrice').length >0 ) {
                $('.branchPrice:eq('+index+')').text(count(rebate));
            }else{ //<td><p class="branchNumber">'+buyNumber+'</p></td><td><p class="branchPrice">'+count(discount)+'</p></td>
                var buyNumber = $(this).find('.buyNumber>span').text();
                $('#table-price-show tbody').html('<tr><td><p class="branchNumber">'+buyNumber+'</p></td><td><p class="branchPrice">'+count(rebate)+'</p></td></tr>');
            }
        })
    })
    //页面初始化
    function getBaseBranch(){
        if ($(shopPrice).val() && $(shopPrice).val() > 0) {
            //有基础分销价
            $('#price_body tr').each(function(index){
                var buyNumber = $(this).find('.buyNumber>span').text();
                var discount = $(this).find('td:eq(2)>span').text();
                priceShow(index,buyNumber,discount);
            })
        };
    }
    getBaseBranch()
    if (isAdd) {
        require(['productAdd'], function() {})
    } else {
        require(['productEdit'], function() {})
    }
})
