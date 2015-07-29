// $(function() {

//     $('#side-menu').metisMenu();

// });

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
(function() {

    var topOffset = 60;
    var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
    var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height);
    var sidebar = $('.sidebar ').height();
    height = height - topOffset;
    if (height < 1) height = 1;
    if (height > topOffset) {
       $("#page-wrapper").css("min-height", (height-62) > sidebar ? (height-62) : (sidebar+45) + "px");
    }

    $(window).bind("load resize", function() {
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }
    });
    
    var url = window.location;
    var element = $('ul.nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) === 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active in');
        element.prev().addClass('bg-blue');
    }

    $('#side-menu').delegate('li.navbar-group-title','click', function(){
        $(this).siblings('.in').collapse('hide');
        $(this).siblings('.navbar-group-title').removeClass('bg-blue');
        $(this).addClass('bg-blue');
    });
})();
