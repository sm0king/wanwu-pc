/*
*   这是一个类目选择器的插件，支付固定和弹窗展示，
*   数据的加载由配置传入
*
*/
(function(win, dom, body){    

    //类目选择器的构造函数
    //使用 new CatalogSelector({}) 来初始化一个选择器
    //option: 选择器的配置参数，参考 CatalogSelector.defaultOption 对象
    function CatalogSelector(option){
        //合并 option 与 CatalogSelector.defaultOption
        this.option = option = $.extend({}, CatalogSelector.defaultOption, option);

        //获取容器
        var container = this.container = $(option.container);

        //获取选择器的Dom
        var selector = this.selector = option.appendHtml ? $(CatalogSelector.html).appendTo(container) : container.find('.selectorBar');

        //获取用于展示选择路径的Dom
        this.view = $(option.view);

        //用于左由滑动的容器    
        this.row = selector.find('.selector-row').empty();

        //数据加载时的遮罩
        this.cover = selector.find('#selector-cover');

        //保存用户选择的数据
        this.selected = [];
        
        //生成代理函数，这些函数由于经常做为 Dom 的事件回调，所以先用 $.proxy 函数进行一次封装，以方便使用
        this.showSelector = $.proxy(this, 'showSelector');
        this.hideSelector = $.proxy(this, 'hideSelector');


        this.init();
        this.initEvent();
    }

    CatalogSelector.prototype = {
        //保存用户选择的数据
        selected: null,

        //当前滑动到第几页
        currentPage: 0,

        //数据是否已经初始化
        initData: false,

        //初始化选择器
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
        },

        //初始化选择器的相关事件
        initEvent: function(){
            var view = this.view,
                selector = this.selector,
                option = this.option;

            //如果以弹窗显示，则绑定视图 dom 的点击事件，
            //数据将在第一次弹出时初始化，否则直接初始化数据
            option.pop ? view.click(this.showSelector) : this.loadColumn(null);

            //避免事件冒泡
            selector.click(function(){ return false; })

            //选择一条事件的处理函数
            .delegate('a.selector-option', 'click', $.proxy(this, 'onOptionClick'))

            //点击翻页按钮时的处理函数
            .delegate('a.pagin', 'click', $.proxy(this, 'onPaginationButtonClick'))

            //点击搜索时的处理函数
            .delegate('button.search', 'click', $.proxy(this, 'onSearch'));

        },
        //弹出选择器
        showSelector: function(){
            //使用一个 setTimeout 来避免点击事件冒泡而直接关闭了选择器
            setTimeout($.proxy(function(){

                var view = this.view,
                    viewPos = view.offset(),
                    selector = this.selector,
                    viewHeight = view.outerHeight();

                //将选择器弹出在视图元素的下方，并尽量保存其不超出屏幕
                this.selector.show().css({
                    left: Math.max(Math.min(viewPos.left, body.clientWidth - selector.outerWidth()), 0),
                    top: viewPos.top + viewHeight + 5
                });

                //绑定一个一次性的点击事件，来关闭选择器
                $(body).one('click', this.hideSelector);

                //如果数据没有初始化过，则此时初始化数据
                if (!this.initData) { 
                    this.loadColumn(null);
                }

            }, this),0);
            
        },
        //关闭选择器
        hideSelector: function(e){
            this.selector.hide();
        },
        //当点击了一条数据时的事件处理函数
        onOptionClick: function(e){
            var jqTarget = $(e.currentTarget),
                //读取数据在缓存中的位置
                dataIndex = +jqTarget.data('index'),

                //获取数据所在的列
                jqCol = jqTarget.parents('.selector-col:first'),

                //读取缓存中的数据数组
                dataArr = jqCol.data('dataArr'),

                //获取数据对象
                data = dataArr[ dataIndex ],
                colIndex = jqCol.prevAll().length,
                selected = this.selected,
                prevSelected = selected[ colIndex ],
                option = this.option;


            //如果之前选择过一个数据
            if (prevSelected) {

                //如果当前点击的数据和之前的相同，则函数结束
                if (prevSelected[ 0 ] === jqTarget[ 0 ]) { return; }

                //移除前一个数据的选中状态
                prevSelected.removeClass('active');
                selected.splice(colIndex + 1);

                //清除前一个数据所加载的子级数据
                jqCol.nextAll().remove();
            }

            //将当前选中的数据缓存
            selected[ colIndex ] = jqTarget.addClass('active');

            //如果数据包含子数据，则加载子数据
            jqTarget.hasClass('haschild') && this.loadColumn(data, jqTarget);

            //刷新视图的Dom ,展示用户所选择的类目路径
            this.refreshViewBar();

            //刷新翻页按钮
            this.refreshPaginButtons();

            //调用 change 函数
            $.isFunction(option.change) && option.change(this, data);
        },

        //刷新视图Dom
        refreshViewBar: function(){
            var selected = this.selected,
                html = '',
                title = '';

            //生成 面包屑式的文本
            // XXXX > XXXX > XXXX
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
        //刷新翻页按钮
        refreshPaginButtons: function(){
            var current = this.currentPage,
                jqCols = this.row.children(),
                selector = this.selector,
                option = this.option;

            //设置按钮的启用和禁用状态
            selector.find('a.prev').toggleClass('disable', current <= 0);
            selector.find('a.next').toggleClass('disable', current + option.cols >= jqCols.length);

        },
        //当点击了翻页按钮时的处理函数
        onPaginationButtonClick: function(e){
            var jqTarget = $(e.currentTarget);

            if (jqTarget.hasClass('disable')) { return; }

            var page = this.currentPage;
            jqTarget.hasClass('prev') ? page-- : page++;

            this.setColumn(page, 0);

        },
        //翻页函数
        //colIndex: 将滑动到视口左侧的数据列的索引
        //pos:相对于视口左侧的的列数
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

            //
            this.currentPage = colIndex - pos;
            this.refreshPaginButtons();
        },
        //添加一列数据
        addColumn: function(dataArr, autoFocus){
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

            var jqDom = $(html).data('dataArr', dataArr).find('input').keyup($.proxy(this, 'onSearchInputKeyup')).end();
                index = this.row.append(jqDom).children().length - 1;

            autoFocus !== false && this.setColumn(index, Math.min(option.cols - 1, index));
            return jqDom;
        },
        //加载一列数据
        loadColumn: function(parentObj, jqItem){
            this.initData = true;

            this.loadData(parentObj, function(data){
                if (!data || !data.length) {
                    jqItem && jqItem.removeClass('haschild');
                    return;
                }
                
                this.addColumn(data);
            });
        },
        loadData: function(parentObj, cb){
            var option = this.option,
                provider = option.provider;

            if (!$.isFunction(provider)) { return; }

            this.showCover();

            provider(parentObj, $.proxy(function(data){

                this.hideCover();

                cb.call(this, data);
            }, this));
        },
        //搜索函数
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
        //获取用户所选择的值
        //返回： 以数组形式返回用户依次选择的值
        getValue: function(){
            var selected = this.selected,
                valueArr = [];

            for(var i = 0;i < selected.length;i++){
                var jqOption = selected[ i ],
                    jqCol = jqOption.parents('.selector-col:first'),
                    dataIndex = +jqOption.data('index'),
                    dataArr = jqCol.data('dataArr'),
                    data = dataArr[ dataIndex ];

                data && valueArr.push(data);
            }
            return valueArr;
        },
        //当在搜索框中按下回车时的处理函数
        onSearchInputKeyup: function(e){
            if ((e.keyCode || e.charCode) == 13) {
                this.onSearch(e);
            }
        },
        //重置选择器
        reset: function(autoInit){
            var row = this.row,
                view = this.view,
                option = this.option;

            row.empty();
            view.html('<span class="select-view-title">' + option.viewTitle + '</span>');

            this.currentPage = 0;
            this.selected.length = 0;
            this.initData = false;
            autoInit !== false && !option.pop && this.loadColumn(null);
        },
        //在选择器上显示一个遮罩
        showCover: function(){
            var selector = this.selector,
                cover = this.cover;
            cover.css({
                width: selector.outerWidth(),
                height: selector.outerHeight()
            }).show();

        },
        //隐藏遮罩
        hideCover: function(){
            var cover = this.cover;
            cover.stop(true,true).hide();
        },
        setData: function(searchObj){
            this.reset(false);

            var parentObj = searchObj.parentCat,
                dataSet = [],
                fun = function(){
                    this.loadData(parentObj, function(data){
                        if (!data || !data.length) {
                            finish.call(this);
                            return;
                        }

                        data.checked = searchObj;
                        dataSet.push(data);

                        if (!parentObj) {
                            finish.call(this);
                            return;
                        }

                        parentObj = parentObj.parentCat || null;
                        searchObj = searchObj.parentCat;

                        fun();
                    });
                },
                indexOf = function(arr, catId){
                    for(var i = 0, len = arr.length;i < len;i++){
                        if (arr[ i ].catId == catId) {
                            return i;
                        }
                    }
                    return -1;
                },
                finish = function(){
                    var option = this.option,
                        dataArr = null;

                    while(dataArr = dataSet.pop()){
                        var jqDom = this.addColumn(dataArr),
                            checked = dataArr.checked;

                        if (checked) {
                            var index = indexOf(dataArr, checked.catId);
                            var jqItem = jqDom.children('a').eq(index);
                            jqItem.addClass('active');
                            selected.push(jqItem);
                        }
                    }

                    //刷新视图的Dom ,展示用户所选择的类目路径
                    this.refreshViewBar();

                    //刷新翻页按钮
                    this.refreshPaginButtons();

                    //调用 change 函数
                    $.isFunction(option.change) && option.change(this, data);
                };
            fun();
        }
    };

    CatalogSelector.defaultOption = {
        //选择器一次可展示的列数
        cols: 2,

        //一列数据的宽度和高度，
        //请勿修改这两个值，因为要和样式配套
        colsWidth: 260,
        colsHeight: 300,

        //选择器的标题
        title: '选择',

        //在没有选择任何数据时展示的内容
        viewTitle: '点击选择',

        //用于展示用户已经选择的数据的Dom
        //一个jQuery的选择器或对象
        view: null,

        //选择器是否是弹出展示
        //如果为 true, 请一定要正确配置 view 的值，否则选择器可能弹不出来
        pop: true,

        //是否要将选择器的 html 添加的 container 中
        //除非选择器的 html 做为页面的静态内容输出，否则请不要修改这个值
        appendHtml: true,

        //选择器的 html 将要添加到的容器
        //如果选择器以固定方式展示，则选择器将显示在此元素下
        container: document.body,

        //数据提供函数，选择器的数据源函数
        provider: null,//function(parentObj, callback){  },

        //当将数据生成为 html 时，此函数用于适配不同的类型，以返回相同的格式供选择器使用
        //此函数和 provider 配置配套使用
        adapter: function(d){ return d; },

        //当在选择器中选择了一条数据时的回调函数
        //sender: 选择器对象
        //data: 所选择的数据对象
        change: null//function(sender, data){  }
    };

    CatalogSelector.html =  '<div class="selectorBar">'+
                                '<div class="panel panel-default">'+
                                    '<div class="panel-heading"><a href="javascript:;" class="pagin prev disable"><span class="glyphicon glyphicon-arrow-left"></span></a><span class="selector-title">选择</span><a href="javascript:;" class="pagin next disable"><span class="glyphicon glyphicon-arrow-right"></span></a></div>'+
                                    '<div class="panel-body">'+
                                        '<div class="selector-row"></div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="selector-cover" id="selector-cover"></div>'
                            '</div>';

    window.CatalogSelector = CatalogSelector;
})(
    window,
    document,
    document.body
)