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
                this_sum = this_tr.find('.productSum').data('sum').toFixed(2),
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
              if(isNaN(val) || val < 0 || val.length == 0){
                val = 0;
                $('.ship-price').find('input').val(val);
                $(this).select();
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
            $('.discount input').change(function(){
              var discount_sum = 0;
              $('.order-info').find('.discount').each(function(i,item){
                  var this_val = $(this).find('input').val(),
                      discount_one;
                  if(!isNaN(Math.abs(this_val))){
                      if(parseFloat(this_val) <= parseFloat(this_price[i].innerHTML)){
                        discount_one = parseFloat(this_val).toFixed(2) * this_num[i].innerHTML;
                        discount_sum = parseFloat(discount_sum) + parseFloat(discount_one).toFixed(2) * 1 ;
                      }else if (parseFloat(this_val) > parseFloat(this_price[i].innerHTML)) {
                          alert('优惠价不能大于分销价');
                          $(this).find('input').val('0');
                      }
                  }else{
                    alert('请输入数字');
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
            $('.btn-option').data('item',this_tr);
        });

        // 提交按钮
        $('.btn-option').click(function(){
            var result_data=[],
                ship_free,amount,price_one,
                result=[],
                this_tr = $(this).data('item'),
                this_orderId = this_tr.data('order'),
                $all_ship = $('.result-price').find('.all-ship'),
                this_price = this_tr.find('.productPrice span'),
                this_title = this_tr.find('.productInfo span'),
                this_num = this_tr.find('.productNum a');

            $('.discount').find('input').each(function(i,item){
                if(i==0){
                    ship_free = $all_ship.html();
                }else{
                    ship_free = 0;
                }
                var dis_val = $(this).val();
                if (isNaN(dis_val) || dis_val.length == 0) {
                    dis_val = 0;
                }
                price_one = (parseFloat(this_price[i].innerHTML) - parseFloat(dis_val).toFixed(2));
                if(isNaN(price_one)){
                  price_one = 0 ;
                }
                amount = price_one * this_num[i].innerHTML;
                var ogId = $(this_title[i]).data('ogid');
                result_data.push({'ogId' : ogId,'distributionAmount' : amount.toFixed(2),'distributionPrice' : price_one,'shipFee' : ship_free});
            });
            result = result_data;
            // $.ajax({
            //   type: "post",
            //   url: "/supplier/order/notpay/changePrice",
            //   async: false,
            //   dataType: 'json',
            //   data: {'orderId':this_orderId,'jsonStr':result},
            //   success:function (msg) {
            //       console.log(msg);
            //       if (msg.error == 0) {
            //         $.alert('修改成功');
            //         window.location.reload();
            //         return true;
            //       }
            //       $.alert(msg.error_tip);
            //       return false;
            //   }
            // });
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
