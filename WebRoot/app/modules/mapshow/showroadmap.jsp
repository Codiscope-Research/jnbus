<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<head>
<title>济南公交系统</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<style type="text/css">
body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;}
</style>
<script src="app/modules/mapshow/js/jquery.min.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=BP3QtYgK2SY5WwA6i2Ug0TGh"></script>
<link href="app/modules/mapshow/css/showmap.css" rel="stylesheet" type="text/css" />
<title>道路查询</title>
</head>
<body>
<div style=" width:100%; height:100%;">
	<div id="allmap"></div>
	<div id="formdiv"><!-- display:none; -->
	<div>
    <form action="">
		<div id="inputdiv">
			<div id="inputname" align="right" >输入道路:&nbsp;</div>
			<div id="inputfield" align="center"><input type="text" size="18" height="25" onkeydown="if(event.keyCode==13){return false;}" name="roadname" id="roadname"></div>
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
	<div id="hideimgdiv" onmouseover=this.style.background='#f2f3f3' onmouseout=this.style.background='#ffffff'>
	&nbsp;<img src='resource/image/map/rc_3.png' id="rc_3" style="overflow:hidden;width:30px;height:8px;" text-align:'center' />&nbsp;1-3条线路&nbsp;&nbsp;
	<img src='resource/image/map/rc_8_12.png' id="rc_8" style="overflow:hidden;width:30px;height:8px;" text-align:'center' />&nbsp;8-12条线路</br>
	&nbsp;<img src='resource/image/map/rc_4_7.png' id="rc_4" style="overflow:hidden;width:30px;height:8px;" text-align:'center' />&nbsp;4-7条线路&nbsp;&nbsp;
	<img src='resource/image/map/rc_13_17.png' id="rc_13" style="overflow:hidden;width:30px;height:8px;" text-align:'center' />&nbsp;13-17条线路</br>
	&nbsp;<img src='resource/image/map/rc_17_.png' id="rc_17" style="overflow:hidden;width:30px;height:8px;" text-align:'center' />&nbsp;17条以上线路</br>
	<center>
		<div style="position:relative; bottom:-5px;text-align:'center'; font-size:10px;">
			点击消失
		</div>
	</center>
	</div>
	<div id="showimgbutton" onmouseover=this.style.background='#f2f3f3' onmouseout=this.style.background='#ffffff'>
		<img src='resource/image/map/img_s.png' style="overflow:hidden;width:40px;height:12px;" text-align:'center' />
	</div>
	<div id="modeselect"><img src='resource/image/map/mode.png' id="modeimg" style="float:right;zoom:1;overflow:hidden;width:25px;height:25px;" text-align:'center' /></div>
	<div id="delete"><img src='resource/image/map/delete.png' id="deleteimg" style="float:right;zoom:1;overflow:hidden;width:25px;height:25px;" text-align:'center' /></div>
	<div id="textall"><img src='resource/image/map/all.png' id="textallimg" style="float:right;zoom:1;overflow:hidden;width:25px;height:25px;" text-align:'center' /></div>
</div>
</body>
</html>
<script type="text/javascript" language="javascript" src="app/modules/mapshow/js/showroadmap.js" charset="utf-8"></script>