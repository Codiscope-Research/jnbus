
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
  $("#showimgbutton").slideUp(500);
  $("#hideimgdiv").slideDown(500);
  });
  $("#hideimgdiv").click(function(){
  $("#hideimgdiv").slideUp(500);
  $("#showimgbutton").slideDown(500);
  });
  $("#delete").click(function(){
  		map.clearOverlays();
  		colornumhaveuse=0;
  });
  $("#delete").mouseover(function(){
  		$("#deleteimg").attr("src","resource/image/map/delete_over.png");
  });
  $("#delete").mouseout(function(){
  		$("#deleteimg").attr("src","resource/image/map/delete.png");
  });
  $("#modeselect").click(function(){
  		if(mode == 0){
  			mode = 1;
  			$("#modeimg").attr("src","resource/image/map/mode_b.png");
  		}else{
  			mode = 0;
  			$("#modeimg").attr("src","resource/image/map/mode.png");
  		}
  });
  $("#modeselect").mouseover(function(){
  	$("#modeimg").attr("src","resource/image/map/mode_over.png");
  });
  $("#modeselect").mouseout(function(){
  	if(mode==0){
  		$("#modeimg").attr("src","resource/image/map/mode.png");
  		}else{
  		$("#modeimg").attr("src","resource/image/map/mode_b.png");	
  		}
  });
  $("#textall").mouseover(function(){
  	$("#textallimg").attr("src","resource/image/map/all_over.png");
  });
  $("#textall").mouseout(function(){
  	$("#textallimg").attr("src","resource/image/map/all.png");
  });
  
  $("#textall").click(function(){
  		$("#result").empty();
  		showallcorridor();
  });
  showallcorridor();
});

// 百度地图API功能
var map = new BMap.Map("allmap");
var point = new BMap.Point(117.007863, 36.676649);
map.centerAndZoom(point, 15);
map.enableScrollWheelZoom();  


var mode = 0;


$("#submit").click(function(){
	if( mode == 0){
		map.clearOverlays();
	}
	$("#result").empty();
	var ima="<div style='text-align:center;font-size:13px;'><img src='resource/image/map/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
	$("#result").append(ima);
	var roadname = document.getElementById("roadname").value;
	getRoadByName(roadname);
});

function getRoadByName(roadname){
	$.getJSON("mapshow.do?reqCode=queryRoadByName",{
	roadname:roadname
	},function(js){
		$("#result").empty();
		var obj = eval(js);
		for(var i = 0; i < obj.length; i++){
			var roadstr = obj[i].roadname+"|1";
			var oneresult = "<div id='oneresult' onclick=showclickbyroadname('"+roadstr+"') onmouseover=this.style.background='#dfffe0' onmouseout=this.style.background='#ffffff'><div id='resulttitle'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+obj[i].roadname+"</div><div id='hr2'>&nbsp;<div></div>";
			$("#result").append(oneresult);	
			}
	});
	}
	

function showclickbyroadname(roadstr){
	if( mode == 0){
		map.clearOverlays();
	}
	var roadstrs = roadstr.split("|"); 
	$.getJSON("mapshow.do?reqCode=queryRoadDetailInfo",{
	roadname:roadstrs[0],
	nameorcorridor:roadstrs[1]
	},function(js){
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
						switch (mode) {
							case 0:
								showroadinfo(e.point,qrid.zoulang);
							break;
							default:
								showroadinfo(e.point,"");
						}
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

function showroadinfo(point,zoulang){
	$.getJSON("mapshow.do?reqCode=queryRoadInfoImg",{
	lng:point.lng,
	lat:point.lat,
	zoulang:zoulang
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
		var jc_countstr = obj[0].tj_route.split(",");
		var jcstr="";
		for(var i = 0; i<jc_countstr.length; i++){
			
			if(i>0 && jc_countstr[i].trim()!=""){
				jcstr = jcstr+","+jc_countstr[i];
				}else if(i == 0){
					jcstr = jc_countstr[i];
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
	
function showallcorridor () {
	$.getJSON("mapshow.do?reqCode=queryRoadByCorridor",{
	},function(js){
		$("#result").empty();
		var obj = eval(js);
		for(var i = 0; i < obj.length; i++){
			var roadstr = obj[i].zoulang+"|0";
			var oneresult = "<div id='oneresult' onclick=showclickbyroadname('"+roadstr+"') onmouseover=this.style.background='#dfffe0' onmouseout=this.style.background='#ffffff'><div id='resulttitle'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+obj[i].zoulang+"</div><div id='hr2'>&nbsp;<div></div>";
			$("#result").append(oneresult);	
			}
	});
}
