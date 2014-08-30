<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>站点查询</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<style type="text/css">   
html{height:100%}   
body{height:100%;margin:0px;padding:0px}  
#container{height:100%} 

#apDiv1 {    
position:absolute;
width:300px;
height:50px;
z-index:100000;
margin-left:60px;
margin-top: 20px;
}
</style>   
<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.5&ak=n1SSalem6xqM2OrVQVf3NkcG"></script>
<script type="text/javascript" src="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js"></script>
<script type="text/javascript" src="<%=basePath %>/js/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="<%=basePath %>/FusionCharts/FusionCharts.js"></SCRIPT>
<link rel="stylesheet" href="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css" />
<script type="text/javascript">

var map =null;
// 地图展示
function init(){
map = new BMap.Map("container");
//map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());
map.addControl(new BMap.OverviewMapControl());     
map.addControl(new BMap.MapTypeControl()); 
map.enableScrollWheelZoom(); 
map.enableContinuousZoom();
//map.setCurrentCity("济南");
var point = new BMap.Point(116.960997, 36.6814599); 
map.centerAndZoom(point, 13);

// 添加统计控件
addFusoinCharts();

// 搜索站点(为追加效果，默认查询匡山附近站点)
selectStation();
}

// 添加统计控件
function addFusoinCharts(){
var chart1 = new FusionCharts("<%=basePath %>/FusionCharts/FCF_Column3D.swf", "chart1Id", "300", "200"); 
chart1.setDataXML("<graph><set name='A' value='10' color='D64646' /><set name='B' value='11' color='AFD8F8' /><set name='C' value='1' color='D64646' /><set name='D' value='5' color='AFD8F8' /></graph>");
chart1.render("chart1div");
}

// 编写自定义函数,创建标注
function addMarker(point,station_name,sjcc){
 var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '<img src="<%=basePath %>/img/gj.jpg" alt="公交" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
                    '地址：'+station_name+'<br/>车辆：' +sjcc+
                  '</div>';
//创建检索信息窗口对象
    var searchInfoWindow = null;
	searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
			title  : "站点说明",      //标题
			width  : 290,             //宽度
			height : 105,              //高度
			panel  : "panel",         //检索结果面板
			enableAutoPan : true,     //自动平移
			searchTypes   :[
				BMAPLIB_TAB_SEARCH  //周边检索
				//BMAPLIB_TAB_TO_HERE,  //到这里去
				//BMAPLIB_TAB_FROM_HERE //从这里出发
			]
		});
  var marker = new BMap.Marker(point);
   marker.enableDragging(); //marker可拖拽
    marker.addEventListener("click", function(e){
	    searchInfoWindow.open(marker);
    })
  map.addOverlay(marker);
}

// 搜索站点
function selectStation(){
//var select_name=document.getElementById("select_name").value;
var select_name="匡山";
if(select_name==""||select_name==null){
alert("搜索内容不能为空!请填写搜索关键字..");
return;
}
var baidu_lng="";
var baidu_lat="";
var statio_name="";
var sjcc="";
$.ajax({
				type:"POST",
				url:"<%=basePath %>/servlet/SelectStationServlet",
				data:{select_name:select_name},
				success:function (msg){
					if(msg==""){
						alert("查询获取数据失败！");
					}else{
						// 清楚搜有覆盖物
						map.clearOverlays();
						var stas=msg.split("|");
						var bounds = map.getBounds();
						var sw = bounds.getSouthWest();
						var ne = bounds.getNorthEast();
						var lngSpan = Math.abs(sw.lng - ne.lng);
						var latSpan = Math.abs(ne.lat - sw.lat);
						if(stas.length>0){
							for (var i = 0; i < stas.length; i ++) {
							  var stas_attres=stas[i].split("@");
							  if(stas_attres.length>1){
							  	 
							  	  if(stas_attres[1].split("=").length>1){
							  	  	baidu_lng=stas_attres[1].split("=")[1];
							  	  }
							  	  if(stas_attres[2].split("=").length>1){
							  	  	baidu_lat=stas_attres[2].split("=")[1];
							  	  }
							  	  if(stas_attres[0].split("=").length>1){
							  	  	statio_name=stas_attres[0].split("=")[1];
							  	  }
							  	  if(stas_attres[3].split("=").length>1){
							  	  	sjcc=stas_attres[3].split("=")[1];
							  	  }
								  var point = new BMap.Point(baidu_lng, baidu_lat);
								  addMarker(point,statio_name,sjcc);
							  }
							}
						}
						var point = new BMap.Point(baidu_lng, baidu_lat); 
						map.centerAndZoom(point, 15);  
					}
				}
		});
}
</script>
  </head>
  <body onload="init();">
  <div id="apDiv1">
  <div id="chart1div">
         FusionCharts
   </div>
 </div>
<div id="container"></div>    
</body>
</html>
