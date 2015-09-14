requirejs.config({
    baseUrl: '../js',
    paths: {
      'config':'config'
    }
})
require(['config'], function() {
  require(['jquery','catalogSelector'], function($) {
    $(function(){
        function ajax(url, data){
            return $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: $.extend({ m: Math.random() }, data)
            });
        }
        var selectorColCount = Math.floor($('.product-catalog').width() / CatalogSelector.defaultOption.colsWidth);
        var keyword = '',
            selector = window.cc = new CatalogSelector({
                pop: false,
                view: '#choice',
                container: $('#selector-container'),
                title: '选择商品类目',
                viewTitle: '',
                cols: selectorColCount,
                colsHeight: 400,
                provider: function(parentObj,callback){
                    ajax('http://123.59.58.104/supplier/product/add/ajax_get_category_list',{
                        category_id: parentObj ? parentObj.catId : 0,
                        m: Math.random()
                    }).done(function(result){
                        callback(result);
                    }).error(function(msg){
                        //debugger;
                        alert('初始化错误，请联系管理员');
                    })
                },
                adapter: function(data){
                    return {
                        hasChild: true,
                        text: data.catName
                    };
                }
            });
        $('#selector').width(selectorColCount * CatalogSelector.defaultOption.colsWidth + 22);
        $('#searchTip').width(selectorColCount * CatalogSelector.defaultOption.colsWidth);

        $('#btn-search').click(function(){
            keyword = $.trim($('#input-groom').val());
            //selector.reset();
            //搜索所有符合的类目
            searchCata(keyword)
        });
        /* 暂时不使用。
        $('#input-groom').keyup(function(e){
            if((e.keyCode || e.charCode) == 13){
                $('#btn-search').click();
                return false;
            }
        });
        */

        $('form').bind('submit',function(){
            return false;
        });

        $('#btn-doNext').click(function(){
            if($($('.selectorBar .active:last')).parent().is('.selector-col:last')){
            }else{
                alert('请正确选择叶子类目');
                return;
            }

        });

        function searchCata(name,callback){
            //url supplier
            $.ajax({
                method: "POST",
                dataType:'json',
                url:"http://123.59.58.104/supplier/product/add/search_category_by_name",
                data:{cat_name:name}
            }).success(function(data){
                var dataLength = data.length;
                if(dataLength > 0){
                    $('#noSearch').hide();
                    $('#search').show();
                    for(var i = 0;i < dataLength;i++){
                        var cataD = fid(data[i],[]);
                        var level = cataD.length;
                        var dataHtml = ""
                        for(var j = level ; j>1 ;j--){
                            dataHtml +=cataD[j-1].text+'<i> >> </i>';
                        }
                        dataHtml += cataD[0].text
                        dataHtml = '<li class="seachData" data="'+i+'">'+dataHtml+'</li>';
                        $("#searchChoice").append(dataHtml);
                    }/*
                    $('#searchChoice').on('click','.seachData',function(){
                        var dID = $(this).attr('data');
                        //window.cc.setData(data[dID]);
                        //var clickData = fid(data[dID],[]);
                        //;

                    })*/
                }else{
                    $('#noSearch').show();
                    $('#search').hide();
                }

                $('#searchTip').slideDown();

            }).error(function(data){
                alert('网络错误或者错误的请求，请联系管理员');
            })
        };
        function fid(data,cataData){
            if(data && data.level>0){
                var isch = data.parentCat ? true:false;
                var tm =[{text:data.catName,hasChild:isch,parentId:data.parentId}]
                cataData = $.merge(cataData,tm)
                return fid(data.parentCat,cataData)
            }else{
                return cataData;
            }
        }
        function fidcataData(data){
            if(data){
                ajax('http://123.59.58.104/supplier/product/add/ajax_get_category_list',{
                    category_id: data.parentId ? data.parentId : 0,
                    m: Math.random()
                }).done(function(result){
                    window.cc.addColumn(result);
                    fidcataData(data.parentCat)
                })
            }else{return false;}
            /*
            window.cc.option.provider:function(parentObj,callback){
                ajax('http://123.59.58.104/supplier/product/add/ajax_get_category_list',{
                    category_id: parentObj ? parentObj.catId : 0,
                    m: Math.random()
                }).done(function(result){
                    callback(result);
                }).error(function(msg){
                    //debugger;
                    alert('初始化错误，请联系管理员');
                })
            }
            */
        }
        //删除提示
        $('#CloseTip').bind('click',function(e){
            $('#searchTip').slideUp();
        })
    });
  })
})
