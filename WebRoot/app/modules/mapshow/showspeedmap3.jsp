<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<head>
<title>站点查询</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<style type="text/css">
body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;}
</style>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=BP3QtYgK2SY5WwA6i2Ug0TGh&callback"></script>
<title>显示速度</title>
</head>
<body>
<div style=" width:100%; height:100%;">
  <div>
    <form action="">
	日期
      <input type="text" name="date" id="date">
     时间段选择
      <input type="text" name="timesection" id="timesection">
   	  <input type="button" value="提交" onClick="showspeedview()">
    </form>
  </div>
  <div id="allmap" style=" width:100%; height:100%;"></div>
</div>
</body>
</html>
<script type="text/javascript">

// 百度地图API功能
var map = new BMap.Map("allmap");
var point = new BMap.Point(117.007863, 36.676649);
map.centerAndZoom(point, 15);
map.enableScrollWheelZoom();
function createXMLHTTP() 
{ 
  if(window.XMLHttpRequest) 
  { 
    xmlHttp = new XMLHttpRequest();//Mozilla浏览器 
  } 
  else if(window.ActiveXObject) 
  { 
    try 
    { 
      xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");//IE老版本 
    } 
    catch (e) 
    { } 
    try 
    { 
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); //IE新版本 
    } 
    catch (e) 
    { } 
    if (!xmlHttp) 
    { 
      window.alert("不能创建XMLHttpRequest对象实例!"); 
      return false; 
    } 
  } 
}

function showspeedview(){
	showspeed();
}

function showspeed(){
	createXMLHTTP();
    xmlHttp.onreadystatechange=function(){
    	if (xmlHttp.readyState==4 && xmlHttp.status==200)
        	{
				var js=xmlHttp.responseText;
				var obj =  eval(js);
				for(var i=0;i<obj.length;i++){
						showeveryroutespeed(obj[i]);
					}
                }
            }
     var url="mapshow.do?reqCode=querySpeedMap&timesection="+document.getElementById("timesection").value+"&date="+document.getElementById("date").value;
     xmlHttp.open("GET",url,true);
     xmlHttp.send(null);
}

function showeveryroutespeed(objs){
	color = "red";
	if(15 <= objs.realspeed < 25){
		color = "blue";
	}else if( objs.realspeed >= 25){
		color = "green";
	}
	createXMLHTTP();
    xmlHttp.onreadystatechange=function(){
    	if (xmlHttp.readyState==4 && xmlHttp.status==200)
        	{
				var js=xmlHttp.responseText;
				var obj =  eval(js);
				var points = [];
				for(var i=0;i<obj.length;i++){
					point=new BMap.Point(obj[i].lng, obj[i].lat);
					points[i]=point;
				}
				var polyline = new BMap.Polyline(points, {strokeColor:color, strokeWeight:3,strokeStyle:"ridge"});
				
				map.addOverlay(polyline);
			}
		}
     var url="mapshow.do?reqCode=queryRoad&pos="+objs.pos+"&posp="+objs.posp;
     xmlHttp.open("GET",url,true);
     xmlHttp.send(null);
}
</script>
