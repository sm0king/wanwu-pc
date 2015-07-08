//设置蒙层
//1 获取同意协议按钮位置
// 1.0 获取位置函数
function getElemPos(obj){
        var pos = {"top":0, "left":0};
         if (obj.offsetParent){
           while (obj.offsetParent){
             pos.top += obj.offsetTop;
             pos.left += obj.offsetLeft;
             obj = obj.offsetParent;
           }
         }else if(obj.x){
           pos.left += obj.x;
         }else if(obj.x){
           pos.top += obj.y;
         }
         return {x:pos.left, y:pos.top};
}
// 1.1 按钮dom对象
var buttonNode = document.getElementById('J_PayMoney');
// 1.2 获取到dom对象
var point = getElemPos(buttonNode);
// 2 设置蒙层html
// 2.0 蒙层html
var Model = '<div id="wanwuModel" onclick="closeModel()" style="display:block;position:absolute;z-index:99999;top:0;left:0;right:0;padding:0;margin:0;width:'+window.document.body.clientWidth+'px;height:'+window.document.body.clientHeight+'px;"><div id="buttonBox" onclick="clickBuy()" style="width:'+(buttonNode.clientWidth+20)+'px;height:'+(buttonNode.clientHeight+20)+'px;position:absolute;top:'+(point.y-10)+'px;left:'+(point.x-10)+'px;box-shadow:rgba(0, 0, 0, 0.6) 0px 0px 1px 10000px;cursor:pointer;"></div><div id="mouse" style="display:block;position:absolute;width:153px;height:47px;top:'+(point.y+buttonNode.clientHeight)+'px;left:'+(point.x+buttonNode.clientWidth/2)+'px;background-image:url(http://123.59.58.104/style/backend/app/img/taobaoTip.png);background-repeat:no-repeat;"></div><div style="display:block;position:absolute;right:60px;top:60px;border-radius:30px;text-align:center;line-height:40px;width:40px;cursor:pointer;font-size:28px;color:#fff;border:2px solid #fff;" onclick="closeModel()">X</div></div>';
//2.1 转换成dom对象
var Mnode = document.createElement('div');
Mnode.innerHTML = Model;
//3 显示蒙层
//3.0 将蒙层dom插入body
document.body.appendChild(Mnode)
//3.1 关闭蒙层函数
function closeModel(){
    Mnode.style.display = "none";
}
function clickBuy(){
  closeModel();
  buttonNode.click()
}