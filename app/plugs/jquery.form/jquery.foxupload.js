(function($) {
    $.fn.foxupload = function(imgloapurl) {
        var upload = this;
        var maxCount = this.attr('data-maxcount');
        var defaultText = this.attr('data-text') || '上传附件';
        var bar = $(this).find('.bar');
        var percent = $(this).find('.percent');
        var showimg = $(this).find('.uploadImgs');
        var progress = $(this).find(".progress");
        var files = $(this).find(".files");
        var btn = $(this).find(".btn span");
        var uploadforname = 'myupload' + $(this).attr('id');
        var imgval = $(this).find(".imgval");
        imgval.val('');
        var InutHtml = "";
    	var ObjTime = new Date().getTime()
    	var BoxId = "Box"+ObjTime;
        $(this).wrap("<form id='" + uploadforname + "' action='" + imgloapurl + "' method='post' enctype='multipart/form-data'></form>");
        $(this).on('change','.fileupload',function(e){
        	var InutHtml = this.outerHTML;
            if (this.files[0].size > 1048576) {
                $.alert('文件太大,仅允许小于1M的图像文件');
                $('#'+BoxId).html('');
                $('#'+BoxId).html(InutHtml);
                return;
            };
        	$(this).wrap('<div id="'+BoxId+'">');
            if (maxCount > 1 && showimg.children().length >= maxCount) {
                $.alert('最多只能上传 ' + maxCount + ' 张图片！');
                return;
            }
            $("#" + uploadforname).ajaxSubmit({
                dataType: 'json',
                beforeSend: function() {
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

                    maxCount == 1 && showimg.empty() && imgval.val('');
                    var img = data.url;
                    var imgItem = $("<div data-filename='" + data.newFileName + "' ><img src='" + img + "' class='img-responsive'><a href='javascript:;' class='removeImg glyphicon glyphicon-remove'></a></div>");
                    showimg.append(imgItem);
                    btn.html(defaultText);
                    progress.hide();
                    upload.trigger('fileuploaded', {
                        fileName: data.newFileName,
                        url: img,
                        img: imgItem.children(),
                        container: imgItem
                    });
                    //追加值
                    tmpv = imgval.val();
                    if (tmpv != '') data.newFileName = ',' + data.newFileName;
                    imgval.val(imgval.val() + data.newFileName);

                    $('#'+BoxId).html('');
          			$('#'+BoxId).html(InutHtml);
                },
                error: function(xhr) {
                    btn.html("上传失败");
                    bar.width('0')
                    files.html(xhr.responseText);
                    progress.hide();
                    $('#'+BoxId).html('');
          			$('#'+BoxId).html(InutHtml);
                }
            });
        });
        this.delegate('a.removeImg', 'click', function(e) {
            var img = $(e.currentTarget).parent();
            var fileName = img.attr('data-filename');
            img.remove();
            var vals = imgval.val() || '';
            vals = vals.replace(fileName, '');
            vals = vals.replace(',,', ',');
            vals = vals.replace(/^,|,$/ig, '');
            imgval.val(vals);
            upload.trigger('fileremoved', {
                id: $(e.currentTarget).attr('imgId'),
                fileName: fileName
            });
        });
        return this;
    };
})(jQuery);