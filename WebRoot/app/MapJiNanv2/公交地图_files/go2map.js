var _m,
	searchPn = _el("div_search_panel"), 
	searchFeaturePn = _el("div_searchfeature_panel"),
	busPn = _el("div_bus_panel"), 
	busInfoPn = _el("div_businfo_panel"),
	busTb = _el("div_bus_qstbar"), 
	searchRangeTb = _el("div_searchrange_qstbar"),
	searchFeatureTb = _el("div_searchfeature_qstbar"),
	searchTb = _el("div_search_qstbar"), 
	searchAroundTb = _el("div_searcharound_qstbar");
/**
2013/5/5新增  Start
**/
function getLeftStr(i){  
    var s="";  
    for(var j=0;j<i;j++){  
        s=s+" |--";  
    }  
    return s;  
}  
 
function allPrpos(obj,i){   
    var props = "";  
    if(typeof(i)=="undefined") {  
        i=1;  
    }  
    var s=getLeftStr(i);  
    for(var p in obj){  
        if(typeof(obj[p])=="object"){   
           props = props+s+ p + "\r" + allPrpos(obj[p],++i);  
           --i;  
        }else if(typeof(obj[p])=="function"){  
        }else{  
            props=props+s+p + "=" + obj[p] + "\r";  
        }  
    }  
    return props;  
}
function dashListFilter(a){
	var dashList = {
		line:[
		"24(左家庄-北京站)",
		"642(安宁庄东路南口-阳坊北站)",
		"642(阳坊北站-安宁庄东路南口)",
		"316(小稿村南站-龙旺庄小区)",
		"316(龙旺庄小区-小稿村南站)",
		"675(通州李庄-左家庄)",
		"675(左家庄-通州李庄)",
		"365(永丰站-闵庄南里)",
		"365(闵庄南里-永丰站)",
		"632(五路-清河小营桥西)",
		"447(城铁上地站-皇后店)",
		"447(皇后店-城铁上地站)",
		"686(朝新嘉园-建欣苑)",
		"740内(公益东桥东-公益东桥东)",
		"740外(阜永路口西-阜永路口西)",
		"698(香山-城南嘉园北)",
		"698(城南嘉园北-香山)"
		]
	};
	var isInDashList = false;
	for (var j = 0; j < dashList.line.length; j++){
		if (a == dashList.line[j]){
			isInDashList = true;
			break;
		}
	}
	return isInDashList;
}
/**
End
**/
function blackListFilter(a, b)
{
	var blacklist = {
norm:[
"怀柔","H","通州","通","密云","密","M","顺义","顺","开发区","大兴","兴","昌平","昌","平谷","平","延庆","Y","延","空港","房山","房","前火岭","燕山石化","郊","良乡","黄向专","燕化","新城"
],
spec:[
"机场1","机场2","机场3","机场4","机场5","机场6","机场7","机场8","机场9","机场专线","联运119-125","金融街专","翡翠城临线","943快","943区"
],
equal:[
"943(永定门长途汽车站-永清县台湾新城小区)",
"943(永清县台湾新城小区-永定门长途汽车站)",
"731区(黄渠村-中关村南)",
"731区(中关村南-黄渠村)",
"临线(前沙涧村-中关村西)",
"临线(中关村西-前沙涧村)",
"市郊铁延庆S2线(北京北站-延庆)",
"市郊铁延庆S2线(延庆-北京北站)",
"首都机场夜航线(首都机场三号航站楼-西单)",
"936支(喇叭沟门-汤河口)",
"936支(汤河口-喇叭沟门)",
"936支(杏树台-于家园)",
"936支(于家园-杏树台)",
"特8内快(北京南站南广场-北京南站南广场)",
"特8外快(地铁北土城站-地铁北土城站)",
"731区(草房西路南口-农业展览馆)",
"731区(农业展览馆-草房西路南口)",
"312区(翠屏小区-大北窑东)",
"312区(大北窑东-翠屏小区)",
"320区(保福寺桥西-北京西站)",
"320区(北京西站-保福寺桥西)",
"631快(航天桥东-黄村火车站)",
"631快(黄村火车站-航天桥东)",
"667-1联运(刘庄北站-西单路口东)",
"668-1联运通勤快高峰(单行)(京东运乔建材城-西单路口东)",
"669-1联运(万盛北街-西单路口东站)",
"柴厂屯-北苑通勤快(柴厂屯镇-通州北苑路口西站)",
"柴厂屯-北苑通勤快(通州北苑路口西站-柴厂屯镇)",
"大地站-通州北苑通勤班车(大地-通州北苑路口西站)",
"大地站-通州北苑通勤班车(通州北苑路口西站-大地)",
"东直门-焦庄户专(东直门-龙湾屯镇政府)",
"东直门-焦庄户专(龙湾屯镇政府-东直门)",
"双桥农场-大北窑通勤快(双桥农场站-大北窑东站)",
"微2(五道口公交场站-五道口公交场站)",
"园博会专线1(北京南站-园博园)",
"园博会专线1(园博园-北京南站)",
"园博会专线2(北京西站-园博园)",
"园博会专线2(园博园-北京西站)",
"园博会专线3(地铁慈寿寺站-园博园)",
"园博会专线3(园博园-地铁慈寿寺站)",
"园博会专线4(地铁西局站-园博园)",
"园博会专线4(园博园-地铁西局站)",
"园博接驳A线(地铁园博园站-园博园5号门)",
"园博接驳A线(园博园5号门-地铁园博园站)",
"温馨家园-十里河通勤班车(十里河桥南站-温馨家园)",
"温馨家园-十里河通勤班车(温馨家园-十里河桥南站)",
"320摆渡车(单行)(军事博物馆-北京西站)",
"园博接驳B线(地铁园博园站-园博园6号门)",
"园博接驳B线(园博园6号门-地铁园博园站)",
"黄村-向阳专(滨河西里-燕化向阳)",
"黄村-向阳专(燕化向阳-滨河西里)",
"里二泗-通州北苑通勤班车(里二泗总站-通州北苑路口西站)",
"里二泗-通州北苑通勤班车(通州北苑路口西站-里二泗总站)",
"龙湾屯1北线(丁甲庄村-龙湾屯中心小学)",
"龙湾屯1北线(龙湾屯中心小学-丁甲庄村)",
"龙湾屯1南线(柳庄户村-龙湾屯中心小学)",
"龙湾屯1南线(龙湾屯中心小学-柳庄户村)",
"沙河高教园临1(北街家园八区南站-北街家园八区南站)",
"沙河高教园临2(北街家园六区-北街家园六区)",
"燕郊-望京通勤快(城铁望京西站-燕郊上上城五期)",
"燕郊-望京通勤快(燕郊上上城五期-城铁望京西站)"


/*
"运通123(上地五街东口-永丰中路)",
"运通123(永丰中路-上地五街东口)",
"运通124(金庄-厢白旗桥)",
"运通124(厢白旗桥-金庄)",
"运通125(内)(马家堡路北口-马家堡路北口)",
"运通125(外)(马家堡路北口-马家堡路北口)"
*/
]};

//console.log(a)
//公交车站
	if (a.busStation)
	{
		var arrBusStations = a.busStation.split(",");
		var arrFiltered = [];
		//检查车站看看是否是黑线
		for (k = 0; k < arrBusStations.length; k++)
		{
			var isInBlackList = false;
			var re = null, m = null;
			// check equal list
			for (j = 0; j < blacklist.equal.length; j++)
			{
				if (arrBusStations[k] == blacklist.equal[j])
				{
//console.log('[11]' + arrBusStations[k] + '=' + blacklist.equal[j])
					//yes it's in blacklist and throw it away
					isInBlackList = true;
					break;
				}
			}
			// check spec list
			if (!isInBlackList)	for (j = 0; j < blacklist.spec.length; j++)
			{
				re = new RegExp('^' + blacklist.spec[j] + '.*');
				m = re.exec(arrBusStations[k]);
				if (m != null)
				{
//console.log('[12]' + arrBusStations[k] + '$' + blacklist.spec[j])
					//yes it's in blacklist and throw it away
					isInBlackList = true;
					break;
				}
			}
			// cehck norm list
			if (!isInBlackList)	for (j = 0; j < blacklist.norm.length; j++)
			{
				re = new RegExp('^' + blacklist.norm[j] + '.*[0-9]+');
				m = re.exec(arrBusStations[k]);
				if (m != null)
				{
//console.log('[13]' + arrBusStations[k] + '~' + blacklist.norm[j])
					//yes it's in blacklist and throw it away
					isInBlackList = true;
					break;
				}
			}
			if (isInBlackList == false)	arrFiltered.push(arrBusStations[k]);
		}
		if (arrFiltered && arrFiltered.length > 0) a.busStation = arrFiltered.join(",");
		return a;
	}
	else
	{
try{
		var rsp = a.response || a.Response;
		var err = rsp.error || rsp.Error;
		var dat = rsp.Data || rsp.resultset || rsp.data;
		if (err) return a;
		if (dat.busline)
		{
			if (rsp.resultset.busline) return a;
		}
		if (rsp)
		{
			var orginalCount = dat.curresult;
			var arrFeature = toArr(dat.Feature || ((dat.data==undefined) ? false: dat.data.feature) || dat.feature);
			var arrResult = [];
//console.log("原始结果数目"+orginalCount);
			for(i=0;i<arrFeature.length;i++)
			{
				var tempFeature = arrFeature[i];
				var detail = tempFeature.Detail || tempFeature;
				var subcategory = detail.subcategory || detail.subcategorytxt;
				if (subcategory == "公交车站" || subcategory == "公交线路")
				{
//公交线路
					if (subcategory.indexOf("公交线路") >= 0)
					{
						//check is in blacklist
						var isInBlackList = false;
						var re = null, m = null;
						// check equal list
						var caption_str = tempFeature.caption.split("-");
						for (j = 0; j < blacklist.equal.length; j++)
						{						
							/*
							if (tempFeature.caption == blacklist.equal[j])
								{
									//yes it's in blacklist and throw it away
									isInBlackList = true;
									break;
								}
							*/
							//2012/8/21修改内容
							
							if(caption_str[caption_str.length-1] == "公交线路") {
								if (tempFeature.caption == blacklist.equal[j]+"-公交线路")
								{
									//yes it's in blacklist and throw it away
									isInBlackList = true;
									break;
								}
							}else{
								if (tempFeature.caption == blacklist.equal[j])
								{
									//yes it's in blacklist and throw it away
									isInBlackList = true;
									break;
								}
							}
						}
						// check spec list
						if (!isInBlackList) for (j = 0; j < blacklist.spec.length; j++)
						{						
							re = new RegExp('^' + blacklist.spec[j] + '.*');
							m = re.exec(tempFeature.caption);
							if (m != null)
							{
//console.log('[22]' + tempFeature.caption + '$' + blacklist.spec[j])
								//yes it's in blacklist and throw it away
								isInBlackList = true;
								break;
							}
						}
						// check norm list
						if (!isInBlackList) for (j = 0; j < blacklist.norm.length; j++)
						{						
							re = new RegExp('^' + blacklist.norm[j] + '.*');
							m = re.exec(tempFeature.caption);
							if (m != null)
							{
//console.log('[23]' + tempFeature.caption + '~' + blacklist.norm[j])
								//yes it's in blacklist and throw it away
								isInBlackList = true;
								break;
							}
						}
						if (isInBlackList == false) arrResult.push(tempFeature);
					}
//公交车站
					if (subcategory.indexOf("公交车站") >= 0)
					{
						//判断途径线路是否仅仅有一条黑线，如果不是则保留
						var passlines = detail.poidesc || tempFeature.busLines || tempFeature.busline;
//多条线路
						if (passlines)
						{
							if (passlines.indexOf(";") >= 0)
							{
								var arrLines = passlines.split(";");
								var arrFilteredLines = [];
								//检查每条线路看看是否是黑线
								for (k = 0; k < arrLines.length; k++)
								{
									var isInBlackList = false;
									var re = null, m = null;
									// check equal list
									for (j = 0; j < blacklist.equal.length; j++)
									{
										if (arrLines[k] == blacklist.equal[j])
										{
//console.log('[31]' + arrLines[k] + '=' + blacklist.equal[j])
											//yes it's in blacklist and throw it away
											isInBlackList = true;
											break;
										}
									}
									// check spec list
									if (!isInBlackList) for (j = 0; j < blacklist.spec.length; j++)
									{
										re = new RegExp('^' + blacklist.spec[j] + '.*');
										m = re.exec(arrLines[k]);
										if (m != null)
										{
//console.log('[32]' + arrLines[k] + '$' + blacklist.spec[j])
											//yes it's in blacklist and throw it away
											isInBlackList = true;
											break;
										}
									}
									// check norm list
									if (!isInBlackList) for (j = 0; j < blacklist.norm.length; j++)
									{
										re = new RegExp('^' + blacklist.norm[j] + '.*');
										m = re.exec(arrLines[k]);
										//if (arrLines[k].indexOf(blacklist.norm[j]) >= 0)
										if (m != null)
										{
//console.log('[33]' + arrLines[k] + '~' + blacklist.norm[j])
											//yes it's in blacklist and throw it away
											isInBlackList = true;
											break;
										}
									}
									if (isInBlackList == false)	arrFilteredLines.push(arrLines[k]);
								}
								if (arrFilteredLines && arrFilteredLines.length > 0)
								{
									if (tempFeature.busLines) tempFeature.busLines = arrFilteredLines.join(";");
									if (tempFeature.Detail && tempFeature.Detail.poidesc) tempFeature.Detail.poidesc = arrFilteredLines.join(";");
									arrResult.push(tempFeature);
								}
							}
//一条线路
							else
							{
								var isInBlackList = false;
								var re = null, m = null;
								//check equal list
								for (j = 0; j < blacklist.equal.length; j++)
								{
									if (passlines == blacklist.equal[j])
									{
//console.log('[41]' + passlines + '-' + blacklist.equal[j])
										//yes it's in blacklist and throw it away
										isInBlackList = true;
										break;
									}
								}
								//check spec list
								if (!isInBlackList) for (j = 0; j < blacklist.spec.length; j++)
								{
									re = new RegExp('^' + blacklist.spec[j] + '.*');
									m = re.exec(passlines);
									if (m != null)
									{
//console.log('[42]' + passlines + '-' + blacklist.spec[j])
										//yes it's in blacklist and throw it away
										isInBlackList = true;
										break;
									}
								}
								//check norm list
								if (!isInBlackList) for (j = 0; j < blacklist.norm.length; j++)
								{
									re = new RegExp('^' + blacklist.norm[j] + '.*');
									m = re.exec(passlines);
									if (m != null)
									{
//console.log('[43]' + passlines + '-' + blacklist.norm[j])
										//yes it's in blacklist and throw it away
										isInBlackList = true;
										break;
									}
								}
								if (isInBlackList == false) arrResult.push(tempFeature);
							}
						}
						else
						{
							//check is in blacklist
							var isInBlackList = false;
							var re = null, m = null;
							//check equal list
							for (j = 0; j < blacklist.equal.length; j++)
							{
								if (tempFeature.caption == blacklist.equal[j])
								{
//console.log('[51]' + tempFeature.caption + '=' + blacklist.equal[j])
									//yes it's in blacklist and throw it away
									isInBlackList = true;
									break;
								}
							}
							//check spec list
							if (!isInBlackList) for (j = 0; j < blacklist.spec.length; j++)
							{
								re = new RegExp('^' + blacklist.spec[j] + '.*');
								m = re.exec(tempFeature.caption);
								if (m != null)
								{
//console.log('[52]' + tempFeature.caption + '$' + blacklist.spec[j])
									//yes it's in blacklist and throw it away
									isInBlackList = true;
									break;
								}
							}
							//check norm list
							if (!isInBlackList) for (j = 0; j < blacklist.norm.length; j++)
							{
								re = new RegExp('^' + blacklist.norm[j] + '.*[0-9]+');
								m = re.exec(tempFeature.caption);
								if (m != null)
								{
//console.log('[53]' + tempFeature.caption + '~' + blacklist.norm[j])
									//yes it's in blacklist and throw it away
									isInBlackList = true;
									break;
								}
							}
							if (isInBlackList == false) arrResult.push(tempFeature);
						}
					}
				}
// businfo cluster list 公交线路
				else if(tempFeature.ownerid && tempFeature.type == "S")
				{
					//check is in blacklist
					var isInBlackList = false;
					var re = null, m = null;
					//check equal list
					for (j = 0; j < blacklist.equal.length; j++)
					{
						if (tempFeature.caption == blacklist.equal[j])
						{
//console.log('[61]' + tempFeature.caption + '-' + blacklist.equal[j])
							//yes it's in blacklist and throw it away
							isInBlackList = true;
							break;
						}
					}
					//check spec list
					if (!isInBlackList) for (j = 0; j < blacklist.spec.length; j++)
					{
						re = new RegExp('^' + blacklist.spec[j] + '.*');
						m = re.exec(tempFeature.caption);
						if (m != null)
						{
//console.log('[62]' + tempFeature.caption + '-' + blacklist.spec[j])
							//yes it's in blacklist and throw it away
							isInBlackList = true;
							break;
						}
					}
					//check norm list
					if (!isInBlackList) for (j = 0; j < blacklist.norm.length; j++)
					{
						re = new RegExp('^' + blacklist.norm[j] + '.*');
						m = re.exec(tempFeature.caption);
						if (m != null)
						{
//console.log('[63]' + tempFeature.caption + '-' + blacklist.norm[j])
							//yes it's in blacklist and throw it away
							isInBlackList = true;
							break;
						}
					}
					if (isInBlackList == false) arrResult.push(tempFeature);					
				}
				else
				{
					//其它分类直接添加到结果数组中,和黑线没关系
					arrResult.push(tempFeature);
				}
			}
		}
		var len = arrResult.length || 0;
		if (b=="businfo")
		{
			if (rsp.resultset)
			{
				a.response.resultset.pagesize = 10;
				a.response.resultset.curresult = (len > a.response.resultset.pagesize) ? a.response.resultset.pagesize : len;
				a.response.resultset.resultcount = len;
				a.response.resultset.pagecount = Math.ceil(len/a.response.resultset.pagesize);
				a.response.resultset.data.feature = arrResult;
			}
			else if(rsp.data)
			{
				if (a.response.data.resultcount) a.response.data.resultcount = len;
				if (a.response.data.feature) a.response.data.feature = arrResult;
			}
		}
		else if (rsp.Data)
		{
			if (rsp.Data.curresult) rsp.Data.curresult = (len > 10) ? 10 : len;
			if (rsp.Data.resultcount) rsp.Data.resultcount = len;
			if (rsp.Data.pagecount) rsp.Data.pagecount = Math.ceil(len/10);
			if (rsp.Data.Feature) rsp.Data.Feature = arrResult;
		}
		if (len <= 0)
		{
			a = {
				response: {
					Error: {
						mapservice: "NoResult",
						id: "-1",
						msg: "抱歉，没有找到相关的结果。"
					}
				}
			};
		}
//console.log("非黑线POI数目"+arrResult.length);
		return a;
}catch(e){/* console.log(e) */}finally{}
	}
}
	
function swPn(a)
{
	forArray([searchPn, searchFeaturePn, busPn, busInfoPn], d0);
	d1(a);
}

function swTb(a)
{
	forArray([busTb,searchRangeTb,searchFeatureTb,searchTb,searchAroundTb], d0);
	d1(a);
}

function toArr(a)
{
	return a && (!a.length || typeof (a) == "string") ? [a] : a;
}

function ce(a)
{
	return document.createElement(a)
}

function ct(a)
{
	return document.createTextNode(a)
}

function ci()
{
	var b = ce("iframe");
	b.setAttribute("frameborder", "0", 0);
	return b
}

function ap(a, b)
{
	a.appendChild(b)
}

function ev(a, b, c)
{
	return SEvent.addBuiltInListener(a, b, c)
}

function ev2(a, b, c)
{
	return SEvent.addListener(a, b, c)
}

function px(a)
{
	return a + "px"
}

function pa(a)
{
	a.style.position = "absolute"
}

function pr(a)
{
	a.style.position = "relative"
}

function lf(a, b)
{
	a.style.left = px(b)
}

/* @@ccl - start(A) */
function rg(a, b)
{
	a.style.right = px(b)
}
/* @@ccl - end(A) */

function tp(a, b)
{
	a.style.top = px(b)
}

function wd(a, b)
{
	a.style.width = px(b < 1 ? 1 : b)
}

function ht(a, b)
{
	a.style.height = px(b < 1 ? 1 : b)
}

function cd(a)
{
	var b = ce("div");
	if (a) b.id = a;
	return b
}

function cc(a)
{
	var b = ce("div");
	b.className = a;
	return b
}

function cbtn(a)
{
	var b = ce("input");
	b.type = "button";
	b.value = a;
	return b
}

function d0(a)
{
	a.style.display = "none"
}

function d1(a, b)
{
	a.style.display = !b ? "block" : ""
}

function v0(a)
{
	a.style.visibility = "hidden"
}

function v1(a)
{
	a.style.visibility = "visible"
}

function gts(a, b)
{
	return a.getElementsByTagName(b)
}

function gt(a, b)
{
	var c = gts(a, b);
	return c && c.length > 0 ? c[0] : null
}

function ga(a, b)
{
	if (a.getAttribute) return a.getAttribute(b)
}

function sa(a, b, c)
{
	a.setAttribute(b, c)
}

function sz(a, b)
{
	a.style.zIndex = b
}

function sv(a, b)
{
	var c;
	if (a && b != null)

	{
		c = typeof (a) == "object" ? a : _el(a);
		c.value = b

	}
}

function sf30(a)
{
	var b = a.style;
	b.opacity = 0.3;
	b.filter = "alpha(opacity=30)"
}

function gexy(a)
{
	return !a.offsetX ? _getRelativeClickPoint(a, a.srcElement || a.target) : {
		x: a.offsetX,
		y: a.offsetY
	};
}

function gd(a, b, c, d)
{
	return a.replace(/%cpid%/g, b).replace(/%dataid%/g, c).replace(/%uid%/g, d) + (b == "246" ? "&vam=1" : "")
};

function gr(a, b)
{
	return "http://p" + Math.abs(b) % 3 + ".go2map.com/seamless1/" + a.join("/") + ".JS"
}

function gf(a)
{
	if (_m) return _m.getFeatureById(a);
}

function gp(a)
{
	return _getParameter(a)
}

function gl(a)
{
	return a.length
}

function sc(a, b)
{
	if (typeof (a) == "string") a = _el(a);
	a.className = b
}

function sp(a, b)
{
	_setUrlHashParam(a, b)
};

function rmDoc(a)
{
	while (a.lastChild)
	{
		a.removeChild(a.lastChild)
	}
}

function getState()
{
	if (_m) return [_m.getCenterX(), _m.getCenterY(), _m.getLevelIndex()]
}

function getSwf(a)
{
	return document[a] || window[a]
}

function ctzm(a, b, c)
{
	var d;
	if (!b && !c)
	{
		d = a;
		a = d.x;
		b = d.y;
		c = d.level
	}
	if (a && b && c && _m) _m.coordRecenterTo(a, b, c)
}

function now()
{
	return +new Date
};

function forArray(a, b)
{
	var c = gl(a),
		i;
	for (i = 0; i < c; i++)
	{
		b(a[i], i)
	}
}

function forEach(a, b, c)
{
	for (var i in a)
	{
		if (c || !a.hasOwnProperty || a.hasOwnProperty(i))
		{
			b(a[i], i)
		}
	}
}

function upcs(a)
{
	if (a) return a.toUpperCase()
}

function g2mUrlEncode(a, e)
{
	var f = a.replace(/[^\x00-\xff]/g, function (b)
	{
		return escape(b)
	}),
		g = f,
		h = "",
		i, j;
	while ((i = g.indexOf("%")) > -1)
	{
		h += g.substring(0, i);
		j = g.substring(i);
		if (/^%[0-9a-fA-F]{2}/.test(j) || /^%u[0-9a-fA-F]{4}/.test(j)) h += "%";
		else h += "%25";
		g = g.substring(i + 1);
	}
	f = h + g;
	return !e ? f : f.replace(/%u/g, "%25u")
}(function ()
{
	function edushiBase(a)
	{
		a = a.toString().replace('M', '-');
		a = !a ? 0 : Math.abs(a);
		return "http://hbpic" + a % 3 + ".go2map.com/seamless1/"
	}
	
	var site = "http://www.bjbus.com/",
		engineSite = "http://lspengine.go2map.com/",
		//engineSite = "http://www.bjbus.com/",
		ePath = "EngineV5",
		//ePath = "busengine",
		sogou = "http://map.sogou.com/",
		isPubSite = window.location.href.indexOf(site) > -1,
		fPath = site + "map/";
	G = {
		path: fPath,
		lib_i: fPath + "lib/images/",
		city: "北京",
		ecity: "北京",
		engine: engineSite + ePath + "/Engine",
		postengine: engineSite + ePath + "/Engine",
		//engine: engineSite + ePath + "/Engine.php",
		//postengine: engineSite + ePath + "/Engine.php",
		cityengine: engineSite + ePath + "/CityInfo",
		detailengine: engineSite + ePath + "/detailinfo",
		savemapengine: engineSite + "MapRendition",
		itemUrl: sogou + "poi",
		outlinkengine: engineSite + ePath + "/outerlink",
		suggestengine: engineSite + "KeyWord/KeyWordClew",
		//suggestengine: engineSite + "busengine/KeyWord.php",
		geoEngine: engineSite + "geocoder/engine",
		tinyengine: engineSite + ePath + "/TinyCreate",
		messageengine: engineSite + "sendmessage",
		save2lsurl: engineSite + "lushu/navi",
		edushibase: edushiBase,
		APPID: "1361",
		QS: {},
		curSearchType: "bus",
		swAutoSubmit: 0,
		timeoutmsg: {
			response: {
				Error: {
					mapservice: "TimeOut",
					id: "-1",
					msg: "请求超时！"
				}
			}
		}
	};

	function $(a)
	{
		if (typeof a == "string")
		{
			a = document.getElementById(a);
		}
		return a
	}

	function A(a, b)
	{
		window[a] = b
	}
	A("go2map", {});

	function AA(a, b)
	{
		window["go2map"][a] = b
	}

	function B(a, b, c) //setStyle(element,propName,value)
	{
		if (!a || typeof c != "string") return;
		b = b ? b : "";
		c = c ? c : "";
		a.style[b] = c;
		return a
	}

	function C(a, b) //applyStyles(element,styles)
	{
		if (!b) return;
		if (typeof b == "string")
		{
			var re = /\s?([a-z\-]*)\:\s?([^;]*);?/gi,
				c;
			while ((c = re.exec(b)) != null)
			{
				B(a, c[1], c[2])
			}
		}
		else if (typeof b == "object")
		{
			for (var d in b)
			{
				B(a, d, b[d])
			}
		}
	}

	function D(a, b)
	{
		var d = ce(a.tag || 'div');
		for (var c in a)
		{
			if (c == "tag" || c == "children" || c == "cn" || c == "html" || c == "style" || typeof a[c] == "function") continue;
			if (c == "cls")
			{
				d.className = a["cls"];
			}
			else
			{
				if (d.setAttribute) sa(d, c, a[c]);
				else d[c] = a[c];
			}
		}
		if (a.html)
		{
			d.innerHTML = a.html
		}
		C(d, a.style);
		if (b) ap(b, d);
		return d
	}

	function E()
	{
		var t = this;
		t.delay = 20000;
		t.c = 0;
		t.root = G.engine;
	}
	var Ep = E.prototype = new G2MObject();
	Ep.send = function (a, b, c, f, d) //(id,url,callback,isDynBC,onDestroy)
	{
		b = b + "";
		b = b.indexOf('?') > -1 ? b + "&fromuser=bjbus" : b;
//console.log(b);
		var g = this,
			w = window,
			h = gt(w.document, "head"),
			i, p = b;
		if (!h)
		{
			if (d)
			{
				d(a, b)
			}
			return
		}
		if (!w["SGS"])
		{
			w["SGS"] = {}
		}
		i = !a ? "_" + (new Date).getTime().toString(36) + (g.c++).toString(36) : a;
		var j = ce("script"),
			l = null;
		g.cancel($e(i));
		if (g.delay > 0)
		{
			l = w.setTimeout(function ()
			{
				g.removeLoader(i, j);
				if (d) d(a, b);
				Log.write("scs timeout:" + b)
			}, g.delay)
		}
		if (c)
		{
			w["SGS"][i] = function (e)
			{
				Log.write("callback:" + i);
				w.clearTimeout(l);
				g.removeLoader(i, j);
				try
				{
					c(e, i, b);
				}
				catch (ex)
				{
					Log.write("scs.send[SGS." + i + "] error:" + ex.description)
				}
			};
		}
		if (f) p += "&cb=SGS." + i;
		p = g2mUrlEncode(p, 1);
		sa(j, "type", "text/javascript");
		sa(j, "id", i);
		sa(j, "charset", "gb2312");
		sa(j, "src", p);
		ap(h, j);
		Log.write("sgs:" + p);
		return {
			id: i,
			url: p
		}
	};
	Ep.cancel = function (a)
	{
		if (a && a.id)
		{
			var b = $e(a.id);
			if (b && b.tagName == "SCRIPT" && typeof window["SGS"][a.id] == "function")
			{
				a.delay && window.clearTimeout(a.delay);
				this.removeLoader(a.id, b)
			}
		}
	};
	Ep.removeLoader = function (a, b)
	{
		window.setTimeout(function ()
		{
			if (b.parentNode)
			{
				b.parentNode.removeChild(b);
			}
			if (window["SGS"][a])
			{
				delete window["SGS"][a]
			}
		}, 0)
	};

	function F(a)
	{
		var e = document,
			b = gts(e, "link"),
			i, c, d = gt(e, "head");
		for (i = 0; i < b.length; i++)
		{
			if (b[i].href == a) return;
		}
		c = ce("link");
		c.href = a;
		c.rel = "stylesheet";
		c.type = "text/css";
		ap(d, c);
	}
	var JSCLSCODEPOOL = [],
		JSCLSCBS = [];

	function H(a, e)
	{
		var b = JSCLSCODEPOOL,
			c = a.split("."),
			f = JSCLSCBS,
			path;
		if (b[a]) if (e) e(b[a]);
		else b[a]();
		else if (!f[a])
		{
			f[a] = [e];
			// ----------------------- //
			if(c[0]=="detail" && c[1].indexOf("TP") > -1)
				path = sogou + 'v50y/';
			else
				path = G.path;
			// ----------------------- //
			scs.send(c.join("_"), path + "js/" + c.join("/") + ".js", function (d)
			{
				if (d)
				{
					b[a] = d();
					forArray(f[a], function (h)
					{
						if (h) h(b[a]);
						else b[a]()
					})
				}
			})
		}
		else f[a].push(e);
	}

	function I(a, b)
	{
		JsClass("modules.citydata", function (e)
		{
			b(e(a));
		})
	};

	function J(a, c)
	{
		var b;
		if (typeof (a) == "string")
		{
			b = a;
			I(b, ctzm);
		}
		else if ((typeof (a) == "object" && !c && (!a.x || !a.y || !a.level || !a.bus)))
		{
			b = a.city || a.name;
			I(b, ctzm);
		}
		else
		{
			b = a.city || a.name;
			ctzm(a)
		}
		SEvent.trigger(G, "activechangecity", b);
		G.city = b;
	}

	function K()
	{
		var t = this,
			b;
		t.id = "ifms_callback";
		t.form = _el("frm_sender");
		t.ipts = [];
		t.root = G.postengine;
		t.cbs = window["IFMS"] = {};
		t.delay = 20000;
	}
	var ifmCt = 1;
	K.prototype.send = function (a, b, p, q) //(url,callback,timeoutCallback,id)
	{
		var t = this,
			c = a.indexOf("?"),
			d = t.ipts,
			e, f, g, h = t.form;
		if (!h) return;
		a = g2mUrlEncode(a);
		e = c < 0 ? t.root : a.substring(0, c);
		h.action = e;
		f = a.substring(c + 1).split("&");
		q = !q ? t.id + ifmCt++ : q;
		f.push("cb=parent.IFMS." + q);
		g = Math.max(f.length, d.length);
		for (var i = 0, j, k, l, m = "", n = ""; i < g; i++)
		{
			j = f[i];
			k = d[i];
			if (j)
			{
				l = j.indexOf("=");
				m = j.substring(0, l);
				n = j.substring(l + 1)
			}
			if (!k)
			{
				k = d[i] = ce("input");
				k.type = "text";
				ap(h, k)
			}
			k.name = m;
			k.value = n
		}
		if (t.delay > 0)
		{
			window.clearTimeout(t.timer);
			t.timer = window.setTimeout(function ()
			{
				if (p) p(a, q);
			}, t.delay)
		}
		if (b) t.cbs[q] = function (z, v)
		{
			window.clearTimeout(t.timer);
			b(z, v, a, q);
		};
		h.submit();
	};
	function initMap()
	{
		function shb(a)
		{
			if (a)
			{
				a = a.split(",");
				if (_m) _m.setHyBrid(a[0] == "1", a[1] == "1")
			}
		}
		var c = gp("c"),
			city = gp("city"),
			dc = getCookie("sogoumapdefaultcity"),
			lq = gp("lq"),
			hb = gp("hb"),
			i, x, y, z;
		if (!dc) dc = getCookie("activecity");
		if (!lq) lq = gp("kw");
		Log.refer = gp("refer");
		_m = new MapClient(_el("maparea"));
		_m.isInfoWinAutoOpen = false;
		//_m.copyrightType = 0;
		_m.setStyleLibraryRoot(G.path + "lib/style/");
		_m.isZoomAtMspt = getCookie("zoomtype") == "2";
		if (c)
		{
			c = c.split(",");
			ctzm(c[0], c[1], c[2]);
			if (lq) G.isFixView = true
		}
		if (city)
		{
			G.city = city;
			if (!c) I(city, ctzm)
		}
		else if (dc)
		{
			i = dc.split(",");
			G.city = i[0];
			if (!c) ctzm(i[1], i[2], i[3])
		}
		else
		{
			i = ipCity;
			if (i && i.x && i.y && i.city != "全国")
			{
				G.city = i.city;
				if (!c) ctzm(i)
			}
		}
		_m.init();
		if (hb) shb(hb);
		var em = gp('em');
		if (em && em == '1') _m.eMapEm = 1;
	}
	A("G", G);
	A("onresize", function (a)
	{
		window.clearTimeout(G.RESIZETIMER);
		G.RESIZETIMER = window.setTimeout(resizePage, 100)
	});
	A("initMap", initMap);
	A("creatDom", D);
	A("scs", new E());
	A("loadCss", F);
	A("JsClass", H);
	A("getCityInfo", I);
	A("setCity", J);
	A("ifmsender", new K());
})()
StyleLib.preLoadJson([
{
	id: "S01",
	img: {
		src: "6702.GIF",
		width: 6,
		height: 6,
		pointcoord: "3,3"
	}
}]);
StyleLib.preLoadJson([
{
	id: "C1",
	mask: {
		src: G.lib_i + "m1.png",
		width: 21,
		height: 28,
		pointcoord: "10,28",
		shadowoffset: "8,8",
		map: "10,27,1,13,1,8,7,0,14,0,20,8,20,13"
	},
	shadow: {
		src: G.lib_i + "c1.png",
		width: 412,
		height: 146,
		pointcoord: "10,28",
		clip: "381,78,31,28"
	}
}], 1);
StyleLib.preLoadJson([
{
	id: "C3",
	mask: {
		src: G.lib_i + "m3.png",
		width: 23,
		height: 29,
		pointcoord: "12,29",
		shadowoffset: "8,8",
		map: "1,7,7,1,15,1,21,7,21,16,11,27,1,17"
	},
	shadow: {
		src: G.lib_i + "c31.png",
		width: 51,
		height: 156,
		pointcoord: "11,29",
		clip: "1,31,48,29"
	}
}], 1);
StyleLib.preLoadJson([
{
	"v:stroke": {
		"xmlns:v": "v",
		color: "#3366FF",
		weight: "5",
		endcap: "Round",
		opacity: "50%",
		startArrow: "None",
		endArrow: "None",
		dashstyle: "Solid",
		src: "",
		filltype: "solid"
	},
	id: "L01"
}, {
	"v:stroke": {
		"xmlns:v": "v",
		color: "#000",
		weight: "5",
		endcap: "Round",
		opacity: "60%",
		startArrow: "None",
		endArrow: "None",
		dashstyle: "Solid",
		src: "",
		filltype: "solid"
	},
	id: "L36"
}, {
	"v:stroke": {
		"xmlns:v": "v",
		color: "#F00",
		weight: "5",
		endcap: "Round",
		opacity: "60%",
		startArrow: "None",
		endArrow: "None",
		dashstyle: "Solid",
		src: "",
		filltype: "solid"
	},
	id: "L37"
}, {
	"v:stroke": {
		"xmlns:v": "v",
		color: "#0000FF",
		weight: "3",
		endcap: "Round",
		opacity: "75%",
		startArrow: "None",
		endArrow: "Classic",
		dashstyle: "ShortDash",
		src: "",
		filltype: "solid"
	},
	id: "L38"
}, {
	"v:stroke": {
		"xmlns:v": "v",
		color: "#43A5F1",
		weight: "5",
		endcap: "Round",
		opacity: "85%",
		startArrow: "None",
		endArrow: "None",
		dashstyle: "Solid",
		src: "",
		filltype: "solid"
	},
	id: "L39"
}, {
	"v:stroke": {
		"xmlns:v": "v",
		color: "#00f",
		weight: "3",
		endcap: "Round",
		opacity: "75%",
		startArrow: "None",
		endArrow: "None",
		dashstyle: "ShortDash",
		src: "",
		filltype: "solid"
	},
	id: "L40"
}, {
	"v:stroke": {
		"xmlns:v": "v",
		color: "red",
		weight: "3",
		endcap: "Round",
		opacity: "100%",
		startArrow: "None",
		endArrow: "None",
		dashstyle: "Solid",
		src: "",
		filltype: "solid"
	},
	id: "L41"
}, {
	"v:stroke": {
		"xmlns:v": "v",
		color: "#43A5F1",
		weight: "3",
		endcap: "Round",
		opacity: "85%",
		startArrow: "None",
		endArrow: "None",
		dashstyle: "Dash",
		src: "",
		filltype: "dash"
	},
	id: "L42"
}, {
	"v:stroke": {
		"xmlns:v": "v",
		color: "#0000ff",
		weight: "1",
		endcap: "Flat",
		opacity: "100%",
		startArrow: "None",
		endArrow: "Classic",
		dashstyle: "Solid",
		src: "",
		filltype: "solid"
	},
	id: "L28"
}, {
	"v:stroke": {
		"xmlns:v": "v",
		color: "#B2391C",
		weight: "5",
		endcap: "Round",
		opacity: "70%",
		startArrow: "None",
		endArrow: "None",
		dashstyle: "Solid",
		src: "",
		filltype: "solid"
	},
	id: "L50"
}, {
	"v:stroke": {
		"xmlns:v": "v",
		color: "#0000ff",
		weight: "5",
		endcap: "Round",
		opacity: "70%",
		startArrow: "None",
		endArrow: "None",
		dashstyle: "Solid",
		src: "",
		filltype: "solid"
	},
	id: "L51"
}, {
	"v:stroke": {
		"xmlns:v": "v",
		color: "#8B00FF",
		weight: "5",
		endcap: "Round",
		opacity: "70%",
		startArrow: "None",
		endArrow: "None",
		dashstyle: "Solid",
		src: "",
		filltype: "solid"
	},
	id: "L52"
}, {
	"v:stroke": {
		"xmlns:v": "v",
		color: "#3366FF",
		weight: "3",
		endcap: "Round",
		opacity: "80%",
		startArrow: "None",
		endArrow: "None",
		dashstyle: "Solid",
		src: "",
		filltype: "solid"
	},
	id: "L43"
}, {
	"v:stroke": {
		"xmlns:v": "v",
		color: "#FF0000",
		weight: "3",
		endcap: "Round",
		opacity: "100%",
		startArrow: "None",
		endArrow: "None",
		dashstyle: "Solid",
		src: "",
		filltype: "solid"
	},
	id: "L44"
}, {
	"v:stroke": {
		"xmlns:v": "v",
		color: "#8B00FF",
		weight: "3",
		endcap: "Round",
		opacity: "100%",
		startArrow: "None",
		endArrow: "None",
		dashstyle: "Solid",
		src: "",
		filltype: "solid"
	},
	id: "L45"
}, {
	"v:stroke": {
		"xmlns:v": "v",
		color: "#FF0000",
		weight: "5",
		endcap: "Round",
		opacity: "100%",
		startArrow: "None",
		endArrow: "None",
		dashstyle: "Solid",
		src: "",
		filltype: "solid"
	},
	id: "L46"
}, {
	"v:stroke": {
		"xmlns:v": "v",
		color: "#8B00FF",
		weight: "5",
		endcap: "Round",
		opacity: "100%",
		startArrow: "None",
		endArrow: "None",
		dashstyle: "Solid",
		src: "",
		filltype: "solid"
	},
	id: "L47"
}, {
	"v:stroke": {
		"xmlns:v": "v",
		color: "#3366FF",
		weight: "1pt",
		endcap: "Round",
		opacity: "100%",
		startArrow: "None",
		endArrow: "None",
		dashstyle: "ShortDashDot"
	},
	"v:fill": {
		"xmlns:v": "v",
		on: "true",
		color: "#ffff00",
		color2: "#ffff00",
		type: "pattern",
		src: "",
		opacity: "30%"
	},
	id: "R01"
}, {
	"v:stroke": {
		"xmlns:v": "v",
		color: "#0000ff",
		weight: "1pt",
		endcap: "Round",
		opacity: "50%",
		startArrow: "Oval",
		endArrow: "Classic",
		dashstyle: "ShortDot"
	},
	"v:fill": {
		"xmlns:v": "v",
		on: "true",
		color: "#ffffff",
		color2: "",
		type: "pattern",
		src: "",
		opacity: "30%"
	},
	id: "R12"
}, {
	"v:stroke": {
		"xmlns:v": "v",
		color: "#0000ff",
		weight: "1px",
		endcap: "Round",
		opacity: "100%",
		startArrow: "Oval",
		endArrow: "Classic",
		dashstyle: "Solid"
	},
	"v:fill": {
		"xmlns:v": "v",
		on: "true",
		color: "#0099ff",
		color2: "",
		type: "solid",
		src: "",
		opacity: "10%"
	},
	id: "R18"
}]);
function removeAllFeatures(a)
{
	var fs;
	if (_m)
	{
		fs = _m.map.features
	}
// console.log('removeAllFeatrues['+a+']')
// console.log(fs)
	removeFeatrues(fs);
	/*
	for (var i = 0; i < fs.length; i++)
	{
		_m.map.removeFeature(fs[i]);
		if (c && c.feature == fs[i]) b.closeInfoWindow();
	}
	*/
}

function removeFeatrues(a)
{
	if (!a) return;
	var fs, b, c;
	if (a.features)
	{
		fs = a.features;
	}
	else
	{
		fs = a
	}
	if (_m)
	{
		b = _m.map;
		c = b.infoWindow
	}
	for (var i = 0; i < fs.length; i++)
	{
		_m.map.removeFeature(fs[i]);
		if (c && c.feature == fs[i]) b.closeInfoWindow();
	}
}

function adjustByFeatures(a, level)
{
	if (typeof a == "string" || typeof a == "number") a = gf(a + "");
	if (!a) return;
	var l = typeof (level) != "undefined" ? (level || null) : 17;
	if (a.type == "S")
	{
		_m.coordRecenterTo(a.points[0].x, a.points[0].y, l);
		return;
	}
	var fs = toArr(a),
		fn;
	fn = new FeatureNode();
	fn.type = "R";
	for (var i = 0; i < fs.length; i++)
	{
		fn.bounds = !fn.bounds ? fs[i].bounds : Bounds.merge(fn.bounds, fs[i].bounds);
	};
	_m.adjustMapFitFeature(fn, l);
}
FeatureNode.prototype.focus = function ()
{
	var t = this,
		a = t.element;
	if (a)
	{
		a.focus && a.focus();
		if (a.label) v1(a.label);
	}
};
FeatureNode.prototype.blur = function ()
{
	var t = this,
		a = t.element;
	if (a)
	{
		a.blur && a.blur();
		if (a.label) v0(a.label)
	}
}
initMap();
(function ()
{
	String.prototype.byteLength = function ()
	{
		return this.replace(/[^\x00-\xff]/g, "--").length;
	};
	String.prototype.subByte = function (n)
	{
		if (this.byteLength() <= n) return this.toString();
		for (var i = Math.floor((n = n - 2) / 2), l = this.length; i < l; i++)
		if (this.substr(0, i).byteLength() >= n) return this.substr(0, i) + "\u2026";
		return this.toString();
	};
	// Return new array with duplicate values removed
	Array.prototype.unique = function ()
	{
		var a = [];
		var l = this.length;
		for (var i = 0; i < l; i++)
		{
			for (var j = i + 1; j < l; j++)
			{
				// If this[i] is found later in the array
				if (this[i] === this[j]) j = ++i;
			}
			a.push(this[i]);
		}
		return a;
	};
	
	function addEvent()
	{
		var a = _el("div_hdivider"),
			b = _el("div_scont"),
			c = "className",
			d = "open",
			e = "focus";
		G.setResultView = function (isShow)
		{
			if (isShow)
			{
				a[c] = a.id;
				b[c] = "";
			}
			else
			{
				a[c] = a.id + " " + d;
				b[c] = "hide";
			}
		}
		ev(a, "click", function ()
		{
			G.setResultView(a[c].indexOf(d) != -1)
			resizePage && resizePage();
		});
		ev(a, "mouseover", function ()
		{
			if (a[c].indexOf(e) == -1)
			{
				a[c] += " " + e
			}
		});
		ev(a, "mouseout", function ()
		{
			a[c] = a.id + (a[c].indexOf(d) == -1 ? "" : " " + d)
		});
	}
	addEvent();
	var types, tagEvent, oSelect = null,
		oLight = null,
		cn = "className",
		sl = "select";
	types = {
		bus: "bus,tags_bus",
		searchrange: "searchrange,tags_searchrange",
		searchfeature: "searchfeature,tags_searchfeature",
		search: "search,tags_search",
		searcharound: "searcharound,tags_searcharound"
	}

	function getTag(a)
	{
		return _el(a.toString().split(",")[1])
	}
	tagEvent = {
		mouseover: function ()
		{
			if (!this || this[cn] == sl) return;
			if (oLight && oLight[cn] != sl) oLight[cn] = "";
			this[cn] = "c";
			oLight = this;
		},
		mouseout: function ()
		{
			if (this && this[cn] != sl) this[cn] = ""
		},
		click: function (type)
		{
			return function ()
			{
try{
				switch(type)
				{
				case "bus":
					JsClass("modules.bus", function(z)
					{
						z && z("reset") && z.reset();
					});
					break;
				case "searchrange":
					$("frmSearchRangeTb").reset();
					/* JsClass("modules.search1", function (z)
					{
						z && z("reset") && z.reset("searchrange");
					}) */
					break;
				case "searchfeature":
					$("frmSearchFeatureTb").reset();
					/* JsClass("modules.search1", function (z)
					{
						z && z("reset") && z.reset("searchfeature");
					}) */
					break;
				case "search":						
					$("frmSearchTb").reset();
					/* JsClass("modules.search1", function (z)
					{
						z && z("reset") && z.reset("search");
					}) */
					break;
				case "searcharound":
					$("frmSearchAroundTb").reset();
					/* JsClass("modules.search1", function (z)
					{
						z && z("reset") && z.reset("searcharound");
					}) */
					break;
				}
}catch(e){/*console.log(e)*/}finally{}
				swTag(type);
			}
		}
	}
	for (var i in types)
	{
		if (typeof (types[i]) != "string") continue;
		var tag = getTag(types[i]);
		if (!tag) continue;
		tag.onmouseover = tagEvent.mouseover;
		tag.onmouseout = tagEvent.mouseout;
		tag.onclick = tagEvent.click(i)
	}

	function selectTag(a)
	{
		var b = a;
		switch (a)
		{
			case "search":
				//_el("search_tips_info").innerHTML = "在输入搜索条件时，允许输入个别错别字或拼音输入，如搜索信息不正确，系统会自动纠错，并且提供多个相关地点信息和准确的地理位置供您参考。找到您想要去的地点后可链接到“公交换乘”查询，方便您去下一个地点。";				
				break;
			case "searcharound":
				//_el("search_tips_info").innerHTML = "当您在北京某地点时，想在周边查找购物、酒店、银行、景点等场所。您可以输入距离范围以及您要去的场所类型，点击查询。相关的信息一目了然，并提供最佳的乘车路线供您参考，方便您的出行。";
				b = "search";
				break;
			case "searchrange":
				//_el("search_tips_info").innerHTML = "用户可根据自己想查找的类别进行选择，在地图中用“矩形”圈出选择范围，电子地图会自动在范围内标出您想查询类别的多个目标,并显示相关的信息。";
				b = "search";
				break;
		}
		swPn(_el("div_" + b + "_panel"));
		if (a != "businfo") swTb(_el("div_" + a + "_qstbar"));	
		if (types[a]!=undefined)
		{
			var tag = getTag(types[a]);
			var parenttag = tag.parentNode;
			if (tag == oSelect) return;
			if (oSelect) { 
				oSelect[cn] = "";
				var parentoselect = oSelect.parentNode;
				parentoselect.className = "";
			}	
			if (tag)
			{
				tag[cn] = sl;
				parenttag.className = "select";
				oSelect = tag;
			}
		}
	}
	window["selectTag"] = selectTag;

	function swTag(a, b)
	{
		JsClass("modules." + a, function (z)
		{
			z("sync");
			if (b) b()
		})
	}
	G.setCurTag = swTag;
	
	/* @@ccl - start(B) */
	var bc = $("tool_ctr"),
		toolTipWin = null,
		curSelect = null,
		ckl;
	var ckl = getCookie("m_t_b") || "",
		_ckl = {};
	if (ckl && ckl != "")
	{
		for (var i = 0, o = ckl.split("|"), _o; i < o.length; i++)
		{
			_o = o[i].split("_");
			_ckl[_o[0]] = _o[1].substring(1) * 1;
		}
	}
	var tsLeft = [
		['作标记', '临时标记位置点，分享给朋友', 'usertip', 1, 1],
		['测距', '单击确定路径，双击结束', 'ruler', 1, 1],
		['清空', '清除地图上的标记', 'clear', 0, 1],
		['截图', '复制、保存地图图片', 'savemap', 1, 1],
		['默认城市', '设置默认访问城市', 'city', 0, 1],
		['漫游', '按住鼠标拖动地图', 'pan', 0, 1],
		['拉框放大', '在地图上拉框放大', 'fzin', 1, 1],
		['拉框缩小', '在地图上拉框缩小', 'fzout', 1, 1],
		/*['', '更多工具', 'more', 0, 1],
		['复制链接', '复制链接', 'copy', 1, 1],*/
		['打印', '打印', 'print', 0, 1],
		['全屏', '全屏', 'fullscreen', 0, 1],
		['收藏', '收藏', 'collection', 0, 1],
		['设置', '设置', 'setting', 0, 1]
		
	];
	var isFull = false;
	function selectModule(a)
	{
		JsClass("modules." + a, function (z)
		{
			z(_m)
		});
	}

	function run1(type, el)
	{
		switch (type)
		{
		case "more":
			/* JsClass("modules.moreTool", function (z)
			{
				z(el, tsLeft, ckl, _ckl)
			})*/
			break;
		case "clear":
			_m.clearAll();
			break;
		case "pan":
			_m.selectTool("PAN");
			break;
		case "city":
			_m.resetMap();
			break;
		case "fzin":
		case "fzout":
		case "ruler":
		case "usertip":
			selectModule(type);
			break;
		case "savemap":  /*@@ccl*/
		case "print":
			var a = false,
				cb = printCB[G.curSearchType];
			if (cb)
			{
				SEvent.trigger(G, "getprintparams" + G.curSearchType, function ()
				{
					if (el) Array.prototype.push.call(arguments, true);
					a = cb.apply(null, arguments)
				});
			}
			if (!a)
			{
				window.print && window.print();
			}
			break;	
		case "fullscreen":
			fsr(!isFull);
			break;			
		case "collection":
			AddFavorite(location.href, document["title"]);
			break;
		case "setting":
			showSetting(el);
			break;	
		}
	}

	function fsr(a)
	{
		if (!a)
		{
			d1(_el("header"));
			d1(_el("div_scont"));
		}
		else
		{
			d0(_el("header"));
			d0(_el("div_scont"));
		}
		setTimeout(function (a)
		{
			G.setResultView(a);
			resizePage & resizePage();
		}, 200, !a);
		isFull = a;
	};
	
	function resetCurBtn()
	{
		if (curSelect) unSelect(curSelect)
		curSelect = null;
	}
	SEvent.addListener(_m.map, "esc", resetCurBtn);
	SEvent.addListener(G, "resettoolbtn", resetCurBtn);

	function unSelect(o)
	{
		o.className = o.className.split(" ")[0];
		run1("pan");
	}

	function parseHtml(ts)
	{
		var w = 25,
			a, div, cls, type = ts[2],
			isSelect = !! ts[3],
			isShow = !! ts[4];
		//if (ts[0].length >= 3) w = 75
		//else if (ts[0] == '') w = 25
		div = creatDom(
		{
			title: ts[1],
			cls: type
		}, bc);
		wd(div, w);
		creatDom(
		{
			tag: "img",
			cls: "icon",
			src: G.path + "images/pixel.gif",
			alt: ts[0]
		}, div);
		
		//div.innerHTML += ts[0];
		div.innerHTML += "";
		
		if (typeof (_ckl[type]) != "undefined")
		{
			//if (!_ckl[type]) d0(div);
		}
		else if (!isShow) d0(div);
		ev(div, "mouseover", function ()
		{
			if (curSelect == div && isSelect) return;
			div.className = type + " f" + w;
		});
		ev(div, "mouseout", function ()
		{
			if (curSelect == div && isSelect) return;
			div.className = type;
		});
		ev(div, "mousedown", function ()
		{
			div.className = type + " s" + w;
			if (curSelect && curSelect != div)
			{
				unSelect(curSelect);
				curSelect = null;
				SEvent.trigger(_m.map, "esc");
			}
		});
		ev(div, "mouseup", function ()
		{
			if (curSelect != div)
			{
				if (!isSelect) div.className = type + " f" + w;
				run1(type, div);
				isSelect && (curSelect = div);
			}
			else
			{
				unSelect(curSelect);
				curSelect = null;
				SEvent.trigger(_m.map, "esc");
			}
		});
		ts.obj = div;
	}
	var ckl_str = "";
	for (var i = 0; i < tsLeft.length; i++)
	{
		parseHtml(tsLeft[i]);
		ckl_str += "|" + tsLeft[i][2] + "_%" + (typeof (_ckl[tsLeft[i][2]]) != "undefined" ? _ckl[tsLeft[i][2]] : tsLeft[i][4]);
	}
	setCookie("m_t_b", ckl_str.substring(1), new Date(2088, 8, 8));
	var bc = $("setbar_ctr"),
		setWin = null;
	var tsRight = [
		/*['打印', 'print'],
		['复制链接', 'copy'],
		['收藏', 'collection'],
		['设置', 'setting']*/
	];

	function focus(a)
	{
		return function ()
		{
			this.className = a + " focus"
		}
	};

	function blur(a)
	{
		return function ()
		{
			this.className = a
		}
	};

	function showSetting()
	{
		var args = arguments;
		JsClass("modules.setting", function (z)
		{
			z && z.apply(null, [tsLeft, ckl, _ckl].concat(args[0]))
		});
	}
	ev2(G, "showSetting", showSetting);

	function AddFavorite(sURL, sTitle)
	{
		if (document.all)
		{
			window.external.addFavorite(sURL, sTitle);
		}
		else if (window.sidebar)
		{
			window.sidebar.addPanel(sTitle, sURL, "");
		}
	} 
	ev2(G, "AddFavorite", AddFavorite);
	
	function obj2str(o)
	{
		var r = [],
			b;
		if (typeof o == "string") return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
		if (typeof o == "undefined") return "";
		if (typeof o == "object")
		{
			if (o === null) return "null";
			else if (!o.sort || !o.length)
			{
				for (var i in o)
				{
					b = /[^\w]/.test(i);
					if (i != "getClassName" && i != "setTimeout" && i != "eventHandler") r.push((!b ? "" : "\"") + i + (!b ? "" : "\"") + ":" + obj2str(o[i]))
				}
				r = "{" + r.join() + "}"
			}
			else
			{
				for (var i = 0; i < o.length; i++) r.push(obj2str(o[i]));
				r = "[" + r.join() + "]"
			}
			return r;
		}
		return o.toString();
	}
	var printCB = {
		"nav": function (type, data, isToolBtn)
		{
			if (data)
			{
				var a, b;
				a = ce("form");
				ap(document.body, a);
				a.action = G.path + "print/print" + type + ".jsp?a=1";
				a.method = "post";
				a.target = "_blank";
				b = ce("input");
				b.name = "nav";
				b.type = "hidden";
				ap(a, b);
				sa(b, "value", obj2str(
				{
					a: data
				}));
				a.submit();
				return true;
			}
			return false;
		}
	}

	function run2(type, el)
	{
		switch (type)
		{
		case "setting":
			showSetting();
			break;
		case "print":
			var a = false,
				cb = printCB[G.curSearchType];
			if (cb)
			{
				SEvent.trigger(G, "getprintparams" + G.curSearchType, function ()
				{
					if (el) Array.prototype.push.call(arguments, true);
					a = cb.apply(null, arguments)
				});
			}
			if (!a)
			{
				window.print && window.print();
			}
			break;
		case "collection":
			AddFavorite(location.href, document["title"]);
			break;
		case "copy":
			JsClass("modules.copyLink", function (z)
			{
				z && z(bc)
			});
			break;
		}
	}
	ev2(G, "print", function ()
	{
		run2("print")
	});
	for (var i = 0, a; i < tsRight.length; i++)
	{
		a = creatDom(
		{
			title: tsRight[i][0],
			name: tsRight[i][1]
		}, bc);
		creatDom(
		{
			tag: "span",
			cls: tsRight[i][1]
		}, a);
		ev(a, "mouseover", function (_a)
		{
			return function ()
			{
				_a.className = "focus"
			}
		}(a));
		ev(a, "mouseout", function (_a)
		{
			return function ()
			{
				_a.className = ""
			}
		}(a));
		ev(a, "click", function (type)
		{
			return function (e)
			{
				run2(type, a);
			}
		}(tsRight[i][1]))
	}
	/* @@ccl - end(B) */
	
})();
/**
 * 地图控制条模块
 * @author <a href="mailto:zhengxu@sohu-inc.com">许峥</a>
 * @class
 * @param {MapClient} mapClient MapClient类的实例
 * @param {Object} options (可选)参数设置
 * @param {string} options.mode （可选）等级条的样式(min,max,auto)（默认是auto）
 * @param {number} options.left （可选）距地图容器左上角的left（默认是0）
 * @param {number} options.top （可选）距地图容器左上角的top（默认是0）
 * @example
 * event_trigger changelevel 拖动等级条使等级改变时触发
 * event_trigger movebtn 点击重置(0)、上(1)、下(2)、左(3)、右(4)按钮时触发
 */

/* @@ccl - start(C) */
function MapCtrl(m, options)
{
	/**#@+
	 @ignore
	 */
	var _t = this,
		hb, dok, main, zin, zout, div2, cd = creatDom;
	_t.m = m;
	_t.doc = document;
	_t.level = _t.m.getLevelIndex(); //初始地图等级
	_t.maxLevel = 18; //最大级别
	hb = _t.m.getHbState();
	_t.mapType = (hb[0] == 0 ? 1 : 2); //1是地图 2是卫星
	_t.isHbLw = hb[1] != 0;
	_t.maxWidth = 350; //最大宽度
	_t.setOptions(options);
	var gPath = (window.G ? G.path : "");
	var IP = gPath + "images/mapCtrl.png"; //图片地址
	var IW = 282,
		IH = 166; //图片原始尺寸
	var nullImg = "url(" + gPath + "images/pixel.gif)";
	var bc = m.getMapAreaContainer(); //容器
	if (!bc) return;

	function _offsetPositionAbsolute(a)
	{
		var b = {
			"x": 0,
			"y": 0
		};
		while (a)
		{
			b.x += a.offsetLeft - a.scrollLeft;
			b.y += a.offsetTop - a.scrollTop;
			a = a.offsetParent;
		}
		return b;
	}

	function setStyle(o, s)
	{
		if (!o || !o.style || !s) return;
		for (var i = 0, ss = s.split(";"), style; i < ss.length; i++)
		{
			style = ss[i].split(":");
			if (o.style[style[0]] || o.style[style[0]] == "") o.style[style[0]] = style[1];
		}
		return o;
	}

	function $ss(el, position, width, height, left, top, cursor, background, otherStyle)
	{
		if (!el || !el.style) return;
		try
		{
			position != null && (el.style.position = position);
			width != null && (el.style.width = width + "px");
			height != null && (el.style.height = height + "px");
			left != null && (el.style.left = left + "px");
			top != null && (el.style.top = top + "px");
			cursor != null && (el.style.cursor = cursor);
			background != null && (el.style.background = background);
			setStyle(el, otherStyle);
		}
		catch (e)
		{}
		return el;
	}

	function setUnSelect(o)
	{
		if (!o || o.onselectstart) return;
		o.onselectstart = function ()
		{
			return false;
		}
	}

	function createBone()
	{
		//鱼骨=========================================================================================================
		if (_t.sliding && !_t._7)
		{
			_t._7 = new ImageClip(IP, 212, 32, IW, IH).setStyle(
			{
				height: 98,
				width: 18,
				top: 20,
				left: 8
			}).setEvent(
			{
				mouseover: function (a, b)
				{
					a.sip(231, 32);
					_t.showTip.apply(_t)
				},
				mouseout: function (a, b)
				{
					a.sip(212, 32);
					_t.hideTip.apply(_t);
				}
			});
			ap(div2, _t._7.getDiv());
			//滑动块
			_t._8 = new ImageClip(IP, 41, 123, IW, IH).setStyle(
			{
				height: 10,
				width: 20,
				top: 15,
				left: 8,
				cursor: "pointer"
			}).setEvent(
			{
				mouseover: function (a, b)
				{
					a.sip(66, 123);
					_t._7.mouseover(_t._7);
				},
				mouseout: function (a, b)
				{
					a.sip(41, 123);
					_t._7.mouseout(_t._7);
				}
			});
			ap(div2, _t._8.getDiv());
			//初始化"伪"拖动类
			_t._d = {
				moveTo: function (a, b)
				{
					_t._8.getDiv().style.top = b + "px";
				}
			};
			//点击事件
			_t._7.getDiv().onclick = function (evt)
			{
				var e = evt || window.event;
				var top = _offsetPositionAbsolute(_t._7.getDiv());
				_t.setLevelByPtY.apply(_t, [e.clientY - top.y, true]);
			}
			//气泡提示
			_t._9 = new ImageClip(IP, 139, 34, IW, IH).setStyle(
			{
				height: 82,
				width: 25,
				top: 75,
				left: 250 /* 22 */
			}).setEvent(
			{
				mouseover: function (a, b)
				{
					_t.showTip.apply(_t);
				},
				mouseout: function (a, b)
				{
					_t.hideTip.apply(_t);
				}
			});
			d0(_t._9.getDiv());
			ap(main, _t._9.getDiv());
			var street = $ss(cd(
			{
				title: "街道",
				name: "mc_street"
			}, _t._9.getDiv()), "absolute", 20, 20, 5, 0, "pointer", nullImg);
			var city = $ss(cd(
			{
				title: "市",
				name: "mc_city"
			}, _t._9.getDiv()), "absolute", 20, 20, 5, 31, "pointer", nullImg);
			var province = $ss(cd(
			{
				title: "省",
				name: "mc_prov"
			}, _t._9.getDiv()), "absolute", 20, 20, 5, 50, "pointer", nullImg);
			setUnSelect(street);
			setUnSelect(city);
			setUnSelect(province);
			street.onclick = function ()
			{
				_t.setLevel(17);
			}
			city.onclick = function ()
			{
				_t.setLevel(11);
			}
			province.onclick = function ()
			{
				_t.setLevel(7);
			}
			_t.setSL(_t.level);
		}
	}

	function create()
	{
		main = $ss(cd(
		{
			cls: "panBone",
			name: "mapctrl",
			id: "map_ctrl"
		}, bc), "absolute", 0, 0, null, _t.top, null, null, "zIndex:999;right:0px;width:300px;"); /* _t.left  ,  */
		
		//end-bar //左 div
		_t._2 = new ImageClip(IP, 10, 97, IW, IH).setStyle(
		{
			height: 30,
			width: 15,
			left: 0
		});
		ap(main, _t._2.getDiv());
		
		//middle-bar //上 div
		_t._1 = new ImageClip(IP, 0, 0, IW + 31, IH).setStyle(
		{
			height: 30,
			width: 50,  /* 70 */
			left: 15 /* 60 */
		});
		ap(main, _t._1.getDiv());
		 
		//round-bar //上 div 圆角
		_t._0 = new ImageClip(IP, 1, 32, IW, IH).setStyle(
		{
			width: 60,
			height: 58,
			left: 241   /* */
		});
		ap(main, _t._0.getDiv());
		
		//round-bar-down //左 div 圆角
		_t._3 = new ImageClip(IP, 250, 0, IW, IH).setStyle(
		{
			height: 40,
			width: 31,
			top: 58, 
			left: 270 /* */
		});
		ap(main, _t._3.getDiv());
		
		//round-bar-down-end //Earrow
		_t._4 = new ImageClip(IP, 31, 105, IW, IH).setStyle(
		{
			height: 15,
			width: 31,
			top: 98,
			left: 270 /* */
		});
		ap(main, _t._4.getDiv());
		
		//round-nav
		_t._5 = new ImageClip(IP, 167, 78, IW, IH).setStyle(
		{
			height: 40,
			width: 40
		}).setEvent(
		{
			mouseover: function (a, b)
			{
				a.sip(168, 37);
			},
			mouseout: function (a, b)
			{
				a.sip(167, 78);
			}
		});
		//上下左右
		
		var div1 = $ss(_t._5.getDiv(), "absolute", 42, 42, 254, 5);  /* 40, 40, 5, 5 */

		div1.className = "Earrow";
		ap(main, div1);
		var n = $ss(cd(
		{
			title: "上移",
			name: "up"
		}, div1), "absolute", 15, 13, 12, null, "pointer", nullImg);
		var e = $ss(cd(
		{
			title: "右移",
			name: "right"
		}, div1), "absolute", 13, 15, 28, 13, "pointer", nullImg);
		var r = $ss(cd(
		{
			title: "还原视野",
			name: "reset"
		}, div1), "absolute", 15, 15, 12, 14, "pointer", nullImg);
		var s = $ss(cd(
		{
			title: "下移",
			name: "down"
		}, div1), "absolute", 15, 13, 12, 30, "pointer", nullImg);
		var w = $ss(cd(
		{
			title: "左移",
			name: "left"
		}, div1), "absolute", 13, 15, -3, 13, "pointer", nullImg);

		r.onclick = function ()
		{
			_t.onMoveBtn(0) /*SEvent.trigger(_t, "movebtn", 0);_t.onMoveBtn(0)*/
		}
		n.onclick = function ()
		{
			_t.onMoveBtn(1) /*SEvent.trigger(_t, "movebtn", 1) _t.onMoveBtn(1)*/
		}
		e.onclick = function ()
		{
			_t.onMoveBtn(2) /*SEvent.trigger(_t, "movebtn", 2) _t.onMoveBtn(2)*/
		}
		s.onclick = function ()
		{
			_t.onMoveBtn(3) /*SEvent.trigger(_t, "movebtn", 3) _t.onMoveBtn(3) */
		}
		w.onclick = function ()
		{
			_t.onMoveBtn(4) /* SEvent.trigger(_t, "movebtn", 4) _t.onMoveBtn(4)*/
		}
		//等级条
		div2 = cd(
		{
			cls: "Ebone",
			name: "mc_sbar"
		}, _t._3.getDiv());
		div2.onmouseover = function ()
		{
			zin.sip(109, 120);
			zout.sip(146, 120);
			_t._7 && _t._7.sip(231, 32);
			if (_t._7 && !dok)
			{
				var isMove = false;
				dok = true;
				JsClass("modules.drag", function (fun)
				{
					_t._d = fun(_t._8.getDiv(), {
						LockX: true,
						Limit: true,
						mxTop: 15,
						mxBottom: 115,
						onStart: function ()
						{
							_t._8.sip(66, 123);
							_t.onStart && _t.onStart();
						},
						onMove: function (left, top)
						{
							var _level = _t.maxLevel - Math.round((top - 15) / 5);
							isMove = true;
							if (_t.level != _level)
							{
								_t.level = _level;
								_t.onChange && _t.onChange(_t.level);
							}
						},
						onStop: function ()
						{
							_t._8.sip(41, 123);
							if (!isMove) return;
							_t.setLevel(_t.level);
							_t.onStop && _t.onStop();
						}
					})
				});
				/*
				_t._d = new dragXZ(_t._8.getDiv(), {
					LockX: true,
					Limit: true,
					mxTop: 15,
					mxBottom: 115,
					onStart: function ()
					{
						_t._8.sip(66, 123);
						_t.onStart && _t.onStart();
					},
					onMove: function (left, top)
					{
						var _level = _t.maxLevel - Math.round((top - 15) / 5);
						isMove = true;
						if (_t.level != _level)
						{
							_t.level = _level;
							SEvent.trigger(_t, "changelevel", _t.level)
							//_t.onChange&&_t.onChange(_t.level);
						}
					},
					onStop: function ()
					{
						_t._8.sip(41, 123);
						if (!isMove) return;
						_t.setLevel(_t.level);
						_t.onStop && _t.onStop();
					}
				})
				*/
			}
		}
		div2.onmouseout = function ()
		{
			zin.sip(90, 120);
			zout.sip(127, 120);
			_t._7 && _t._7.sip(212, 32);
		}
		var zd;
		//放大
		zin = new ImageClip(IP, 90, 120, IW, IH).setStyle(
		{
			height: 21,
			width: 19,
			left: 7,
			cursor: "pointer"
		}).setEvent(
		{
			mouseover: function (a, b)
			{
				a.sip(109, 120);
			},
			mouseout: function (a, b)
			{
				a.sip(90, 120);
			},
			click: function ()
			{
				var l = ++_t.level;
				_t.level = l > _t.maxLevel ? _t.maxLevel : l;
				_t.setLevel(_t.m.getLevelIndex() + 1, 1);
			}
		});
		zd = zin.getDiv();
		zd.name = "mc_zin";
		ap(div2, zd);
		//=============================================================================================================
		//缩小
		zout = new ImageClip(IP, 128, 120, IW, IH).setStyle(
		{
			height: 21,
			width: 19,
			left: 7,
			top: 19,
			cursor: "pointer"
		}).setEvent(
		{
			mouseover: function (a, b)
			{
				a.sip(146, 120);
			},
			mouseout: function (a, b)
			{
				a.sip(128, 120);
			},
			click: function ()
			{
				var l = --_t.level;
				_t.level = l < 0 ? 0 : l;
				_t.setLevel(_t.m.getLevelIndex() - 1, 1);
			}
		})
		zd = zout.getDiv();
		zd.name = "mc_zout";
		ap(div2, zd);
		//创建鱼骨
		createBone();

		//地图 卫星
		_t._10 = new ImageClip(IP, 70, 30, IW, IH).setStyle(
		{
			height: 20,
			width: 68,
			top: 3
		})
		ap(_t._1.getDiv(), _t._10.getDiv());
		_t._11 = $ss(cd(
		{
			title: "地图",
			id: "mapCtrl_btn_map"
		}, _t._10.getDiv()), "absolute", 33, 20, null, null, "pointer", nullImg);
		_t._12 = $ss(cd(
		{
			title: "卫星",
			id: "mapCtrl_btn_hy"
		}, _t._10.getDiv()), "absolute", 33, 20, 33, null, "pointer", nullImg);

		setUnSelect(_t._11);
		setUnSelect(_t._12);
		ev(_t._11, "click", function ()
		{
			if (_t.mapType == 2) _t.setMapType(1)
		});
		ev(_t._12, "click", function ()
		{
			if (_t.mapType == 1) _t.setMapType(2)
		});
		ev(_t._11, "mouseover", function ()
		{
			if (_t.mapType == 2) _t._10.sip(70, 51)
		});
		ev(_t._12, "mouseover", function ()
		{
			if (_t.mapType == 1) _t._10.sip(70, 93);
			else _t.setMapType(2)
		});
		ev(_t._11, "mouseout", function ()
		{
			if (_t.mapType == 2) _t._10.sip(70, 30)
		});
		ev(_t._12, "mouseout", function ()
		{
			if (_t.mapType == 1) _t._10.sip(70, 72)
		});
		//城市
		_t._13 = $ss(cd(
		{
			id: "panCa",
			cls: "cityArea",
			name: "mc_citybar"
		}, _t._1.getDiv()), "absolute", null, 20, null, 3, null, null, "marginLeft:70px;whiteSpace:nowrap"); /* marginLeft:70px */
		
		
		// 调整布局
		updateLayout(true);
	} //creat end


	function updateLayout(calcu)
	{
		// calculate new sliding
		if (_t.mode == "min") s = false;
		else if (_t.mode == "max") s = true;
		else
		{
			s = _t.m.map.viewSize.height > 300;
		}
		if (calcu || s != _t.sliding)
		{
			_t.sliding = s;
			createBone();
			if (s)
			{
				tp(zout.getDiv(), 121);
				_t._7 && d1(_t._7.getDiv());
				_t._8 && d1(_t._8.getDiv());
				_t.setBoneHeight(140); /* 136 */
			}
			else
			{
				tp(zout.getDiv(), 20);
				_t._7 && d0(_t._7.getDiv());
				_t._8 && d0(_t._8.getDiv());
				_t.setBoneHeight(39); /* 35 */
			}
		}
	}
	create();
	_t.setMapType(_t.mapType, true);
	Event.addListener(_t.m.map, "resize", updateLayout);
	Event.addListener(_t.m.map, "zoom", function (a, b)
	{
		_t.setSL(_t.m.getLevelIndex())
	});
	_t.setSL(0) /**#@-*/
}
MapCtrl.prototype = {
	/**
	 * 设置参数
	 * @param {Object} options
	 */
	setOptions: function (options)
	{
		var fun = function ()
			{}
		this.mode = options.mode || 'auto';
		this.left = options.left || 0;
		this.top = options.top || 0;
		//this.onChange=options.onChange||fun;
		this.onMoveBtn=options.onMoveBtn||fun;
	},
	/**
	 * 设置工具条（上侧） 宽度
	 * @param {number} width 宽度 最大宽度350px
	 */
	setToolWidth: function (width)
	{
		if (width > this.maxWidth) width = this.maxWidth;
		this._1.getDiv().style.width = width + "px";
		//this._2.getDiv().style.left = this._0.getDiv().offsetWidth + width + "px";
	},
	/**
	 * 设置工具条（左侧） 高度
	 * @param {number} height 高度
	 */
	setBoneHeight: function (height)
	{
		this._3.getDiv().style.height = height + "px";
		this._4.getDiv().style.top = this._0.getDiv().offsetHeight + height + "px";
	},
	/**
	 * @ignore
	 */
	move: function (a)
	{
		if (!this._d)
		{
			var t = this;
			window.setTimeout(function (a)
			{
				t.move(a)
			}, 100, a);
			return;
		}
		this._d.moveTo(null, a);
	},
	/**
	 * @ignore
	 */
	setSL: function (level)
	{
		var t = this;
		t.level = level;
		if (!t.sliding) return;
		var l = t.maxLevel - level;
		if (l > t.maxLevel) l = t.maxLevel;
		else if (l < 0) l = 0;
		t.move(parseInt(l) * 5 + 15);
	},
	/**
	 * @ignore
	 */
	setLevel: function (a, b)
	{
		var c = this.m;
		if (!b) c.map.zoomTo(a);
		else c.animateZoomTo(a);
		SEvent.trigger(this, "zoom", a);
	},
	/**
	 * @ignore
	 */
	getLevel: function ()
	{
		return this.level;
	},
	/**
	 * @ignore
	 */
	setLevelByPtY: function (y, isZoomMap)
	{
		var l = this.maxLevel - Math.round((y - 5) / 5);
		this.setLevel(l);
	},
	/**
	 * 显示等级条上的气泡提示
	 */
	showTip: function ()
	{
		clearTimeout(this._tmout);
		d1(this._9.getDiv());
	},
	/**
	 * 隐藏等级条上的气泡提示
	 */
	hideTip: function ()
	{
		var t = this;
		this._tmout = setTimeout(function ()
		{
			d0(t._9.getDiv());
		}, 1000);
	},
	//设置[地图，卫星]
	/**
	 * 设置地图类型（地图/卫星）
	 * @param {number} type 地图类型 （1：地图，2：卫星）
	 * @ignore
	 */
	setMapType: function (type, c) //(type,isInit)
	{
		var t = this;
		if (!t._10) return;
		if (type == 1)
		{
			t._10.sip(70, 72);
			t._11.style.cursor = "default";
			t._12.style.cursor = "pointer";
			t.mapType = 1;
		}
		else if (type == 2)
		{
			t._10.sip(70, 30);
			t._11.style.cursor = "pointer";
			t._12.style.cursor = "default";
			t.mapType = 2;
		}
		var a = this.mapType == 2,
			b = this.isHbLw,
			d;
		_m.setHyBrid(a, true)
	},
	/**
	 * @ignore
	 */
	getMapType: function ()
	{
		return this.mapType;
	},
	getCityArea: function ()
	{
		return this._13;
	}
}
//A("MapCtrl", MapCtrl);
/* @@ccl - end(C) */

/**
 * 图片切割类
 * @author <a href="mailto:zhengxu@sohu-inc.com">许峥</a>
 * @class
 * @param {string} url 图片地址
 * @param {number} left 图片左偏移量
 * @param {number} top 图片上偏移量
 * @param {number} width 图片原始宽度(如与原始尺寸不同，图片将变形)
 * @param {number} height 图片原始高度(如与原始尺寸不同，图片将变形)
 */
var ImageClip = function (url, posLeft, posTop, imgWidth, imgHeight)
	{
		var t = this;
		t.imgUrl = url;
		t.imgWidth = imgWidth || 300;
		t.imgHeight = imgHeight || 200;
		t.imgLeft = (-1 * posLeft) || 0;
		t.imgTop = (-1 * posTop) || 0;
		var img = Layer.create(t.imgUrl, t.imgWidth, t.imgHeight, t.imgLeft, t.imgTop, 0, null, null, false);
		var div = document.createElement("div");

		//设置图片偏移量
		t.sip = t.setImgPosition = function (left, top)
		{
			img.style.left = -1 * left + "px";
			img.style.top = -1 * top + "px";
			return t;
		}
		//设置容器样式(只支持width,height,left,top,position)
		t.setStyle = function (s)
		{
			if (!s) s = {};
			with(div.style)
			{
				overflow = "hidden";
				cursor = s.cursor || "default";
				position = s.position || "absolute";
				width = s.width ? (s.width + "px") : "auto";
				height = s.height ? (s.height + "px") : "auto";
				if (s.left) left = s.left + "px";
				if (s.top) top = s.top + "px";
			}
			return t;
		}
		/**
		 * 设置事件响应
		 * @param {Object} eventsObject (mouseover,mouseout,click)
		 * @example
		 * var imgCp = new ImageClip("a.png",0,0,100,150);
		 * imgCp.setStyle({
		 click:function(){},
		 mouseout:function(){},
		 mouseover:function(){}
		 })
		 */
		t.setEvent = function (a)
		{
			if (!a) a = {};
			if (a.mouseover) t.mouseover = a.mouseover;
			if (a.mouseout) t.mouseout = a.mouseout;
			if (a.click) t.click = a.click;
			return t;
		}
		/**
		 * 获取容器
		 * @return {Element} div
		 */
		t.getDiv = function ()
		{
			return div;
		}
		/**
		 * 获取图片
		 * @return {Element} img
		 */
		t.getImg = function ()
		{
			return img;
		}

		function mouseover(e)
		{
			t.mouseover && t.mouseover(t, e || window.event)
		}

		function mouseout(e)
		{
			t.mouseout && t.mouseout(t, e || window.event)
		}

		function click(e)
		{
			t.click && t.click(t, e || window.event)
		}
		t.setStyle();
		div.appendChild(img);
		ev(div, "mouseover", mouseover);
		ev(div, "mouseout", mouseout);
		ev(div, "click", click);
	}
/**
 element[string or object] 拖动对象
 options[object]
 LockX[boolean] 锁定横向位置(只能纵向拖动)
 LockY[boolean] 锁定纵向位置(只能横向拖动)
 Limit[boolean] 是否限制移动范围
 mxLeft[int] 默认为0
 mxRight[int] 默认为9999
 mxTop[int] 默认为0
 mxBottom[int] 默认为9999
 mxContainer[string or object] 设置移动范围的限制对象
 Handle[string or object] 响应事件的对象(如窗口的标题行)
 onStart[Function] 开始拖动时触发
 onMove[Function]  正在拖动时触发(持续)
 onStop[Function]  停止拖动时触发
 */
function dragXZ(element, options)
{
	this.element = $(element);
	//this.element.style.position="relative";
	this.setOption(options || {});
	this.addListener(this._Handle, "mousedown", this.initDrag);
}
dragXZ.prototype = {
	_x: 0,
	_y: 0,
	_marginLeft: 0,
	_marginTop: 0,
	isIE: document.all,
	moving: false,
	moveFun: function (t, b, c, d)
	{
		return -c * (t /= d) * (t - 2) + b
	},
	setOption: function (a)
	{
		this.LockX = !! a.LockX;
		this.LockY = !! a.LockY;
		this.Lock = !! a.Lock;
		this.Limit = a.Limit;
		this.elWidth = a.elWidth || null;
		this.elHeight = a.elHeight || null;
		this._mxContainer = $(a.mxContainer) || null;
		this.mxLeft = parseInt(a.mxLeft) || 0;
		this.mxRight = parseInt(a.mxRight) | 9999;
		this.mxTop = parseInt(a.mxTop) || 0;
		this.mxBottom = parseInt(a.mxBottom) || 9999;
		this._Handle = $(a.Handle) || this.element;
		this.onStart = a.onStart || this.onStart;
		this.onMove = a.onMove || this.onMove;
		this.onStop = a.onStop || this.onStop;
	},
	initDrag: function (e)
	{
		clearTimeout(this.moveX);
		clearTimeout(this.moveY);
		this.moving = true;
		if (this.Limit)
		{
			this.mxRight = Math.max(this.mxRight, this.mxLeft + this.element.offsetWidth);
			this.mxBottom = Math.max(this.mxBottom, this.mxTop + this.element.offsetHeight);
			!this._mxContainer || this.getCurStyle(this._mxContainer).position == "relative" || (this._mxContainer.style.position = "relative");
		}
		var pt = this.getPointByEvent(e);

		this._x = pt.x - this.element.offsetLeft;
		this._y = pt.y - this.element.offsetTop;
		this._marginLeft = parseInt(this.getCurStyle(this.element).marginLeft) || 0;
		this._marginTop = parseInt(this.getCurStyle(this.element).marginTop) || 0;
		this.addListener(document, "mousemove", this.startDrag);
		this.addListener(document, "mouseup", this.endDrag);
		if (this.isIE)
		{
			this.addListener(this._Handle, "losecapture", this.endDrag);
			this._Handle.setCapture();
		}
		else
		{
			this.addListener(window, "blur", this.endDrag);
			e.preventDefault();
		}
		this.onStart();
	},
	startDrag: function (e)
	{
		if (this.Lock)
		{
			this.endDrag();
			return;
		}
		var pt = this.getPointByEvent(e);
		var iLeft = pt.x - this._x;
		var iTop = pt.y - this._y;

		if (this.Limit)
		{
			var mxLeft = this.mxLeft,
				mxRight = this.mxRight,
				mxTop = this.mxTop,
				mxBottom = this.mxBottom;
			if ( !! this._mxContainer)
			{
				mxLeft = Math.max(mxLeft, 0);
				mxTop = Math.max(mxTop, 0);
				mxRight = Math.min(mxRight, this._mxContainer.clientWidth);
				mxBottom = Math.min(mxBottom, this._mxContainer.clientHeight);
			}
			iLeft = Math.max(Math.min(iLeft, mxRight - (this.elWidth || this.element.offsetWidth)), mxLeft);
			iTop = Math.max(Math.min(iTop, mxBottom - (this.elWidth || this.element.offsetHeight)), mxTop);
		}
		this.moveTo(iLeft, iTop);
	},
	moveTo: function (x, y)
	{
		clearTimeout(this.moveTimeX);
		clearTimeout(this.moveTimeY);
		this.onMove(x, y);
		if (!this.LockX && typeof (x) != "undefined") this.element.style.left = x - this._marginLeft + "px";
		if (!this.LockY && typeof (y) != "undefined") this.element.style.top = y - this._marginTop + "px";
	},
	endDrag: function (e)
	{
		this.moving = false;
		this.removeListener(document, "mousemove", this.startDrag);
		this.removeListener(document, "mouseup", this.endDrag);
		if (this.isIE)
		{
			this.removeListener(this._Handle, "losecapture", this.endDrag);
			this._Handle.releaseCapture();
		}
		else
		{
			this.removeListener(window, "blur", this.endDrag);
		}
		this.onStop();
	},
	addListener: function (target, type, fun)
	{
		if (!target) return;
		var _fun = function (object)
			{
				var _method = fun;
				return function (event)
				{
					var evt = event || window.event;
					_stopEvent && _stopEvent(evt);
					_method.call(object, evt);
				}
			}(this)
			target["on" + type] = _fun;
	},
	removeListener: function (target, type, fn)
	{
		if (!target) return;
		target["on" + type] = null;
	},
	getPointByEvent: function (e)
	{
		return {
			x: e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)),
			y: e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop))
		}
	},
	getCurStyle: function (element)
	{
		if (element == document) element = document.body;
		return element.currentStyle || element.ownerDocument.defaultView.getComputedStyle(element, null);
	},
	onStart: function ()
	{},
	onMove: function ()
	{},
	onStop: function ()
	{}
}
//A("ImageClip", ImageClip);

function isEmpty(s)
{
	return s == null || s == "" || typeof (s) == 'undefined'
}

function showAroundSearch(a)
{
	JsClass("modules.aroundSearch", function (z)
	{
		z(a)
	});
}

/* @@ccl - start(D) */
function creatMapAreaBtns()
{
	var a = _el("maparea"),
		b, c, d, e, f, g, j, i = "fullscreen btxt",
		k = "className",
		isFull = false,
		r = G.path + "images/mapCtrl.png",
		w = 309;
	h = 166;  /* @@ccl 166 */
	b = cc("MABtns");
	sz(b, 9990);
	b.name = "MapBtn";
	ap(a, b);
	
	/*
	d = new ImageClip(r, 0, 138, w, h).setStyle(
	{
		height: 27, 
		width: 74, 
		left: -150
	}).setEvent(
	{
		mouseover: function ()
		{
			d.sip(88, 138);
		},
		mouseout: function ()
		{
			d.sip(0, 138);
		}
	});
	e = d.getDiv();
	ap(b, e);
	c = cc(i);
	ap(e, c);
	*/

	/*
	function fsr(a)
	{
		if (!a)
		{
			d1(_el("header"));
			d1(_el("div_scont"));
			c[k] = i
		}
		else
		{
			d0(_el("header"));
			d0(_el("div_scont"));
			c[k] = i + " select"
		}
		setTimeout(function (a)
		{
			G.setResultView(a);
			resizePage & resizePage();
		}, 200, !a);
		isFull = a;
		SEvent.trigger(G, "fullscreen", a);
	};
	G.setFullScreen = fsr;
	ev(c, "click", function ()
	{
		fsr(!isFull)
	});
	*/
	e = ce("div");
	ap(b, e);
	
	/* @@ccl */
	function loadAtt(a)
	{
		JsClass("modules.attention", function (z)
		{
			z(e, g, f, a)
		})
	}
	g = new ImageClip(r, 10, 139, w, h).setStyle(
	{
		height: 27, /*@ccl@*/
		width: 74, /*@ccl@*/
		left: -74
	}).setEvent(
	{
		mouseover: function (a)
		{
			a.sip(95, 139); /*@ccl@*/
			loadAtt()
		}
	});
	j = g.getDiv();
	ap(e, j);
	f = cc("attention btxt");
	ap(j, f);
	var l = getCookie("ATTENTION_POINTS"),
		m;
	if (l) m = l.split(";").length;
	ap(f, ct("收藏夹[" + (!m ? 0 : m) + "]"));
	ev2(G, "favorpoi", loadAtt);
	d1(b);
	
}(function ()
{
	var cityInfoBar, block, cityCnt = 5;

	function setMapCity()
	{
		var bs = _m.getBounds();
		var url = G.cityengine + "?mt=cityinfo&bounds=" + bs.minX + "," + bs.minY + "," + bs.maxX + "," + bs.maxY;
		scs.send(null, url, cityinfocallback, true);
	}

	function showCityList(a, b)
	{
		JsClass("modules.cityinfo", function (z)
		{
			z(a, b)
		})
	}

	function createBlock()
	{
		var h = ce("span"),
			i = ce("div"),
			j, k = ce("a");
		h.className = "ta1";
		evt(h);
		ap(h, i);
		j = ce("img");
		j.src = G.path + "images/pixel.gif";
		ap(i, j);
		evt(k);
		k.href = "javascript:void(0)";
		return [h, k]
	}

	function gtIdx(a, e)
	{
		a = a || event;
		var b = a.srcElement || a.target,
			c = [],
			d = !e ? "id" : "name";
		while (!b[d] && b.parentNode)
		{
			b = b.parentNode
		}
		if (b[d]) return parseInt(b[d]);
	}

	function mov(a)
	{
		var b = gtIdx(a),
			c = b % 2,
			d = cityInfoBar,
			e = d[c ? b - 1 : b],
			g = block;
		if (b != 4)
		{
			f = e.innerHTML;
			showCityList(f);
			g[b >> 1].className = "focus";
			d[c ? b : b + 1].className = "ta2"
		}
		SEvent.trigger(G, "citymouseover");
	}

	function mot(a)
	{
		var b = gtIdx(a),
			c = b % 2,
			d = cityInfoBar,
			g = block;
		g[b >> 1].className = "txt";
		if (b != 4) d[c ? b : b + 1].className = "ta1";
		showCityList("", 1);
	}

	function clk(a)
	{
		var b = gtIdx(a),
			c = b % 2,
			d = cityInfoBar,
			e;
		if (!c && d[b])
		{
			e = d[b].innerHTML;
			setCity(e);
		}
	}

	function evt(a)
	{
		ev(a, "mouseover", mov);
		ev(a, "mouseout", mot);
		ev(a, "click", clk);
	}

	function createBar()
	{
		var b = G.mapCtrl,
			c = b.getCityArea(),
			d, e, f, g, i = [],
			j, l = block = [],
			m, n, o = "javascript:void(0);";
		d = cc("mapcity");
		ap(c, d);
		e = ce("a");
		e.id = "0";
		e.href = o;
		evt(e);
		ap(d, e);
		ap(e, ct("全国"));
		f = createBlock();
		g = createBlock();
		for (j = 0; j < 3; j++)
		{
			m = ce("span");
			m.className = "txt";
			l.push(m);
			ap(d, m)
		}
		ap(l[0], e);
		ap(l[0], f[0]);
		ap(l[1], f[1]);
		ap(l[1], g[0]);
		ap(l[2], g[1]);
		n = ce("a");
		sc(n, "link");
		n.style.marginLeft = "8px";
		n.style.color = "#00f";
		ap(d, n);
		ap(n, ct("[更改]"));
		/* --ccl */
		d0(n);
		ev(n, "click", function (v)
		{
			JsClass("modules.citylist", function (z)
			{
				z()
			})
		});
		return i.concat(e, f, g)
	}

	function recordCity(a)
	{
		if (a) setCookie("activecity", a.name + "," + a.x + "," + a.y + "," + a.level, new Date(2088, 8, 8))
	}
	var lastCity;

	function cityinfocallback(a)
	{
		var b = G.mapCtrl,
			c = cityInfoBar,
			d, g = 98,
			h, i, k;
		if (!c) c = cityInfoBar = createBar();
		k = block;
		g += 2 * 12 + 55;
		k.push(c[0]);
		for (i = 1; i < 5; i++)
		{
			c[i].id = i
		}
		for (i = 1; i < 3; i++)
		{
			d0(k[i])
		}
		if (a.prov)
		{
			h = a.prov.name;
			c[2].innerHTML = h;
			d1(k[1], 1);
			g += h.length * 12 + 23;
		}
		if (a.city)
		{
			h = a.city.name;
			c[4].innerHTML = h;
			d1(k[2], 1);
			g += h.length * 12 + 5;
		}
		h = !h ? "全国" : h;
		if (lastCity == h)
		{
			cityCnt++;
			if (cityCnt == 5)
			{
				SEvent.trigger(G, "activechangecity", h, 1)
			}
		}
		else
		{
			cityCnt = 0;
			lastCity = G.city = h;
			SEvent.trigger(G, "citychange", h)
		}
		if (_m.eMapEm)
		{
			JsClass('modules.switchMap', function (e)
			{
				e && e()
			})
		}
		/* --ccl */
		g = g + 30;
		b.setToolWidth(g + 20);
	}
	ev2(G, "activechangecity", function (a)
	{
		a = a || G.city;
		if (a && a != "全国") getCityInfo(a, recordCity)
	});
	window["setMapCity"] = setMapCity;
})();
/* @@ccl - end(D) */

function showInfoWin(a, b, c)
{
	JsClass("modules.popwin", function (z)
	{
		z(a, b, c)
	})
}

function callDrapPoint(a, b)
{
	if (a && a.type == "S" && a.isMovable) JsClass("modules.drappoint", function (z)
	{
		z(a, b, _m)
	})
}

function callHotLabel(a)
{
	/*
	if (_m && _m.eMapisLive) return;
	JsClass("modules.hotlabel", function (b)
	{
		b(a)
	})
	*/
	return
}

function initService()
{		
	creatInputControl();
	ev2(_m.map, "mousemove", callHotLabel);
	ev2(_m.map, "showinfowin", showInfoWin);
	ev2(_m.map, "leftdown", callDrapPoint);
	/*
	ev2(_m.map, "contextmenu", function (a, b, c, d, e)
	{
		JsClass("modules.rmenu", function (f)
		{
			if (f) f(a, b, c, !d ? 0 : d, e)
		})
	});
	*/
	ev2(_m.map, "poirightclick", function (a, b)
	{
		var c = _getRelativeClickPoint(b, _m.getMapAreaContainer());
		SEvent.trigger(_m.map, "contextmenu", b, a.points[0], c, a.isRMenu, a)
	});
	ev2(_m, "hybrid", function (a, b)
	{
		sp("hb", (!a ? 0 : 1) + "," + (!b ? 0 : 1))
	});
	ev2(_m.map, "infowindowopen", function (a)
	{
		if (a.id) sp("iw", a.id)
	});
	var bone = G.mapCtrl = new MapCtrl(_m, {
		mode: 'auto',
		onMoveBtn: function (moveType)
		{
			var type = "",
				x = 0,
				y = 0,
				b = Math.floor(_m.getMapHeight() * 0.5),
				c = Math.floor(_m.getMapWidth() * 0.5);
			switch (moveType)
			{
			case 0:
				type = "重置";
				_m.resetMap();
				break;
			case 1:
				type = "上";
				y = b;
				break;
			case 2:
				type = "右";
				x = -c;
				break;
			case 3:
				type = "下";
				y = -b;
				break;
			case 4:
				type = "左";
				x = c;
				break;
			}
			if (moveType) _m.map.pan(x, y);
		}
	});
	bone.setSL(_m.getLevelIndex());
	ev2(bone, "zoom", function (a)
	{
		SEvent.trigger(G, "eyeshotupdate")
	});
	var updtTimer;
	ev2(_m, "update", function ()
	{
		var b = getState(),
			c = b.join(",");
		if (gp("c") != c) sp("c", c);
		window.clearTimeout(updtTimer);
		updtTimer = window.setTimeout(setMapCity, 200);
	});
	ev2(_m.map, "mousewheel", function (a)
	{
		SEvent.trigger(G, "eyeshotupdate")
	});
	ev2(_m.map, "dragend", function (a)
	{
		SEvent.trigger(G, "eyeshotupdate")
	});
	setCity(G.city);
	//setMapCity();
	creatMapAreaBtns();
	parseUrlParam();
	// NOT IN USE - pagevisit log
	/*
	var ref = gp("from"),
		mf = getCookie("SGMINFO");
	if (ref) sp("from", "");
	window.setTimeout(pvLog, 5000, ref, mf);
	*/
}

function getBusNavParam(a)
{
	var b, c = {};
	if (a)
	{
		a = a.split("!!");
		for (var i = 0; i < gl(a); i++)
		{
			b = a[i].split("==");
			if (b[0].indexOf("key") > -1 || "start,end,areaname".indexOf(b[0]) > -1)
			{
				b[1] = b[1];
			}
			c[b[0].toLowerCase()] = b[1];
		}
		return c;
	}
}

function goSearch(lq, p, city)
{
	var uids = gp("uids"),
		page = gp("page"),
		dataid = gp("dataid"),
		wr = gp("where"),
		radius = gp("radius"),
		sort = gp("sort");
	if (city) city = city.replace(/市/g, "");
	if (p && p.m == "near")
	{
		lq = p.k;
		radius = p.r;
		wr = p.where;
		dataid = p.uid;
	}
	JsClass("modules.search", function (z)
	{
		if (lq) z("urlsubmit", [lq, page, wr || dataid, city, radius, sort]);
		else if (uids || dataid) z("urlsubmit", ["", 1, uids || dataid, city]);
		else z();
	});
}

function parseUrlParam()
{
	var p, q = 0,
		mymap = gp("mymap"),
		c = gp("c"),
		tip = gp("tip"),
		s = gp("s"),
		d = gp("q"),
		mds = gp("mds"),
		city = gp("city"),
		lq = gp("lq");
	if (!lq) lq = gp("kw");
	if (tip || d) JsClass("modules.usertip", function (z)
	{
		z(_m, 1, tip || "坐标位置," + d, 1)
	});
	if (d) sp("q", "");
	if (gp("fsc") == 1) G.setFullScreen(1);
	if (mds) JsClass(mds, function (z)
	{
		z(_m)
	});
	if (s) p = getBusNavParam(s);
	else
	{
		p = new Object();
		p.m = "bus";
		p.city = G.city;
	}
	if (p && p.m && (p.m == "bus" || p.m == "nav" || p.m == "businfo")) JsClass("modules." + p.m, function (z)
	{
		z("urlsubmit", p)
	});
	else
	{
		if (/%\w\w/.test(lq)) JsClass("modules.utf8gbk" + (!window.execScript ? "2" : ""), function (z)
		{
			var u = z().urlDecode;
			goSearch(u(lq), p, u(city))
		});
		else goSearch(lq, p, city)
	}
}

function hl_font(a, b)
{
	var e = a,
		f, k = /[\(\)\[\]\{\}\\\-\|\+\$\^\*\.\?]/g,
		m = "<font color=\"#e1570e\" >",
		n = "</font>";

	function g(a, b, c)
	{
		return b + "%1" + c + "%2"
	};
	for (var i = 0; i < b.length; i++)
	{
		if (b[i] != "")
		{
			f = new RegExp("([^%]|^)(" + b[i].replace(k, function (a)
			{
				return "\\" + a
			}) + ")", "gi");
			e = e.replace(f, g)
		}
	}
	return e.replace(/%+/g, "%").replace(/%1/g, m).replace(/%2/g, n)
}

function extend(a, b)//destination, source
{
	for (var i in b) a[i] = b[i];
	return a;
}

function setBoardFontSize(a, type)
{
	if (!a && typeof (a) == "string" && a.childNodes.length > 0) return;
	var bl = a.innerHTML.byteLength(),
		fs = 0,
		ws = 0,
		lh;
	if (type == 1)
	{
		if (bl > 0 && bl <= 5) fs = 33;
		else if (bl > 5 && bl <= 12) fs = 22;
		else if (bl > 12 && bl <= 14) fs = 16;
		else if (bl > 14)
		{
			fs = 14;
			lh = 25;
			ws = 1;
			if (bl > 22) a.innerHTML = a.innerHTML.subByte(22);
		}
	}
	else if (type == 2)
	{
		if (bl > 0 && bl <= 18) fs = 17;
		else if (bl > 18)
		{
			fs = 14;
			if (bl > 22)
			{
				ws = 1;
				if (bl > 42)
				{
					a.innerHTML = a.innerHTML.subByte(42);
				}
			}
		}
	}
	if (fs == 0) return;
	else
	{
		a.style.whiteSpace = !ws ? "nowrap" : "normal";
		a.style.fontSize = fs + "px";
		if (lh) a.style.lineHeight = lh + "px";
	}
}

function util_swapObj(a, o1, o2)
{
	if (!a) return;
	var v1 = a[o1];
	a[o1] = a[o2];
	a[o2] = v1
}

function getStyle(el, prop)
{
	if (!el) return null;
	prop = toCamelCase(prop);
	var view = document.defaultView;
	if (view && view.getComputedStyle)
	{
		return view.getComputedStyle(el, "")[prop] || null;
	}
	else
	{
		if (prop == 'opacity')
		{
			var opacity = el.filters['alpha'] ? el.filters['alpha']['opacity'] : NaN;
			return isNaN(opacity) ? 1 : (opacity ? opacity / 100 : 0);
		}
		return el.currentStyle[prop] || null;
	}
};
var toCamelCase = (function ()
{
	var cache = {};
	return function (str)
	{
		if (!cache[str])
		{
			var parts = str.split('-'),
				camel = parts[0];
			if (parts.length > 1)
			{
				for (var i = 1, len = parts.length; i < len; i++)
				{
					camel += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);
				}
			}
			return cache[str] = camel;
		}
		else
		{
			return cache[str];
		}
	}
})();

function inputControl(a, b)
{
	var text = b,
		bc = a.parentNode,
		label, isFocus = 0,
		timer;
	var con = cc("input_ctl");
try
{
	var lh = getStyle(a, "height");
		lh = lh + "";
		lh = (parseInt(lh.replace("px")) + 2) + "px";
}
catch(e){ /* if (console) console.log(e); */ }
	var w = getStyle(a, "width");
	con.innerHTML = '<label id = "l_' + a.id + '" name="l_' + a.id + '" for="' + a.id + '" style="height:' + lh + ';line-height:' + lh + ';width:' + w + '"></label>';
	ap(bc, con);
	ap(con, a);
	a.getValue = function ()
	{
		return a.value;
	};
	a.setValue = function (v)
	{
		if (typeof v == "string")
		{
			focus()
			a.value = v.toString();
		}
		else
		{
			blur();
		}
	};
	a.setTipValue = function (b)
	{
		text = b;
		a.onblur();
	};

	function focus()
	{
		if (!label) label = inputControl.getLabel(con);
		if (label){ label.innerHTML = ""; label.style.width = "0px"; }
		isFocus = 1;
	};

	function blur()
	{
		clearTimeout(timer);
		if (!label) label = inputControl.getLabel(con);
		if (!a.value && label){ label.innerHTML = text; label.style.width = getStyle(a, "width");}
		isFocus = 0;
		SEvent.trigger(a, "change", a.value);
	};
	a.onfocus = focus;
	a.onblur = blur;
	con.onclick = function (e)
	{
		timer = setTimeout(function ()
		{
			if (!isFocus)
			{
				try
				{
					a.focus()
				}
				catch (e)
				{}
			}
		}, 50);
	};
	setTimeout(function ()
	{
		if (!label) label = inputControl.getLabel(con);
		if (!label) return;
		if (a.value) label.innerHTML = "";
		else label.innerHTML = text;
	}, 200);
	var k = ev(a, "keyup", function ()
	{
		SEvent.trigger(a, "change", a.value)
	});
	ev(window, "unload", function ()
	{
		a.setValue = a.getValue = a.onfocus = a.onblur = con.onclick = null;
		SEvent.removeBuiltInListener(k);
	})
}
inputControl.getLabel = function (a)
{
	return a.getElementsByTagName("label")[0];
}
G.INPUTS = {
	"bus_tb_fromkey": "请输入起点",
	"bus_tb_tokey": "请输入终点",
	"bus_fromkey": "请输入起点",
	"bus_tokey": "请输入终点",
	"query": "请输入查询内容",
	"search_key": "请输入查询内容",
	"searcharound_key": "请输入查询内容",
	"searchrange_key": "请输入查询内容",
	"nav_fromkey": "请输入起点",
	"nav_tokey": "请输入终点",
	"businfo_tb_key": "请输入线路号或站名",
	"businfo_key": "请输入线路号或站名",
	//"searchfeature_key": "如不输入关键字默认查询本层图全部信息"
	"searchfeature_key": "请输入查询内容"
}

function creatInputControl()
{
	for (var i in G.INPUTS)
	{
		var a = _el(i),
			b = G.INPUTS[i];
		if (typeof (b) != "string" || !a || a.tagName.toUpperCase() != "INPUT") continue;
		new inputControl(a, b);
	}
}

function getOuterlink(keyword, city, appType)
{
	if (!appType) appType = "map";
	return G.outlinkengine + "?kw=" + keyword + "&city=" + city + "&app=" + appType;
}

function lineFilter(a)
{
	a = "" + a;
	var b = /\([^\(]+\(?[^\(\)]+\)?\-[^\)]+\(?[^\(\)]+\)?\)/,
		c, d;
	c = a.match(b);
	d = a.replace(b, "");
	c = c && c.length > 0 ? c[0].match(/^\([^\(\)\-]+\)/) : "";
	c = c && c.length > 0 ? c[0] : "";
	return d + c
};
/*
(function ()
{
	Log.site = "http://61.135.178.50/map50/";
	Log.isApp = true;
	logStep = 0;
	var pos, lastEvent, logTime, ipts = [_el("query"), _el("businfo_key"), _el("bus_tb_fromkey"), _el("bus_tb_tokey"), _el("bus_fromkey"), _el("bus_tokey"), _el("nav_fromkey"), _el("nav_tokey")];

	function ge(a, c)
	{
		var a = !a ? event : a,
			b = !a.srcElement ? a.target : a.srcElement,
			e = _getRelativeClickPoint(a, !c ? document.body : c);
		return [a, b, e]
	}

	function fhtml(a)
	{
		if (!a) return "";
		a = "" + a;
		return a.substr(0, 30).replace(/["'\n\r]/gim, "")
	}

	function eh(a, g, z)
	{
		var b, e, h, k;
		if (a)
		{
			b = a[1];
			e = a[2];
			k = [b.innerHTML, 0, 0, sgd(b, "id"), sgd(b, "name"), b.className, b.getValue ? b.getValue() : b.value, b.tagName, e.x, e.y]
		}
		window.setTimeout(teh, 500, k, g, z)
	}

	function teh(a, g, z)
	{
		logStep++;
		var c = getState(),
			f = "",
			h = "",
			i, k = "",
			l = _m.getWindowSize();
		if (z != null) f = z;
		else for (i = 0; i < ipts.length; i++)
		{
			f += h + ipts[i].getValue();
			h = "::"
		}
		if (lastEvent == g || (lastEvent == "click" && g == "dblclick")) window.clearTimeout(logTime);
		if (g == "enter")
		{
			f += !G.IS40KEYDOWN ? "" : "::TIPSOPENED";
			G.IS40KEYDOWN = 0
		}
		Log.send("step=" + logStep + "&&city=" + G.city + "&&mapstate=" + c.join(",") + "&&params=" + f + "&&hd=" + _m.getHbState() + (!screen ? "" : "&&scr=" + screen.width + "," + screen.height) + "&&wsize=" + l.width + "," + l.height + "&&fullscreen=" + (G.toolboxOn ? 1 : 0) + "&&event=" + g + (!a ? "" : "&&scrollXY=" + a[1] + "," + a[2] + "&&eventXY=" + (a[8] + "," + a[9]) + "&&id=" + a[3] + "&&name=" + a[4] + (!a[0] ? "" : "&&innerHTML=" + fhtml(a[0])) + (!a[5] ? "" : "&&css=" + fhtml(a[5])) + (!a[6] ? "" : "&&value=" + fhtml(a[6])) + (!a[7] ? "" : "&&tagName=" + a[7])));
		lastEvent = g;
	}

	function sgd(a, b)
	{
		do
		{
			if (a[b]) return a[b];
			a = a.parentNode
		} while (a);
		return ""
	}

	function md(a)
	{
		pos = ge(a)[2]
	}

	function mu(a)
	{
		var b = ge(a),
			c = pos;
		if (c && Math.abs(b[2].x - c.x) < 2 && Math.abs(b[2].y - c.y) < 2) eh(b, b[0].button && b[0].button == 2 ? "rightclick" : "click");
		else eh(b, "mouseup");
	}
	ev(document, "dblclick", function (a)
	{
		eh(ge(a), "dblclick")
	});
	ev(document, "mousedown", md);
	ev2(_m.map, "mousedown", md);
	ev(document, "mouseup", mu);
	ev2(_m.map, "mousewheel", function (a)
	{
		eh(ge(a), "mousewheel")
	});
	ev2(_m.map, "keypanend", function (a, b)
	{
		eh(null, "keypan")
	});
	for (var i = 0; i < ipts.length; i++) ev(ipts[i], "keydown", function (a)
	{
		if (a.keyCode == 40) G.IS40KEYDOWN = 1;
		if (a.keyCode == 13) eh(ge(a), "enter")
	});
	ev2(_m, "drawend", function (a)
	{
		eh(null, "draw", a)
	});
	ev2(window, "response", function (a)
	{
		eh(null, "response", a)
	});
	var A = window;
	A["eh"] = eh;
	A["ge"] = ge;
})();
*/
function loadCssText(css)
{
	var a = $("dcss");
	if (!a) a = loadCssText.create();
	if (a.styleSheet) a.styleSheet.cssText += css;
	else ap(a, document.createTextNode(css));
}
loadCssText.$id = "dcss";
loadCssText.create = function ()
{
	var a = ce("style");
	a.id = loadCssText.$id
	sa(a, "type", "text/css");
	ap(gt(document, "head"), a);
	return a;
}
/*
A("setEnglishMap", function ()
{
	Global.g[0] = function (a, b, c, d)
	{
		a[1] = "173";
		return "http://hbpic0.go2map.com/seamless1/" + a.join("/") + ".GIF"
	}
});
*/
initService();
if (setTimeStamp) setTimeStamp("mainjs");