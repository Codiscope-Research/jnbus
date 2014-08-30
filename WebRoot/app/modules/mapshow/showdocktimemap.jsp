<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<head>
<title>站点停靠时间</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<style type="text/css">
body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;}
</style>
<script src="app/modules/mapshow/js/jquery.min.js"></script>
<script src="app/modules/mapshow/js/Heatmap_min.js"></script>
<script type="text/javascript" src="app/modules/mapshow/js/searchInRectangle.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=BP3QtYgK2SY5WwA6i2Ug0TGh&callback"></script>
<link href="app/modules/mapshow/css/showmap.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div style=" width:100%; height:100%;">
 	
  	<div id="allmap"></div>
	<div id="formdiv"><!-- display:none; -->
	<div>
    <form action="">
		<div id="inputdiv">
			<div id="inputname" align="right" >线路:&nbsp;</div>
			<div id="inputfield" align="center"><input type="text" size="18" name="route_id" id="route_id"></div>
		</div>
		<div id="inputdiv2">
			<div id="inputname" align="right" >上/下行:&nbsp;</div>
			<div id="inputfield" align="center">
				<select  name="sxx" id="sxx">
					<option value="上行" elected="selected">上行</option>
					<option value="下行">下行</option>
	  			</select>
			</div>
		</div>
		<div id="inputdiv3">
			<div id="inputname" align="right" >日期:&nbsp;</div>
			<div id="inputfield" align="center"><input type="text" size="18" name="day" id="day"></div>
		</div>
		<div id="inputdiv4">
			<div id="inputname" align="right" >时间段:&nbsp;</div>
			<div id="inputfield" align="center">
				<select  name="time" id="time">
					<option value="6:00-8:00" elected="selected">6:00-8:00</option>
					<option value="9:00-15:00">9:00-15:00</option>
					<option value="16:00-18:00">16:00-18:00</option>
	  			</select>
			</div>
		</div>
		<div id="submitdivdock"><input type="button" id="submit" onmouseover=this.style.background='#deeff7' onmouseout=this.style.background='#9ad7f4' value="提交"></div>
    </form>
		<div id="hr_dock" >&nbsp;</div>
		<div id="result">
		</div>
	</div>
	<div id="hidediv" onmouseover=this.style.background='#deeff7' onmouseout=this.style.background='#ffffff'>隐藏弹窗<br/><</div>
  	</div>
	<div id="showbutton" onmouseover=this.style.background='#deeff7' onmouseout=this.style.background='#ffffff'>显示弹窗<br/>></div>
	<div id="lakuang"><img src='resource/image/map/lakuang.png' id="lakuangimg" style="float:right;zoom:1;overflow:hidden;width:25px;height:25px;" text-align:'center' /></div>
	<div id="delete"><img src='resource/image/map/delete.png' id="deleteimg" style="float:right;zoom:1;overflow:hidden;width:25px;height:25px;" text-align:'center' /></div>
</div>
</body>
</html>
<script type="text/javascript" language="javascript" src="app/modules/mapshow/js/showdocktimemap.js" charset="utf-8"></script>
