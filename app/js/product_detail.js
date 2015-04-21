$(function(){ 
    var ue = UE.getEditor('productDetail'); 
    $('#flags').delegate('button','click', function(e){
        $(e.currentTarget).toggleClass('selected')
    });
});