(function ($) {
    $.fn.foxupload = function (imgloapurl) {
    	var maxCount = +this.attr('data-maxcount');
    	var bar =$(this).find('.bar');
		var percent = $(this).find('.percent');
		var showimg = $(this).find('#showimg');
		var progress = $(this).find(".progress");
		var files = $(this).find(".files");
		var btn = $(this).find(".btn span");
		var uploadforname='myupload'+$(this).attr('id');
		var imgval= $(this).find(".imgval");
		$(this).wrap("<form id='"+uploadforname+"' action='"+imgloapurl+"' method='post' enctype='multipart/form-data'></form>");
		$(this).find(".fileupload").change(function(){
			if(maxCount > 1 && showimg.children().length >= maxCount){
				$.alert('最多只能上传 ' + maxCount + ' 张图片！');
				return;
			}
			$("#"+uploadforname).ajaxSubmit({
				dataType:  'json',
				beforeSend: function() {
		        showimg.empty();
				progress.show();
		        var percentVal = '0%';
		        bar.width(percentVal);
		        percent.html(percentVal);
				btn.html("上传中...");
		    	},
		    	uploadProgress: function(event, position, total, percentComplete) {
		        	var percentVal = percentComplete + '%';
		        	bar.width(percentVal)
		        	percent.html(percentVal);
		    	},
					/*complete: function(xhr) {
						$(".files").html(xhr.responseText);
					},*/
				success: function(data) {
					//files.html("<span class='delimg' rel='"+data.pic+"'>删除</span>");
					var img = data.url;
					maxCount == 1 && showimg.empty() && imgval.val('');
					showimg.append("<div data-filename=' "+ data.newFileName +"' ><img src='"+img+"' class='img-responsive'><a href='javascript:;' class='removeImg glyphicon glyphicon-remove'></a></div>");
					btn.html("添加附件");
					//追加值
					tmpv=imgval.val();
					if(tmpv!='') data.newFileName=','+data.newFileName;
					imgval.val(imgval.val()+data.newFileName);
				},
				error:function(xhr){
					btn.html("上传失败");
					bar.width('0')
					files.html(xhr.responseText);
					progress.hide();
				}
			});
		});
		this.delegate('a.removeImg','click',function(e){
			var img =  $(e.currentTarget).parent();
			var fileName = img.attr('data-filename');
			img.remove();
			var vals = imgval.val() || '';
			vals = vals.replace(fileName, '');
			vals = vals.replace(',,',',');
			vals = vals.replace(/^,|,$/ig,'');
			imgval.val(vals);
		});
		return this;
    };
})(jQuery);