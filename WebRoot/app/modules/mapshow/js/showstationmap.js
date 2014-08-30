
$(document).ready(function(){
  $("#showbutton").click(function(){
  $("#showbutton").hide(500);
  $("#formdiv").show(500);
  });
  $("#hidediv").click(function(){
  $("#formdiv").hide(500);
  $("#showbutton").show(500);
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
	$.getJSON("mapshow.do?reqCode=queryStationMap",{
	station_name:document.getElementById("station_name").value,
	loginuserid:"developer"
	},function(js){
		$("#result").empty();
		showStationInfo(js);
	}
	);
});

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
	nelat:nelat
	},function(js){
		$("#result").empty();
		showStationInfo(js);
	});
	setTimeout('openLaKuang()',500 );
}
