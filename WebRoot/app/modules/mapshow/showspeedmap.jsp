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
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=BP3QtYgK2SY5WwA6i2Ug0TGh&callback"></script>
<link href="app/modules/mapshow/css/showmap.css" rel="stylesheet" type="text/css" />
<title>显示速度</title>
</head>
<body>
<div style=" width:100%; height:100%;">
  <div id="allmap"></div>
	<div id="formdiv"><!-- display:none; -->
	<div>
    <form action="">
		<div id="inputdiv">
			<div id="inputname" align="right" >日期:&nbsp;</div>
			<div id="inputfield" align="center"><input type="text" name="date" size="18" id="date" value='2014-03-26'></div>
		</div>
		<div id="inputdiv2">
			<div id="inputname" align="right" >时间段:&nbsp;</div>
			<div id="inputfield" align="center">
			<select name="timesection" id="timesection">
				<option value="[05:30~06:00)">05:30~06:00</option>
				<option value="[06:00~06:30)">06:00~06:30</option>
				<option value="[06:30~07:00)" selected="selected">06:30~07:00</option>
				<option value="[07:00~07:30)">07:00~07:30</option>
				<option value="[07:30~08:00)">07:30~08:00</option>
				<option value="[08:00~08:30)">08:00~08:30</option>
				<option value="[08:30~09:00)">08:30~09:00</option>
				<option value="[09:00~09:30)">09:00~09:30</option>
				<option value="[09:30~10:00)">09:30~10:00</option>
				<option value="[10:00~10:30)">10:00~10:30</option>
				<option value="[10:30~11:00)">10:30~11:00</option>
				<option value="[11:00~11:30)">11:00~11:30</option>
				<option value="[11:30~12:00)">11:30~12:00</option>
				<option value="[12:00~12:30)">12:00~12:30</option>
				<option value="[12:30~13:00">12:30~13:00</option>
				<option value="[13:00~13:30)">13:00~13:30</option>
				<option value="[13:30~14:00)">13:30~14:00</option>
				<option value="[14:00~14:30)">14:00~14:30</option>
				<option value="[14:30~15:00)">14:30~15:00</option>
				<option value="[15:00~15:30)">15:00~15:30</option>
				<option value="[15:30~16:00)">15:30~16:00</option>
				<option value="[16:00~16:30)">16:00~16:30</option>
				<option value="[16:30~17:00)">16:30~17:00</option>
				<option value="[17:00~17:30)">17:00~17:30</option>
				<option value="[17:30~18:00)">17:30~18:00</option>
				<option value="[18:00~18:30)">18:00~18:30</option>
				<option value="[18:30~19:00)">18:30~19:00</option>
				<option value="[19:00~19:30)">19:00~19:30</option>
			</select>
			</div>
		</div>
		<div id="submitdiv"><input type="button" id="submit" onmouseover=this.style.background='#deeff7' onmouseout=this.style.background='#9ad7f4' value="提交">
		
		</div>
    </form>
		<div id="hr" >&nbsp;</div>
		<div id="result">
		</div>
	</div>
	<div id="hidediv" onmouseover=this.style.background='#f2f3f3' onmouseout=this.style.background='#ffffff'>隐藏弹窗<br/><</div>
  	</div>
	<div id="showbutton" onmouseover=this.style.background='#f2f3f3' onmouseout=this.style.background='#ffffff'>显示弹窗<br/>></div>
	<div id="hideimgdiv" onmouseover=this.style.background='#f2f3f3' onmouseout=this.style.background='#ffffff'>
	&nbsp;<img src='resource/image/map/rc_4_7.png' id="modeimg" style="overflow:hidden;width:30px;height:8px;" text-align:'center' />&nbsp;速度<15</br>
	&nbsp;<img src='resource/image/map/rc_13_17.png' id="modeimg" style="overflow:hidden;width:30px;height:8px;" text-align:'center' />&nbsp;15<=速度<25</br>
	&nbsp;<img src='resource/image/map/rc_17_.png' id="modeimg" style="overflow:hidden;width:30px;height:8px;" text-align:'center' />&nbsp;25<=速度</br>
	<center>
		<div style="position:relative; bottom:-5px;text-align:'center'; font-size:10px;">
			点击消失
		</div>
	</center>
	</div>
	<div id="showimgbutton" onmouseover=this.style.background='#f2f3f3' onmouseout=this.style.background='#ffffff'>
		<img src='resource/image/map/img_s.png' id="modeimg" style="overflow:hidden;width:40px;height:12px;" text-align:'center' />
	</div>
</div>
</body>
</html>
<script type="text/javascript" language="javascript" src="app/modules/mapshow/js/showspeedmap.js" charset="utf-8"></script>