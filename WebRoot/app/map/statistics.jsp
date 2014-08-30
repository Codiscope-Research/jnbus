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
		<title>站点超速统计</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">

		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/css/table.css">

		<style type="text/css">
html {
	height: 100%
}

body {
	height: 100%;
	margin: 0px;
	padding: 0px
}

#container {
	height: 100%
}

#apDiv1 {
	position: absolute;
	width: 1000px;
	height: 150px;
	z-index: 2;
	margin-left: 5px;
	margin-top: 5px;
}

#apDiv2 {
	position: absolute;
	width: 300px;
	height: 140px;
	z-index: 2;
	right: 5px;
	bottom: 295px;
}

#apDiv3 {
	position: absolute;
	width: 300px;
	height: 140px;
	z-index: 2;
	right: 5px;
	bottom: 150px;
}

#apDiv4 {
	position: absolute;
	width: 300px;
	height: 140px;
	z-index: 2;
	right: 5px;
	bottom: 5px;
}

#apDiv100 {
	position: absolute;
	width: 180px;
	height: 50px;
	z-index: 2;
	margin-left: 5px;
	margin-top: 50px;
}
</style>
		<script type="text/javascript"
			src="http://api.map.baidu.com/api?v=1.5&ak=n1SSalem6xqM2OrVQVf3NkcG"></script>
		<script type="text/javascript"
			src="http://developer.baidu.com/map/jsdemo/demo/convertor.js"></script>
		<script type="text/javascript"
			src="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/js/jquery-1.6.2.min.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/FusionCharts/FusionCharts.js"></SCRIPT>
		<script type="text/javascript"
			src="<%=basePath%>/js/My97DatePicker/WdatePicker.js"></script>
		<link rel="stylesheet"
			href="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css" />
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

// 添加默认时间--当前日期
init_searchDate();
}

// 添加默认时间--当前日期
function init_searchDate(){
var myDate = new Date();
var year=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
var month=myDate.getMonth()+1;    //获取当前月份(0-11,0代表1月)
if(month<10){
month="0"+month;
}
var day=myDate.getDate();        //获取当前日(1-31)
document.getElementById("start_date").value=year+"-"+month+"-"+day;
document.getElementById("end_date").value=year+"-"+month+"-"+day;
}

// 添加统计控件
function addFusoinCharts(){
tj_top(null,'0.0','0.0','0.0');
tj_Middle(null,'0.0','0.0','0.0');
tj_bottom(null,'0.0','0.0','0.0');
}
// 统计图点击事件查询坐标点
function showPoint(fq_type,bfb_type,station){
var routeid_cp=document.getElementById("routeid_cp").value;
var start_date_cp=document.getElementById("start_date_cp").value;
var end_date_cp=document.getElementById("end_date_cp").value;
var baidu_lng="";
var baidu_lat="";
var rowid="";
var station_code="";
var station_name="";
var conent_date="";
var conent_time="";
var conent_standard="";
var conent_nowvalue="";
$.ajax({
				type:"POST",
				url:"<%=basePath%>/servlet/ZPWCsPointShow",
				data:{fq_type:fq_type,
						bfb_type:bfb_type,
						station:station,
						routeId:routeid_cp,
						start_date:start_date_cp,
						end_date:end_date_cp
				},
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
							  	 
							  	 if(stas_attres[0].split("=").length>1){
							  	  	rowid=stas_attres[0].split("=")[1];
							  	  }
							  	  if(stas_attres[2].split("=").length>1){
							  	  	station_code=stas_attres[2].split("=")[1];
							  	  }
							  	  if(stas_attres[3].split("=").length>1){
							  	  	conent_date=stas_attres[3].split("=")[1];
							  	  }
							  	  if(stas_attres[4].split("=").length>1){
							  	  	conent_time=stas_attres[4].split("=")[1];
							  	  }
							  	  if(stas_attres[5].split("=").length>1){
							  	  	baidu_lng=stas_attres[5].split("=")[1];
							  	  }
							  	  if(stas_attres[6].split("=").length>1){
							  	  	baidu_lat=stas_attres[6].split("=")[1];
							  	  }
							  	  if(stas_attres[7].split("=").length>1){
							  	  	conent_standard=stas_attres[7].split("=")[1];
							  	  }
							  	  if(stas_attres[8].split("=").length>1){
							  	  	conent_nowvalue=stas_attres[8].split("=")[1];
							  	  }
							  	  if(stas_attres[9].split("=").length>1){
							  	  	station_name=stas_attres[9].split("=")[1];
							  	  }
							  	  baidu_lng=parseFloat(baidu_lng.substring(0,baidu_lng.length-4))+parseFloat(baidu_lng.substring(baidu_lng.length-4,baidu_lng.length-2)/60)+parseFloat(baidu_lng.substring(baidu_lng.length-2,baidu_lng.length)/3600);
								  baidu_lat=parseFloat(baidu_lat.substring(0,baidu_lat.length-4))+parseFloat(baidu_lat.substring(baidu_lat.length-4,baidu_lat.length-2)/60)+parseFloat(baidu_lat.substring(baidu_lat.length-2,baidu_lat.length)/3600);
								  var point_s = new BMap.Point(baidu_lng, baidu_lat);
								  BMap.Convertor.translate(point_s,0,function(point){
								  point_s=point;
								  });//调用坐标转换函数   
								  var mess="站点名称:"+station_name+"<br/>超速时间："+conent_date+" "+conent_time+"<br/>标准速度:"+conent_standard+"<br/>超速速度:"+conent_nowvalue;
								  addMarker(point_s,mess);
							  }
							}
						}
						var point = new BMap.Point(baidu_lng, baidu_lat); 
						map.centerAndZoom(point, 15);  
					}
				}
		});
}


// 统计早高峰时段
function tj_top(station,z_cs_10,z_cs_20,z_cs_30){
if(z_cs_10==null||z_cs_10==""){
z_cs_10="0";
}
if(z_cs_20==null||z_cs_20==""){
z_cs_20="0";
}
if(z_cs_30==null||z_cs_30==""){
z_cs_30="0";
}

var chart2 = new FusionCharts("<%=basePath%>/FusionCharts/FCF_Column3D.swf", "chart2Id", "300", "140"); 
	if(z_cs_10==0&&z_cs_20==0&&z_cs_30==0){
		chart2.setDataXML("<graph caption='平峰期超速统计'><set name='10%及以下' color='D64646' /><set name='10%-20%' color='AFD8F8' /><set name='30%及以上' color='D646FF' /></graph>");
	}else{
		chart2.setDataXML("<graph caption='早高峰期超速统计'><set name='10%及以下' value='"+z_cs_10+"' color='D64646' link=\"JavaScript:showPoint('01','10','"+station+"');\"/><set name='10%-20%' value='"+z_cs_20+"' color='AFD8F8' link=\"JavaScript:showPoint('01','20','"+station+"');\"/><set name='30%及以上' value='"+z_cs_30+"' color='D646FF' link=\"JavaScript:showPoint('01','30','"+station+"');\"/></graph>");
	}
chart2.render("chart2div");
}

// 统计平峰时段
function tj_Middle(station,z_cs_10,z_cs_20,z_cs_30){
if(z_cs_10==null||z_cs_10==""){
z_cs_10="0";
}
if(z_cs_20==null||z_cs_20==""){
z_cs_20="0";
}
if(z_cs_30==null||z_cs_30==""){
z_cs_30="0";
}

var chart3 = new FusionCharts("<%=basePath%>/FusionCharts/FCF_Column3D.swf", "chart3Id", "300", "140"); 
	if(z_cs_10==0&&z_cs_20==0&&z_cs_30==0){
		chart3.setDataXML("<graph caption='平峰期超速统计'><set name='10%及以下' color='D64646' /><set name='10%-20%' color='AFD8F8' /><set name='30%及以上' color='D646FF' /></graph>");
	}else{
		chart3.setDataXML("<graph caption='平峰期超速统计'><set name='10%及以下' value='"+z_cs_10+"' color='D64646' link=\"JavaScript:showPoint('02','10','"+station+"');\"/><set name='10%-20%' value='"+z_cs_20+"' color='AFD8F8' link=\"JavaScript:showPoint('02','20','"+station+"');\"/><set name='30%及以上' value='"+z_cs_30+"' color='D646FF' link=\"JavaScript:showPoint('02','30','"+station+"');\"/></graph>");
	}
chart3.render("chart3div");
}

// 统计晚高峰时段
function tj_bottom(station,z_cs_10,z_cs_20,z_cs_30){
if(z_cs_10==null||z_cs_10==""){
z_cs_10="0";
}
if(z_cs_20==null||z_cs_20==""){
z_cs_20="0";
}
if(z_cs_30==null||z_cs_30==""){
z_cs_30="0";
}
var chart4 = new FusionCharts("<%=basePath%>/FusionCharts/FCF_Column3D.swf", "chart4Id", "300", "140"); 
	if(z_cs_10==0&&z_cs_20==0&&z_cs_30==0){
		chart4.setDataXML("<graph caption='晚高峰期超速统计'><set name='10%及以下' color='D64646' /><set name='10%-20%' color='AFD8F8' /><set name='30%及以上' color='D646FF' /></graph>");
	}else{
		chart4.setDataXML("<graph caption='晚高峰期超速统计'><set name='10%及以下' value='"+z_cs_10+"' color='D64646' link=\"JavaScript:showPoint('03','10','"+station+"');\"/><set name='10%-20%' value='"+z_cs_20+"' color='AFD8F8' link=\"JavaScript:showPoint('03','20','"+station+"');\"/><set name='30%及以上' value='"+z_cs_30+"' color='D646FF' link=\"JavaScript:showPoint('03','30','"+station+"');\"/></graph>");
	}
chart4.render("chart4div");
}

// 编写自定义函数,创建标注
function addMarker(point,conentMes){
 var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '<img src="<%=basePath%>/img/gj.jpg" alt="公交" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>'+conentMes+'</div>';
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

// 获取站点信息统计数据
function selectStation_tj(){
var start_date=document.getElementById("start_date").value;
var end_date=document.getElementById("end_date").value;
var routeId=document.getElementById("routeId").value;
if(routeId==""||routeId==null){
alert("请选择某一条公交线路..");
return;
}else{

document.getElementById("routeid_cp").value=routeId;
document.getElementById("start_date_cp").value=start_date;
document.getElementById("end_date_cp").value=end_date;
}

var sjcc="";
$.ajax({
				type:"POST",
				url:"<%=basePath%>/servlet/StatisticsServlet",
				data:{routeId:routeId,
					start_date:start_date,
					end_date:end_date
				},
				success:function (msg){
					if(msg==""){
						alert("查询获取数据失败！");
					}else{
					    var tableStr='<table id="mytable" style="width:100%;" cellspacing="1"><tr><th scope="col">站点名称'+
						'</th><th scope="col">超速次数</th></tr>';
						var station=null;
						var station_name=null;
						var stas=msg.split("|");
						if(stas.length>0){
							for (var i = 0; i < stas.length; i ++) {
							  var stas_attres=stas[i].split("@");
							  if(stas_attres.length>2){
							     //alert(stas_attres[2]);
							  	 tableStr=tableStr+'<tr>';
							  	  if(stas_attres[0].split("=").length>1){
							  	  	station=stas_attres[0].split("=")[1];
							  	  }
							  	  if(stas_attres[2].split("=").length>1){
								  	  station_name=stas_attres[2].split("=")[1];
								  	  tableStr=tableStr+'<td>'+station_name+'</td>';
							  	  }
							  	  if(stas_attres[1].split("=").length>1){
							  	  		tableStr=tableStr+'<td><a href="javascript:void(0);" onclick="changeRight(\''+station+'\');">'+stas_attres[1].split("=")[1]+'</a></td>';
							  	  }
							  	   tableStr=tableStr+'</tr>';
							  }
							}
						}
						tableStr=tableStr+'</table>';
						document.getElementById("showTable").innerHTML=tableStr;
					}
				}
		});
}

// 改变统计柱状图展示数据 --早高峰
function changeRight(station){
var routeid_cp=document.getElementById("routeid_cp").value;
var start_date_cp=document.getElementById("start_date_cp").value;
var end_date_cp=document.getElementById("end_date_cp").value;
$.ajax({
				type:"POST",
				url:"<%=basePath%>/servlet/StatisticsTMBServlet",
				data:{
				    fq_type:'01',
				    station:station,
				    routeId:routeid_cp,
					start_date:start_date_cp,
					end_date:end_date_cp
				},
				success:function (msg){
					if(msg==""){ 
						alert("查询获取数据失败！");
					}else{
						var stas=msg.split("@");
						tj_top(stas[0].split("=")[1],stas[1].split("=")[1],stas[2].split("=")[1],stas[3].split("=")[1]);
					}
					// 平峰统计
					changeRight2(station);
				}
		});
}

// 改变统计柱状图展示数据 --平峰
function changeRight2(station){
var routeid_cp=document.getElementById("routeid_cp").value;
var start_date_cp=document.getElementById("start_date_cp").value;
var end_date_cp=document.getElementById("end_date_cp").value;
$.ajax({
				type:"POST",
				url:"<%=basePath%>/servlet/StatisticsTMBServlet",
				data:{
				    fq_type:'02',
				    station:station,
				    routeId:routeid_cp,
					start_date:start_date_cp,
					end_date:end_date_cp
				},
				success:function (msg){
					if(msg==""){ 
						alert("查询获取数据失败！");
					}else{
						var stas=msg.split("@");
						tj_Middle(stas[0].split("=")[1],stas[1].split("=")[1],stas[2].split("=")[1],stas[3].split("=")[1]);
					}
					// 晚高峰统计
					changeRight3(station);
				}
		});
}

// 改变统计柱状图展示数据 --晚峰
function changeRight3(station){
var routeid_cp=document.getElementById("routeid_cp").value;
var start_date_cp=document.getElementById("start_date_cp").value;
var end_date_cp=document.getElementById("end_date_cp").value;
$.ajax({
				type:"POST",
				url:"<%=basePath%>/servlet/StatisticsTMBServlet",
				data:{
				    fq_type:'03',
				    station:station,
				    routeId:routeid_cp,
					start_date:start_date_cp,
					end_date:end_date_cp
				},
				success:function (msg){
					if(msg==""){ 
						alert("查询获取数据失败！");
					}else{
						var stas=msg.split("@");
						tj_bottom(stas[0].split("=")[1],stas[1].split("=")[1],stas[2].split("=")[1],stas[3].split("=")[1]);
					}
				}
		});
}

// 表单重置方法
function rest(){
document.form01.reset();
}
</script>
	</head>
	<body onload="init();">
		<div id="apDiv1">
			<form id="form01" name="form01" action="" method="post">
				<table>
					<tr>
						<th scope="col" align="right">
							开始日期：
						</th>
						<th scope="col">
							<input type="text" id="start_date" name="start_date"
								class="Wdate" style="width:100px;"
								onFocus="WdatePicker({isShowClear:true,readOnly:true,dateFmt:'yyyy-MM-dd'});" />
						</th>

						<th scope="col" align="right">
							截止日期：
						</th>
						<th scope="col">
							<input type="text" id="end_date" name="end_date" class="Wdate"
								style="width:100px;"
								onclick="WdatePicker({isShowClear:true,readOnly:true,dateFmt:'yyyy-MM-dd'})" />
						</th>

						<th scope="col" align="right">
							公交线路：
						</th>
						<th scope="col">
							<select id="routeId" name="routeId" style="width:100px;">
								<option>
									选择公交路线
								</option>
								<option value="101">
									101路
								</option>
								<option value="102">
									102路
								</option>
								<option value="103">
									103路
								</option>
								<option value="165">
									165路
								</option>
							</select>
						</th>

						<th scope="col">
							<input type="button" value="确认" onclick="selectStation_tj();" />
						</th>
						<th scope="col">
							<input type="button" value="清空" onclick="rest();" />
						</th>
					</tr>
				</table>
			</form>
		</div>
		<div id="apDiv2">
			<div id="chart2div">
			</div>
		</div>
		<div id="apDiv3">
			<div id="chart3div">
			</div>
		</div>
		<div id="apDiv4">
			<div id="chart4div">
			</div>
		</div>
		<div id="apDiv100">
			<div id="showTable" style="height:500px;overflow:auto;">
				<table id="mytable" style="width:100%;" cellspacing="1">
					<tr>
						<th scope="col">
							站点名称
						</th>
						<th scope="col">
							超速次数
						</th>
					</tr>

					<tr>
						<td>
						</td>
						<td>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div id="container" style="width:100%;"></div>
		<input type="hidden" id="routeid_cp" name="routeid_cp"/>
		<input type="hidden" id="start_date_cp" name="start_date_cp"/>
		<input type="hidden" id="end_date_cp" name="end_date_cp"/>
		
	</body>
</html>
