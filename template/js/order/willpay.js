requirejs.config({
    baseUrl: '../js',
    paths: {
      'config':'config'
    }
})
require(['config'], function() {
    require(['jquery','bootstrap'], function($) {
      $(function() {
        $('.change-price').click(function(){
            $("#repriceModal").modal();
            var this_tr = $(this).parents('.orderTR'),
                this_title = this_tr.find('.productInfo span'),
                this_price = this_tr.find('.productPrice span'),
                this_num = this_tr.find('.productNum a'),
                this_orderId = this_tr.data('order'),
                this_ship = this_tr.find('.productSum').data('ship');
                this_sum = this_tr.find('.productSum').data('sum');
            var html = "";
            for (var i = 0; i < this_title.length; i++) {
                var ship = "",all_one;
                if(i==0){
                  ship = "<td class='ship-price' rowspan='"+this_title.length+"'><input class='form-control' value='"+this_ship+"'></td></tr>";
                }else{
                  ship = "";
                }
                html += "<tr><td class='goods-name'>"+this_title[i].innerHTML+"</td>"+
                        "<td class='goods-price'>￥"+this_price[i].innerHTML+"</td>"+
                        "<td class='goods-num'>"+this_num[i].innerHTML+"</td>"+
                        "<td class='discount'><input class='form-control'></td>"+ship+"</tr>";
                all_one += parseFloat(this_price[i].innerHTML);
            }
            $('.modal-body').find('.order-info').html(html);
            $('.result-price').find('.all-one').html(this_sum);
            $('.result-price').find('.all-ship').html(this_ship);
            $('.result-price').find('.all-discount').html('0');
            var rel = allPrice();
            $('.result-price').find('.all-price').html(rel);
            $('.ship-price input').keyup(function(){
              $('.result-price').find('.all-ship').html($(this).val());
              var rel = allPrice();
              $('.result-price').find('.all-price').html(rel);
              return false;
            });
            $('.discount input').keyup(function(){
              var discount_sum = 0;
              $('.order-info').find('.discount').each(function(){
                  if($(this).find('input').val().length>0){
                    discount_sum = discount_sum + parseFloat($(this).find('input').val()).toFixed(2)*1;
                  }
              });
              $('.result-price').find('.all-discount').html(discount_sum);
              var rel = allPrice();
              $('.result-price').find('.all-price').html(rel);
              return false;
            });
        });

        function allPrice() {
          var all_one = $('.result-price').find('.all-one').text();
          var all_ship = $('.result-price').find('.all-ship').text();
          var all_discount = $('.result-price').find('.all-discount').text();
          var all_price = parseFloat(all_one)+parseFloat(all_ship)-parseFloat(all_discount);
          return all_price;
        }
      })
    })
})
