
//消息弹窗
function show(){
	//<bgsound loop="infinite" src="sound/xxx.mid">
	//声音<audio  controls="controls" autoplay="autoplay" id="audio_player" src="a.mp3"></audio>

	var _audio = document.createElement('audio');
	_audio.id = "_audio";
	_audio.controls="controls";
	_audio.src = "resource/music/error_music.wav";
	document.body.appendChild(_audio);
	//ie浏览器
	if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){
		var _sound = document.createElement('embed');
		_sound.id = "_sound";
		_sound.loop = false;
		_sound.autostart = "false";
		_sound.hidden = "true";
		_sound.src = "resource/music/error_music.wav";
		document.body.appendChild(_sound);
	}

	//整个弹窗
	var _winPopDiv = document.createElement('div');
	_winPopDiv.id="_winPopDiv";
	_winPopDiv.style.cssText = 'width:300px;height:132px; position:absolute; right:0px; bottom:0px;  margin:0; padding:1px; overflow:hidden; display:none;';
	//标题栏
	var _titleDiv= document.createElement('div');
	_titleDiv.id="_titleDiv";
	_titleDiv.innerHTML='&nbsp;&nbsp;消息';
	_titleDiv.style.cssText = 'width:100%; height:22px; line-height:20px; background:#FF3421; font-weight:bold;color:#FFFFFF; text-align:left; font-size:14px;';
	_winPopDiv.appendChild(_titleDiv);
	//关闭按钮
	var _closeSpan= document.createElement('span');
	_closeSpan.id="_closeSpan";
	_closeSpan.innerHTML="X";
	_closeSpan.style.cssText = 'position:absolute; right:4px; top:-1px; color:#FFF; cursor:pointer;font-size:14px;';
	_titleDiv.appendChild(_closeSpan);
	//内容div
	var _conDiv= document.createElement('div');
	_conDiv.id="_conDiv";
	_conDiv.style.cssText = 'width:100%; height:110px; line-height:80px;position:absolute; left:0px; top:22px;font-weight:normal; font-size:12px; background:#FFFFFF; color:#0f0000; text-align:center;';
	_conDiv.innerHTML='';
	_winPopDiv.appendChild(_conDiv);
	//消息图片div
	var _conDivImg= document.createElement('div');
	_conDivImg.id="_conDivImg";
	_conDivImg.style.cssText = 'width:50px; height:50px;position:absolute;top:30px;left:30px;';
	_conDiv.appendChild(_conDivImg);
	//消息文本内容div
	var _conDivCon= document.createElement('div');
	_conDivCon.id="_conDivCon";
	_conDivCon.style.cssText = 'width:220px; height:110px;position:absolute; left:80px; top:0px; line-height:80px; font-weight:normal; font-size:12px; background:#FFFFFF; color:#0f0000; text-align:center;';
	_conDivCon.innerHTML='';
	_conDiv.appendChild(_conDivCon);
	document.body.appendChild(_winPopDiv);
}

show();

$("#_closeSpan").click(function(){
	$("#_winPopDiv").hide(1000);
});

//弹框显示
function showmsg(titlecolor,img,msg) {

	$("#_conDivCon").click(function(){
		addTab('busdynamic.do?reqCode=testTableInit','动态表格测试','011202','济南公交运维平台 -> 实时测试 -> 动态表格测试','tab_blank.png');
	});
	//$("#_audio")[0].play();
	//document.getElementById('_audio').play();
	//audio.onplay();
	$("#_conDivCon").text("编号1002超速,速度为：50KM/h");
	$("#_titleDiv").css("background-color",titlecolor);
	$("#_conDivImg").css("background-image","url("+img+")");
	$("#_winPopDiv").show(100);
	setTimeout(function(){
	$("#_winPopDiv").hide(1000)},3000);
}

setInterval(function() {
	$.getJSON("busdynamic.do?reqCode=queryTestTable",{
	},function(js){
		var obj =  eval(js);
		for (var i = 0; i < obj.length;i++) {
			var value = obj[i].num


			switch(parseInt(value%3)){
				case 0:
				showmsg("#f65700","resource/image/map/red.gif",value);
				//判断是否是ie浏览器
				if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){
					$("#_sound")[0].play();
				}else{
					$("#_audio")[0].play();
				}

				return "<img src='resource/image/map/lt3.gif' /> ";
				break;
				case 1:
				return "<img src='resource/image/map/lt2.gif' /> ";
				break;
				case 2:
				showmsg("#feeb00","resource/image/map/yellow.gif",value);
				return "<img src='resource/image/map/lt2_old.gif' /> ";
				break;
			}


		}
	});
}, 2000);

