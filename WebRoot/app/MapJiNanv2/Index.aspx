<%@ page language="C#" autoeventwireup="true" inherits="Default_2, App_Web_agyah52i" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>济南公交线路站点地理信息系统</title>
<style type="text/css">
/*圆角边框css 可调整大小和颜色*/
div.roundout{ width:80px;/*宽*/background:red;/*背景颜色*/ text-align:center;}
b.rtop, b.rbottom{display:block;background: #fff;}
b.rtop b, b.rbottom b{display:block;height: 1px;
    overflow: hidden; background: red;/*背景颜色*/border:solid 1px black;/*线条颜色*/border-top:none;border-bottom:none;}
b.r1{margin: 0 4px;}
b.r2{margin: 0 3px}
b.r3{margin: 0 2px}
b.rtop b.r4, b.rbottom b.r4{margin: 0 1px;height: 2px}
b.rtop b.r1,b.rbottom b.r1{background:black;/*线条颜色*/}
div.roundin{margin:0px 0px;height:10px; color:White; line-height:10px;/*高*/border:solid 1px black;/*线条颜色*/border-top:none;border-bottom:none;}
/*圆角边框css end*/
</style>


<style type="text/css">
    body,h2{margin:0;padding:0;font:12px/1.5 Tahoma;}
    #win{position:absolute;top:50%;left:50%;width:700px;height:250px;background:#fff;border:4px solid #3CD2F7;margin:-102px 0 0 -202px;display:none;}
    h2{font-size:12px;height:18px;text-align:right;background:url(images/tab_bg2.gif);padding:5px;cursor:move;}
    h2 span{color:#fff;cursor:pointer;background:#cc3352;border:1px solid #fff;padding:0 2px;}


    #Mdown{margin: 0;padding: 0;text-align: center;font: normal 14px/180% Tahoma,sans-serif;}
    #loginBox{position:absolute;  padding: 0px;text-align: left;width: 90%;height: 250px;background: #EAEEFF;font-size: 9pt;border: 1px solid #829AFF;}
    #loginBox .title{text-align: left;padding-left: 10px;font-size: 11pt;border-bottom: 1px solid #829AFF;height: 25px;line-height: 25px;cursor: move;}
    #loginBox .t1{float: left;font-weight: bold;color: #AA7B7B;text-decoration: none;}
    #loginBox .t2{float: right;text-align: center;line-height: 18px;height: 18px;width: 18px;margin-top: 3px;margin-right: 2px;overflow: hidden;border: 1px solid #FF5889;background: #FFE0E9;cursor: pointer;}
</style>

<style type="text/css">
    html,body {margin:0; height:100%;width:100%;overflow:hidden; }
    .main {width:100%;height:90%;text-align:left; background-image:images/menu_bg.jpg;
    background-repeat:repeat;}
    .main_left {width:230px;background:#F1F1F1;}
    .main_right {
	    height:97%;
	    background-color: #CCC;
	    line-height:100px;
    }
    .iw_poi_title {color:#CC5522;font-size:14px;font-weight:bold;overflow:hidden;padding-right:13px;white-space:nowrap}
        .iw_poi_content {font:12px arial,sans-serif;overflow:visible;padding-top:4px;white-space:-moz-pre-wrap;word-wrap:break-word}
    .picBox {
     width:4px;
     background:#3CD2F7 url(images/right.gif) no-repeat center center;
    }
    .main_left,.picBox {float:left;height:100%; _margin-right:-3px; font-size:large;}
    .style3
    {
    vertical-align:middle;
    width: 100%;
    height: 25px;
    text-align:right;
    margin: 0px auto;
    border:1px solid #BBE1F1;
    background-color: #EEFAFF;
    }
    .style4{
    width: 100%;
     font-style:normal;
     font:15px arial,sans_serif;overflow:visible;
    margin-left:10px;
    }
       
    .style5
    {
        width: 100%;
        border: 1px solid #33CCFF;
        width:90%;
        text-align:center;
        vertical-align:middle;
        font-size:14px;
        
    }

    .nTab{
    float: left;
    width: 100%;
    margin: 0 auto;
    border-bottom:1px #C7C7CD solid;
    background:#d5d5d5;
    background-position:left;
    background-repeat:repeat-y;
    margin-bottom:2px;
    }
    .nTab .TabTitle{
    clear: both;
    height: 26px;
    overflow: hidden;
    }
    .nTab .TabTitle ul{
    margin:0;
    padding:0;
    }
    .nTab .TabTitle li{
    float: left;
    width: 60px;
    cursor: pointer;
    padding-top: 6px;
    padding-right: 0px;
    padding-left: 0px;
    padding-bottom: 7px;
    list-style-type: none;
    }
    .nTab .TabTitle .active{ background:url(images/tab_bg2.gif)  left -25px no-repeat;border-left:1px  #C7C7CD solid;border-top:1px  #C7C7CD solid;border-bottom:1px #fff solid;}
    .nTab .TabTitle .normal{ background:url(images/tab_bg1.gif);border-top:1px #C7C7CD solid;border-bottom:1px #C7C7CD solid;}
    .nTab .TabContent{
    width:auto;background:#fff;
    margin: 0px auto;
    padding:10px 0 0 0;
    border-right:1px #C7C7CD solid;border-left:1px #C7C7CD solid;
    text-align:left;
    }
    .none {display:none;}




    .pnlSuggest
    {
     border:1px dashed #7f9db9;border-top:0;background-color:#fff;
      z-index: 9527;
     position: absolute;
     overflow: hidden;
    }

    .pnlSuggest table
    {
     width: 100%;font-size:12px;
    }

    .pnlSuggest tr
    {
     width: 100%;font-size:12px;
    }


    .trmouseover
    {
        width: 100%;
     background-color: #edf2fb;
    }

    .trmouseover td
    {
        width: 100%;
     text-align: left;
     overflow: hidden;
     background-color: #edf2fb;
    }

    .trmouseout
    {
        width: 100%;
     background-color: #FFFFFF;
    }

    .trmouseout td
    {
        width: 100%;
     text-align: left;
     overflow: hidden;
     background-color: #FFFFFF;
    }

    .ddlDataSource
    {
        display: none;
    }

</style>

<script type="text/javascript" language="JavaScript" src="js/SelectHitEdit.js"></script>
<script type="text/javascript" language="javascript">
	var liststr;
	var strsplit = "," ;
	var lists="";
	var xmlHttp;
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
	
createXMLHTTP();
xmlHttp.onreadystatechange=function(){
  if (xmlHttp.readyState==4 && xmlHttp.status==200)
    {
    liststr=xmlHttp.responseText;
	lists=liststr.split(strsplit);

    }
    }
    var url="Read_Data.aspx?id=1";
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
</script>

<script src="js/admin.js" type="text/javascript"></script>
<script src="http://api.map.baidu.com/api?v=1.3" type="text/javascript"></script>



<script type="text/javascript">
window.onload = function ()
{
	var oWin = document.getElementById("win");
//	var oLay = document.getElementById("overlay");	
//	var oBtn = document.getElementsByTagName("button")[0];
	var oBtn=document.getElementById("Button1");
	var oClose = document.getElementById("close");
	var oH2 = oWin.getElementsByTagName("h2")[0];
	var bDrag = false;
	var disX = disY = 0;
	oBtn.onclick = function ()
	{
//		oLay.style.display = "block";
		oWin.style.display = "block"	
	};
	oClose.onclick = function ()
	{
//		oLay.style.display = "none";
		oWin.style.display = "none"
		
	};
	oClose.onmousedown = function (event)
	{
		(event || window.event).cancelBubble = true;
	};
	oH2.onmousedown = function (event)
	{		
		var event = event || window.event;
		bDrag = true;
		disX = event.clientX - oWin.offsetLeft;
		disY = event.clientY - oWin.offsetTop;		
		this.setCapture && this.setCapture();		
		return false
	};
	document.onmousemove = function (event)
	{
		if (!bDrag) return;
		var event = event || window.event;
		var iL = event.clientX - disX;
		var iT = event.clientY - disY;
		var maxL = document.documentElement.clientWidth - oWin.offsetWidth;
		var maxT = document.documentElement.clientHeight - oWin.offsetHeight;	
		iL = iL < 0 ? 0 : iL;
		iL = iL > maxL ? maxL : iL; 		
		iT = iT < 0 ? 0 : iT;
		iT = iT > maxT ? maxT : iT;
		
		oWin.style.marginTop = oWin.style.marginLeft = 0;
		oWin.style.left = iL + "px";
		oWin.style.top = iT + "px";	
			
		return false
	};
	document.onmouseup = window.onblur = oH2.onlosecapture = function ()
	{
		bDrag = false;	
		bDrag2 = false;			
		oH2.releaseCapture && oH2.releaseCapture();
	};
};

function addRow(mycarsdis)
{

document.getElementById("station_distance_info").style.visibility="visible";

    for (var i = 0; i <mycarsdis.length ; i ++) 
      {
        var mycarsdis2 = new Array();
        mycarsdis2=mycarsdis[i].split("|");

        var newTr = testTbl.insertRow();

        //添加两列

        var newTd0 = newTr.insertCell();
        var newTd1 = newTr.insertCell();
        var newTd2 = newTr.insertCell();

        //设置列内容和属性

        newTd0.innerText = mycarsdis2[0];
        newTd1.innerText= mycarsdis2[1];
        newTd2.innerText= mycarsdis2[3];

      }

}

</script>


<script type="text/javascript">
function nTabs(thisObj,Num)
{
    if(thisObj.className == "active")return;
    var tabObj = thisObj.parentNode.id;
    var tabList = document.getElementById(tabObj).getElementsByTagName("li");
    for(i=0; i <tabList.length; i++)
    {
      if (i == Num)
      {
       thisObj.className = "active"; 
       document.getElementById(tabObj+"_Content"+i).style.display = "block";
      }
      else
      {
       tabList[i].className = "normal"; 
       document.getElementById(tabObj+"_Content"+i).style.display = "none";
      }
    } 
}
</script>



</head>
<body>

<div style="vertical-align:middle; background-color: #F1F1F1;"><img src="Images/logo.gif" /> </div>
    
<div class="main">

  <div class="main_left" id="frmTitle" >
  <div class="style3"></div>
  <div style="height:8px"></div>
  
<div style="margin-left:10px">
<p>
    <div>仅显示首末站名称：<input id="smz" type="checkbox" checked="checked" />
        </div>
<input type="text" style="width:60px" id="txtInput" />
<select 
        id="Select1" name="D1">
    <option>下行</option>
    <option>上行</option>
    </select>
<input id="xxys0" 
                style="width:72px;" 
                onclick="show_info();" type="button" value="线路查询" />
<%--              <h6 style="display: none;" ></h6>--%>
</p>
<p>
               <div><input type="text" style="width:122px" id="zd_name" /><input id="Button2" 
                style="width:72px;" 
                onclick="station_show_sel();" type="button" value="站点查询" /></div>
</p>
<p>
                <div><input type="text" style="width:122px" id="road_name" /><input id="Button3" 
                style="width:72px;" 
                onclick="show_road();" type="button" value="道路查询" /></div>
                </p>
   </div>
                  
 <div style="height:8px"></div>
    <%-- <div style="margin-left:10px"><input type="button" value="已通公交道路网络" onclick="ytgjroad();" /></div>
 <div style="height:8px"></div>
   <div style="margin-left:10px"><input type="button" value="未通公交道路网络" onclick="wtgjroad();" /></div>
 <div style="height:8px"></div>
 <div style="margin-left:10px"><input type="button" value="公交专用道路网络" onclick="gjzydroad();" /></div>
 <div style="height:8px"></div>--%>
  <div style="margin-left:10px"><input type="button" value="公交站点覆盖情况" onclick="gjzdfgl();" /></div>
<%-- <div style="height:8px"></div>
  <div style="margin-left:10px"><input type="button" value="公交站点上客信息" onclick="gjzdsxk();" /></div>
 <div style="height:8px"></div>
   <div style="margin-left:10px"><input type="button" value="公交场站分布信息" onclick="gjczfb();" /></div>
 <div style="height:8px"></div>
   <div style="margin-left:10px"><input type="button" value="道路车道网络信息" onclick="dlcdwl();" /></div>
 <div style="height:8px"></div>
   <div style="margin-left:10px"></div>--%>
   <div></div>
   <div class="style4" id="jwd" style="margin-left:10px"></div>
   <div  class="style4" id="info"></div>
   <div style="height:8px;"></div>


        </div>
  <div class="picBox" onclick="switchSysBar()" id="switchPoint" ></div>
    <div class="style3">
        <input id="Button1" style="width:80px" type="button" value="基础信息" />
<%--        <input id="show" type="button" value="显示所有站点" onclick="marker.hide()" />--%>

<%--        <a href="javascript:" onclick ="loginBox.style.display='';">加载图片</a>--%>
        <%--<input id="button2" style="width:80px" type="button" value="加载图片" onclick="loginBox.style.display='';" />--%>
        </div>
  <div class="main_right" id="dituContent">
  </div>
</div>

    <div id="win"><h2>鼠标拖动&nbsp;&nbsp;&nbsp;<span id="close">×</span></h2>


<div style="text-align:center; margin-left:2px;">
<!-- 选项卡开始 -->
  <div class="nTab">
    <!-- 标题开始 -->
    <div class="TabTitle">
      <ul id="myTab0">
        <li class="active" onclick="nTabs(this,0);">站台信息</li>
        <li class="normal" onclick="nTabs(this,1);">基本信息</li>
        <li class="normal" onclick="nTabs(this,2);">照片查看</li>
<%--        <li class="normal" onclick="nTabs(this,3);">站台间距</li>--%>
<%--        <li class="normal" onclick="nTabs(this,3);">欣赏借鉴</li>
        <li class="normal" onclick="nTabs(this,4);">建站技巧</li>
        <li class="normal" onclick="nTabs(this,5);">SEO优化</li>--%>
      </ul>
    </div>
    <!-- 内容开始 -->
    <div class="TabContent">
      <div id="myTab0_Content0"> <div>鼠标滑过显示站台信息</div>
      <div>站点名称：<input id="zdmc" type="text"  readonly="readonly"/></div>
      <div>站台形式：<input id="ztxs" type="text"  readonly="readonly"/></div>
      <div>站台长度：<input id="ztcd" type="text"  readonly="readonly"/></div>
      <div>所经车次：<input id="sjcc" type="text"  readonly="readonly"/></div>
      <div>广告位数：<input id="ggwsl" type="text"  readonly="readonly"/></div>
      <div>与上站间距：<input id="zjj" type="text"  readonly="readonly"/></div> </div>
      <div id="myTab0_Content1" class="none">
      <table align="left" style="background-color:#fff; height:100%; width:100%">
        <tr align="left" style="width:30px;">
            <td><%--运营时间：<input id="yysj" type="text" value="5:00-21:00" readonly="readonly" />--%>
                </td>
            <td>
                线路里程：<input id="xllc" type="text"  readonly="readonly"/></td>
            
            <td>
                 站点个数：<input id="zdgs" type="text" readonly="readonly" /></td>
            <td>
                </td>
        </tr>
        <tr align="left" style="width:30px;">
            <td><%--单程票价：<input id="dcpj" type="text" value="1元"  readonly="readonly"/>--%>
                </td>
            <td>
                专用道里程：<input id="zydlc" type="text"  readonly="readonly"/></td>
            <td>
                港湾站台：<input id="gwzt" type="text"  readonly="readonly"/></td>
            <td>
                &nbsp;</td>
        </tr>
        <tr align="left" style="width:30px;">
            <td><%--月票有效：<input id="ypyx" type="text"  value="是" readonly="readonly"/>--%>
                </td>
            <td>
               专用道比例：<input id="zydbl" type="text"  readonly="readonly"/></td>
            <td>
               港湾比例：<input id="gwbl" type="text"  readonly="readonly"/></td>
            <td>
                &nbsp;</td>
        </tr>
        <tr align="left" style="width:30px;">
            <td><%--所属公司：<input id="ssgs" type="text" value="四公司五队" readonly="readonly"/>--%>
                </td>
                                            <td>
                非直线系数：<input id="fzxxs" type="text"  readonly="readonly"/></td>
            <td>
                &nbsp;</td>
            <td>
                &nbsp;</td>
        </tr>

    </table>
      
      
      
      
     </div>
      <div id="myTab0_Content2" class="none"> <img id="Image1" alt="Images/000296-9-201310090355550069-0017200.jpg" height="100%" width="100%" src="Images/000296-9-201310090355550069-0017200.jpg" /></div>
            <div id="myTab0_Content3" class="none"> <div  class="style4" id="station_distance_info" style="visibility:hidden; overflow:scroll">
    <table rules="all" id="testTbl" align="left" cellspacing="1" class="style5">
        <tr id="tr1">
        <td >序号</td>
        <td >名称</td>
        <td >间距</td>  
        </tr>
    </table>

   </div></div>
<%--      <div>广告位数量：<input id="ggwsl" type="text"  readonly="readonly"/></div></div>
      <div id="myTab0_Content3" class="none"><a href="http://51xuediannao.com/show/">欣赏借鉴</a></div>
      <div id="myTab0_Content4" class="none"><a href="http://51xuediannao.com/jiqiao/">建站技巧</a></div>
      <div id="myTab0_Content5" class="none"><a href="http://51xuediannao.com/SEO/">SEO优化</a></div>--%>
    </div>
  </div>
  <!-- 选项卡结束 -->
  </div>

</div>



<div id="loginBox" style="position:absolute; left:20px;top:60%; z-index:1;display: none;" >
<div class="title" id="Mdown"><span class="t1">图片</span><span class="t2" title="关闭" onclick="login.style.display='none'">X</span></div>
<img id="Img2" alt="" width="100%" src="Images/000296-9-201309290638410764-0007997.jpg" />    
</div>

<script type="text/javascript">
var IsMousedown, LEFT, TOP, login;
document.getElementById("Mdown").onmousedown=function(e) 
{
	login = document.getElementById("loginBox");
	IsMousedown = true;
	e = e||event;
//				LEFT = e.clientX - parseInt(login.style.left);
//				TOP = e.clientY - parseInt(login.style.top);
	LEFT = e.clientX - loginBox.offsetLeft;
	TOP = e.clientY - loginBox.offsetTop;
	
	
	document.onmousemove = function(e) 
	{
		e = e||event;
		if (IsMousedown) 
		{
			login.style.left = e.clientX - LEFT + "px";
			login.style.top = e.clientY - TOP + "px";
		}
	}
	document.onmouseup=function(){
	IsMousedown=false;
	}
}
			
</script>




<%--<div id="tuli" class="roundout">
<b class="rtop"><b class="r1"></b><b class="r2"></b><b class="r3"></b><b class="r4"></b></b>
<div class="roundin">
<!--放置内容-->
1车道
<!--放置内容 end-->
</div>
<b class="rbottom"><b class="r4"></b><b class="r3"></b><b class="r2"></b><b class="r1"></b></b>
</div>--%>
<div id="tui">
<div id ="Div0" ><img src="images/lan2.jpg" /></div>
<%--<p><div id ="Div1" ><img src="images/2lane.gif" /></div></p>--%>
</div>

</body>




<script type="text/javascript">
    //创建和初始化地图函数：
    var point ;
    function initMap()
    {
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
        addcon();//添加自定义控件
        station_info();//加载公交站点信息
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
        var div=document.getElementById("tui");
          // 添加DOM元素到地图中
          map.getContainer().appendChild(div);
          // 将DOM元素返回
          return div;
        }
        // 创建控件
        var myZoomCtrl = new ZoomControl();
        // 添加到地图当中
    map.addControl(myZoomCtrl);
    }
    
    
    //创建地图函数：
    function createMap()
    {
        var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
        point = new BMap.Point(117.007863, 36.676649);//定义一个中心点坐标
        map.centerAndZoom(point,11);//设定地图的中心点和坐标并将地图显示在地图容器中
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
    //        if(e.overlay){ 
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
    //         }
    //         else
    //         {
    //         alert("请在覆盖路上单击");
    //         }
        }
    map.addEventListener("click", showInfo);
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
	map.addControl(new BMap.MapTypeControl());          //添加地图类型控件
//	map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]}));     //2D图，卫星图
//    map.addControl(new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT}));    //左上角，默认地图控件
    }
    
//标注线数组
//    var plPoints = [{style:"solid",weight:6,color:"blue",opacity:0.6}];
//	var mycars = new Array();
//mycars[0]="117.01882736857|36.613212794465";
//mycars[1]="117.018805592|36.613213306874";
//mycars[2]="117.01566849846|36.613234625486";
//mycars[3]="117.01881675286|36.613213454722";
//mycars[4]="117.01560022851|36.613235206537";
//mycars[5]="117.01573731466|36.613235121197";

//var xmlHttp;
function show_info()
{
//    map.clearOverlays();//清楚地图覆盖物
    var t=document.getElementById("Select1");
    var fx=t.options[t.selectedIndex].value;
    var rou=document.getElementById("txtInput").value;
    showCustomer(rou,fx);
}

var bx,by,xh
function showCustomer(rou,fx)
{
//    var t=document.getElementById("Select1");
//    var fx=t.options[t.selectedIndex].value;
//    var rou=document.getElementById("txtInput").value;
    createXMLHTTP();
    var mycars = new Array();
    xmlHttp.onreadystatechange=function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
        var strjwdd=xmlHttp.responseText;
         mycars=strjwdd.split("*"); //字符分割 
    //     map.clearOverlays();//清楚地图覆盖物
         addPolyline(mycars);//向地图中添   
    //     distance(mycars);//计算线路距离  
             showzh_info(rou,fx);
         setTimeout(function(){station_road_info(rou,fx);},500);
        }
    }

    var url="Read_Data.aspx?id=2&route="+rou+"&sxx="+fx;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}  
  
  function station_show_sel()
  {
  if(document.getElementById("zd_name").value="")
  {
  station_info();
  }
  else
  {
  show_station();
  }
  }
  
  
function show_road()
{
    map.clearOverlays();//清楚地图覆盖物
    var rou=document.getElementById("road_name").value;
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

    var url="Read_Data.aspx?id=27&route="+rou;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
}  
  

function addPolyline_road(mycars)
{
    map.clearOverlays();//清楚地图覆盖物
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
	        if(buslane==0)
	        {
	        line = new BMap.Polyline(points, {strokeColor:"red", strokeWeight:xx, strokeOpacity:0.6, strokeStyle:"solid"});
	        }
	        else if(buslane==1)
	        {
	        line = new BMap.Polyline(points, {strokeColor:"green", strokeWeight:xx, strokeOpacity:0.6, strokeStyle:"solid"});
	        }
	        map.addOverlay(line);
	        points = [];
	        points.push(new BMap.Point(p1,p2));
	    }
		lansc= mycars[j].split("|")[0];
		
	}
}
  
  
  
  
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
 
  function station_info()
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
          addMarker3(mycars2,mycars.length);
          }
        }
    }
    var url="Read_Data.aspx?id=14";
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
 }
 
  function addMarker3(mycars3,lenn)
 {
     var icon = new BMap.Icon("images/busstop.jpg", new BMap.Size(13,13));
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
//     var opts = {
//           position : point2,    // 指定文本标注所在的地理位置
//  offset   : new BMap.Size(0, -35)    //设置文本偏移量
//        }
//         var infocontent=mycars3[2];
//        var label = new BMap.Label(infocontent, opts);  // 创建文本标注对象
//	     label.setStyle({
//		 color : "red",
//		 fontSize : "12px",
//		 height : "20px",
//		 lineHeight : "20px",
//		 fontFamily:"微软雅黑"
//	 });
//    map.addOverlay(label);   
      var opts = {
          width : 0,     // 信息窗口宽度
          height: 0,     // 信息窗口高度
          title:"站点名称："+mycars3[2]+"<br/>所经车次："+sjccc
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
 
 
  function show_station()
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
          addMarker4(mycars2);
          }
        }
    }
    var url="Read_Data.aspx?id=26&zdname="+document.getElementById("zd_name").value;
    xmlHttp.open("post",url,true);
    xmlHttp.send(null);
 }
 function addMarker4(mycars3)
 {
//     var icon = new BMap.Icon("images/busstop.jpg", new BMap.Size(13,13));
    var point2 = new BMap.Point(mycars3[0],mycars3[1]);
//    var marker = new BMap.Marker(point2,{icon:icon});
    var marker = new BMap.Marker(point2);
    map.addOverlay(marker);
     var opts = {
           position : point2,    // 指定文本标注所在的地理位置
  offset   : new BMap.Size(0, -50)    //设置文本偏移量
        }
         var infocontent=mycars3[2];
        var label = new BMap.Label(infocontent, opts);  // 创建文本标注对象
	     label.setStyle({
		 color : "red",
		 fontSize : "12px",
		 height : "20px",
		 lineHeight : "20px",
		 fontFamily:"微软雅黑"
	 });
    map.addOverlay(label);
   setTimeout(function(){map.setViewport([new BMap.Point(mycars3[0],mycars3[1]),new BMap.Point(mycars3[0],mycars3[1])]);},500);          //调整到最佳视野

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
    // var icon = new BMap.Icon("images/sta1.png", new BMap.Size(20,30), {
    //    anchor: new BMap.Size(10,30),infoWindowAnchor: new BMap.Size(10, 0)});
    if(mycars3[6]==1)
    {
      icon = new BMap.Icon("images/sta1.png", new BMap.Size(13,13));
    }
    else
    {
    icon = new BMap.Icon("images/sta2.png", new BMap.Size(15,15));
    }
    var point2 = new BMap.Point(mycars3[4],mycars3[5]);
    var marker = new BMap.Marker(point2,{icon:icon});
    map.addOverlay(marker);
//    if((mycars3[0]==1)||(mycars3[0]==lenn))
//    {
//        var opts = {
//          width : 200,     // 信息窗口宽度
//          height: 100,     // 信息窗口高度
//          title : "◆ 站点信息" , // 信息窗口标题
//        }
//        var infocontent=mycars3[1];
//        var infoWindow = new BMap.InfoWindow(infocontent, opts);  // 创建信息窗口对象
//        map.openInfoWindow(infoWindow,point2);
//    }
if(document.getElementById("smz").checked==true)
{
    if((mycars3[0]==1)||(mycars3[0]==lenn))
    {
        var opts = {
           position : point2,    // 指定文本标注所在的地理位置
  offset   : new BMap.Size(0, -35)    //设置文本偏移量
        }
         var infocontent=mycars3[1];
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
}
else
{
        var opts = {
           position : point2,    // 指定文本标注所在的地理位置
  offset   : new BMap.Size(0, -35)    //设置文本偏移量
        }
         var infocontent=mycars3[1];
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
    marker.addEventListener("mouseover",function(){
    var sjccc=mycars3[8];
    sjccc=sjccc.substr(0,sjccc.length-1);
    document.getElementById("zdmc").value=mycars3[1];
    document.getElementById("ztcd").value=mycars3[2];
    document.getElementById("ztxs").value=mycars3[7];
    document.getElementById("zjj").value=mycars3[3];
    document.getElementById("sjcc").value=sjccc});
} 
  var iii=0;
  function show_allroute(xl)
  {
  var route=xl.split(",");
  var sxx="下行";
  var intt=setInterval(
  function()
  {
      var len=route.length;
      if(iii>=len)
      {
      iii=0;
      clearInterval(intt);
      }
      else
      {
      var sfd=route[iii];
      showCustomer(route[iii],sxx);
      iii++;
      }
  },1500);
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
            // var zh_info="<br/>线路总里程:"+mycars[0]+"千米;<br/>专用道里程:"+mycars[1]+"千米;<br/>站点个数:"+mycars[2]+"处;<br/>港湾站台数："+mycars[3]+"处;<br/>港湾站台比率："+(mycars[3]/mycars[2]).toFixed(1)+"%";
            //document.getElementById("info").innerHTML=zh_info;
            document.getElementById("xllc").value=mycars[0];
            document.getElementById("zydlc").value=mycars[1];
            document.getElementById("zdgs").value=mycars[2];
            document.getElementById("gwzt").value=mycars[3];
            document.getElementById("gwbl").value=(mycars[3]/mycars[2]*100).toFixed(1)+"%";
            document.getElementById("zydbl").value=(mycars[1]/mycars[0]*100).toFixed(1)+"%";
            document.getElementById("fzxxs").value=mycars[4];
        }
    }
//    var t=document.getElementById("Select1");
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


function addPolyline(mycars)
{

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
	        if(mycars[j-1].split("|")[3]==1)
	        {
	        line = new BMap.Polyline(points, {strokeColor:"green", strokeWeight:4, strokeOpacity:0, strokeStyle:"ridge"});
	        }
	        else
	        {
	        line = new BMap.Polyline(points, {strokeColor:"red", strokeWeight:4, strokeOpacity:0, strokeStyle:"ridge"});
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
	setTimeout(function(){map.setViewport([new BMap.Point(p30,p31),new BMap.Point(p40,p41)]);},1000);          //调整到最佳视野
}

//function addPolyline(mycars)
//{
//    map.clearOverlays();//清楚地图覆盖物
//	var points = [];
//	var p1;
//	var p2;
//	var lansc=mycars[0].split("|")[2];
//	for(var j=0;j<mycars.length;j++)
//	{
//		p1 = mycars[j].split("|")[0];
//		p2 = mycars[j].split("|")[1];
//		points.push(new BMap.Point(p1,p2));
//	    if(lansc!= mycars[j].split("|")[2]||j==mycars.length-1)
//	    {
//	        var line;
//	        var xx;
//	        if(mycars[j-1].split("|")[3]==1)
//	        {
//	        xx=6;
//	        }
//	        else
//	        {
//	        xx=6;
//	        }
//	        if(lansc==1)
//	        {
//	        line = new BMap.Polyline(points, {strokeColor:"red", strokeWeight:xx, strokeOpacity:0, strokeStyle:"ridge"});
//	        }
//	        else if(lansc==2)
//	        {
//	        line = new BMap.Polyline(points, {strokeColor:"#0099CC", strokeWeight:xx, strokeOpacity:0, strokeStyle:"dashed "});
//	        }
//	        else if(lansc==3)
//	        {
//	        line = new BMap.Polyline(points, {strokeColor:"Fuchsia", strokeWeight:xx, strokeOpacity:0, strokeStyle:"dashed "});
//	        }
//	        else if(lansc>=4)
//	        {
//	        line = new BMap.Polyline(points, {strokeColor:"#00CC33", strokeWeight:xx, strokeOpacity:0, strokeStyle:"ridge"});
//	        }
//	        map.addOverlay(line);
//	        points = [];
//	        points.push(new BMap.Point(p1,p2));
//	    }
//		lansc= mycars[j].split("|")[2];
//		
//	}
//	
//	var p30 = mycars[0].split("|")[0];
//	var p31 = mycars[0].split("|")[1];
//	var p40 = mycars[mycars.length-1].split("|")[0];
//	var p41 = mycars[mycars.length-1].split("|")[1];
//	setTimeout(function(){map.setViewport([new BMap.Point(p30,p31),new BMap.Point(p40,p41)]);},1000);          //调整到最佳视野
//}
		 
initMap();//创建和初始化地图
</script>
</html>
