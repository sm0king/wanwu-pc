requirejs.config({
    baseUrl: '../js',
    paths: {
        'config': 'config',
    }
});
require(['config'], function() {
    require(['jquery', 'bootstrapValidator', 'datetimepicker', 'dateLang'], function($) {
        $(function() {
            //时间插件
            $('#activityStartDate,#activityEndDate').datetimepicker({
                format: 'yyyy-mm-dd hh:ii',
                language: 'zh-CN',
                minView: 0,
                autoclose: true,
                todayBtn: true
            });
        });
    });
    //选择商品
    require(['jquery', 'dialog'], function($) {
        $(function() {
            //编辑 初始化
            var urlSearch = location.search;
            if (urlSearch.length > 0 && urlSearch.indexOf('?act_id=') !== -1) {
                var actID = urlSearch.substr(urlSearch.indexOf('=') + 1);
                getInitializer(actID, function(result, data) {
                    //获取到数据
                    if (result.length>0) {
                        // 活动数据；
                        $('#activityName').val(result.act_name);
                        $('#activityDetail').val(result.act_desc);
                        var add_time = new Date();
                        var end_time = new Date();
                        add_time.setTime(result.add_time);
                        end_time.setTime(result.end_time);
                        $('#activityStartDate').val(add_time.toISOString());
                        $('#activityEndDate').val(end_time.toISOString());

                    }else{
                        alert(data.error_msg);
                    }
                });
            }
        });

        function getInitializer(actID, callback) {
                var ajUrl = 'http://123.59.58.104/supplier/activity/fullcut/getActive?act_id=' + actID;
                $.ajax({
                    url: ajUrl,
                    dataType: 'json'
                }).success(function(data){
                    callback(data.data,data);
                }).error(function(data){
                    callback(false,{error_desc:'未知错误！'});
                });
            }
            /*contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="2"></h3></label></li>';
            contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="3"></h3></label></li>';
            contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="4"></h3></label></li>';
            contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="5"></h3></label></li>';
            contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="6"></h3></label></li>';
            contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="7"></h3></label></li>';
            contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="8"></h3></label></li>';
            contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="9"></h3></label></li>';
            contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="10"></h3></label></li>';
            contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="11"></h3></label></li>';
            contentNode += '</ul></div>';*/
        $('#activityGoods').bind('click', function(e) {
            getGoodsNode("checkbox", function(contentNode) {
                $.dialog({
                    keyboard: false,
                    title: '请选择参加活动的商品',
                    content: contentNode,
                    size: 'lg',
                    buttons: [{
                        text: '确定',
                        click: function(jqModal) {
                            var ModalNode = jqModal.contents();
                            //获取选中的值
                            var values = getGoodsValue();
                            if (values.length > 0) {
                                $('#alreadyChoice').html('已选择' + values.length + '件商品').show();
                                $('#alreadyChoice').data('goodsIds', values.toString());
                                jqModal.modal('hide');
                            } else {
                                alert('没选中任何商品！');
                            }
                        }
                    }]
                }, function(e) {
                    $('#allCheck').bind('click', function(e) {
                        $('.good input[type=checkbox]').prop('checked', this.checked);
                    });
                });
            });
        });

        function getGoodsValue() {
            var goodsValue = [];
            $('.good input:checked').map(function() {
                goodsValue.push(this.value);
            });
            return goodsValue;
        }

        function getGoodsList(callback) {
            $.ajax({
                url: 'http://123.59.58.104/supplier/activity/fullcut/getGoodsList?page=1&limit=10',
                dataType: 'json'
            }).success(function(data) {
                //获取商品信息
                callback(data.data.result, data);
            }).error(function(data) {
                callback(false, {
                    error_desc: '未知错误！'
                });
            });
        }

        function getGoodsNode(checkbox, callback) {
            getGoodsList(function(goods) {
                var contentNode = '<div class="goodsList clearfix"><ul>';
                contentNode += checkbox == "checkbox" ? '<li title="全选"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="1" id="allCheck">全选</h3></label></li>' : '';
                if (goods) {
                    var glen = goods.length;
                    for (var i = 0; i < glen; i++) {
                        var good = goods[i];
                        contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="' + good.goods_img + '"></div><h3><input type="' + checkbox + '" ' + (checkbox == "checkbox" ? '' : 'name="giftList"') + ' value="' + good.goods_id + '" ' + (good.valid ? '' : 'disabled') + '>' + good.goods_name + '</h3></label></li>';
                    }
                }
                /*contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="2"></h3></label></li>';
                contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="3"></h3></label></li>';
                contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="4"></h3></label></li>';
                contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="5"></h3></label></li>';
                contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="6"></h3></label></li>';
                contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="7"></h3></label></li>';
                contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="8"></h3></label></li>';
                contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="9"></h3></label></li>';
                contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="10"></h3></label></li>';
                contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="11"></h3></label></li>';
                contentNode += '</ul></div>';*/
                callback(contentNode);
            });
        }

        //增加满减优惠
        $('#addReductionRules').bind('click', function(e) {
            if ($('.addReduction').length < 1) {
                $('#allRule .reductionUl').append('<li class="addReduction">满￥<input type="text" name="standard">，立减￥<input type="text" name="reduce"> 送赠品<input type="text" name="num">个 <butoon name="selectActivityGoods" type="button" id="selectActivityGoods" class="btn btn-blue">选择赠品</butoon><span id="alreadygift" data-num="" class="alreadygift"></span> <button type="button" class="close"><span class="glyphicon glyphicon-floppy-saved"></span></button></li>');
            } else {
                return false;
            }

        });
        //选择赠品
        $('#allRule').on('click', '#selectActivityGoods', function(e) {
            getGoodsNode('radio', function(contentNode) {
                $.dialog({
                    keyboard: false,
                    title: '请选择要赠送的赠品',
                    content: contentNode,
                    size: 'lg',
                    buttons: [{
                        text: '确定',
                        click: function(jqModal) {
                            var ModalNode = jqModal.contents();
                            //获取选中的值
                            var values = getGoodsValue();
                            if (values.length > 0) {
                                var thisGiftName = $.trim($('input[value="' + values[0] + '"]').parents('h3').text());
                                $('#alreadygift').html(thisGiftName).show();
                                jqModal.modal('hide');
                            } else {
                                alert('没选中任何商品！');
                            }
                        }
                    }]
                });
            });
        });
        //保存优惠规则
        $('#allRule').on('click', '.close', function(e) {
            var list = $(this).parents('.addReduction');
            var standard = list.find('[name="standard"]').val();
            var reduce = list.find('[name="reduce"]').val();
            if (!standard && !reduce) {
                return false;
            } else {
                var num = list.find('[name="num"]').val();
                var giftName = $.trim(list.find('#alreadygift').text());
                var giftId = list.find('#alreadygift').prop('data-num');
                var giftHtml = '';
                giftName && giftId && num && num > 0 ? giftHtml = '<span data-num="' + num + '" data-id="' + giftId + '" class="gift">送赠品 ' + giftName + num + '个</span>' : '';
                var addListHtml = '<li class="reductionList">满￥<span data-standard="' + standard + '" data-reduce="' + reduce + '" class="rules">' + standard + ' 立减￥' + reduce + '</span>' + giftHtml + '<button type="button" class="close"><span>X</span></button></li>';
                $('#allRule .reductionList:last').after(addListHtml);
                list.remove();
            }
        });
        //点击删除
        $('#allRule').on('click', '.close', function(e) {
            $(this).parents('.reductionList').remove();
        });
        //保存当前页面数据
        $('#saveAllData').bind('click', function(e) {
                //构造数据.
                var data = getAllData();
                $.ajax({
                    type: "post",
                    dataType: 'json',
                    url: 'http://123.59.58.104/supplier/activity/fullcut/actionAdd',
                    data: data,
                    success: function(data) {
                        alert('添加成功');
                    }
                });
            });
            //获取所有数据
        function getAllData() {
                var allData = {};
                allData.act_name = $.trim($('#activityName').val());
                allData.act_desc = $.trim($('#activityDetail').val());
                allData.start_time = $.trim($('#activityStartDate').val());
                allData.end_time = $.trim($('#activityEndDate').val());
                allData.goods_ids = $('#alreadyChoice').data('goodsIds');
                allData.rules = getRulesData();
                return allData;
            }
            //获取规则数据
        function getRulesData() {
            var rulesData = [];
            var rulesLan = $('.reductionList').length;
            for (var i = 0; i < rulesLan; i++) {
                var ruleData = {};
                var rule = $($('.reductionList')[i]);
                ruleData = rule.find('.rules').data();
                ruleData.gift = rule.find('.gift').data() || 0;
                rulesData.push(ruleData);
            };
            return rulesData;
        }
    });
});