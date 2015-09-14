requirejs.config({
    baseUrl: '../js',
    paths: {
      'config':'config'
    }
})
require(['config'], function() {
  require(['jquery'], function($) {
    $(function(){
        $('#bathTab a').click(function(e){
            e.preventDefault();
            $(this).tab('show');
        });
    })
  })
})
