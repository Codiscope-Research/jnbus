//搜索道路名称，查看途经线路
function search_road_name(road_name)
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
    var url="Read_Data.aspx?id=14";
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}


function listview_roadname(mycars)
{
//showid('smallLay');
var ima="<div style='text-align:center'><img src='Images/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
 document.getElementById("navigation").innerHTML=ima;
    var mycars2=new Array();
    mycars2=mycars.split(",");
var str="";
var sss="<ul id='listUL'>";
var ss1="</ul>";
var zh="";
var ima="<li><img src='Images/tuli.jpg' height='15%' width='96%' vertical-align:'top' text-align:'center' /></li><li>查询到"+mycars.length+"条记录</li>";
     for(var i=0;i<mycars2.length-1;i++)
     {
//      zh=zh+mycars2[i];
      str=str+"<li><a href=javascript:void(0);onmouseover=show_station_name2('"+mycars2[i]+"'); onmouseout=remove_div();>"+mycars2[i]+" </a></li>";
     }
 var sst=sss+str+ss1;
 document.getElementById("navigation").innerHTML=sst;
 //控制左侧菜单
 dch();
 //取消查询遮罩
//showalldiv();
}


function show_road_name(xll)
{
var point2 = new BMap.Point(xll.split("|")[0],xll.split("|")[1]);
    var txt = "银湖海岸城", mouseoverTxt = txt + " " + parseInt(Math.random() * 1000,10) + "套" ;
        
    var myCompOverlay = new ComplexCustomOverlay(point2, xll.split("|")[7],mouseoverTxt);
        map.addOverlay(myCompOverlay);
}


function road_show_sel(roadname,i,iss)
{
var sfdfdsf=document.getElementById("imags"+i);
sfdfdsf.style.display="block";
//var ima="<div style='text-align:center'><img src='Images/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
// document.getElementById("navigation").innerHTML=ima;
    map.clearOverlays();//清楚地图覆盖物
var road=roadname;
createXMLHTTP();
    var mycars=new Array();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
//        showalldiv();
        var strjwdd=xmlHttp.responseText;
         mycars=strjwdd.split("#"); //字符分割 
//          listview_road(mycars);
          addPolyline_road_singel(mycars,i,road)
        }
    }
    var url="Read_Data.aspx?id=30&roadname="+road+"&fs="+iss;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}


function roadname_show_sel(roadname2,iss)
{
var ima="<div style='text-align:center'><img src='Images/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
 document.getElementById("navigation").innerHTML=ima;
    map.clearOverlays();//清楚地图覆盖物
//var road=document.getElementById("road_name").value;
var road=roadname2;
createXMLHTTP();
    var mycars=new Array();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
//        showalldiv();
        var strjwdd=xmlHttp.responseText;
         mycars=strjwdd.split("*"); //字符分割 
          listview_road(mycars,iss);
        }
    }
    var url="Read_Data.aspx?id=54&roadname="+road+"&fss="+iss;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}


 function addPolyline_road_singel(mycars77,iit,road)
{

var mycars66 = new Array();
  var ii=1;
  var iitt=0;
//  var line;
  var line=new Array();
  		                var points22=[];
  		                var i3=0;

             for(var jj=0;jj<mycars77.length;jj++)
             {
                     mycars66=mycars77[jj].split("*"); //字符分割 

		              var points = [];
			          var p1="";
			           var p2="";
			           
                        for(var j=1;j<mycars66.length;j++)
		                {	                
		                    var route_count=mycars66[j].split("|")[6];
		                    var route_count2;
			                p1 = mycars66[j].split("|")[8];
			                p2 = mycars66[j].split("|")[9];
			                var roadid=mycars66[j].split("|")[1];
			                points22[i3]=new BMap.Point(p1,p2);
			                i3++;
			                //为j+1条的车道数赋值
			                if(j<mycars66.length-1)
			                {
			                route_count2=mycars66[j+1].split("|")[6];
			                }
			                else
			                {
			                route_count2=mycars66[j].split("|")[6];
			                }
			                //判断j条和j+1条的车道数是否相等
			                if(route_count==route_count2)
			                {
			                    points[j-ii]=new BMap.Point(p1,p2);
			                    
			                    if(j==mycars66.length-1)
			                    {
                                     if(route_count<=3)
	                                {
	                                line[iitt]= new BMap.Polyline(points, {strokeColor:"#78C5F9", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge"});
	                                }
	                                else if(route_count>3&&route_count<=7)
	                                {
	                                line[iitt] = new BMap.Polyline(points, {strokeColor:"#00FF00", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge "});
	                                }
	                                else if(route_count>7&&route_count<=12)
	                                {
	                                line[iitt] = new BMap.Polyline(points, {strokeColor:"#6730FF", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge "});
	                                }
	                                else if(route_count>12&&route_count<=17)
	                                {
	                                line[iitt] = new BMap.Polyline(points, {strokeColor:"#FF9F19", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge "});
	                                }
	                                else if(route_count>17)
	                                {
	                                line[iitt] = new BMap.Polyline(points, {strokeColor:"#FF0000", strokeWeight:3, strokeOpacity:1, strokeStyle:"ridge "});
	                                }
	                                else
	                                {
	                                line[iitt] = new BMap.Polyline(points, {strokeColor:"gray", strokeWeight:3, strokeOpacity:1, strokeStyle:"ridge "});
	                                }
	                                map.addOverlay(line[iitt]);
                        	        line[iitt].addEventListener("click",function(e){
                                    show_road_info(e.point,road);
                                    });
                                    iitt++;
			                    }
			                }
			                else
			                {
		                        points[j-ii]=new BMap.Point(p1,p2);
		                        ii=j;
                                  if(route_count<=3)
	                                {
	                                line[iitt] = new BMap.Polyline(points, {strokeColor:"#78C5F9", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge"});
	                                }
	                                else if(route_count>3&&route_count<=7)
	                                {
	                                line[iitt] = new BMap.Polyline(points, {strokeColor:"#00FF00", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge "});
	                                }
	                                else if(route_count>7&&route_count<=12)
	                                {
	                                line[iitt] = new BMap.Polyline(points, {strokeColor:"#6730FF", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge "});
	                                }
	                                else if(route_count>12&&route_count<=17)
	                                {
	                                line[iitt] = new BMap.Polyline(points, {strokeColor:"#FF9F19", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge "});
	                                }
	                                else if(route_count>17)
	                                {
	                                line[iitt] = new BMap.Polyline(points, {strokeColor:"#FF0000", strokeWeight:3, strokeOpacity:1, strokeStyle:"ridge "});
	                                }
	                                else
	                                {
	                                line[iitt] = new BMap.Polyline(points, {strokeColor:"gray", strokeWeight:3, strokeOpacity:1, strokeStyle:"ridge "});
	                                }
	                            map.addOverlay(line[iitt]);
	                            	            line[iitt].addEventListener("click",function(e){
                                                show_road_info(e.point,road);
	                                            });
	                                            iitt++;
		                        points = [];
			                    points[j-ii]=new BMap.Point(p1,p2);
			                }
		                }
		                }
			var sdfsfds=document.getElementById("imags"+iit);
	sdfsfds.style.display="none";
linee=new BMap.Polyline(points22);
map.setViewport(linee.getPath());    //调整视野
}


//显示道路信息框

//var marker88;
function show_road_info(ee,road_id)
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
//var srcc2="images/11111.jpg";
                  
        var opts = {
          width : 0,     // 信息窗口宽度
          height: 0,     // 信息窗口高度
          enableMessage:true,//设置允许信息窗发送短息
          offset: new BMap.Size(0, 0),
          title:mycars55[5]
        }
        var zyd="";
        if(mycars55[1]==0)
        {
        zyd="否";
        }
        else
        {
        zyd="是";
        }
//              var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
//                    '<img src="'+srcc+'" alt="'+srcc+'"  onerror=this.src="'+srcc2+'" style="float:right;zoom:1;overflow:hidden;width:400px;height:220px;margin-left:3px;"/>' +
//                    '车道数量：'+mycars55[0] +'</br>是否公交专用道：'+zyd+'</br>途经线路数量：'+mycars55[3]+'</br>途经线路：'+mycars55[4]+
//                  '</div>';
              var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '<table style=" width:550px;"><tr><td style=" word-break:break-all; word-wrap:break-word;border: thin groove #00CCFF; vertical-align:top; text-align:left; width:150px">车道数量：'+mycars55[0] +'</br>公交车道：'+zyd+'</br>途经数量：'+mycars55[3]+'</br>途经线路：'+mycars55[4]+'</td>' +
                    '<td style="border: thin groove #00CCFF;vertical-align:middle; text-align:center; width:400px"><img src="'+srcc2+'" alt="'+srcc2+'" style="float:right;zoom:1;overflow:hidden;width:400px;height:220px;margin-left:3px;"/>'+
                  '</td></tr></table></div>';
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow,ee); 
                
                }
                }
                var url="Read_Data.aspx?id=55&lng="+ee.lng+"&lat="+ee.lat+"&road_id="+road_id;
                xmlHttp.open("post",url,true);
                xmlHttp.send(null);
}

//function show_route_info2(ee,xl,sxx)
//{
//   
//                  
//        var opts = {
//          width : 0,     // 信息窗口宽度
//          height: 0,     // 信息窗口高度
//          enableMessage:true,//设置允许信息窗发送短息
//          offset: new BMap.Size(0, -20),
//          title:""
//        }
//            var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
//                    '<img src="images/000296-9-201310090355550069-0017200.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:500px;height:130px;margin-left:3px;"/>' +
//                    '车道数量：4<br/>高程：24米<br/>所经线路：k56,117,2,13,k109</div>';
//        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
//        map.openInfoWindow(infoWindow,ee); 

//}


//function listview_road(mycars)
//{
//var iii=1;
//var str="";
//var sss="<ul id='listUL'>";
//var ss1="</ul>";
//var ii=1;
//var zh="";
//var zh2="";
//var ends="</ul></li>";
//var lists="";
//var fsst="";
//var yz_roadname_fx="";
//var yz_roadname_fx2="";
//var yz_road_master_id="";
//var yz_road_master_id2="";
//              var shifouzyd="";
// for(var i=0;i<mycars.length;i++)
// {     
// //判断roadname与方向的组合是否一样
//     if(i!=mycars.length-1)
//     {
//     yz_roadname_fx=mycars[i+1].split("|")[1]+mycars[i+1].split("|")[3];
//     }
//     else
//     {
//      yz_roadname_fx=mycars[i].split("|")[1]+mycars[i].split("|")[3];
//     }
//     yz_roadname_fx2=mycars[i].split("|")[1]+mycars[i].split("|")[3];
//      //验证roadmasterid
//      if(i!=mycars.length-1)
//     {
//     yz_road_master_id=mycars[i+1].split("|")[0];
//     }
//     else
//     {
//      yz_road_master_id=mycars[i].split("|")[0];
//     }
//     yz_road_master_id2=mycars[i].split("|")[0];
//     
//     //添加父栏
//     if(yz_roadname_fx!=yz_roadname_fx2)
//     {
//      zh=mycars[i].split("|")[1]+"--("+mycars[i].split("|")[3]+")";
//      str=str+"<li><a href=javascript:void(0); >"+zh+" </a><ul class=myHide>";
//      fsst=fsst+str+lists+ends;
//     str="";
//     lists="";
//     }
//     //添加子栏
//     if(yz_road_master_id!=yz_road_master_id2)
//     {
//         if(mycars[i].split("|")[5]==0)
//          {
//          shifouzyd="无";
//          }
//          else
//          {
//          shifouzyd="有";
//          }
//          zh2="路段:"+mycars[i].split("|")[2]+"</br>专用道："+shifouzyd+"</br>车道数："+mycars[i].split("|")[4]+";</br>所经线路数："+mycars[i].split("|")[6]+"条";
//         lists=lists+"<li><a href=javascript:void(0); onclick=show_road('"+mycars[i].split("|")[0]+"');>"+zh2+"</a></li>";
//     }
// }
// 
//  var ifsf=0;
//  if(mycars[0]=="")
//  {
//  iii=0;
//  fsst="";
//  sss="";
//  ss1="";
//  ifsf=1;
//  }
// var ima="<li  text-align:'center'><iframe frameborder='0' scrolling='no' width='100%' style='height:202px;'  src='tuli_2.html'></iframe></li><li>查询到"+iii+"条记录</li>";

// var sst=sss+ima+fsst+ss1;
// document.getElementById("navigation").innerHTML=sst;
// if(ifsf==0)
// {
// dch();
// }
////showalldiv();
//}


//function listview_road(mycars)
//{
//var str="";
//var sss="<ul id='listUL'>";
//var ss1="</ul>";
//var zh="";
//var recordcount=mycars.length;

//var ima22="<div style='text-align:center'><img src='Images/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
//var ima33="<li  text-align:'center'><iframe frameborder='0' scrolling='no' width='100%' style='height:202px;'  src='tuli_2.html'></iframe></li>";
//var ste="<li id='imags' style='display:none'>"+ima22+"</li>"
//if(mycars[0]=="")
//{
//recordcount=0;
//}
//var ima="<li>查询到"+recordcount+"条记录；</li>"
//if(mycars[0]!="")
//{
//     for(var i=0;i<mycars.length;i++)
//     {
//     tjxl=mycars[0];
//     var xlzh="&nbsp";
//         for(var tj=0;tj<tjxl.length-1;tj++)
//         {
//         xlzh=xlzh+tjxl[tj]+"&nbsp";
//         }
//      zh=mycars[i];
//      str=str+"<li><a href=javascript:void(0); onclick=road_show_sel('"+mycars[i]+"');>"+zh+" </a></li>";
//     }
// }
//     
// var sst=sss+ima33+ima+str+ste+ss1;
// document.getElementById("navigation").innerHTML=sst;
// //控制左侧菜单
//if(mycars[0]!="")
//{ 
// dch();
// }
//}

function listview_road(mycars,iss)
{
var str="";
var sss="<ul id='listUL'>";
var ss1="</ul>";
var ii=1;
var zh="";
var zh2="";
var lists="";
var fsst="";
var ima="<div><li><iframe frameborder='0' scrolling='no' width='100%' style='height:200px;'  src='tuli_2.html'></iframe></li><li>查询到"+mycars.length+"条记录</li></div>";
var ima22="<div style='text-align:center'><img src='Images/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
 for(var i=0;i<mycars.length;i++)
 {

  zh=mycars[i];
  str="<li><a href=javascript:void(0); onclick=road_show_sel('"+mycars[i]+"',"+i+","+iss+");>"+zh+" </a></li><li id='imags"+i+"' style='display:none'>"+ima22+"</li>";
    fsst=fsst+str;
 }

 var sst=sss+ima+fsst+ss1;
 document.getElementById("navigation").innerHTML=sst;
}

function show_road(id)
{
//showid('smallLay');
//var ima="<div style='text-align:center'><img src='Images/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
// document.getElementById("navigation").innerHTML=ima;
//    map.clearOverlays();//清楚地图覆盖物
    createXMLHTTP();
    var mycars = new Array();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
        var strjwdd=xmlHttp.responseText;
         mycars=strjwdd.split("*"); //字符分割 
         addPolyline_road(mycars);//向地图中添   
        }
    }

    var url="Read_Data.aspx?id=27&roadid="+id;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}  
  
  function addPolyline_road(mycars)
{
	var points = [];
	var p1;
	var p2;
	var lansc=mycars[0].split("|")[0];
	var buslane=mycars[0].split("|")[1];
	for(var j=0;j<mycars.length;j++)
	{
		p1 = mycars[j].split("|")[5];
		p2 = mycars[j].split("|")[6];
		points.push(new BMap.Point(p1,p2));
	    if(lansc!= mycars[j].split("|")[0]||j==mycars.length-1)
	    {
	        var line;
	        //所经线路数量
	        var xx;
            xx=mycars[j-1].split("|")[2];
             if(buslane==1)
	        {
	        var line3 = new BMap.Polyline(points, {strokeColor:"#66CCFF", strokeWeight:10, strokeOpacity:0, strokeStyle:"solid"});
	        map.addOverlay(line3);
	        }
	        
	        if(xx==0)
	        {
	        line = new BMap.Polyline(points, {strokeColor:"#990033", strokeWeight:7, strokeOpacity:0.6, strokeStyle:"solid"});
	        }
	        else if(xx>0&&xx<=3)
	       {
	        line = new BMap.Polyline(points, {strokeColor:"#FF9900", strokeWeight:7, strokeOpacity:0.6, strokeStyle:"solid"});
	        }
	        else if(xx>3&&xx<=5)
	       {
	        line = new BMap.Polyline(points, {strokeColor:"#009966", strokeWeight:7, strokeOpacity:0.6, strokeStyle:"solid"});
	        }
	        else 
	        {
	        line = new BMap.Polyline(points, {strokeColor:"#339999", strokeWeight:7, strokeOpacity:0.6, strokeStyle:"solid"});
	        }
	        map.addOverlay(line);
	        points = [];
	        points.push(new BMap.Point(p1,p2));
	    }
		lansc= mycars[j].split("|")[0];
		
	}
//	showalldiv();
	var p30 = mycars[0].split("|")[5];
	var p31 = mycars[0].split("|")[6];
	var p40 = mycars[mycars.length-1].split("|")[5];
	var p41 = mycars[mycars.length-1].split("|")[6];
	setTimeout(function(){map.setViewport([new BMap.Point(p30,p31),new BMap.Point(p40,p41)]);},1000);          //调整到最佳视野
}
  
  function fugai()
  {
  for (var i = 0; i <mycarsqj.length ; i ++) 
          {
          var mycars2 = new Array();
          var fgfw=document.getElementById("fgfw").value;
          mycars2=mycarsqj[i].split("|");
          var point2 = new BMap.Point(mycars2[0],mycars2[1]);
            var circle = new BMap.Circle(point2,fgfw,
            {strokeColor:"#66CC00",
            fillColor:"#FFCCCC",
             strokeWeight:2, 
             strokeOpacity:0.5,
             fillOpacity:0.2, 
             strokeStyle:"ridge"});
            map.addOverlay(circle);
          }
          


  }
  
  
  function ztcx()
  {
      map.clearOverlays();//清楚地图覆盖物
     var t=document.getElementById("searcharound_objectlayers");
    var xhh=t.options[t.selectedIndex].value;
    
         var t2=document.getElementById("Select4");
    var xhh2=t2.options[t2.selectedIndex].value;
             var t222=document.getElementById("Select5");
    var xhh222=t222.options[t222.selectedIndex].value;
    var urlstring="";
//    showid('smallLay');
var ima="<div style='text-align:center'><img src='Images/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
 document.getElementById("navigation").innerHTML=ima;
    
     var tt=document.getElementById("searcharound_radius");
    var txhh=tt.options[tt.selectedIndex].value;
  
       var ttt=document.getElementById("Select3");
    var txhhh=ttt.options[ttt.selectedIndex].value;
  
  
if(xhh==1)//站台形式查询
  {
//  showid('smallLay');
var ima="<div style='text-align:center'><img src='Images/loading.gif' text-align:'center' /><br/>数据加载中，请稍后……</div>";
 document.getElementById("navigation").innerHTML=ima;
  map.clearOverlays();//清楚地图覆盖物
  urlstring="Read_Data.aspx?id=41&lx="+txhh;
  var mycars55 = new Array();
    createXMLHTTP();
    xmlHttp.onreadystatechange=function()
    {
        if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
            var strjwdd=xmlHttp.responseText;
             mycars55=strjwdd.split("*"); //字符分割 
             listview_station(mycars55);
              for (var i = 0; i <mycars55.length ; i ++) 
              {
              var mycars2 = new Array();
              mycars2=mycars55[i].split("|");
              addMarker4(mycars2);
              }
        }
    }
    var url=urlstring;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
  }

else if(xhh==2)//站点所经线路查询
  {
  urlstring="Read_Data.aspx?id=42&sl="+txhhh;
  var mycars55 = new Array();
    createXMLHTTP();
    xmlHttp.onreadystatechange=function()
    {
        if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
            var strjwdd=xmlHttp.responseText;
             mycars55=strjwdd.split("*"); //字符分割 
              listview_station(mycars55);
//               addMarker4(mycars55);
              for (var i = 0; i <mycars55.length ; i ++) 
              {
              var mycars2 = new Array();
              mycars2=mycars55[i].split("|");
              addMarker4(mycars2);
              }
        }
    }
    var url=urlstring;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
  }
else if(xhh==3)//专用道网络
  {
  urlstring="Read_Data.aspx?id=43";
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
             addPolyline_route_mul_zyd(mycars55);

             
        }
    }
    var url=urlstring;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
  } 
 else if(xhh==4)//公交网络
  {
  urlstring="Read_Data.aspx?id=39&fs="+xhh222;
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
             addPolyline_route_mul_fgs(mycars55,xhh222);
//             for(var jj=0;jj<mycars55.length;jj++)
//             {
//             mycars66=mycars55[jj].split("*"); //字符分割 
//             addPolyline_route_mul_fgs(mycars66,xhh222);
//             }

        }
    }
    var url=urlstring;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
  }
  else if(xhh==5)//重复系数
  {
  urlstring="Read_Data.aspx?id=40&fs="+xhh2;
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
             addPolyline_route_mul_ztcx_cfxs(mycars55);
        }
    }
    var url=urlstring;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
  
  }
  }
  
 
  
function listview_wl(str)
{
var ima="";
if(str==1)
{
ima="<div><iframe frameborder='0' scrolling='no' width='100%' style='height:97%;'  src='yigs.html'></iframe></div>"
}
else if(str==2)
{
ima="<div><iframe frameborder='0' scrolling='no' width='100%' style='height:97%;'  src='ergs.html'></iframe></div>"
}
else if(str==3)
{
ima="<div><iframe frameborder='0' scrolling='no' width='100%' style='height:97%;'  src='sangs.html'></iframe></div>"
}
else if(str==4)
{
ima="<div><iframe frameborder='0' scrolling='no' width='100%' style='height:97%;'  src='sigs.html'></iframe></div>"
}
else if(str==5)
{
ima="<div><iframe frameborder='0' scrolling='no' width='100%' style='height:97%;'  src='wugs.html'></iframe></div>"
}
else if(str==6)
{
ima="<div><iframe frameborder='0' scrolling='no' width='100%' style='height:97%;'  src='liugs.html'></iframe></div>"
}
else if(str==7)
{
ima="<div><iframe frameborder='0' scrolling='no' width='100%' style='height:97%;'  src='qigs.html'></iframe></div>"
}
else if(str==8)
{
ima="<div><iframe frameborder='0' scrolling='no' width='100%' style='height:97%;'  src='brt.html'></iframe></div>"
}
 
 document.getElementById("navigation").innerHTML=ima;
}
  
  function listview_gjzyd()
{
var ima="<div><iframe frameborder='0' scrolling='no' width='100%' style='height:97%;'  src='gjzyd.html'></iframe></div>"

 document.getElementById("navigation").innerHTML=ima;
}
  
  
  
  
  function addPolyline_route_mul_zyd(mycars77)
  {
   var mycars66 = new Array();
  var ii=1;
  var line;

             for(var jj=0;jj<mycars77.length;jj++)
             {
                     mycars66=mycars77[jj].split("*"); //字符分割 

		              var points = [];
			          var p1="";
			           var p2="";
//		                var route_count=mycars66[0].split("|")[3];
                        for(var j=1;j<mycars66.length;j++)
		                {
		                    var xh=mycars66[j].split("|")[3];
		                    var xh2;
			                p1 = mycars66[j].split("|")[1];
			                p2 = mycars66[j].split("|")[2];
			                //为j+1条的车道数赋值
			                if(j<mycars66.length-1)
			                {
			                xh2=mycars66[j+1].split("|")[3];
			                }
			                else
			                {
			                xh2=mycars66[j].split("|")[3];
			                }
			                
			                //判断j条和j+1条的车道数是否相等
			                if(xh==xh2)
			                {
			                    points[j-ii]=new BMap.Point(p1,p2);
			                    
			                    if(j==mycars66.length-1)
			                    {
//	                                line = new BMap.Polyline(points, {strokeColor:"#00FF00", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge"});
                                     if(xh==1)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#DE73FF", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge"});
	                                }
	                                else if(xh==2)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#01C5FF", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge "});
	                                }
	                                map.addOverlay(line);
			                    }
			                }
			                else
			                {
		                        points[j-ii]=new BMap.Point(p1,p2);
		                        ii=j;
//	                            line = new BMap.Polyline(points, {strokeColor:"#00FF00", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge"});
                                     if(xh==1)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#DE73FF", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge"});
	                                }
	                                else if(xh==2)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#01C5FF", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge "});
	                                }
	                            map.addOverlay(line);
		                        points = [];
			                    points[j-ii]=new BMap.Point(p1,p2);
			                }
		                }
		
             }
listview_gjzyd();

  }
  ///分公司查询备用
function addPolyline_route_mul_ztcx(mycars77,gs)
{       
	var points = [];
	var p1;
	var p2;
	 var line;
	for(var j=1;j<mycars77.length;j++)
	{
		p1 = mycars77[j].split("|")[1];
		p2 = mycars77[j].split("|")[2];
		points[j-1]=new BMap.Point(p1,p2);

	 }
	    line = new BMap.Polyline(points, {strokeColor:"blue", strokeWeight:3, strokeOpacity:0.8, strokeStyle:"ridge"}); 
	       map.addOverlay(line);
	                    listview_wl(gs);
//	               showalldiv();
		
	}



function addPolyline_route_mul_fgs(mycars77,gs)
{       
  var mycars66 = new Array();
  var ii=1;
  var line;

             for(var jj=0;jj<mycars77.length;jj++)
             {
                     mycars66=mycars77[jj].split("*"); //字符分割 

		              var points = [];
			          var p1="";
			           var p2="";
//		                var route_count=mycars66[0].split("|")[3];
                        for(var j=1;j<mycars66.length;j++)
		                {
		                    var route_count=mycars66[j].split("|")[3];
		                    var route_count2;
			                p1 = mycars66[j].split("|")[1];
			                p2 = mycars66[j].split("|")[2];
			                //为j+1条的车道数赋值
			                if(j<mycars66.length-1)
			                {
			                route_count2=mycars66[j+1].split("|")[3];
			                }
			                else
			                {
			                route_count2=mycars66[j].split("|")[3];
			                }
			                
			                //判断j条和j+1条的车道数是否相等
			                if(route_count==route_count2)
			                {
			                    points[j-ii]=new BMap.Point(p1,p2);
			                    
			                    if(j==mycars66.length-1)
			                    {
                                     if(route_count<=3)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#78C5F9", strokeWeight:2, strokeOpacity:0.9, strokeStyle:"solid"});
	                                }
	                                else if(route_count>3&&route_count<=7)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#00FF00", strokeWeight:2, strokeOpacity:0.9, strokeStyle:"solid "});
	                                }
	                                else if(route_count>7&&route_count<=12)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#6730FF", strokeWeight:2, strokeOpacity:0.9, strokeStyle:"solid "});
	                                }
	                                else if(route_count>12&&route_count<=17)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#FF9F19", strokeWeight:2, strokeOpacity:0.9, strokeStyle:"solid "});
	                                }
	                                else if(route_count>17)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#FF0000", strokeWeight:2, strokeOpacity:1, strokeStyle:"solid "});
	                                }
	                                else
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"gray", strokeWeight:2, strokeOpacity:1, strokeStyle:"solid "});
	                                }
	                                map.addOverlay(line);
	                                

			                    }
			                }
			                else
			                {
		                        points[j-ii]=new BMap.Point(p1,p2);
		                        ii=j;
                                  if(route_count<=3)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#78C5F9", strokeWeight:2, strokeOpacity:0.9, strokeStyle:"solid"});
	                                }
	                                else if(route_count>3&&route_count<=7)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#00FF00", strokeWeight:2, strokeOpacity:0.9, strokeStyle:"solid "});
	                                }
	                                else if(route_count>7&&route_count<=12)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#6730FF", strokeWeight:2, strokeOpacity:0.9, strokeStyle:"solid "});
	                                }
	                                else if(route_count>12&&route_count<=17)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#FF9F19", strokeWeight:2, strokeOpacity:0.9, strokeStyle:"solid "});
	                                }
	                                else if(route_count>17)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#FF0000", strokeWeight:2, strokeOpacity:1, strokeStyle:"solid "});
	                                }
	                                else
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"gray", strokeWeight:2, strokeOpacity:1, strokeStyle:"solid "});
	                                }
	                            map.addOverlay(line);
                                    
		                        points = [];
			                    points[j-ii]=new BMap.Point(p1,p2);
			                }
		                }
		
             }
//	    showalldiv();
	    listview_wl(gs);
		
	}






function addPolyline_route_mul_ztcx_cfxs(mycars77)
{       
  var mycars66 = new Array();
  var ii=1;
  var line;

             for(var jj=0;jj<mycars77.length;jj++)
             {
                     mycars66=mycars77[jj].split("*"); //字符分割 

		              var points = [];
			          var p1="";
			           var p2="";
//		                var route_count=mycars66[0].split("|")[3];
                        for(var j=1;j<mycars66.length;j++)
		                {
		                    var route_count=mycars66[j].split("|")[3];
		                    var route_count2;
			                p1 = mycars66[j].split("|")[1];
			                p2 = mycars66[j].split("|")[2];
			                //为j+1条的车道数赋值
			                if(j<mycars66.length-1)
			                {
			                route_count2=mycars66[j+1].split("|")[3];
			                }
			                else
			                {
			                route_count2=mycars66[j].split("|")[3];
			                }
			                
			                //判断j条和j+1条的车道数是否相等
			                if(route_count==route_count2)
			                {
			                    points[j-ii]=new BMap.Point(p1,p2);
			                    
			                    if(j==mycars66.length-1)
			                    {
                                     if(route_count<=3)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#78C5F9", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge"});
	                                }
	                                else if(route_count>3&&route_count<=7)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#00FF00", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge "});
	                                }
	                                else if(route_count>7&&route_count<=12)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#6730FF", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge "});
	                                }
	                                else if(route_count>12&&route_count<=17)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#FF9F19", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge "});
	                                }
	                                else if(route_count>17)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#FF0000", strokeWeight:3, strokeOpacity:1, strokeStyle:"ridge "});
	                                }
	                                else
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"gray", strokeWeight:3, strokeOpacity:1, strokeStyle:"ridge "});
	                                }
	                                map.addOverlay(line);
                                    line.addEventListener("click",function(e){
                                    show_road_info_cfxs(e.point);
                                    });
			                    }
			                }
			                else
			                {
		                        points[j-ii]=new BMap.Point(p1,p2);
		                        ii=j;
                                  if(route_count<=3)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#78C5F9", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge"});
	                                }
	                                else if(route_count>3&&route_count<=7)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#00FF00", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge "});
	                                }
	                                else if(route_count>7&&route_count<=12)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#6730FF", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge "});
	                                }
	                                else if(route_count>12&&route_count<=17)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#FF9F19", strokeWeight:3, strokeOpacity:0.9, strokeStyle:"ridge "});
	                                }
	                                else if(route_count>17)
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"#FF0000", strokeWeight:3, strokeOpacity:1, strokeStyle:"ridge "});
	                                }
	                                else
	                                {
	                                line = new BMap.Polyline(points, {strokeColor:"gray", strokeWeight:3, strokeOpacity:1, strokeStyle:"ridge "});
	                                }
	                            map.addOverlay(line);
                                    line.addEventListener("click",function(e){
                                    show_road_info_cfxs(e.point);
                                    });
                                    
		                        points = [];
			                    points[j-ii]=new BMap.Point(p1,p2);
			                }
		                }
		
             }
//	    showalldiv();
	    listview_road_cfxs();
		
	}
	
	//显示道路重复系数信息框
function show_road_info_cfxs(ee)
{
//    var pt = ee.point;
//    gc.getLocation(pt, function(rs){
//        var addComp = rs.addressComponents;
//        alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
//        }
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
          offset: new BMap.Size(0, 0),
          title:mycars55[5]
        }
        var zyd="";
        if(mycars55[1]==0)
        {
        zyd="否";
        }
        else
        {
        zyd="是";
        }
//              var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
//                    '<img src="'+srcc+'" alt="'+srcc+'"  onerror=this.src="'+srcc2+'" style="float:right;zoom:1;overflow:hidden;width:400px;height:220px;margin-left:3px;"/>' +
//                    '车道数量：'+mycars55[0] +'</br>是否公交专用道：'+zyd+'</br>途经线路数量：'+mycars55[3]+'</br>途经线路：'+mycars55[4]+
//                  '</div>';


              var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '<table style="width:550px;"><tr><td style="word-break:break-all; word-wrap:break-word;border: thin groove #00CCFF; vertical-align:top; text-align:left; width:150px">车道数量：'+mycars55[0] +'</br>公交车道：'+zyd+'</br>途经数量：'+mycars55[3]+'</br>途经线路：'+mycars55[4]+'</td>' +
                    '<td style="border: thin groove #00CCFF;vertical-align:middle; text-align:center; width:400px"><img src="'+srcc2+'" alt="'+srcc2+'" style="float:right;zoom:1;overflow:hidden;width:400px;height:220px;margin-left:3px;"/>'+
                  '</td></tr></table></div>';
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow,ee); 
                
                }
                }
                var url="Read_Data.aspx?id=56&lng="+ee.lng+"&lat="+ee.lat;
                xmlHttp.open("post",url,true);
                xmlHttp.send(null);
}
	
function listview_road_cfxs()
{

var ima="<div><iframe frameborder='0' scrolling='no' width='100%' style='height:97%;'  src='gjcfxs.html'></iframe></div>";
 document.getElementById("navigation").innerHTML=ima;
}

//图像不能正常显示时的替代图像
//function nofind(img2){ 

//var img=event.srcElement; 

//img.src=img2;
// 
//img.onerror=null; 控制不要一直跳动 

//} 
