<%@ page language="C#" autoeventwireup="true" inherits="GpsToBaiDu, App_Web_agyah52i" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<html>  
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />  
<title>GpsToBaidu</title>  
<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.3"></script>
<script type="text/javascript" src="http://developer.baidu.com/map/jsdemo/demo/convertor.js"></script>
<script type="text/javascript">
function auto()
{
}
function auto1()
{
document.getElementById("Button1").click();
}
</script>



<script type="text/javascript">
var bx,by,xh
function showCustomer(xxx)
{
createXMLHTTP();
xmlHttp.onreadystatechange=function(){
  if (xmlHttp.readyState==4 && xmlHttp.status==200)
    {
    xh=xxx;
    var strjwdd=xmlHttp.responseText;
    var strs= new Array(); //定义一数组
     strs=strjwdd.split("*"); //字符分割 
     ggxy2(strs[1],strs[2]);     
    }
    }
    var ld=document.getElementById("Text1").value;
var url="Default.aspx?id="+xxx+"&luduan="+ld;
xmlHttp.open("GET",url,true);
xmlHttp.send(null);

}
function ggxy2(jd,wd){  
    var ggPoint = new BMap.Point(jd,wd);  
    BMap.Convertor.translate(ggPoint,0,translateOptions2);
}  
 
translateOptions2 = function (point){   
bx=point.lng;
by=point.lat;
sendjwd(xh,bx,by);
}  

function sendjwd(xh,jd,wd)
    {
createXMLHTTP();//创建XMLHttpRequest对象 
//把数据传入到另一个页面执行 
xmlHttp.onreadystatechange=function(){
  if (xmlHttp.readyState==4 && xmlHttp.status==200)
    {
    document.getElementById("cou").innerhtml=xmlHttp.responseText;
    }}
 var ldd=document.getElementById("Text1").value;
var url="update.aspx?xh="+xh+"&jd="+jd+"&wd="+wd+"&ld="+ldd; 
xmlHttp.open("GET", url, true); 
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
</script>

    <style type="text/css">
        #Text1
        {
            width: 450px;
        }
    </style>
</head>  
<body runat="server">  
    <form id="form1" runat="server">
    

        <input value="开始" id="xxys0" type="button" onclick="auto3();"  /><input 
            id="Text1" type="text" />
        <div id="cou"></div> 
                <br />
                <div id="xhh"></div>
<br />
<br />
<br />
<%--<script language="javascript" type="text/javascript">
function ggxy(){  
    var x = document.getElementById("TextBox1").value;  
    var y = document.getElementById("TextBox2").value; 
     
    var ggPoint = new BMap.Point(x,y);  
    BMap.Convertor.translate(ggPoint,0,translateOptions);
}  
 
translateOptions = function (point){   
document.getElementById("TextBox3") .value=point.lng;
document.getElementById("TextBox4") .value= point.lat;
}  
</script>--%>
<script type="text/javascript">
var maxzz;
function auto3()
{
maxz();
var x=0;
setInterval(function(){x++;showCustomer(x);document.getElementById("xhh").innerHTML="数据转换中，请耐心等候！"+x+"/"+maxzz;},500);
}

function maxz()
{
createXMLHTTP();
xmlHttp.onreadystatechange=function(){
  if (xmlHttp.readyState==4 && xmlHttp.status==200)
    {
    maxzz=xmlHttp.responseText;    
    }
    }
    var ld=document.getElementById("Text1").value;
var url="Default.aspx?id=5&luduan="+ld;
xmlHttp.open("GET",url,true);
xmlHttp.send(null);
}


</script>
</form>
</body>  
</html>