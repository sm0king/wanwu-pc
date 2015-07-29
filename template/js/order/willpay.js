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
            // 弹出层
            $("#repriceModal").modal();
            // 获取订单信息
            var this_tr = $(this).parents('.orderTR'),
                this_title = this_tr.find('.productInfo span'),
                this_price = this_tr.find('.productPrice span'),
                this_num = this_tr.find('.productNum a'),
                this_orderId = this_tr.data('order'),
                this_ship = this_tr.find('.productSum').data('ship').toFixed(2),
                this_sum = this_tr.find('.productSum').data('sum'),
                $order_info = $('.modal-body').find('.order-info'),
                $all_one = $('.result-price').find('.all-one'),
                $all_ship = $('.result-price').find('.all-ship'),
                $all_discount = $('.result-price').find('.all-discount'),
                $all_price = $('.result-price').find('.all-price');

            // 订单信息生成
            var html = "";
            for (var i = 0; i < this_title.length; i++) {
                var ship = "";
                if(i==0){
                  ship = "<td class='ship-price' rowspan='"+this_title.length+"'><input class='form-control' value='"+this_ship+"'></td></tr>";
                }else{
                  ship = "";
                }
                html += "<tr><td class='goods-name'>"+this_title[i].innerHTML+"</td>"+
                        "<td class='goods-price'>￥"+this_price[i].innerHTML+"</td>"+
                        "<td class='goods-num'>"+this_num[i].innerHTML+"</td>"+
                        "<td class='discount'><input class='form-control'></td>"+ship+"</tr>";
            }
            // 初始化算式
            $order_info.html(html);
            $all_one.html(this_sum);
            $all_ship.html(this_ship);
            $all_discount.html('0');
            var rel = allPrice();
            $all_price.html(rel);

            // 运费监听
            $('.ship-price input').keyup(function(){
              var val = $(this).val();
              // console.log(val);
              if(isNaN(val) || val < 0 ){
                val = 0;
                $('.ship-price').find('input').val(val);
              }else {
                $('.ship-price').find('input').val(val);
              }
              $all_ship.html(parseFloat(val).toFixed(2));
              return false;
            }).blur(function(){
              var rel = allPrice();
              $all_price.html(rel);
              return false;
            });

            // 优惠监听
            $('.discount input').keyup(function(){
              var discount_sum = 0;
              $('.order-info').find('.discount').each(function(i,item){
                  var this_val = $(this).find('input').val(),
                      discount_one;
                  if(this_val.length > 0 && this_val < this_price[i].innerHTML){
                    discount_one = parseFloat(this_val).toFixed(2) * this_num[i].innerHTML;
                    discount_sum = parseFloat(discount_sum) + parseFloat(discount_one).toFixed(2) * 1 ;
                  }else if (this_val > this_price[i].innerHTML) {
                      alert('优惠价不能大于分销价');
                      $(this).find('input').val('0');
                  }
              });
              if (discount_sum < 0) {
                  $('.discount-tip').html("+");
                  discount_sum = discount_sum*(-1);
              }else{
                  $('.discount-tip').html("-");
              }
              $all_discount.html(discount_sum);
              return false;
            }).blur(function(){
              var rel = allPrice();
              $all_price.html(rel);
              return false;
            });

            $('.btn-option').click(function(){
                var result_data=[],ship_free,amount;
                $('.discount').find('input').each(function(i,item){
                    if(i==0){
                        ship_free = $all_ship.html();
                    }else{
                        ship_free = 0;
                    }
                    amount = (parseFloat(this_price[i].innerHTML) - parseFloat($(this).val()).toFixed(2)) * this_num[i].innerHTML;
                    result_data.push({'ogId' : this_orderId,'distributionAmount' : amount.toFixed(2),'distributionPrice' : this_price[i].innerHTML,'shipFee' : ship_free});
                });
                console.log(result_data);
            });
        });

        // 获取价格计算总价
        function allPrice(all_one,all_ship,all_discount) {
          var all_one = $('.result-price').find('.all-one').text();
          var all_ship = $('.result-price').find('.all-ship').text();
          var all_discount = $('.result-price').find('.all-discount').text();
          if($('.discount-tip').html() == "-"){
              var all_price = parseFloat(all_one) + parseFloat(all_ship) - parseFloat(all_discount);
          }else {
              all_price = parseFloat(all_one) + parseFloat(all_ship) + parseFloat(all_discount);
          }
          return all_price.toFixed(2);
        }
      })
    })
})
