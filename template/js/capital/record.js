requirejs.config({
    baseUrl: '../js',
    paths: {
      'config':'config'
    }
})
require(['config'], function() {
  require(['jquery','datetimepicker'],function($) {
    $(function(){
        $('#timeBegin,#timeEnd').datetimepicker({
            format: 'yyyy-mm-dd',
            language: 'zh-CN',
            minView: 2,
            autoclose: true
        });
    });
  })
})
