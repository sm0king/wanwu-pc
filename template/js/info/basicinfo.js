requirejs.config({
    baseUrl: '../js',
    paths: {
      'config':'config'
    }
})
require(['config'], function() {
    require(['jquery','bootstrap','imagebox','foxUpload','jqueryForm','bootstrapValidator'], function($) {
      $('#basicInfoForm').bootstrapValidator({
          fields: {
              email: {
                  validators: {
                      emailAddress: {
                          message: '你输入的邮箱格式不正确'
                      }
                  }
              },
              address1:{
                  message:'不能为空',
                  validators:{
                      notEmpty:{
                          message:'地址不能为空'
                      }
                  }
              },
              phone:{
                  validators:{
                      stringLength: {
                          min: 8,
                          max: 12,
                          message: '电话号码必须是8-12位的数字'
                      }
                  }
              },
              companyName: {
                  message: '公司名称不能为空！',
                  validators: {
                      notEmpty: {
                          message: '公司名称不能为空'
                      },
                      stringLength: {
                          min: 2,
                          max: 120,
                          message: '公司名称长度不能小于2位，不能大于40位'
                      }
                  }
              },
              businessCatalog: {
                  message: '经营品类不能为空！',
                  validators: {
                      notEmpty: {
                          message: '经营品类不能为空'
                      },
                      stringLength: {
                          min: 2,
                          max: 300,
                          message: '公司名称长度不能小于2位，不能大于100位'
                      }
                  }
              },
              businessCode: {
                  message: '营业执照注册号不能为空！',
                  validators: {
                      notEmpty: {
                          message: '营业执照注册号不能为空'
                      },
                      stringLength: {
                          min: 2,
                          max: 60,
                          message: '营业执照注册号不能小于2位，大于60位'
                      }
                  }
              },
              connectName: {
                  message: '联系人姓名不能为空！',
                  validators: {
                      notEmpty: {
                          message: '联系人姓名不能为空'
                      },
                      stringLength: {
                          min: 2,
                          max: 60,
                          message: '联系人姓名不能小于2位，大于30位'
                      }
                  }
              },
              connectPhone:{
                  validators:{
                      notEmpty: {
                          message: '电话号码不能为空'
                      },
                      stringLength: {
                          min: 8,
                          max: 12,
                          message: '电话号码必须是8-12位的数字'
                      },
                      regexp: {
                          regexp: /^[0-9]+$/,
                          message: '电话号码必须是数字！'
                      }
                  }
              },
              corpName: {
                  message: '法人姓名不能为空！',
                  validators: {
                      notEmpty: {
                          message: '法人姓名不能为空'
                      },
                      stringLength: {
                          min: 2,
                          max: 60,
                          message: '法人姓名不能小于2位，大于30位'
                      }
                  }
              },
              organizationName: {
                  validators: {
                      stringLength: {
                          min: 2,
                          max: 60,
                          message: '组织机构代码不能小于2位，大于60位'
                      }
                  }
              }
          }
      });

      $(function(){
        $.fn.upload = function (imgloapurl) {
          var maxCount =this.attr('data-maxcount');
          var bar =$(this).find('.bar');
          var percent = $(this).find('.percent');
          var showimg = $(this).find('.uploadImgs');
          var progress = $(this).find(".progress");
          var files = $(this).find(".files");
          var btn = $(this).find(".btn span");
          var uploadforname='myupload'+$(this).attr('id');
          var imgval= $(this).find(".imgval");
          var ObjThis = {};
          var InutHtml = "";
          var ObjTime = new Date().getTime()
          var BoxId = "Box"+ObjTime;

          imgval.val('');
          $(this).wrap("<form id='"+uploadforname+"' action='"+imgloapurl+"' method='post' enctype='multipart/form-data'></form>");
          $(this).on('change','.fileupload',function(){
            var InutHtml = this.outerHTML;
            //$('.inner').wrap('<div class="new" />');
            $(this).wrap('<div id="'+BoxId+'">');
            if(maxCount > 1 && showimg.children().length >= maxCount){
              $.alert('最多只能上传 ' + maxCount + ' 张图片！');
              return;
            }
            $("#"+uploadforname).ajaxSubmit({
              dataType:  'json',
              beforeSend: function() {
              progress.show();
                  var percentVal = '0%';
                  bar.width(percentVal);
                  percent.html(percentVal);
              btn.html("上传中...");
                },uploadProgress: function(event, position, total, percentComplete) {
                    var percentVal = percentComplete + '%';
                    bar.width(percentVal)
                    percent.html(percentVal);
                },success: function(data) {
                    if(data.error_no == 1){
                        btn.html("上传附件");
                        $(".progress").hide();
                        $.alert(data.error_msg);
                        return false;
                    }
                btn.html("上传头像");
                $('#headImage').attr('src',down_url+"&"+new Date().getTime());
                $('.progress').remove();
                $('#'+BoxId).html('')
                $('#'+BoxId).html(InutHtml);
              },error:function(xhr){
                btn.html("上传失败");
                bar.width('0')
                files.html(xhr.responseText);
                ('.progress').hide();
                $('#'+BoxId).html('')
                $('#'+BoxId).html(InutHtml);
              }
            });
          })
          // $(this).find(".fileupload").change(function(){
          // });
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

        $("#userheadImage").upload('/supplier/upload/file.php?action=add&type=head&userId='+userId);
      });
      $(function(){
          $("#businessImage").foxupload('/supplier/upload/file.php?action=add&isZip=1');
          $("#personImages").foxupload('/supplier/upload/file.php?action=add&isZip=1');
          $("#personbackImages").foxupload('/supplier/upload/file.php?action=add&isZip=1');
          $("#contactPersonImage").foxupload('/supplier/upload/file.php?action=add&isZip=1');
          $("#bankImage").foxupload('/supplier/upload/file.php?action=add&isZip=1');
          $("#contactPersonbackImage").foxupload('/supplier/upload/file.php?action=add&isZip=1');
          $("#organizationImage").foxupload('/supplier/upload/file.php?action=add&isZip=1');
          $("#taxRegistrationImage").foxupload('/supplier/upload/file.php?action=add&isZip=1');

      	// $.post(site_url+'/info/consumer/getexpress',function(result) {
       //    $('#address1').empty();
       //    $('#address1').append("<option value=''>请选择</option>");
      	//   $(result.regions).each(function(){
      	// 	  $('#address1').append("<option value='"+this.regionId+"'>"+this.regionName+"</option>");
       //    });
       //  },'json');

          $('#address1').change(function(){
              var address2 = $('#address2').val();
        	    if($('#address1').val()==''){
        		    return false;
        	    }
          // console.log(address2);
          // $(address2).empty();
        	$.post(site_url+'/info/consumer/getexpress','regionId='+$('#address1').val(),function(result) {
        		var index=true;
        		var regionId;
              var count = result.regions.length;
              if(count > 0){
                 var address2='#address2';
                  $(address2).empty();
                  $(result.regions).each(function(){
                      if(index){
                          regionId=this.regionId;
                          index=false;
                      }
                      $(address2).append("<option value='"+this.regionId+"'>"+this.regionName+"</option>");
                  });
                  if(result.regions.length>0){
                      address='#address3';
                      $(address).empty();
                      $.post(site_url+'/info/consumer/getexpress','regionId='+regionId,function(result) {
                          $(result.regions).each(function(){
                              $(address).append("<option value='"+this.regionId+"'>"+this.regionName+"</option>");
                          });
                      },'json');
                  }
              }
            },'json');
      	});
          $('#address1').change(function(e){
              // console.log(this.value);
              if(this.value == 710000 || this.value == 810000 || this.value == 820000){
                  $('#address2').hide();
                  $('#address3').hide();
              }else{
                  $('#address2').removeClass('hide');
                  $('#address3').removeClass('hide');

                  $('#address2').show();
                  $('#address3').show();
              }
          });

      	$('#address2').change(function(){
      		regionId=$('#address2').val()
      		address='#address3';
      		$(address).empty();
        	$.post(site_url+'/info/consumer/getexpress','regionId='+regionId,function(result) {
      			 $(result.regions).each(function(){
      			      $(address).append("<option value='"+this.regionId+"'>"+this.regionName+"</option>");
      		     });
            },'json');
      	});


        $('.submitResquest').click(function(){
        var data_status = $(this).attr("data-status");

          var show                   = $('#show').val();
          var showstatus =$('#show').prop("checked");

          if(showstatus == false){
                show = '0';
            }else{
                show = '1';
            }


          var email                  = $('#email').val();
          var status                  = $('#status').val();
          var phone                  = $('#phone').val();
          var fax                    = $('#fax').val();
          var address1               = $('#address1').val();
          var address2               = $('#address2').val();
          var address3               = $('#address3').val();
          var street                 = $('#street').val();

          var usertype               = $('input[name="usertype"]:checked ').val();

          var companyName                = $('#companyName').val();
          var businessCatalog        = $('#businessCatalog').val();
          var bankImage              = $('#bankImage').find('.imgval').val();
          var bankImagecount              = $('#bankImage').find('.uploadImgs img').length;//判定个数

          var businessImage          = $('#businessImage').find('.imgval').val();
          var businessImagecount              = $('#businessImage').find('.uploadImgs img').length;//判定个数

          var contactPersonImage     = $('#contactPersonImage').find('.imgval').val();
          var contactPersonImagecount              = $('#contactPersonImage').find('.uploadImgs img').length;//判定个数

          var contactPersonbackImage = $('#contactPersonbackImage').find('.imgval').val();
          var contactPersonbackImagecount              = $('#contactPersonbackImage').find('.uploadImgs img').length;//判定个数

          var personImage            = $('#personImages').find('.imgval').val();
          var personImagescount              = $('#personImages').find('.uploadImgs img').length;//判定个数

          var personbackImage        = $('#personbackImages').find('.imgval').val();
          var personbackImagescount              = $('#personbackImages').find('.uploadImgs img').length;//判定个数

          var organizationImage      = $('#organizationImage').find('.imgval').val();
          var organizationImagecount              = $('#organizationImage').find('.uploadImgs img').length;//判定个数

          var taxRegistrationImage   = $('#taxRegistrationImage').find('.imgval').val();
          var taxRegistrationImagecount              = $('#taxRegistrationImage').find('.uploadImgs img').length;//判定个数


          var businessCode                    = $('#businessCode').val();
          var connectName                    = $('#connectName').val();
          var connectPhone                    = $('#connectPhone').val();
          var corpName                    = $('#corpName').val();
          var organizationName                    = $('#organizationName').val();


          if(data_status && data_status == 1){
              if ($.trim(address1) == "") {
                  $.alert("所在地区不能为空！");
                  return false;
              }
              if(status == 0 || status == 3){
                  if(usertype == 1){
                      if ($.trim(bankImage) == "" && bankImagecount <= 0) {
                          $.alert("银行开户许可证没有上传，请先上传！");
                          return false;
                      }
                      if ($.trim(organizationImage) == "" && organizationImagecount <= 0 ) {
                          $.alert("组织机构代码证可证没有上传，请先上传！");
                          return false;
                      }
                      if ($.trim(organizationName) == "") {
                          $.alert("组织机构代码不能为空！");
                          return false;
                      }
                      if ($.trim(taxRegistrationImage) == "" && taxRegistrationImagecount <= 0) {
                          $.alert("税务登录证没有上传，请先上传！");
                          return false;
                      }
                  }

                  if ($.trim(companyName) == "") {
                      $.alert("公司名称不能为空！");
                      return false;
                  }
                  if ($.trim(businessCatalog) == "") {
                      $.alert("经营品类不能为空！");
                      return false;
                  }

                  if ($.trim(businessCode) == "") {
                      $.alert("营业执照号不能为空！");
                      return false;
                  }
                  if ($.trim(businessImage) == "" && businessImagecount <= 0) {
                      $.alert("营业执照图片没有上传，请先上传！！");
                      return false;
                  }
                  if ($.trim(connectName) == "") {
                      $.alert("联系人姓名不能为空！");
                      return false;
                  }
                  if ($.trim(connectPhone) == "") {
                      $.alert("联系人手机号不能为空！");
                      return false;
                  }

                  if ($.trim(contactPersonImage) == "" && contactPersonImagecount <= 0) {
                      $.alert("联系人身份证没有上传，请先上传！");
                      return false;
                  }
                  if ($.trim(contactPersonbackImage) == "" && contactPersonbackImagecount <= 0) {
                      $.alert("联系人身份证背面没有上传，请先上传！");
                      return false;
                  }
                  if ($.trim(corpName) == "") {
                      $.alert("法人姓名不能为空！");
                      return false;
                  }
      //          if ($.trim(personImage) == "" && personImagescount <= 0) {
      //              $.alert("法人身份证没有上传，请先上传！");
      //              return false;
      //          }
      //          if ($.trim(personbackImage) == "" && personbackImagescount <= 0) {
      //              $.alert("法人身份证背面没有上传，请先上传！");
      //              return false;
      //          }

                  if ($.trim(corpName) == "") {
                      $.alert("法人姓名不能为空！");
                      return false;
                  }


              }
          }



          $.ajax({
            type: "post",
            url: site_url + "/info/consumer/do_auth",
            async: false,
            data:{
              "email"                      : email,
              "phone"                      : phone,
              "fax"                        : fax,
              "address1"                   : address1,
              "address2"                   : address2,
              "address3"                   : address3,
              "street"                     : street,
                "stats"                   :status,
                "data_status"             :data_status,
              "show"                       : show,
              "usertype"                   : usertype,
              "companyName"                    : companyName,
              "businessCatalog"            : businessCatalog,

              "businessCode"               : businessCode,
              "connectName"                : connectName,
              "connectPhone"               : connectPhone,
              "corpName"                   : corpName,
              "organizationName"           : organizationName,

              "bankImage"                  : (bankImage ? bankImage : ''),
              "businessImage"              : (businessImage ? businessImage : ''),
              "contactPersonImage"         : (contactPersonImage ? contactPersonImage : ''),
              "contactPersonbackImage"     : (contactPersonbackImage ? contactPersonbackImage : ''),
              "personImage"                : (personImage ? personImage : ''),
              "personbackImage"            : (personbackImage ? personbackImage : ''),
              "organizationImage"          : (organizationImage ? organizationImage : ''),
              "taxRegistrationImage"       : (taxRegistrationImage ? taxRegistrationImage : '')
            },
            success:function (msg) {
              msg = JSON.parse(msg);
              if (msg.error != 0) {
                $.alert(msg.error_tip);
                return false;
              } else {
                  $.alertSuccess('提交成功!','成功',"",function(e){window.location.href="";});
      //          $.alert('提交成功');
      //          window.location.reload();
                return true;
              }
            }
          });
        });

        $("input[name='usertype']").click(function(){
            if ($('#organizationTitle').hasClass('require')) {
              $('#organizationTitle').removeClass('require');
            } else {
              $('#organizationTitle').addClass('require');
            }
            if ($('#bankTitle').hasClass('require')) {
              $('#bankTitle').removeClass('require');
            } else {
              $('#bankTitle').addClass('require');
            }
            if ($('#taxRegistrationTitle').hasClass('require')) {
              $('#taxRegistrationTitle').removeClass('require');
            } else {
              $('#taxRegistrationTitle').addClass('require');
            }

            if ($('#organizationNameLeber').hasClass('require')) {
                $('#organizationNameLeber').removeClass('require');
            } else {
                $('#organizationNameLeber').addClass('require');
            }
        });

        // function getArea(){
        //   $(address).empty();
        //   $.post(site_url+'/info/consumer/getexpress','regionId='+regionId,function(result) {
        //     $(result.regions).each(function(){
        //       $(address).append("<option value='"+this.regionId+"'>"+this.regionName+"</option>");
        //     });
        //   },'json');
        // }
        $('.showImg').imagebox();

      });


    });
});
