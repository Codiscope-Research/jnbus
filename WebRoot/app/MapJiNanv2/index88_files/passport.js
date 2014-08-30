function login(a, b, c) {
    var d = 650,
    e = 350;
    c === void 0 && (c = 0);
    var f = "http://passport.8684.com/8684/login_b_v2.php?ref=" + encodeURIComponent(a) + "&" + deal_with_op(b) + "&f5=" + c + "&v=" + (new Date).getTime(),
    g = '<div id="__mask" style="width: 100%; height:' + Math.max(document.documentElement.clientHeight, document.body.clientHeight, window.self.innerHeight || 0) + 'px; display: block; background-color: rgb(0, 0, 0); top: 0px; left: 0px; position: fixed;\n _position:absolute; z-index: 888; -moz-opacity:0.5; opacity:0.5; filter:alpha(opacity=50); background-position: initial initial; background-repeat: initial initial;"></div>';
    g += '<div id="topbox" style="top: 50%; left: 50%;width:610px;height:312px;margin-top:-156px;margin-left:-305px; position: fixed;_position: absolute; background: white; z-index: 999; display: block; border: 3px solid #e9e9e9;box-shadow: 1px 1px 1px #999;"><div style="border-bottom:1px solid #e9e9e9;height:42px;width:100%; background:#f7f7f7 url(http://passport.8684.com/8684/images/login_logo.png) no-repeat 15px center;"><span style="position: absolute;top: 6px;right:11px;font-size: 20px;  cursor: pointer;font-weight: normal;"\n onclick="rem_v();" target="_self">\u00d7</span></div>\n    <iframe src="' + f + '" width="610" height="270" frameborder="0" id="ifdd"></iframe><a href="http://passport.8684.com/8684/reg.php" style="position: absolute; color: #fff; bottom: -37px; right: 10px; background: no-repeat; height: 34px; line-height: 34px; font-size: 16px; background: url(http://passport.8684.com/8684/images/reg_now.gif) no-repeat left top; text-decoration: none;width:114px; border: 3px solid #e9e9e9; border-top:none;"></a></div>';
    var h = document.createElement("div");
    h.className = "__topC",
    h.innerHTML = g,
    document.body.appendChild(h),
    (/msie 6/i.test(navigator.userAgent) || /msie 7/i.test(navigator.userAgent)) && (document.getElementById("ifdd").src = f),
    sc1();
    var i = /msie 6/i.test(navigator.userAgent);
    i && (window.onscroll = sc1, window.onresize = sc1),
    window.onload = sc1
}
function reg(a, b) {
    var c = 600,
    d = 420,
    e = "http://passport.8684.com/8684/reg_b.php?ref=" + encodeURIComponent(a) + "&" + deal_with_op(b),
    f = '<div id="__mask" style="width: 100%; height:' + Math.max(document.documentElement.clientHeight, document.body.clientHeight, window.self.innerHeight || 0) + 'px; display: block; background-color: rgb(0, 0, 0); top: 0px; left: 0px; position: fixed;\n _position:absolute; z-index: 888; -moz-opacity:0.5; opacity:0.5; filter:alpha(opacity=50); background-position: initial initial; background-repeat: initial initial;"></div>';
    f += '<div id="topbox" style="top: 50%; left: 50%;width:610px;height:312px;margin-top:-156px;margin-left:-305px; position: fixed;_position: absolute; background: white; z-index: 999; display: block; border: 3px solid #e9e9e9;box-shadow: 1px 1px 1px #999;"><div style="border-bottom:1px solid #e9e9e9;height:42px;width:100%; background:#f7f7f7 url(http://passport.8684.com/8684/images/login_logo.png) no-repeat 15px center;"><span style="position: absolute;top: 6px;right:11px;font-size: 20px;  cursor: pointer;font-weight: normal;"\n onclick="rem_v();" target="_self">\u00d7</span></div>\n    <iframe src="' + f + '" width="610" height="270" frameborder="0" id="ifdd"></iframe><a href="http://passport.8684.com/8684/reg.php" style="position: absolute; color: #fff; bottom: -37px; right: 10px; background: no-repeat; height: 34px; line-height: 34px; font-size: 16px; background: url(http://passport.8684.com/8684/images/reg_now.gif) no-repeat left top; text-decoration: none;width:114px; border: 3px solid #e9e9e9; border-top:none;"></a></div>';
    var g = document.createElement("div");
    g.className = "__topC",
    g.innerHTML = f,
    document.body.appendChild(g),
    (/msie 6/i.test(navigator.userAgent) || /msie 7/i.test(navigator.userAgent)) && (document.getElementById("ifdd").src = e),
    sc1();
    var h = /msie 6/i.test(navigator.userAgent);
    h && (window.onscroll = sc1, window.onresize = sc1),
    window.onload = sc1
}
function deal_with_op(a) {
    var b = Array();
    if ("object" == typeof a) for (var c = 0; a.length > c; c++) b[c] = a[c][0] + "=" + encodeURIComponent(a[c][1]);
    return b.join("&")
}
function rem_v() {
    removeElement(document.getElementById("__mask")),
    removeElement(document.getElementById("topbox")),
    window.onscroll = null,
    window.onresize = null,
    window.onload = null
}
function removeElement(a) {
    var b = a.parentNode;
    b && b.removeChild(a)
}
function sc1() {
    var a = /msie 6/i.test(navigator.userAgent);
    if (a) {
	/*
        var b = document.documentElement.scrollTop || document.body.scrollTop,
        c = document.documentElement.scrollLeft || document.body.scrollLeft,
        d = document.documentElement.clientHeight || document.body.clientHeight,
        e = document.documentElement.clientWidth || document.body.clientWidth;
        document.getElementById("topbox").style.top = b + (d - document.getElementById("topbox").offsetHeight) / 2 + "px",
        document.getElementById("topbox").style.left = c + (e - document.getElementById("topbox").offsetWidth) / 2 + "px"
		*/
    } else 
	document.getElementById("topbox").style.position = "fixed",
    document.getElementById("topbox").style.top = "50%",
    document.getElementById("topbox").style.left = "50%",
    document.getElementById("topbox").style.marginLeft = "-300px";
    var f = navigator.userAgent.toLowerCase(); ("ipad" == f.match(/iPad/i) || "Android" == f.match(/Android/i) || "iPhone" == f.match(/iPhone/i)) && (document.getElementById("__mask").style.display = "none")
}
function creat_script(a) {
    document.getElementById("srcput") && removeElement(document.getElementById("srcput"));
    var b = document.createElement("div");
    if (b.id = "srcput", a) for (var c = 0; a.length > c; c++) {
        var d = document.createElement("script");
        d.type = "text/javascript",
        d.src = a[c] + "&v=" + (new Date).getTime(),
        b.appendChild(d)
    }
    document.body.appendChild(b)
}
function get_help(a) {
    return "object" == typeof a ? "undefined" != a.help ? a.help: "#": "#"
}
function get_nav8684(a) {
    if ("object" == typeof a) {
        if ("undefined" != a.nav) {
            var b = "_blank",
            c = "";
            if ("undefined" != a.nav.target && (b = a.nav.target), "undefined" != a.nav.content) for (var d = 0; a.nav.content.length > d; d++) c += '<a href="' + a.nav.content[d][0] + '" target="' + ("undefined" != a.nav.content[d][2] ? a.nav.content[d][2] : b) + '">' + a.nav.content[d][1] + "</a>";
            return c
        }
        return ""
    }
    return ""
}
function moreCtiy(a) {
    if ("local" == a) var b = "http://www.8684.com/ajax.php?ajax=citys&type=" + a + "&jsoncallback=?";
    else var b = "http://www.8684.com/ajax.php?ajax=citys&type=" + a + "&k=py&jsoncallback=?";
    var c = "";
    $.getJSON(b,
    function(b) {
        "local" == a && $.each(b.list,
        function(a, b) {
            c += '<a href="' + b.url + '">' + b.name + "</a>"
        }),
        ("qu" == a || "hotel" == a) && ("qu" == a ? c += '<a href="http://qu.8684.com/c_1">\u5317\u4eac</a><a href="http://qu.8684.com/c_501">\u5e7f\u5dde</a><a href="http://qu.8684.com/c_502">\u6df1\u5733</a><a href="http://qu.8684.com/c_2">\u4e0a\u6d77</a><a href="http://qu.8684.com/c_1201">\u6210\u90fd</a><a href="http://qu.8684.com/c_1401">\u6b66\u6c49</a><a href="http://qu.8684.com/c_801">\u5357\u4eac</a><a href="http://qu.8684.com/c_1001">\u6c88\u9633</a><a href="http://qu.8684.com/c_813">\u82cf\u5dde</a><a href="http://qu.8684.com/c_901">\u6d4e\u5357</a><a href="http://qu.8684.com/c_3114">\u897f\u5b89</a><a href="http://qu.8684.com/c_602">\u53a6\u95e8</a><a href="http://qu.8684.com/c_2201">\u957f\u6c99</a><a href="http://qu.8684.com/c_2101">\u5408\u80a5</a><a href="http://qu.8684.com/c_3">\u5929\u6d25</a><a href="http://qu.8684.com/c_701">\u676d\u5dde</a><a href="http://qu.8684.com/c_4">\u91cd\u5e86</a><a href="http://qu.8684.com/c_1501">\u90d1\u5dde</a><a href="http://qu.8684.com/c_702">\u5b81\u6ce2</a><a href="http://qu.8684.com/c_2001">\u54c8\u5c14\u6ee8</a><a href="http://qu.8684.com/c_601">\u798f\u5dde</a>': $.each(b.hotcity,
        function(a, b) {
            c += '<a href="' + b.url + '">' + b.name + "</a>"
        }), $(".hc_cityListPy,.hc_cityListUl").show(), moreCityUl("AB", b), $(".hc_cityListPy li").each(function() {
            $(this).click(function() {
                var a = $(this).html();
                $(this).addClass("cnt"),
                $(this).siblings().removeClass("cnt"),
                moreCityUl(a, b)
            })
        })),
        $(".hc_cityListHot").append(c)
    })
}
function moreCityUl(a, b) {
    for (var c = "",
    a = a.replace(/\s/g, ""), d = a.length, e = [], f = 0; d > f; f++) {
        e[f] = a.substring(f, f + 1);
        var g = "",
        h = e[f];
        void 0 == b.list[h] || ($.each(b.list[h],
        function(a, b) {
            g += '<a href="' + b.url + '">' + b.name + "</a>"
        }), c += '<li class="clear"><span>' + e[f] + '</span><div class="">' + g + "</div></li>")
    }
    $(".hc_cityListUl").html(c)
}
function getIframeBody(a) {
    var b = isLoadIframe(a);
    return b ? b: (setTimeout("getIframeBody('" + a + "')", 200), void 0)
}
function isLoadIframe(a) {
    var b = document.getElementById(a);
    if (b.onreadystatechange) {
        var c = b.readyState;
        if ("complete" == c || "interactive" == c) return b.contentWindow.document.body.innerHTML
    } else if (b.onload) return b.contentWindow.document.body.innerHTML;
    return ! 1
}