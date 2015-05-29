(function(config, win, dom, body){    

    function CatalogSelector(option){
        this.option = option = $.extend({}, CatalogSelector.defaultOption, option);

        var selector = this.selector = $(CatalogSelector.html);
        var container = this.container = $(option.container).append(selector);
        this.view = $(option.view);    
        this.row = selector.find('.selector-row').empty();

        this.selected = [];
        

        this.showSelector = $.proxy(this, 'showSelector');
        this.hideSelector = $.proxy(this, 'hideSelector');


        this.init();
    }

    CatalogSelector.prototype = {
        selected: null,
        currentPage: 0,
        initData: false,
        init: function(){
            var selector = this.selector,
                option = this.option;

            selector.find('.selector-title').text(option.title);
            selector.find('.selector-row').css('width', option.cols * option.colsWidth - 10);

            if (option.pop) {
                selector.css({
                    'display': 'none',
                    'position': 'absolute'
                });
            }

            this.initEvent();
        },
        initEvent: function(){
            var view = this.view,
                selector = this.selector,
                option = this.option;

            option.pop && view.click(this.showSelector);
            selector.click(function(){ return false; })
            .delegate('a.selector-option', 'click', $.proxy(this, 'onOptionClick'))
            .delegate('a.pagin', 'click', $.proxy(this, 'onPaginationButtonClick'))
            .delegate('button.search', 'click', $.proxy(this, 'onSearch'));

        },
        showSelector: function(){
                
            setTimeout($.proxy(function(){
                var view = this.view,
                    viewPos = view.offset(),
                    viewHeight = view.outerHeight();

                this.selector.show().css({
                    left: viewPos.left,
                    top: viewPos.top + viewHeight + 5
                });

                $(body).one('click', this.hideSelector);

                if (!this.initData) { 
                    this.loadColumn(null);
                    this.initData = true;
                }

            }, this),0);
            
        },
        hideSelector: function(e){
            this.selector.hide();
        },
        onOptionClick: function(e){
            var jqTarget = $(e.currentTarget),
                dataIndex = +jqTarget.data('index'),
                jqCol = jqTarget.parent(),
                dataArr = jqCol.data('dataArr'),
                data = dataArr[ dataIndex ],
                colIndex = jqCol.prevAll().length,
                selected = this.selected,
                prevSelected = selected[ colIndex ];

            if (prevSelected) {
                if (prevSelected[ 0 ] === jqTarget[ 0 ]) { return; }

                prevSelected.removeClass('active');
                selected.splice(colIndex + 1);
                jqCol.nextAll().remove();
            }

            selected[ colIndex ] = jqTarget.addClass('active');
            jqTarget.hasClass('haschild') && this.loadColumn(data);
            this.refreshViewBar();
            this.refreshPaginButtons();
        },
        refreshViewBar: function(){
            var selected = this.selected,
                html = '',
                title = '';
            for(var i = 0, len = selected.length; i < len; i++){
                if (html) {
                    html += '<span class="catalog-icon">&gt;</span>';
                    title += ' > ';
                }
                html += '<span>' + selected[ i ].text() + '</span>';
                title += selected[ i ].text();
            }
            this.view.html(html).attr('title', title);
        },
        refreshPaginButtons: function(){
            var current = this.currentPage,
                jqCols = this.row.children(),
                selector = this.selector,
                option = this.option;

            selector.find('a.prev').toggleClass('disable', current <= 0);
            selector.find('a.next').toggleClass('disable', current + option.cols >= jqCols.length);

        },
        onPaginationButtonClick: function(e){
            var jqTarget = $(e.currentTarget);

            if (jqTarget.hasClass('disable')) { return; }

            var page = this.currentPage;
            jqTarget.hasClass('prev') ? page-- : page++;
            this.setColumn(page, 0);

        },
        setColumn: function(colIndex, pos){
            if (!pos) {
                pos = 0;
            }

            var row = this.row,
                jqCols = row.children(),
                jqTarget = jqCols.eq(colIndex);

            if (!jqTarget.length) { return; }

            var option = this.option,
                targetPos = -(colIndex - pos) * option.colsWidth;

            row.children(':first').animate({
                'margin-left': targetPos
            }, 500, 'linear');

            this.currentPage = colIndex - pos;
            this.refreshPaginButtons();
        },
        addColumn: function(dataArr){
            var option = this.option,
                fnAdapter = option.adapter;

            var html =  '';
            for(var i = 0, len = dataArr.length;i < len;i++){
                var data = fnAdapter(dataArr[ i ]);
                html += '<a href="javascript:;" data-index="' + i + '" class="selector-option' + (data.hasChild ? ' haschild' : '') + '">' + data.text + '</a>';
            }

            html =  '<div class="selector-col">' +
                        '<div class="input-group">'+
                            '<input type="text" placeholder="搜索" class="form-control"><span class="input-group-btn">'+
                            '<button type="button" class="btn btn-default search">搜索</button></span>'+
                        '</div>' +
                        html +
                    '</div>';

            var index = this.row.append($(html).data('dataArr', dataArr).find('input').keyup($.proxy(this, 'onSearchInputKeyup')).end()).children().length - 1;

            this.setColumn(index, Math.min(option.cols - 1, index));
        },
        loadColumn: function(parentObj){
            var option = this.option,
                provider = option.provider;
            if (!$.isFunction(provider)) { return; }

            provider(parentObj, $.proxy(this, 'addColumn'));
        },
        onSearch: function(e){
            var jqTarget = $(e.currentTarget || e.target),
                jqCol = jqTarget.parents('.selector-col:first'),
                jqInput = jqCol.find('input'),
                val = $.trim(jqInput.val()),
                prevSearch = jqInput.data('keyword');

            if (prevSearch) {
                jqCol.children('a.hidden').removeClass('hidden');
            }

            jqInput.data('keyword', val);

            if (!val) { return; }

            jqCol.children("a:not(.active):not(:contains('" + val + "'))").addClass('hidden');
        },
        getValue: function(){
            var selected = this.selected,
                valueArr = [];

            for(var i = 0;i < selected.length;i++){
                var jqOption = selected[ i ],
                    jqCol = jqOption.parent(),
                    dataIndex = +jqOption.data('index'),
                    dataArr = jqCol.data('dataArr'),
                    data = dataArr[ dataIndex ];

                data && valueArr.push(data);
            }
            return valueArr;
        },
        onSearchInputKeyup: function(e){
            if ((e.keyCode || e.charCode) == 13) {
                this.onSearch(e);
            }
        }
    };



    CatalogSelector.defaultOption = {
        cols: 2,
        colsWidth: 260,
        colsHeight: 200,
        title: '选择',
        view: null,
        pop: true,
        container: document.body,
        adapter: function(d){ return d; }
    };
    CatalogSelector.html =  '<div class="selectorBar">'+
                                '<div class="panel panel-default">'+
                                    '<div class="panel-heading"><a href="javascript:;" class="pagin prev disable"><span class="glyphicon glyphicon-arrow-left"></span></a><span class="selector-title">选择</span><a href="javascript:;" class="pagin next disable"><span class="glyphicon glyphicon-arrow-right"></span></a></div>'+
                                    '<div class="panel-body">'+
                                        '<div class="selector-row"></div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';


    var wanwuCatalog = {
        title: '选择万物分类',
        view: '#wanwuCatalog',
        provider: function(parentObj, callback){
            callback([
                {
                    text: '测试1',
                    hasChild: true
                },
                {
                    text: '测试2',
                    hasChild: false
                }
            ]);
        },
        adapter: function(data){
            return data;
        }
    };

    new CatalogSelector($.extend({}, wanwuCatalog));

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