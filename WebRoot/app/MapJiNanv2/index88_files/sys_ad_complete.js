//简单广告系统
document.write(unescape("%3Cscript src='http://js.2011.8684.com/main.js' charset='utf-8' type='text/javascript'%3E%3C/script%3E"))
document.write('<style>.float_ad{position:absolute;z-index:2147483647;}</style>');
function $g(i){return document.getElementById(i)}
function frd()
{
	return (new Date()).getTime();
}
function trim(s){return s.replace(/(^\s*)|(\s*$)/g,'');}
function ob_hid(i,f){if($g(i)) $g(i).style.display=(f)?'none':'block';}
//encode url
function scode(s)
{
	return encodeURIComponent(s);
}
//load file
function outjs(id)
{
	var ad_id = id;
	if(MainAdIds[ad_id]==18) eval(MainAdTypes[ad_id]);
	if(MainAdIds[ad_id]==3 || MainAdIds[ad_id]==16 || MainAdIds[ad_id]==18 || MainAdIds[ad_id]==19) document.write(MainAds[ad_id]);
	else eval(MainAds[ad_id]);
}
//send
function jsend(url)
{
	var t=new Image();
	t.src=url;
}
function setpos(i,obj)
{
	if(typeof(obj.t)!='undefined') $g(i).style.top=obj.t+'px';
	if(typeof(obj.l)!='undefined') $g(i).style.left=obj.l+'px';
}
function fanalysis(typeid, id)
{
	var url='http://tongji.2011.8684.com/?s='+frd()+'&typeid='+typeid+'&id='+id;
	jsend( url );
}

var gg_url  = 'http://js.2011.8684.com/';
var pic_url = 'http://media.2011.8684.com/';
var obody   = document.compatMode=="CSS1Compat" ? document.documentElement : document.body;

function chkdiv(divid){
	var chkid=$g(divid);
	if(chkid != null)return true;
	return false;
}

function show_ggs_fugg(wh,ht)
{
	var js_url  = 'http://js.2011.8684.com/gg/';
	var contentId = 0;
	document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" style="display:none" width="'+wh+'" height="'+ht+'" align="middle">');
	document.write('<param name="movie" value="'+js_url+'ADSenseMain.swf" />');
	document.write('<param name="quality" value="high" />');
	document.write('<param name="bgcolor" value="#000000" />');
	document.write('<param name="play" value="true" />');
	document.write('<param name="loop" value="true" />');
	document.write('<param name="wmode" value="window" />');
	document.write('<param name="scale" value="showall" />');
	document.write('<param name="menu" value="true" />');
	document.write('<param name="devicefont" value="false" />');
	document.write('<param name="salign" value="" />');
	document.write('<param name="allowScriptAccess" value="always" />');
	document.write('<param name="flashVars" value="contentId='+contentId+'&descriptionUrl='+location.href+'" />');
	document.write('<embed width="'+wh+'" height="'+ht+'" base="'+js_url+'ADSenseMain.swf" wmode="Opaque" allowScriptAccess="always" quality="high" name="flashobj" id="flashobj" src="'+js_url+'ADSenseMain.swf" type="application/x-shockwave-flash" flashVars="contentId='+contentId+'&descriptionUrl='+location.href+'"/>');
	document.write('</object>');
}

var isAfs = true;
function ShowGoogle(query, pageOption, channelId, containerId)
{
	var pageOptions = pageOption;
	var adBlock = {
	'channel' : channelId,
	'container' : containerId,
	'query' : query
	};
	new google.ads.search.Ads(pageOptions, adBlock);
}

function gg_load_content(gg_load_show_id, gg_load_content_id, adid) {
	//设置“广告内容元素”的显示样式
	document.getElementById(gg_load_content_id).style.display = "block";
	document.getElementById(gg_load_content_id).style.position = "absolute";
	document.getElementById(gg_load_content_id).style.zIndex = "9999999";
	//设置“广告内容元素”的大小
	document.getElementById(gg_load_content_id).style.width = document.getElementById(gg_load_show_id).clientWidth+"px";
	document.getElementById(gg_load_content_id).style.height = document.getElementById(gg_load_show_id).clientHeight+"px";
	//将“广告内容元素”移动到“广告显示位置”上，并且遮罩“广告显示位置”（500为半秒校对一次广告位置）
	gg_load_monitor(gg_load_show_id, gg_load_content_id, 500);
}

function gg_load_monitor(gg_load_show_id, gg_load_content_id, monitor_time) {
	if (document.getElementById(gg_load_show_id).getBoundingClientRect().top != document.getElementById(gg_load_content_id).getBoundingClientRect().top || document.getElementById(gg_load_show_id).getBoundingClientRect().left != document.getElementById(gg_load_content_id).getBoundingClientRect().left)
	{
		//将“广告内容元素”移动到“广告显示位置”上，并且遮罩“广告显示位置”
		document.getElementById(gg_load_content_id).style.left = (document.body.scrollLeft+document.documentElement.scrollLeft+document.getElementById(gg_load_show_id).getBoundingClientRect().left)+"px";
		document.getElementById(gg_load_content_id).style.top = (document.body.scrollTop+document.documentElement.scrollTop+document.getElementById(gg_load_show_id).getBoundingClientRect().top)+"px";
	}
	//自动循环校准广告显示位置
	setTimeout(function(){gg_load_monitor(gg_load_show_id, gg_load_content_id, monitor_time);}, monitor_time);
}

var Sys_ad = {

	disid : 61,
	clkid : 62,

	ldad : function ( id,loadId,tmpId )
	{
		//fanalysis(Sys_ad.disid, id);
		//outjs( gg_url+id+'.js' );
		//outjs( id );
		if(MainAdIds[id]==19){
			fanalysis(Sys_ad.disid, id);
			outjs( id );
		}else{
			fanalysis(Sys_ad.disid, id);
			outjs( id );
			setTimeout(function(){
				if(chkdiv(loadId) && chkdiv(tmpId)){
					$g(loadId).innerHTML=$g(tmpId).innerHTML;
					$g(tmpId).innerHTML='';
				}
			},1000);
		}
	},

	ldGoogleJS : function(id,loadId,tmpId){
		if(MainAdIds[id]==19){
			setTimeout(function(){
				fanalysis(Sys_ad.disid, id);
				outjs( id );
			},300);
		}else{
			fanalysis(Sys_ad.disid, id);
			outjs( id );
			if(chkdiv(loadId) && chkdiv(tmpId)){
				setTimeout(function(){
					$g(loadId).innerHTML=$g(tmpId).innerHTML;
					$g(tmpId).innerHTML='';
				},300);
			}
		}
	},

	lazyldad : function(id,loadId,tmpId,isGoogle){
		if(chkdiv(loadId) && chkdiv(tmpId)){
			setTimeout(function(){
				$g(loadId).innerHTML=$g(tmpId).innerHTML;
				$g(tmpId).innerHTML='';
			},300);
		}
	},

	ldtxt : function (id, aurl ,txt)
	{
		var s='<a id="Sys973_'+id+'" target="_blank" href="'+aurl+'" onclick="fanalysis('+Sys_ad.clkid+', '+id+');">'+txt+'</a>';
		document.write(s);
	},

	ldfla : function ( wh, ht, p, id, aurl )
	{
		var s='<div id="Sys973_'+id+'" style="width:'+wh+'px;height:'+ht+'px;position:relative;z-index:999;background:none;">';
		s+='<div style="width:'+wh+'px;height:'+ht+'px;overflow:hidden;position:absolute;z-index:998;background:none;">';
		s+='<a target="_blank" onclick="fanalysis('+Sys_ad.clkid+', '+id+');" href="'+aurl+'" style="display:block;width:'+wh+'px;height:'+ht+'px;">';
		s+='<img width="'+wh+'" height="'+ht+'" border="0" src="'+pic_url+'coverall.gif">';
		s+='</a>';
		s+='</div>';
		s+='<object><param name="quality" value="high"><param name="wmode" value="opaque">';
		s+='<embed width="'+wh+'" height="'+ht+'" src="'+p+'" wmode="transparent" quality="high"></object>';
		s+='</div>';
		document.write(s);
	},

	ldflaround : function ( wh, ht, p, id, aurl )
	{
		var s='<div id="Sys973_'+id+'" style="width:'+wh+'px;height:'+ht+'px;position:relative;z-index:999;background:none;">';
		s+='<div style="width:'+wh+'px;height:'+ht+'px;overflow:hidden;position:absolute;z-index:998;background:none;">';
		s+='<a target="_blank" onclick="fanalysis('+Sys_ad.clkid+', '+id+');" href="'+aurl+'" style="position: relative;display:block;width:'+wh+'px;height:'+ht+'px;">';
		s+='<img width="'+wh+'" height="'+ht+'" border="0" src="'+pic_url+'coverall.gif">';
		s+='</a>';
		s+='</div>';
		s+='<object><param name="quality" value="high"><param name="wmode" value="opaque">';
		s+='<embed width="'+wh+'" height="'+ht+'" src="'+p+'" wmode="transparent" quality="high"></object>';
		s+='<a href="'+aurl+'" class="hc_png"></a>';
		s+='</div>';
		document.write(s);
	},

	ldflaroundtxt : function ( wh, ht, p, id, aurl, txt )
	{
		var s='<div id="Sys973_'+id+'" style="width:'+wh+'px;height:'+ht+'px;position:relative;z-index:999;background:none;">';
		s+='<div style="width:125px;height:100px;overflow:hidden;position:absolute;z-index:998;background:none;">';
		s+='<a target="_blank" onclick="fanalysis('+Sys_ad.clkid+', '+id+');" href="'+aurl+'" style="position: relative;display:block;width:125px;height:100px;">';
		s+='<img width="125" height="100" border="0" src="'+pic_url+'coverall.gif">'+txt;
		s+='</a>';
		s+='</div>';
		s+='<object><param name="quality" value="high"><param name="wmode" value="opaque">';
		s+='<embed width="125" height="75" src="'+p+'" wmode="transparent" quality="high"></object>';
		s+='<a href="'+aurl+'" class="hc_png"></a>';
		s+='</div>';
		document.write(s);
	},

	ldimg : function ( wh, ht, p, id, aurl )
	{
		var s='<div id="Sys973_'+id+'" style="overflow:hidden;">';
		s+='<a target="_blank" onclick="fanalysis('+Sys_ad.clkid+', '+id+');" href="'+aurl+'" style="display:block;width:'+wh+'px;height:'+ht+'px;">';
		s+='<img width="'+wh+'" height="'+ht+'" border="0" src="'+p+'">';
		s+='</a>';
		s+='</div>';
		document.write(s);
	},

	ldimground : function ( wh, ht, p, id, aurl )
	{
		var s='<div id="Sys973_'+id+'" style="overflow:hidden;">';
		s+='<a target="_blank" onclick="fanalysis('+Sys_ad.clkid+', '+id+');" href="'+aurl+'" style="position: relative;display:block;width:'+wh+'px;height:'+ht+'px;">';
		s+='<img width="'+wh+'" height="'+ht+'" border="0" src="'+p+'">';
		s+='<div class="hc_png"></div>';
		s+='</a>';
		s+='</div>';
		document.write(s);
	},

	ldimgroundtxt : function ( wh, ht, p, id, aurl, txt )
	{
		var s='<div id="Sys973_'+id+'" style="width:125px;height:100px;overflow:hidden;">';
		s+='<a target="_blank" onclick="fanalysis('+Sys_ad.clkid+', '+id+');" href="'+aurl+'" style="position: relative;display:block;width:125px;height:100px;">';
		s+='<img width="125" height="75" border="0" src="'+p+'">'+txt;
		s+='<div class="hc_png"></div>';
		s+='</a>';
		s+='</div>';
		document.write(s);
	},

	ldimgtxt : function ( wh, ht, p, id, aurl, txt )
	{
		var s='<div id="Sys973_'+id+'" style="width:'+wh+'px;height:'+ht+'px;overflow:hidden;">';
		s+='<a target="_blank" onclick="fanalysis('+Sys_ad.clkid+', '+id+');" href="'+aurl+'" style="display:block;width:'+wh+'px;height:'+ht+'px;margin:0 auto;text-align:center;">';
		s+='<img width="'+wh+'" height="'+(ht-26)+'" border="0" src="'+p+'"><br />'+txt;
		s+='</a>';
		s+='</div>';
		document.write(s);
	},

	ldnewimgtxt : function ( wh, ht, p, id, aurl, txt )
	{
		var s='<a target="_blank" onclick="fanalysis('+Sys_ad.clkid+', '+id+');" href="'+aurl+'">';
		s+='<img width="'+wh+'" height="'+ht+'" src="'+p+'">'+txt+'<i></i></a>';
		document.write(s);
	},

	ldbutton : function ( wh, ht, p, id, aurl, txt, type, score, stxt )
	{
		var s = '<div class="j_cont" id="Sys973_'+id+'"><div class="g_pic"><a onclick="fanalysis('+Sys_ad.clkid+', '+id+');" href="'+aurl+'" target="_blank">';
		s += '<img width="'+wh+'" height="'+ht+'" src="'+p+'" /></a></div>';
		s += '<a href="'+aurl+'" onclick="fanalysis('+Sys_ad.clkid+', '+id+');" target="_blank" class="g_tit">'+txt+'</a>';
		s += '<span class="t_p">'+type+'</span><span class="t_n">'+stxt+'<a class="cat_nu">'+score+'</a></span>';
		s += '<a href="'+aurl+'" onclick="fanalysis('+Sys_ad.clkid+', '+id+');" target="_blank" class="but_1"></a>';
		s += '<a href="'+aurl+'" onclick="fanalysis('+Sys_ad.clkid+', '+id+');" target="_blank" class="but_2"></a></div>';
		document.write(s);
	},

	ldsmallimgtext : function ( wh, ht, p, id, aurl, txt )
	{
		var s = '<span class="jk_a"><div class="jk_b">';
		s += '<a class="jk_c" href="'+aurl+'" target="_blank" onclick="fanalysis('+Sys_ad.clkid+', '+id+');">';
		s += '<img width="'+wh+'" height="'+ht+'" border="0" src="'+p+'">';
		s += '<div class="jk_png"></div></a></div>';
		s += '<a class="jk_txt" href="'+aurl+'" target="_blank" onclick="fanalysis('+Sys_ad.clkid+', '+id+');">'+txt+'</a></span>';
		document.write(s);
	},

	adfloat : function ()
	{
		var cur_ht=(typeof(window.pageYOffset) != "undefined") ? window.pageYOffset:obody.scrollTop;
		setpos(Sys_ad.f_did, {t : cur_ht+obody.clientHeight-Sys_ad.f_ht-0, l : obody.clientWidth-Sys_ad.f_wh-0 });
	},

	f_id : '',
	f_wh : 0,
	f_ht : 0,
	f_media : '',
	f_aurl : '',
	f_did : 'float_ad',
	f_type : 1,
	f_close : 1,

	disfloat : function()
	{
		var cover = Sys_ad.f_type == 1 ? pic_url+'coverall.gif' : Sys_ad.f_media;

		var rightf='';

		var cleft = Sys_ad.f_wh-20;
		if( Sys_ad.f_close == 2)
		{
			cleft = 1;
		}

		rightf+='<div style="cursor:pointer;position:absolute;z-index:999;top:10px;left:'+cleft+'px;"><img onclick="ob_hid(\''+Sys_ad.f_did+'\',1)" src="'+pic_url+'close.gif" /></div>';
		rightf+='<div style="width:'+Sys_ad.f_wh+'px;height:'+Sys_ad.f_ht+'px;z-index:998;position:absolute;overflow:hidden;">';
		rightf+='<a target="_blank" href="'+Sys_ad.f_aurl+'" style="display:block;width:'+Sys_ad.f_wh+'px;height:'+Sys_ad.f_ht+'px;">';
		rightf+='<img onclick="fanalysis('+Sys_ad.clkid+', '+Sys_ad.f_id+');" width="'+Sys_ad.f_wh+'" height="'+Sys_ad.f_ht+'" border="0" src="'+cover+'">';
		rightf+='</a>';
		rightf+='</div>';
		//clkid

		if( Sys_ad.f_type == 1 )
		{
			rightf+='<object><param name="quality" value="high"><param name="wmode" value="opaque">';
			rightf+='<embed width="'+Sys_ad.f_wh+'" height="'+Sys_ad.f_ht+'" src="'+Sys_ad.f_media+'" wmode="transparent" quality="high"></object>';
		}

		var bd = document.getElementsByTagName("body").item(0);
		var obnew = document.createElement('div');
		obnew.setAttribute('id',Sys_ad.f_did);
		bd.appendChild(obnew);

		obnew.className = 'float_ad';
		obnew.innerHTML=rightf;

		setInterval("Sys_ad.adfloat()",100);
	},

	ldfloat : function (wh, ht, furl, id, aurl, type, tclose)
	{
		Sys_ad.f_id = id;
		Sys_ad.f_wh = wh;
		Sys_ad.f_ht = ht;
		Sys_ad.f_media = furl;
		Sys_ad.f_aurl = aurl;
		Sys_ad.f_type = type;

		if(tclose) Sys_ad.f_close = tclose;
		if(window.attachEvent) window.attachEvent('onload', Sys_ad.disfloat);
		else if(window.addEventListener) window.addEventListener('load', Sys_ad.disfloat, false);
		else window.onload = Sys_ad.disfloat;
	}
};