SGS.modules_suggest && SGS.modules_suggest(function ()
{
    var IPTS = {},
        lastTime = now(),
        speed = 500,
        i = 0,
        curIpt, FUN = {},
        SF = {},
        isSubmit = 0,
        mi = {};
    var _css = '.suggest{display:none;width:243px;overflow:hidden;background-color:#FFFFFF;border:1px solid #999;z-index:9999;}.menucity{position:relative;background-color:#F7EED1;}.citySelBtn{position:absolute;width:34px;height:20px;top:0;}.citySelBtn div{position:absolute;height:22px;background:url(' + G.path + 'images/tipBtn.png);background-repeat:no-repeat;}.citySelBtn .sugslt_1{width:100%;left:0;top:0;background-repeat:repeat-x}.citySelBtn .sugslt_2{width:2px;left:0;top:0;background-position:0 -23px}.citySelBtn .sugslt_3{width:2px;right:0;top:0;background-position:-1px -23px}.citySelBtn .sugslt_4{position:relative;width:8px;height:7px;top:19px;margin:0 auto;background-position:0 -46px}.cityMenuList{position:relative;height:20px;white-space:nowrap}.cityMenuList span{margin:0 5px;display:inline-block;line-height:20px;cursor:pointer}.menuitem{padding:3px 0}.menuitem li{line-height:18px;padding:2px;white-space:nowrap;}.menuitem li .iteminfo{margin-left:10px;white-space:nowrap;color:gray;}.menuitem li.focus{background-color:#DCEDF6;cursor:pointer}.menuoff{float:right}.menubar{background:#EEF7FF;cursor:default}.sugMyInfo{padding:3px;}.sugMyInfo .ico{background-image:url(' + G.path + 'images/2.png);background-repeat:no-repeat}.sugMyInfo .ico{float:left;width:20px;height:18px;margin-right:2px}.sugHomeDiv .ico{background-position:-354px -52px;}.sugWorkDiv .ico{background-position:-354px -72px;}.sugMyInfo .fr{float:right;color:#f00}.sugMyInfo .nt{color:#ccc}.sugHomeDiv,.sugWorkDiv{line-height:20px}.sugMyInfo p{line-height:20px;padding-left:5px}';
    loadCssText(_css);

    function $(a)
    {
        return document.createElement(a)
    }
    function suggest(a, cb)
    {
        var v = gv(a.input),
            url, apptype = 1;
        if (!v && curIpt) dp(curIpt, 0);
        if (a.value == v) return;
        else a.value = v;
        a.oldvalue = v;
        switch (a.type)
        {
        case "bus":
            apptype = 2;
            break;
        case "nav":
            apptype = 4;
            break;
        case "myinfo":
        case "search":
            apptype = 1;
            break;
        }
        url = G.suggestengine + "?city=" + (G.ecity == "\u5168\u56FD" ? "ALL" : G.ecity) + "&keyword=" + v + "&type=1&cityflag=0&apptype=" + apptype;
        scs.send("modules_suggest" + rnd(), url, function (z)
        {
            if (show(z)) cb && cb()
        }, true)
    }

    function isChange(a)
    {
        return a.value != gv(a.input)
    }

    function getIPT(a)
    {
        var evt = a || event,
            ipt = a.srcElement || a.target;
        if (!ipt || !IPTS[ipt.id]) return;
        return IPTS[ipt.id];
    }

    function gv(a)
    {
        return a.getValue ? a.getValue() : a.value
    }

    function sv(a, b)
    {
        a.setValue ? a.setValue(b) : (a.value = b)
    }
	
	function syncIpts()
	{
		return
		/*
		if(curIpt)
		{
			switch(curIpt.input.name)
			{
				case "bus_tb_fromkey":
					_el("bus_fromkey").setValue(curIpt.input.getValue());
					break;
				case "bus_fromkey":
					_el("bus_tb_fromkey").setValue(curIpt.input.getValue());
					break;
				case "bus_tb_tokey":
					_el("bus_tokey").setValue(curIpt.input.getValue());
					break;
				case "bus_tokey":
					_el("bus_tb_tokey").setValue(curIpt.input.getValue());
					break;
				case "searchrange_key":
				case "search_key":
				case "searcharound_key":
					_el("query").setValue(curIpt.input.getValue());
					break;
				case "query":
					_el("searchrange_key").setValue(curIpt.input.getValue());
					_el("search_key").setValue(curIpt.input.getValue());
					_el("searcharound_key").setValue(curIpt.input.getValue());
					break;
			}
		}
		*/
	}

    function findNameEl(a, b)
    {
        var a = a;
        while (a.parentNode && !ga(a, "name") && a != b)
        {
            a = a.parentNode
        };
        return a == b || a == document ? null : a
    }

    function getElementByEvent(e)
    {
        var evt = e || event;
        return evt.srcElement ? evt.srcElement : evt.target
    }

    function registerFun(a, b)
    {
        var c = a || rnd();
        FUN[c] = b ||
        function ()
        {};
        return c
    }

    function isChildNode(a, b)
    {
        var el = a;
        while (el && el != document.body)
        {
            if (el == b) return true;
            else el = el.parentNode;
        }
        return false
    }

    function blur(a)
    {
        clearInterval(a.timer);
        if (a.kdev) SEvent.removeBuiltInListener(a.kdev);
        a.value = a.input.getValue();
        a.timer = null;
    }

    function focus(a)
    {
        if (curIpt && a != curIpt)
        {
            blur(curIpt);
            dp(curIpt, 0);
        }
        curIpt = a;
        a.timer = setInterval(function ()
        {
            suggest(a)
        }, speed);
    }

    function listenerInput(a)
    {
        if (!IPTS[a.id]) return;
        ev(a, "focus", function (z)
        {
            var c = IPTS[a.id],
                b = c.kdev = ev(a, "keydown", function ()
                {
                    focus(getIPT(z));
                    SEvent.removeBuiltInListener(b);
                });
        });
        ev(a, "click", function (a)
        {
            a = a ? a : event;
            var c = getIPT(a)
            if (c.bc && c.bc.style.display != "block")
            {
                if (curIpt) dp(curIpt, 0);
                curIpt = c;
                isSubmit = 0;
                c.value = "";
                suggest(c)
            }
        });
        ev(a, "blur", function (a)
        {
            blur(getIPT(a));
        });
        ev(a, "keydown", function (a)
        {
            isSubmit = 0;
            a = a ? a : event;
            var obj = getIPT(a);
            if (!obj) return;
            var evtCode = a.keyCode ? a.keyCode : a.which;
            if (evtCode < 37 || evtCode > 40) obj.oldvalue = "";			
            if (obj.bc && obj.bc.style.display == "none")
            {
                if (evtCode == 40)
                {
                    obj.value = "";
                    suggest(obj);
                }
                return;
            }
            if (evtCode == 37 && obj.isCityList)
            {
                if (obj.ctIdx <= 0) return;
                obj.ctIdx--;
                setSelBtn(obj);
            }
            else if (evtCode == 39 && obj.isCityList)
            {
                if (obj.top && obj.ctIdx == obj.top.list.childNodes.length - 1) return;
                obj.ctIdx++;
                setSelBtn(obj);
            }
            else if (evtCode == 38)
            {
                setItemCursor(obj, obj.itemIdx - 1, 1);
            }
            else if (evtCode == 40)
            {
                setItemCursor(obj, obj.itemIdx + 1, 1);
            }
            else if (evtCode == 27 || evtCode == 9)
            {
                if (obj && obj.bc) dp(obj, 0)
            }
        });
        var b = IPTS[a.id],
            c;
        if (b)
        {
            c = _el(b.type + "_" + b.ft + "M");

            function d()
            {
                if (b.bc && b.type != "myinfo" && b.type != "search")
                {
                    var cls = ga(c, "curSt");
                    curIpt = b;
                    if (!b.div) createDiv();
                    dp(b, cls == "c" ? 0 : 1);
                }
            }
            c && ev(c, "click", function ()
            {
                isSubmit = 0;
                if (curIpt && b != curIpt)
                {
                    dp(curIpt, 0);
                }
                if (b.bc && gv(b.input) != "")
                {
                    var cls = ga(c, "curSt");
                    if (cls == "c")
                    {
                        dp(b, 0);
                    }
                    else
                    {
                        curIpt = b;
                        b.value = "";
                        suggest(b, d);
                    }
                }
                else d();
            })
        }
    }
	
	function filterKeyword(a)
	{
		if (a.keyword && a.keyword.length > 0)
		{
			forArray(toArr(a.keyword), function (b, i)
			{
				c = b.split(",");
				c1 = c[0].split("-");
				if (c1 && c1.length > 0)
				{
					c1 = c1.unique();
					c[0] = c1.join('-');
				}
				a.keyword[i] = c.join(",");
			});
		}
		return a;
	}

    function setSelBtn(obj, isFirst)
    {
        if (!obj || !obj.top || !obj.top.btn) return;
        var btn = obj.top.btn,
            list = obj.top.list,
            ls, sp, cm, _l;
        if (!list || list.childNodes.length <= 1) return;
        ls = list.childNodes;
        if (obj.ctIdx < 0) obj.ctIdx = 0;
        else if (obj.ctIdx > ls.length - 1) obj.ctIdx = ls.length - 1;
        sp = ls[obj.ctIdx];
        if (!sp) return;
        cm = sp.offsetLeft + sp.offsetWidth - obj.bc.offsetWidth;
        _l = cm > 0 ? -cm - 10 : 0;
        JsClass("modules.dynamic", function (fun)
        {
            fun(btn).xz.animate(
            {
                "left": sp.offsetLeft - 5 + _l + "px",
                "width": sp.offsetWidth + 10 + "px"
            }, 300, {
                _onstart: function ()
                {
                    if (isFirst) return;
                    setLoading(obj.body, 2);
                    var url = G.suggestengine + "?city=" + (sp.innerHTML == "\u5168\u56FD" ? "ALL" : sp.innerHTML) + "&keyword=" + obj.oldvalue + "&type=1&cityflag=1&apptype=1"
                    scs.setTimeout(scs.send, 300, "modules_suggest" + rnd(), url, function (a)
                    {						
                        obj.data = filterKeyword(a);
                        showList(a);
                    }, true)
                }
            }, null, 44);
            fun(list).xz.animate(
            {
                "left": _l + "px"
            }, 300, null, null, 44);
        });
    }

    function setLoading(a, b)
    {
        a.innerHTML = '<div class="loading' + (!b ? "" : b) + '"><div class="ld_place" style="width:100%;height:50px;"><div class="ld_img"></div>\u6B63\u5728\u52A0\u8F7D\u6570\u636E\uFF0C\u8BF7\u7A0D\u5019...</div></div>';
    }

    function setItemCursor(obj, idx, isChange)
    {
        if (!obj || !obj.body || obj.body.innerHTML == "") return;
        var list = obj.body.childNodes;
        if (!list || list.length <= 0) return;
        if (idx < -1) idx = list.length - 1;
        else if (idx > list.length - 1) idx = -1;
        if (obj.lastItemIdx > -1 && list[obj.lastItemIdx]) sc(list[obj.lastItemIdx], "");
        if (idx > -1)
        {
            sc(list[idx], " focus");
            obj.lastItemIdx = idx;
        }
        if (isChange)
        {
            obj.itemIdx = idx;
            if (obj.itemIdx > -1)
            {
                var v = obj.data;
                if (v) v = v.keyword;
                if (v) v = v[obj.itemIdx];
                if (v)
                {
                    obj.value = v = v.split(",")[0];
                    sv(obj.input, v);
					syncIpts();
                }
            }
            else if (obj.oldvalue)
            {
                obj.value = obj.oldvalue;
                if (gv(obj.input) != obj.oldvalue)
				{
					sv(obj.input, obj.oldvalue);
					syncIpts();
				}
            }
        }
    }

    function createMyInfo(bc)
    {
        var tit, a, b, c = creatDom,
            infoEl = {};
        tit = ce("p");
        ap(tit, ct("\u5E38\u7528\u5730\u5740"));
        ap(bc, tit);
        a = cc("sugHomeDiv");
        infoEl['homeA'] = c(
        {
            tag: "span",
            cls: "link fr",
            name: "myinfo|home",
            html: "[\u6DFB\u52A0]"
        }, a);
        c(
        {
            tag: "img",
            cls: "ico",
            src: G.path + "images/pixel.gif"
        }, a);
        ap(a, ct('\u6211\u7684\u5BB6: '));
        infoEl['home'] = c(
        {
            tag: "span",
            name: "sltmyinfo|home",
            cls: "nt",
            html: "loading..."
        }, a);
        ap(bc, a);
        b = cc("sugWorkDiv");
        infoEl['workA'] = c(
        {
            tag: "span",
            cls: "link fr",
            name: "myinfo|work",
            html: "[\u6DFB\u52A0]"
        }, b);
        c(
        {
            tag: "img",
            cls: "ico",
            src: G.path + "images/pixel.gif"
        }, b);
        ap(b, ct('\u5DE5\u4F5C\u5730: '));
        infoEl['work'] = c(
        {
            tag: "span",
            name: "sltmyinfo|work",
            cls: "nt",
            html: "loading..."
        }, b);
        ap(bc, b);

        function change(type, obj)
        {
            var el = infoEl[type],
                link = infoEl[type + "A"];
            if (!el) return;
            if (typeof obj == "object")
            {
                el.innerHTML = obj.name.subByte(20) || "\u65E0\u540D\u5730\u70B9";
                sc(el, "");
                link && (link.innerHTML = "[\u4FEE\u6539]");
                mi[type] = obj;
            }
            else
            {
                el.innerHTML = "\u672A\u6DFB\u52A0";
                sc(el, "nt");
                link && (link.innerHTML = "[\u6DFB\u52A0]");
                mi[type] = 0;
            }
        }
        JsClass("modules.myinfo", function (z)
        {
            if (!z) return;
            change('home', z()['get']('home'));
            change('work', z()['get']('work'));
        });
        ev2(G, "myinfo_change", change);
    }

    function createDiv()
    {
        if (!curIpt) return;
        var obj = curIpt,
            a, b, c, d, e, f;
        a = obj.div = ce("div");
        ap(obj.bc, a);
        obj.top = {};
        b = obj.top.div = cc("menucity");
        ap(a, b);
        c = obj.body = ce("ul");
        sc(c, "menuitem");
        sa(c, "name", "itemcon");
        ap(a, c);
        f = cc("sugMyInfo");
        if (obj.type != "myinfo")
        {
            createMyInfo(f);
            ap(a, f);
            c.style.borderBottom = "1px dashed #ccc";
        }
        d = cc("menubar");
        ap(a, d);
        e = ce("a");
        e.href = "javascript:void(0);";
        sc(e, "menuoff pointer");
        ap(e, ct("\u5173\u95ED"));
        sa(e, "name", "close|" + obj.input.id);
        ap(d, e);
        ap(d, ct("\u641C\u72D7\u5730\u56FE\u667A\u80FD\u63D0\u793A"));
        a.onclick = a.onmouseover = a.onmouseout = parseEvent;
    }

    function createCityMenu(a)
    {
        var b, c;
        a.div.innerHTML = "";
        b = a.btn = cc("citySelBtn");
        ap(b, cc("sugslt_1"));
        ap(b, cc("sugslt_2"));
        ap(b, cc("sugslt_3"));
        ap(b, cc("sugslt_4"));
        ap(a.div, b);
        d0(b);
        c = a.list = cc("cityMenuList");
        ap(a.div, c);
    }

    function showCities(a)
    {
        var obj = curIpt;
        if (!obj.top.btn || obj.top.list) createCityMenu(obj.top);
        if (a && a.length > 0)
        {
            forArray(toArr(a), function (b, i)
            {
				if (b == "±±¾©")
				{
					var city = ce("span");
					sa(city, "name", "citylist|" + i);
					ap(city, ct(b));
					ap(obj.top.list, city);
				}
            });
            d1(obj.top.div);
            d1(obj.top.btn);
            setTimeout(setSelBtn, 200, obj, 1);
        }
        else
        {
            d0(obj.top.div);
        }
    }
    var z = 0;

    function showList(a)
    {
        var obj = curIpt,
            c, d, kw = a.input,
            a = a.keyword;
        obj.body.innerHTML = "";
        if (a && a.length > 0)
        {
            forArray(toArr(a), function (b, i)
            {
                c = b.split(",");
                d = creatDom(
                {
                    tag: "li",
                    cls: "",
                    name: "itemlist|" + i,
                    html: termB(c[0], [kw])
                }, obj.body);
                creatDom(
                {
                    tag: "span",
                    cls: "iteminfo",
                    html: c[1] + (c[2] ? ("-" + c[2]) : "")
                }, d)
            });
            obj.itemIdx = -1;
            setItemCursor(obj, -1, 1);
            dp(obj, 1);
        }
        else
        {
            dp(obj, 0);
            return true;
        }
    }

    function show(a)
    {
        if (isSubmit)
        {
            isSubmit = 0;
            return;
        }
        if (!curIpt) return;
        var obj = curIpt;
        obj.ctIdx = 0;
        if (!obj.div) createDiv();
        if (a.cities && a.cities[0] != a.firstcity) a.cities.splice(0, 0, a.firstcity || "\u5168\u56FD");
        obj.data = filterKeyword(a);
        dp(obj, 1);
        if (a.cities) showCities(a.cities);
        else d0(obj.top.div);
        return showList(a);
    }

    function termB(a, b)
    {
        var e = a,
            f, k = /[\(\)\[\]\{\}\\\-\|\+\$\^\*\.\?]/g,
            m = "<b>",
            n = "</b>";

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
                }) + ")", "i");
                e = e.replace(f, g)
            }
        }
        return e.replace(/%+/g, "%").replace(/%1/g, m).replace(/%2/g, n)
    }

    function parseEvent(e)
    {
        var el = findNameEl(getElementByEvent(e), this),
            a;
        if (!el) return;
        var a = ga(el, "name"),
            et = (e || event).type,
            b = a.split("|"),
            c = b[0],
            args = [e || event, c];
        if (b.length > 1) args = args.concat(b[1]);
        if (FUN && FUN[c]) FUN[c].apply(this, args)
        else
        {
            switch (et)
            {
            case "click":
                doClick.apply(el, args);
                break;
            case "mouseover":
                doMouseOver.apply(el, args);
                break;
            case "mouseout":
                doMouseOut.apply(el, args);
                break;
            }
        }
    }

    function doClick(evt, type, a)
    {
        if (!curIpt) return;
        switch (type)
        {
        case "citylist":
            curIpt.ctIdx = parseInt(a) || 0;
            setSelBtn(curIpt);
            break;
        case "itemlist":
            curIpt.itemIdx = a ? parseInt(a) : -1;
            sv(curIpt.input, curIpt.data.keyword[curIpt.itemIdx].split(",")[0])
			syncIpts();
            submit(curIpt, curIpt.itemIdx);
            if (curIpt.bc) dp(curIpt, 0);
            break;
        case "close":
            var obj = IPTS[a];
            obj && dp(obj, 0);
            break;
        case "myinfo":
            JsClass("modules.myinfo", function (z)
            {
                if (!z) return;
                z()['show'](a);
            });
            break;
        case "sltmyinfo":
            if (mi[a])
            {
                sc(this, "");
                submit1(curIpt, mi[a]);
            }
            break;
        }
    }

    function submit1(obj, a)
    {
        var o = {};
        if (obj && a)
        {
            sv(obj.input, a.name);
			syncIpts();
            obj.itemIdx = -1;
            switch (obj.type)
            {
            case "bus":
            case "nav":
                o[obj.ft + "type"] = "coord";
                o[obj.ft + "coord"] = a.coord;
				o["what"] = a.name;
                break;
            }
            if (obj.bc) dp(obj, 0);
        }
        obj.submit(o);
    }

    function doMouseOver(evt, type, a)
    {
        if (!curIpt) return;
        switch (type)
        {
        case "itemlist":
            var idx = a ? parseInt(a) : -1
            setItemCursor(curIpt, idx);
            break;
        case "sltmyinfo":
            if (mi[a])
            {
                sc(this, "link");
            }
            break;
        }
    }

    function doMouseOut(evt, type, a)
    {
        if (!curIpt) return;
        switch (type)
        {
        case "itemlist":
            setItemCursor(curIpt, -1);
            break;
        case "sltmyinfo":
            if (mi[a])
            {
                sc(this, "");
            }
            break;
        }
    }

    function submit(obj, a)
    {
        var o = {}, inputid = obj.input.id || "";
        if (curIpt == obj && obj.data && obj.itemIdx > -1)
        {
            var a = obj.data.keyword[obj.itemIdx].split(",");
            if (a[3])
            {
                switch (obj.type)
                {
                case "myinfo":
                case "search":
					if (inputid=="searcharound_key")
					{
						o = {
							type: "uid",
							where: a[3],
							what: ""
						};
					}
					else
					{
						o = {
							type: "name",
							what: a[0]
						};
					}
                    break;
                case "bus":
                case "nav":
                    o[obj.ft + "type"] = "uid";
                    o[obj.ft + "id"] = a[3];
                    break;
                }
            }
        }
        obj.submit(o);
    }

    function dp(a, isShow)
    {
        if (a.bc)
        {
            var b = $(a.type + "_" + a.ft + "M");
            if (b)
            {
                sa(b, "curSt", isShow ? "c" : "m");
                sc(b, b.className.replace((isShow ? "m" : "c"), (isShow ? "c" : "m")))
            }
            a.body && window['d' + (a.body.childNodes.length == 0 ? 0 : 1)](a.body)
            window['d' + (isShow ? 1 : 0)](a.bc);
        }
    }
    ev(document, "click", function (a)
    {
        if (curIpt && curIpt.bc.style.display != "none" && !isChildNode(getElementByEvent(a), curIpt.bc.parentNode.parentNode))
        {
            setTimeout(function ()
            {
                if (curIpt) dp(curIpt, 0)
            }, 100);
        }
    });
    ev2(G, "swtag", function (a)
    {
        forEach(IPTS, function (b)
        {
            if (b.bc)
            {
                d1(b.bc);
                dp(b, 0)
            }
        });
        curIpt = null;
    });

    function main(a, b, c, d, e) //input,bc,form,apptype,fromto
    {
        if (Global.browser.isMobile()) return;
        var a = typeof (a) == "string" ? $(a) : a,
            z, sf = SF[c.id] || c.onsubmit;
        if (!a || a.tagName.toLowerCase() != "input" || !a.id) return;
        sa(a, "autocomplete", "off");
        z = IPTS[a.id] = {
            input: a,
            submit: sf,
            value: null,
            timer: null,
            bc: b,
            div: null,
            top: null,
            body: null,
            ctIdx: 0,
            itemIdx: -1,
            lastItemIdx: null,
            type: d || "search",
            ft: e || "",
            isCityList: !d || d != "bus" ? 1 : 0
        }
        if (!SF[c.id])
        {
            SF[c.id] = sf;
            c.onsubmit = function ()
            {
                isSubmit = 1;
                if (!curIpt)
                {
                    SF[c.id] && SF[c.id]();
                    return false;
                }
                var isd = curIpt.bc.style.display == "block"
                if (curIpt && curIpt.bc)
                {
                    dp(curIpt, 0);
                }
                if (!curIpt || curIpt.itemIdx == -1 || !isd)
                {
                    curIpt.submit();
                }
                else
                {
                    submit(curIpt);
                }
                curIpt.itemIdx = -1;
                return false;
            }
        }
        listenerInput(a);
        return z;
    }
    return main;
});