
$(document).ready(function(){
  $("#showbutton").click(function(){
  $("#showbutton").hide(500);
  $("#formdiv").show(500);
  });
  $("#hidediv").click(function(){
  $("#formdiv").hide(500);
  $("#showbutton").show(500);
  });
  $("#showimgbutton").click(function(){
  	var selectid = document.getElementById("select_object").value;
  	switch (parseInt(selectid)) {
  		case 3:
  			$("#hideimgdiv2").slideDown(500);
  		break;
  		default:
  			$("#hideimgdiv").slideDown(500);
  	}
  	$("#showimgbutton").slideUp(500);			
  });
  $("#hideimgdiv").click(function(){
  $("#hideimgdiv").slideUp(500);
  $("#showimgbutton").slideDown(500);
  });
  $("#hideimgdiv2").click(function(){
  $("#hideimgdiv2").slideUp(500);
  $("#showimgbutton").slideDown(500);
  });
  $("#select_object").change(function(){
  	var selectid = document.getElementById("select_object").value;
  	switch (parseInt(selectid)) {
  		case 1:
  			$("#div_busnet").hide();
  			$("#div_station").show();
  			$("#div_station_route").hide();
  			$("#div_repeat").hide();
  			$("#hideimgdiv2").hide();
  			$("#hideimgdiv").hide();
  			$("#showimgbutton").hide();
  		break;
  		case 2:
  			$("#div_busnet").hide();
  			$("#div_station").hide();
  			$("#div_station_route").show();
  			$("#div_repeat").hide();
  			$("#hideimgdiv2").hide();
  			$("#hideimgdiv").hide();
  			$("#showimgbutton").hide();
  		break;
  		case 3:
  			$("#div_busnet").hide();
  			$("#div_station").hide();
  			$("#div_station_route").hide();
  			$("#div_repeat").hide();
  			$("#hideimgdiv2").show();
  			$("#hideimgdiv").hide();
  			$("#showimgbutton").hide();
  		break;
  		case 4:
  			$("#div_busnet").show();
  			$("#div_station").hide();
  			$("#div_station_route").hide();
  			$("#div_repeat").hide();
  			$("#hideimgdiv").show();
  			$("#hideimgdiv2").hide();
  			$("#showimgbutton").hide();
  		break;
  		case 5:
  			$("#div_busnet").hide();
  			$("#div_station").hide();
  			$("#div_station_route").hide();
  			$("#div_repeat").show();
  			$("#hideimgdiv").show();
  			$("#hideimgdiv2").hide();
  			$("#showimgbutton").hide();
  		break;
  		default:
  			// default statements
  	}
  });
});

// 百度地图API功能
var map = new BMap.Map("allmap");
var point = new BMap.Point(117.007863, 36.676649);
map.centerAndZoom(point, 15);
map.enableScrollWheelZoom()

$("#submit").click(function(){
	map.clearOverlays();
	$("#result").empty();
	var ima="<div style='text-align:center;font-size:13px;'><img src='resource/image/map/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
	$("#result").append(ima);
	var selectid = document.getElementById("select_object").value;
	switch (parseInt(selectid)) {
		case 1:
			 getStationNet();	
		break;
		case 2:
			 getStationRouteNet();	
		break;
		case 3:
			 getSpecialNet();
		break;
		case 4:
			 getBusNet();	
		break;
		case 5:
			 getRepeatNet();
		break;
		default:
	}
});

function getStationNet () {
	var selectvalue = document.getElementById("searcharound_radius").value;
	$.getJSON("mapshow.do?reqCode=queryStationNet",{
	selectvalue:selectvalue
	},function(js){
		var obj = eval(js);
		$("#result").empty();
		showStationInfo(js);		
	});
}
function getStationRouteNet(){
	var selectvalue = document.getElementById("Select3").value;
	$.getJSON("mapshow.do?reqCode=queryStationRouteNet",{
	selectvalue:selectvalue
	},function(js){
		var obj = eval(js);
		$("#result").empty();
		showStationInfo(js);
	});
}
function getRepeatNet(){
	var selectvalue = document.getElementById("Select4").value;
	$.getJSON("mapshow.do?reqCode=queryRepeatNet",{
	selectvalue:selectvalue
	},function(js){
		$("#result").empty();
		var obj = eval(js);
		var points = [];
		var pointss = [];
		var j = 0;
		var color = "blue";
		var qrid;
		for(var i = 0; i < obj.length; i++){
			pointss[i] = new BMap.Point(obj[i].lng,obj[i].lat);
			if(qrid!=null){
				points[j++] = new BMap.Point(qrid.lng,qrid.lat);
				if (obj[i].rid!=qrid.rid ) {
					var route_count = parseInt(qrid.route_count);
					if (0<route_count&&route_count<=3) {
						color = "#18fefb";
					}else if (4 <= route_count && route_count <= 7) {
							color = "#18fe2e";
						}else if (8 <= route_count && route_count <=12) {
								color = "#6418fe";
							}else if (13 <= route_count && route_count <= 17) {
									color = "#fc9e0a";
								}else if (route_count > 17) {
										color = "#ff0000";
									}
					var polyline = new BMap.Polyline(points, {strokeColor:color, strokeWeight:3, strokeStyle:"ridge"});
					polyline.addEventListener("click",function(e){
						showroadinfo(e.point);
					});
					map.addOverlay(polyline);
					j = 0;
					points = [];
				}	
			}
			qrid = obj[i];
		}
		map.setViewport(pointss);
	});
}

function getBusNet(){
	var selectvalue = document.getElementById("Select5").value;
	$.getJSON("mapshow.do?reqCode=queryBusNet",{
	selectvalue:selectvalue
	},function(js){
		$("#result").empty();
		var obj = eval(js);
		var points = [];
		var pointss = [];
		var j = 0;
		var color = "blue";
		var qrid;
		for(var i = 0; i < obj.length; i++){
			pointss[i] = new BMap.Point(obj[i].lng,obj[i].lat);
			if(qrid!=null){
				points[j++] = new BMap.Point(qrid.lng,qrid.lat);
				if (obj[i].rid!=qrid.rid ) {
					var route_count = parseInt(qrid.route_count);
					if (0<route_count&&route_count<=3) {
						color = "#18fefb";
					}else if (4 <= route_count && route_count <= 7) {
							color = "#18fe2e";
						}else if (8 <= route_count && route_count <=12) {
								color = "#6418fe";
							}else if (13 <= route_count && route_count <= 17) {
									color = "#fc9e0a";
								}else if (route_count > 17) {
										color = "#ff0000";
									}
					var polyline = new BMap.Polyline(points, {strokeColor:color, strokeWeight:3, strokeStyle:"ridge"});
					polyline.addEventListener("click",function(e){
						showroadinfo(e.point);
					});
					map.addOverlay(polyline);
					j = 0;
					points = [];
				}	
			}
			qrid = obj[i];
		}
		map.setViewport(pointss);
	});
}

function getSpecialNet () {
	$.getJSON("mapshow.do?reqCode=querySpecialNet",{
	},function(js){
		$("#result").empty();
		var obj = eval(js);
		var points = [];
		var pointss = [];
		var j = 0;
		var color = "blue";
		var qrid;
		for(var i = 0; i < obj.length; i++){
			pointss[i] = new BMap.Point(obj[i].lng,obj[i].lat);
			if(qrid!=null){
				points[j++] = new BMap.Point(qrid.lng,qrid.lat);
				if (obj[i].rid!=qrid.rid ) {
					var buslane = parseInt(qrid.buslane);
					switch (buslane) {
						case 1:
							 color = "#6418fe";
						break;
						case 2:
							 color = "#18fe2e";
						break;
						default:
						
					}
					var polyline = new BMap.Polyline(points, {strokeColor:color, strokeWeight:3, strokeStyle:"ridge"});
					polyline.addEventListener("click",function(e){
						showroadinfo(e.point);
					});
					map.addOverlay(polyline);
					j = 0;
					points = [];
				}	
			}
			qrid = obj[i];
		}
		map.setViewport(pointss);
	});
}

var showoverlabel=[];
function showStationInfo(js){
		var obj =  eval(js);
		var points = [];
		for(var i=0;i<obj.length;i++){
			points[i] = new BMap.Point(obj[i].lng,obj[i].lat);
			var station_type_name = "";
						switch(obj[i].type){
							case "1": station_type_name = "直列式"; break;
							case "2": station_type_name = "港湾式"; break;
							case "3": station_type_name = "BRT站台"; break;
						}
			var optl = {
 				position : new BMap.Point(obj[i].lng,obj[i].lat),    // 指定文本标注所在的地理位置
  			offset   : new BMap.Size(30, -30)    //设置文本偏移量
 			}
			showoverlabel[i] = new BMap.Label(obj[i].name,optl);  // 创建文本标注对象
			showoverlabel[i].setStyle({
				color : "red",
				fontSize : "12px",
				height : "20px",
				lineHeight : "20px",
				fontFamily:"微软雅黑"
	 		});
	 		
			var objstr = obj[i].lng+"|"+obj[i].lat+"|"+obj[i].name+"|"+station_type_name+"|"+obj[i].len+"|"+obj[i].wid+"|"+obj[i].ggw+"|"+obj[i].sjcc;
			var oneresult = "<div id='oneresult' onclick=showclick('"+objstr+"') onmouseover=showmouseover('"+i+"');this.style.background='#dfffe0' onmouseout=removemouseover('"+i+"');this.style.background='#ffffff'><div id='resulttitle'>"+obj[i].name+"("+obj[i].pos+")&nbsp;&nbsp;&nbsp;"+station_type_name+"</div><div id='resultcontent'>广告位数："+obj[i].ggw+"<br/>途经线路："+obj[i].sjcc.substring(0,obj[i].sjcc.length-1)+"</div><div id='hr2'>&nbsp;<div></div>";
			$("#result").append(oneresult);
			addTextMaker(obj[i]);
		}
		map.setViewport(points);
 }

function showclick(obj){
		var objstrs = obj.split("|");
		var point = new BMap.Point(objstrs[0],objstrs[1]);
		var jc_countstr = objstrs[7].split(",");
		var jcstr="";
		for(var i = 0; i<jc_countstr.length; i++){
			
			if(i>0 && jc_countstr[i].trim()!=""){
				jcstr = jcstr+","+jc_countstr[i];
				}else if(i == 0){
					jcstr = jc_countstr[i];
					}
			}
		var content =" <div><div><h4 style='margin:0 0 5px 0; color:#FD7828'>"+objstrs[2]+'</h4></div>'+'<div style="margin:0;line-height:1.5;font-size:13px">' +'站台形式：'+objstrs[3]+'<br/>站台长度：'+objstrs[4]+'米<br/>站台宽度：'+objstrs[5]+'米<br/>广告位数：'+objstrs[6]+'<br/>途经线路：'+jcstr+'' +'</div></div>';
    var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
    map.openInfoWindow(infoWindow,point);
		map.panTo(point);
}

function showmouseover(i){
		map.addOverlay(showoverlabel[i]);
}

function removemouseover(i){
		map.removeOverlay(showoverlabel[i]);
}

function addTextMaker(obj){
	var point=new BMap.Point(obj.lng, obj.lat);
	var marker = new BMap.Marker(point);  // 创建标注
	map.addOverlay(marker); 
	var opts = {
     position : point,    // 指定文本标注所在的地理位置
		 offset: new BMap.Size(-5, -25)    //设置文本偏移量
  }
	var station_type_name = "";
	switch(obj.type){
		case "1": station_type_name = "直列式"; break;
		case "2": station_type_name = "港湾式"; break;
		case "3": station_type_name = "BRT站台"; break;
	}
  var infocontent=obj.cars;
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
	 	});
  map.addOverlay(label); 
	marker.addEventListener("click",function(){
 	  var content =" <div><div><h4 style='margin:0 0 5px 0; color:#FD7828'>"+obj.name+'</h4></div>'+'<div style="margin:0;line-height:1.5;font-size:13px">' +'站台形式：'+station_type_name+'<br/>站台长度：'+obj.len+'米<br/>站台宽度：'+obj.wid+'米<br/>广告位数：'+obj.ggw+'<br/>途经线路：'+obj.sjcc.substring(0,obj.sjcc.length-1)+'' +'</div></div>';
  	var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
  	map.openInfoWindow(infoWindow,point);
		});
 }
 
 function showroadinfo(point){
	$.getJSON("mapshow.do?reqCode=queryRoadInfoImg",{
	lng:point.lng,
	lat:point.lat
	},function(js){
		var obj =  eval(js);
		var buslanestr;
		switch (parseInt(obj[0].buslane)) {
			case 0:
				buslanestr = "没有";
			break;
			case 1:
				buslanestr = "普通车道";
			break;
			case 2: 
				buslanestr = "brt车道";
			break;
			case 3:
			  buslanestr = "公交单行";
			break;
			default:
		}
		var jcstr="";
		if (obj[0].tj_route!=null) {
		var jc_countstr = obj[0].tj_route.split(",");
			for(var i = 0; i<jc_countstr.length; i++){
			
				if(i>0 && jc_countstr[i].trim()!=""){
					jcstr = jcstr+","+jc_countstr[i];
					}else if(i == 0){
						jcstr = jc_countstr[i];
						}
			}		
		}
		var content =" <div style='float:left;height:240px;overflow:hidden;'>"+
		"<div><h4 style='margin:0 0 5px 0; color:#FD7828'>"+obj[0].roadname+'</h4></div>'+
		'<div>'+
				'<div style="float:left;width:120px;height:220px;word-break:break-all;word-wrap:break-word;margin:0;line-height:1.5;font-size:13px">' +'车道数量：'+obj[0].lanscount+'<br/>公交车道：'+buslanestr+'<br/>途经数量：'+obj[0].route_count+'<br/>途经线路：'+jcstr+'</div>'+
				'<div style="float:left;position:relative;top:-220px;left:130px;"><img src="resource/image/login.png" alt="resource/image/login.png" style="overflow:hidden;width:400px;height:220px;"/></div>'+
		'</div></div>';
    var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
		map.openInfoWindow(infoWindow,new BMap.Point(obj[0].lng, obj[0].lat));
	});
}