<%@ page language="C#" autoeventwireup="true" inherits="road_combination, App_Web_agyah52i" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<title>公交线路组合</title>


<script language="javascript" type="text/javascript">
     function keyevent(){
     if(event.keyCode==113)
     update_road();
     }
     document.onkeydown = keyevent;
</script>

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
<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.4"></script>
</head>

<body>
    <form id="form1" runat="server">
  <!--百度地图容器-->
              <asp:ScriptManager ID="ScriptManager1" runat="server">
            </asp:ScriptManager>
  <div style="height:90%">
      <table align="center" rules="all" class="style1">
          <tr>
              <td style="width:25%; vertical-align:top">
              <div style="overflow:scroll ; height:800px">
                  <div id="jwd"></div>
                  <div></div>
                   <div id="xxx">

            <p>
                名称：<asp:TextBox ID="routename" runat="server" Width="140px"></asp:TextBox>

                </p>
                <p>道路方向：<asp:DropDownList ID="dlfx" runat="server">
                               <asp:ListItem Value="E">→</asp:ListItem>
                               <asp:ListItem Value="S">↓</asp:ListItem>
                               <asp:ListItem Value="W">←</asp:ListItem>
                               <asp:ListItem Value="N">↑</asp:ListItem>
                           </asp:DropDownList>   <input onclick="showCustomer();" type="button" value="搜索" /></p>
      
                               <p>
                                   &nbsp;</p>

                               <div>**********组合道路**************</div>
                             
                               <div>
                                   &nbsp;<div>
                                       <div>
                                           组合名称：<asp:TextBox ID="zh_roadname" runat="server" Width="140px"></asp:TextBox>

                                       </div>
                                                                              <div>
                                           路段master：<asp:TextBox ID="luduanmaster" runat="server" Width="140px"></asp:TextBox>

                                       </div>
                                                                                                                     <div>
                                           路段名称：<asp:TextBox ID="luduanname" runat="server" Width="140px"></asp:TextBox>

                                       </div>
                                       <div>
                               序号：<%--<asp:TextBox ID="xh" runat="server" Width="140px">1</asp:TextBox>--%>
                               <input type="text" id="xh" value="1" />
                                       </div>
                                       <div>组合方向：<asp:DropDownList ID="DropDownList1" runat="server">
                               <asp:ListItem Value="E">→</asp:ListItem>
                               <asp:ListItem Value="S">↓</asp:ListItem>
                               <asp:ListItem Value="W">←</asp:ListItem>
                               <asp:ListItem Value="N">↑</asp:ListItem>
                           </asp:DropDownList> </div>
                                       <div><p><input onclick="update_road();" type="button" value="添加" /></p></div>
                                       <div><p><input onclick="del();" type="button" value="删除" /></p></div>
                                       <div id="xg"></div>
                                       <div>
                                       </div>
                                   </div>
                               </div>
    </div></div></td>
              <td style="width:80%">
                    <div style="width:100%;height:800px;border:#ccc solid 1px;" id="dituContent"></div></td>
          </tr>
      </table>
    </div>
<div id="info"></div>
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

    var marker;
        function creatmarker(point)
        {
         marker=new BMap.Marker(point)
        map.addOverlay(marker);
        document.getElementById("bdwdtext").value=point.lng+";"+point.lat;
        marker.addEventListener("rightclick", function(){document.getElementById("bdwdtext").value=""; document.getElementById("bdjdtext").value=point.lng+";"+point.lat;});
        }

//        function showInfo(e){
//         createXMLHTTP();
//            xmlHttp.onreadystatechange=function(){
//              if (xmlHttp.readyState==4 && xmlHttp.status==200)
//                {
//                var strjwdd=xmlHttp.responseText;
//                 mycars=strjwdd.split("|"); //字符分割 
//                var pt = new BMap.Point(mycars[0], mycars[1]);
//                document.getElementById("dlxh").value=mycars[3];
//                creatmarker(pt);
//                }
//                }
//                    var dropDownListt=document.getElementById("DropDownList1");
//                    var zzzz=dropDownListt.options[dropDownListt.selectedIndex].value;
//                    var route=document.getElementById("TextBox1").value;
////                    var road_id=document.getElementById("dlxh").value;
//                var url="ReadGPS2.aspx?id=0&lng="+e.point.lng+"&lat="+e.point.lat+"&route="+route+"&fx="+zzzz;
//                xmlHttp.open("post",url,true);
//                xmlHttp.send(null);
//        }
//        map.addEventListener("click", showInfo);
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
    
    
    function update_road()
    {
        var zh_road_name=document.getElementById("zh_roadname").value;
        var road_master_id=document.getElementById("luduanmaster").value;
            var t=document.getElementById("DropDownList1");
    var fx=t.options[t.selectedIndex].value;
        var idd=document.getElementById("xh").value;
        createXMLHTTP();
        xmlHttp.onreadystatechange=function()
        {
          if (xmlHttp.readyState==4 && xmlHttp.status==200)
            {
            var strjwddd=xmlHttp.responseText;
            var mycars99=new Array();
             mycars99=strjwddd.split("|"); //字符分割 
            if(mycars99[0]==2)
            {
            document.getElementById("xg").innerHTML="插入成功!";
            document.getElementById("xg").style.backgroundColor="green";
            document.getElementById("xg").style.color="white";
            
            document.getElementById("xh").value=mycars99[1];
            showcus();
            }
            else
            {
            document.getElementById("xg").innerHTML="插入失败!";
            document.getElementById("xg").style.color="white";
            
            document.getElementById("xg").style.backgroundColor="red";
            }
            }
        }
            var url="ReadGPS.aspx?id=45&zhroad="+zh_road_name+"&fx="+fx+"&idd="+idd+"&road_master="+road_master_id;
            xmlHttp.open("post",url,true);
            xmlHttp.send(null);
    }
    
    
function showCustomer()
{
         map.clearOverlays();//清楚地图覆盖物
    var t=document.getElementById("dlfx");
    var fx=t.options[t.selectedIndex].value;
    var rou=document.getElementById("routename").value;
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
             addPolyline_route_mul(mycars66);
//             setTimeout("showcus();",500);
             }
        }
    }
    var url="Read_Data.aspx?id=34&road_name="+rou+"&fx="+fx;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}  

function showcus()
{
//    var t=document.getElementById("dlfx");
//    var fx=t.options[t.selectedIndex].value;
    var rou=document.getElementById("luduanmaster").value;
createXMLHTTP();
       var mycars = new Array();
    xmlHttp.onreadystatechange=function()
    {
//    alert(xmlHttp.readyState);
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
//        alert(xmlHttp.status);
        var strjwdd=xmlHttp.responseText;
         mycars=strjwdd.split("*"); //字符分割 
//         map.clearOverlays();//清楚地图覆盖物
         addPolyline223(mycars);//向地图中添   
        }
    }
var url="Read_Data.aspx?id=37&route="+rou;
xmlHttp.open("post",url,true);
xmlHttp.send(null);
}

function addPolyline223(mycars77)
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
	    line = new BMap.Polyline(points, {strokeColor:"red", strokeWeight:5, strokeOpacity:1, strokeStyle:"ridge"}); 
	       map.addOverlay(line);
}	

 function del()
{
    var t=document.getElementById("DropDownList1");
    var fx=t.options[t.selectedIndex].value;
    var rou=document.getElementById("routename").value;
    var road_id=document.getElementById("xh").value;
    createXMLHTTP();
    xmlHttp.onreadystatechange=function()
    {
        if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
            var strjwdd=xmlHttp.responseText;
             var mycars99=new Array();
             mycars99=strjwdd.split("|"); //字符分割 
            if(mycars99[0]==2)
            {
            document.getElementById("xg").innerHTML="删除成功!";
            document.getElementById("xg").style.backgroundColor="green";
            document.getElementById("xg").style.color="white";
            document.getElementById("xh").value=mycars99[1];
            setTimeout("showCustomer();",500);
            }
            else
            {
            document.getElementById("xg").innerHTML="删除失败!";
            document.getElementById("xg").style.color="white";           
            document.getElementById("xg").style.backgroundColor="red";
            }
            }
    }
    var url="Read_Data.aspx?id=38&route="+rou+"&fx="+fx+"&road_id="+road_id;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}
 


function addPolyline_route_mul(mycars77)
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
	    line = new BMap.Polyline(points, {strokeColor:"blue", strokeWeight:6, strokeOpacity:1, strokeStyle:"ridge"}); 
	       map.addOverlay(line);
	    line.addEventListener("click",function(e){
            document.getElementById("luduanmaster").value=mycars77[1].split("|")[0];
            document.getElementById("luduanname").value=mycars77[1].split("|")[3];
            document.getElementById("xg").innerHTML="";
            document.getElementById("xg").style.backgroundColor="white";
                var marker66 = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));  // 创建标注
               map.addOverlay(marker66);
            
	        });
		
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

		 
    initMap();//创建和初始化地图
</script>
</html>