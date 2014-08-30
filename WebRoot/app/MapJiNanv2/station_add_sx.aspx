<%@ page language="C#" autoeventwireup="true" inherits="station_add, App_Web_agyah52i" %>

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
<script language="javascript" type="text/javascript">
     function keyevent(){
     if(event.keyCode==113)
     update_station_info();
     }
     document.onkeydown = keyevent;
</script>

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
                  <div id="jwd2"></div>
                   <div id="xxx">
<p>
                       <div>
                           线路：<asp:TextBox ID="xl" runat="server" Width="140px"></asp:TextBox>
                       </div>
                       <div>
                           方向：<asp:DropDownList ID="fx" runat="server" Width="140px">
                               <asp:ListItem>上行</asp:ListItem>
                               <asp:ListItem>下行</asp:ListItem>
                           </asp:DropDownList></div>
                           <br />
                       </div>
                       <div>
                           <input onclick="showCustomer();" type="button" value="查看" /><input onclick="all_station_info();" type="button" value="加载站点" /></div>
                       <div>
                           单程序号：<asp:TextBox ID="xh_singel" runat="server" Width="140px">1</asp:TextBox>
                       </div>
                                              <div>
                           双程序号：<asp:TextBox ID="xh_double" runat="server" Width="140px">1</asp:TextBox>
                       </div>
                                                                     <div>
                           站点编号：<asp:TextBox ID="wlzdbh" runat="server" Width="140px"></asp:TextBox>
                       </div>
                       <div>
                           站点名称：<asp:TextBox ID="zd_name" runat="server" ></asp:TextBox>
                           </div>
                       <div>
                           站点经度：<asp:TextBox ID="bdjd" runat="server" Width="140px"></asp:TextBox>
                       </div>
                       <div>
                           站点纬度：<asp:TextBox ID="bdwd" runat="server" Width="140px"></asp:TextBox>
                       </div>
                       <div>
                           google经度：<asp:TextBox ID="ggjd" runat="server" Width="140px"></asp:TextBox>
                       </div>
                       <div>
                           google纬度：<asp:TextBox ID="ggwd" runat="server" Width="140px"></asp:TextBox>
                       </div>
                         <div>
                           所经线路：<asp:TextBox ID="sjcc" runat="server" Width="140px"></asp:TextBox>
                       </div>
<%--                       <div>标记点1：<asp:TextBox ID="disjwd1" ReadOnly="true" runat="server"></asp:TextBox>
                           </div>--%>
                       <div>
                           站台形式：
                           <asp:DropDownList ID="ztxs" runat="server">
                               <asp:ListItem Value="0">国标</asp:ListItem>
                               <asp:ListItem Value="1">非港湾</asp:ListItem>
                               <asp:ListItem Value="2">港湾</asp:ListItem>
                           </asp:DropDownList>
                           </div>
                       <div>站台长度：<asp:TextBox ID="ztcd"  runat="server" Text="0"></asp:TextBox>
                           </div>
                       <div>站台宽度：<asp:TextBox ID="ztkd"  runat="server" Text="0"></asp:TextBox>
                           </div>
                        <div>广告位数：<asp:TextBox ID="ggw"  runat="server" Text="0"></asp:TextBox>
                           </div>
                       <p>
                       <input type="button" value="修改" onclick="update_station_info();" />  
                       </p>
<%--                       <p><input type="button" value="计算站间距" onclick="computer_dis_station();" /></p>
                       <p><input type="button" value="站点删除" onclick="delete_station();" /></p>--%>
                       
                       <div id="info"></div>
                       <div id="info2"></div>
                       <div id="info3"></div>
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
  //查询线路  
function showCustomer()
{
document.getElementById("info3").innerHTML="";
createXMLHTTP();
       var mycars = new Array();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
        var strjwdd=xmlHttp.responseText;
         mycars=strjwdd.split("*"); //字符分割 
         document.getElementById("xh_singel").value=1;
         addPolyline(mycars);//向地图中添   
//         setTimeout("station_road_info();",2000);

        }
    }
var t=document.getElementById("fx");
var url="Read_Data.aspx?id=2&route="+document.getElementById("xl").value+"&sxx="+t.options[t.selectedIndex].value;
xmlHttp.open("post",url,true);
xmlHttp.send(null);
}  



function all_station_info()
 {
     var sxx=document.getElementById("fx");
 var xl=document.getElementById("xl").value;
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
          addMarker3(mycars2,mycars.length);
          }
        }
    }
    var url="Read_Data.aspx?id=31&route7="+xl+"&sxx="+sxx.options[sxx.selectedIndex].value;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
 }
 
 
   function addMarker3(mycars3,lenn)
 {
 var marker;
 var icon = new BMap.Icon("images/busstop.jpg", new BMap.Size(13,13));
    var point2 = new BMap.Point(mycars3[2],mycars3[3]);
  if(mycars3[9]==99)
 {
    marker = new BMap.Marker(point2);
 }
 else
 {

 marker = new BMap.Marker(point2,{icon:icon});
 }
    map.addOverlay(marker);
    marker.addEventListener("onclick",function(){
        document.getElementById("xh_singel").value=mycars3[0];
    document.getElementById("xh_double").value=mycars3[8];
    document.getElementById("wlzdbh").value=mycars3[7];
    document.getElementById("zd_name").value=mycars3[1];
    document.getElementById("bdjd").value=mycars3[2];
    document.getElementById("bdwd").value=mycars3[3];
    document.getElementById("ggjd").value=mycars3[4];
    document.getElementById("ggwd").value=mycars3[5];
    document.getElementById("sjcc").value=mycars3[10];
     document.getElementById("info").innerHTML="";
     document.getElementById("info").style.backgroundColor="white";
     document.getElementById("ztcd").focus();
	 });  
	 

      var opts = {
           position : point2,    // 指定文本标注所在的地理位置
  offset   : new BMap.Size(0, -35)    //设置文本偏移量
        }
         var infocontent=mycars3[1]+"("+mycars3[6]+")";
        var label = new BMap.Label(infocontent, opts);  // 创建文本标注对象
	     label.setStyle({
		 color : "red",
		 fontSize : "12px",
		 height : "20px",
		 lineHeight : "20px",
		 fontFamily:"微软雅黑"
	 });
    map.addOverlay(label); 
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
var wlzdbh=document.getElementById("wlzdbh").value;
var ztcd=document.getElementById("ztcd").value;
    var ztkd=document.getElementById("ztkd").value;
    var ggw=document.getElementById("ggw").value;
    var tt=document.getElementById("ztxs");
    var ztxs=tt.options[tt.selectedIndex].value;

        createXMLHTTP();
        xmlHttp.onreadystatechange=function()
        {
          if (xmlHttp.readyState==4 && xmlHttp.status==200)
            {
            var strjwdd=xmlHttp.responseText;
            if(strjwdd==2)
            {
            document.getElementById("info").innerHTML="修改（station_info）信息成功";
            document.getElementById("info").style.backgroundColor="green";
            document.getElementById("ztcd").value="0";
            document.getElementById("ztkd").value="0";
            document.getElementById("ggw").value="0";
            }
            else
            {
            document.getElementById("info").innerHTML="修改（station_info）信息失败";
            document.getElementById("info").style.backgroundColor="red";
            document.getElementById("info").style.font.fontColor="white"
            }
//            setTimeout("auto();",1000);
            }
        }
        //修改站点信息station_info,修改经纬度信息
    var url="Read_Data.aspx?id=32&zd_id="+wlzdbh+"&ztcd="+ztcd+"&ztkd="+ztkd+"&ggw="+ggw+"&ztxs="+ztxs;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}




//查询按钮查询线路和站点数据
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
    var url="Read_Data.aspx?id=10&route10="+document.getElementById("xl").value;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
 }




function addPolyline(mycars)
{
    map.clearOverlays();//清楚地图覆盖物
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
		        xx=4;
		        }
		        else
		        {
		        xx=4;
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