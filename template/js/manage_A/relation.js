(function(config, win, dom, body){    
    //封装了 Ajax 调用 PHP 接口的相关参数
    //返回：jQuery 提供的延迟对象，使用该对象处理 Ajax 的响应
    function ajax(url, data){
        return $.ajax({
            url: config.ib + url,
            type: 'post',
            dataType: 'json',
            data: $.extend({ m: Math.random() }, data)
        });
    }

    //获取万物类目与第三方平台类目之间的对应信息
    function getCatalogMap(){
        var wc = wanwuCatalogSelector.getValue().pop(),
            pc = platformCatalogSelector.getValue().pop(),
            platformId = $('#platform').val();
        return {
            platformId: platformId,
            catId: wc ? wc.catId : 0,
            extCatId: pc ? pc.catId : 0
        };
    }

    //读取属性时的 XMLHttpRequest 对象，
    //用于在用户切换类目时，终止请求，以节省资源
    var xhrPropLoader = {
        xhrArr: [],
        abort: function(){
            var xhr = null;
            while(xhr = this.xhrArr.shift()){
                xhr.abort();
            }
        }
    };

    //加载万物类目属性与第三方平台类目属性
    function loadProperties(){
        //读取类目信息
        var map = getCatalogMap();

        if (!map.platformId || !map.catId || !map.extCatId) { 
            $.alert('请选择类目！');
            return;
        }

        $('#propMap').html('<div class="alert alert-warning text-center">正在加载。。。</div>');

        //由于万物属性与第三方平台属性是两个接口，需要单独请求
        //所以这里设置的几个变量用于同步两个接口的响应，
        //在万物属性和第三方平台属性全部加载完成后，执行 onPropertiesLoaded 函数
        var current = 0, 
            count = 2,
            propArr = null,
            extPropArr = null,
            sync = function(){
                if (++current >= count) {
                    onPropertiesLoaded(propArr, extPropArr);
                }
            };

        //读取万物类目属性
        xhrPropLoader.xhrArr[ 0 ] = ajax('/cat/relation/ajax_get_props', {
            cat_id: map.catId,
            platform_id: config.wpid
        }).done(function(result){
            if (result.error == 0) {
                propArr = result.error_tip;
            }
            sync();
        });

        //读取平台类目属性
        xhrPropLoader.xhrArr[ 1 ] = ajax('/cat/relation/ajax_get_props', {
            cat_id: map.extCatId,
            platform_id: map.platformId
        }).done(function(result){
            if (result.error == 0) {
                extPropArr = result.error_tip;
            }
            sync();
        });
    }

    //当类目属性加载完成后以事件处理函数
    //在此函数中创建HTML并展示在页面上
    function onPropertiesLoaded(propArr, extPropArr){
        if (!propArr || !propArr.length || !extPropArr || !extPropArr.length) { 
            return $('#propMap').html('<div class="alert alert-danger text-center">很抱歉，没有可供对应的属性！</div>');
        }

        var propSelectorHtml = getWanWuPropSelectorHtml(propArr);

        var html = '';
        for(var i = 0, len = extPropArr.length;i < len;i++){
            var extProp = extPropArr[ i ],
                id= 'ext_' + extProp.id;
            html += '<div class="panel panel-info" data-ext-prop-id="' + extProp.pid + '" data-must="' + extProp.is_must_prop + '" data-ext-pname="' + extProp.name + '">'+
                        '<div class="panel-heading propMap-title">'+
                            '<form class="form-inline">'+
                                '<a href="#' + id + '" data-toggle="collapse" class="btn-collapse"> '+
                                    '<sapn class="glyphicon glyphicon-plus"></sapn>'+
                                '</a>'+
                                '<div class="form-group">'+
                                    '<label class="control-label">万物属性</label>'+
                                    propSelectorHtml +
                                '</div>'+
                                '<span class="gap glyphicon glyphicon-transfer"></span>'+
                                '<div class="form-group">'+
                                    '<label class="control-label">平台属性</label><span class="platform-prop-text' + (extProp.is_must_prop == '1' ? ' require-after' : '') + '">' + extProp.name + '</span>'+
                                '</div>'+
                            '</form>'+
                        '</div>'+
                        '<div id="' + id + '" class="collapse">'+
                            '<div class="panel-body">'+
                                '<div class="alert alert-warning text-center">请选择属性！</div>' +
                            '</div>'+
                        '</div>'+
                    '</div>';
        }
        $('#propMap').html(html);
    }

    //将万物的属性创建成一个 select 元素，以供之后使用
    function getWanWuPropSelectorHtml(propArr){
        var html = '<select class="form-control select-prop"><option value="">请选择</option>';

        for(var i = 0, len = propArr.length; i < len;i++){
            var prop = propArr[ i ];
            html += '<option value="' + prop.pid + '">' + prop.name + '</option>';
        }
        html += '</select>';
        return html;
    }

    var xhrValueLoader = null;

    //当展开一个属性面板时的处理函数
    //在此函数中加载属性下的值
    function onPropPanelShow(jqPanel){
        if (jqPanel.hasClass('loaded')) { return; }

        var jqSelectProp = jqPanel.find('.select-prop'),
            prop = jqSelectProp.val();
        if (!prop) { return; }

        var extProp = jqPanel.data('ext-prop-id'),
            map = getCatalogMap();

        jqPanel.find('.panel-body').html('<div class="alert alert-warning text-center">正在加载。。。</div>');
        jqSelectProp.prop('disabled', true);

        xhrValueLoader = ajax('/cat/relation/ajax_get_props_value', {
            third_cat_id: map.extCatId,
            platform_id: map.platformId,
            third_pid: extProp,
            wanwu_cat_id: map.catId,
            wanwu_pid:prop
        }).done(function(result){
            jqSelectProp.prop('disabled', false);

            if (result.error == 0) {
                jqPanel.addClass('loaded');
                jqPanel.find('.panel-body').html(buildPropValues(result.list));
            }else{
                //TODO: 读取属性值失败后的处理代码
            }
        });
    }

    //将属性列表生成HTML
    function buildPropValues(valuelistObj){
        var wanwuArr = valuelistObj.wanwu,
            extArr = valuelistObj.third;

        if (!wanwuArr || !wanwuArr.length || !extArr || !extArr.length) {
            //TODO: 当没有属性值时处理代码
            return '<div class="alert alert-danger text-center">很抱歉，没有可供对应的属性值！</div>';
        }

        var valueSelectorHtml = '<select class="form-control select-value"><option value="">请选择</option>';
        for(var i = 0, len = wanwuArr.length;i < len;i++){
            var wanwu = wanwuArr[ i ];
            valueSelectorHtml += '<option value="' + wanwu.vid + '">' + wanwu.name + '</option>'
        }
        valueSelectorHtml += '</select>';

        var html = '<ul class="list-group">';
        for(var i = 0, len = extArr.length;i < len;i++){
            var ext = extArr[ i ],
                extGroom = getExtGroom(ext);
            html += '<li class="list-group-item" data-value-id="' + extGroom.vid + '" data-ext-vname="' + ext.name + '">'+
                        '<form class="form-inline">'+
                            '<div class="form-group">'+
                                '<label class="control-label">万物属性值</label>'+
                                valueSelectorHtml + 
                                //'<select class="form-control select-prop"></select>'+
                            '</div>'+
                            '<span class="gap glyphicon glyphicon-transfer"></span>'+
                            '<div class="form-group">'+
                                '<label class="control-label">平台属性值</label><span class="platform-prop-text">' + ext.name + '</span>'+
                            '</div>'+
                        '</form>'+
                    '</li>';
        }
        html += '</ul>';
        return html;
    }

    //获取属性值的 推荐值，如果没有，则返回属性值本身
    function getExtGroom(ext){
        return ext.child_list && ext.child_list.length > 0 ? ext.child_list[ 0 ] : ext;
    }

    //当万物或第三方平台的类目改变时的处理函数
    function catalogChange(){
        xhrValueLoader && xhrValueLoader.abort();
        xhrPropLoader && xhrPropLoader.abort();
        $('#propMap').html('<div id="loadProperties" class="alert alert-warning text-center">点击加载属性</div>')
    }

    //保存属性值关联
    function saveProp(){
        var map = [],
            canSubmit = true;

        var catalogMap = getCatalogMap();
        if (!catalogMap.platformId || !catalogMap.catId || !catalogMap.extCatId) { 
            $.alert('请选择类目！');
            return;
        }


        $('#propMap').children('.panel').each(function(){
            var jqPanel = $(this),
                prop = jqPanel.find('.select-prop').val(),
                extProp = jqPanel.data('ext-prop-id'),
                isMust = +jqPanel.data('must'),
                loaded = jqPanel.hasClass('loaded'),
                values = null;

            if (!prop && isMust) {
                canSubmit = false;
                jqPanel.addClass('has-error panel-danger');
                return;
            }

            if (loaded) {
                values = jqPanel.find('li.list-group-item').map(function(){
                    var jqItem = $(this),
                        val = jqItem.find('.select-value').val() || 0;
                    return {
                        vid: val,
                        ext_vid: jqItem.data('value-id'),
                        vname: val ? jqItem.find('option[value=' + val + ']').text() : '',
                        ext_vname: jqItem.data('ext-vname')
                    };
                }).toArray();
            }

            map.push({
                prop_id: prop,
                ext_prop_id: extProp,
                name: prop ? jqPanel.find('.select-prop>option[value=' + prop + ']').text() : '',
                extName: jqPanel.data('ext-pname'),
                values: values
            });
        });
        //console.log(map);return;

        if (!canSubmit || !map.length) { return;}
        
        ajax('/cat/relation/relation_props_value_multiple', {
            map: JSON.stringify({
                props: map,
                cat_id: catalogMap.catId,
                ext_cat_id: catalogMap.extCatId,
                platform_id: catalogMap.platformId 
            })
        }).done(function(result){
            if (result.error == 0) {
                $.alert('保存成功!');
            }else{
                //TODO: 保存失败时的处理代码

            }
        });

    }

    //万物分类选择器配置
    var wanwuCatalog = {
        title: '选择万物分类',
        viewTitle: '点击选择类目',
        view: '#wanwuCatalog',
        provider: function(parentObj, callback){
            ajax('/cat/relation/ajax_get_category_list',{
                category_id: parentObj ? parentObj.catId : 0,
                m: Math.random()
            }).done(function(result){
                callback(result);
            });
        },
        adapter: function(data){
            return {
                hasChild: true,
                text: data.catName
            };
        },
        change: catalogChange
    };

    //平台分类选择器配置
    var platformCatalog = {
        title: '选择平台分类',
        viewTitle: '点击选择类目',
        view: '#platformCatalog',
        provider: function(parentObj, callback){
            var platformId = $('#platform').val();
            if (!platformId) { callback(null); return; }

            ajax('/cat/relation/ajax_get_platform_category', {
                platformId: platformId,
                cat_id: parentObj ? parentObj.catId : 0
            }).done(function(data){
                if (data.error_no == '0') {
                    callback(data.list);
                }
            });
        },
        adapter: function(data){
            return {
                hasChild: true,
                text: data.catName
            };
        },
        change: catalogChange
    };

    var wanwuCatalogSelector = new CatalogSelector($.extend({}, wanwuCatalog));

    var platformCatalogSelector = new CatalogSelector($.extend({}, platformCatalog));

    //平台下拉框的值改变时的处理函数
    $('#platform').change(function(){
        platformCatalogSelector.reset();
        catalogChange();
    });

    //点击的关联类目按钮时的处理函数
    $('#btn_relationCatalog').click(function(){
        var map = getCatalogMap();
        ajax('/cat/relation/index', {
            platform_id:  map.platformId,
            wanwu_cat_id: map.catId,
            third_cat_id:  map.extCatId
        }).done(function(result){
            if (result.error == 0) {
                loadProperties();
            }else{
                $.alert('关联失败：' + result.error_tip);
            }
        });
    });

    //属性面板的展开与收缩事件处理函数
    $(body).on('show.bs.collapse hide.bs.collapse', function(e){
        var jqPanel = $(e.target).parents('.panel:first');
            jqSpan = jqPanel.find('a.btn-collapse').children();

        //设置面板左侧按钮的 加号 与 减号 图标  
        jqSpan.removeClass('glyphicon-plus glyphicon-minus');
        switch(e.type){
            case 'show':
                jqSpan.addClass('glyphicon-minus');
                //处理面板展开后的事件
                onPropPanelShow(jqPanel);
            break;
            case 'hide':
                jqSpan.addClass('glyphicon-plus');
            break;
        }
    })
    .on('change', 'select', function(e){
        var jqTarget = $(e.target),
            jqPanel = jqTarget.parents('.panel:first'),
            val = jqTarget.val();

        jqTarget.toggleClass('hasValue', !!val);
        jqPanel.removeClass('has-error panel-danger');
        //jqPanel.find('.collapse').collapse('show');
    })
    .on('change', '.select-prop', function(){
        var jqTarget = $(this),
            jqPanel = jqTarget.parents('.panel:first'),
            jqCollapse = jqPanel.find('.collapse');

        if (jqCollapse.hasClass('in')) {
            onPropPanelShow(jqPanel.removeClass('loaded'));
        }
    })
    .on('click', '#loadProperties', loadProperties);

    $('#saveProp').click(saveProp);


})(
    (function(){
            //读取文档上的 script 标签
        var scriptDoms = document.getElementsByTagName('script'),

            //获取最后一个 srcipt 标签
            currentDom = scriptDoms[ scriptDoms.length - 1 ],

            //获取标签上的 src 属性
            src = currentDom.src,

            //用于匹配 src 中的查询参数
            exp = /(?:\?|&)(\w+)=(.+?)(?=&|$)/ig,

            //匹配结果
            math = null,

            //供当前JS中使用的配置对象
            config = {};

        //循环获取匹配
        while(math = exp.exec(src)){
            //将查询参数的 key 做为配置的属性名称
            config[ math[ 1 ] ] = math[ 2 ];
        }
        return config;
    })(),
    window,
    document,
    document.body
)