<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<head>
<title>线路轨迹图</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<script src="resource/commonjs/jquery.min.js"></script>
<script src="resource/commonjs/highcharts.js"></script>
<script src="resource/commonjs/highcharts_exporting.js"></script>
<link href="app/modules/busdynamic/css/busdynamic.css" rel="stylesheet" type="text/css" />
<title>测试</title>
</head>
<body>
<div style=" width:100%; height:100%;">
	<div id="container"></div>
	<div id="chartformdiv">
	<form action="">
	&nbsp;&nbsp;线路：&nbsp;<input type="text" size="18" name="route_id"  onkeydown="if(event.keyCode==13){return false;}" id="route_id">
				&nbsp;&nbsp;上/下行:&nbsp;<select  name="sxx" id="sxx">
					<option value="上行" elected="selected">上行</option>
					<option value="下行">下行</option>
	  			</select>
		&nbsp;&nbsp;<input type="button" id="submit" value="提交">
    </form>
	</div>
</div>
</body>
</html>
<script type="text/javascript" language="javascript" src="app/modules/busdynamic/js/traildynamic.js" charset="utf-8"></script>