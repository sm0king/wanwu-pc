require(['config'], function() {
    require(['jquery'], function($) {
        $(function() {
            $('#bindWeixin').click(function() {
                var jqTarget = $(this);
                if (!jqTarget.hasClass('active')) {
                    jqTarget.addClass('active');
                    setTimeout(function() {
                        $(document.body).one('click', function() {
                            jqTarget.removeClass('active');
                        });
                    }, 0);
                }
            });
        })
    })
    require(['jquery', 'Chart'], function($) {
        $(function() {
            var options1 = {
                responsive: true,
                tooltipTemplate: "<%if (label){%><%=label%> : ￥ <%}%><%= value %>",
            };
            var options2 = {
                responsive: true,
                tooltipTemplate: "<%if (label){%><%=label%> : <%}%><%= value %> 个分销商",
            };
            var ctxSale = document.getElementById('sale').getContext('2d');
            var saleData = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                }]
            };
            new Chart(ctxSale).Line(saleData, options1);

            var ctxRetailer = document.getElementById('retailerNum').getContext('2d');
            var retailerData = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }]
            };
            new Chart(ctxRetailer).Line(retailerData, options2);
        })
    })
    require(['sbAdmin', 'dialog'], function($) {})
})
