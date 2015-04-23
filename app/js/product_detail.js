$(function(){ 
    var ue = UE.getEditor('productDetail'); 
    $('#flags').delegate('button','click', function(e){
        $(e.currentTarget).parent().toggleClass('selected');
    });
});