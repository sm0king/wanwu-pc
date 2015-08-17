requirejs.config({
    baseUrl: '../js',
    paths: {
        'config': 'config',
    }
})
require(['config'], function() {
    require(['jquery','datetimepicker'], function($) {
        $(function() {
            $('.time-input').datetimepicker({
                format: 'yyyy-mm-dd',
                language: 'zh-CN',
                minView: 2,
                autoclose: true
            });
        })
    })
    require(['jquery', 'Chart'], function($) {
        $(function() {
            //图表部分
            var marketOption = {pointDot:false,multiTooltipTemplate: "<%if (label){%><%=label%> : ￥ <%}%><%= value %>"}
            var branchOption = {pointDot:false,multiTooltipTemplate: "<%= value %> <% if(fillColor == '#069dd5') { %>店铺 <% }else{ %>分销商<% } %>",}
            var supplierOption = {pointDot:false,multiTooltipTemplate: "<%if (label){%><%=label%> : ￥ <%}%><%= value %>",}
            var marketLine = document.getElementById('chart-marketData').getContext('2d');
            var branchLine = document.getElementById('chart-branchData').getContext('2d');
            var supplierLine = document.getElementById('chart-supplierData').getContext('2d');
            var supplierPie  = document.getElementById('pie-supplierData').getContext('2d');
            var marketData = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets:[{
                        fillColor: "transparent",
                        strokeColor: "#069dd5",
                        pointStrokeColor: "#069dd5",
                        pointHighlightFill: "#069dd5",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },{
                        fillColor: "transparent",
                        strokeColor: "#4cbd4e",
                        pointStrokeColor: "#4cbd4e",
                        pointHighlightFill: "#4cbd4e",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }]
                }
            var branchData = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets:[{
                        fillColor: "transparent",
                        strokeColor: "#069dd5",
                        pointStrokeColor: "#069dd5",
                        pointHighlightFill: "#069dd5",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },{
                        fillColor: "transparent",
                        strokeColor: "#4cbd4e",
                        pointStrokeColor: "#4cbd4e",
                        pointHighlightFill: "#4cbd4e",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }]
                }
            var supplierData = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets:[{
                        fillColor: "transparent",
                        strokeColor: "#069dd5",
                        pointStrokeColor: "#069dd5",
                        pointHighlightFill: "#069dd5",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },{
                        fillColor: "transparent",
                        strokeColor: "#4cbd4e",
                        pointStrokeColor: "#4cbd4e",
                        pointHighlightFill: "#4cbd4e",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }]
                }

            //画线
            window.xxx = new Chart(marketLine).Line(marketData, marketOption);
            new Chart(branchLine).Line(branchData, branchOption);
            new Chart(supplierLine).Line(supplierData, supplierOption);
            var pieSet ={tooltipTemplate: "<%if (label){%><%=label%> :  <%}%><%= value %>"}
            var pieData =[{
                    label:"女人",
                    value:300,
                    color:"#5b8dff"
                },{
                    label:"男人",
                    value : 50,
                    color : "#a55dff"
                },{
                    label:"配饰",
                    value : 140,
                    color : "#5bd6ff"
                },{
                    label:"数码",
                    value : 95,
                    color : "#ff5dcc"
                },{
                    label:"美妆",
                    value : 67,
                    color : "#90ffcc"
                },{
                    label:"家居",
                    value : 56,
                    color : "#69D2E7"
                },{
                    label:"亲子",
                    value : 23,
                    color : "#667d73"
                },{
                    label:"运动",
                    value : 23,
                    color : "#105535"
                },{
                    label:"食品",
                    value : 45,
                    color : "#baa519"
                },{
                    label:"办公",
                    value : 56,
                    color : "#ece093"
                },{
                    label:"汽车",
                    value : 156,
                    color : "#1220d4"
                }]
            new Chart(supplierPie).Pie(pieData,pieSet)
            //生成数据列表 pieDataShow
            var pieDataHtml = '';
            var dataLength = pieData.length;
            for(var i = 0 ; i < dataLength;i++){
                pieDataHtml += '<tr><td><label><em class="sortColor" style="background-color: '+ pieData[i].color +';"></em><span class="sortName">'+pieData[i].label+'</span></label></td><td>'+pieData[i].value+'</td></tr>'
            }
            $('#pieDataShow').html(pieDataHtml);
        })
    })
    require(['sbAdmin', 'dialog'], function($) {})
})
