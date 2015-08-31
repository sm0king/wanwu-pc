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
                format: 'yyyy-mm-dd hh:ii:ss',
                language: 'zh-CN',
                minView: 0,
                autoclose: true,
                todayBtn: true
            });
        });
    });
    //选择商品 主操作
    require(['jquery', 'dialog'], function($) {
        $(function() {
            //编辑 初始化
            var urlSearch = location.search;
            if (urlSearch.length > 0 && urlSearch.indexOf('?act_id=') !== -1) {
                var actID = urlSearch.substr(urlSearch.indexOf('=') + 1);
                getInitializer(actID, function(result, data) {
                    //获取到数据
                    if ($.type(result) === "object") {
                        // 活动数据；
                        $('#activityName').val(result.act_name);
                        $('#activityDetail').val(result.act_desc);
                        /*var add_time = new Date();
                        var end_time = new Date();
                        add_time.setTime(result.add_time);
                        end_time.setTime(result.end_time);*/
                        $('#activityStartDate').val(result.start_time);
                        $('#activityEndDate').val(result.end_time);
                        var listHtml = showRuleList(result.act_rules);
                        $('#allRule .reductionUl').html(listHtml);
                    } else {
                        alert(data.error_msg);
                    }
                });
            } else {
                //新建初始化
                //addInitializer();
            }
        });

        function getInitializer(actID, callback) {
            var ajUrl = 'http://123.59.58.104/supplier/activity/fullcut/getActive?act_id=' + actID;
            $.ajax({
                url: ajUrl,
                dataType: 'json'
            }).success(function(data) {
                callback(data.data, data);
            }).error(function(data) {
                callback(false, {
                    error_desc: '未知错误！'
                });
            });
        }
        // 新建活动使 初始化
        function addInitializer() {
            $('#allRule .reductionUl').html('<li class="addReduction">满￥<input type="text" name="standard">，立减￥<input type="text" name="reduce"> 送赠品<input type="text" name="num">个 <butoon name="selectActivityGoods" type="button" id="selectActivityGoods" class="btn btn-blue">选择赠品</butoon><span id="alreadygift" data-num="" class="alreadygift"></span> <button type="button" class="close"><span class="glyphicon glyphicon-floppy-saved"></span></button></li>');
        }

        function showRuleList(dataList) {
            var html = '';
            var daLan = dataList.length;
            for (var i = 0; i < daLan; i++) {
                var list = dataList[i];
                var gift = list.gift;
                var giftHtml = gift ? '<span data-num="' + gift.num + '" data-goods_id="' + gift.goods_id + '" class="gift">送赠品 ' + gift.goods_name + gift.num + '个</span>' : '';
                html += '<li class="reductionList">满￥<span data-standard="' + list.standard + '" data-reduce="' + list.reduce + '" class="rules">' + list.standard + ' 立减￥' + list.reduce + '</span>' + giftHtml + '<button type="button" class="close"><span>X</span></button></li>';
            }
            return html;
        }
        $('#activityGoods').bind('click', function(e) {
            //弹窗开始，数据初始化，加载第一页 商品。
            // getGoodsNode(1,"checkbox", function(contentNode) {
            var contentNode = getContentNode();
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
                            $('#alreadyChoice').data('goodsIds', values);
                            jqModal.modal('hide');
                        } else {
                            alert('没选中任何商品！');
                        }
                    }
                }]
            }, function(e) {
                //加载后绑定 各种事件 
                //加载数据 
                //加载 头部 筛选 选项数据
                getContentTitle(function(isOk, htmlNode) {
                    if (isOk) {
                        $('#contentTitle').html(htmlNode);
                    } else {
                        alert(htmlNode.error_msg);
                    }
                });
                //加载第一页数据
                getPageGoodsNode('checkbox', 1,checkGoods);
                // LoadPaginator()
                //为分页绑定事件。加载指定分页的数据。
                $('#contentFooter').on('click','.pagination a',function(e){
                    var clickPage = $(this).data('page');
                    if(!$.isNumeric(clickPage)){
                        var activeNum = $(this).parents('.pagination').find('.active a').data('page');
                        clickPage = clickPage == 'Next' ? ++activeNum : --activeNum
                    }
                    pageTo(clickPage);
                    //0 < clickPage &&  clickPage <= $('.totalPage').text() && getPageGoodsNode('checkbox', clickPage,checkGoods);
                })
                //直接跳转分页页面
                $('#contentFooter').on('click','#pageToButton',function(e){
                    var goPage = $('#goToPage').val();
                   // 0 < goPage &&  goPage <= $('.totalPage').text() && getPageGoodsNode('checkbox', goPage,checkGoods);
                })
                //全选事件
                $('#allCheck').bind('click', function(e) {
                    var wellNode = $('.good input[type=checkbox]:not(:disabled)');
                    var wellNodePar = wellNode.parents('.good');
                    wellNode.prop('checked', this.checked);
                    this.checked ? wellNodePar.addClass('checked') : wellNodePar.removeClass('checked');
                });
                //点击选中事件
                $('#contentMain').on('click','.good input[name="good"]', function(e) {
                    var goodPar = $(this).parents('.good');
                    this.checked ? goodPar.addClass('checked') : goodPar.removeClass('checked');
                });
                //点击无效商品 事件
                $('#contentMain').on('click', '#goodsList .good', function(e) {
                    if (this.getElementsByTagName('input')[0].disabled) {
                        alert('该商品已经在其他活动中存在，一个商品无法同时参加多个满减活动');
                    }
                });
                //选中已经选择了的商品
                //checkGoods();
            });
            // });
        });
        //分页跳转
        function pageTo(page){
            //跳转之前对选中的数据进行存储
            reSetGoodsValue(getGoodsValue());
            0 < page &&  page <= $('.totalPage').text() && getPageGoodsNode('checkbox', page,checkGoods);
        } 
        //弹窗DOM框架
        function getContentNode() {
            // 头部
            var html = '<div id="contentTitle" class="contentTitle clearfix"></div>';
            // 主内容区
            html += '<div id="contentMain" class="contentMain clearfix"></div>';
            // 底部
            html += '<div id="contentFooter" class="contentFooter clearfix"></div>';
            // 全选按钮
            html += '<label class="allCheck"><input type="checkbox" value="1" id="allCheck">全选</label>'
            return html;
        }
        //加载 选择筛 控制 头部
        function getContentTitle(callback) {
            var html = '<div class="form-group clearfix"><label class="col-md-6 alreadyCheck"><input type="checkbox" name="allCheck">只看选择商品</label><div id="searchConditions" class="searchConditions col-md-6"><div class="input-group"><div class="input-group-btn"><select>';
            $.ajax({
                url: 'http://123.59.58.104/supplier/activity/fullcut/getSort',
                dataType: 'json'
            }).success(function(data) {
                if (data.error_no == 0) {
                    var reMess = data.data;
                    for (var i = 0; i < reMess.length; i++) {
                        html += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                    };
                    html += '<option value="商品分类1">商品分类1</option>';
                    html += '<option value="商品分类2">商品分类2</option>';
                    html += '<option value="商品分类3">商品分类3</option>';
                    html += '<option value="商品分类4">商品分类4</option>';
                    html += '<option value="商品分类5">商品分类5</option>';
                    html += '</select></div><input type="text" class="form-control"><span class="input-group-btn"><button type="button" class="btn btn-default">查询</button></span></div></div></div>';
                    callback(true, html);
                } else {
                    callback(false, data.error_msg, data.data);
                }
            }).error(function(data) {
                /*callback(false, {
                    error_msg: '未知错误！'
                });*/
                html += '<option value="商品分类1">商品分类1</option>';
                html += '<option value="商品分类2">商品分类2</option>';
                html += '<option value="商品分类3">商品分类3</option>';
                html += '<option value="商品分类4">商品分类4</option>';
                html += '<option value="商品分类5">商品分类5</option>';
                html += '</select></div><input type="text" class="form-control"><span class="input-group-btn"><button type="button" class="btn btn-default">查询</button></span></div></div></div>';
                callback(true, html);
            });
        }
        //初始化记载 已选中的数据
        function checkGoods() {
            var goods = $('#alreadyChoice').data('goodsIds');
            if (goods) {
                var rrgoods = goods.split(',');
                var rrLan = rrgoods.length;
                for (var i = 0; i < rrLan; i++) {
                    $('[name="good"][value="' + rrgoods[i] + '"]').prop('checked', true);
                    $('[name="good"][value="' + rrgoods[i] + '"]').parents('.good').addClass('checked');
                };
                return true;
            };
            return false;
        }
        //获取 选中的商品ID
        function getGoodsValue() {
            var goodsValue = [];
            $('.good input:checked').map(function() {
                goodsValue.push(this.value);
            });
            return goodsValue;
        }
        //合并数组 去重 用于 翻页前，将数据存储起来。
        function contGoodsArray(arr1,arr2){
            return $.unique(arr1.concat(arr2));
        }
        //获取 当前已经存储的值 去重 重新 赋值
        function reSetGoodsValue(newValue){
            var oldValue = $('#alreadyChoice').data('goodsIds');
            $('#alreadyChoice').data('goodsIds',contGoodsArray(oldValue,newValue));
        }
        //获取分页内容。
        function getGoodsList(page, callback) {
            $.ajax({
                url: 'http://123.59.58.104/supplier/activity/fullcut/getGoodsList?limit=10&page=' + page,
                dataType: 'json'
            }).success(function(data) {
                //刷新分页 暂留
                LoadPaginator(data.data.total, data.data.page, data.data.limit);
                    //获取商品信息
                callback(data.data.result, data);
            }).error(function(data) {
                callback(false, {
                    error_desc: '未知错误！'
                });
            });
        }
        // 组织goods信息DOM
        function getGoodsNode(checkbox, page, callback) {
            getGoodsList(page, function(goods) {
                var contentNode = '<div class="goodsList clearfix" id="goodsList"><ul class="clearfix">';
                //contentNode += checkbox == "checkbox" ? '<li title="全选"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input type="checkbox" value="1" id="allCheck">全选</h3></label></li>' : '';
                //选择选项部分
                /*
                contentNode += '<div class="form-group clearfix">';
                contentNode += checkbox == "checkbox" ?'<label class="col-md-6 alreadyCheck"><input type="checkbox" name="allCheck">只看选择商品</label>':'';
                contentNode +='<div id="searchConditions" class="searchConditions col-md-6"><div class="input-group"><div class="input-group-btn">';
                */
                if (goods) {
                    var glen = goods.length;
                    for (var i = 0; i < glen; i++) {
                        var good = goods[i];
                        contentNode += '<li title="' + good.goods_name + '" class="good ' + (good.valid ? '' : 'disabled') + '"><label><div class="u-img"><img src="' + good.goods_img + '"></div><h3><input type="' + checkbox + '" ' + (checkbox == "checkbox" ? 'name="good"' : 'name="giftList"') + ' value="' + good.goods_id + '" ' + (good.valid ? '' : 'disabled') + '>' + good.goods_name + '</h3></label></li>';
                    }
                }
                //测试数据
                contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input name="good"  type="checkbox" value="2"></h3></label></li>';
                contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input name="good"  type="checkbox" value="3"></h3></label></li>';
                contentNode += '<li title="商品名称" class="good disabled"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input name="good"  type="checkbox" value="4" disabled></h3></label></li>';
                contentNode += '<li title="商品名称" class="good disabled"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input name="good"  type="checkbox" value="5" disabled></h3></label></li>';
                contentNode += '<li title="商品名称" class="good disabled"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input name="good"  type="checkbox" value="6" disabled></h3></label></li>';
                contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input name="good"  type="checkbox" value="7"></h3></label></li>';
                contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input name="good"  type="checkbox" value="8"></h3></label></li>';
                contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input name="good"  type="checkbox" value="9"></h3></label></li>';
                contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input name="good"  type="checkbox" value="10"></h3></label></li>';
                contentNode += '<li title="商品名称" class="good"><label><div class="u-img"><img src="http://nec.netease.com/img/s/1.jpg"></div><h3><input name="good"  type="checkbox" value="11"></h3></label></li>';
                //分页部分
                //contentNode += '<nav class="clearfix"><ul class="pagination"><li><a href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li><li><a href="#">1</a></li><li><a href="#">2</a></li><li><a href="#">3</a></li><li><a href="#" class="more">...</a></li><li><a href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li><li class="pagin-extend">共<i class="totalPage">7</i>页，到第<input type="text" class="text-input">页<button type="button" class="btn btn-blue">确定</button></li></ul></nav>';
                //结尾
                contentNode += '</ul></div>';
                callback(contentNode);
            });
        }
        //加载某分页内容
        function getPageGoodsNode(checkbox, page,callback) {
            getGoodsNode(checkbox, page, function(pageNode) {
                $('#contentMain').html(pageNode);
                callback();
            });
        }
        //获取分页
        function LoadPaginator(total, page, limit) {
            var countPage = Math.ceil(total / limit);
            var html = '<nav class="clearfix"><ul class="pagination">'
            if (countPage < 2) {
                html += '<li><a data-page ="1">1</a></li>'
            } else if (1< countPage < 8){
                html += '<li><a data-page="Previous" aria-label="Previous"><span aria-hidden="true">«</span></a></li>';
                for(var i = 1; i <= countPage; i++){
                   html += '<li class="'+(i === page ?'active':'')+'" ><a data-page ="'+i+'">'+i+'</a></li>';
                }
                //html += '<li><a href="#">1</a></li><li><a href="#">2</a></li><li><a href="#">3</a></li>';

                html += '<li><a class="more">...</a></li>'
                html += '<li><a data-page="Next" aria-label="Next"><span aria-hidden="true">»</span></a></li>';
            }
            html += '<li class="pagin-extend">共<i class="totalPage">'+countPage+'</i>页，到第<input id="goToPage" type="text" class="text-input">页<button id="pageToButton" type="button" class="btn btn-blue">确定</button></li>';
            html += '</ul></nav>'
            $('#contentFooter').html(html);
        }
        //增加满减优惠
        $('#addReductionRules').bind('click', function(e) {
            if ($('.reductionList').length > 2) {
                alert('满减活动最大支持三级');
            };
            if ($('.addReduction').length < 1 && $('.reductionList').length < 3) {
                $('#allRule .reductionUl').append('<li class="addReduction">满￥<input type="text" name="standard">，立减￥<input type="text" name="reduce"> 送赠品<input type="text" name="num">个 <butoon name="selectActivityGoods" type="button" id="selectActivityGoods" class="btn btn-blue">选择赠品</butoon><span id="alreadygift" data-num="" class="alreadygift"></span> <button type="button" class="close"><span class="glyphicon glyphicon-floppy-saved"></span></button></li>');
            } else {
                return false;
            }

        });
        //选择赠品
        $('#allRule').on('click', '#selectActivityGoods', function(e) {
            getGoodsNode('radio',1, function(contentNode) {
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
                                $('#alreadygift').data('num', values[0]);
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
        $('#allRule').on('click', '.addReduction .close', function(e) {
            var list = $(this).parents('.addReduction');
            var standard = list.find('[name="standard"]').val();
            var reduce = list.find('[name="reduce"]').val();
            if (!standard && !reduce) {
                alert('规则数据不完整无法保存')
                return false;
            } else {
                var num = list.find('[name="num"]').val();
                var giftName = $.trim(list.find('#alreadygift').text());
                var giftId = list.find('#alreadygift').data('num');
                var giftHtml = '';
                giftName && giftId && num && num > 0 ? giftHtml = '<span data-num="' + num + '" data-goods_id="' + giftId + '" class="gift">送赠品 ' + giftName + num + '个</span>' : '';
                var addListHtml = '<li class="reductionList">满￥<span data-standard="' + standard + '" data-reduce="' + reduce + '" class="rules">' + standard + ' 立减￥' + reduce + '</span>' + giftHtml + '<button type="button" class="close"><span>X</span></button></li>';
                $('#allRule .reductionUl').append(addListHtml);
                list.remove();
            }
        });
        //点击删除
        $('#allRule').on('click', '.reductionList .close', function(e) {
            $(this).parents('.reductionList').remove();
            if ($('.reductionList').length <= 0 && $('.addReduction').length <= 0) {
                addInitializer();
            };

        });
        //保存当前页面数据
        $('#saveAllData').bind('click', function(e) {
            //构造数据.
            var data = getAllData();
            if (!data.goods_ids) {
                alert('请先选择要赠送的赠品');
                return;
            } else {
                requestSaveData(data, function(isOk, message, data) {
                    if (isOk) {
                        alert(message);
                    } else {
                        showError(message, data);
                    }
                })
            }
        });
        //获取所有数据
        function getAllData() {
            var allData = {};
            allData.act_name = filterString($.trim($('#activityName').val()));
            allData.act_desc = filterString($.trim($('#activityDetail').val()));
            allData.start_time = filterString($.trim($('#activityStartDate').val()));
            allData.end_time = filterString($.trim($('#activityEndDate').val()));
            allData.goods_ids = filterString($('#alreadyChoice').data('goodsIds'));
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
                ruleData = filterString(rule.find('.rules').data());
                if (rule.find('.gift').data()) {
                    ruleData.gift = filterString(rule.find('.gift').data());
                }
                rulesData.push(ruleData);
            };
            return rulesData;
        }
        // 提交数据
        function requestSaveData(data, callback) {
            //判断是否为编辑页面
            var urlSearch = location.search;
            var isEdit = urlSearch.length > 0 && -1 !== urlSearch.indexOf("?act_id=")
            var quUrl = isEdit && (data.act_id = urlSearch.substr(urlSearch.indexOf('=') + 1)) ? 'http://123.59.58.104/supplier/activity/fullcut/actionEdit' : 'http://123.59.58.104/supplier/activity/fullcut/actionAdd';
            $.ajax({
                type: "post",
                dataType: 'json',
                url: quUrl,
                data: {
                    'condition': data
                },
                success: function(re) {
                    if (re.error_no !== 0) {
                        callback(false, re.error_msg, re.data);
                    } else {
                        callback(true, re.error_msg);
                    }
                }
            });
        }
        //显示错误
        function showError(title, contents) {
            var contNode = '<div class="error_msg"><ul>';
            var contLan = contents.length;
            for (var i = 0; i < contLan; i++) {
                contNode += '<li>' + contents[i] + '</li>';
            };
            contNode += '</ul></div>'
            $.dialog({
                keyboard: true,
                title: title,
                content: contNode,
                butoon: [{
                    text: '确定',
                    click: function(jqModal) {
                        jqModal.modal('hide');
                    }
                }]
            })
        }
        //过滤数据特殊字符
        function filterString(str) {
            var pattern = new RegExp("[%`~!@#$^&*=|{}';',\\[\\].<>?~@#￥……&*\\\\|‘；：”“'？]", "g");
            return str && str.replace(pattern, '');
        }
        //获取分页信息，设置分页
    });
    //验证部分
    require(['jquery', 'bootstrap', 'bootstrapValidator'], function($) {
        var validatorsmessage = {
            validators: {
                numeric: {
                    message: '价格必须是数字'
                }
            }
        }
        var notEmptys = {
            validators: {
                notEmpty: {
                    message: '此处不能为空'
                }
            }
        }
        $('#fullReduction').bootstrapValidator({
            fields: {
                standard: validatorsmessage,
                reduce: validatorsmessage,
                num: validatorsmessage,
                activityName: notEmptys,
                activityDetail: notEmptys
            }
        }).on('click', '#addReductionRules', function() {
            $('#fullReduction').bootstrapValidator('addField', 'standard', validatorsmessage);
            $('#fullReduction').bootstrapValidator('addField', 'reduce', validatorsmessage);
            $('#fullReduction').bootstrapValidator('addField', 'num', validatorsmessage);
        })
    })
});