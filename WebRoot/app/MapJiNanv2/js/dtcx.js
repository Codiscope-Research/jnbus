//超速查看
function dtcx()
{
var route=document.getElementById("searchfeature_key").value;
  map.clearOverlays();//清楚地图覆盖物
  urlstring="Read_Data.aspx?id=57&route="+route;
  var mycars55 = new Array();
    createXMLHTTP();
    xmlHttp.onreadystatechange=function()
    {
        if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
            var strjwdd=xmlHttp.responseText;
             mycars55=strjwdd.split("*"); //字符分割 
              for (var i = 0; i <mycars55.length ; i ++) 
              {
              var mycars2 = new Array();
              mycars2=mycars55[i].split("|");
              addMarker_cs(mycars2);
              }
        }
    }
    var url=urlstring;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
  }
  
  
  //超速点标记
 function addMarker_cs(mycars3)
 {

//     var icon = new BMap.Icon("images/busstop.jpg", new BMap.Size(13,13));
    var point2 = new BMap.Point(mycars3[0],mycars3[1]);
//    var marker = new BMap.Marker(point2,{icon:icon});
    var marker = new BMap.Marker(point2);
    map.addOverlay(marker);

     var opts = {
           position : point2,    // 指定文本标注所在的地理位置
           offset: new BMap.Size(-5, -25)    //设置文本偏移量
        }
//             var mycars22=new Array();
//             mycars22=mycars3[4].split(",");
//            var infocontent=mycars22.length-1;
//        var label = new BMap.Label(infocontent, opts);  // 创建文本标注对象
//	     label.setStyle({
//		 color : "#FFFFFF",
//		 fontSize : "12px",
//		 height : "20px",
//		 lineHeight : "20px",
//		 fontFamily:"微软雅黑",
//		 border :"0", 
//		 fontWeight :"bold" ,
//		 backgroundColor :"0.05"
//	 });
//    map.addOverlay(label);
    
    marker.addEventListener("click",function(){  
      var opts = {
          width : 0,     // 信息窗口宽度
          height: 0,     // 信息窗口高度
          offset: new BMap.Size(0, -20),
          title:"超速信息"
        }
//        var infocontent="站台形式:"+mycars3[6]+";</br>站台长度:"+mycars3[5]+"米;</br>站台宽度:"+mycars3[7]+"米;</br>途经线路:"+mycars3[4];
        
//    var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
//                    '<img src="" alt="images/000296-9-201310090355550069-0017200.jpg" style="float:right;zoom:1;overflow:hidden;width:500px;height:130px;margin-left:3px;"/>' +
//                    '站台形式：'+mycars3[6]+';<br/>站台长度：'+mycars3[5]+'米;<br/>站台宽度：'+mycars3[7]+'米;<br/>广告位数：'+mycars3[9]+'<br/>所经线路：'+mycars3[4]+'' +
//                  '</div>';
    var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '超速日期：'+mycars3[2]+';<br/>超速时间：'+mycars3[3]+'' +
                  '</div>';
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow,point2);
});
//    var phy_station_id=mycars3[3];
//     marker.addEventListener("dblclick",function(){
//var ima="<div style='text-align:center'><img src='Images/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
// document.getElementById("navigation").innerHTML=ima;
//     }); 
}