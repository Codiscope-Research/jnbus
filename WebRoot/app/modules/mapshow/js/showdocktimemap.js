
$(document).ready(function(){
  $("#showbutton").click(function(){
  $("#showbutton").hide(500);
  $("#formdiv").show(500);
  });
  $("#hidediv").click(function(){
  $("#formdiv").hide(500);
  $("#showbutton").show(500);
  });
  $("#delete").click(function(){
  		map.clearOverlays();
  });
  $("#delete").mouseover(function(){
  		$("#deleteimg").attr("src","resource/image/map/delete_over.png");
  });
  $("#delete").mouseout(function(){
  		$("#deleteimg").attr("src","resource/image/map/delete.png");
  });
  $("#lakuang").click(function(){
  		//map.clearOverlays();
  		if(islakuang == 0){
  			islakuang = 1;
  			$("#lakuangimg").attr("src","resource/image/map/lakuang_b.png");
  			openLaKuang();
  		}else{
  			islakuang = 0;
  			$("#lakuangimg").attr("src","resource/image/map/lakuang.png");
  			openLaKuang();
  		}
  		
  });
  $("#lakuang").mouseover(function(){
  		$("#lakuangimg").attr("src","resource/image/map/lakuang_over.png");
  });
  $("#lakuang").mouseout(function(){
  	if(islakuang == 0){
  		$("#lakuangimg").attr("src","resource/image/map/lakuang.png");
  	}else{
  		$("#lakuangimg").attr("src","resource/image/map/lakuang_b.png");
  	}
  });
});
var islakuang = 0;
// 百度地图API功能
var map = new BMap.Map("allmap");
var point = new BMap.Point(117.007863, 36.676649);
map.centerAndZoom(point, 15);
map.enableScrollWheelZoom()

$("#submit").click(function(){
	if(pullBox == null && islakuang == 1){
		$("#lakuangimg").attr("src","resource/image/map/lakuang.png");
		islakuang = 0;
		openLaKuang();
	}
	map.clearOverlays();
	$("#result").empty();
	var ima="<div style='text-align:center;font-size:13px;'><img src='resource/image/map/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
	$("#result").append(ima);
	$.getJSON("mapshow.do?reqCode=queryDockTime",{
	route_id:document.getElementById("route_id").value,
	sxx:document.getElementById("sxx").value,
	time:document.getElementById("time").value,
	loginuserid:"developer"
	},function(js){
		$("#result").empty();
		showHeatMapInfo(js);
	}
	);
});

var points=[];
function showHeatMapInfo(js){
		var obj =  eval(js);
		for(var i=0;i<obj.length;i++){
			points[i] = {"lng":obj[i].lng,"lat":obj[i].lat,"count":obj[i].count};
			
			if(!isSupportCanvas()){
    	alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
    }
    
	heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
	heatmapOverlay.setOptions({"gradient":{
	  		0:'rgb(102, 255, 0)',
	 	 		0.5:'rgb(255, 170, 0)',
		  	1:'rgb(255, 0, 0)'
			}});
	map.addOverlay(heatmapOverlay);
	heatmapOverlay.setDataSet({data:points,max:100});
	
	 heatmapOverlay.toggle();
		}
		
 }

    function isSupportCanvas(){
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }
    
//开启拉框
var pullBox = null;
function openLaKuang(){
	var keyword = "公交站点";
  var pullBox = new BMapLib.SearchInRectangle(map,keyword,{
  renderOptions:{
    map: map,
    strokeWeight: 2,
    strokeColor: "blue",
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
  pullBox.setLineStyle("dashed");
   if(islakuang==1)
    {
    pullBox.open();
    }
    else
    {
     pullBox.close();
    }
        
}
//拉框搜索
function search_station_arange(swlng,swlat,nelng,nelat){
	map.clearOverlays();
	$("#result").empty();
	var ima="<div style='text-align:center;font-size:13px;'><img src='resource/image/map/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
	$("#result").append(ima);
	$.getJSON("mapshow.do?reqCode=queryLaKuangStation",{
	swlng:swlng,
	swlat:swlat,
	nelng:nelng,
	nelat:nelat,
	},function(js){
		$("#result").empty();
		showStationInfo(js);
	});
	setTimeout('openLaKuang()',500 );
}
