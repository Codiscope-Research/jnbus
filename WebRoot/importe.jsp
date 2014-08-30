<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path;
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>导入</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
   <form id="form1" name="form1" action="<%=basePath%>/servlet/ImporteMessage"  method="post" enctype="multipart/form-data">
  	<a href="<%=basePath%>/upload/发车计划数据导入模板.xls">发车计划数据导入模板下载</a>
   <input type="file" id="file01" name="file01"/>
   <input type="submit" value="导入"/>
   </form>
  </body>
</html>
