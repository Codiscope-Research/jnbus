﻿<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title>济南公交地理信息系统</title>
<%@ page language="java" contentType="text/html; charset=UTF-8"
 pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>


<meta http-equiv="Pragma" content="no-cache"/>
<meta http-equiv="Expires" content="-1"/>

<!--页面左侧栏样式-->
<style type="text/css">
body{
background-color:#FBF0EA;
}

#navigation {
width:100%;
height:720px;
font-family:微软雅黑;
font-weight:bold;
overflow:auto;
}
#navigation > ul {
list-style-type:none;
margin:0px;
padding:0px;
}
#navigation > ul > li {
border-bottom:1px solid #FFA500;
}
#navigation > ul > li > a{
display:block;
padding:5px 5px 5px 0.5em;
text-decoration:none;
border-left:12px solid #711515;
border-right:1px solid #711515;
}
#navigation > ul > li > a:link, #navigation > ul > li > a:visited{
background-color:#F0FFFF;/*ff8c00*/
color:#000000;
}
#navigation > ul > li > a:hover{
	background-color:#ff8c00;
	color:#ffff00;
}

#navigation ul li ul{
	list-style-type:none;
	margin:0px;
	padding:0px 0px 0px 0px;
}
#navigation ul li ul li{
	border-top:1px solid #ED9F9F;
}
#navigation ul li ul li a{
	display:block;
	padding:3px 3px 3px 0.5em;
	text-decoration:none;
	border-left:28px solid #a71f1f;
	border-right:1px solid #711515;
}
/*二级菜单颜色*/
#navigation ul li ul li a:link, #navigation ul li ul li a:visited{
	background-color:#CCCCCC;
	color:#000000;
}
#navigation ul li ul li a.first{
	background-color:white;
}
#navigation ul li ul li a:hover{
	background-color:#FF9933;
	color:#ffff00;
}
#navigation ul li ul.myHide{
	display:none;
}
#navigation ul li ul.myShow{
	display:block;
}
/*<!-->查询时的遮罩层<-->*/
#win {
position:absolute;
top:0%;
left:0%;
width:100%;
height:100%;
background:#000000;
margin:-102px 0 0 -202px;
line-height: 20px;
text-align: center;
border: 4px solid #CCFF99;
opacity:0.5;
filter:alpha(opacity=50);
</style>

<style type="text/css">  
.hidden{display:none;}  
#smallLay{width:240px; height:10px;padding:4px 10px 10px;background-color:#FFFFFF;border:1px solid #05549d;color:#333333;line-height:100px;text-align:left;-webkit-box-shadow:5px 2px 6px #000;-moz-box-shadow:3px 3px 6px #555;}  
#smallLay2{width:240px; height:10px;padding:4px 10px 10px;background-color:#FFFFFF;border:1px solid #05549d;color:#333333;line-height:100px;text-align:left;-webkit-box-shadow:5px 2px 6px #000;-moz-box-shadow:3px 3px 6px #555;}
</style>  


<!--左侧栏展开、收缩控制-->
<script language="javascript" type="text/javascript">
var ctx = '<%=request.getContextPath() %>';
var serv_ip="http://192.168.1.100:8081/";

<%
String path = request.getContextPath()+"/app/MapJiNanv2/";
out.println(request.getParameter("qiehuan"));
%>

function change(){

var oUl = document.getElementById("listUL");
	var aLi = oUl.childNodes;	//子元素
	var oA;
	for(var i=0;i<aLi.length;i++){
		//如果子元素为li，且这个li有子菜单ul
		if(aLi[i].tagName == "LI" && aLi[i].getElementsByTagName("ul").length){
			oA = aLi[i].firstChild;	//找到超链接
			var oSecondDiv = oA.parentNode.getElementsByTagName("ul")[0];
				if(oSecondDiv.className == "myShow")
		oSecondDiv.className = "myHide";
		}
	}

	//通过父元素li，找到兄弟元素ul
	var oSecondDiv = this.parentNode.getElementsByTagName("ul")[0];
	//CSS交替更换来实现显、隐
	if(oSecondDiv.className == "myHide")
		oSecondDiv.className = "myShow";
	else
		oSecondDiv.className = "myHide";
}
//window.onload = function(){
function dch(){
	var oUl = document.getElementById("listUL");
	var aLi = oUl.childNodes;	//子元素
	var oA;
	for(var i=0;i<aLi.length;i++){
		//如果子元素为li，且这个li有子菜单uls
		if(aLi[i].tagName == "LI" && aLi[i].getElementsByTagName("ul").length){
			oA = aLi[i].firstChild;	//找到超链接
			oA.onclick = change;	//动态添加点击函数
		}
	}

}



     function setHeight()

            {

               var max_height = document.documentElement.clientHeight-105;
                 var primary = document.getElementById('navigation');
                 var primary2 = document.getElementById('btn_divider');
                 primary.style.minHeight = max_height+"px";
                 primary.style.maxHeight = max_height+"px"; 
                 primary2.style.top = max_height/2+"px";
                 primary2.style.top = max_height/2+"px";  
                                                 

           }

</script>
<link rel="stylesheet" href="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css" />
<script type="text/javascript" src="http://libs.baidu.com/jquery/1.9.0/jquery.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/resource/commonjs/jquery.jsonp.js"></script>

<script type="text/javascript" src="http://developer.baidu.com/map/custom/stylelist.js"></script>

<script type="text/javascript" src="<%=path%>js/MarkerClusterer_min.js"></script>
<script type="text/javascript" src="<%=path%>js/DistanceTool_min.js"></script>
<!--<script src="http://api.map.baidu.com/api?v=1.4" type="text/javascript"></script>-->
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=nnxL77fSqPkCGqjbeP6osiT2"></script>
<script type="text/javascript" src="<%=path%>js/TrafficControl.js"></script>
<script type="text/javascript" src="<%=path%>js/SearchInfoWindow.js"></script>
<script type="text/javascript" src="<%=path%>js/cus.js"></script>
<script type="text/javascript" src="<%=path%>js/dtcx.js"></script>
<script type="text/javascript" src="<%=path%>js/searchInRectangle.js"></script>
<!--<script type="text/javascript" src="http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js"></script>-->
<!--<script type="text/javascript" src="js/api.js"></script>-->
<!--<script src="js/go2map2.js" type="text/javascript"></script>-->

<link href="<%=path%>css/TrafficControl_min.css" rel="Stylesheet" type="text/css" />
<style id="dcss" type="text/css">
    .clearFloat{clear:both}ul,li,tr,td,input{padding:0;margin:0}
    .xSelect{position:relative;border:1px solid #BBB}
    .xSelect .xSltCon{width:100px;height:17px;overflow:hidden}
    .xSelect li{list-style:none;}
    .xSelect .xSltIpt{width:86px;height:16px;line-height:16px;padding:0px 2px;font-size:12px;padding-left:2px;border:0 none;vertical-align:middle;cursor:default}
    .xSelect .xSltBtn{float:right;width:14px;height:16px;line-height:20px;text-align:center;font-size:11px;text-decoration:none;color:#99B1BF}
    .xSelect .xSltLc{position:absolute;border:1px solid #BBB;top:17px;left:-1px;padding:6px;background:#fff;z-index:99999;cursor:default}
    .xSelect .shdw{position:absolute;margin:2px;background-color:#000000;opacity:0.3;filter:alpha(opacity=30)}
    .xSelect table{width:100%}
    </style>

<link href="<%=path%>css/bj2.css" rel="stylesheet" type="text/css"/>



<script type="text/javascript" language="javascript">
	var liststr;
	var strsplit = "," ;
	var lists="";
	var xmlHttp;
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

</script>
<!--控制菜单层的显示与关闭-->
<script language="javascript" type="text/javascript">
				var clickHandler=function(e){        
                var pt = e.point;
                gc.getLocation(pt, function(rs){
                    var addComp = rs.addressComponents;
                   // alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                  document.getElementById("road_name").value=addComp.street;
                   roadname_show_sel(addComp.street,1);
                });       
                };
                
                
//                var clickHandler2=function(e){        
//                var pt2 = e.point;
//                };
                
                
	function qiehuan(num){
	    map.clearOverlays();//清楚地图覆盖物
	    map.removeEventListener('rightclick', clickHandler);
//	    map.removeEventListener('click', clickHandler2);
	    var ima="<div></div>"
	    document.getElementById("div_bus_qstbar2").style.display="none";
 document.getElementById("navigation").innerHTML=ima;
				if(num==0)
				{
var ima="<div><iframe frameborder='0' scrolling='no' width='100%' style='height:97%;' src='intro.html'></iframe></div>"
 document.getElementById("navigation").innerHTML=ima;
 				document.getElementById("div_bus_qstbar").style.display="none";
 				document.getElementById("div_bus_qstbar2").style.display="block";
				document.getElementById("xscheck").style.display="none";
				}
				else
				{
				}
				if(num==1)
				{
				document.getElementById("div_bus_qstbar").style.display="block";
				document.getElementById("xscheck").style.display="block";
				show_all_route();
//				getxzfq();
				}
				else
				{
				document.getElementById("div_bus_qstbar").style.display="none";
				document.getElementById("xscheck").style.display="none";			
				}
				if(num==2)
				{
				document.getElementById("div_searchrange_qstbar").style.display="block";
				}
				else
				{
				document.getElementById("div_searchrange_qstbar").style.display="none";
				}
				if(num==3)
				{
				document.getElementById("div_searcharound_qstbar").style.display="block";
                map.addEventListener('rightclick', clickHandler);
//                map.addEventListener('click', clickHandler2);
                
				}
				else
				{
				document.getElementById("div_searcharound_qstbar").style.display="none";
				}
				if(num==4)
				{
				document.getElementById("div_searchfeature_qstbar").style.display="block";
				}
				else
				{
				document.getElementById("div_searchfeature_qstbar").style.display="none";
				}
				if(num==5)
				{
				document.getElementById("div_searchfeature_qstbar1").style.display="block";
				}

		for(var id = 0;id<=5;id++)
		{
			if(id==num)
			{
//				document.getElementById("qh_con"+id).style.display="block";
				document.getElementById("mynav"+id).className="select";
				document.getElementById("qh_con"+id).className="select";
			}
			else
			{
//				document.getElementById("qh_con"+id).style.display="none";
				document.getElementById("mynav"+id).className="";
				document.getElementById("qh_con"+id).className="";
			}
		}
	}
	
	
</script>
</head>
<body onload="setHeight();" onresize="setHeight();">
	<!-- container -->
	<div id="div_container">
			
		<!-- container - center -->
		<div id="div_container_center">
			<!-- header -->
			<div id="header">
				<!-- top panel -->
				<div id="div_toppn">
					<div id="gj_logo" style="float:left">
						<img src="/bus/app/MapJiNanv2/images/logo2.png" alt="/bus/app/MapJiNanv2/images/gj_logo.gif" width="300" height="40"/>
					</div>
					
					<div id="div_topmn">
						<ul>
						<li id="mynav0" onclick="qiehuan(0);" class="select"><span id="qh_con0" class="select">首页</span></li>
							<li id="mynav1" onclick="qiehuan(1);" class=""><span id="qh_con1" class="">线路查询</span></li>
							<li id="mynav2" onclick="qiehuan(2);" class=""><span id="qh_con2" class="">站点查询</span></li>
							<li id="mynav3" onclick="qiehuan(3);" class=""><span id="qh_con3" class="">道路查询</span></li> 
							<li id="mynav4" onclick="qiehuan(4);" class=""><span id="qh_con4" class="">网络查询</span></li>
							<li id="mynav5" onclick="qiehuan(5);" class=""><span id="qh_con5" class="">动态查询</span></li>
						</ul>
					</div>
<div style="MARGIN: 6px 5px 0px; FLOAT: right"><button id="btnTraffic" onclick="window.open('czsc.htm')"
class="submitBtn" name="btnTraffic"><span>帮助</span></button> 
<div class="clearfix"></div></div>
					</div>
				
<!-- QUICK SEARCH TOOLBAR -->
				<div id="div_qstbars">
					
<!-- SECTION 1 -->
					<div class="section" style="width:590px;">

<!-- BUS TOOLBAR 精准查询-->
						<div id="div_bus_qstbar" class="qstbar" style="display: none;">										
								<div class="form_block" style="float:left;width:200px;">
									<img style="float:left;width:13px;height:12px;margin:4px 2px 4px 10px;" src="/bus/app/MapJiNanv2/images/icon_power_left_2.gif" alt="" />
									<div style="float:left;line-height:20px;">线路&nbsp;</div>
									<div style="float:left;height:20px;width:135px;">
										<div class="input_kw">
											
										<div class="input_ctl"><input type="text" class="qstbar_input" id="txtInput2" name="bus_tb_fromkey" value=""  /></div>
										<div id="bus_tb_from_tips" style="display: none;"></div>
										</div>
										<div class="clearfix">&nbsp;</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="form_block" style="float:left;width:50px;">
									<button id="bus_tb_submit" name="bus_tb_submit" onclick="show_search_result(2);"  class="submitBtn"><span>查询</span></button>
									</div>				
							<div class="clearfix">&nbsp;</div>
						</div>
<!--						首页切换地图主题-->
						<div id="div_bus_qstbar2" class="qstbar" style="display: block;">										
								<div class="form_block" style="float:left;width:200px;">
									<img style="float:left;width:13px;height:12px;margin:4px 2px 4px 10px;" src="/bus/app/MapJiNanv2/images/icon_power_left_2.gif" alt="" />
									<div style="float:left;line-height:20px;">地图主题&nbsp;											
									<select id="stylelist" name="czlx" style="width:100px" onchange="changeMapStyle(this.value);">
                                            <option value="default">默认样式</option>
											<option value="light">清新蓝</option>
											<option value="dark">黑夜</option>
											<option value="redalert">红色警戒</option>
											<option value="googlelite">精简</option>
											<option value="grassgreen">自然绿</option>
											<option value="midnight">午夜蓝</option>
											<option value="pink">浪漫粉</option>
											<option value="darkgreen">青春绿</option>
											<option value="bluish">清新蓝绿</option>
											<option value="grayscale">高端灰</option>
											<option value="hardedge">强边界</option>
										</select></div>
									<div style="float:left;height:20px;width:135px;">
										<div class="input_kw">
											
										<div class="input_ctl">
										</div>
										<div id="Div4" style="display: none;"></div>
										</div>
										<div class="clearfix">&nbsp;</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
<!--								<div class="form_block" style="float:left;width:50px;">
									<button id="Button6" name="bus_tb_submit" onclick="show_search_result(2);"  class="submitBtn"><span>查询</span></button>
									</div>	-->			
							<div class="clearfix">&nbsp;</div>
						</div>
<!-- SEARCH RANGE TOOLBAR 站点搜索 -->
						<div id="div_searchrange_qstbar" class="qstbar" style="display: none;">
								<div class="form_block" style="float:left;">
									<img style="float:left;width:13px;height:12px;padding:4px 2px 4px 10px;" src="/bus/app/MapJiNanv2/images/icon_power_left_2.gif" alt="" />
									<div class="form_block" style="float:left;">
									<div style="float:left;line-height:20px;">查找方式&nbsp;</div>
									<div style="float:left;height:20px;width:85px;">
										<select id="Select1" name="czlx" onchange="change22();">
                                            <option value="1">关键字</option>
											<option value="2">拉框搜索</option>
										</select>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
									<div id="gjz" style="float:left;height:20px;width:135px">
										<div class="input_kw">
											
										<div class="input_ctl">
										<input type="text" class="qstbar_input" id="gjzd_name" name="searcharound_key" size="35" value="" />
										<div id="Div1" style="display: none;"></div></div></div>
										<div class="clearfix">&nbsp;</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="form_block" style="float:left;" id="gjzss">
									<div style="float:left;line-height:20px;"><button id="Button2" onclick="station_show_sel();" name="" class="submitBtn"><span>查询</span></button>&nbsp;</div>
									<div class="clearfix">&nbsp;</div>
								</div>

								<div class="form_block" style="float:left; display:none" id="lkss">
									<button id="Button3" name="searcharound_submit" onclick="open_lakuang();" class="submitBtn"><span id="dt_lakuang">拉框搜索</span></button>	<!--<button id="Button2" name="searcharound_submit" onclick="pullBox.close();" class="submitBtn"><span>关闭拉框</span></button>-->
									</div>	
									

								<div class="form_block" style="float:left;width:190px;">
									<img style="float:left;width:13px;height:12px;margin:4px 1px 4px 0;"  src="/bus/app/MapJiNanv2/images/icon_power_right_2.gif" alt="" />
									<div style="float:left;line-height:20px;">范围&nbsp;</div>
									<div style="float:left;height:20px;width:135px;">
										<div class="input_kw">
											
										<div class="input_ctl">
										<input type="text" class="qstbar_input" id="fgfw" value="300" name="bus_tb_tokey" value="" />
										<button id="Button5" name="bus_tb_submit" class="submitBtn" onclick="fugai();"><span>覆盖</span></button>
										</div>
										<div id="bus_tb_to_tips" style="display: none;"></div></div>
										<div class="clearfix">&nbsp;</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="form_block" style="float:left;width:50px;">
									<!--<button id="Button5" name="bus_tb_submit" class="submitBtn" onclick="fugai();"><span>覆盖</span></button>-->								</div>
						</div>
						<script type="text/javascript" language="javascript">
						function change22()
						{
						    var t=document.getElementById("Select1");
                            var sele=t.options[t.selectedIndex].value;
                            if(sele==1)
                            {
                            document.getElementById("gjz").style.display="block";
                            document.getElementById("gjzss").style.display="block";
                            document.getElementById("lkss").style.display="none";
                            }
                            else
                            {
                            document.getElementById("gjz").style.display="none";
                            document.getElementById("gjzss").style.display="none";
                            document.getElementById("lkss").style.display="block";
                            }
						}
						</script>
<!--SEARCH FEATURE TOOLBAR 道路搜索 -->
								<div id="div_searcharound_qstbar" class="qstbar" style="display: none;">
                                <div class="form_block" style="float:left;">
									<img style="float:left;width:13px;height:12px;padding:4px 2px 4px 10px;" src="/bus/app/MapJiNanv2/images/icon_power_left_2.gif" alt="" />
									<div class="form_block" style="float:left;">
									<div style="float:left;line-height:20px;">查找方式&nbsp;</div>
									<div style="float:left;height:20px;width:85px;">
										<select id="Select2" name="czlx" onchange="change23();">
                                            <option value="1">关键字</option>
											<option value="2">公交走廊</option>
										</select>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
									<div id="gjz2" style="float:left;height:20px;width:135px">
										<div class="input_kw">
											
										<div class="input_ctl">
										<input type="text" class="qstbar_input" id="road_name" name="searcharound_key" size="35" value="" />
										<div id="Div3" style="display: none;"></div></div></div>
										<div class="clearfix">&nbsp;</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="form_block" style="float:left;" id="gjzss2">
									<div style="float:left;line-height:20px;"><button id="Button1" onclick="roadname_show_sel22(1);" name="" class="submitBtn"><span>查询</span></button>&nbsp;</div>
									<div class="clearfix">&nbsp;</div>
								</div>

								<div class="form_block" style="float:left; display:none" id="lkss2">
									<button id="Button4" name="searcharound_submit" onclick="roadname_show_sel22(2);" class="submitBtn"><span>搜索</span></button>	<!--<button id="Button2" name="searcharound_submit" onclick="pullBox.close();" class="submitBtn"><span>关闭拉框</span></button>-->
									</div>	
							
						</div>
						<script type="text/javascript" language="javascript">
						function roadname_show_sel22(iit)
						{
						var roadname=document.getElementById("road_name").value;
						roadname_show_sel(roadname,iit);
						}
						function change23()
						{
						    var t=document.getElementById("Select2");
                            var sele=t.options[t.selectedIndex].value;
                            if(sele==1)
                            {
                            document.getElementById("gjz2").style.display="block";
                            document.getElementById("gjzss2").style.display="block";
                            document.getElementById("lkss2").style.display="none";
                            }
                            else
                            {
                            document.getElementById("gjz2").style.display="none";
                            document.getElementById("gjzss2").style.display="none";
                            document.getElementById("lkss2").style.display="block";
                            }
						}
						</script>
<!-- SEARCH TOOLBAR -->

							<div id="div_searchfeature_qstbar1" class="qstbar" style="display: none;">
								<div class="form_block" style="float:left;">
									<img style="float:left;width:13px;height:12px;padding:4px 2px 4px 10px;" src="/bus/app/MapJiNanv2/images/icon_power_left_2.gif" alt="" />
									<div style="float:left;line-height:20px;">搜索类型&nbsp;</div>
									<div style="float:left;height:20px;width:135px;">
										<select id="searchfeature_type" name="searchfeature_type">											
											<option value="BJ1">超速查看</option>
											<option value="BJ2">停靠时间</option>
																					</select>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="form_block" style="float:left;">
									<div style="float:left;line-height:20px;">线路&nbsp;</div>
									<div style="float:left;height:20px;width:135px;">
										<div class="input_kw">
											
										<div class="input_ctl">
										<input type="text" class="qstbar_input" id="searchfeature_key" name="searchfeature_key" value="" /></div>
										<div id="searchfeature_key_tips"  style="display: none;"></div></div>
										<div class="clearfix">&nbsp;</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="form_block" style="float:left;">
									<button id="searchfeature_submit" name="searchfeature_submit" class="submitBtn" onclick="dtcx();" style="position: relative; z-index: 9999;"><span>查询</span></button>								</div>
							<div class="clearfix">&nbsp;</div>
						</div>
<!-- SEARCH AROUND TOOLBAR 专题查看-->

							<div id="div_searchfeature_qstbar" class="qstbar" style="display: none;">
									<div class="form_block" style="float:left;">
									<img style="float:left;width:13px;height:12px;padding:4px 2px 4px 10px;" alt="" src="/bus/app/MapJiNanv2/images/icon_power_left_2.gif" />
									<div style="float:left;line-height:20px;">查找类型&nbsp;</div>
									<div style="float:left;height:20px;width:120px;">
										<select id="searcharound_objectlayers" name="searcharound_objectlayers" onchange="change24();" style="position:relative;z-index:9999;">
<!--											<option value="0">场站布局</option>-->
																					
											<option selected="selected" value="4">公交网络</option>
											<option value="5">重复系数</option>
											<option value="3">专用道网络</option>
											<option value="2">站点线路</option>
											<option value="1">站台形式</option>


										</select>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>

								<div id="sta_xs" class="form_block" style="float:left; display:none">
									<div style="float:left;line-height:20px;">查找范围&nbsp;</div>
									<div style="float:left;height:20px;width:85px;">
										<select id="searcharound_radius" name="searcharound_radius">
											<option value="2">港湾式</option>
											<option value="1">非港湾式</option>
											<option value="3">中央岛式</option>
											<option value="0">全部</option>
										</select>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
									<div id="chaxun" class="form_block" style="float:left; display:none">
									<div style="float:left;line-height:20px;">查看方式&nbsp;</div>
									<div style="float:left;height:20px;width:85px;">
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
									<div class="clearfix">&nbsp;</div>
								</div>
									<div id="gswl" class="form_block" style="float:left; display:block">
									<div style="float:left;line-height:20px;">查看方式&nbsp;</div>
									<div style="float:left;height:20px;width:85px;">
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
									<div class="clearfix">&nbsp;</div>
								</div>
									<div id="szfw" class="form_block" style="float:left; display:none">
									<div style="float:left;line-height:20px;">查找范围&nbsp;</div>
									<div style="float:left;height:20px;width:85px;">
										<select id="Select3" name="searcharound_radius">
										<option value="4">>8</option>
										<option value="3">>6且<=8</option>
										<option value="2">>4且<=6</option>
											<option value="1">>2且<=4</option>
											<option value="0"><=2</option>
										</select>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="form_block" style="float:left;">
									<button id="ss" name="searcharound_submit" class="submitBtn" onclick="ztcx();"><span>查询</span></button>								</div>	
							
						</div>
						<script type="text/javascript" language="javascript">
						function change24()
						{
						    var t=document.getElementById("searcharound_objectlayers");
                            var sele=t.options[t.selectedIndex].value;
                            if(sele==1)
                            {
                            document.getElementById("sta_xs").style.display="block";
                            document.getElementById("szfw").style.display="none";
                            document.getElementById("chaxun").style.display="none";
                            document.getElementById("gswl").style.display="none";
                            }
                            else if(sele==2)
                            {
                            document.getElementById("sta_xs").style.display="none";
                            document.getElementById("szfw").style.display="block";
                            document.getElementById("chaxun").style.display="none";
                            document.getElementById("gswl").style.display="none";
                            }
                            else if(sele==5)
                            {
                            document.getElementById("sta_xs").style.display="none";
                            document.getElementById("szfw").style.display="none";
                            document.getElementById("chaxun").style.display="block";
                            document.getElementById("gswl").style.display="none";
                            }
                            else if(sele==4)
                            {
                            document.getElementById("sta_xs").style.display="none";
                            document.getElementById("szfw").style.display="none";
                            document.getElementById("gswl").style.display="block";
                            document.getElementById("chaxun").style.display="none";
                            }
                            else
                            {
                            document.getElementById("sta_xs").style.display="none";
                            document.getElementById("szfw").style.display="none";
                            document.getElementById("chaxun").style.display="none";
                            document.getElementById("gswl").style.display="none";
                            }
						}
						</script>

						<!--SECTION1-->
					</div>
<!-- SECTION 2 -->
					<div class="section" style="width:330px;">
<!-- BUSINFO TOOLBAR -->
			<div style="background-color:#C8DFFF;padding-top:5px;height:20px;">
<!--								<div class="form_block" style="float:left;width:280px;">
									<div style="float:left;line-height:20px;padding:0 0 0 15px;">线路查询&nbsp;</div>
									<div style="float:left;height:20px;width:210px;">
										<div class="input_kw">
											
										<div class="input_ctl">
										<input type="text" class="qstbar_input" id="txtInput" name="businfo_tb_key" value="" style="width:200px;" /></div></div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>-->
								<div class="form_block" style="float:right;width:200px">				
									<!--<button id="businfo_tb_submit" name="businfo_tb_submit" onclick="show_search_result(1);" class="submitBtn"><span>模糊查询</span></button>-->								</div>						
							<div class="clearfix">&nbsp;</div>
						</div>						
					</div>
					
					<div class="clearfix">&nbsp;</div>
					<!--endof QUICK SEARCH TOOLBAR-->
				</div>	
				<!--endof head-->			
			</div>
			
			<div class="clearfix">&nbsp;</div>
			
			<!-- search result container -->
			<div id="div_scont">
								<div id="div_main">
								
				<div class="content">
				
					<!-- header panel -->
					<div id="div_header_bar" >
						<!--//<img id="imgBusSetting" class="header_panel_icon" src="../elements/image/map/map_new/orange_icon_info.gif" align="absmiddle" onclick="toggle('div_bus_setting_panel')" title="搜索选项"/>//-->
						<div id="xscheck" style="display: block;">仅显示首末站：<input id="smz" type="checkbox" checked="checked" /></div>
					</div>
					<div id="loading"></div>
					<div id="navigation" style="overflow:scroll"></div>

					<!-- search container panels -->
					<div id="div_scont_panels" class="bus" style="height: 758px;">
						<div id="div_panels_info" style="padding:6px;position:relative;">
							<!--<div style="padding:4px 8px; border:1px dotted #FFD489; background-color:#FEFFEC; font-size:10px">公测阶段，如发现问题，请您详尽描述，并发送至邮箱： <a href="mailto:l-s-y2001@163.com?subject=公测阶段问题" style="color:#333">l-s-y2001@163.com</a>。给您带来的不便，敬请谅解！</div>-->
						</div>
<!-- SEARCH PANEL -->
						<div class="queryPanel" id="div_search_panel" style="display: none;">
							
							<div class="panel_tool" id="search_toolPanel">
								<div id="around_search_option"></div>
							</div>
						</div>

						
					</div>
				</div>
				<!-- horizontal divider  -->
				<div id="div_hdivider" style="height: 798px;">
					<img title="折叠" src="/bus/app/MapJiNanv2/images/btn_divider_collapse.jpg" id="btn_divider" onclick="ml(&#39;div_scont&#39;,-284)" style="padding: 358px 0px 0px;" />
				</div>
								</div><!--end div_main-->
							</div>			<!-- search result container -->
			
						<!-- map container -->
			<div id="div_mcont" style="height:798px">

				<!-- map area -->
<!--				<div id="maparea2" style="height: 748px; display:none;  position:relative; display:block; text-align: left; overflow:auto; background-color: rgb(255, 255, 255);"><iframe frameborder="0" scrolling="no"width="100%" style="height:100%;" src="bus_net.htm"></iframe></div>
-->			
<div id="maparea" style="height:798px; position:relative; text-align: left; overflow:auto; background-color: rgb(255, 255, 255);"></div>
			
			</div>
			<div class="clearfix">&nbsp;</div>
			</div>
		<!-- endof container - center -->
		
	</div>
	<!-- endof container -->
	
	<div class="clearfix">&nbsp;</div>
	

<script type="text/javascript">
	function $e(a)
	{
		return document.getElementById(a)
	}
function ml(i,j)//elementid,pixels
	{
		var e = $e(i);
		
		if(e.style.marginLeft==0 || e.style.marginLeft=='' || e.style.marginLeft=='0px')
		{
			$e("btn_divider").setAttribute("title","展开");
			$e("btn_divider").setAttribute("src","images/btn_divider_expand.jpg");
			e.style.marginLeft = j + 'px';
		}
		else
		{
			$e("btn_divider").setAttribute("title","折叠");
			$e("btn_divider").setAttribute("src","/bus/app/MapJiNanv2/images/btn_divider_collapse.jpg");
			e.style.marginLeft = 0;
		}
	}</script>


<!--<div id="win" style="display:none"><img src="Images/loading.gif" />数据加载中，请稍后……</div>-->
<div id="smallLay" style="display:none"><img src="/bus/app/MapJiNanv2/images/loading4.gif"  alt=""/></div>
<div id="smallLay2" style="display:none"><img src="/bus/app/MapJiNanv2/images/loading4.gif"  alt=""/></div>

</body>

</html>


<script type="text/javascript">
    //创建和初始化地图函数：
    var point ;
        var map = new BMap.Map("Maparea");//在百度地图容器中创建一个地图
//    var map = new BMap.Map("Maparea");//在百度地图容器中创建一个地图


var ctrl = new BMapLib.TrafficControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT,showPanel:true});
map.addControl(ctrl);

    function initMap()
    {
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
        
//        addcon();//添加自定义控件
//        station_info();//加载公交站点信息
listview_onload(); 
//ztcx();
    }
    
   
    
    //创建地图函数：
    function createMap()
    {
//        var map = new BMap.Map("Maparea");//在百度地图容器中创建一个地图
        point = new BMap.Point(117.007863, 36.676649);//定义一个中心点坐标
        map.centerAndZoom(point,13);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局}
        //鼠标单击显示经纬度
        var marker;
        function creatmarker(point)
        {
            map.removeOverlay(marker);
            marker=new BMap.Marker(point);
        //        marker.enableDragging();
            map.addOverlay(marker);
        //        //创建信息窗口
        //        var infoWindow1 = new BMap.InfoWindow(point.lng+";"+point.lat);
        //        marker.addEventListener("mouseover", function(){point.lng+";"+point.lat});
        }
        
        
      //更改地图样式    
        
// 定义一个控件类,即function
function ZoomControl(){
  // 默认停靠位置和偏移量
  this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
  this.defaultOffset = new BMap.Size(119, 10);
}

// 通过JavaScript的prototype属性继承于BMap.Control
ZoomControl.prototype = new BMap.Control();

// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
ZoomControl.prototype.initialize = function(map){
  // 创建一个DOM元素
  var div = document.createElement("div");
  // 添加文字说明
  div.appendChild(document.createTextNode("测距"));
  // 设置样式
  div.style.cursor = "pointer";
  div.style.border = "1px solid #8ba4d8";
  div.style.backgroundColor = "white";
//  div.style.background="url('http://api.map.baidu.com/images/tools_menu.gif')";
  div.style.width="43px";
  
  div.style.textAlign="center";
  div.style.height="20px";
  div.style.lineHeight="20px";
  div.style.fontFamily="宋体";
  div.style.fontSize="12.5";
//  div.style.fontWeight="bold";
  // 绑定事件,点击一次放大两级
  var myDis = new BMapLib.DistanceTool(map);
  div.onclick = function(e){
//    map.setZoom(map.getZoom() + 2);
myDis.open(); 
  }
  // 添加DOM元素到地图中
  map.getContainer().appendChild(div);
  // 将DOM元素返回
  return div;
}
// 创建控件
var myZoomCtrl = new ZoomControl();
// 添加到地图当中
map.addControl(myZoomCtrl);
        
        

        function showInfo(e)
        {
            createXMLHTTP();
            xmlHttp.onreadystatechange=function()
            {
              if (xmlHttp.readyState==4 && xmlHttp.status==200)
                {
                var strjwdd=xmlHttp.responseText;
                 mycars=strjwdd.split("|"); //字符分割 
                var pt = new BMap.Point(mycars[0], mycars[1]);
                var srcc= "img/"+mycars[2];
                document.getElementById("Image1").src = srcc;
                document.getElementById("Img2").src = srcc;
                creatmarker(pt);
                }
                }
                var url=serv_ip+"Read_Data.aspx?id=3&lng="+e.point.lng+"&lat="+e.point.lat+"&route2="+document.getElementById("txtInput").value;
                xmlHttp.open("GET",url,true);
                xmlHttp.send(null);
        }
    map.addEventListener("dblclick", showInfo);
    }
    
    
    //地图事件设置函数：
    function setMapEvent()
    {
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
//        map.enableKeyboard();//启用键盘上下左右键移动地图

    }
    
    //地图控件添加函数：
    function addMapControl()
    {
        //向地图中添加缩放控件
	var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_ZOOM});
	map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
	var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
	map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
	var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
	map.addControl(ctrl_sca);
	
	map.addControl(new BMap.MapTypeControl());          //添加地图类型控件
//	map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]}));     //2D图，卫星图
//    map.addControl(new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT}));    //左上角，默认地图控件




    }
    


function changeMapStyle(style)
{
//var sel = document.getElementById('stylelist').value;
//代码使用如下,即可. 模板页可以查看http://developer.baidu.com/map/custom/list.htm      
map.setMapStyle({style:style});
  //end 更改地图样式  
}




var gc = new BMap.Geocoder(); 
function open_lakuang()
{
var lg=0;
    map.clearOverlays();//清楚地图覆盖物
    if(document.getElementById("dt_lakuang").innerText=="拉框搜索")
    {
    document.getElementById("dt_lakuang").innerHTML="关闭拉框";
    lg=0;
    }
    else
    {
    document.getElementById("dt_lakuang").innerHTML="拉框搜索";
    lg=1;
    }
//var t=document.getElementById("czlx");
//    var fx=t.options[t.selectedIndex].value;
var keyword = "公交站点";
//        var markers = [];
//        var roadname="";
        var pullBox = new BMapLib.SearchInRectangle(map,keyword,{
            renderOptions:{
                map: map,
                strokeWeight: 3,
                strokeColor: "red",
                fillColor:"white",
                opacity: 0.5,                
                followText: "拖拽鼠标搜索"+ keyword +"",
                autoClose: true,
                autoViewport: true,
                alwaysShowOverlay: true,
                panel: "",
                selectFirstResult: false
            }

       });   
//        search_road_name(roadname);  
        pullBox.setLineStyle("dashed");
    if(lg==0)
    {
    pullBox.open();
    }
    else
    {
     pullBox.close();
    }
        
}

function show_info()
{
    map.clearOverlays();//清楚地图覆盖物
    var t=document.getElementById("Select1");
    var fx=t.options[t.selectedIndex].value;
    var rou = document.getElementById("txtInput").value;

    showCustomer(rou,fx,0,0);
}

var bx,by,xh
function showCustomer(rou,fx,ys,iit)
{
//showid('smallLay');
//var ima="<div style='text-align:center'><img src='Images/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
// document.getElementById("navigation").innerHTML=ima;
    createXMLHTTP();
    var mycars = new Array();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
        var strjwdd=xmlHttp.responseText;
		//alert("ccc  "+strjwdd);
         mycars=strjwdd.split("*"); //字符分割 
    //     map.clearOverlays();//清楚地图覆盖物
         addPolyline(mycars,ys,iit);//向地图中添       
            
         setTimeout(function(){station_road_info(rou,fx);},500);
//                    showalldiv();
        }
    }
	if (fx=="上行")
		fx=1;
	else
		fx=2;
    var url="ajaxproxy?id=2&route="+rou+"&sxx="+fx;
	//alert(url);
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}  
  
  
//关键字搜索站点
  
  function station_show_sel()
  {
//  showid('smallLay');
var ima="<div style='text-align:center'><img src='<%=path%>Images/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
 document.getElementById("navigation").innerHTML=ima;
  map.clearOverlays();//清楚地图覆盖物
  if(document.getElementById("gjzd_name").value=="")
  {
//  station_info();
  }
  else
  {
  show_station(document.getElementById("gjzd_name").value);
  }
//  showalldiv();
  } 
  

  
  
  
function station_road_info(rou,fx)
 {
    createXMLHTTP();
    var mycars=new Array();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
        var strjwdd=xmlHttp.responseText;
		//alert(strjwdd);
         mycars=strjwdd.split("*"); //字符分割 
//          addRow(mycars);
          for (var i = 0; i <mycars.length ; i ++) 
          {
          var mycars2 = new Array();
          mycars2=mycars[i].split("|");
          addMarker(mycars2,mycars.length);
          }
        }
    }
//    var t=document.getElementById("Select1");
  //  var url=serv_ip+"Read_Data.aspx?id=5&route5="+rou+"&sxx="+fx;

  if (fx=='上行')
	fx=1;
  else
	fx=2;
  var url="ajaxproxy?id=5&route5="+rou+"&sxx="+fx;
  //alert(url);
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
 }
 //加载全部公交站点
  function station_info()
 {
  createXMLHTTP();
    var mycars=new Array();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
//        showalldiv();
        var strjwdd=xmlHttp.responseText;
         mycars=strjwdd.split("*"); //字符分割 
                   listview_station(mycars2);
          for (var i = 0; i <mycars.length ; i ++) 
          {
          var mycars2 = new Array();
          mycars2=mycars[i].split("|");
          addMarker3(mycars2,mycars.length);
          }
        }
    }
    var url=serv_ip+"Read_Data.aspx?id=14";
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
 }
 
 function show_station_info(mycars3){ 
 mycars2=mycars3.split("|"); 
     var phy_station_id=mycars2[3];
     var stes=document.getElementById("imags");
     stes.style.display="block";
//     showid('smallLay');
//var ima="<div style='text-align:center'><img src='Images/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
// document.getElementById("navigation").innerHTML=ima;
     show_allroute(phy_station_id); 
//     var mycars=new Array();
//        mycars=mycars3.split("|"); //字符分割 
//     var point2 = new BMap.Point(mycars[0],mycars[1]);
//      var opts = {
//          width : 0,     // 信息窗口宽度
//          height: 0,     // 信息窗口高度
//          offset: new BMap.Size(0, -20),
//          title:"<h4>站点名称："+mycars[2]+"<h4/>"
//        }
//        var infocontent="站台形式:"+mycars[6]+";</br>站台长度:"+mycars[5]+"米;</br>站台宽度:"+mycars[7]+"米;</br>所经线路:"+mycars[4];
//        var infoWindow = new BMap.InfoWindow(infocontent,opts);  // 创建信息窗口对象
//        map.openInfoWindow(infoWindow,point2);
}
 
 
 function listview_station(mycars)
{
var str="";
var sss="<ul id='listUL'>";
var ss1="</ul>";
var zh="";
var recordcount=mycars.length;

var ima22="<div style='text-align:center'><img src='Images/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
var ste="<li id='imags' style='display:none'>"+ima22+"</li>"
if(mycars[0]=="")
{
recordcount=0;
}
var ima="<li>查询到"+recordcount+"条记录；（单击查看所经线路）</li>"
if(mycars[0]!="")
{
     for(var i=0;i<mycars.length;i++)
     {
     tjxl=mycars[i].split("|")[4].split(",");
     var xlzh="&nbsp";
         for(var tj=0;tj<tjxl.length-1;tj++)
         {
         xlzh=xlzh+tjxl[tj]+"&nbsp";
         }
      zh=mycars[i].split("|")[2]+"("+mycars[i].split("|")[8]+")--"+mycars[i].split("|")[6]+"</br>广告位数："+mycars[i].split("|")[9]+"</br>途经线路:"+xlzh;
      str=str+"<li><a href=javascript:void(0); onclick=show_station_info('"+mycars[i]+"'); onmouseover=show_station_name3('"+mycars[i]+"'); onmouseout=remove_div();>"+zh+" </a></li>";
     }
 }
     
 var sst=sss+ima+str+ste+ss1;
 document.getElementById("navigation").innerHTML=sst;
 //控制左侧菜单
if(mycars[0]!="")
{ 
 dch();
 }
// //取消查询遮罩
//showalldiv();
}
//拉框搜索站点
function search_station_arange(swlng,swlat,nelng,nelat)
{
//showid('smallLay');
var ima="<div style='text-align:center'><img src='Images/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
 document.getElementById("navigation").innerHTML=ima;
createXMLHTTP();
    var mycars=new Array();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
//        showalldiv();
        var strjwdd=xmlHttp.responseText;
         mycars=strjwdd.split("*"); //字符分割
         mycarsqj=mycars; 
          listview_station(mycars);
          for (var i = 0; i <mycars.length ; i ++) 
          {
          var mycars2 = new Array();
          mycars2=mycars[i].split("|");
          if(mycars2[0]!="")
          {
          addMarker4(mycars2);
          }
           document.getElementById("dt_lakuang").innerHTML="拉框搜索";
          }
        }
    }
    var url="ajaxproxy?id=29&swlng="+swlng+"&swlat="+swlat+"&nelng="+nelng+"&nelat="+nelat;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}

  function addMarker3(mycars3,lenn)
 {
     var icon = new BMap.Icon("/app/images/busstop.gif", new BMap.Size(13,13));
    var point2 = new BMap.Point(mycars3[0],mycars3[1]);
    var marker = new BMap.Marker(point2,{icon:icon});
    marker.disableMassClear();
    map.addOverlay(marker);
    marker.hide();
    var sjccc=mycars3[4];
    sjccc=sjccc.substr(0,sjccc.length-1);
     marker.addEventListener("dblclick",function(){map.clearOverlays();
     show_allroute(sjccc);});
    marker.addEventListener("click",function(){   
      var opts = {
          width : 0,     // 信息窗口宽度
          height: 0,     // 信息窗口高度
          title:"站点名称："+mycars3[1]+"<br/>途经线路："+sjccc
        }
        var infocontent="";
        var infoWindow = new BMap.InfoWindow(infocontent,opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow,point2);
});
    
//    map.addEventListener("zoomend",function(){
//    if(map.getZoom()>15)
//    {marker.show();}
//    else
//    {marker.hide();}
//    })
}
 function gjzdfgl()
 {
  createXMLHTTP();
    var mycars=new Array();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
        var strjwdd=xmlHttp.responseText;
         mycars=strjwdd.split("*"); //字符分割 
          for (var i = 0; i <mycars.length ; i ++) 
          {
          var mycars2 = new Array();
          mycars2=mycars[i].split("|");
          addMarker2(mycars2,mycars.length);
          }
        }
    }
    var url=serv_ip+"Read_Data.aspx?id=14";
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
 }
 var mycarsqj=new Array();
 //关键字搜索站点
  function show_station(zd_name)
 {
  createXMLHTTP();
   var pointss=[];
    var mycars=new Array();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
//        showalldiv();
        var strjwdd=xmlHttp.responseText;
         mycars=strjwdd.split("*"); //字符分割 
         listview_station(mycars)
            mycarsqj=mycars;
          for (var i = 0; i <mycars.length ; i ++) 
          {
          var mycars2 = new Array();
          mycars2=mycars[i].split("|");
          if(mycars2[0]!="")
          {
          addMarker4(mycars2);
          
	            pointss[i]=new BMap.Point(mycars2[0],mycars2[1]);
          //调整最佳视野
//          setTimeout(function(){map.setViewport([new BMap.Point(mycars[0].split("|")[0],mycars[0].split("|")[1]),new BMap.Point(mycars[0].split("|")[0],mycars[0].split("|")[1])]);},500);          //调整到最佳视野
          }
          }
                     
            map.setViewport(pointss);    //调整视野
        }
    }
    var url=serv_ip+"Read_Data.aspx?id=26&zdname="+zd_name;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
 }
 //站点搜索
 function addMarker4(mycars3)
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
             var mycars22=new Array();
             mycars22=mycars3[4].split(",");
            var infocontent=mycars22.length-1;
        var label = new BMap.Label(infocontent, opts);  // 创建文本标注对象
	     label.setStyle({
		 color : "#FFFFFF",
		 fontSize : "12px",
		 height : "20px",
		 lineHeight : "20px",
		 fontFamily:"微软雅黑",
		 border :"0", 
		 fontWeight :"bold" ,
		 backgroundColor :"0.05"
//		 backgroundColor:"#339933",
//         borderColor:"#0066CC"
	 });
    map.addOverlay(label);
    
    marker.addEventListener("click",function(){  
      var opts = {
          width : 0,     // 信息窗口宽度
          height: 0,     // 信息窗口高度
          offset: new BMap.Size(0, -20),
          title:"站点名称："+mycars3[2]
        }
        var infocontent="站台形式:"+mycars3[6]+";</br>站台长度:"+mycars3[5]+"米;</br>站台宽度:"+mycars3[7]+"米;</br>途经线路:"+mycars3[4];
        
//    var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
//                    '<img src="" alt="images/000296-9-201310090355550069-0017200.jpg" style="float:right;zoom:1;overflow:hidden;width:500px;height:130px;margin-left:3px;"/>' +
//                    '站台形式：'+mycars3[6]+';<br/>站台长度：'+mycars3[5]+'米;<br/>站台宽度：'+mycars3[7]+'米;<br/>广告位数：'+mycars3[9]+'<br/>所经线路：'+mycars3[4]+'' +
//                  '</div>';
    var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '站台形式：'+mycars3[6]+';<br/>站台长度：'+mycars3[5]+'米;<br/>站台宽度：'+mycars3[7]+'米;<br/>广告位数：'+mycars3[9]+'<br/>途经线路：'+mycars3[4]+'' +
                  '</div>';
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow,point2);
});

    var phy_station_id=mycars3[3];
     marker.addEventListener("dblclick",function(){
//     showid('smallLay');
var ima="<div style='text-align:center'><img src='Images/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
 document.getElementById("navigation").innerHTML=ima;
     show_allroute(phy_station_id);}); 
}
 
 function addMarker2(mycars3,lenn)
 {
     var icon = new BMap.Icon("images/sta2.png", new BMap.Size(15,15));
    var point2 = new BMap.Point(mycars3[0],mycars3[1]);
    var marker = new BMap.Marker(point2,{icon:icon});
    map.addOverlay(marker);
    var circle = new BMap.Circle(point2,500,{strokeColor:"blue",FillColor:"white", strokeWeight:4, strokeOpacity:0.5,FillOpacity:0.5, strokeStyle:"ridge"});
    map.addOverlay(circle);
    marker.addEventListener("onmouseover",function(){
    document.getElementById("zdmc").value=mycars3[2];});
}
 
 
 
 
 function addMarker(mycars3,lenn)
 {
     var icon;
    if(mycars3[6]==1)
    {
      icon = new BMap.Icon("<%=path%>images/lt1.gif", new BMap.Size(10,9));
    }
    else
    {
    icon = new BMap.Icon("<%=path%>images/lt2.gif", new BMap.Size(10,9));
    }
    var point2 = new BMap.Point(mycars3[4],mycars3[5]);
//    var marker = new BMap.Marker(point2,{icon:icon});
var marker=new BMap.Marker(point2,{
    icon:icon,
    title:mycars3[1]
});
    map.addOverlay(marker);
    //添加首末站站名
if(document.getElementById("smz").checked==true)
{
    if((mycars3[0]==1)||(mycars3[0]==lenn))
    {
        var opts = {
           position : point2,    // 指定文本标注所在的地理位置
           offset: new BMap.Size(0, -35)    //设置文本偏移量
//           title:mycars3[1]
        }
         var infocontent=mycars3[1];
        var label = new BMap.Label(infocontent, opts);  // 创建文本标注对象
	     label.setStyle({
		 color : "#FFFFFF",
		 fontSize : "12px",
		 height : "20px",
		 lineHeight : "20px",
		 fontFamily:"微软雅黑",
		 backgroundColor:"#0099FF",
         borderColor:"blue"
	 });
    map.addOverlay(label);   
    }
}
else
{
        var opts = {
           position : point2,    // 指定文本标注所在的地理位置
           offset: new BMap.Size(0, -35)    //设置文本偏移量
//           title:mycars3[1]
        }
         var infocontent=mycars3[1];
        var label = new BMap.Label(infocontent, opts);  // 创建文本标注对象
	     label.setStyle({
		 color : "#FFFFFF",
		 fontSize : "12px",
		 height : "20px",
		 lineHeight : "20px",
		 borderColor: "blue",
		 backgroundColor:"#0099FF",
		 fontFamily:"微软雅黑"
	 });
    map.addOverlay(label);   
}
//end添加首末站站名
marker.addEventListener("click",function(){  
      var opts = {
          width : 0,     // 信息窗口宽度
          height: 0,     // 信息窗口高度
          title:"站点名称："+mycars3[1]
        }
//        var infocontent="站台长度:"+mycars3[2]+";</br>距离上站:"+mycars3[3]+"米;</br>站台形式:"+mycars3[7]+";</br>所经车次:"+mycars3[8];
//            var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
//                    '<img src="images/000296-9-201310090355550069-0017200.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:500px;height:130px;margin-left:3px;"/>' +
//                    '站台形式：'+mycars3[7]+';<br/>距离上站：'+mycars3[3]+'米;<br/>站台长度：'+mycars3[2]+'米;<br/>途经线路：'+mycars3[8]+'' +
//                  '</div>';
            var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '站台形式：'+mycars3[7]+';<br/>距离上站：'+mycars3[3]+'米;<br/>站台长度：'+mycars3[2]+'米;<br/>途经线路：'+mycars3[8]+'' +
                  '</div>';
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow,point2);
});

       
     
    
} 
  var iii=0;
  function show_allroute(phy_station_id)
  {
//map.clearOverlays();
      var mycars55 = new Array();
      var mycars66 = new Array();
    createXMLHTTP();
    xmlHttp.onreadystatechange=function()
    {
        if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
            var strjwdd=xmlHttp.responseText;
             mycars55=strjwdd.split("#"); //字符分割 
             var ssd=mycars55.length;
             for(var jj=0;jj<mycars55.length;jj++)
             {
             mycars66=mycars55[jj].split("*"); //字符分割 
             addPolyline_route_mul(mycars66,jj);
             }
             addsmzd(phy_station_id);
//             showalldiv();
     var stes=document.getElementById("imags");
     stes.style.display="none";
        }
    }
    var url=serv_ip+"Read_Data.aspx?id=33&phy_station_id="+phy_station_id;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
  }
   
   
   function addsmzd(phy_station_id)
   {
         var mycars55 = new Array();
      var mycars66 = new Array();
    createXMLHTTP();
    xmlHttp.onreadystatechange=function()
    {
        if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
            var strjwdd=xmlHttp.responseText;
             mycars55=strjwdd.split("*"); //字符分割 
             for(var jj=0;jj<mycars55.length;jj++)
             {
             mycars66=mycars55[jj].split("|"); //字符分割 
             
             
                var icon;
                 icon = new BMap.Icon("<%=path%>images/lt1.gif", new BMap.Size(10,9));
                var point2 = new BMap.Point(mycars66[1],mycars66[2]);
                var marker=new BMap.Marker(point2,{
                    icon:icon
                });
                map.addOverlay(marker);
                
                
                
                 var opts = {
                   position : point2,    // 指定文本标注所在的地理位置
                   offset: new BMap.Size(0, -30)    //设置文本偏移量
                }
                 var infocontent=mycars66[0];
                var label = new BMap.Label(infocontent, opts);  // 创建文本标注对象
	             label.setStyle({
		         color : "#FFFFFF",
		         fontSize : "12px",
		         height : "20px",
		         lineHeight : "20px",
		         fontFamily:"微软雅黑",
		         backgroundColor:"#0099FF",
                 borderColor:"blue"
	         });
            map.addOverlay(label); 
             
             }
        }
    }
    var url=serv_ip+"Read_Data.aspx?id=53&phy_station_id="+phy_station_id;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
   }
   
   function addPolyline_route_mul(mycars77,jc)
{       
	var points = [];
	var p1;
	var p2;
	 var line;
	for(var j=1;j<mycars77.length;j++)
	{
		p1 = mycars77[j].split("|")[0];
		p2 = mycars77[j].split("|")[1];
		points[j-1]=new BMap.Point(p1,p2);

	}
	var color;
	switch(jc)
	{
	case 0: color="#FF0000";break;
	case 1: color="#FF60AF";break;
	case 2: color="#B15BFF";break;
	case 3: color="#ADADAD";break;
	case 4: color="#0000E3";break;
	case 5: color="#00AEAE";break;
	case 6: color="#00DB00";break;
	case 7: color="#7D7DFF";break;
	case 8: color="#F9F900";break;
	case 9: color="#FF8000";break;
	case 10: color="#984B4B";break;
	case 11: color="#A5A552";break;
	case 12: color="#6FB7B7";break;
	case 13: color="#5A5AAD";break;
	case 14: color="#B766AD";break;
	case 15: color="#5B4B00";break;
	case 16: color="#EA7500";break;
	case 17: color="#9F35FF";break;
	case 18: color="#0072E3";break;
	case 19: color="#BBFFFF";break;
	case 20: color="#EAC100";break;
	
	}
	    line = new BMap.Polyline(points, {strokeColor:color, strokeWeight:5, strokeOpacity:1, strokeStyle:"ridge"}); 
	    map.addOverlay(line);
		
	}

   
function showzh_info(rou,fx)
{
    createXMLHTTP();
    xmlHttp.onreadystatechange=function()
    {
        if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
            var strjwdd=xmlHttp.responseText;
             mycars=strjwdd.split("|"); //字符分割 
        }
    }
    var url=serv_ip+"Read_Data.aspx?id=4&route4="+rou+"&sxx="+encodeURI(fx);
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}     
   



//计算路径距离
function distance()
{
    var dis=0;
    var p1;
    var p2;
    var p3;
    var pointA;
    var pointB;
    for(var j=0;j<mycars.length;j++)
    {
        if(j!=0)
        {
             pointA = new BMap.Point(p1,p2);
        }			
         p1 = mycars[j].split("|")[0];
         p2 = mycars[j].split("|")[1];
         p3 = mycars[j].split("|")[3];
         pointB = new BMap.Point(p1,p2);
         if(j!=0)
         { 
            dis=dis+map.getDistance(pointA,pointB);
         }
    }
    var diss="线路GPS里程:"+(dis/1000).toFixed(1)+"千米";
    document.getElementById("jwd").innerHTML=diss;
    //alert("线路距离为:"+dis/1000+"千米");
}

function  temp(xll,i)
{
map.clearOverlays();//清楚地图覆盖物
var sfdfdsf=document.getElementById("imags"+i);
sfdfdsf.style.display="block";
       showCustomer(xll.split("|")[0],xll.split("|")[5],0,i);    
}
function  temp2(xll,i)
{
var sfdfdsf=document.getElementById("imags"+i);
sfdfdsf.style.display="block";
       showCustomer(xll.split("|")[0],xll.split("|")[1],1,i);     
}



// 复杂的自定义覆盖物
    function ComplexCustomOverlay(point, text, mouseoverText){
      this._point = point;
      this._text = text;
      this._overText = mouseoverText;
    }
    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function(map){
      this._map = map;
      var div = this._div = document.createElement("div");
      div.id="div";
      div.style.position = "absolute";
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
      div.style.backgroundColor = "#FFCC00";
      div.style.border = "2px solid #FF6600";
      div.style.color = "#000000";
      div.style.height = "18px";
      div.style.padding = "2px";
      div.style.lineHeight = "18px";
      div.style.whiteSpace = "nowrap";
      div.style.MozUserSelect = "none";
      div.style.fontSize = "12px"
      var span = this._span = document.createElement("span");
      div.appendChild(span);
      span.appendChild(document.createTextNode(this._text));      
      var that = this;

      var arrow = this._arrow = document.createElement("div");
      arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
      arrow.style.position = "absolute";
      arrow.style.width = "11px";
      arrow.style.height = "10px";
      arrow.style.top = "22px";
      arrow.style.left = "10px";
      arrow.style.overflow = "hidden";
      div.appendChild(arrow);
     
      div.onmouseover = function(){
        this.style.backgroundColor = "#6BADCA";
        this.style.borderColor = "#0000ff";
//        this.getElementsByTagName("span")[0].innerHTML = that._overText;
        arrow.style.backgroundPosition = "0px -20px";
      }

      div.onmouseout = function(){
        this.style.backgroundColor = "#EE5D5B";
        this.style.borderColor = "#BC3B3A";
        this.getElementsByTagName("span")[0].innerHTML = that._text;
        arrow.style.backgroundPosition = "0px 0px";
      }

      map.getPanes().labelPane.appendChild(div);
      
      return div;
    }
    ComplexCustomOverlay.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
      this._div.style.top  = pixel.y - 37 + "px";
    }



function remove_div()
{
var mydiv=document.getElementById("div");
   if (mydiv != null)
        mydiv.parentNode.removeChild(mydiv);
}


function show_route_name(point,xll)
{
var point2 = point;
    var txt = "银湖海岸城", mouseoverTxt = txt + " " + parseInt(Math.random() * 1000,10) + "套" ;
        
    var myCompOverlay = new ComplexCustomOverlay(point2, xll.split("|")[6]+":"+xll.split("|")[8],mouseoverTxt);
        map.addOverlay(myCompOverlay);
}

function show_station_name(xll)
{
var point2 = new BMap.Point(xll.split("|")[8],xll.split("|")[9]);
    var txt = "银湖海岸城", mouseoverTxt = txt + " " + parseInt(Math.random() * 1000,10) + "套" ;
        
    var myCompOverlay = new ComplexCustomOverlay(point2, xll.split("|")[7],mouseoverTxt);
        map.addOverlay(myCompOverlay);
}

function show_station_name3(xll)
{
var point2 = new BMap.Point(xll.split("|")[0],xll.split("|")[1]);
    var txt = "银湖海岸城", mouseoverTxt = txt + " " + parseInt(Math.random() * 1000,10) + "套" ;
        
    var myCompOverlay = new ComplexCustomOverlay(point2, xll.split("|")[2],mouseoverTxt);
        map.addOverlay(myCompOverlay);
}

function show_station_name2(xll)
{
var point2 = new BMap.Point(xll.split("|")[0],xll.split("|")[1]);
    var txt = "银湖海岸城", mouseoverTxt = txt + " " + parseInt(Math.random() * 1000,10) + "套" ;
        
    var myCompOverlay = new ComplexCustomOverlay(point2, xll.split("|")[2],mouseoverTxt);
        map.addOverlay(myCompOverlay);
}

function showid(idname)
{  
    var isIE = (document.all) ? true : false;  
    var isIE6 = isIE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6);  
    var newbox=document.getElementById(idname);  
    newbox.style.zIndex="9999";  
    newbox.style.display="block"  
    newbox.style.position = !isIE6 ? "fixed" : "absolute";  
    newbox.style.top =newbox.style.left = "50%";  
    newbox.style.marginTop = - newbox.offsetHeight / 2 + "px";  
    newbox.style.marginLeft = - newbox.offsetWidth / 2 + "px";    
    var layer=document.createElement("div");  
    layer.id="layer";  
    layer.style.width=layer.style.height="100%";  
    layer.style.position= !isIE6 ? "fixed" : "absolute";  
    layer.style.top=layer.style.left=0;  
    layer.style.backgroundColor="#000";  
    layer.style.zIndex="9998";  
    layer.style.opacity="0.6";  
    document.body.appendChild(layer);  
//    var sel=document.getElementsByTagName("select");  
//    for(var i=0;i<sel.length;i++){          
//    sel[i].style.visibility="hidden";  
//}  
function layer_iestyle()
{        
    layer.style.width=Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth)  
    + "px";  
    layer.style.height= Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) +  
    "px";  
}  
function newbox_iestyle()
{        
    newbox.style.marginTop = document.documentElement.scrollTop - newbox.offsetHeight / 2 + "px";  
    newbox.style.marginLeft = document.documentElement.scrollLeft - newbox.offsetWidth / 2 + "px";  
}  
if(isIE){layer.style.filter ="alpha(opacity=60)";}  
if(isIE6){    
layer_iestyle()  
newbox_iestyle();  
window.attachEvent("onscroll",function(){                                
newbox_iestyle();  
})  
window.attachEvent("onresize",layer_iestyle)            
}    


}  


function showalldiv()
{
document.getElementById("smallLay").style.display="none";
document.getElementById("smallLay2").style.display="none";
//document.getElementById("layer").style.display="none";
var my = document.getElementById("layer");
    if (my != null)
        my.parentNode.removeChild(my);
}


function listview(mycars)
{
var iii=1;
var str="";
var sss="<ul id='listUL'>";
var ss1="</ul>";
var ii=1;
var zh="";
var zh2="";
var ends="</ul></li>";
var lists="";
var fsst="";
var ima22="<div style='text-align:center'><img src='<%=path%>images/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
//var ste="<li id='imags' style='display:none'>"+ima22+"</li>"
 for(var i=0;i<mycars.length;i++)
 {
 if(ii==1)
 {
  zh=mycars[i].split("|")[0]+"路----("+mycars[i].split("|")[5]+")";
  zh2="线路长度:"+mycars[i].split("|")[1]+"千米;</br>非直线系数："+mycars[i].split("|")[10]+"</br>专用道里程："+mycars[i].split("|")[3]+"千米;</br>专用道比率："+(mycars[i].split("|")[3]/mycars[i].split("|")[1]*100).toFixed(1)+"%;</br>站点总数："+mycars[i].split("|")[2]+"处;</br>港湾站台数："+mycars[i].split("|")[4]+"处";
  str=str+"<li><a href=javascript:temp('"+mycars[i]+"',"+i+");>"+zh+" </a><ul class=myHide><li id='imags"+i+"' style='display:none'>"+ima22+"</li><li> <a class=first href='#'>"+zh2+"</a></li>";
  lists=lists+"<li><a href=javascript:void(0);onmouseover=show_station_name('"+mycars[i]+"'); onmouseout=remove_div();>"+mycars[i].split("|")[6]+"--"+mycars[i].split("|")[7]+"</a></li>";
 }
 else if (ii==0)
 {
 lists=lists+"<li><a href=javascript:void(0); onmouseover=show_station_name('"+mycars[i]+"'); onmouseout=remove_div();>"+mycars[i].split("|")[6]+"--"+mycars[i].split("|")[7]+"</a></li>";
 }
 var yz2="";
 if(i!=mycars.length-1)
 {
 yz2=mycars[i+1].split("|")[0]+mycars[i+1].split("|")[5];
 }
 else
 {
  yz2=mycars[i].split("|")[0]+mycars[i].split("|")[5];
 }
 if((mycars[i].split("|")[0]+mycars[i].split("|")[5])==yz2)
 {
 ii=0;
 }
 else
 {
 ii=1;
 iii++;
 fsst=fsst+str+lists+ends;
 str="";
 lists="";
 }
 }
  fsst=fsst+str+lists+ends;
  var ifsf=0;
  if(mycars[0]=="")
  {
  iii=0;
  fsst="";
  sss="";
  ss1="";
  ifsf=1;
  }
//  var ima="<li><img style='height:150' src='Images/tuli.jpg' height='30%' width='92%' vertical-align:'top' text-align:'center' /></li><li>查询到"+iii+"条记录</li>";
  var ima="<div><li><iframe frameborder='0' scrolling='no' width='100%' style='height:150px;'  src='<%=path%>tuli.html'></iframe></li><li>查询到"+iii+"条记录</li></div>";

 var sst=sss+ima+fsst+ss1;
 document.getElementById("navigation").innerHTML=sst;
 if(ifsf==0)
 {
 dch();
 }
//showalldiv();
}


function listview_onload()
{

//var ima="<img src='Images/index.gif' height='50%' width='95%' vertical-align:'top' text-align:'center' />";
var ima="<div><iframe frameborder='0' scrolling='no' width='100%' style='height:97%;'  src='intro.html'></iframe></div>"
 
 document.getElementById("navigation").innerHTML=ima;


}
function show_search_result(jing_mo)
    {
//showid('smallLay');
var ima="<div style='text-align:center'><img src='/app/MapJiNanv2/images/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
 document.getElementById("navigation").innerHTML=ima;
        map.clearOverlays();//清楚地图覆盖物
        var rou="";
        if(jing_mo==1)
        {
           rou=document.getElementById("txtInput").value;
        }
        else
        {
        rou=document.getElementById("txtInput2").value;
        }
    createXMLHTTP();
    var mycars = new Array();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
        var strjwdd=xmlHttp.responseText;
         mycars=strjwdd.split("*"); //字符分割 
        
         listview(mycars);
        }
    }

    var url="ajaxproxy?id=28&route="+rou+"&jm="+jing_mo;
	//alert(url);
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
    
    }



function show_all_route()
    {
    map.clearOverlays();//清楚地图覆盖物
    var rou="";
    createXMLHTTP();
    var mycars = new Array();
    
    
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
        var strjwdd=xmlHttp.responseText;
         mycars=strjwdd.split("*"); //字符分割 
         
         listview223(mycars);
        }
    }

    //var url=serv_ip+"Read_Data.aspx?id=47";
    var url="ajaxproxy?id=47";
    xmlHttp.open("get",url,true);
    xmlHttp.send(null);
    
    }


function listview223(mycars)
{
var str="";
var sss="<ul id='listUL'>";
var ss1="</ul>";
var ii=1;
var zh="";
var zh2="";
var lists="";
var fsst="";
//var ima="<li><img style='height:150' src='Images/tuli.jpg' height='30%' width='92%' vertical-align:'top' text-align:'center' /></li><li>查询到"+mycars.length+"条记录</li>";
var ima="<div><li><iframe frameborder='0' scrolling='no' width='100%' style='height:150px;'  src='<%=path%>tuli.html'></iframe></li><li>查询到"+mycars.length+"条记录</li></div>";
var ima22="<div style='text-align:center'><img src='<%=path%>images/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
//var ste="<li id='imags' style='display:none'>"+ima22+"</li>"
 for(var i=0;i<mycars.length;i++)
 {

  zh=mycars[i].split("|")[0]+"路----("+mycars[i].split("|")[1]+")";
  str="<li><a href=javascript:temp2('"+mycars[i]+"',"+i+");>"+zh+" </a></li><li id='imags"+i+"' style='display:none'>"+ima22+"</li>";
    fsst=fsst+str;
 }

 var sst=sss+ima+fsst+ss1;
 document.getElementById("navigation").innerHTML=sst;
// dch();
}




//var marker66;
function show_route_info(ee,xl,sxx)
{
    var mycars55 = new Array();
 createXMLHTTP();
            xmlHttp.onreadystatechange=function()
            {
              if (xmlHttp.readyState==4 && xmlHttp.status==200)
                {
                var strjwdd=xmlHttp.responseText;
                 mycars55=strjwdd.split("|"); //字符分割 
                var srcc= "img/"+mycars55[2];
                var srcc2=srcc.replace("-9-","-1-");
                  
        var opts = {
          width : 0,     // 信息窗口宽度
          height: 0,     // 信息窗口高度
          enableMessage:true,//设置允许信息窗发送短息
          offset: new BMap.Size(0, -20),
          title:xl+"路-车道数量："+mycars55[3]
        }
//              var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
//                    '<img src='+srcc+' alt="'+srcc+'" onerror=this.src="'+srcc2+'" style="float:right;zoom:1;overflow:hidden;width:400px;height:220px;margin-left:3px;"/>' +
//                  '</div>';
              var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '<img src='+srcc2+' alt="'+srcc2+'" style="float:right;zoom:1;overflow:hidden;width:400px;height:220px;margin-left:3px;"/>' +
                  '</div>';
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow,ee); 
                
                }
                }
                var url=serv_ip+"Read_Data.aspx?id=3&lng="+ee.lng+"&lat="+ee.lat+"&xl="+xl+"&sxx="+sxx;
                xmlHttp.open("post",url,true);
                xmlHttp.send(null);
}



function addPolyline(mycars,ys,iit)
{
   
	var points = [];
	var p1;
	var p2;
	var ii=0;
	var buslan;
	var line;
	var line2;
		var pointss=[];
	for(var j=0;j<mycars.length;j++)
	{
	p1 = mycars[j].split("|")[0];
	p2 = mycars[j].split("|")[1];
	pointss[j]=new BMap.Point(p1,p2);
	buslan=mycars[j].split("|")[3];
		if(j<mycars.length-2)
		{
		buslan1=mycars[j+1].split("|")[3];
		}
		else
		{
		buslan1=mycars[j].split("|")[3];
		}

        if(buslan==1)
		{
	        points[j-ii]=new BMap.Point(p1,p2);
		}
		else
		{
		ii=j+1;
		}
		if((buslan!=buslan1)||((j==mycars.length-1)&&(mycars[mycars.length-1].split("|")[3]==1)))
		{
		var ys2;
		if(ys==1)
		{
		ys2='#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
		}
		else
		{
		ys2="blue";
		}
			line2 = new BMap.Polyline(points, {strokeColor:"#FF9900", strokeWeight:12, strokeOpacity:0.9, strokeStyle:"ridge"}); 
	        map.addOverlay(line2);
	        line2.addEventListener("click",function(e){
            show_route_info(e.point,mycars[0].split("|")[6],mycars[0].split("|")[8]);
	        });
	        points = [];
		}
	}
	line = new BMap.Polyline(pointss, {strokeColor:ys2, strokeWeight:6, strokeOpacity:0.9, strokeStyle:"ridge"}); 
	map.addOverlay(line);
    line.addEventListener("mouseover",function(e){
    show_route_name(e.point,mycars[0]);
    });
    line.addEventListener("mouseout",function(e){
    remove_div();
    });
	var sdfsfds=document.getElementById("imags"+iit);
	sdfsfds.style.display="none";
	

	        
	        
	        
	        line.addEventListener("click",function(e){
            show_route_info(e.point,mycars[0].split("|")[6],mycars[0].split("|")[8]);
	        });

	
map.setViewport(line.getPath());    //调整视野
}
//添加行政分区
function getxzfq()
{
var i=0;
var iist=setInterval(function(){
    getBoundary(i);
    i++;
    if(i>5)
    {
    clearInterval(iist);
    }
}, 1000);
}


function getBoundary(ii){  
var color="#FF0000";
var qq="";
   switch(ii)
	{
	case 0: color="#FF0000";qq="历下区";break;
	case 1: color="#FF60AF";qq="槐荫区";break;
	case 2: color="#B15BFF";qq="市中区";break;
	case 3: color="#ADADAD";qq="天桥区";break;
	case 4: color="#0000E3";qq="历城区";break;
	case 5: color="#00AEAE";qq="长清区";break;
	}
    var bdary = new BMap.Boundary();
    bdary.get(qq, function(rs){       //获取行政区域      
        var count = rs.boundaries.length; //行政区域的点有多少个
        for(var i = 0; i < count; i++){
            var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 8, strokeColor: color}); //建立多边形覆盖物
            map.addOverlay(ply);  //添加覆盖物
            map.setViewport(ply.getPath());    //调整视野         
        }                
    });   
}
		 
initMap();//创建和初始化地图


document.getElementById("div_toppn").style.display="none";
qiehuan(<%=request.getParameter("qiehuan")%>);
</script>
<script type="text/javascript" src="<%=path%>js/TextIconOverlay_min.js"></script>