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
<script src="app/modules/mapshow/js/jquery.min.js"></script>
<script type="text/javascript" src="app/modules/mapshow/js/searchInRectangle.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=BP3QtYgK2SY5WwA6i2Ug0TGh&callback"></script>
<link href="app/modules/mapshow/css/showmap.css" rel="stylesheet" type="text/css" />
<title>折线</title>
</head>
<body>
<div style=" width:100%; height:100%;">
 	
  	<div id="allmap"></div>
	<div id="formdiv"><!-- display:none; -->
	<div>
    <form action="">
		<div id="inputdiv">
			<div id="inputname" align="right" >站点查询:&nbsp;</div>
			<div id="inputfield" align="center"><input type="text" size="18" height="25" onkeydown="if(event.keyCode==13){return false;}" name="station_name" id="station_name"></div>
		</div>
		<div id="submitdiv"><input type="button" id="submit" onmouseover=this.style.background='#deeff7' onmouseout=this.style.background='#9ad7f4' value="提交"></div>
    </form>
		<div id="hr" >&nbsp;</div>
		<div id="result">
		</div>
	</div>
	<div id="hidediv" onmouseover=this.style.background='#f2f3f3' onmouseout=this.style.background='#ffffff'>隐藏弹窗<br/><</div>
  	</div>
	<div id="showbutton" onmouseover=this.style.background='#f2f3f3' onmouseout=this.style.background='#ffffff'>显示弹窗<br/>></div>
	<div id="lakuang"><img src='resource/image/map/lakuang.png' id="lakuangimg" style="float:right;zoom:1;overflow:hidden;width:25px;height:25px;" text-align:'center' /></div>
</div>
</body>
</html>
<script type="text/javascript" language="javascript" src="app/modules/mapshow/js/showstationmap.js" charset="utf-8"></script>
