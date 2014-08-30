
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
	$.getJSON("mapshow.do?reqCode=querySpeedMap",{
	timesection:document.getElementById("timesection").value,
	date:document.getElementById("date").value,
	loginuserid:"developer"
	},function(js){
		var obj = eval(js);
		for(var i=0;i<obj.length;i++){
			showeveryroutespeed(obj[i]);
		}
		$("#result").empty();
		var oneresult = "<div style='text-align:center;font-size:13px;>加载完成！</div>";
		$("#result").append(oneresult);		
	});
});

function showeveryroutespeed(objs){
	color = "#ff0000";
	var speed = parseInt(objs.realspeed.toFixed(2));
	
	if(15 <= speed &&speed<25 ){
		color = "#fc9e0a";
	}else if( speed >= 25){
		color = "#18fe2e";
		
	}
	
	$.ajax({
	 sync:false,
	 type: 'POST',
 	 url: "mapshow.do?reqCode=queryRoad",
	 data:{pos:objs.pos,posp:objs.posp,color:color},
 	 success: function(js){
		var obj =  eval(js);
		var points = [];
		for(var i=0;i<obj.length;i++){
			point=new BMap.Point(obj[i].lng, obj[i].lat);
			points[i]=point;
		}
		var polyline = new BMap.Polyline(points, {strokeColor:obj[0].color, strokeWeight:3,strokeStyle:"ridge"});
				
		map.addOverlay(polyline);
	},
 	 dataType:'json'
});
		
}