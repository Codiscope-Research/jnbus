<%@ page language="C#" autoeventwireup="true" inherits="tanchu, App_Web_agyah52i" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="Content-Type"content="text/html; charset=gb2312"/>
<title>弹出窗口登录效果</title>
<style>
body,#Mdown{margin: 0;padding: 0;text-align: center;font: normal 14px/180% Tahoma,sans-serif;}
#loginBox{position:fixed; bottom:0; padding: 0px;text-align: left;width: 90%;height: 250px;background: #EAEEFF;font-size: 9pt;border: 1px solid #829AFF;}
#loginBox .title{text-align: left;padding-left: 10px;font-size: 11pt;border-bottom: 1px solid #829AFF;height: 25px;line-height: 25px;cursor: move;}
#loginBox .t1{float: left;font-weight: bold;color: #AA7B7B;text-decoration: none;}
#loginBox .t2{float: right;text-align: center;line-height: 18px;height: 18px;width: 18px;margin-top: 3px;margin-right: 2px;overflow: hidden;border: 1px solid #FF5889;background: #FFE0E9;cursor: pointer;}
</style>
</head>
<body>
<a href="javascript:" onClick="loginBox.style.display='';">登录</a>
<input type="button"  onclick="ss();"/>
<div id="loginBox" style="position:absolute; left:20px; top:150px; z-index:1;display: none;" >
        <div class="title" id="Mdown"><span class="t1">登录</span><span class="t2" title="关闭" onClick="login.style.display='none'">X</span></div>
         
        </div>
    <script type="text/javascript">
			var IsMousedown, LEFT, TOP, login;
			document.getElementById("Mdown").onmousedown=function(e) {
				login = document.getElementById("loginBox");
				IsMousedown = true;
				e = e||event;
				LEFT = e.clientX - parseInt(login.style.left);
				TOP = e.clientY - parseInt(login.style.top);
				document.onmousemove = function(e) {
					e = e||event;
					if (IsMousedown) {
						login.style.left = e.clientX - LEFT + "px";
						login.style.top = e.clientY - TOP + "px";
					}
				}
				document.onmouseup=function(){
					IsMousedown=false;
				}
			}
			
			function ss()
			{
			var IsMousedown, LEFT, TOP, login;
			document.getElementById("Mdown").onmousedown=function(e) {
				login = document.getElementById("loginBox");
				IsMousedown = true;
				e = e||event;
				LEFT = e.clientX - parseInt(login.style.left);
				TOP = e.clientY - parseInt(login.style.top);
				document.onmousemove = function(e) {
					e = e||event;
					if (IsMousedown) {
						login.style.left = e.clientX - LEFT + "px";
						login.style.top = e.clientY - TOP + "px";
					}
				}
				document.onmouseup=function(){
					IsMousedown=false;
				}
			}
			}
        </SCRIPT>
</body>
</html>