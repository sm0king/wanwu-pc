$(function(){UE.getEditor("productDetail");$("#tagsinput").tagsInput(),$("#flags").delegate("button","click",function(a){var b=$(this).text();$("#tagsinput").tagExist(b)?($("#tagsinput").removeTag(b),$(a.currentTarget).parent().removeClass("selected")):($("#tagsinput").addTag(b),$(a.currentTarget).parent().addClass("selected"))}),$(".save-draft").on("click",function(){a.productName()});var a={productName:function(){var a=$("#productName");if(!a.val()){a.siblings("div.alert").removeClass("hide");var b=a.offset().top-5;$("html,body").animate({scrollTop:b},500)}},productImg:function(){}}});
/* sm0king 最后修改于：2015-07-09 */
