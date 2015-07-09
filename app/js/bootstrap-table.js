!function(a){"use strict";var b=37,c=null,d=function(a){var b=arguments,c=!0,d=1;return a=a.replace(/%s/g,function(){var a=b[d++];return"undefined"==typeof a?(c=!1,""):a}),c?a:""},e=function(b,c,d,e){var f="";return a.each(b,function(a,b){return b[c]===e?(f=b[d],!1):!0}),f},f=function(b,c){var d=-1;return a.each(b,function(a,b){return b.field===c?(d=a,!1):!0}),d},g=function(){if(null===c){var b,d,e=a("<p/>").addClass("fixed-table-scroll-inner"),f=a("<div/>").addClass("fixed-table-scroll-outer");f.append(e),a("body").append(f),b=e[0].offsetWidth,f.css("overflow","scroll"),d=e[0].offsetWidth,b===d&&(d=f[0].clientWidth),f.remove(),c=b-d}return c},h=function(b,c,d,e){if("string"==typeof c){var f=c.split(".");f.length>1?(c=window,a.each(f,function(a,b){c=c[b]})):c=window[c]}return"object"==typeof c?c:"function"==typeof c?c.apply(b,d):e},i=function(a){return"string"==typeof a?a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):a},j=function(b){var c=0;return b.children().each(function(){c<a(this).outerHeight(!0)&&(c=a(this).outerHeight(!0))}),c},k=function(b,c){this.options=c,this.$el=a(b),this.$el_=this.$el.clone(),this.timeoutId_=0,this.timeoutFooter_=0,this.init()};k.DEFAULTS={classes:"table table-hover",height:void 0,undefinedText:"-",sortName:void 0,sortOrder:"asc",striped:!1,columns:[],data:[],method:"get",url:void 0,ajax:void 0,cache:!0,contentType:"application/json",dataType:"json",ajaxOptions:{},queryParams:function(a){return a},queryParamsType:"limit",responseHandler:function(a){return a},pagination:!1,sidePagination:"client",totalRows:0,pageNumber:1,pageSize:10,pageList:[10,25,50,100],paginationHAlign:"right",paginationVAlign:"bottom",paginationDetailHAlign:"left",paginationFirstText:"&laquo;",paginationPreText:"&lsaquo;",paginationNextText:"&rsaquo;",paginationLastText:"&raquo;",search:!1,searchAlign:"right",selectItemName:"btSelectItem",showHeader:!0,showFooter:!1,showColumns:!1,showPaginationSwitch:!1,showRefresh:!1,showToggle:!1,buttonsAlign:"right",smartDisplay:!0,minimumCountColumns:1,idField:void 0,uniqueId:void 0,cardView:!1,trimOnSearch:!0,clickToSelect:!1,singleSelect:!1,toolbar:void 0,toolbarAlign:"left",checkboxHeader:!0,sortable:!0,maintainSelected:!1,searchTimeOut:500,searchText:"",iconSize:void 0,iconsPrefix:"glyphicon",icons:{paginationSwitchDown:"glyphicon-collapse-down icon-chevron-down",paginationSwitchUp:"glyphicon-collapse-up icon-chevron-up",refresh:"glyphicon-refresh icon-refresh",toggle:"glyphicon-list-alt icon-list-alt",columns:"glyphicon-th icon-th"},rowStyle:function(a,b){return{}},rowAttributes:function(a,b){return{}},onAll:function(a,b){return!1},onClickRow:function(a,b){return!1},onDblClickRow:function(a,b){return!1},onSort:function(a,b){return!1},onCheck:function(a){return!1},onUncheck:function(a){return!1},onCheckAll:function(){return!1},onUncheckAll:function(){return!1},onLoadSuccess:function(a){return!1},onLoadError:function(a){return!1},onColumnSwitch:function(a,b){return!1},onPageChange:function(a,b){return!1},onSearch:function(a){return!1},onToggle:function(a){return!1},onPreBody:function(a){return!1},onPostBody:function(){return!1},onPostHeader:function(){return!1}},k.LOCALES=[],k.LOCALES["en-US"]={formatLoadingMessage:function(){return"Loading, please wait..."},formatRecordsPerPage:function(a){return d("%s records per page",a)},formatShowingRows:function(a,b,c){return d("Showing %s to %s of %s rows",a,b,c)},formatSearch:function(){return"Search"},formatNoMatches:function(){return"No matching records found"},formatPaginationSwitch:function(){return"Hide/Show pagination"},formatRefresh:function(){return"Refresh"},formatToggle:function(){return"Toggle"},formatColumns:function(){return"Columns"},formatAllRows:function(){return"All"}},a.extend(k.DEFAULTS,k.LOCALES["en-US"]),k.COLUMN_DEFAULTS={radio:!1,checkbox:!1,checkboxEnabled:!0,field:void 0,title:void 0,"class":void 0,align:void 0,halign:void 0,falign:void 0,valign:void 0,width:void 0,sortable:!1,order:"asc",visible:!0,switchable:!0,clickToSelect:!0,formatter:void 0,footerFormatter:void 0,events:void 0,sorter:void 0,sortName:void 0,cellStyle:void 0,searchable:!0,cardVisible:!0},k.EVENTS={"all.bs.table":"onAll","click-row.bs.table":"onClickRow","dbl-click-row.bs.table":"onDblClickRow","sort.bs.table":"onSort","check.bs.table":"onCheck","uncheck.bs.table":"onUncheck","check-all.bs.table":"onCheckAll","uncheck-all.bs.table":"onUncheckAll","load-success.bs.table":"onLoadSuccess","load-error.bs.table":"onLoadError","column-switch.bs.table":"onColumnSwitch","page-change.bs.table":"onPageChange","search.bs.table":"onSearch","toggle.bs.table":"onToggle","pre-body.bs.table":"onPreBody","post-body.bs.table":"onPostBody","post-header.bs.table":"onPostHeader"},k.prototype.init=function(){this.initContainer(),this.initTable(),this.initHeader(),this.initData(),this.initFooter(),this.initToolbar(),this.initPagination(),this.initBody(),this.initServer()},k.prototype.initContainer=function(){this.$container=a(['<div class="bootstrap-table">','<div class="fixed-table-toolbar"></div>',"top"===this.options.paginationVAlign||"both"===this.options.paginationVAlign?'<div class="fixed-table-pagination" style="clear: both;"></div>':"",'<div class="fixed-table-container">','<div class="fixed-table-header"><table></table></div>','<div class="fixed-table-body">','<div class="fixed-table-loading">',this.options.formatLoadingMessage(),"</div>","</div>",'<div class="fixed-table-footer"><table><tr></tr></table></div>',"bottom"===this.options.paginationVAlign||"both"===this.options.paginationVAlign?'<div class="fixed-table-pagination"></div>':"","</div>","</div>"].join("")),this.$container.insertAfter(this.$el),this.$container.find(".fixed-table-body").append(this.$el),this.$container.after('<div class="clearfix"></div>'),this.$loading=this.$container.find(".fixed-table-loading"),this.$el.addClass(this.options.classes),this.options.striped&&this.$el.addClass("table-striped"),-1!==a.inArray("table-no-bordered",this.options.classes.split(" "))&&this.$container.find(".fixed-table-container").addClass("table-no-bordered")},k.prototype.initTable=function(){var b=this,c=[],d=[];this.$header=this.$el.find("thead"),this.$header.length||(this.$header=a("<thead></thead>").appendTo(this.$el)),this.$header.find("tr").length||this.$header.append("<tr></tr>"),this.$header.find("th").each(function(){var b=a.extend({},{title:a(this).html(),"class":a(this).attr("class")},a(this).data());c.push(b)}),this.options.columns=a.extend(!0,[],c,this.options.columns),a.each(this.options.columns,function(c,d){b.options.columns[c]=a.extend({},k.COLUMN_DEFAULTS,{field:c},d)}),this.options.data.length||(this.$el.find("tbody tr").each(function(){var c={};c._id=a(this).attr("id"),c._class=a(this).attr("class"),a(this).find("td").each(function(d){var e=b.options.columns[d].field;c[e]=a(this).html(),c["_"+e+"_id"]=a(this).attr("id"),c["_"+e+"_class"]=a(this).attr("class"),c["_"+e+"_data"]=a(this).data()}),d.push(c)}),this.options.data=d)},k.prototype.initHeader=function(){var c=this,e=[],f=[];this.header={fields:[],styles:[],classes:[],formatters:[],events:[],sorters:[],sortNames:[],cellStyles:[],clickToSelects:[],searchables:[]},a.each(this.options.columns,function(a,b){var g="",h="",i="",j="",k=d(' class="%s"',b["class"]),l=(c.options.sortOrder||b.order,"px"),m=b.width;return b.visible?void((!c.options.cardView||b.cardVisible)&&(void 0===b.width||c.options.cardView||"string"==typeof b.width&&-1!==b.width.indexOf("%")&&(l="%"),b.width&&"string"==typeof b.width&&(m=b.width.replace("%","").replace("px","")),h=d("text-align: %s; ",b.halign?b.halign:b.align),i=d("text-align: %s; ",b.align),j=d("vertical-align: %s; ",b.valign),j+=d("width: %s%s; ",b.checkbox||b.radio?36:m,l),e.push(b),c.header.fields.push(b.field),c.header.styles.push(i+j),c.header.classes.push(k),c.header.formatters.push(b.formatter),c.header.events.push(b.events),c.header.sorters.push(b.sorter),c.header.sortNames.push(b.sortName),c.header.cellStyles.push(b.cellStyle),c.header.clickToSelects.push(b.clickToSelect),c.header.searchables.push(b.searchable),f.push("<th",b.checkbox||b.radio?d(' class="bs-checkbox %s"',b["class"]||""):k,d(' style="%s"',h+j),">"),f.push(d('<div class="th-inner %s">',c.options.sortable&&b.sortable?"sortable":"")),g=b.title,c.options.sortName===b.field&&c.options.sortable&&b.sortable&&(g+=c.getCaretHtml()),b.checkbox&&(!c.options.singleSelect&&c.options.checkboxHeader&&(g='<input name="btSelectAll" type="checkbox" />'),c.header.stateField=b.field),b.radio&&(g="",c.header.stateField=b.field,c.options.singleSelect=!0),f.push(g),f.push("</div>"),f.push('<div class="fht-cell"></div>'),f.push("</div>"),f.push("</th>"))):void(b.field===c.options.sortName&&c.header.fields.push(b.field))}),this.$header.find("tr").html(f.join("")),this.$header.find("th").each(function(b){a(this).data(e[b])}),this.$container.off("click",".th-inner").on("click",".th-inner",function(b){c.options.sortable&&a(this).parent().data().sortable&&c.onSort(b)}),!this.options.showHeader||this.options.cardView?(this.$header.hide(),this.$container.find(".fixed-table-header").hide(),this.$loading.css("top",0)):(this.$header.show(),this.$container.find(".fixed-table-header").show(),this.$loading.css("top",b+"px")),this.$selectAll=this.$header.find('[name="btSelectAll"]'),this.$container.off("click",'[name="btSelectAll"]').on("click",'[name="btSelectAll"]',function(){var b=a(this).prop("checked");c[b?"checkAll":"uncheckAll"]()})},k.prototype.initFooter=function(){this.$footer=this.$container.find(".fixed-table-footer"),!this.options.showFooter||this.options.cardView?this.$footer.hide():this.$footer.show()},k.prototype.initData=function(a,b){"append"===b?this.data=this.data.concat(a):"prepend"===b?this.data=[].concat(a).concat(this.data):this.data=a||this.options.data,this.options.data=this.data,"server"!==this.options.sidePagination&&this.initSort()},k.prototype.initSort=function(){var b=this,c=this.options.sortName,d="desc"===this.options.sortOrder?-1:1,e=a.inArray(this.options.sortName,this.header.fields);-1!==e&&this.data.sort(function(f,g){b.header.sortNames[e]&&(c=b.header.sortNames[e]);var i=f[c],j=g[c],k=h(b.header,b.header.sorters[e],[i,j]);return void 0!==k?d*k:((void 0===i||null===i)&&(i=""),(void 0===j||null===j)&&(j=""),a.isNumeric(i)&&a.isNumeric(j)?(i=parseFloat(i),j=parseFloat(j),j>i?-1*d:d):i===j?0:("string"!=typeof i&&(i=i.toString()),-1===i.localeCompare(j)?-1*d:d))})},k.prototype.onSort=function(b){var c=a(b.currentTarget).parent(),d=this.$header.find("th").eq(c.index());return this.$header.add(this.$header_).find("span.order").remove(),this.options.sortName===c.data("field")?this.options.sortOrder="asc"===this.options.sortOrder?"desc":"asc":(this.options.sortName=c.data("field"),this.options.sortOrder="asc"===c.data("order")?"desc":"asc"),this.trigger("sort",this.options.sortName,this.options.sortOrder),c.add(d).data("order",this.options.sortOrder).find(".th-inner").append(this.getCaretHtml()),"server"===this.options.sidePagination?void this.initServer():(this.initSort(),void this.initBody())},k.prototype.initToolbar=function(){var b,c,e=this,g=[],i=0,j=0;this.$toolbar=this.$container.find(".fixed-table-toolbar").html(""),"string"==typeof this.options.toolbar&&a(d('<div class="bars pull-%s"></div>',this.options.toolbarAlign)).appendTo(this.$toolbar).append(a(this.options.toolbar)),g=[d('<div class="columns columns-%s btn-group pull-%s">',this.options.buttonsAlign,this.options.buttonsAlign)],"string"==typeof this.options.icons&&(this.options.icons=h(null,this.options.icons)),this.options.showPaginationSwitch&&g.push(d('<button class="btn btn-default" type="button" name="paginationSwitch" title="%s">',this.options.formatPaginationSwitch()),d('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.paginationSwitchDown),"</button>"),this.options.showRefresh&&g.push(d('<button class="btn btn-default'+(void 0===this.options.iconSize?"":" btn-"+this.options.iconSize)+'" type="button" name="refresh" title="%s">',this.options.formatRefresh()),d('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.refresh),"</button>"),this.options.showToggle&&g.push(d('<button class="btn btn-default'+(void 0===this.options.iconSize?"":" btn-"+this.options.iconSize)+'" type="button" name="toggle" title="%s">',this.options.formatToggle()),d('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.toggle),"</button>"),this.options.showColumns&&(g.push(d('<div class="keep-open btn-group" title="%s">',this.options.formatColumns()),'<button type="button" class="btn btn-default'+(void 0==this.options.iconSize?"":" btn-"+this.options.iconSize)+' dropdown-toggle" data-toggle="dropdown">',d('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.columns),' <span class="caret"></span>',"</button>",'<ul class="dropdown-menu" role="menu">'),a.each(this.options.columns,function(a,b){if(!(b.radio||b.checkbox||e.options.cardView&&!b.cardVisible)){var c=b.visible?' checked="checked"':"";b.switchable&&(g.push(d('<li><label><input type="checkbox" data-field="%s" value="%s"%s> %s</label></li>',b.field,a,c,b.title)),j++)}}),g.push("</ul>","</div>")),g.push("</div>"),(this.showToolbar||g.length>2)&&this.$toolbar.append(g.join("")),this.options.showPaginationSwitch&&this.$toolbar.find('button[name="paginationSwitch"]').off("click").on("click",a.proxy(this.togglePagination,this)),this.options.showRefresh&&this.$toolbar.find('button[name="refresh"]').off("click").on("click",a.proxy(this.refresh,this)),this.options.showToggle&&this.$toolbar.find('button[name="toggle"]').off("click").on("click",function(){e.toggleView()}),this.options.showColumns&&(b=this.$toolbar.find(".keep-open"),j<=this.options.minimumCountColumns&&b.find("input").prop("disabled",!0),b.find("li").off("click").on("click",function(a){a.stopImmediatePropagation()}),b.find("input").off("click").on("click",function(){var b=a(this);e.toggleColumn(f(e.options.columns,a(this).data("field")),b.prop("checked"),!1),e.trigger("column-switch",a(this).data("field"),b.prop("checked"))})),this.options.search&&(g=[],g.push('<div class="pull-'+this.options.searchAlign+' search">',d('<input class="form-control'+(void 0===this.options.iconSize?"":" input-"+this.options.iconSize)+'" type="text" placeholder="%s">',this.options.formatSearch()),"</div>"),this.$toolbar.append(g.join("")),c=this.$toolbar.find(".search input"),c.off("keyup drop").on("keyup drop",function(a){clearTimeout(i),i=setTimeout(function(){e.onSearch(a)},e.options.searchTimeOut)}),""!==this.options.searchText&&(c.val(this.options.searchText),clearTimeout(i),i=setTimeout(function(){c.trigger("keyup")},e.options.searchTimeOut)))},k.prototype.onSearch=function(b){var c=a.trim(a(b.currentTarget).val());this.options.trimOnSearch&&a(b.currentTarget).val()!==c&&a(b.currentTarget).val(c),c!==this.searchText&&(this.searchText=c,this.options.pageNumber=1,this.initSearch(),this.updatePagination(),this.trigger("search",c))},k.prototype.initSearch=function(){var b=this;if("server"!==this.options.sidePagination){var c=this.searchText&&this.searchText.toLowerCase(),d=a.isEmptyObject(this.filterColumns)?null:this.filterColumns;this.data=d?a.grep(this.options.data,function(a,b){for(var c in d)if(a[c]!==d[c])return!1;return!0}):this.options.data,this.data=c?a.grep(this.data,function(d,e){for(var f in d){f=a.isNumeric(f)?parseInt(f,10):f;var g=d[f];g=h(b.header,b.header.formatters[a.inArray(f,b.header.fields)],[g,d,e],g);var i=a.inArray(f,b.header.fields);if(-1!==i&&b.header.searchables[i]&&("string"==typeof g||"number"==typeof g)&&-1!==(g+"").toLowerCase().indexOf(c))return!0}return!1}):this.data}},k.prototype.initPagination=function(){if(this.$pagination=this.$container.find(".fixed-table-pagination"),!this.options.pagination)return void this.$pagination.hide();this.$pagination.show();var b,c,e,f,g,h,i,j,k,l=this,m=[],n=!1,o=this.getData();if("server"!==this.options.sidePagination&&(this.options.totalRows=o.length),this.totalPages=0,this.options.totalRows){if(this.options.pageSize===this.options.formatAllRows())this.options.pageSize=this.options.totalRows,n=!0;else if(this.options.pageSize===this.options.totalRows){var p="string"==typeof this.options.pageList?this.options.pageList.replace("[","").replace("]","").replace(/ /g,"").toLowerCase().split(","):this.options.pageList;p.indexOf(this.options.formatAllRows().toLowerCase())>-1&&(n=!0)}this.totalPages=~~((this.options.totalRows-1)/this.options.pageSize)+1,this.options.totalPages=this.totalPages}this.totalPages>0&&this.options.pageNumber>this.totalPages&&(this.options.pageNumber=this.totalPages),this.pageFrom=(this.options.pageNumber-1)*this.options.pageSize+1,this.pageTo=this.options.pageNumber*this.options.pageSize,this.pageTo>this.options.totalRows&&(this.pageTo=this.options.totalRows),m.push('<div class="pull-'+this.options.paginationDetailHAlign+' pagination-detail">','<span class="pagination-info">',this.options.formatShowingRows(this.pageFrom,this.pageTo,this.options.totalRows),"</span>"),m.push('<span class="page-list">');var q=[d('<span class="btn-group %s">',"top"===this.options.paginationVAlign||"both"===this.options.paginationVAlign?"dropdown":"dropup"),'<button type="button" class="btn btn-default '+(void 0===this.options.iconSize?"":" btn-"+this.options.iconSize)+' dropdown-toggle" data-toggle="dropdown">','<span class="page-size">',n?this.options.formatAllRows():this.options.pageSize,"</span>",' <span class="caret"></span>',"</button>",'<ul class="dropdown-menu" role="menu">'],r=this.options.pageList;if("string"==typeof this.options.pageList){var s=this.options.pageList.replace("[","").replace("]","").replace(/ /g,"").split(",");r=[],a.each(s,function(a,b){r.push(b.toUpperCase()===l.options.formatAllRows().toUpperCase()?l.options.formatAllRows():+b)})}for(a.each(r,function(a,b){if(!l.options.smartDisplay||0===a||r[a-1]<=l.options.totalRows){var c;c=n?b===l.options.formatAllRows()?' class="active"':"":b===l.options.pageSize?' class="active"':"",q.push(d('<li%s><a href="javascript:void(0)">%s</a></li>',c,b))}}),q.push("</ul></span>"),m.push(this.options.formatRecordsPerPage(q.join(""))),m.push("</span>"),m.push("</div>",'<div class="pull-'+this.options.paginationHAlign+' pagination">','<ul class="pagination'+(void 0===this.options.iconSize?"":" pagination-"+this.options.iconSize)+'">','<li class="page-first"><a href="javascript:void(0)">'+this.options.paginationFirstText+"</a></li>",'<li class="page-pre"><a href="javascript:void(0)">'+this.options.paginationPreText+"</a></li>"),this.totalPages<5?(c=1,e=this.totalPages):(c=this.options.pageNumber-2,e=c+4,1>c&&(c=1,e=5),e>this.totalPages&&(e=this.totalPages,c=e-4)),b=c;e>=b;b++)m.push('<li class="page-number'+(b===this.options.pageNumber?" active":"")+'">','<a href="javascript:void(0)">',b,"</a>","</li>");m.push('<li class="page-next"><a href="javascript:void(0)">'+this.options.paginationNextText+"</a></li>",'<li class="page-last"><a href="javascript:void(0)">'+this.options.paginationLastText+"</a></li>","</ul>","</div>"),this.$pagination.html(m.join("")),f=this.$pagination.find(".page-list a"),g=this.$pagination.find(".page-first"),h=this.$pagination.find(".page-pre"),i=this.$pagination.find(".page-next"),j=this.$pagination.find(".page-last"),k=this.$pagination.find(".page-number"),this.options.pageNumber<=1&&(g.addClass("disabled"),h.addClass("disabled")),this.options.pageNumber>=this.totalPages&&(i.addClass("disabled"),j.addClass("disabled")),this.options.smartDisplay&&(this.totalPages<=1&&this.$pagination.find("div.pagination").hide(),(r.length<2||this.options.totalRows<=r[0])&&this.$pagination.find("span.page-list").hide(),this.$pagination[this.getData().length?"show":"hide"]()),n&&(this.options.pageSize=this.options.formatAllRows()),f.off("click").on("click",a.proxy(this.onPageListChange,this)),g.off("click").on("click",a.proxy(this.onPageFirst,this)),h.off("click").on("click",a.proxy(this.onPagePre,this)),i.off("click").on("click",a.proxy(this.onPageNext,this)),j.off("click").on("click",a.proxy(this.onPageLast,this)),k.off("click").on("click",a.proxy(this.onPageNumber,this))},k.prototype.updatePagination=function(b){b&&a(b.currentTarget).hasClass("disabled")||(this.options.maintainSelected||this.resetRows(),this.initPagination(),"server"===this.options.sidePagination?this.initServer():this.initBody(),this.trigger("page-change",this.options.pageNumber,this.options.pageSize))},k.prototype.onPageListChange=function(b){var c=a(b.currentTarget);c.parent().addClass("active").siblings().removeClass("active"),this.options.pageSize=c.text().toUpperCase()===this.options.formatAllRows().toUpperCase()?this.options.formatAllRows():+c.text(),this.$toolbar.find(".page-size").text(this.options.pageSize),this.updatePagination(b)},k.prototype.onPageFirst=function(a){this.options.pageNumber=1,this.updatePagination(a)},k.prototype.onPagePre=function(a){this.options.pageNumber--,this.updatePagination(a)},k.prototype.onPageNext=function(a){this.options.pageNumber++,this.updatePagination(a)},k.prototype.onPageLast=function(a){this.options.pageNumber=this.totalPages,this.updatePagination(a)},k.prototype.onPageNumber=function(b){this.options.pageNumber!==+a(b.currentTarget).text()&&(this.options.pageNumber=+a(b.currentTarget).text(),this.updatePagination(b))},k.prototype.initBody=function(b){var c=this,g=[],j=this.getData();this.trigger("pre-body",j),this.$body=this.$el.find("tbody"),this.$body.length||(this.$body=a("<tbody></tbody>").appendTo(this.$el)),this.options.pagination&&"server"!==this.options.sidePagination||(this.pageFrom=1,this.pageTo=j.length);for(var k=this.pageFrom-1;k<this.pageTo;k++){var l,m=j[k],n={},o=[],p={},q=[];if(n=h(this.options,this.options.rowStyle,[m,k],n),n&&n.css)for(l in n.css)o.push(l+": "+n.css[l]);if(p=h(this.options,this.options.rowAttributes,[m,k],p))for(l in p)q.push(d('%s="%s"',l,i(p[l])));g.push("<tr",d(" %s",q.join(" ")),d(' id="%s"',a.isArray(m)?void 0:m._id),d(' class="%s"',n.classes||(a.isArray(m)?void 0:m._class)),d(' data-index="%s"',k),d(' data-unique-id="%s"',m[this.options.uniqueId]),">"),this.options.cardView&&g.push(d('<td colspan="%s">',this.header.fields.length)),a.each(this.header.fields,function(b,i){var j="",l=m[i],p="",q={},r="",s=c.header.classes[b],t="",u=c.options.columns[f(c.options.columns,i)];if(n=d('style="%s"',o.concat(c.header.styles[b]).join("; ")),l=h(c.header,c.header.formatters[b],[l,m,k],l),m["_"+i+"_id"]&&(r=d(' id="%s"',m["_"+i+"_id"])),m["_"+i+"_class"]&&(s=d(' class="%s"',m["_"+i+"_class"])),q=h(c.header,c.header.cellStyles[b],[l,m,k],q),q.classes&&(s=d(' class="%s"',q.classes)),q.css){var v=[];for(var w in q.css)v.push(w+": "+q.css[w]);n=d('style="%s"',v.concat(c.header.styles[b]).join("; "))}m["_"+i+"_data"]&&!a.isEmptyObject(m["_"+i+"_data"])&&a.each(m["_"+i+"_data"],function(a,b){"index"!==a&&(t+=d(' data-%s="%s"',a,b))}),u.checkbox||u.radio?(p=u.checkbox?"checkbox":p,p=u.radio?"radio":p,j=[c.options.cardView?'<div class="card-view">':'<td class="bs-checkbox">',"<input"+d(' data-index="%s"',k)+d(' name="%s"',c.options.selectItemName)+d(' type="%s"',p)+d(' value="%s"',m[c.options.idField])+d(' checked="%s"',l===!0||l&&l.checked?"checked":void 0)+d(' disabled="%s"',!u.checkboxEnabled||l&&l.disabled?"disabled":void 0)+" />",c.options.cardView?"</div>":"</td>"].join(""),m[c.header.stateField]=l===!0||l&&l.checked):(l="undefined"==typeof l||null===l?c.options.undefinedText:l,j=c.options.cardView?['<div class="card-view">',c.options.showHeader?d('<span class="title" %s>%s</span>',n,e(c.options.columns,"field","title",i)):"",d('<span class="value">%s</span>',l),"</div>"].join(""):[d("<td%s %s %s %s>",r,s,n,t),l,"</td>"].join(""),c.options.cardView&&c.options.smartDisplay&&""===l&&(j="")),g.push(j)}),this.options.cardView&&g.push("</td>"),g.push("</tr>")}g.length||g.push('<tr class="no-records-found">',d('<td colspan="%s">%s</td>',this.header.fields.length,this.options.formatNoMatches()),"</tr>"),this.$body.html(g.join("")),b||this.scrollTo(0),this.$body.find("> tr > td").off("click").on("click",function(){var b=a(this).parent();c.trigger("click-row",c.data[b.data("index")],b),c.options.clickToSelect&&c.header.clickToSelects[b.children().index(a(this))]&&b.find(d('[name="%s"]',c.options.selectItemName))[0].click()}),this.$body.find("tr").off("dblclick").on("dblclick",function(){c.trigger("dbl-click-row",c.data[a(this).data("index")],a(this))}),this.$selectItem=this.$body.find(d('[name="%s"]',this.options.selectItemName)),this.$selectItem.off("click").on("click",function(b){b.stopImmediatePropagation();var d=a(this).prop("checked"),e=c.data[a(this).data("index")];e[c.header.stateField]=d,c.trigger(d?"check":"uncheck",e),c.options.singleSelect&&(c.$selectItem.not(this).each(function(){c.data[a(this).data("index")][c.header.stateField]=!1}),c.$selectItem.filter(":checked").not(this).prop("checked",!1)),c.updateSelected()}),a.each(this.header.events,function(b,d){if(d){"string"==typeof d&&(d=h(null,d));for(var e in d)c.$body.find("tr").each(function(){var f=a(this),g=f.find(c.options.cardView?".card-view":"td").eq(b),h=e.indexOf(" "),i=e.substring(0,h),j=e.substring(h+1),k=d[e];g.find(j).off(i).on(i,function(a){var d=f.data("index"),e=c.data[d],g=e[c.header.fields[b]];k.apply(this,[a,g,e,d])})})}}),this.updateSelected(),this.resetView(),this.trigger("post-body")},k.prototype.initServer=function(b,c){var d,e=this,f={},g={pageSize:this.options.pageSize===this.options.formatAllRows()?this.options.totalRows:this.options.pageSize,pageNumber:this.options.pageNumber,searchText:this.searchText,sortName:this.options.sortName,sortOrder:this.options.sortOrder};(this.options.url||this.options.ajax)&&("limit"===this.options.queryParamsType&&(g={search:g.searchText,sort:g.sortName,order:g.sortOrder},this.options.pagination&&(g.limit=this.options.pageSize===this.options.formatAllRows()?this.options.totalRows:this.options.pageSize,g.offset=this.options.pageSize===this.options.formatAllRows()?0:this.options.pageSize*(this.options.pageNumber-1))),a.isEmptyObject(this.filterColumnsPartial)||(g.filter=JSON.stringify(this.filterColumnsPartial,null)),f=h(this.options,this.options.queryParams,[g],f),a.extend(f,c||{}),f!==!1&&(b||this.$loading.show(),d=a.extend({},h(null,this.options.ajaxOptions),{type:this.options.method,url:this.options.url,data:"application/json"===this.options.contentType&&"post"===this.options.method?JSON.stringify(f):f,cache:this.options.cache,contentType:this.options.contentType,dataType:this.options.dataType,success:function(a){a=h(e.options,e.options.responseHandler,[a],a),e.load(a),e.trigger("load-success",a)},error:function(a){e.trigger("load-error",a.status)},complete:function(){b||e.$loading.hide()}}),this.options.ajax?h(this,this.options.ajax,[d],null):a.ajax(d)))},k.prototype.getCaretHtml=function(){return['<span class="order'+("desc"===this.options.sortOrder?"":" dropup")+'">','<span class="caret" style="margin: 10px 5px;"></span>',"</span>"].join("")},k.prototype.updateSelected=function(){var b=this.$selectItem.filter(":enabled").length===this.$selectItem.filter(":enabled").filter(":checked").length;this.$selectAll.add(this.$selectAll_).prop("checked",b),this.$selectItem.each(function(){a(this).parents("tr")[a(this).prop("checked")?"addClass":"removeClass"]("selected")})},k.prototype.updateRows=function(){var b=this;this.$selectItem.each(function(){b.data[a(this).data("index")][b.header.stateField]=a(this).prop("checked")})},k.prototype.resetRows=function(){var b=this;a.each(this.data,function(a,c){b.$selectAll.prop("checked",!1),b.$selectItem.prop("checked",!1),c[b.header.stateField]=!1})},k.prototype.trigger=function(b){var c=Array.prototype.slice.call(arguments,1);b+=".bs.table",this.options[k.EVENTS[b]].apply(this.options,c),this.$el.trigger(a.Event(b),c),this.options.onAll(b,c),this.$el.trigger(a.Event("all.bs.table"),[b,c])},k.prototype.resetHeader=function(){clearTimeout(this.timeoutId_),this.timeoutId_=setTimeout(a.proxy(this.fitHeader,this),this.$el.is(":hidden")?100:0)},k.prototype.fitHeader=function(){var b,c,d,e,f=this;return f.$el.is(":hidden")?void(f.timeoutFooter_=setTimeout(a.proxy(f.fitHeader,f),100)):(b=this.$container.find(".fixed-table-header"),c=this.$container.find(".fixed-table-body"),d=c.get(0),e=d.scrollWidth>d.clientWidth&&d.scrollHeight>d.clientHeight+this.$header.height()?g():0,this.$el.css("margin-top",-this.$header.height()),this.$header_=this.$header.clone(!0,!0),this.$selectAll_=this.$header_.find('[name="btSelectAll"]'),b.css({"margin-right":e}).find("table").css("width",this.$el.css("width")).html("").attr("class",this.$el.attr("class")).append(this.$header_),this.$header.find("th").each(function(b){f.$header_.find("th").eq(b).data(a(this).data())}),this.$body.find("tr:first-child:not(.no-records-found) > *").each(function(b){f.$header_.find("div.fht-cell").eq(b).width(a(this).innerWidth())}),c.off("scroll").on("scroll",function(){b.scrollLeft(a(this).scrollLeft())}),void f.trigger("post-header"))},k.prototype.resetFooter=function(){var b=this,c=b.getData(),e=[];this.options.showFooter&&!this.options.cardView&&(a.each(this.options.columns,function(a,f){var g="",i="",j=d(' class="%s"',f["class"]);f.visible&&(!b.options.cardView||f.cardVisible)&&(g=d("text-align: %s; ",f.falign?f.falign:f.align),i=d("vertical-align: %s; ",f.valign),e.push("<td",j,d(' style="%s"',g+i),">"),e.push(h(f,f.footerFormatter,[c],"&nbsp;")||"&nbsp;"),e.push("</td>"))}),this.$footer.find("tr").html(e.join("")),clearTimeout(this.timeoutFooter_),this.timeoutFooter_=setTimeout(a.proxy(this.fitFooter,this),this.$el.is(":hidden")?100:0))},k.prototype.fitFooter=function(){var b,c,d,e;return clearTimeout(this.timeoutFooter_),this.$el.is(":hidden")?void(this.timeoutFooter_=setTimeout(a.proxy(this.fitFooter,this),100)):(b=this.$container.find(".fixed-table-body"),d=this.$el.css("width"),e=d>b.width()?g():0,this.$footer.css({"margin-right":e}).find("table").css("width",d).attr("class",this.$el.attr("class")),c=this.$footer.find("td"),void b.find("tbody tr:first-child:not(.no-records-found) > td").each(function(b){c.eq(b).outerWidth(a(this).outerWidth())}))},k.prototype.toggleColumn=function(a,b,c){if(-1!==a&&(this.options.columns[a].visible=b,this.initHeader(),this.initSearch(),this.initPagination(),this.initBody(),this.options.showColumns)){var e=this.$toolbar.find(".keep-open input").prop("disabled",!1);c&&e.filter(d('[value="%s"]',a)).prop("checked",b),e.filter(":checked").length<=this.options.minimumCountColumns&&e.filter(":checked").prop("disabled",!0)}},k.prototype.toggleRow=function(b,c,e){-1!==b&&a(this.$body[0]).children().filter(d(c?'[data-unique-id="%s"]':'[data-index="%s"]',b))[e?"show":"hide"]()},k.prototype.resetView=function(a){var c=this,d=0,e=c.$container.find(".fixed-table-container");if(a&&a.height&&(this.options.height=a.height),this.$selectAll.prop("checked",this.$selectItem.length>0&&this.$selectItem.length===this.$selectItem.filter(":checked").length),this.options.height){var f=j(this.$toolbar),g=j(this.$pagination),h=this.options.height-f-g;e.css("height",h+"px")}return this.options.cardView?(c.$el.css("margin-top","0"),void e.css("padding-bottom","0")):(this.options.showHeader&&this.options.height?(this.$container.find(".fixed-table-header").show(),this.resetHeader(),d+=b):(this.$container.find(".fixed-table-header").hide(),this.trigger("post-header")),this.options.showFooter&&(this.resetFooter(),this.options.height&&(d+=b)),void e.css("padding-bottom",d+"px"))},k.prototype.getData=function(b){return!this.searchText&&a.isEmptyObject(this.filterColumns)&&a.isEmptyObject(this.filterColumnsPartial)?b?this.options.data.slice(this.pageFrom-1,this.pageTo):this.options.data:b?this.data.slice(this.pageFrom-1,this.pageTo):this.data},k.prototype.load=function(b){var c=!1;"server"===this.options.sidePagination?(this.options.totalRows=b.total,c=b.fixedScroll,
b=b.rows):a.isArray(b)||(c=b.fixedScroll,b=b.data),this.initData(b),this.initSearch(),this.initPagination(),this.initBody(c)},k.prototype.append=function(a){this.initData(a,"append"),this.initSearch(),this.initPagination(),this.initBody(!0)},k.prototype.prepend=function(a){this.initData(a,"prepend"),this.initSearch(),this.initPagination(),this.initBody(!0)},k.prototype.remove=function(b){var c,d,e=this.options.data.length;if(b.hasOwnProperty("field")&&b.hasOwnProperty("values")){for(c=e-1;c>=0;c--)d=this.options.data[c],d.hasOwnProperty(b.field)&&-1!==a.inArray(d[b.field],b.values)&&this.options.data.splice(c,1);e!==this.options.data.length&&(this.initSearch(),this.initPagination(),this.initBody(!0))}},k.prototype.insertRow=function(a){a.hasOwnProperty("index")&&a.hasOwnProperty("row")&&(this.data.splice(a.index,0,a.row),this.initSearch(),this.initPagination(),this.initBody(!0))},k.prototype.updateRow=function(b){b.hasOwnProperty("index")&&b.hasOwnProperty("row")&&(a.extend(this.data[b.index],b.row),this.initBody(!0))},k.prototype.showRow=function(a){a.hasOwnProperty("index")&&this.toggleRow(a.index,void 0===a.isIdField?!1:!0,!0)},k.prototype.hideRow=function(a){a.hasOwnProperty("index")&&this.toggleRow(a.index,void 0===a.isIdField?!1:!0,!1)},k.prototype.getRowsHidden=function(b){var c=a(this.$body[0]).children().filter(":hidden"),d=0;if(b)for(;d<c.length;d++)a(c[d]).show();return c},k.prototype.mergeCells=function(b){var c,d,e=b.index,f=a.inArray(b.field,this.header.fields),g=b.rowspan||1,h=b.colspan||1,i=this.$body.find("tr"),j=i.eq(e).find("td").eq(f);if(!(0>e||0>f||e>=this.data.length)){for(c=e;e+g>c;c++)for(d=f;f+h>d;d++)i.eq(c).find("td").eq(d).hide();j.attr("rowspan",g).attr("colspan",h).show()}},k.prototype.getOptions=function(){return this.options},k.prototype.getSelections=function(){var b=this;return a.grep(this.data,function(a){return a[b.header.stateField]})},k.prototype.checkAll=function(){this.checkAll_(!0)},k.prototype.uncheckAll=function(){this.checkAll_(!1)},k.prototype.checkAll_=function(a){var b;a||(b=this.getSelections()),this.$selectItem.filter(":enabled").prop("checked",a),this.updateRows(),this.updateSelected(),a&&(b=this.getSelections()),this.trigger(a?"check-all":"uncheck-all",b)},k.prototype.check=function(a){this.check_(!0,a)},k.prototype.uncheck=function(a){this.check_(!1,a)},k.prototype.check_=function(a,b){this.$selectItem.filter(d('[data-index="%s"]',b)).prop("checked",a),this.data[b][this.header.stateField]=a,this.updateSelected(),this.trigger(a?"check":"uncheck",this.data[b])},k.prototype.checkBy=function(a){this.checkBy_(!0,a)},k.prototype.uncheckBy=function(a){this.checkBy_(!1,a)},k.prototype.checkBy_=function(b,c){if(c.hasOwnProperty("field")&&c.hasOwnProperty("values")){var e=this;a.each(this.options.data,function(f,g){return g.hasOwnProperty(c.field)?void(-1!==a.inArray(g[c.field],c.values)&&(e.$selectItem.filter(d('[data-index="%s"]',f)).prop("checked",b),g[e.header.stateField]=b,e.trigger(b?"check":"uncheck",g))):!1}),this.updateSelected()}},k.prototype.destroy=function(){this.$el.insertBefore(this.$container),a(this.options.toolbar).insertBefore(this.$el),this.$container.next().remove(),this.$container.remove(),this.$el.html(this.$el_.html()).css("margin-top","0").attr("class",this.$el_.attr("class")||"")},k.prototype.showLoading=function(){this.$loading.show()},k.prototype.hideLoading=function(){this.$loading.hide()},k.prototype.togglePagination=function(){this.options.pagination=!this.options.pagination;var a=this.$toolbar.find('button[name="paginationSwitch"] i');this.options.pagination?a.attr("class",this.options.iconsPrefix+" "+this.options.icons.paginationSwitchDown):a.attr("class",this.options.iconsPrefix+" "+this.options.icons.paginationSwitchUp),this.updatePagination()},k.prototype.refresh=function(a){a&&a.url&&(this.options.url=a.url,this.options.pageNumber=1),this.initServer(a&&a.silent,a&&a.query)},k.prototype.resetWidth=function(){this.options.showHeader&&this.options.height&&this.fitHeader(),this.options.showFooter&&this.fitFooter()},k.prototype.showColumn=function(a){this.toggleColumn(f(this.options.columns,a),!0,!0)},k.prototype.hideColumn=function(a){this.toggleColumn(f(this.options.columns,a),!1,!0)},k.prototype.filterBy=function(b){this.filterColumns=a.isEmptyObject(b)?{}:b,this.options.pageNumber=1,this.initSearch(),this.updatePagination()},k.prototype.scrollTo=function(a){var b=this.$container.find(".fixed-table-body");return"string"==typeof a&&(a="bottom"===a?b[0].scrollHeight:0),"number"==typeof a&&b.scrollTop(a),void 0===typeof a?b.scrollTop():void 0},k.prototype.getScrollPosition=function(){return this.scrollTo()},k.prototype.selectPage=function(a){a>0&&a<=this.options.totalPages&&(this.options.pageNumber=a,this.updatePagination())},k.prototype.prevPage=function(){this.options.pageNumber>1&&(this.options.pageNumber--,this.updatePagination())},k.prototype.nextPage=function(){this.options.pageNumber<this.options.totalPages&&(this.options.pageNumber++,this.updatePagination())},k.prototype.toggleView=function(){this.options.cardView=!this.options.cardView,this.initHeader(),this.initBody(),this.trigger("toggle",this.options.cardView)};var l=["getOptions","getSelections","getData","load","append","prepend","remove","insertRow","updateRow","showRow","hideRow","getRowsHidden","mergeCells","checkAll","uncheckAll","check","uncheck","checkBy","uncheckBy","refresh","resetView","resetWidth","destroy","showLoading","hideLoading","showColumn","hideColumn","filterBy","scrollTo","getScrollPosition","selectPage","prevPage","nextPage","togglePagination","toggleView"];a.fn.bootstrapTable=function(b,c){var d;return this.each(function(){var e=a(this),f=e.data("bootstrap.table"),g=a.extend({},k.DEFAULTS,e.data(),"object"==typeof b&&b);if("string"==typeof b){if(a.inArray(b,l)<0)throw new Error("Unknown method: "+b);if(!f)return;d=f[b](c),"destroy"===b&&e.removeData("bootstrap.table")}f||e.data("bootstrap.table",f=new k(this,g))}),"undefined"==typeof d?this:d},a.fn.bootstrapTable.Constructor=k,a.fn.bootstrapTable.defaults=k.DEFAULTS,a.fn.bootstrapTable.columnDefaults=k.COLUMN_DEFAULTS,a.fn.bootstrapTable.locales=k.LOCALES,a.fn.bootstrapTable.methods=l,a(function(){a('[data-toggle="table"]').bootstrapTable()})}(jQuery);
/* sm0king 最后修改于：2015-07-09 */
