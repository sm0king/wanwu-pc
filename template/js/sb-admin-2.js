// $(function() {

//     $('#side-menu').metisMenu();

// });

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        topOffset = 60;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height);
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
           $("#page-wrapper").css("min-height", (height-120) > sidebar ? (height-120) : (sidebar+60) + "px");
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
});
