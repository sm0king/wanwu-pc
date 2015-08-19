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
                format: 'yyyy-mm-dd',
                language: 'zh-CN',
                minView: 2,
                autoclose: true,
                todayBtn: true
            });
            //点击删除
            $('#allRule').on('click', '.close', function(e) {
                $(this).parents('.reductionList').remove();
            });
        });
    });
    //选择商品
    require(['jquery', 'dialog'], function($) {

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
            getGoodsNode(function(contentNode) {
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
                                jqModal.modal('hide');
                            } else {
                                alert('没选中任何商品！')
                            }
                        }
                    }]
                }, function(e) {
                    $('#allCheck').bind('click', function(e) {
                        $('.good input[type=checkbox]').prop('checked', this.checked);
                    });
                });
            })
        });

        function getGoodsValue() {
            var goodsValue = [];
            $('.good input[type=checkbox]:checked').map(function() {
                goodsValue.push(this.value);
            });
            return goodsValue;
        }

        function getGoodsList(callback) {
            $.ajax({
                url: 'http://lucbine.wanwu.com/supplier/activity/fullcut/getGoodsList?page=1&limit=10'
            }).success(function(data) {
                //获取商品信息
                callback(data.result, data);
            }).error(function(data) {
                callback(false, {
                    error_desc: '未知错误！'
                });
            });
        }

        function getGoodsNode(callback) {
            getGoodsList(function(goods) {
                var contentNode = '<div class="goodsList clearfix"><ul>';
                contentNode += '<li title="全选"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="1" id="allCheck">全选</h3></label></li>';
                if (goods) {
                    var glen = goods.length;
                    for (var i = 0; i < glen; i++) {
                        var good = goods[i];
                        contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="' + good.goods_img + '"></div><h3><input type="checkbox" value="' + good.goods_id + '">' + good.goods_name + '</h3></label></li>';
                    };
                }
                contentNode += '</ul></div>';
                callback(contentNode);
            });
        }
    });
    //增加满减优惠
    require(['jquery'],function($){
        $('#addReductionRules').bind('click',function(e){
            $('#allRule .reductionList:last').after('<li class="reductionList">满￥3000，立减￥100 送赠品<span>商品名字</span><button type="button" class="close"><span>X</span></button></li>');
        });
    });
});