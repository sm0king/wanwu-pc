(function ($) {
    $.fn.foxupload = function (imgloapurl) {
    	var upload = this;
    	var maxCount =this.attr('data-maxcount');
    	var defaultText = this.attr('data-text') || ' ';
    	var bar =$(this).find('.bar');
		var percent = $(this).find('.percent');
		var showimg = $(this).find('.uploadImgs');
		var progress = $(this).find(".progress");
		var files = $(this).find(".files");
		// var btn = $(this).find(".btn span"); 
		var btn = '<span></span>'
		var uploadforname='myupload'+$(this).attr('id');
		var imgval= $(this).find(".imgval");
		imgval.val('');
		var InutHtml = "";
    	var ObjTime = new Date().getTime()
    	var BoxId = "Box"+ObjTime;
		$(this).wrap("<form id='"+uploadforname+"' action='"+imgloapurl+"' method='post' enctype='multipart/form-data'></form>");
		$(this).on('change',".fileupload",function(){
			var InutHtml = this.outerHTML;
        	$(this).wrap('<div id="'+BoxId+'" style="border:0;">');
        	if (this.files[0].size > 3145728) {
                $.alert('文件太大,仅允许小于3M的图像文件');
                $('#'+BoxId).html('');
          		$('#'+BoxId).html(InutHtml);
                return;
            };
			if(maxCount > 1 && showimg.children().length >= maxCount){
				$.alert('最多只能上传 ' + maxCount + ' 张图片！');
				return;
			}
			/*if (showimg.children().length % 3  === 0) {
				$('.btn-upload').removeClass('fxupload');
			}else{
				$('.btn-upload').addClass('fxupload')
			}*/
			$("#"+uploadforname).ajaxSubmit({
				dataType:  'json',
				beforeSend: function() {
				progress.css('display','inline-block');
		        var percentVal = '0%';
		        bar.width(percentVal);
		        percent.html(percentVal);
				// btn.html("上传中...");
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
                    if(data.error_no == 1 || data.error_no == 1001){
                        $(btn).html("上传附件");
                        $(".progress").hide();
                        $.alert(data.error_msg || data.error_desc);
                        return false;
                    }
					//files.html("<span class='delimg' rel='"+data.pic+"'>删除</span>");

					maxCount == 1 && showimg.empty() && imgval.val('');
					var img = data.url;
					var imgItem = $("<div class='upload-img' data-filename='"+ data.newFileName +"' ><img src='"+img+"' class='img-responsive'><a href='javascript:;' class='removeImg glyphicon glyphicon-remove'></a></div>");					
					var lastImgItem = showimg.children('.upload-img:last');
					lastImgItem.length ? lastImgItem.after(imgItem) : showimg.prepend(imgItem);
					// btn.html(defaultText);
					upload.trigger('fileuploaded', { fileName: data.newFileName, url: img, img: imgItem.children(), container: imgItem });
					//追加值
					tmpv=imgval.val();
					if(tmpv!='') data.newFileName=','+data.newFileName;
					imgval.val(imgval.val()+data.newFileName);
					progress.hide();
					$('#'+BoxId).html('');
          			$('#'+BoxId).html(InutHtml);
				},
				error:function(xhr){
					$(btn).html("上传失败");
					bar.width('0')
					files.html(xhr.responseText);
					progress.hide();
					$('#'+BoxId).html('');
          			$('#'+BoxId).html(InutHtml);
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
			upload.trigger('fileremoved', { id: $(e.currentTarget).attr('imgId'), fileName: fileName  });
		});
		return this;
    };
    
     $.fn.foximgval = function () {
     	return $(this).find(".imgval").val();
     };
})(jQuery);