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
        addcon();//添加自定义控件
//        station_info();//加载公交站点信息
listview_onload();
//ztcx();
    }
    
    function addcon()
    {
    // 定义一个控件类,即function
        function ZoomControl()
        {
          // 默认停靠位置和偏移量
          this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
          this.defaultOffset = new BMap.Size(5, 50);
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        ZoomControl.prototype = new BMap.Control();

        // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
        // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
        ZoomControl.prototype.initialize = function(map){
          // 创建一个DOM元素
//          var div = document.createElement("div");
//        var div=document.getElementById("tui");
//          // 添加DOM元素到地图中
//          map.getContainer().appendChild(div);
          // 将DOM元素返回
//          return div;
        }
        // 创建控件
        var myZoomCtrl = new ZoomControl();
        // 添加到地图当中
    map.addControl(myZoomCtrl);
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
                var srcc= "Images/"+mycars[2];
                document.getElementById("Image1").src = srcc;
                document.getElementById("Img2").src = srcc;
                creatmarker(pt);
                }
                }
                var url="Read_Data.aspx?id=3&lng="+e.point.lng+"&lat="+e.point.lat+"&route2="+document.getElementById("txtInput").value;
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
//            onSearchComplete: function(result){                
//                if(markers.length){
//                  //自定义searchcomplete,不会自动清除上次的搜索结果，需要手动清除
//                    for( var j = 0 ; j < markers.length ; j ++){
//                        map.removeOverlay(markers[j]);
//                    }
//                }
//                for(var i = 0;i < result.getCurrentNumPois() ; i ++){                        
//                        (function(i){ 
//                            var tLocalPoi=result.getPoi(i);			
//                            //自定义icon
////                            var customIcon =new BMap.Icon("http://openapi.baidu.com/map/images/custom_a_j.png",new BMap.Size(28,37),
////                                {  
////                                    anchor : new BMap.Size(14, 37),//api 1.2新增
////                                    imageOffset: new BMap.Size(0 - i * 28, 0)
////                                }
////                            );           
////                            var marker = new BMap.Marker(tLocalPoi.point,{icon:customIcon}); 
//                            var marker = new BMap.Marker(tLocalPoi.point); 
//                            markers.push(marker);
//                            map.addOverlay(marker);
//                            roadname=roadname+tLocalPoi.title+",";
//                            marker.addEventListener("click",function(evt){		
//                                var infoWindow = new BMap.InfoWindow("<h4>"+ tLocalPoi.title +"</h4>",{
//                                    offset: new BMap.Size(0, -15)
//                                }); 
//                                map.openInfoWindow(infoWindow,tLocalPoi.point);
//                            });
//                        })(i)	
//                    }
//listview_roadname(roadname);
//            } 
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
    var rou=document.getElementById("txtInput").value;
    showCustomer(rou,fx,0);
}

var bx,by,xh
function showCustomer(rou,fx,ys)
{
showid('smallLay');
    createXMLHTTP();
    var mycars = new Array();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
        var strjwdd=xmlHttp.responseText;
         mycars=strjwdd.split("*"); //字符分割 
    //     map.clearOverlays();//清楚地图覆盖物
         addPolyline(mycars,ys);//向地图中添       
            
         setTimeout(function(){station_road_info(rou,fx);},500);
                    showalldiv();
        }
    }

    var url="Read_Data.aspx?id=2&route="+rou+"&sxx="+fx;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}  
  
  
//关键字搜索站点
  
  function station_show_sel()
  {
  showid('smallLay');
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
  
//function show_road()
//{
//    map.clearOverlays();//清楚地图覆盖物
//    var rou=document.getElementById("road_name").value;
//    createXMLHTTP();
//    var mycars = new Array();
//    xmlHttp.onreadystatechange=function()
//    {
//      if (xmlHttp.readyState==4 && xmlHttp.status==200)
//        {
//        var strjwdd=xmlHttp.responseText;
//         mycars=strjwdd.split("*"); //字符分割 
//         addPolyline_road(mycars);//向地图中添   
//        }
//    }

//    var url="Read_Data.aspx?id=27&route="+rou;
//    xmlHttp.open("post",url,true);
//    xmlHttp.send(null);
//}  
//  

//function addPolyline_road(mycars)
//{
//    map.clearOverlays();//清楚地图覆盖物
//	var points = [];
//	var p1;
//	var p2;
//	var lansc=mycars[0].split("|")[0];
//	var buslane=mycars[0].split("|")[1];
//	for(var j=0;j<mycars.length;j++)
//	{
//		p1 = mycars[j].split("|")[5];
//		p2 = mycars[j].split("|")[6];
//		points.push(new BMap.Point(p1,p2));
//	    if(lansc!= mycars[j].split("|")[0]||j==mycars.length-1)
//	    {
//	        var line;
//	        //所经线路数量
//	        var xx;
//            xx=mycars[j-1].split("|")[2];
//	        if(buslane==0)
//	        {
//	        line = new BMap.Polyline(points, {strokeColor:"#1166f7", strokeWeight:xx, strokeOpacity:0.6, strokeStyle:"solid"});
//	        }
//	        else if(buslane==1)
//	        {
//	        line = new BMap.Polyline(points, {strokeColor:"#fc9905", strokeWeight:xx, strokeOpacity:0.6, strokeStyle:"solid"});
//	        }
//	        map.addOverlay(line);
//	        points = [];
//	        points.push(new BMap.Point(p1,p2));
//	    }
//		lansc= mycars[j].split("|")[0];
//		
//	}
//}
//  
  
  
  
function station_road_info(rou,fx)
 {
    createXMLHTTP();
    var mycars=new Array();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
        var strjwdd=xmlHttp.responseText;
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
    var url="Read_Data.aspx?id=5&route5="+rou+"&sxx="+fx;
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
        showalldiv();
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
    var url="Read_Data.aspx?id=14";
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
 }
 
 function show_station_info(mycars3){ 
 mycars2=mycars3.split("|"); 
     var phy_station_id=mycars2[3];
     showid('smallLay');
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
      zh=mycars[i].split("|")[2]+"("+mycars[i].split("|")[8]+")--"+mycars[i].split("|")[6]+"</br>途经线路:"+xlzh;
      str=str+"<li><a href=javascript:void(0); onclick=show_station_info('"+mycars[i]+"'); onmouseover=show_station_name3('"+mycars[i]+"'); onmouseout=remove_div();>"+zh+" </a></li>";
     }
 }
     
 var sst=sss+ima+str+ss1;
 document.getElementById("navigation").innerHTML=sst;
 //控制左侧菜单
if(mycars[0]!="")
{ 
 dch();
 }
 //取消查询遮罩
showalldiv();
}
//拉框搜索站点
function search_station_arange(swlng,swlat,nelng,nelat)
{
showid('smallLay');
createXMLHTTP();
    var mycars=new Array();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
        showalldiv();
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
    var url="Read_Data.aspx?id=29&swlng="+swlng+"&swlat="+swlat+"&nelng="+nelng+"&nelat="+nelat;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}
// <div id="navigation">
//	<ul id="listUL">
//		<li><a href="#">Home</a></li>
//		<li><a href="#">News</a>
//        	<ul class="myHide">
//            	<li><a href="#">Lastest News</a></li>
//                <li><a href="#">All News</a></li>
//            </ul>
//        </li>
//		<li onclick=xx();><a href="#">Sports</a>
//        	<ul class="myHide">
//            	<li onmouseover="yy();"><a href="/">Basketball</a></li>
//                <li><a href="#">Football</a></li>
//                <li><a href="#">Volleyball</a></li>
//            </ul>        
//        </li>
//		<li><a href="#">Weather</a>
//        	<ul class="myHide">
//            	<li><a href="#">Today's Weather</a></li>
//                <li><a href="#">Forecast</a></li>
//            </ul>
//        </li>
//		<li><a href="#">Contact Me</a></li>
//	</ul>
//</div>
  function addMarker3(mycars3,lenn)
 {
     var icon = new BMap.Icon("images/busstop.gif", new BMap.Size(13,13));
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
          title:"站点名称："+mycars3[1]+"<br/>所经线路："+sjccc
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
    var url="Read_Data.aspx?id=14";
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
 }
 var mycarsqj=new Array();
 //关键字搜索站点
  function show_station(zd_name)
 {
  createXMLHTTP();
    var mycars=new Array();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
        showalldiv();
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
          //调整最佳视野
          setTimeout(function(){map.setViewport([new BMap.Point(mycars[0].split("|")[0],mycars[0].split("|")[1]),new BMap.Point(mycars[0].split("|")[0],mycars[0].split("|")[1])]);},500);          //调整到最佳视野

          }
          }
        }
    }
    var url="Read_Data.aspx?id=26&zdname="+zd_name;
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
        var infocontent="站台形式:"+mycars3[6]+";</br>站台长度:"+mycars3[5]+"米;</br>站台宽度:"+mycars3[7]+"米;</br>所经线路:"+mycars3[4];
        
    var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '<img src="images/000296-9-201310090355550069-0017200.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:500px;height:130px;margin-left:3px;"/>' +
                    '站台形式：'+mycars3[6]+';<br/>站台长度：'+mycars3[5]+'米;<br/>站台宽度：'+mycars3[7]+'米;<br/>所经线路：'+mycars3[4]+'' +
                  '</div>';
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow,point2);
});
//1.5版本有效
//    marker.addEventListener("click",function(){
//    var content=  "站台长度:"+mycars3[5]+";</br>站台宽度:"+mycars3[7]+"</br>站台形式:"+mycars3[6]+";</br>所经车次:"+mycars3[4];
//var searchInfoWindow = new BMapLib.SearchInfoWindow(map,"百度地图api",{
//    title: "百度大厦",
//    width  : 280,
//    height : 50,
//    panel  : "panel", //检索结果面板
//    enableAutoPan : true, //自动平移
//    searchTypes :[
//        BMAPLIB_TAB_SEARCH,   //周边检索
//        BMAPLIB_TAB_TO_HERE,  //到这里去
//        BMAPLIB_TAB_FROM_HERE //从这里出发
//    ]
//});
//});
    showalldiv();
    var phy_station_id=mycars3[3];
     marker.addEventListener("dblclick",function(){
     showid('smallLay');
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
      icon = new BMap.Icon("images/lt1.gif", new BMap.Size(10,9));
    }
    else
    {
    icon = new BMap.Icon("images/lt2.gif", new BMap.Size(10,9));
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
            var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '<img src="images/000296-9-201310090355550069-0017200.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:500px;height:130px;margin-left:3px;"/>' +
                    '站台形式：'+mycars3[7]+';<br/>距离上站：'+mycars3[3]+'米;<br/>站台长度：'+mycars3[2]+'米;<br/>所经线路：'+mycars3[8]+'' +
                  '</div>';
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow,point2);
});

       
     
    
} 
  var iii=0;
  function show_allroute(phy_station_id)
  {
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
             showalldiv();
        }
    }
    var url="Read_Data.aspx?id=33&phy_station_id="+phy_station_id;
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
                 icon = new BMap.Icon("images/lt1.gif", new BMap.Size(10,9));
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
    var url="Read_Data.aspx?id=53&phy_station_id="+phy_station_id;
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
    var url="Read_Data.aspx?id=4&route4="+rou+"&sxx="+fx;
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

function  temp(xll)
{
       showCustomer(xll.split("|")[0],xll.split("|")[5],0);     
}
function  temp2(xll)
{
       showCustomer(xll.split("|")[0],xll.split("|")[1],1);     
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
        this.getElementsByTagName("span")[0].innerHTML = that._overText;
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

//layer.onclick=function()
//{newbox.style.display="none";
//layer.style.display="none";
//for(var i=0;i<sel.length;i++)
//{  
//sel[i].style.visibility="visible";  
//}
//}  
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
 for(var i=0;i<mycars.length;i++)
 {
 if(ii==1)
 {
  zh=mycars[i].split("|")[0]+"路----("+mycars[i].split("|")[5]+")";
  zh2="线路长度:"+mycars[i].split("|")[1]+"千米;</br>非直线系数："+mycars[i].split("|")[10]+"</br>专用道里程："+mycars[i].split("|")[3]+"千米;</br>专用道比率："+(mycars[i].split("|")[3]/mycars[i].split("|")[1]*100).toFixed(1)+"%;</br>站点总数："+mycars[i].split("|")[2]+"处;</br>港湾站台数："+mycars[i].split("|")[4]+"处";
  str=str+"<li><a href=javascript:temp('"+mycars[i]+"');>"+zh+" </a><ul class=myHide><li> <a href='#'>"+zh2+"</a></li>";
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
  var ima="<li><img src='Images/tuli.jpg' height='30%' width='92%' vertical-align:'top' text-align:'center' /></li><li>查询到"+iii+"条记录</li>";
 var sst=sss+ima+fsst+ss1;
 document.getElementById("navigation").innerHTML=sst;
 if(ifsf==0)
 {
 dch();
 }
showalldiv();
}






function listview_onload()
{

var ima="<img src='Images/index.gif' height='50%' width='95%' vertical-align:'top' text-align:'center' />";
 
 document.getElementById("navigation").innerHTML=ima;


}

function show_search_result(jing_mo)
    {
showid('smallLay');
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

    var url="Read_Data.aspx?id=28&route="+rou+"&jm="+jing_mo;
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

    var url="Read_Data.aspx?id=47";
    xmlHttp.open("post",url,true);
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
var ima="<li><img src='Images/tuli.jpg' height='30%' width='92%' vertical-align:'top' text-align:'center' /></li><li>查询到"+mycars.length+"条记录</li>";
 for(var i=0;i<mycars.length;i++)
 {

  zh=mycars[i].split("|")[0]+"路----("+mycars[i].split("|")[1]+")";
  str="<li><a href=javascript:temp2('"+mycars[i]+"');>"+zh+" </a></li>";
    fsst=fsst+str;
 }

 var sst=sss+ima+fsst+ss1;
 document.getElementById("navigation").innerHTML=sst;
// dch();
}



//   var lineStr="<table>  <tr> <td onclick=temp("+mycars+")>"+
//                 mycars[0]+"</td></tr><tr><td onclick=temp("+mycars+")>"+mycars[0]+"</td></tr></table>" ;
//       
//       document.getElementById("div_scont_panels").innerHTML=lineStr
var marker66;
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
                var srcc= "Images/"+mycars55[2];
                 map.removeOverlay(marker66); 
                marker66 = new BMap.Marker(new BMap.Point(ee.lng, ee.lat));  // 创建标注
                map.addOverlay(marker66); 
                 marker66.enableDragging();    //可拖拽
            marker66.addEventListener("dragend",function(e){show_route_info(e.point,xl,sxx);
            });
                  
        var opts = {
          width : 0,     // 信息窗口宽度
          height: 0,     // 信息窗口高度
          enableMessage:true,//设置允许信息窗发送短息
          offset: new BMap.Size(0, -20),
          title:xl+"路"
        }
            var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '<img src='+srcc+' alt="images/000296-9-201310090355550069-0017200.jpg" style="float:right;zoom:1;overflow:hidden;width:500px;height:130px;margin-left:3px;"/>' +
                    '车道数量：'+mycars55[3]+'<br/>高程：'+mycars55[4]+'米<br/>所经线路：'+mycars55[5]+'' +
                  '</div>';
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow,ee); 
                
                }
                }
                var url="Read_Data.aspx?id=3&lng="+ee.lng+"&lat="+ee.lat+"&xl="+xl+"&sxx="+sxx;
                xmlHttp.open("post",url,true);
                xmlHttp.send(null);
}

function addPolyline(mycars,ys)
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
	
	
	
//	var buslan1;
//	var buslan=mycars[0].split("|")[3];
//	for(var j=0;j<mycars.length;j++)
//	{
//		
		
		
		
		
//		var point2=new BMap.Point(p1,p2);
////		points.push(point2);
//points[j]=new BMap.Point(p1,p2);
//	    if(lansc!= mycars[j].split("|")[2]||j==mycars.length-1)
//	    {
//	        var line;
//	        if(mycars[j-1].split("|")[3]==1)
//	        {
//	        //#0099CC,006699
//	        line2 = new BMap.Polyline(points, {strokeColor:"#FF9900", strokeWeight:18, strokeOpacity:0.9, strokeStyle:"ridge"});
//	        map.addOverlay(line2);
////	        line = new BMap.Polyline(points, {strokeColor:"blue", strokeWeight:6, strokeOpacity:1, strokeStyle:"ridge"});
//	        }
////	        else
////	        {
////	        line = new BMap.Polyline(points, {strokeColor:"blue", strokeWeight:8, strokeOpacity:0.8, strokeStyle:"ridge"});
////	        }
//	        line = new BMap.Polyline(points, {strokeColor:"blue", strokeWeight:8, strokeOpacity:0.8, strokeStyle:"ridge"});
//	        map.addOverlay(line);
//	        points = [];
//	        points.push(new BMap.Point(p1,p2));
	        
	        
	        
	        line.addEventListener("click",function(e){
            show_route_info(e.point,mycars[0].split("|")[6],mycars[0].split("|")[8]);
	        });
//	        
//	    }
//		lansc= mycars[j].split("|")[2];
//		
//	}
	
map.setViewport(line.getPath());    //调整视野

//	var p30 = mycars[0].split("|")[0];
//	var p31 = mycars[0].split("|")[1];
//	var p40 = mycars[mycars.length-1].split("|")[0];
//	var p41 = mycars[mycars.length-1].split("|")[1];
//	setTimeout(function(){map.setViewport([new BMap.Point(p30,p31),new BMap.Point(p40,p41)]);},1000);          //调整到最佳视野
}
		 
initMap();//创建和初始化地图