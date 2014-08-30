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
			<div id="inputname" align="right" >查找类型:&nbsp;</div>
			<div id="inputfield" align="center">
				<select id="select_object" name="select_object" >		
					<option selected="selected" value="4">公交网络</option>
					<option value="5">重复系数</option>
					<option value="3">专用道网络</option>
					<option value="2">站点线路</option>
					<option value="1">站台形式</option>
				</select>
			</div>
		</div>
								<div id="div_station">
									<div id="inputname" align="right">查找范围:&nbsp;</div>
									<div id="inputfield" align="center">
										<select id="searcharound_radius" name="searcharound_radius">
											<option value="2">港湾式</option>
											<option value="1">非港湾式</option>
											<option value="3">中央岛式</option>
											<option value="0">全部</option>
										</select>
									</div>
								</div>
								<div id="div_repeat">
									<div id="inputname" align="right">查找范围:&nbsp;</div>
									<div id="inputfield" align="center">
										<select id="Select4" name="searcharound_radius">
											<option value="1">单向(NE)</option>
											<option value="2">单向(SW)</option>
											<option value="3">双向</option>
											<option value="4">17条以上</option>
											<option value="5">13-17条</option>
											<option value="6">8-12条</option>
											<option value="7">4-7条</option>
											<option value="8">1-3条</option>
										</select>
									</div>
								</div>
								<div id="div_busnet">
									<div id="inputname" align="right">查找范围:&nbsp;</div>
									<div id="inputfield" align="center">
										<select id="Select5" name="searcharound_radius">
											<option value="1">一公司</option>
											<option value="2">二公司</option>
											<option value="3">三公司</option>
											<option value="4">四公司</option>
											<option value="5">五公司</option>
											<option value="6">六公司</option>
											<option value="7">七公司</option>
											<option value="8">BRT网络</option>
										</select>
									</div>
								</div>
								<div id="div_station_route">
									<div id="inputname" align="right">查找范围:&nbsp;</div>
									<div id="inputfield" align="center">
										<select id="Select3" name="searcharound_radius">
										<option value="4">>8</option>
										<option value="3">>6且<=8</option>
										<option value="2">>4且<=6</option>
										<option value="1">>2且<=4</option>
										<option value="0"><=2</option>
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
	<div id="hideimgdiv2" onmouseover=this.style.background='#f2f3f3' onmouseout=this.style.background='#ffffff'>
	</br>
	&nbsp;<img src='resource/image/map/rc_8_12.png' id="modeimg" style="overflow:hidden;width:30px;height:8px;" text-align:'center' />&nbsp;普通公交专用道</br>
	&nbsp;<img src='resource/image/map/rc_4_7.png' id="modeimg" style="overflow:hidden;width:30px;height:8px;" text-align:'center' />&nbsp;BRT公交专用道</br>
	<center>
		<div style="position:relative; bottom:-5px;text-align:'center'; font-size:10px;">
			点击消失
		</div>
	</center>
	</div>
	<div id="hideimgdiv" onmouseover=this.style.background='#f2f3f3' onmouseout=this.style.background='#ffffff'>
	&nbsp;<img src='resource/image/map/rc_3.png' id="modeimg" style="overflow:hidden;width:30px;height:8px;" text-align:'center' />&nbsp;1-3条线路&nbsp;&nbsp;
	<img src='resource/image/map/rc_8_12.png' id="modeimg" style="overflow:hidden;width:30px;height:8px;" text-align:'center' />&nbsp;8-12条线路</br>
	&nbsp;<img src='resource/image/map/rc_4_7.png' id="modeimg" style="overflow:hidden;width:30px;height:8px;" text-align:'center' />&nbsp;4-7条线路&nbsp;&nbsp;
	<img src='resource/image/map/rc_13_17.png' id="modeimg" style="overflow:hidden;width:30px;height:8px;" text-align:'center' />&nbsp;13-17条线路</br>
	&nbsp;<img src='resource/image/map/rc_17_.png' id="modeimg" style="overflow:hidden;width:30px;height:8px;" text-align:'center' />&nbsp;17条以上线路</br>
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
<script type="text/javascript" language="javascript" src="app/modules/mapshow/js/shownetmap.js" charset="utf-8"></script>