<%@ page language="C#" autoeventwireup="true" inherits="station_sx, App_Web_agyah52i" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<meta name="keywords" content="百度地图,百度地图API，百度地图自定义工具，百度地图所见即所得工具" />
<meta name="description" content="百度地图API自定义地图，帮助用户在可视化操作下生成百度地图" />
<title>公交站点添加</title>
<!--引用百度地图API-->
<style type="text/css">
    html,body{margin:0;padding:0;}
    .iw_poi_title {color:#CC5522;font-size:14px;font-weight:bold;overflow:hidden;padding-right:13px;white-space:nowrap}
    .iw_poi_content {font:12px arial,sans-serif;overflow:visible;padding-top:4px;white-space:-moz-pre-wrap;word-wrap:break-word}
    .style1
    {
        width: 100%;
        border-style: solid;
        border-width: 1px;
        height:90%;
    }
</style>
<script src="http://api.map.baidu.com/api?v=1.3" type="text/javascript"></script>
</head>

<body>
    <form id="form1" runat="server">
  <!--百度地图容器-->
  <div style="height:90%">
      <table align="center" rules="all" class="style1">
          <tr>
              <td style="width:25%; vertical-align:top">
              <div style="overflow:scroll ; height:800px">
                  <div id="jwd"></div>
                  <div></div>
                   <div id="xxx">
                   <p>
                       <div>
                           线路：<asp:TextBox ID="TextBox1" runat="server" Width="140px"></asp:TextBox>
                       </div>
                       </p>
                       <p>
                       <div>
                       方向：<asp:DropDownList ID="DropDownList1" runat="server" Width="140px">
                               <asp:ListItem>上行</asp:ListItem>
                               <asp:ListItem>下行</asp:ListItem>
                           </asp:DropDownList>
                              </div>
                              </p>
                              <p>
                              <div>
                           <input onclick="showCustomer();" type="button" value="查看" />
                           </div>
                           </p>
                                                      <p>
                           站点编号：<asp:TextBox ID="zd_bh" runat="server" ></asp:TextBox>
                                                      </p>
                           <p>
                           站点名称：<asp:TextBox ID="zdmc" runat="server" ></asp:TextBox>
                                                      </p>
                           <p>                           </p>
                           <p>
                       <div>
                           站台长度：<asp:TextBox ID="changdu" runat="server"></asp:TextBox>
                       </div>                           </p>
                           <p>
                       <div>
                           站台宽度：<asp:TextBox ID="kuandu" runat="server"></asp:TextBox>
                       </div>                           </p>
                           <p>
                           <div>站台类型：
                           <asp:DropDownList ID="ztlx" runat="server">
                               <asp:ListItem Value="1">非港湾</asp:ListItem>
                               <asp:ListItem Value="2">港湾式</asp:ListItem>
                               <asp:ListItem Value="3">国标式</asp:ListItem>
                           </asp:DropDownList>
                           </div>                           </p>
                           <p>广告位数：<asp:TextBox ID="ggw" runat="server"></asp:TextBox></p>
                           <p>
                       <div id="info">
                           </div></p>
                       <p>
                       <input type="button" value="修改" onclick="update_station_info();" />
                       </p>
    </div></div></td>
              <td style="width:80%">
                    <div style="width:100%;height:800px;border:#ccc solid 1px;" id="dituContent"></div></td>
          </tr>
      </table>
    </div>
   
</form>
</body>



<script type="text/javascript">
   //创建和初始化地图函数：
    var point ;
    var xmlHttp;
    var bx,by,xh;
    function initMap()
    {
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
    }
    
    //创建地图函数：
    function createMap()
    {
        var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
        point = new BMap.Point(117.007863, 36.676649);//定义一个中心点坐标
        map.centerAndZoom(point,11);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局}

    }
    
    
    //地图事件设置函数：
    function setMapEvent()
    {
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
    }
    
    //地图控件添加函数：
    function addMapControl()
    {
        //向地图中添加缩放控件
	var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
	map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
	var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
	map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
	var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
	map.addControl(ctrl_sca);
	
	map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]}));     //2D图，卫星图

    map.addControl(new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT}));    //左上角，默认地图控件
    }
    
function showCustomer()
{
createXMLHTTP();
       var mycars = new Array();
    xmlHttp.onreadystatechange=function()
    {
//    alert(xmlHttp.readyState);
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
//        alert(xmlHttp.status);
        try{
        var strjwdd=xmlHttp.responseText;
         mycars=strjwdd.split("*"); //字符分割 
         map.clearOverlays();//清楚地图覆盖物
         addPolyline(mycars);//向地图中添  
         } 
         catch(e)
         {}
         setTimeout("station_road_info();",2000);
        }
    }
var t=document.getElementById("DropDownList1");
var url="Read_Data.aspx?id=2&route="+document.getElementById("TextBox1").value+"&sxx="+t.options[t.selectedIndex].value;
xmlHttp.open("post",url,true);
xmlHttp.send(null);
}  

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

function update_station_info()
{
    var t=document.getElementById("DropDownList2");
    var zd_id=t.options[t.selectedIndex].value;
    var tt=document.getElementById("DropDownList3");
    var zd_pos=tt.options[tt.selectedIndex].value;
    var len=document.getElementById("changdu").value;
    var wid=document.getElementById("kuandu").value;
    var tt=document.getElementById("ztlx");
    var ztlx=tt.options[tt.selectedIndex].value;
    var ggw=document.getElementById("ggw").value;
        createXMLHTTP();
        xmlHttp.onreadystatechange=function()
        {
          if (xmlHttp.readyState==4 && xmlHttp.status==200)
            {
            var strjwdd=xmlHttp.responseText;
            if(strjwdd==2)
            {
            document.getElementById("info").innerHTML="修改成功";
            document.getElementById("info").style.backgroundColor="green";
            }
            else
            {
            document.getElementById("info").innerHTML="修改失败";
            document.getElementById("info").style.backgroundColor="red";
            document.getElementById("info").style.font.fontColor="white"
            }
            }
        }
    var url="Read_Data.aspx?id=13&zd_id="+zd_id+"&zd_pos="+zd_pos+"&len="+len+"&wid="+wid+"&station_type="+ztlx+"&ggw="+ggw;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}
//查找最近点
function computer_dis(wlzdbh,zdxh_double)
{
    var sxx=document.getElementById("DropDownList1");
    var xl=document.getElementById("TextBox1").value;
    var xh_singel = document.getElementById("TextBox2").value;
        createXMLHTTP();
         var mycars = new Array();
        xmlHttp.onreadystatechange=function()
        {
//        alert(xmlHttp.readyState)
          if (xmlHttp.readyState==4 && xmlHttp.status==200)
            {
            var strjwdd=xmlHttp.responseText;
            mycars=strjwdd.split("*"); //字符分割 
//            alert("2-"+strjwdd);
             distance2(mycars);
            }
        }
    var url="Read_Data.aspx?id=7&route7="+xl+"&sxx="+sxx.options[sxx.selectedIndex].value+"&zdxh="+xh_singel+"&wlzdbh="+wlzdbh+"&zdxh_double="+zdxh_double;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}



 function station_road_info()
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
          addMarker(mycars2);
          }
        }
    }
    var url="Read_Data.aspx?id=10&route10="+document.getElementById("TextBox1").value;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
 }
 
 function addMarker(mycars3)
 {
     var icon;
      icon = new BMap.Icon("images/sta2.png", new BMap.Size(20,20));
    var point2 = new BMap.Point(mycars3[1],mycars3[2]);
    var marker = new BMap.Marker(point2,{icon:icon});
    map.addOverlay(marker);
  
    marker.addEventListener("onmouseover",function(){
    document.getElementById("zdmc").value=mycars3[0];
    mohu(mycars3[0]);});
} 

function RemoveAllOption(drp)       //清除DropDownList的所有项
    {
        var i = 0;
        for(i = drp.length; i >= 0; i--)
        {
           drp.options.remove(i);
        }
    }

function mohu(myc)
{
   var dt=document.getElementById("DropDownList2");
   RemoveAllOption(dt);
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
            var newOption = document.createElement("OPTION");
            newOption.text = mycars2[1];
            newOption.value = mycars2[0];
            dt.options.add(newOption);
          }
        }
    }
    var url="Read_Data.aspx?id=11&route11="+document.getElementById("TextBox1").value+"&staname="+myc;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}


function distance2(mycars)
{
var dis=0;
var p1;
var p2;
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
     pointB = new BMap.Point(p1,p2);
         if(j!=0)
         { 
         dis=dis+map.getDistance(pointA,pointB);
         }
    }
//var dis="站间距为:"+dis.toFixed(1)+"米";
//document.getElementById("jwd").innerHTML=dis;
writetodatabase2(dis.toFixed(1));
}


function writetodatabase2(jianju)
{
createXMLHTTP();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
        var bz=xmlHttp.responseText;
        var diss;
            if(bz=="ok")
            {
            var dsd=document.getElementById("TextBox2").value;
            dsd=parseInt(dsd)+1;
            document.getElementById("TextBox2").value=dsd;
            diss="站间距为:"+jianju+"米;";
            document.getElementById("jwd").innerHTML=diss;
            }
            else
            {
            diss="写入失败！";
            document.getElementById("jwd").innerHTML=diss;
            }
        }
    }
    var t=document.getElementById("DropDownList1");
    var xh = document.getElementById("TextBox2").value;
var url="Read_Data.aspx?id=9&route9="+document.getElementById("TextBox1").value+"&sxx="+t.options[t.selectedIndex].value+"&xh="+xh+"&jianju="+jianju;
xmlHttp.open("post",url,true);
xmlHttp.send(null);
} 




//计算路径距离
function distance(mycars)
{
var dis=0;
var  busline_dis=0;
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
             if(p3=="1")
             {
             busline_dis=busline_dis+map.getDistance(pointA,pointB);
             }
         }
    }
//var diss="线路GPS里程:"+(dis/1000).toFixed(1)+"千米;<br/>专用道里程为:"+(busline_dis/1000).toFixed(1)+"千米";
//document.getElementById("jwd").innerHTML=diss;
writetodatabase((dis/1000).toFixed(1),(busline_dis/1000).toFixed(1));
}


function writetodatabase(zlc,zydlc)
{
createXMLHTTP();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
        var strjwdd=xmlHttp.responseText;
        var diss;
            if(strjwdd=="ok")
            {
            diss="线路GPS里程:"+zlc+"千米;<br/>专用道里程为:"+zydlc+"千米;<br/写入成功！>";
            document.getElementById("jwd").innerHTML=diss;
            }
            else
            {
            diss="线路GPS里程:"+zlc+"千米;<br/>专用道里程为:"+zydlc+"千米;<br/>写入失败！";
            document.getElementById("jwd").innerHTML=diss;
            }
        }
    }
var t=document.getElementById("DropDownList1");
var url="Read_Data.aspx?id=6&route6="+document.getElementById("TextBox1").value+"&sxx="+t.options[t.selectedIndex].value+"&zlc="+zlc+"&zydlc="+zydlc;
xmlHttp.open("post",url,true);
xmlHttp.send(null);
} 


function addPolyline(mycars)
{
//    map.clearOverlays();//清楚地图覆盖物
		var points = [];
			var p1;
			var p2;
		var lansc=mycars[0].split("|")[2];
		for(var j=0;j<mycars.length;j++)
		{
			p1 = mycars[j].split("|")[0];
			p2 = mycars[j].split("|")[1];
			points.push(new BMap.Point(p1,p2));
		    if(lansc!= mycars[j].split("|")[2]||j==mycars.length-1)
		    {
		        var line;
		        var xx;
		        if(mycars[j-1].split("|")[3]==1)
		        {
		        xx=6;
		        }
		        else
		        {
		        xx=6;
		        }
		        if(lansc==1)
		        {
		        line = new BMap.Polyline(points, {strokeColor:"red", strokeWeight:xx, strokeOpacity:0, strokeStyle:"ridge"});
		        }
		        else if(lansc==2)
		        {
		        line = new BMap.Polyline(points, {strokeColor:"#0099CC", strokeWeight:xx, strokeOpacity:0, strokeStyle:"dashed "});
		        }
		        else if(lansc==3)
		        {
		        line = new BMap.Polyline(points, {strokeColor:"Fuchsia", strokeWeight:xx, strokeOpacity:0, strokeStyle:"dashed "});
		        }
		        else if(lansc>=4)
		        {
		        line = new BMap.Polyline(points, {strokeColor:"#00CC33", strokeWeight:xx, strokeOpacity:0, strokeStyle:"ridge"});
		        }
		        map.addOverlay(line);
		        points = [];
		        points.push(new BMap.Point(p1,p2));
		    }
			lansc= mycars[j].split("|")[2];
			
		}
		
		var p30 = mycars[0].split("|")[0];
		var p31 = mycars[0].split("|")[1];
		var p40 = mycars[mycars.length-1].split("|")[0];
		var p41 = mycars[mycars.length-1].split("|")[1];
		
		setTimeout(function()
		{
        map.setViewport([new BMap.Point(p30,p31),new BMap.Point(p40,p41)]);          //调整到最佳视野
        },1000);
}		 
    initMap();//创建和初始化地图
</script>
</html>