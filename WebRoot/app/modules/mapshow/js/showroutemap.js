
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
  		showall();
  });
  showall();
});

function showall(){
	var ima="<div style='text-align:center;font-size:13px;'><img src='resource/image/map/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
	$("#result").append(ima);
  $.getJSON("mapshow.do?reqCode=queryAllRouteMap",{
	},function(js){
		$("#result").empty();
		var obj =  eval(js);
		for(var i=0; i < obj.length; i++){
			var objstr = obj[i].route_id+"|"+obj[i].sxx;
		var oneresult = "<div id='oneresult' onclick=showOneRoute('"+objstr+"') onmouseover=this.style.background='#dfffe0' onmouseout=this.style.background='#ffffff'><div id='resulttitle'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+obj[i].route_id+"路&nbsp;&nbsp;&nbsp;"+obj[i].sxx+"</div><div id='hr2'>&nbsp;<div></div>";
		$("#result").append(oneresult);
		}
	});
}

function showOneRoute(objstr){
	if( mode == 0){
		map.clearOverlays();
		colornumhaveuse--;
	}
	var objstrs = objstr.split("|");
	showRouteInfo(objstrs[0], objstrs[1],0);
}


// 百度地图API功能
var map = new BMap.Map("allmap");
var point = new BMap.Point(117.007863, 36.676649);
map.centerAndZoom(point, 15);
map.enableScrollWheelZoom();  


var mode = 0;

var route = "";

var colornumhaveuse = 0;

//加载站点
var showoverlabel=[];
function showStationInfo(route_id,sxx,isall){
$.getJSON("mapshow.do?reqCode=queryRouteStation",{
	route_id:route_id,
	sxx:sxx
	},function(js){
		var obj =  eval(js);
		for(var i=0;i<obj.length;i++){
			var sign = 2;
			if(i == 0){
				sign = 0;
			}else if( i == obj.length-1){
				sign = 1;
			}
			var station_type_name = "";
						switch(obj[i].station_type){
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
	 		if(isall==1){
				var objstr = obj[i].lng+"|"+obj[i].lat+"|"+obj[i].name+"|"+station_type_name+"|"+obj[i].len+"|"+obj[i].wid+"|"+obj[i].ggw+"|"+obj[i].sjcc.substring(0,obj[i].sjcc.length-1);
				var oneresult = "<div id='oneresult' onclick=showclick('"+objstr+"') onmouseover=showmouseover('"+i+"');this.style.background='#dfffe0' onmouseout=removemouseover('"+i+"');this.style.background='#ffffff'><div id='resulttitle'>"+obj[i].id+"."+obj[i].name+"&nbsp;&nbsp;&nbsp;"+station_type_name+"</div><div id='hr2'>&nbsp;<div></div>";
				$("#result").append(oneresult);
	 		}
			addStationMaker(obj[i],sign);
		}
	});
}

function showclick(obj){
		var objstrs = obj.split("|");
		var point = new BMap.Point(objstrs[0],objstrs[1]);
		var content =" <div><div><h4 style='margin:0 0 5px 0; color:#FD7828'>"+objstrs[2]+'</h4></div>'+'<div style="margin:0;line-height:1.5;font-size:13px">' +'站台形式：'+objstrs[3]+'<br/>站台长度：'+objstrs[4]+'米<br/>站台宽度：'+objstrs[5]+'米<br/>广告位数：'+objstrs[6]+'<br/>途经线路：'+objstrs[7]+'' +'</div></div>';
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

$("#submit").click(function(){
	if( mode == 0){
		map.clearOverlays();
		colornumhaveuse--;
	}
	$("#result").empty();
	var ima="<div style='text-align:center;font-size:13px;'><img src='resource/image/map/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
	$("#result").append(ima);
	var route_id = document.getElementById("route_id").value;
	var sxx = document.getElementById("sxx").value
	showRouteInfo(route_id, sxx,1);
});

function submitform(){
	if( mode == 0){
		map.clearOverlays();
		colornumhaveuse--;
	}
	$("#result").empty();
	var ima="<div style='text-align:center;font-size:13px;'><img src='resource/image/map/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
	$("#result").append(ima);
	var route_id = document.getElementById("route_id").value;
	var sxx = document.getElementById("sxx").value
	showRouteInfo(route_id, sxx,1);
	}

//显示站点
function addStationMaker(objs,sign){
	var point=new BMap.Point(objs.lng, objs.lat);
	if(sign != 2){
		//setTimeout(function(){
	map.setZoom(14);
	var optl = {
 		position : point,    // 指定文本标注所在的地理位置
  	offset   : new BMap.Size(30, -30)    //设置文本偏移量
 	}
	var string = "终:";
	if( sign == 0){
		string = "始:";
	}
	var label = new BMap.Label(""+string+objs.name, optl);  // 创建文本标注对象
	label.setStyle({
		 	 color : "blue",
			 borderColor:"blue",
			 fontSize : "12px",
			 height : "20px",
			 lineHeight : "20px",
			 fontFamily:"微软雅黑"
		});
	map.addOverlay(label);
	}
	
	var src = "";
	var station_type_name = "";
	switch(objs.station_type){
		case "1": src = "resource/image/map/lt3.gif"; station_type_name = "直列式"; break;
		case "2": src = "resource/image/map/lt2.gif"; station_type_name = "港湾式"; break;
		case "3": src = "resource/image/map/lt2_old.gif"; station_type_name = "BRT站台"; break;
	}
	
	var icon = new BMap.Icon(src, new BMap.Size(10,10));
	var marker = new BMap.Marker(point,{icon: icon});  // 创建标注
	map.addOverlay(marker);
	marker.addEventListener("click",function(){ 
    	
		var jc_countstr = objs.sjcc.split(",");
		var jcstr="";
		for(var i = 0; i<jc_countstr.length; i++){
			
			if(i>0 && jc_countstr[i].trim()!=""){
				jcstr = jcstr+","+jc_countstr[i];
				}else if(i == 0){
					jcstr = jc_countstr[i];
					}
			}
    	var content = " <div><div><h4 style='margin:0 0 5px 0; color:#FD7828'>"+objs.name+'</h4></div>'+'<div style="margin:0;line-height:1.5;font-size:13px">' + '站台形式：'+station_type_name+'<br/>站台长度：'+objs.len+'米<br/>距离上站：'+objs.ssd+'米<br/>途经线路：'+jcstr+'' +'</div></div>';
      var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
      map.openInfoWindow(infoWindow,point);
		});
}
//显示线路
function showRouteInfo(route_id,sxx,isall){
	route = route_id;	
	$.getJSON("mapshow.do?reqCode=queryRouteMap",{
	route_id:route_id,
	sxx:sxx
	},function(js){
		if(isall==1){
			$("#result").empty();
		}
		var obj =  eval(js);
		showRoute(route_id,sxx,obj,isall);
	});		
}	
function showRoute(route_id,sxx,obj,isall){
	if(isall==1){
		var bfb = ((obj[0].gzlc/obj[0].distance)*100).toFixed(2);
		var oneresult = "<div id='oneresult' onmouseover=this.style.background='#dfffe0' onmouseout=this.style.background='#ffffff'><div id='resulttitle2'>"+obj[0].route_id+"路&nbsp;&nbsp;&nbsp;"+obj[0].sxx+"</div><div id='resultcontent'>所属公司："+obj[0].ssgs+"<br/>线路长度："
		+obj[0].distance+"千米<br/>专用道里程："+obj[0].gzlc+"千米<br/>专用道比率："+bfb+"%<br/>站台总数："+obj[0].sc+"处<br/>港湾站台数："+obj[0].gwzc+"处</div><div id='hr2'>&nbsp;<div></div>";
		$("#result").append(oneresult);
	}
	
	var points = [];
	var pointsz = [];
	var j = 0;
	for(var i=0;i<obj.length;i++){
		point=new BMap.Point(obj[i].lng, obj[i].lat);
		points[i]=point;
		if(obj[i].buslane == 1){
			pointsz[j] = new BMap.Point(obj[i].lng, obj[i].lat);
			j++;
		}else{
			if(j != 0 && pointsz.length > 0){
				var polylinez = new BMap.Polyline(pointsz, {strokeColor:"#502222", strokeWeight:8, strokeStyle:"ridge"});
				map.addOverlay(polylinez);
				j = 0;
				pointsz = [];	
			}
		}
	}
	colornumhaveuse++;
	var color = "blue";
	switch(colornumhaveuse){
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
		case 21: color="#FF0000";break;
	}
	
	var polyline = new BMap.Polyline(points, {strokeColor:color, strokeWeight:4,strokeStyle:"ridge"});
	var label = null;
	polyline.addEventListener("onmouseover",function(e){
	var optl = {
 		position : e.point,    // 指定文本标注所在的地理位置
  		offset   : new BMap.Size(30, -30)    //设置文本偏移量
 		}
	label = new BMap.Label(obj[0].route_id+"路-"+obj[0].sxx, optl);  // 创建文本标注对象
	label.setStyle({
		color : "red",
		fontSize : "12px",
		height : "20px",
		lineHeight : "20px",
		fontFamily:"微软雅黑"
	 	});
	map.addOverlay(label);
 	});
 	polyline.addEventListener("mouseout",function(){
		map.removeOverlay(label);
 		});
	polyline.addEventListener("click",function(e){
		switch (mode) {
			case 0:
				showImg(e.point,obj[0].route_id,obj[0].sxx);
			break;
			default:
				showImg2(e.point);
		}
		});
	map.addOverlay(polyline);
	map.setViewport(polyline.getPath());
	//线路信息显示完了之后再加载站点信息
	showStationInfo(route_id,sxx,isall);
}

//下载图片
function showImg(point,route_id,sxx){
	$.getJSON("mapshow.do?reqCode=queryRouteImg",{
	lng:point.lng,
	lat:point.lat,
	sxx:sxx,
	mode1:"0",
	route_id:route_id
	},function(js){
		var obj =  eval(js);
        var content = " <div><div><h4 style='margin:0;line-height:1.5;font-size:13px'>"+obj[0].route_id+"路            车道数量："+obj[0].lanscount+'</div>'+'<div style="margin:0;line-height:1.5;font-size:13px">' +
                    '<img src="resource/image/login.png" alt="resource/image/login.png" style="float:right;zoom:1;overflow:hidden;width:400px;height:220px;margin-left:3px;"/>' +
                  '</div></div>';
        var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
		map.openInfoWindow(infoWindow,new BMap.Point(obj[0].lng, obj[0].lat));
	});
}

function showImg2(point){
	$.getJSON("mapshow.do?reqCode=queryRouteImg",{
	lng:point.lng,
	lat:point.lat,
	mode1:"1"
	},function(js){
		var obj =  eval(js);
        var content = " <div><div><h4 style='margin:0;line-height:1.5;font-size:13px'>车道数量："+obj[0].lanscount+'</div>'+'<div style="margin:0;line-height:1.5;font-size:13px">' +
                    '<img src="resource/image/login.png" alt="resource/image/login.png" style="float:right;zoom:1;overflow:hidden;width:400px;height:220px;margin-left:3px;"/>' +
                  '</div></div>';
        var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
		map.openInfoWindow(infoWindow,new BMap.Point(obj[0].lng, obj[0].lat));
	});
}