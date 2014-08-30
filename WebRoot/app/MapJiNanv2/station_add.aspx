<%@ page language="C#" autoeventwireup="true" inherits="station_add, App_Web_qnz2vcqa" %>

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
                           <div><input onclick="getbus();" type="button" value="加载网络线路" /></div>
                           <br />
                       </div>
                       <div>
                           <input onclick="showCustomer();" type="button" value="查看" /><input onclick="all_station_info();" type="button" value="加载所有站点" />
                           <p><input type="button" value="查询站点" onclick="secachzd();" /></p>
                           </div>
                           
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
                           <br />
                           站点位置：
                           <asp:DropDownList ID="zd_pos" runat="server">
                               <asp:ListItem Value="E">→</asp:ListItem>
                               <asp:ListItem Value="S">↓</asp:ListItem>
                               <asp:ListItem Value="W">←</asp:ListItem>
                               <asp:ListItem Value="N">↑</asp:ListItem>
                           </asp:DropDownList>
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
<%--                       <div>标记点1：<asp:TextBox ID="disjwd1" ReadOnly="true" runat="server"></asp:TextBox>
                           </div>--%>
                       <div>标记点：<asp:TextBox ID="bjd" ReadOnly="true"  runat="server"></asp:TextBox>
                           </div>
                           
                       <p>
                       <input type="button" value="站点添加" onclick="update_station_info();" />  
                       <%--非原站点:<input type="checkbox" id="cc" />--%>
                       </p>
                       <p><input type="button" value="计算站间距" onclick="computer_dis_station();" /></p>
                       <p><input type="button" value="站点删除" onclick="delete_station();" /></p>
                       
                       <div id="info"></div>
                       <div id="info2"></div>
                       <div id="info3"></div>
                       <div>
                           <asp:ScriptManager ID="ScriptManager1" runat="server">
                           </asp:ScriptManager>
                           <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                               <ContentTemplate>
                                   <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False">
                                       <Columns>
                                           <asp:BoundField DataField="station_name" HeaderText="名称" />
                                           <asp:BoundField DataField="station_id" HeaderText="序号" />
                                           <asp:BoundField DataField="station_id_double" HeaderText="序号双" />
                                       </Columns>
                                   </asp:GridView>
                               </ContentTemplate>
                           </asp:UpdatePanel>
                              </div>
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
map.clearOverlays();//清楚地图覆盖物
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
         setTimeout("station_road_info();",2000);

        }
    }
var t=document.getElementById("fx");
var url="Read_Data.aspx?id=2&route="+document.getElementById("xl").value+"&sxx="+t.options[t.selectedIndex].value;
xmlHttp.open("post",url,true);
xmlHttp.send(null);
}  

function delete_station()
{
createXMLHTTP();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
        var strjwdd=xmlHttp.responseText;
        if(strjwdd==2)
        {
        alert("删除成功");
            var dsd2=document.getElementById("xh_double").value;
            dsd2=parseInt(dsd2)-1;
            document.getElementById("xh_double").value=dsd2;
            document.getElementById("bjd").value="";
        }
        else
        {
        alert("删除失败");
        }
        }
    }
var t=document.getElementById("fx");
var url="Read_Data.aspx?id=16&route="+document.getElementById("xl").value+"&sxx="+t.options[t.selectedIndex].value+"&idd="+document.getElementById("xh_singel").value;
xmlHttp.open("post",url,true);
xmlHttp.send(null);
}


function getbus()
{
var busline = new BMap.BusLineSearch(map,{
    renderOptions:{map:map,panel:"info"},
        onGetBusListComplete: function(result){
           if(result) {
             var fstLine = result.getBusListItem(0);//获取第一个公交列表显示到map上
             busline.getBusLine(fstLine);
           }
        }
});
var t=document.getElementById("xl").value;
function busSearch(){
    var busName = t;
    busline.getBusList(busName);
}

setTimeout(function(){
    busSearch();
},1500);
}

function all_station_info()
 {
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
    var url="Read_Data.aspx?id=20&route7="+xl;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
 }
 
 
 function secachzd()
  {
 var xl=document.getElementById("zd_name").value;
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
    var url="Read_Data.aspx?id=46&zd_name="+xl;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
 }
 
   function addMarker3(mycars3,lenn)
 {
     var icon = new BMap.Icon("images/busstop.jpg", new BMap.Size(13,13));
    var point2 = new BMap.Point(mycars3[2],mycars3[3]);
    var marker = new BMap.Marker(point2,{icon:icon});
    map.addOverlay(marker);
    marker.addEventListener("mouseover",function(){
    document.getElementById("wlzdbh").value=mycars3[0];
    document.getElementById("zd_name").value=mycars3[1];
    document.getElementById("bdjd").value=mycars3[2];
    document.getElementById("bdwd").value=mycars3[3];
    document.getElementById("ggjd").value=mycars3[4];
    document.getElementById("ggwd").value=mycars3[5];
    searchnear(mycars3[2],mycars3[3]);
	 });  
    	  marker.addEventListener("mouseover",function(){
      var opts = {
           position : point2,    // 指定文本标注所在的地理位置
  offset   : new BMap.Size(0, -35)    //设置文本偏移量
        }
         var infocontent=mycars3[6];
        var label = new BMap.Label(infocontent, opts);  // 创建文本标注对象
	     label.setStyle({
		 color : "red",
		 fontSize : "12px",
		 height : "20px",
		 lineHeight : "20px",
		 fontFamily:"微软雅黑"
	 });
    map.addOverlay(label); 
    });
}

//将站点信息添加到route_station
function insert_route_station2(xl,sxx,xh_sigel,xh_double,phy_station_id,road_id)
{
    var sxx=document.getElementById("DropDownList1");
    var xl=document.getElementById("TextBox1").value;
    var xh_singel = document.getElementById("TextBox2").value;
        createXMLHTTP();
         var mycars = new Array();
        xmlHttp.onreadystatechange=function()
        {
          if (xmlHttp.readyState==4 && xmlHttp.status==200)
            {
            var strjwdd=xmlHttp.responseText;
            if(strjwdd==2)
            {
            document.getElementById("info2").innerHTML="插入站点信息（station_info）成功";
            document.getElementById("info2").style.backgroundColor="green";
            var dsd=document.getElementById("TextBox2").value;
            dsd=parseInt(dsd)+1;
            document.getElementById("TextBox2").value=dsd;
            document.getElementById("disjwd2").value="";
            }
            else
            {
            document.getElementById("info2").innerHTML="插入站点信息（station_info）失败";
            document.getElementById("info2").style.backgroundColor="red";
            document.getElementById("info2").style.font.fontColor="white"
            }
            }
        }
//    var url="Read_Data.aspx?id=17&route7="+xl+"&sxx="+sxx.options[sxx.selectedIndex].value+"&zdxh="+xh_singel+"&wlzdbh="+wlzdbh+"&zdxh_double="+zdxh_double+"&bjd2="+bjd2;
    var url="Read_Data.aspx?id=17&route7="+xl+"&sxx="+sxx.options[sxx.selectedIndex].value+"&zdxh="+xh_singel+"&wlzdbh="+wlzdbh+"&zdxh_double="+zdxh_double+"&bjd2="+bjd2;
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
function auto()
{
var bjd=document.getElementById("bjd").value;
    var sxx2=document.getElementById("fx");
    var sxx=sxx2.options[sxx2.selectedIndex].value;
    var xl=document.getElementById("xl").value;
    var xh_singel = document.getElementById("xh_singel").value;
    var xh_double = document.getElementById("xh_double").value;
    var wlzdbh = document.getElementById("wlzdbh").value;
insert_route_station(xl,sxx,xh_singel,xh_double,wlzdbh,bjd);
}



//将站点信息添加到route_station
function insert_route_station(xl,sxx,xh_singel,xh_double,wlzdbh,bjd)
{
        createXMLHTTP();
         var mycars = new Array();
        xmlHttp.onreadystatechange=function()
        {
          if (xmlHttp.readyState==4 && xmlHttp.status==200)
            {
            var strjwdd=xmlHttp.responseText;
            if(strjwdd==2)
            {
            document.getElementById("info2").innerHTML="插入站点信息（route_station）成功";
            document.getElementById("info2").style.backgroundColor="green";
            var dsd=document.getElementById("xh_singel").value;
            dsd=parseInt(dsd)+1;
            var dsd2=document.getElementById("xh_double").value;
            dsd2=parseInt(dsd2)+1;
             document.getElementById("xh_singel").value=dsd;
            document.getElementById("xh_double").value=dsd2;
            document.getElementById("bjd").value="";
            }
            else
            {
            document.getElementById("info2").innerHTML="插入站点信息（route_station）失败";
            document.getElementById("info2").style.backgroundColor="red";
            document.getElementById("info2").style.font.fontColor="white"
            }
            }
        }
    var url="Read_Data.aspx?id=24&route7="+xl+"&sxx="+sxx+"&xh_singel="+xh_singel+"&xh_double="+xh_double+"&wlzdbh="+wlzdbh+"&bjd="+bjd;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}


function update_station_info()
{
var wlzdbh=document.getElementById("wlzdbh").value;
var zd_name=document.getElementById("zd_name").value;
    var bdjd=document.getElementById("bdjd").value;
    var bdwd=document.getElementById("bdwd").value;
    var ggjd=document.getElementById("ggjd").value;
    var ggwd=document.getElementById("ggwd").value;
    var tt=document.getElementById("zd_pos");
    var zd_pos=tt.options[tt.selectedIndex].value;

        createXMLHTTP();
        xmlHttp.onreadystatechange=function()
        {
          if (xmlHttp.readyState==4 && xmlHttp.status==200)
            {
            var strjwdd=xmlHttp.responseText;
            if(strjwdd==2)
            {
            document.getElementById("info").innerHTML="插入（station_info）信息成功";
            document.getElementById("info").style.backgroundColor="green";
            }
            else
            {
            document.getElementById("info").innerHTML="插入（station_info）信息失败";
            document.getElementById("info").style.backgroundColor="red";
            document.getElementById("info").style.font.fontColor="white"
            }
            setTimeout("auto();",1000);
            }
        }
        //修改站点信息station_info,修改经纬度信息
    var url="Read_Data.aspx?id=23&zd_id="+wlzdbh+"&zd_pos="+zd_pos+"&bdjd="+bdjd+"&bdwd="+bdwd+"&ggjd="+ggjd+"&ggwd="+ggwd+"&zd_name="+zd_name;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}

function searchnear(lng,lat)
{
  document.getElementById("info2").innerHTML="";
            document.getElementById("info2").style.backgroundColor="white";
            document.getElementById("info").innerHTML="";
            document.getElementById("info").style.backgroundColor="white";
    var sxx=document.getElementById("fx");
    var xl=document.getElementById("xl").value;
        createXMLHTTP();
         var mycars = new Array();
        xmlHttp.onreadystatechange=function()
        {
          if (xmlHttp.readyState==4 && xmlHttp.status==200)
            {
            var strjwdd=xmlHttp.responseText;
            mycars=strjwdd.split("|"); //字符分割 
//            var pointB = new BMap.Point(mycars[3],mycars[4]); 
            var pointB = new BMap.Point(mycars[3],mycars[4]); 
            var marker = new BMap.Marker(pointB);
            map.addOverlay(marker);
            marker.enableDragging();    //可拖拽
            marker.addEventListener("dragend",function(e){
           document.getElementById("bdjd").value=e.point.lng;
           document.getElementById("bdwd").value=e.point.lat;
            searchnear(e.point.lng,e.point.lat)
 
            });
            
            //id,road,detai_id
           document.getElementById("bjd").value=mycars[0]+","+mycars[1]+","+mycars[2];
//            document.getElementById("disjwd2").value=mycars[0]+","+mycars[1]+","+mycars[2];
            }
        }
    var url="Read_Data.aspx?id=22&route7="+xl+"&sxx="+sxx.options[sxx.selectedIndex].value+"&lng="+lng+"&lat="+lat;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);

}

//将站点信息添加到route_station
function computer_dis(wlzdbh,zdxh_double,bdj1,bjd2)
{
    var sxx=document.getElementById("DropDownList1");
    var xl=document.getElementById("TextBox1").value;
    var xh_singel = document.getElementById("TextBox2").value;
        createXMLHTTP();
         var mycars = new Array();
        xmlHttp.onreadystatechange=function()
        {
          if (xmlHttp.readyState==4 && xmlHttp.status==200)
            {
            var strjwdd=xmlHttp.responseText;
            mycars=strjwdd.split("*"); //字符分割  
            distance2(mycars);
            }
        }
        if(document.getElementById("TextBox2").value==1)
        {
        bdj1=bjd2;
        }
    var url="Read_Data.aspx?id=7&route7="+xl+"&sxx="+sxx.options[sxx.selectedIndex].value+"&zdxh="+xh_singel+"&wlzdbh="+wlzdbh+"&zdxh_double="+zdxh_double+"&bjd1="+bdj1+"&bjd2="+bjd2;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}

//计算全部站间距

function computer_dis_station()
{
 var sxx=document.getElementById("fx");
var xl=document.getElementById("xl").value;
 createXMLHTTP();
         var mycars = new Array();
        xmlHttp.onreadystatechange=function()
        {
          if (xmlHttp.readyState==4 && xmlHttp.status==200)
            {
            var strjwdd=xmlHttp.responseText;
            mycars=strjwdd.split("#"); //字符分割  
            distance88(mycars[1],mycars[0]);
            }
        }
    var url="Read_Data.aspx?id=25&route7="+xl+"&sxx="+sxx.options[sxx.selectedIndex].value;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}

function distance88(sta,rout)
{
var dis=0;
var p1;
var p2;
var pointA;
var pointB;
var sta_dis="";
var sta_dis2="";
var ii=0;
var ssta= new Array();
 var station = new Array();
 var route = new Array();
 station=sta.split("*"); //字符分割 
 route=rout.split("*"); //字符分割 
    for(var j=0;j<route.length;j++)
    {
        if(j!=0)
        {
         pointA = new BMap.Point(p1,p2);
        }			
     p1 = route[j].split("|")[1];
     p2 = route[j].split("|")[2];
     pointB = new BMap.Point(p1,p2);
     if(ii<station.length)
     {
         if(station[ii].split("|")[1]==route[j].split("|")[0])
         {
         sta_dis=sta_dis+station[ii].split("|")[0]+"|"+dis.toFixed(1)+"*";
         sta_dis2=sta_dis2+station[ii].split("|")[0]+"*"+dis.toFixed(1)+"<br/>"
         document.getElementById("info3").innerHTML=sta_dis2;
         dis=0;
         ii++;
         }
         else
         {
             if(j!=0)
             { 
             var distan=map.getDistance(pointA,pointB);
             if(isNaN(distan))
             {
             distan=0;
             }
             dis=dis+distan;
             }
         }
     }
    }
    

writetodatabase5(sta_dis);
}

function writetodatabase5(jianju)
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
            alert("计算完毕！ok");

            }
            else
            {
            alert("计算完毕！wrong");
            }
        }
    }
    var t=document.getElementById("fx");
//    var xh = document.getElementById("TextBox2").value;
var url="Read_Data.aspx?id=19&route9="+document.getElementById("xl").value+"&sxx="+t.options[t.selectedIndex].value+"&jianju="+jianju;
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
 //添加原始站点数据
 function addMarker(mycars3)
 {
     var icon;
      icon = new BMap.Icon("images/sta1.png", new BMap.Size(20,20));
    var point2 = new BMap.Point(mycars3[1],mycars3[2]);
    var marker = new BMap.Marker(point2,{icon:icon});
    map.addOverlay(marker);

    marker.addEventListener("click",function(){
    document.getElementById("zd_name").value=mycars3[0];
    document.getElementById("bdjd").value=mycars3[1];
    document.getElementById("bdwd").value=mycars3[2];
    document.getElementById("ggjd").value=mycars3[3];
    document.getElementById("ggwd").value=mycars3[4];
    searchwlzdbh(mycars3);
    
    });
} 

function searchwlzdbh(mycars3)
{
createXMLHTTP();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
        var strjwdd=xmlHttp.responseText;
        document.getElementById("wlzdbh").value=strjwdd;
            searchnear(mycars3[1],mycars3[2]);
          }
        }
    var url="Read_Data.aspx?id=21";
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
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
   var tstation=document.getElementById("DropDownList1");
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
//         if(document.getElementById("cb").checked)
//        {
//           var t=document.getElementById("DropDownList2");
//           t.selectedIndex=1;

//        }
        searchnear(myc[1],myc[2]);
        }
//        searchnear(myc[1],myc[2]);
    }
    var url="Read_Data.aspx?id=11&route11="+document.getElementById("TextBox1").value+"&staname="+myc[0]+"&sxx="+tstation.options[tstation.selectedIndex].value;
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
var icon = new BMap.Icon('images/icon.png', new BMap.Size(20, 32), {
anchor: new BMap.Size(10, 30)
});
                var marker = new BMap.Marker(pointB,{icon:icon});
                map.addOverlay(marker);
//var dis="站间距为:"+dis.toFixed(1)+"米";
document.getElementById("jwd2").innerHTML="站间距为:"+dis+"米";;
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
             document.getElementById("disjwd1").value=document.getElementById("disjwd2").value;
             document.getElementById("disjwd2").value="";
            alert(diss);

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
		
//		var p30 = mycars[0].split("|")[0];
//		var p31 = mycars[0].split("|")[1];
//		var p40 = mycars[mycars.length-1].split("|")[0];
//		var p41 = mycars[mycars.length-1].split("|")[1];
//		
//		setTimeout(function()
//		{
//        map.setViewport([new BMap.Point(p30,p31),new BMap.Point(p40,p41)]);          //调整到最佳视野
//        },1000);
}		 
    initMap();//创建和初始化地图
</script>
</html>