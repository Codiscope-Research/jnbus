/* Coypright (C) 2011 sohu.com rights reserved. */
/*LastModified by zzy at 20110601*/
(function ()
{
	function t0($)
	{
		return $ ? $.length : 0
	}
	function o1($)
	{
		return typeof ($) != "undefined"
	}
	function b(_, $)
	{
		return o1(_) && _ != null ? _ : $
	}
	function I(_, $)
	{
		return _.indexOf($) != -1
	}
	function G1()
	{
		var A = this,
			D, B, C, $ = ["opera", "msie", "firefox", "chrome", "applewebkit", "camino", "mozilla"],
			_ = ["x11;", "macintosh", "windows", "android", "iphone"];
		A.agent = D = navigator.userAgent;
		A.cpu = A.os = A.type = -1;
		A.revision = A.version = 0;
		D = D.toLowerCase();
		for (B = 0; B < t0($); B++)
		{
			C = $[B];
			if (I(D, C))
			{
				A.type = B;
				if ((new RegExp(C + "[ /]?([0-9]+(.[0-9]+)?)")).exec(D)) A.version = parseFloat(RegExp.$1);
				break
			}
		}
		if (A.type == 6) if (/^Mozilla\/.*Gecko\/.*(Minefield|Shiretoko)[\/]?([0-9]+(.[0-9]+)?)/.exec(A.agent))
		{
			A.type = 2;
			A.version = parseFloat(RegExp.$2)
		}
		for (B = 0; B < t0(_); B++)
		{
			C = _[B];
			if (I(D, C))
			{
				A.os = B;
				break
			}
		}
		if (A.os == 1 && I(D, "intel")) A.cpu = 0;
		A.isMozilla = function ()
		{
			var $ = A.type;
			return $ == 2 || $ == 6 || $ == 5
		};
		if (A.isMozilla() && /\brv:\s*(\d+\.\d+)/.exec(D)) A.revision = parseFloat(RegExp.$1);
		A.isGecko = function ()
		{
			return A.type == 3 || A.type == 4
		};
		A.isLowIE7 = function ()
		{
			return A.type == 1 && A.version < 7
		};
		A.getCompatMode = function ()
		{
			return b(document.compatMode, "")
		};
		A.isMobile = function ()
		{
			var $ = A.agent;
			return A.type == 4 && (I($, "iPhone") || I($, "iPod") || I($, "Android"))
		}
	}
	function Y(_, $)
	{
		window[_] = $
	}
	function Z(A, $, _)
	{
		A.prototype[$] = _
	}
	function a(A, $, _)
	{
		A[$] = _
	}
	var S = {};
	S.a = "http://log2.lsp.go2map.com/log.gif";
	S.b = "lib/style/";
	S.e = "http://key.go2map.com/lib";
	S.g = [function (B, _, A, $)
	{
		return "http://p" + b1(A) + ".go2map.com/seamless1/" + B.join("/") + ".GIF"
	}, function (B, _, A, $)
	{
		B[1] = "180";
		return "http://hbpic" + b1(A) + ".go2map.com/seamless/" + B.join("/") + ".JPG"
	}, function (B, _, A, $)
	{
		B[1] = "179";
		return "http://hbpic" + b1(A) + ".go2map.com/seamless/" + B.join("/") + ".PNG"
	}, function (B, _, A, $)
	{
		B[1] = "179";
		return ""
	}];
	S.h = ["180", "179"];
	S.expireFlag = "20080712008";
	S.i = S.uniqueId = function ()
	{
		var _ = Math.random,
			$ = parseInt;
		return Number(new Date()).toString() + $(10 * _()) + $(10 * _()) + $(10 * _())
	};
	S.j = S.copyright = ["&#169;2011 \u641c\u72d7\u5730\u56fe", "http://map.sogou.com/", "GS(2010)6004\u53f7"];
	S.l = S.browser = new G1();
	S.m = "http://tag.go2map.com/stylemanager/styleimage/";
	S.o = "http://lib.go2map.com/";
	S.r = ["NavInfo&amp;Nav2", "http://www.nav2.com.cn/"];
	S.t = ["CoolInvention", "http://www.coolinvention.com/"];
	S.s = [
		["DigitalGlobe", ""],
		["BSEI", "http://www.mapenjoy.com"]
	];
	Y("Global", S);

	function T(C, A, B, $)
	{
		var _ = V(A).createElement(C);
		if (A) W(A, _);
		if (B) m(_, B);
		if ($) p(_, $);
		return _
	}
	function V($)
	{
		return ($ ? $.ownerDocument : null) || document
	}
	function W(_, $)
	{
		_.appendChild($)
	}
	function m(A, $)
	{
		var _ = A.style;
		_.position = "absolute";
		_.left = o($.x);
		_.top = o($.y)
	}
	function o($)
	{
		return _0($) + "px"
	}
	function p(A, $)
	{
		var _ = A.style;
		_.width = o($.width);
		_.height = o($.height)
	}
	function q(_, $)
	{
		_.style.left = o($)
	}
	function d(_, $)
	{
		_.style.top = o($)
	}
	function j(_, $)
	{
		_.style.width = o($)
	}
	function k(_, $)
	{
		_.style.height = o($)
	}
	function l($)
	{
		$.style.display = "none"
	}
	function w($)
	{
		$.style.display = ""
	}
	function v($)
	{
		$.style.position = "absolute"
	}
	function _0($)
	{
		return Math.round($)
	}
	function z($)
	{
		return Math.floor($)
	}
	function s($)
	{
		return Math.ceil($)
	}
	function r(_, $)
	{
		return Math.max(_, $)
	}
	function u(_, $)
	{
		return Math.min(_, $)
	}
	function t($)
	{
		return Math.abs($)
	}
	function B0(_, $)
	{
		return _.getAttribute($)
	}
	function A0(A, $, _)
	{
		A.setAttribute($, _)
	}
	function N1(_, $)
	{
		return _.getElementsByTagName($)
	}
	function P1($)
	{
		$.style.visibility = "hidden"
	}
	function R1($)
	{
		$.style.visibility = "visible"
	}
	function S1(_, $)
	{
		_.style.zIndex = E1($)
	}
	function E1($)
	{
		return parseInt($)
	}
	function H1(_, $)
	{
		_.style.background = "url(\"" + $ + "\")"
	}
	function J1(_, $)
	{
		if (_ && $) _.removeChild($)
	}
	function L1(A, _)
	{
		var $ = V(_).createTextNode(A);
		if (_) W(_, $);
		return $
	}
	function Z1(A, _)
	{
		var $ = V(_).createElementNS("http://www.w3.org/2000/svg", A);
		if (_) W(_, $);
		return $
	}
	function a1(A, $, _)
	{
		A.style["filter"] = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=" + (_ ? "scale" : "crop") + ",src=\"" + $ + "\")"
	}
	function b1($)
	{
		return !$ ? 0 : t($) % 3
	}
	function T1(B, _, A)
	{
		var D, C, $ = [];
		if (!_) return B;
		for (D = 0; D < B.length; D++)
		{
			$[D] = [];
			for (C = 0; C < B[D].length; C++) if (_[D][C] != null && _[D][C] <= A) $[D].push(B[D][C])
		}
		return $
	}
	function V1(C)
	{
		var A = 1.5 * C.minX - 0.5 * C.maxX,
			B = 1.5 * C.minY - 0.5 * C.maxY,
			$ = 1.5 * C.maxX - 0.5 * C.minX,
			_ = 1.5 * C.maxY - 0.5 * C.minY;
		return new Bounds(A, B, $, _)
	}
	function X1(_, $)
	{
		return Math.abs(_ - $) > 0.00001
	}
	function Y1(D, _)
	{
		var C = [D[0], D[1], D[2], D[3]],
			B, $ = $1(D[0], D[1], _),
			A = $1(D[2], D[3], _),
			F, E;
		while ($ != 0 || A != 0)
		{
			if (($ & A) != 0) return null;
			B = ($ == 0 ? A : $);
			if ((B & 1) != 0)
			{
				F = _[0];
				E = D[1] + (D[3] - D[1]) * (_[0] - D[0]) / (D[2] - D[0])
			}
			else if ((B & 2) != 0)
			{
				F = _[2];
				E = D[1] + (D[3] - D[1]) * (_[2] - D[0]) / (D[2] - D[0])
			}
			else if ((B & 4) != 0)
			{
				E = _[1];
				F = D[0] + (D[2] - D[0]) * (_[1] - D[1]) / (D[3] - D[1])
			}
			else if ((B & 8) != 0)
			{
				E = _[3];
				F = D[0] + (D[2] - D[0]) * (_[3] - D[1]) / (D[3] - D[1])
			}
			if (B == $)
			{
				C[0] = F;
				C[1] = E;
				$ = $1(F, E, _)
			}
			else
			{
				C[2] = F;
				C[3] = E;
				A = $1(F, E, _)
			}
		}
		return C
	}
	function $1(B, A, $)
	{
		var _ = 0;
		if (B < $[0]) _ |= 1;
		else if (B > $[2]) _ |= 2;
		if (A < $[1]) _ |= 4;
		else if (A > $[3]) _ |= 8;
		return _
	}
	function y0(E, C)
	{
		var D, A = [],
			B, $ = -1,
			_, F;
		for (F = 0; F < E.length - 1; F++)
		{
			D = Y1([E[F].x, E[F].y, E[F + 1].x, E[F + 1].y], [C.minX, C.minY, C.maxX, C.maxY]);
			if (D)
			{
				_ = A[$];
				if (_ && _.length > 0) B = _[_.length - 1];
				if (!B || X1(B.x, D[0]) || X1(B.y, D[1]))
				{
					$++;
					A[$] = [];
					A[$].push(new Point(D[0], D[1]))
				}
				A[$].push(new Point(D[2], D[3]))
			}
		}
		return A
	}
	function A1(A, $)
	{
		var _ = [],
			B;
		for (B = 0; B < A.length; B++) _ = _.concat(y0(A[B], $));
		return _
	}
	function _1(E, C)
	{
		var D = C.minX,
			A = C.minY,
			B = C.maxX,
			$ = C.maxY,
			_;

		function F(V, B, J, $, K)
		{
			if (V == null) return null;
			var I = K - J,
				G = B - $,
				H = -I * B - G * J,
				S = [],
				R, O = -1,
				A, _, P, Q, N;
			for (R = 0; R < V.length; R++)
			{
				Q = V[R];
				A = Q[Q.length - 1].x;
				_ = Q[Q.length - 1].y;
				P = false;
				for (N = 0; N < Q.length; N++)
				{
					var E, F, C, D, M = Q[N],
						W, U, L = I * M.x + G * M.y + H > 0,
						T = I * A + G * _ + H > 0;
					if (L || T)
					{
						if (!P)
						{
							P = true;
							S[++O] = []
						}
						if (!L || !T)
						{
							E = _ - M.y;
							F = M.x - A;
							C = -E * M.x - F * M.y;
							D = F * I - G * E;
							W = (G * C - F * H) / D;
							U = (E * H - I * C) / D;
							S[O].push(new Point(W, U))
						}
						if (L) S[O].push(new Point(M.x, M.y))
					}
					A = M.x;
					_ = M.y
				}
			}
			return S
		}
		_ = F(E, D, A, D, $);
		_ = F(_, D, $, B, $);
		_ = F(_, B, $, B, A);
		_ = F(_, B, A, D, A);
		return _
	}
	function w0($)
	{
		return Math.sin($)
	}
	function v0($)
	{
		return Math.cos($)
	}
	function x0($)
	{
		return Math.acos($)
	}
	String.prototype.trim = function ()
	{
		return this.replace(/(^\s*)|(\s*$)/g, "")
	};
	String.prototype.trimLeft = function ()
	{
		return this.replace(/^\s*/g, "")
	};
	String.prototype.trimRight = function ()
	{
		return this.replace(/\s*$/g, "")
	};
	Array.prototype.clear = function ()
	{
		while (this.length > 0) this.pop()
	};
	var e0 = window.setTimeout;
	window.setTimeout = function (B, _)
	{
		if (typeof B == "function")
		{
			var A = Array.prototype.slice.call(arguments, 2),
				$ = (function ()
				{
					B.apply(null, A)
				});
			return e0($, _)
		}
		return e0(B, _)
	};
	if (S.l.type == 2)
	{
		XMLDocument.prototype.__proto__.__defineGetter__("xml", function ()
		{
			try
			{
				return new XMLSerializer().serializeToString(this)
			}
			catch ($)
			{
				var _ = T("div");
				_.appendChild(this.cloneNode(true));
				return _.innerHTML
			}
		});
		Element.prototype.__proto__.__defineGetter__("xml", function ()
		{
			try
			{
				return new XMLSerializer().serializeToString(this)
			}
			catch ($)
			{
				var _ = T("div");
				_.appendChild(this.cloneNode(true));
				return _.innerHTML
			}
		});
		XMLDocument.prototype.__proto__.__defineGetter__("text", function ()
		{
			return this.firstChild.textContent
		});
		Element.prototype.__proto__.__defineGetter__("text", function ()
		{
			return this.textContent
		});
		XMLDocument.prototype.selectSingleNode = Element.prototype.selectSingleNode = function (_)
		{
			var $ = this.selectNodes(_);
			if (!$ || $.length < 1) return null;
			return $[0]
		};
		XMLDocument.prototype.selectNodes = Element.prototype.selectNodes = function (D)
		{
			var B = new XPathEvaluator(),
				A = B.createNSResolver(this.ownerDocument == null ? this.documentElement : this.ownerDocument.documentElement),
				_ = B.evaluate(D, this, A, 0, null),
				C = [],
				$;
			while ($ = _.iterateNext()) C.push($);
			return C
		}
	}
	function B1(B, _, A)
	{
		try
		{
			if (_.indexOf(".") > -1) _ = (!A ? "" : "url(\"" + _ + "\")" + A + ",") + "url(\"" + _ + "\"),auto";
			B.style.cursor = _
		}
		catch ($)
		{
			if (_ == "pointer") B1(B, "hand")
		}
	}
	Y("_setCursor", B1);

	function D1($)
	{
		if (S.l.type == 1)
		{
			window.event.cancelBubble = true;
			window.event.returnValue = false
		}
		else
		{
			$.cancelBubble = true;
			$.preventDefault();
			$.stopPropagation()
		}
	}
	Y("_stopEvent", D1);

	function C1($)
	{
		return document.getElementById($)
	}
	Y("_el", C1);
	Y("_pixel", o);

	function F1(_, $)
	{
		if (_.className) _.className += " " + $;
		else _.className = $
	}
	Y("_setStyle", F1);

	function I1(_)
	{
		var $ = {
			"x": 0,
			"y": 0
		};
		while (_)
		{
			$.x += _.offsetLeft || 0;
			$.y += _.offsetTop || 0;
			_ = _.offsetParent
		}
		return $
	}
	Y("_offsetPositionAbsolute", I1);

	function K1(A, $)
	{
		var _ = {
			"x": 0,
			"y": 0
		};
		while (A && A != $)
		{
			_.x += A.offsetLeft || 0;
			_.y += A.offsetTop || 0;
			A = A.offsetParent
		}
		return _
	}
	Y("_offsetPositionRelative", K1);

	function M1()
	{}
	Y("_nullFunction", M1);

	function O1($)
	{
		return null
	}
	Y("_nullFunc", O1);

	function Q1()
	{
		return false
	}
	Y("_falseFunc", Q1);

	function u1(D, B, C)
	{
		if (!C) C = new G0();
		if (typeof D.pageX != "undefined")
		{
			var $ = I1(B);
			C.x = D.pageX - $.x;
			C.y = D.pageY - $.y
		}
		else if (typeof D.offsetX != "undefined")
		{
			var _ = D.target || D.srcElement,
				A = K1(_, B);
			C.x = D.offsetX + A.x;
			C.y = D.offsetY + A.y
		}
		return C
	}
	Y("_getRelativeClickPoint", u1);

	function s1($)
	{
		while ($.hasChildNodes()) J1($, $.lastChild)
	}
	Y("_clearAllChildNodes", s1);

	function t1(A)
	{
		try
		{
			if (typeof ActiveXObject != "undefined" && typeof GetObject != "undefined")
			{
				var $ = new ActiveXObject("Microsoft.XMLDOM");
				$.loadXML(A);
				return $
			}
			else if (typeof DOMParser != "undefined") return (new DOMParser()).parseFromString(A, "text/xml");
			else
			{
				d1.a("\u4e0d\u652f\u6301DOM");
				return O1(A)
			}
		}
		catch (_)
		{
			d1.a(_.toString(), "exception")
		}
	}
	Y("_getDomFromString", t1);

	function S0(A)
	{
		var $, _;
		try
		{
			if (typeof ActiveXObject != "undefined" && typeof GetObject != "undefined") $ = new ActiveXObject("Microsoft.XMLDOM");
			else if (document.implementation)
			{
				$ = document.implementation.createDocument("", "doc", null);
				_ = window.location.href;
				_ = _.substring(0, _.lastIndexOf("/"));
				A = _ + "/" + A
			}
			$.async = false;
			_ = $.load(A);
			if ($.parseError && $.parseError.errorCode) d1.a("load " + A + " error,reason:" + "\n\n" + $.parseError.reason, "exception");
			return $
		}
		catch (_)
		{
			d1.a(_.toString(), "exception")
		}
	}
	Y("_getDomFromFile", S0);

	function R0(_)
	{
		var $ = T("iframe", null, new G0(-120, -120), new X0(80, 80));
		$.id = _;
		$.name = _;
		document.body.appendChild($);
		return $
	}
	Y("_createIframeElement", R0);

	function U0($)
	{
		if ($.contentWindow) return $.contentWindow;
		else return window[$.id]
	}
	Y("_getIframeContentWindow", U0);

	function T0(E)
	{
		if (!E) return null;
		else if (E.nodeType == 1)
		{
			var C = N0(E);
			if (C) return T0(C);
			else
			{
				var D = [];
				for (var A = 0; A < E.childNodes.length; ++A)
				{
					var B = E.childNodes[A],
						$ = T0(B);
					if (!D[B.nodeName]) D[B.nodeName] = typeof ($) == "object" ? $ : [$];
					else if (D[B.nodeName].length == 0)
					{
						var _ = D[B.nodeName];
						D[B.nodeName] = [_, $]
					}
					else D[B.nodeName].push($)
				}
				for (A = 0; A < E.attributes.length; ++A)
				{
					var F = E.attributes[A];
					D[F.nodeName] = F.nodeValue
				}
				return D
			}
		}
		else if (E.nodeType == 3 || E.nodeType == 8) return "" + E.nodeValue;
		else return null
	}
	Y("_parseXmlToObject", T0);

	function N0(B)
	{
		if (B.attributes && B.attributes.length > 0) return null;
		var _ = null;
		for (var A = 0; A < B.childNodes.length; ++A)
		{
			var $ = B.childNodes[A];
			if ($.nodeType == 1) return null;
			if (($.nodeType == 3 || $.nodeType == 8) && !$.nodeValue.match(/^\s*$/)) if (!_) _ = $;
			else return null
		}
		return _
	}
	Y("_getTextNode", N0);

	function M0(_, $)
	{
		return _0(_ * 1000000) == _0($ * 1000000)
	}
	Y("_isApproxEquals", M0);

	function Q0(A)
	{
		if (!A) return "";
		if (typeof A.text != "undefined") return A.text;
		if (A.nodeType == 3 || A.nodeType == 4) return A.nodeValue;
		var $ = "";
		if (A.nodeType == 1) for (var _ = A.firstChild; _ != null; _ = _.nextSibling) $ += Q0(_);
		return $
	}
	Y("_getTextFromXmlNode", Q0);

	function O0(C, A, B)
	{
		var $ = d0(C, A),
			_ = c0($, B);
		return _
	}
	Y("_splitResult", O0);

	function d0(_, $)
	{
		return _.split($)
	}
	Y("_splitBy", d0);

	function c0(B, _)
	{
		var A, $ = [];
		if (B.length <= 0) return "";
		for (var C = 0; C < B.length; ++C)
		{
			A = B[C].split(_);
			$[A[0]] = A[1]
		}
		return $
	}
	Y("_getItemArrayFromRet", c0);

	function g0(F)
	{
		var D, E, B, C = "",
			$, A, H = /[^\u4E00-\u9FA5\w\s]/g,
			I, G;
		D = window.location.href.replace(/&amp;/g, "&");
		B = (E = D.indexOf("?")) > -1 ? E : D.indexOf("#");
		if (F != null && B > -1)
		{
			D = D.substring(B + 1);
			D = D.replace(/#/g, "&");
			E = D.split("&");
			for (B = 0; B < E.length; B++)
			{
				$, A;
				$ = E[B].split("=")[0];
				A = E[B].substring(E[B].indexOf("=") + 1);
				try
				{
					I = G = "";
					I = decodeURIComponent($);
					G = decodeURIComponent(A);
					$ = I;
					A = G
				}
				catch (_)
				{}
				$ = $.indexOf("%u") > -1 ? unescape($) : $;
				A = A.indexOf("%u") > -1 ? unescape(A) : A;
				if ($ == F) C = A
			}
		}
		return C
	}
	Y("_getParameter", g0);

	function f0(D)
	{
		var B = "!@#$%^&*()|'\"-=",
			C, _, A, $ = /\\([^u]|$)/g;
		while ($.test(D)) D = D.replace($, "\\u005c$1");
		C = B.length;
		for (var E = 0; E < C; E++)
		{
			_ = B.charAt(E);
			A = _.charCodeAt(0).toString(16);
			A = "\\u0000".substr(0, 6 - A.length) + A;
			D = D.replace(new RegExp("\\" + _, "g"), A)
		}
		B = C = _ = A = E = null;
		return D
	}
	Y("_charFilter", f0);

	function Y0(E, C, D, A)
	{
		var B = window.location.hash.replace(/#/, ""),
			$, _, F = "_URLHASH_",
			G = window[F],
			H;
		if (!G && B)
		{
			G = window[F] = {};
			$ = B.split("&");
			for (H = 0; H < $.length; H++)
			{
				_ = $[H].split("=");
				if (_[0] && _[1]) G[_[0]] = _[1]
			}
		}
		if (!G || (!E && !C) || D) G = window[F] = {};
		G[E] = C;
		window.clearTimeout(window[F + "T"]);
		window[F + "T"] = window.setTimeout(function ()
		{
			var A, $ = [],
				_;
			for (A in G)
			{
				_ = typeof (G[A]);
				if ((_ == "string" || _ == "number") && G[A] != null && G[A] != "") $.push(A + "=" + G[A])
			}
			window.location.hash = $.join("&")
		}, !A ? 1000 : A)
	}
	Y("_setUrlHashParam", Y0);

	function b0(D, B)
	{
		var C = 0,
			_ = D.length,
			A = [],
			$ = g = h = i = dx = dy = x = y = 0;
		B = !B && B != 0 ? 0 : B;
		h = Math.pow(10, B);
		while (i < _)
		{
			$ = 0;
			g = 0;
			do
			{
				C = D.charCodeAt(i++) - 63;
				g |= (C & 31) << $;
				$ += 5
			} while (C >= 32);
			dx = ((g & 1) ? ~ (g >> 1) : (g >> 1));
			x += dx;
			$ = 0;
			g = 0;
			do
			{
				C = D.charCodeAt(i++) - 63;
				g |= (C & 31) << $;
				$ += 5
			} while (C >= 32);
			dy = ((g & 1) ? ~ (g >> 1) : (g >> 1));
			y += dy;
			A.push([x / h, y / h])
		}
		return A
	}
	Y("_decodeXY", b0);

	function Z0(A)
	{
		var $ = [],
			_ = 0,
			B;
		for (B = 0; B < A.length; ++B)
		{
			_ = A.charCodeAt(B) - 64;
			$.push(_)
		}
		return $
	}
	Y("_decodeLevels", Z0);

	function h0($)
	{
		var _ = $.constructor.toString();
		return _.substring(_.indexOf("function ") + 9, _.indexOf("("))
	}
	Y("getClassName", h0);

	function K0()
	{
		try
		{
			if (window.XMLHttpRequest) return new XMLHttpRequest();
			else if (typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP")
		}
		catch ($)
		{}
		return null
	}
	function p1(D, B, C, E, _)
	{
		var A = K0();
		if (!A) return false;
		if (B) A.onreadystatechange = function ()
		{
			if (A.readyState == 4)
			{
				var $ = e1(A);
				B($.responseText, $.responseXML, $.status);
				A.onreadystatechange = M1
			}
		};
		if (C)
		{
			A.open("POST", D, !E);
			var $ = _;
			if (!$) $ = "application/x-www-form-urlencoded";
			A.setRequestHeader("Content-Type", $);
			A.send(C)
		}
		else
		{
			A.open("GET", D, !E);
			A.send(null)
		}
		return A
	}
	function e1(C)
	{
		var A = -1,
			B = null,
			$ = null;
		try
		{
			A = C.status;
			B = C.responseText;
			$ = C.responseXML
		}
		catch (_)
		{}
		return {
			status: A,
			responseText: B,
			responseXML: $
		}
	}
	function u0(B, _, A, $)
	{
		var C = this;
		C.minX = B;
		C.minY = _;
		C.maxX = A;
		C.maxY = $;
		C.toString = function ()
		{
			return "Bounds(" + C.minX + "," + C.minY + "," + C.maxX + "," + C.maxY + ")"
		};
		C.isNull = function ()
		{
			var $ = null;
			return (C.minX == $ && C.minY == $ && C.maxX == $ && C.maxY == $)
		};
		C.clone = function ($)
		{
			C.minX = $.minX;
			C.minY = $.minY;
			C.maxX = $.maxX;
			C.maxY = $.maxY
		};
		C.containsSegment = function (A, $)
		{
			var _ = false;
			if (C.minX > A.x && C.minX > $.x) return _;
			if (C.maxX < A.x && C.maxX < $.x) return _;
			if (C.minY > A.y && C.minY > $.y) return _;
			if (C.maxY < A.y && C.maxY < $.y) return _;
			return true
		};
		C.containsBounds = function ($)
		{
			return C.minX < $.minX && (C.maxX > $.maxX && (C.minY < $.minY && C.maxY > $.maxY))
		};
		C.isIntersect = function ($)
		{
			return !(C.maxX < $.minX || C.minX > $.maxX || C.maxY < $.minY || C.minY > $.maxY)
		};
		C.extend = function ($)
		{
			C.minX = !C.minX ? $.x : u(C.minX, $.x);
			C.maxX = !C.maxX ? $.x : r(C.maxX, $.x);
			C.minY = !C.minY ? $.y : u(C.minY, $.y);
			C.maxY = !C.maxY ? $.y : r(C.maxY, $.y)
		}
	}
	u0.intersection = function (_, $)
	{
		return new u0(r(_.minX, $.minX), r(_.minY, $.minY), u(_.maxX, $.maxX), u(_.maxY, $.maxY))
	};
	u0.merge = function (_, $)
	{
		return new u0(u(_.minX, $.minX), u(_.minY, $.minY), r(_.maxX, $.maxX), r(_.maxY, $.maxY))
	};
	Y("Bounds", u0);

	function W1()
	{
		var H = this,
			_ = 6370996.81,
			C = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
			F = [75, 60, 45, 30, 15, 0],
			$ = [
				[1.410526172116255e-8, 0.00000898305509648872, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 17337981.2],
				[-7.435856389565537e-9, 0.000008983055097726239, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86],
				[-3.030883460898826e-8, 0.00000898305509983578, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37],
				[-1.981981304930552e-8, 0.000008983055099779535, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06],
				[3.09191371068437e-9, 0.000008983055096812155, 0.00006995724062, 23.10934304144901, -0.00023663490511, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4],
				[2.890871144776878e-9, 0.000008983055095805407, -3.068298e-8, 7.47137025468032, -0.00000353937994, -0.02145144861037, -0.00001234426596, 0.00010322952773, -0.00000323890364, 826088.5]
			],
			E = [
				[-0.0015702102444, 111320.7020616939, 1704480524535203, -10338987376042340, 26112667856603880, -35149669176653700, 26595700718403920, -10725012454188240, 1800819912950474, 82.5],
				[0.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142, -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5],
				[0.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455, -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5],
				[0.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5],
				[-0.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5],
				[-0.0003218135878613132, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]
			];
		H.distanceByMC = function (C, _)
		{
			var A, $, H, E, G, F;
			A = this.convertMC2LL(C);
			H = D(A.x);
			E = D(A.y);
			$ = this.convertMC2LL(_);
			G = D($.x);
			F = D($.y);
			return B(H, G, E, F)
		};
		H.distanceByLL = function (_, $)
		{
			var F, E, A, C;
			F = D(_.x);
			A = D(_.y);
			E = D($.x);
			C = D($.y);
			return B(F, E, A, C)
		};
		H.convertMC2LL = function (G, E)
		{
			var F, B, D, _;
			F = new G0(t(G.x), t(G.y));
			if (!E) E = new G0();
			for (var H = 0; H < C.length; H++) if (F.y > C[H])
			{
				D = $[H];
				break
			}
			return A(E, G, D)
		};
		H.convertLL2MC = function (D, B)
		{
			var C, $, _;
			C = new G0(t(D.x), t(D.y));
			if (!B) B = new G0();
			for (var G = 0; G < F.length; G++) if (C.y > F[G])
			{
				_ = E[G];
				break
			}
			return A(B, D, _)
		};
		H.boundByLL = function (I, E)
		{
			var H, B, C, $ = [],
				A, J, F;
			H = D(I.x);
			B = D(I.y);
			F = E / _;
			F = F - F * Math.PI;
			C = x0((v0(F) - w0(B) * w0(B)) / (v0(B) * v0(B)));
			A = x0(v0(B) * v0(F) + w0(B) * w0(F));
			J = x0(v0(B) * v0(F) - w0(B) * w0(F));
			$[0] = G(H - C);
			$[1] = J < A ? G(A) : G(J);
			$[2] = G(H + C);
			$[3] = J > A ? G(A) : G(J);
			return $
		};
		H.boundByMC = function (C, A)
		{
			var B, $, _;
			B = H.boundByLL(H.convertMC2LL(C), A);
			$ = H.convertLL2MC(
			{
				x: B[0],
				y: B[1]
			});
			_ = H.convertLL2MC(
			{
				x: B[2],
				y: B[3]
			});
			return [$.x, $.y, _.x, _.y]
		};

		function A(B, _, A)
		{
			B.x = A[0] + A[1] * t(_.x);
			var $ = t(_.y) / A[9];
			B.y = A[2] + A[3] * $ + A[4] * $ * $ + A[5] * $ * $ * $ + A[6] * $ * $ * $ * $ + A[7] * $ * $ * $ * $ * $ + A[8] * $ * $ * $ * $ * $ * $;
			B.x *= (_.x < 0 ? -1 : 1);
			B.y *= (_.y < 0 ? -1 : 1);
			return B
		}
		function D($)
		{
			return Math.PI * $ / 180
		}
		function B(C, B, $, A)
		{
			return _ * x0((w0($) * w0(A) + v0($) * v0(A) * v0(B - C)))
		}
		function G($)
		{
			return 180 * $ / Math.PI
		}
	}
	Y("ConvertorLLndMC", W1);

	function r1(B, _, A, $)
	{
		var C = this;
		C.id = B;
		C.features = _;
		C.bounds = A;
		C.xml = $;
		C.loadFromXML = function (_)
		{
			var $ = r1.loadFromString(_);
			C.id = $.id;
			C.features = $.features;
			C.bounds = $.bounds;
			C.xml = $.xml
		}
	}
	r1.a = function (D)
	{
		var C = B0(D, "id"),
			A = N1(D, "feature");
		if (A.length == 0) A = N1(D, "Feature");
		if (A.length == 0) A = N1(D, "ad");
		var B = [],
			$, _ = new u0(),
			E;
		for (var F = 0; F < A.length; F++)
		{
			$ = Q.a(A[F]);
			B.push($);
			E = $.bounds;
			if (_.isNull()) _.clone(E);
			_ = u0.merge(_, E)
		}
		return new r1(C, B, _, D)
	};
	r1.loadFromString = function (A)
	{
		var _ = (typeof (A) == "string" ? t1(A) : A);
		if (_.nodeName != "data" && _.nodeName != "Data")
		{
			var $ = N1(_, "data");
			if ($.length == 0) $ = N1(_, "Data");
			if ($.length == 0) return;
			if ($.length > 0) _ = $[0]
		}
		if (!_) return;
		return r1.a(_)
	};
	Y("DataNode", r1);
	a(r1, "loadFromXML", r1.a);

	function q1(B, _, A, $)
	{
		var C = this;
		C.src = B;
		C.bounds = $;
		C.c = false;
		C.d = new G0(0, 0);
		C.e = false;
		C.f = new G0(0, 0);
		v(C.src);
		C.moveTo(_ != null ? _ : B.offsetLeft, A != null ? A : B.offsetTop);
		C.eh = C.eventHandler;
		C.g = C.eh("onMD");
		C.h = C.eh("onMV");
		C.i = C.eh("onMU");
		C.j = C.eh("onDbC");
		C.cl = C.eh("onClick");
		C.addEvents()
	}
	var p0 = q1.prototype = new n();
	p0.moveTo = function (_, $)
	{
		var A = this;
		if (A.left != _ || A.top != $)
		{
			A.left = _;
			A.top = $;
			q(A.src, A.left);
			d(A.src, A.top);
			L.d(A, "move")
		}
	};
	p0.onMD = function (_)
	{
		var A = this;
		L.d(A, "mousedown", _);
		if (_.cancelDrag) return;
		var $ = _.button == 0 || _.button == 1;
		if (A.c || !$)
		{
			D1(_);
			return false
		}
		A.d.x = _.clientX;
		A.d.y = _.clientY;
		A.e = true;
		L.f(A.eventSrc, "mousemove", A.h);
		L.f(A.eventSrc, "mouseup", A.i);
		if (A.src.setCapture) A.src.setCapture();
		A.clickStartTime = (new Date()).getTime();
		A.f.x = _.clientX;
		A.f.y = _.clientY;
		L.d(A, "dragstart");
		A.originalCursor = A.src.style.cursor.replace(/url\(|[\)\'\"]/g, "");
		B1(A.src, "move");
		D1(_)
	};
	p0.onMV = function (E)
	{
		var H = this;
		if (S.l.os == 1)
		{
			if (E == null) return;
			if (H.dragDisabled)
			{
				H.savedMove = new Object();
				H.savedMove.clientX = E.clientX;
				H.savedMove.clientY = E.clientY;
				return
			}
			H.setTimeout(function ()
			{
				this.dragDisabled = false;
				this.onMV(this.savedMove)
			}, 30);
			H.dragDisabled = true;
			H.savedMove = null
		}
		var C, D, A = 0,
			B = 0;
		C = H.left + (E.clientX - H.d.x);
		D = H.top + (E.clientY - H.d.y);
		if (H.bounds)
		{
			var $ = C;
			if (C < H.bounds.minX) $ = H.bounds.minX;
			else
			{
				var _ = H.bounds.maxX - H.src.offsetWidth;
				if (C > _) $ = _
			}
			A = $ - C;
			C = $;
			var F = D;
			if (D < H.bounds.minY) F = H.bounds.minY;
			else
			{
				var G = H.bounds.maxY - H.src.offsetHeight;
				if (D > G) F = G
			}
			B = F - D;
			D = F
		}
		H.moveTo(C, D);
		H.d.x = E.clientX + A;
		H.d.y = E.clientY + B;
		L.d(H, "drag")
	};
	p0.onMU = function (A)
	{
		var $ = this;
		L.g($.eventSrc, "mousemove", $.h);
		L.g($.eventSrc, "mouseup", $.i);
		$.e = false;
		B1($.src, $.originalCursor);
		if (document.releaseCapture) document.releaseCapture();
		var _ = (new Date()).getTime();
		if (_ - $.clickStartTime <= 500 && (t($.f.x - A.clientX) <= 1 && t($.f.y - A.clientY) <= 1));
		else L.d($, "dragend")
	};
	p0.onClick = function (A)
	{
		var $ = this,
			_ = (new Date()).getTime();
		if (_ - $.clickStartTime <= 500 && (t($.f.x - A.clientX) <= 1 && t($.f.y - A.clientY) <= 1)) L.d(this, "click", A)
	};
	p0.onDbC = function (_)
	{
		var $ = _.button == 0 || _.button == 1;
		if (this.c || !$)
		{
			D1(_);
			return false
		}
		L.d(this, "dblclick", _)
	};
	p0.onWindowMouseOut = function ($)
	{
		if (!$.relatedTarget && this.e) this.onMU($)
	};
	p0.disable = function ()
	{
		this.removeEvents();
		this.c = true
	};
	p0.enable = function ()
	{
		this.removeEvents();
		this.addEvents();
		this.c = false
	};
	p0.addEvents = function ()
	{
		var $ = this;
		if (S.l.type != 1) L.f(window, "mouseout", $.eh("onWindowMouseOut"));
		$.eventSrc = $.src.setCapture ? $.src : window;
		L.f($.src, "mousedown", $.g);
		L.f($.src, "click", $.cl);
		L.f($.src, "dblclick", $.j)
	};
	p0.removeEvents = function ()
	{
		var $ = this;
		if (S.l.type != 1) L.g(window, "mouseout", $.eh("onWindowMouseOut"));
		$.eventSrc = $.src.setCapture ? $.src : window;
		L.g($.src, "mousedown", $.g);
		L.g($.src, "click", $.cl);
		L.g($.src, "dblclick", $.j)
	};
	Y("DragObject", q1);

	function L()
	{}
	L.a = function (B, _, A)
	{
		var $ = L.e(_);
		if (B[$]) B[$].push(A);
		else B[$] = [A];

		function C(A, $, _)
		{
			this.instance = A;
			this.propertyName = $;
			this.listenerFn = _
		}
		return new C(B, $, A)
	};
	L.b = function (A)
	{
		var $ = A.instance[A.propertyName];
		for (var _ = 0; _ < $.length; _++) if ($[_] == A.listenerFn)
		{
			$.splice(_, 1);
			return
		}
	};
	L.c = function (A, $)
	{
		var _ = L.e($);
		A[_] = null
	};
	L.d = function (E, C)
	{
		var D = L.e(C),
			A = E[D];
		if (A && A.length > 0)
		{
			var B = [];
			for (var $ = 2; $ < arguments.length; $++) B.push(arguments[$]);
			for ($ = 0; $ < A.length; $++)
			{
				var _ = A[$];
				if (_)
				{
					try
					{
						_.apply(E, B)
					}
					catch (F)
					{
						d1.a(F + "\n" + h0(E) + " " + C + "\n" + _, "Event.trigger() exception")
					}
				}
			}
		}
	};
	L.e = function ($)
	{
		return "_e__" + $
	};
	L.f = function (C, A, B)
	{
		if (S.l.type == 3 && A == "dblclick")
		{
			C["on" + A] = B;
			return
		}
		if (C.addEventListener) C.addEventListener(A, B, false);
		else if (C.attachEvent) C.attachEvent("on" + A, B);
		else C["on" + A] = B;
		var $ = {
			obj: C,
			ev: A,
			func: B
		},
			_ = C["__ev__"];
		if (!_) _ = C["__ev__"] = [];
		_.push($);
		return $
	};
	L.g = function (B, _, A)
	{
		var $ = B;
		if (!_ && !A)
		{
			B = $.obj;
			_ = $.ev;
			A = $.func
		}
		if (B.removeEventListener) B.removeEventListener(_, A, false);
		else if (B.detachEvent) B.detachEvent("on" + _, A);
		else B["on" + _] = null
	};
	Y("Event", L);
	Y("SEvent", L);
	a(L, "addListener", L.a);
	a(L, "removeListener", L.b);
	a(L, "clearListeners", L.c);
	a(L, "trigger", L.d);
	a(L, "addBuiltInListener", L.f);
	a(L, "removeBuiltInListener", L.g);

	function P()
	{
		var B, A = "",
			C = "",
			_ = "",
			$ = "";
		this.setLinkType = function ($)
		{
			if ($ == "Disperse" || $ == "Open" || $ != "Close") A = $
		};
		this.setRadius = function ($)
		{
			C = $
		};
		this.setFeatureDescAsCoordType = function (C, _)
		{
			var D = "",
				A = "";
			if (C == null || _ == null || typeof C != "object" || C.length < 1) return;
			B = "Coord";
			for (var E = 0; E < C.length; E++)
			{
				A += D + C[E].x + " " + C[E].y;
				D = ","
			}
			$ = A + ":" + _
		};
		this.setFeatureDescAsNameType = function (D, C)
		{
			var A = "",
				_ = "";
			if (C == null || D == null || typeof C != "object" || C.length < 1) return;
			if (D == "") return;
			B = "Name";
			for (var E = 0; E < C.length; E++)
			{
				_ += A + C[E];
				A = ","
			}
			$ = D + ":" + _
		};
		this.setFeatureDescAsFidType = function (C, _, D)
		{
			var A = "",
				F = "";
			if (C == null || _ == null || typeof _ != "object" || _.length < 1) return;
			if (C == "") return;
			B = "FID";
			for (var E = 0; E < _.length; E++)
			{
				F += A + _[E];
				A = ","
			}
			if (D)
			{
				if (B != "FID") $ = "";
				if ($ == "" || $ == null)
				{
					A = "";
					$ = ""
				}
				else A = "::";
				$ += A + C + ":" + F
			}
			else $ = C + ":" + F
		};
		this.setFeatureDescAsUidType = function (_)
		{
			var C = "",
				A = "";
			if (_ == null || typeof _ != "object" || _.length < 1) return;
			B = "UID";
			for (var D = 0; D < _.length; D++)
			{
				A += C + _[D];
				C = ","
			}
			$ = A
		};
		this.getFeatureDescType = function ()
		{
			_ = B + "," + A + "," + C;
			return _
		};
		this.getFeatureDesc = function ()
		{
			return $
		};
		this.getRadius = function ()
		{
			return C
		}
	}
	Y("FeatureDesc", P);

	function Q(E, C, D, A, B, $, _, G, I, F)
	{
		var H = this;
		H.id = E;
		H.caption = C;
		H.type = D;
		H.points = A;
		H.bounds = B;
		H.style = $;
		H.label = _;
		H.detail = G;
		H.segments = I;
		H.xml = F
	}
	Q.a = function (J)
	{
		var C = new u0(),
			H, I, F, G, d, c, Z, W;
		H = B0(J, "id");
		I = B0(J, "caption");
		F = B0(J, "type");
		G = N1(J, "points");
		if (G.length == 0) G = N1(J, "Points");
		var a = [];
		if (G.length > 0)
		{
			var b = G[0];
			G = B0(b, "value");
			Z = B0(b, "type");
			W = B0(b, "in");
			if (!G) G = Q0(b);
			var e = G.split("#"),
				K = [];
			for (d = 0; d < e.length; d++)
			{
				var M = 0,
					A = Z == "C";
				if (A) c = b0(e[d]);
				else c = e[d].split(",");
				M = A ? c.length : c.length / 2;
				var $ = [];
				for (var N = 0; N < M; N++)
				{
					var X = A ? c[N][0] : c[N * 2],
						V = A ? c[N][1] : c[N * 2 + 1];
					if (X && V)
					{
						X = parseFloat(X);
						V = parseFloat(V);
						var _ = new G0(X, V);
						K.push(_);
						$.push(_);
						if (C.isNull())
						{
							C.minX = X;
							C.minY = V;
							C.maxX = X;
							C.maxY = V
						}
						C.extend(_)
					}
				}
				a.push($)
			}
			G = K
		}
		var D = N1(J, "bound");
		if (D.length > 0)
		{
			D = B0(D[0], "value");
			if (!D) D = Q0(D[0]);
			var S = D.split(",");
			D = new u0();
			D.minX = parseFloat(S[0]);
			D.minY = parseFloat(S[1]);
			D.maxX = parseFloat(S[2]);
			D.maxY = parseFloat(S[3])
		}
		else
		{
			D = N1(J, "bounds");
			if (D.length == 0) D = N1(J, "Bounds");
			if (D.length > 0)
			{
				S = D[0];
				D = new u0();
				D.minX = parseFloat(B0(S, "minx"));
				D.minY = parseFloat(B0(S, "miny"));
				D.maxX = parseFloat(B0(S, "maxx"));
				D.maxY = parseFloat(B0(S, "maxy"))
			}
		}
		var E = N1(J, "style");
		if (E.length == 0) E = N1(J, "Style");
		if (E.length > 0)
		{
			var R = B0(E[0], "id");
			if (R == "custom") E = l1.loadFromXML(E[0]);
			else E = new l1(R, F)
		}
		var T = N1(J, "label");
		if (T.length == 0) T = N1(J, "Label");
		if (T.length > 0) T = T0(T[0]);
		var O = N1(J, "detail");
		if (O.length == 0) O = N1(J, "Detail");
		var P, L, U, R, Y, B;
		if (O.length > 0)
		{
			L = O[0].firstChild;
			B = B0(O[0], "src");
			U = B0(O[0], "width");
			R = B0(O[0], "height");
			Y = B0(O[0], "infowin");
			P = {
				"href": B0(O[0], "href"),
				"content": !L ? "" : L.nodeValue,
				"src": (!B ? "" : B),
				"width": (!U ? "251" : U),
				"height": (!R ? "142" : R),
				"infowin": (!Y ? "false" : Y)
			}
		}
		else P = {
			"href": "",
			"content": "",
			"src": "",
			"infowin": "false"
		};
		if (!D || !D.maxX) D = C;
		var f = new Q(H, I, F, G, D, E, T, P, a, J);
		f.cpid = B0(J, "cpid");
		f.dataid = B0(J, "dataid");
		if (W)
		{
			W = W.split("#");
			L = [];
			for (d = 0; d < W.length; d++) L.push(Z0(W[d]));
			f.levels = L
		}
		return f
	};
	var k0 = Q.prototype;
	k0.clone = function ()
	{
		var $ = this,
			_ = new Q();
		_.id = $.id;
		_.caption = $.caption;
		_.type = $.type;
		_.points = $.points;
		_.bounds = $.bounds;
		_.style = $.style;
		_.label = $.label;
		_.detail = $.detail;
		_.segments = $.segments;
		_.level = $.level;
		_.levels = $.levels;
		_.cpid = $.cpid;
		_.dataid = $.dataid;
		_.catalogid = $.catalogid;
		_.clustering = $.clustering;
		_.xml = $.xml;
		return _
	};
	k0.objectToXML = function ()
	{
		var $, _;
		$ = this.type == "S" ? [this.points] : this.segments;
		_ = Q.createDom(this.id, this.caption, this.type, $, this.bounds, this.style, this.label, this.detail);
		this.xml = _
	};
	Q.createDom = function (E, C, D, A, B, $, _, K)
	{
		var J = "<?xml version=\"1.0\" encoding=\"GB2312\"?><Feature xmlns:v=\"urn:schemas-microsoft-com:vml\"/>",
			G = t1(J),
			H, F, M = "";
		H = N1(G, "Feature")[0];
		A0(H, "id", E);
		A0(H, "caption", C);
		A0(H, "type", D);
		F = T("Points", H);
		for (var L = 0, I = ""; L < A.length; L++)
		{
			M += I + A[L].join(",");
			I = "#"
		}
		W(F, G.createTextNode(M));
		if (B)
		{
			F = T("Bounds", H);
			A0(F, "minx", B.minX);
			A0(F, "miny", B.minY);
			A0(F, "maxx", B.maxX);
			A0(F, "maxy", B.maxY)
		}
		F = T("Style", H);
		A0(F, "id", $.id);
		W(H, F);
		F = T("Label", H);
		A0(F, "on", _.on);
		A0(F, "style", _.style);
		if (_.position) A0(F, "position", _.position);
		F = T("Detail", H);
		if (K.href) A0(F, "href", K.href);
		if (K.src) A0(F, "src", K.src);
		if (K.width) A0(F, "width", K.width);
		if (K.height) A0(F, "height", K.height);
		if (K.infowin) A0(F, "infowin", K.infowin);
		W(F, G.createComment(!K.content ? "" : K.content));
		return H
	};
	k0.loadFromXML = function (A)
	{
		var _ = Q.a(A),
			$ = this;
		$.id = _.id;
		$.caption = _.caption;
		$.type = _.type;
		$.points = _.points;
		$.bounds = _.bounds;
		$.style = _.style;
		$.label = _.label;
		$.detail = _.detail;
		$.segments = _.segments;
		$.xml = _.xml
	};
	Q.loadFromJson = function (D)
	{
		var C, A, B, $, _ = [],
			K, F, P, O, N = [],
			M, L;
		A = D.Bounds;
		if (A) C = new u0(A.minx, A.miny, A.maxx, A.maxy);
		A = D.Points;
		if (A)
		{
			$ = A.txt || A["#text"] || A;
			if (typeof $ == "object") $ = $[0];
			B = $.split("#");
			$ = A.type == "C";
			L = A.levels;
			for (K = 0; K < B.length; K++)
			{
				var I, J = 0,
					G = 0,
					H, E = [],
					T, R, Q;
				if ($) H = b0(B[K]);
				else H = B[K].split(",");
				G = $ ? H.length : H.length / 2;
				for (I = 0; I < G; I++)
				{
					T = $ ? H[I][0] : H[I * 2];
					R = $ ? H[I][1] : H[I * 2 + 1];
					if (T != null && R != null)
					{
						T = parseFloat(T);
						R = parseFloat(R);
						Q = new G0(T, R);
						_.push(Q);
						E.push(Q);
						if (!C)
						{
							C = new Bounds(T, R, T, R);
							J = 1
						}
						if (J) C.extend(Q)
					}
				}
				N.push(E)
			}
		}
		A = D.Style;
		F = new l1(!A ? "S01" : A.id, D.type);
		A = D.Label;
		P = !A ? {
			on: "false",
			style: "F24"
		} : A;
		A = D.Detail;
		A = !A ? {} : A;
		O = {
			"href": !A.href ? "" : A.href,
			"content": !A.content ? "" : A.content,
			"src": !A.src ? "" : A.src,
			"width": A.width == null ? 251 : A.width,
			"height": A.height == null ? 142 : A.height,
			"infowin": A.infowin
		};
		M = new FeatureNode(D.id || "RND" + S.i(), D.caption, D.type, _, C, F, P, O, N, {});
		M.cpid = D.cpid;
		M.dataid = D.dataid;
		M.catalogid = D.catalogid;
		M.clustering = D.clustering;
		M.level = D.level;
		if (L)
		{
			L = L.split("#");
			A = [];
			for (K = 0; K < L.length; K++) A.push(Z0(L[K]));
			M.levels = A
		}
		return M
	};
	Y("FeatureNode", Q);
	a(Q, "loadFromXML", Q.a);

	function $0($)
	{
		this.shape = null;
		this.type = null;
		this.panel = ($ ? $ : window.document.body)
	}
	var U1 = $0.prototype;
	U1.drawLine = function (D, B, C, A)
	{
		var J = "DRAWLINE";
		if (this.type != J) this.clear();
		if (S.l.type == 1)
		{
			if (!this.shape)
			{
				var $, _, H, I;
				$ = T("v:line");
				$.unselectable = "on";
				$.filled = false;
				v($);
				H = T("v:stroke", $);
				H.joinstyle = "round";
				H.endcap = "round";
				H.opacity = 0.75;
				H.color = "blue";
				H.weight = o(2);
				I = T("DIV", this.panel);
				v(I);
				W(I, $);
				I.v = $;
				this.shape = I
			}
			q(this.shape, D);
			d(this.shape, B);
			this.shape.v.from = "0,0";
			this.shape.v.to = (C - D) + "," + (A - B)
		}
		else
		{
			var _, H, G, E, F = this.shape;
			if (!F)
			{
				F = Z1("svg", this.panel);
				v(F);
				_ = Z1("line", F);
				A0(_, "stroke", "#0000ff");
				A0(_, "stroke-width", "2");
				A0(_, "stroke-opacity", "0.7");
				F._e = _;
				this.shape = F
			}
			_ = F._e;
			G = u(D, C);
			E = u(B, A);
			q(F, G - 5);
			d(F, E - 5);
			A0(F, "width", o(t(C - D) + 10));
			A0(F, "height", o(t(A - B) + 10));
			A0(_, "x1", D - G + 5);
			A0(_, "y1", B - E + 5);
			A0(_, "x2", C - G + 5);
			A0(_, "y2", A - E + 5)
		}
		this.type = J;
		return this.shape
	};
	U1.drawPolyline = function (D, B, C)
	{
		var A = "DRAWPOLYLINE";
		if (this.type != A) this.clear();
		var F = screen.updateInterval || 0;
		screen.updateInterval = 5000;
		if (S.l.type == 1)
		{
			if (!this.shape)
			{
				var $ = T("v:shape", this.panel, new G0(0, 0), new X0(1, 1));
				$.unselectable = "on";
				$.fill = false;
				$.filled = false;
				$.coordsize = "1 1";
				var H = T("v:stroke", $);
				H.joinstyle = "round";
				H.endcap = "round";
				H.opacity = 0.75;
				H.color = "blue";
				H.weight = o(2);
				this.shape = $
			}
			q(this.shape, D[0]);
			d(this.shape, B[0]);
			var _ = D[0] + " " + B[0];
			this.shape.coordorigin = _;
			var E = [];
			for (var G = 0; G < C; G++)
			{
				if (G == 0)
				{
					E.push("m");
					E.push(D[G]);
					E.push(B[G]);
					E.push("l")
				}
				E.push(D[G]);
				E.push(B[G])
			}
			E.push("e");
			this.shape.path = E.join(" ")
		}
		screen.updateInterval = F;
		this.type = A;
		return this.shape
	};
	U1.drawRect = function (D, B, C, $)
	{
		var A = "DRAWRECT";
		if (this.type != A) this.clear();
		if (!this.shape)
		{
			var _ = new Image(1, 1);
			_.src = S.e + "/images/pixel.gif";
			this.shape = T("span", this.panel);
			v(this.shape);
			this.shape.style.border = "1px solid #0000ff";
			W(this.shape, _)
		}
		q(this.shape, D);
		d(this.shape, B);
		j(this.shape, C);
		k(this.shape, $);
		this.type = A;
		return this.shape
	};
	U1.drawPolygon = function (D, B, C)
	{
		var A = "DRAWPOLYGON";
		if (this.type != A) this.clear();
		var F = screen.updateInterval || 0;
		screen.updateInterval = 5000;
		if (S.l.type == 1)
		{
			if (!this.shape)
			{
				var $ = T("v:shape", this.panel, new G0(0, 0), new X0(1, 1));
				$.unselectable = "on";
				$.filled = false;
				$.coordsize = "1 1";
				var H = T("v:stroke", $);
				H.joinstyle = "round";
				H.endcap = "round";
				H.opacity = 0.75;
				H.color = "blue";
				H.weight = o(2);
				this.shape = $
			}
			q(this.shape, D[0]);
			d(this.shape, B[0]);
			var _ = D[0] + " " + B[0];
			this.shape.coordorigin = _;
			var E = [];
			for (var G = 0; G < C; G++)
			{
				if (G == 0)
				{
					E.push("m");
					E.push(D[G]);
					E.push(B[G]);
					E.push("l")
				}
				E.push(D[G]);
				E.push(B[G])
			}
			E.push("x");
			E.push("e");
			this.shape.path = E.join(" ")
		}
		screen.updateInterval = F;
		this.type = A;
		return this.shape
	};
	U1.fillPolygon = function (D, B, C)
	{
		var A = "FILLPOLYGON";
		if (this.type != A) this.clear();
		var F = screen.updateInterval || 0;
		screen.updateInterval = 5000;
		if (S.l.type == 1)
		{
			if (!this.shape)
			{
				var $ = T("v:shape", this.panel, new G0(0, 0), new X0(1, 1));
				$.unselectable = "on";
				$.filled = true;
				$.coordsize = "1 1";
				var I = T("v:stroke", $);
				I.joinstyle = "round";
				I.endcap = "round";
				I.opacity = 0.75;
				I.color = "blue";
				I.weight = o(2);
				var H = T("v:fill", $);
				H.color = "white";
				H.opacity = "50%";
				this.shape = $
			}
			q(this.shape, D[0]);
			d(this.shape, B[0]);
			var _ = D[0] + " " + B[0];
			this.shape.coordorigin = _;
			var E = [];
			for (var G = 0; G < C; G++)
			{
				if (G == 0)
				{
					E.push("m");
					E.push(D[G]);
					E.push(B[G]);
					E.push("l")
				}
				E.push(D[G]);
				E.push(B[G])
			}
			E.push("x");
			E.push("e");
			this.shape.path = E.join(" ")
		}
		screen.updateInterval = F;
		this.type = A;
		return this.shape
	};
	U1.clear = function ()
	{
		if (this.shape)
		{
			J1(this.panel, this.shape);
			this.shape = null
		}
	};
	Y("Graphics", $0);

	function a0(_)
	{
		var $;
		if (typeof (_) == "object") $ = _.id;
		else $ = _;
		this.id = $
	}
	var O = a0.prototype = new n();
	O.continueWith = function (B, _)
	{
		var A = C1(this.id);
		if (!A) A = R0(this.id);
		var $ = function ()
			{
				_($)
			};
		L.f(A, "load", $);
		if (B) this.setTimeout(this.loadWebPage, 1, A, B)
	};
	O.loadWebPage = function (A, _)
	{
		if (S.l.type == 4 && S.l.version == 7) A.src = _;
		else
		{
			var $ = U0(A);
			$.location.replace(_)
		}
	};
	Y("IframeSender", a0);

	function W0()
	{}
	W0.a = function (E, C, D, A, B, $, _, H, I, G)
	{
		var F;
		if (!I)
		{
			F = T("img");
			if (E) F.src = E
		}
		else F = I(E, _, G);
		if (C && D)
		{
			j(F, C);
			k(F, D);
			F.width = C;
			F.height = D
		}
		if (B || (A || (B == 0 || A == 0)))
		{
			v(F);
			q(F, A);
			d(F, B)
		}
		if ($ || $ == 0) S1(F, $);
		if (S.l.type == 1)
		{
			F.unselectable = "on";
			F.onselectstart = Q1
		}
		else F.style.MozUserSelect = "none";
		F.style.border = "0";
		F.oncontextmenu = Q1;
		if (H) F1(F, H);
		return F
	};
	Y("Img", W0);
	a(W0, "create", W0.a);

	function c1()
	{}
	c1.create = function (E, C, D, A, B, $, _, F, G)
	{
		return W0.a(E, C, D, A, B, $, _, F, c1.createElement, G)
	};
	c1.createElement = function (B, _, A)
	{
		var $;
		if (S.l.type == 1 && (S.l.isLowIE7() || A))
		{
			$ = T("div");
			a1($, B, _)
		}
		else
		{
			$ = T("img");
			$.src = B
		}
		return $
	};
	c1.b = function (D, B, C, _, A)
	{
		var $ = T("div", null, new G0(B, D), new X0(C, _));
		if (A) S1($, A);
		return $
	};
	c1.clipImg = function (E, C, D, A, B, $, _, H, F, G, K)
	{
		var J, I = T("DIV");
		J = c1.create(E, !$ ? 300 : $, !_ ? 200 : _, -1 * A, -1 * B, 0, null, null, K);
		v(I);
		W(I, J);
		I.style.overflow = "hidden";
		j(I, C);
		k(I, D);
		if (H != null) q(I, H);
		if (F != null) d(I, F);
		if (G != null) S1(I, G);
		I.img = J;
		return I
	};
	Y("Layer", c1);
	a(c1, "createDiv", c1.b);

	function d1()
	{}
	d1.gid = S.i();
	d1.a = function (C, A)
	{
		var B = d1.debug;
		if (!B)
		{
			B = self.location.href;
			B = B.substring(B.indexOf("?") + 1);
			d1.debug = B.indexOf("debug=go2maplsp") > -1 ? 1 : -1
		}
		if (B == 1)
		{
			var _ = "textAreaDebug",
				$ = C1(_);
			if (!$)
			{
				$ = T("textarea");
				$.id = _;
				$.style.width = "90%";
				k($, "300");
				g = T("input");
				g.type = "button";
				g.value = "clear debug info";
				g.onclick = function ()
				{
					$.value = ""
				};
				W(document.body, g);
				W(document.body, $)
			}
			if (!A) A = "information";
			var D = new Date();
			$.value += D.toGMTString() + " " + D.getMilliseconds() + "ms->" + A + "\n" + C + "\n\n"
		}
	};
	d1.b = function ()
	{
		var C = arguments,
			u = S.i,
			B = "img" + u(),
			$, g, D, k = "",
			s = "SMAPUVID=",
			v = "YYID=",
			w = "",
			A = Log.site,
			_, e = Log.refer;
		if (C.length == 0) return;
		$ = "user=" + d1.gid;
		with(document)
		{
			if (cookie.indexOf(s) < 0) cookie = s + u() + ";path=/;expires=Tue, 12-Jul-2088 00:00:00 GMT";
			k = cookie.match(/SMAPUVID=([^;]*)/g);
			if (k && k[0]) k = k[0].replace(/SMAPUVID=/g, "");
			if (cookie.indexOf(v) > -1)
			{
				w = cookie.match(/YYID=([^;]*)/g);
				w = w[0].replace(/YYID=/g, "")
			}
			g = "&&referrer=" + (!e ? "" : e + "||") + referrer.replace(/(&&)+/, "&") + "&&r=" + u()
		}
		$ += "&&uvid=" + k + (!w ? "" : "&&yid=" + w);
		for (var E = 0; E < C.length; E++) if (C[E])
		{
			$ += "&&" + C[E];
			_ = /^type=(map|request)$/gi.test(C[E])
		}
		if (Log.isApp && _) return;
		D = (!A ? S.a : A) + "?" + $ + g;
		window.setTimeout("L2.c('" + B + "','" + D + "')", 10);
		d1.a(D, "sending log")
	};
	d1.c = function (A, _)
	{
		var $ = T("img");
		$.id = A;
		l($);
		j($, 1);
		k($, 1);
		W(document.body, $);
		$.onerror = $.onload = function ()
		{
			J1(document.body, $)
		};
		$.src = _
	};
	Y("Log", d1);
	Y("L2", d1);
	a(d1, "write", d1.a);
	a(d1, "send", d1.b);

	function J(E, C, D, A, B, $, _)
	{
		var G = this;
		G.id = "MAP_" + S.i();
		G._e = G.eventHandler;
		G.a = G.container = E;
		G.fPool = [];
		G.isHbLbl = 1;
		G.b = $;
		G.copyrightType = !_ ? 7 : _;
		G.c = C;
		G.zoomLevel = 0;
		G.e = null;
		G.f = false;
		G.g = new X0(0, 0);
		G.h = new X0(0, 0);
		G.i = new X0(0, 0);
		G.j = new X0(0, 0);
		G.k = new G0(0.5, 0.5);
		G.l = new G0(0.5, 0.5);
		G.m = new G0(0, 0);
		G.features = [];
		G.p = new H0();
		G.a.style.overflow = "hidden";
		if (!D || !A)
		{
			D = G.a.offsetWidth;
			A = G.a.offsetHeight
		}
		G.viewSize = new X0(D, A);
		L.f(window, "blur", G._e("onWindowBlur"));
		G.div = c1.b(0, 0, 0, 0, 0);
		G.div2 = c1.b(0, 0, 0, 0, 0);
		G.mask = c1.b(0, 0, D, A, 2000);
		G.mask.id = G.id + "MASKLAYER";
		l(G.mask);
		L.f(G.div, S.l.type == 2 ? "DOMMouseScroll" : "mousewheel", G._e("onMW"));
		G.q2 = c1.b(0, 0, 0, 0, 1);
		G.oL = c1.b(0, 0, 0, 0, 2);
		G.oL2 = c1.b(0, 0, 0, 0, 3);
		G.oL2.name = "DIVOVERLAY";
		G.q = c1.b(0, 0, 0, 0, 5);
		G.panel = c1.b(0, 0, 0, 0, 6);
		W(G.div, G.oL);
		W(G.div, G.mask);
		W(G.div, G.q);
		W(G.div, G.q2);
		W(G.div, G.oL2);
		W(G.div, G.panel);
		W(G.a, G.div2);
		W(G.a, G.div);
		if (S.l.type == 2)
		{
			L.f(G.oL, "DOMMouseScroll", function ($)
			{
				L.d(G, "mousewheel", $);
				D1($ || event)
			});
			L.f(G.oL2, "DOMMouseScroll", function ($)
			{
				L.d(G, "mousewheel", $);
				D1($ || event)
			})
		}
		G.a.unselectable = "on";
		G.a.oncontextmenu = Q1;
		G.cursorTip = c1.b(0, 0, 0, 0, 20000);
		var F = G.cursorTip.style;
		F.width = "auto";
		F.height = "auto";
		F.border = "1px solid #ccc";
		F.backgroundColor = "#FFFFCC";
		F.whiteSpace = "nowrap";
		l(G.cursorTip);
		W(G.div, G.cursorTip);
		G.r = new I0(G.div, G.panel);
		L.a(G.r, "drawstart", G._e("onDrawStart"));
		L.a(G.r, "drawend", G._e("onDrawEnd"));
		G.s = new q1(G.div, 0, 0);
		L.a(G.s, "drag", G._e("onDrag"));
		L.a(G.s, "dragend", G._e("onDragEnd"));
		L.a(G.s, "dragstart", G._e("onDragStart"));
		L.a(G.s, "click", G._e("onClick"));
		L.a(G.s, "mousedown", G._e("onMD"));
		L.a(G.s, "dblclick", G._e("onDbC"));
		L.f(window, "load", G._e("onResize"));
		L.f(document.body, "click", G._e("docClick"));
		L.f(G.div, "contextmenu", G._e("onContextMenu"));
		L.f(G.div, "mousemove", G._e("onMv"));
		L.f(G.div, "mouseout", G._e("onMt"));
		L.f(G.oL2, "mousemove", G._e("onOL2Mv"));
		L.f(G.oL2, "mouseover", function ($)
		{
			$ = $ || event;
			L.d(G, "overlaymouseover", $)
		});
		L.f(G.oL2, "mouseout", function ($)
		{
			$ = $ || event;
			L.d(G, "overlaymouseout", $)
		});
		L.f(G.oL2, "click", function ($)
		{
			$ = $ || event;
			L.d(G, "overlayclick", $)
		});
		if ($) G.s.disable();
		G.bu();
		G.bv();
		G.bw();
		G.showLogo();
		L.a(G, "moveend", G._e("checkAndResetState"));
		L.a(G, "moveend", G._e("bm"));
		L.a(G, "update", G._e("updateScale"));
		L.a(G, "switchmapspec", G._e("updateScale"));
		J.instancesCnt++
	}
	var c = J.prototype = new n();
	J.instancesCnt = 0;
	c.t = function ()
	{
		return this.e != null
	};
	c.u = function (B, _, I, G)
	{
		while (B.length > this.j.width)
		{
			var H = B.pop();
			for (var E = 0; E < H.length; E++) J1(_, H[E])
		}
		for (E = B.length; E < this.j.width; E++) B.push([]);
		for (E = 0; E < B.length; E++)
		{
			while (B[E].length > this.j.height)
			{
				var F = B[E].pop();
				J1(_, F)
			}
			for (var C = B[E].length; C < this.j.height; C++)
			{
				var F, D = this.spec.f.width,
					$ = this.spec.f.height,
					A;
				F = W0.a(null, D, $, 0, 0, 0);
				if (S.l.type == 1 && S.l.isLowIE7()) F.galleryImg = "no";
				if (_ != this.div)
				{
					if (S.l.type == 1 && S.l.isLowIE7())
					{
						A = c1.b(0, 0, D, $, 0);
						W(A, F);
						l(F);
						A.img = F;
						F = A
					}
					F._overlay = true
				}
				else F.name = F.imgtype = "MAPTILEIMAGE";
				v(F);
				B[E].push(F);
				W(_, F);
				this.ag(F, E, C, I, G)
			}
		}
	};
	c.w = function (_, $)
	{
		if (_) for (var B = 0; B < _.length; B++) if (_[B]) for (var A = 0; A < _[B].length; A++) J1($, _[B][A])
	};
	c.x = function (_)
	{
		var $ = this;
		$.fTMTkt = j1.create("fTMTkt");
		$.w($.v2, $.oL);
		$.w($.v3, $.oL2);
		$.v2 = [];
		$.v3 = [];
		if (!_)
		{
			$.w($.v, $.div);
			$.v = [];
			$.af();
			$.u($.v, $.div, $.isHybrid ? S.g[1] : S.g[0]), 1
		}
		if ($.isHybrid && $.isHbLbl) $.u($.v2, $.oL, S.g[2]);
		if ($.isOverLay) $.u($.v3, $.oL2, S.g[3])
	};
	c.y = function (A)
	{
		if (!A) A = new G0(0, 0);
		if (this.z)
		{
			A.x = this.z.x;
			A.y = this.z.y
		}
		else
		{
			var $ = null;
			if (this.aa && this.l.equals(this.k)) $ = this.spec.q(this.aa.y, this.aa.x, this.zoomLevel);
			if ($ && t($.x - this.m.x) < 2 && t($.y - this.m.y) < 2)
			{
				A.x = this.aa.x;
				A.y = this.aa.y
			}
			else
			{
				var _ = this.spec.r(this.m.x, this.m.y, this.zoomLevel);
				A.x = _.x;
				A.y = _.y
			}
		}
		return A
	};
	c.ab = function (E)
	{
		if (!E) E = new u0(0, 0, 0, 0);
		var C = this.m.x,
			D = this.m.y,
			A = this.viewSize.width,
			B = this.viewSize.height,
			$ = this.l.x,
			_ = this.l.y;
		E.minX = C - A * $;
		E.minY = D - B * _;
		E.maxX = C + A * (1 - $);
		E.maxY = D + B * (1 - _);
		return E
	};
	c.ac = function (A)
	{
		A = this.ab(A);
		var $ = this.spec.r(A.minX, A.minY, this.zoomLevel),
			_ = this.spec.r(A.maxX, A.maxY, this.zoomLevel);
		A.minX = $.x;
		A.minY = _.y;
		A.maxX = _.x;
		A.maxY = $.y;
		return A
	};
	c.ad = function (E, C, D)
	{
		if (!D) D = new G0(0, 0);
		var A, B, $, _, F, G;
		$ = this.e;
		_ = this.spec.f;
		F = this.g;
		G = this.h;
		A = E - $.x * _.width - F.width + G.width * _.width;
		B = C - $.y * _.height - F.height + G.height * _.height;
		D.x = A;
		D.y = B;
		return D
	};
	c.ae = function (E, C, D)
	{
		if (!D) D = new G0(0, 0);
		var A, B, $, _;
		$ = this.e;
		_ = this.spec.f;
		h = this.g;
		i = this.h;
		A = $.x * _.width + h.width - i.width * _.width + E;
		B = $.y * _.height + h.height - i.height * _.height + C;
		D.x = A;
		D.y = B;
		return D
	};
	c.af = function ()
	{
		var B = s(this.viewSize.width / this.spec.f.width) + 2,
			_ = s(this.viewSize.height / this.spec.f.height) + 2;
		this.j.width = B;
		this.j.height = _;
		var A = z((this.j.width * this.spec.f.width - this.viewSize.width) / 2),
			$ = z((this.j.height * this.spec.f.height - this.viewSize.height) / 2);
		this.g.width = A;
		this.g.height = $
	};
	c.ag = function (G, E, F, Z, R)
	{
		var C, D, A, B, _ = this,
			T = S.e + "/images/pixel.gif",
			V = !G.img ? G : G.img;
		C = (_.h.width + E) * _.spec.f.width;
		D = (_.h.height + F) * _.spec.f.height;
		A = -_.g.width + C;
		B = -_.g.height + D;
		if (G.tileLeft != A || G.tileTop != B)
		{
			q(G, A);
			d(G, B);
			G.tileLeft = A;
			G.tileTop = B
		}
		if (!_.t())
		{
			if (V.src != T) V.src = T
		}
		else
		{
			var O, P, L, M, Q, K, X = _.viewSize.width,
				W = _.viewSize.height;
			O = _.e.x + E;
			P = _.e.y + F;
			L = _.zoomLevel;
			M = _.spec.t(O, P, L, Z);
			Q = _.spec.t(O, P, L, S.g[0]);
			if (V.src != M)
			{
				var J, $;
				J = _.spec.h;
				$ = _.spec.i;
				V.src = T;
				var K, H = 0,
					I = 0,
					Y = _.fTMTkt.isValid(),
					U = S.l.type == 1;
				if (Y)
				{
					K = _.tmpDivOffset;
					if (!K)
					{
						K = K1(_.div, _.a);
						_.tmpDivOffset = K
					}
					H = K.x + A;
					I = K.y + B
				}
				if (!_.debug) _.debug = window.location.href.indexOf("debug=go2maplsp") > -1 ? 1 : -1;
				V.onload = function ()
				{
					var A = this,
						$ = G.priority;
					$ = !$ ? 100 : $ * 100;
					G.isLoaded = 1;
					_.setTimeout(_.onTileLoaded, 100, G);
					if (!R && A.src != T)
					{
						G.T = _.setTimeout(function ()
						{
							R1(G);
							if (G.img && U) a1(G, A.src)
						}, 500 - u(r(50, $), 500));
						if (G.img && U) G.src = A.src
					}
				};
				var N = 0;
				if (_.debug == -1) V.onerror = function ()
				{
					if (N < 5) if (!G.img && !G._overlay) this.src = (this.src == Q ? J : $);
					else this.src = T;
					N++
				};
				else
				{
					V.alt = M.replace(/(http:\/\/)/g, "").replace(/(\/)/, "\n");
					G.style.border = "1px solid #0000ff"
				}
				if (X < 500 || W < 500 || !Y || (H > -_.spec.f.width && I > -_.spec.f.height && H < X && I < W))
				{
					if (G.img && U) G.style["filter"] = "";
					window.setTimeout(function ()
					{
						G.isLoaded = -1;
						if (G.T) window.clearTimeout(G.T);
						_.isLoading = true;
						V.src = M
					}, 1);
					d1.a("Loading RMP:" + M)
				}
			}
		}
	};
	c.onTileLoaded = function (_)
	{
		var C = this,
			$ = C.v,
			B, A;
		for (B = 0; B < $.length; B++) for (A = 0; A < $[B].length; A++) if ($[B][A].isLoaded == -1)
		{
			L.d(C, "loading");
			return
		}
		if (B == $.length && C.isLoading)
		{
			C.isLoading = false;
			L.d(C, "loaded")
		}
	};
	c.onDrag = function ()
	{
		if (!this.t()) return;
		this.onMove();
		this.ai()
	};
	c.onMove = function ()
	{
		var C, A, B, _ = this,
			$ = _.div2;
		C = _.au(new X0(0, 0));
		_.z = null;
		A = _.e.x * _.spec.f.width + z(_.viewSize.width * _.l.x) + _.g.width - C.width;
		B = _.e.y * _.spec.f.height + z(_.viewSize.height * _.l.y) + _.g.height - C.height;
		_.m.x = A;
		_.m.y = B;
		if (!_.sp)
		{
			_.sp = new G0($.offsetLeft, $.offsetTop);
			_.sc = new G0(A, B)
		}
		q($, _.sp.x + _.sc.x - A);
		d($, _.sp.y + _.sc.y - B);
		L.d(_, "move")
	};
	c.ai = function ()
	{
		var _ = this,
			A = _.au(new X0(0, 0)),
			$ = [
				[_.v, _.isHybrid ? S.g[1] : S.g[0], true, _.div],
				[_.v2, S.g[2], _.isHybrid && _.isHbLbl, _.oL],
				[_.v3, S.g[3], _.isOverLay, _.oL2]
			];
		if (t(_.s.left) > 10000000 || t(_.s.top) > 10000000)
		{
			_.cancelPan();
			_.as(_.m);
			return
		}
		while (A.width < -_.g.width / 2)
		{
			_.ak($);
			_.au(A)
		}
		while (A.width > _.g.width / 2)
		{
			_.aj($);
			_.au(A)
		}
		while (A.height < -_.g.height / 2)
		{
			_.am($);
			_.au(A)
		}
		while (A.height > _.g.height / 2)
		{
			_.al($);
			_.au(A)
		}
		_.cc($)
	};
	c.aj = function ($)
	{
		var C, A, B, _ = this;
		_.h.width--;
		_.e.x--;
		for (B = 0; B < $.length; B++)
		{
			if (!$[B][2]) continue;
			C = $[B][0].pop();
			if (C)
			{
				$[B][0].unshift(C);
				for (A = 0; A < C.length; A++) _.ag(C[A], 0, A, $[B][1], _.div == $[B][3])
			}
		}
	};
	c.ak = function ($)
	{
		var D, B, C, _, A = this;
		A.h.width++;
		A.e.x++;
		for (_ = 0; _ < $.length; _++)
		{
			if (!$[_][2]) continue;
			D = $[_][0].shift();
			$[_][0].push(D);
			B = $[_][0].length - 1;
			for (C = 0; C < D.length; C++) A.ag(D[C], B, C, $[_][1], A.div == $[_][3])
		}
	};
	c.al = function ($)
	{
		var C, A, B, _ = this;
		_.h.height--;
		_.e.y--;
		for (B = 0; B < $.length; B++)
		{
			if (!$[B][2]) continue;
			for (C = 0; C < $[B][0].length; C++)
			{
				A = $[B][0][C].pop();
				$[B][0][C].unshift(A);
				_.ag(A, C, 0, $[B][1], _.div == $[B][3])
			}
		}
	};
	c.am = function ($)
	{
		var D, B, C, _, A = this;
		A.h.height++;
		A.e.y++;
		for (_ = 0; _ < $.length; _++)
		{
			if (!$[_][2]) continue;
			D = $[_][0][0].length - 1;
			for (B = 0; B < $[_][0].length; B++)
			{
				C = $[_][0][B].shift();
				$[_][0][B].push(C);
				A.ag(C, B, D, $[_][1], A.div == $[_][3])
			}
		}
	};
	c.onMW = function ($)
	{
		if ($)
		{
			L.d(this, "mousewheel", $);
			D1($)
		}
		return false
	};
	c.onDragEnd = function ()
	{
		L.d(this, "moveend");
		L.d(this, "update");
		L.d(this, "dragend")
	};
	c.onDragStart = function ()
	{
		L.d(this, "movestart")
	};
	c.onDrawStart = function (_, $)
	{
		w(this.mask)
	};
	c.onDrawEnd = function (_, $)
	{
		l(this.mask);
		L.d(this, "drawend", _, $)
	};
	c.onDbC = function (B)
	{
		if (!this.b)
		{
			if (this.panTimer) window.clearTimeout(this.panTimer);
			var _, A, $;
			_ = u1(B, this.a);
			A = z(this.viewSize.width / 2) - _.x;
			$ = z(this.viewSize.height / 2) - _.y;
			this.panTimer = this.setTimeout(this.pan, 500, A, $)
		}
		L.d(this, "doubleclick", B);
		L.d(this, "doubleclickpan", B);
		d1.b("appid=" + this.appId, "oprt=_doubleClick", "param=" + this.y() + "," + this.zoomLevel, "type=map")
	};
	c.onClick = function (C)
	{
		var _ = this,
			A = C.srcElement || C.target,
			B = document.activeElement,
			$;
		if (A && A.id.indexOf("POI_") < 0) _.closeInfoWindow();
		L.d(_, "click", C, _.getMcXYBySC(C), u1(C, _.container));
		if (B)
		{
			$ = B.tagName;
			if ($ && $.toLowerCase() == "input") B.blur()
		}
		document.body.focus()
	};
	c.docClick = function (A)
	{
		var $ = this,
			_ = (A || event);
		_ = _.srcElement || _.target;
		while (_)
		{
			if (_ == $.div) return;
			_ = _.parentNode
		}
		$.isFocus = 0
	};
	c.onMD = function (_)
	{
		var $ = this;
		$.isFocus = 1;
		L.d($, "mousedown", _)
	};
	c.onContextMenu = function (_)
	{
		var $ = this.getMcXYBySC(_);
		L.d(this, "contextmenu", _, $, u1(_, this.container))
	};
	c.getMcXYBySC = function (C, _, A)
	{
		var B, $;
		B = u1(C, this.div);
		$ = this.sc2mc(new G0(!_ ? B.x : B.x + _, !A ? B.y : B.y + A));
		return $
	};
	c.sc2mc = function (A)
	{
		var $, _;
		$ = this.ae(A.x, A.y);
		_ = this.spec.r($.x, $.y, this.zoomLevel);
		return _
	};
	c.mc2sc = function (A)
	{
		var $ = this,
			_ = $.spec.q(A.y, A.x, $.zoomLevel);
		return $.ad(_.x, _.y)
	};
	c.onMv = function (B)
	{
		var _, A, $ = this;
		_ = $.cursorTip;
		A = u1(B, $.div);
		_.style.display = (!_.innerHTML == "" ? "inline" : "none");
		q(_, A.x + 15);
		d(_, A.y - 10);
		L.d($, "mousemove", A)
	};
	c.onMt = function ($)
	{
		l(this.cursorTip)
	};
	c.an = function (_, G, E)
	{
		if (_.length == 0) return;
		this.tmpDivOffset = null;
		var F = [];
		for (var C = 0; C < _.length; C++) for (var D = 0; D < _[C].length; D++)
		{
			$ = _[C][D];
			$.coordX = C;
			$.coordY = D;
			var A = u(C, _.length - C - 1),
				B = u(D, _[C].length - D - 1);
			if (A == 0 || B == 0) $.priority = 0;
			else $.priority = A + B;
			F.push($)
		}
		F.sort(function ($, _)
		{
			return _.priority - $.priority
		});
		for (C = 0; C < F.length; C++)
		{
			var $ = F[C];
			this.ag($, $.coordX, $.coordY, G, E)
		}
	};
	c.pan = function (B, _)
	{
		if (!this.t()) return;
		var A = Math.sqrt(B * B + _ * _),
			$ = r(10, z(A / 20));
		this.panSiner = new J0($);
		this.panSiner.reset();
		this.i.width = B;
		this.i.height = _;
		this.panStart = new G0(this.s.left, this.s.top);
		L.d(this, "movestart");
		this.doPan()
	};
	c.doPan = function ()
	{
		var $ = this.panSiner.next();
		this.s.moveTo(this.panStart.x + this.i.width * $, this.panStart.y + this.i.height * $);
		this.onMove();
		if (this.panSiner.more())
		{
			this.panTimeout = this.setTimeout(function ()
			{
				this.doPan()
			}, 10);
			this.ai()
		}
		else
		{
			this.panTimeout = null;
			L.d(this, "update");
			L.d(this, "moveend")
		}
	};
	c.cancelPan = function ()
	{
		if (this.panTimeout)
		{
			clearTimeout(this.panTimeout);
			L.d(this, "update");
			L.d(this, "moveend")
		}
	};
	c.ao = function ($)
	{
		if (!this.t()) return;
		this.z = new G0($.x, $.y);
		this.aa = this.z;
		this.k = new G0(this.l.x, this.l.y);
		var $ = this.spec.q(this.z.y, this.z.x, this.zoomLevel);
		this.ap($)
	};
	c.ap = function (B)
	{
		var $ = this;
		if (!$.t()) return;
		var _ = $.m.x - B.x,
			A = $.m.y - B.y;
		if (_ == 0 && A == 0)
		{
			$.bm();
			return
		}
		if (t(_) < $.viewSize.width && t(A) < $.viewSize.height && $.f)
		{
			$.pan(_, A);
			return
		}
		window.clearTimeout($.ctbtimer);
		$.ctbtimer = $.setTimeout($.as, 300, B)
	};
	c.isCanPanTo = function (B)
	{
		var $ = this,
			_, A;
		B = $.spec.q(B.y, B.x, $.zoomLevel);
		_ = $.m.x - B.x;
		A = $.m.y - B.y;
		return t(_) < $.viewSize.width && t(A) < $.viewSize.height && $.f
	};
	c.aq = function (A, $)
	{
		var _;
		if (!this.t()) return;
		if ($ != this.zoomLevel)
		{
			_ = this.zoomLevel;
			this.zoomLevel = E1($)
		}
		this.ar(A);
		if (_ != null) L.d(this, "zoom", _, this.zoomLevel)
	};
	c.ar = function ($)
	{
		this.z = new G0($.x, $.y);
		this.aa = this.z;
		this.k = new G0(this.l.x, this.l.y);
		var $ = this.spec.q(this.z.y, this.z.x, this.zoomLevel);
		this.as($)
	};
	c.as = function (C, _)
	{
		var $ = this,
			A = $.m,
			B = A.x == C.x && A.y == C.y;
		$.f = true;
		if (!_)
		{
			P1($.div2);
			l($.oL);
			l($.oL2);
			$.setTimeout(function ()
			{
				w($.oL);
				w($.oL2)
			}, 1000)
		}
		$.at(C);
		$.an($.v, $.isHybrid ? S.g[1] : S.g[0], 1);
		if ($.isHybrid && $.isHbLbl) $.setTimeout($.an, 100, $.v2, S.g[2]);
		if ($.isOverLay) $.setTimeout($.an, 100, $.v3, S.g[3]);
		$.bj();
		$.bm();
		$.wheelPoint = null;
		L.d($, "update");
		if (B) L.d($, "moveend")
	};
	c.at = function (E)
	{
		this.m.x = E.x;
		this.m.y = E.y;
		var C, D, A, B, $, _, F;
		C = new G0(_0(this.viewSize.width * this.l.x), _0(this.viewSize.height * this.l.y));
		D = this.m.x - C.x - this.g.width;
		A = this.m.y - C.y - this.g.height;
		B = z(D / this.spec.f.width);
		$ = z(A / this.spec.f.height);
		_ = B * this.spec.f.width - D;
		F = $ * this.spec.f.height - A;
		if (_ < -this.g.width / 2)
		{
			B++;
			_ += this.spec.f.width
		}
		else if (_ > this.g.width / 2)
		{
			B--;
			_ -= this.spec.f.width
		}
		if (F < -this.g.height / 2)
		{
			$++;
			F += this.spec.f.height
		}
		else if (F > this.g.height / 2)
		{
			$--;
			F -= this.spec.f.height
		}
		if (!this.t()) this.e = new G0(B, $);
		else
		{
			this.e.x = B;
			this.e.y = $
		}
		this.h.width = 0;
		this.h.height = 0;
		this.s.moveTo(_, F)
	};
	c.onResize = function (F)
	{
		var D, E, A, C, $, _, H, G, B = this;
		if (!B.t()) return;
		D = B.viewSize;
		E = D.width;
		A = D.height;
		C = B.mask.style;
		$ = B.a;
		_ = $.offsetWidth;
		H = $.offsetHeight;
		if (E != _ || A != H)
		{
			E = (_ == 0 ? E : _);
			A = (H == 0 ? A : H);
			D.width = E;
			D.height = A;
			B.af();
			B.u(B.v, B.div, B.isHybrid ? S.g[1] : S.g[0], 1);
			if (B.isHybrid && B.isHbLbl) B.u(B.v2, B.oL, S.g[2]);
			if (B.isOverLay) B.u(B.v3, B.oL2, S.g[3]);
			B.as(B.m);
			L.d(B, "resize")
		}
		C.width = o(E);
		C.height = o(A)
	};
	c.au = function ($)
	{
		if (!$) $ = new X0(0, 0);
		$.width = this.s.left + this.h.width * this.spec.f.width;
		$.height = this.s.top + this.h.height * this.spec.f.height;
		return $
	};
	c.av = function (C)
	{
		if (this.spec == C) return;
		var A, B;
		if (C.sds)
		{
			A = new G0(parseFloat(C.sds.defaultCX), parseFloat(C.sds.defaultCY));
			B = C.x(E1(C.sds.defaultLevel) - 1)
		}
		var $ = this.spec,
			D;
		if (!$)
		{
			D = true;
			this.spec = C;
			$ = C
		}
		this.f = false;
		this.aw(C);
		if (D || !$.f.equals(C.f))
		{
			this.e = null;
			this.x()
		}
		if (B || B == 0) this.zoomLevel = B;
		var _ = $.q(A.y, A.x, this.zoomLevel);
		this.at(_);
		L.d(this, "switchmapspec", $, C)
	};
	c.aw = function ($)
	{
		this.spec = $;
		this.a.style.backgroundColor = this.spec.g;
		this.div.style.backgroundColor = this.spec.g;
		if (this.mapTitle) if (this.spec.v) this.mapTitle.innerHTML = this.spec.v()
	};
	c.zoomTo = function (A)
	{
		if (!this.t()) return;
		if (A >= this.spec.o) A = this.spec.o - 1;
		else if (A < 0) A = 0;
		if (A == this.zoomLevel) return;
		var $ = this.zoomLevel;
		this.zoomLevel = E1(A);
		var _;
		if (this.zoomLevel > $ && this.z) _ = this.spec.q(this.z.y, this.z.x, this.zoomLevel);
		else _ = this.spec.w(this.zoomLevel, $, this.m);
		if ($ == this.zoomLevel) return;
		this.as(_, arguments[1]);
		L.d(this, "zoom", $, this.zoomLevel)
	};
	c.updateScale = function ()
	{
		var E, C, D, A, B, $, _, J, K, H, I, F, G;
		if (this.mapScale)
		{
			E = this.ab();
			C = (E.minY + E.maxY) >> 1;
			D = new G0(E.minX + 2, C);
			A = new G0(E.minX + 82, C);
			D = this.spec.r(D.x, D.y, this.zoomLevel);
			A = this.spec.r(A.x, A.y, this.zoomLevel);
			B = new W1();
			$ = B.distanceByMC(D, A);
			A = new G0(E.minX + 122, C);
			A = this.spec.r(A.x, A.y, this.zoomLevel);
			_ = B.distanceByMC(D, A);
			H = $ / 80;
			if ($ > 1000 && _ > 1000)
			{
				K = true;
				$ = $ / 1000;
				_ = _ / 1000
			}
			else K = false;
			J = ($ + _) >> 1;
			I = E1(J).toString().length - 1;
			if (I > 0)
			{
				F = Math.pow(10, I);
				J = E1(J / F) * F;
				if ($ < J + F && J + F < _) J = J + F;
				else if ($ < J + 5 * F / 10 && J + 5 * F / 10 < _) J = J + 5 * F / 10;
				else if ($ < J + 2 * F / 10 && J + 2 * F / 10 < _) J = J + 2 * F / 10
			}
			if (K)
			{
				K = unescape(!this._km ? "%u516C%u91CC" : this._km);
				G = E1(J * 1000 / H)
			}
			else
			{
				K = unescape(!this._m ? "%u7C73" : this._m);
				G = E1(J / H)
			}
			j(this.mapScale.w, G);
			this.mapScale.t.innerHTML = J + K
		}
	};
	c.checkAndResetState = function ()
	{
		var A = this.spec.p(this.m, this.zoomLevel, this.viewSize);
		if (!A.equals(this.m))
		{
			this.m.x = A.x;
			this.m.y = A.y;
			this.as(this.m)
		}
		var $ = this.ab(),
			_ = this.ad($.minX, $.minY);
		q(this.mask, _.x);
		d(this.mask, _.y);
		this.sp = null;
		this.bj(true);
		d1.a(this.ac().toString() + " centerXY(" + this.y().toString() + ")", "map view bounds and centerXY")
	};
	c.addPoint = function (F, C, D, A, B, $, _, I)
	{
		if (F == null || C == null) return;
		if (!D) D = "";
		if (!A) A = S.i();
		B = new l1(!B ? "S01" : B);
		if (!$) $ = {
			"on": "true",
			"style": "Label01"
		};
		if (!_) _ = {};
		var H = new u0(F, C, F, C),
			G = Q.createDom(A, D, "S", [
				[new G0(F, C)]
			], H, B, $, _),
			E = Q.a(G);
		this.addFeature(E, I);
		return E
	};
	c.addLine = function (E, C, A, B, $, _, G)
	{
		if (!E || !E.length) return;
		if (!C) C = "";
		if (!A) A = S.i();
		B = new l1(!B ? "L01" : B);
		if (!$) $ = {
			"on": "true",
			"style": "Label01"
		};
		if (!_) _ = {};
		var F = Q.createDom(A, C, "L", [E], null, B, $, _),
			D = Q.a(F);
		this.addFeature(D, G);
		return D
	};
	c.addFeature = function (_, $)
	{
		this.features.push(_);
		if ($) _.isFixed = true;
		this.ay(_);
		L.d(this, "addfeature", _)
	};
	c.ay = function (A)
	{
		var $ = this;

		function _(_)
		{
			if (_)
			{
				A.style = _;
				$.ay2(A)
			}
		}
		k1.loadStyle(A.style.id, _)
	};
	c.ay2 = function (C)
	{
		try
		{
			if (C.element) return;
			var A, B = this,
				$, _, G, F, D;
			F = B.fPool[C.style.id];
			if (F && F.length > 0)
			{
				A = F.pop();
				switch (C.type)
				{
				case "S":
					A.appendTo(B.q);
					A.show();
					break;
				case "L":
					W(B.q, A);
					w(A);
					break;
				case "R":
					W(B.q2, A);
					w(A);
					break
				}
			}
			else switch (C.type)
			{
			case "S":
				A = B.bf(C);
				break;
			case "L":
				A = B.bk(C, B.q);
				break;
			case "R":
				A = B.bk(C, B.q2);
				break
			}
			C.element = A;
			$ = B.bh(C);
			A.label = $;
			B.bi(C, $);
			if (C.type == "S")
			{
				B.bg(A, C);
				_ = A.mouseTarget;
				L.f(_, "click", function ($)
				{
					D1($);
					L.d(B, "poiclick", C)
				});
				L.f(_, "mousedown", function ($)
				{
					L.d(B, "leftdown", C, $)
				});
				L.f(_, "mouseover", function ($)
				{
					D1($);
					L.d(B, "mouseover", C)
				});
				L.f(_, "mouseout", function ($)
				{
					D1($);
					L.d(B, "mouseout", C)
				});
				L.f(_, "contextmenu", function ($)
				{
					D1($);
					L.d(B, "poirightclick", C, $)
				});
				_.id = "POI_" + C.caption
			}
			else
			{
				B.bz(C, A);
				G = S.l.type != 1 ? A._e : A;
				L.f(G, "click", function ($)
				{
					D1($);
					L.d(B, "poiclick", C)
				});
				L.f(G, "mouseover", function ($)
				{
					$ = $ || envet;
					C.eventPt = u1($, B.div);
					L.d(B, "mouseover", C, $)
				});
				L.f(A, "mouseout", function ($)
				{
					$ = $ || envet;
					C.eventPt = u1($, B.div);
					L.d(B, "mouseout", C, $)
				});
				G.id = "POI_" + C.caption
			}
			L.f($, "click", function ($)
			{
				D1($);
				L.d(B, "labelclick", C)
			});
			L.f($, "mouseover", function ($)
			{
				D1($);
				L.d(B, "labelmouseover", C)
			});
			L.f($, "mouseout", function ($)
			{
				D1($);
				L.d(B, "labelmouseout", C)
			});
			L.f($, "mousedown", function ($)
			{
				D1($)
			});
			return A
		}
		catch (E)
		{}
	};
	c.setQueryArea = function (_)
	{
		this.removeQueryArea();
		this.queryArea = _;
		var $ = this.ay(_)
	};
	c.removeQueryArea = function ()
	{
		var $ = this.queryArea;
		if ($) this.az($);
		this.queryArea = null
	};
	c.removeFeature = function (B)
	{
		var _ = [],
			$ = this;
		for (var A = 0; A < $.features.length; A++) if ($.features[A] == B)
		{
			$.az(B);
			if ($.iwFeature == B) $.closeInfoWindow()
		}
		else _.push($.features[A]);
		if ($.features.length != _.length) $.features = _
	};
	c.az = function (D)
	{
		var C, A, B = D.element,
			$, _, G, F = this.fPool,
			E = D.style.id;
		if (B)
		{
			if (D.type == "S")
			{
				B.wink(0);
				B.e()
			}
			else J1(B.parentNode, B);
			_ = D.type == "S" ? B.mouseTarget : B;
			$ = _["__ev__"];
			_["__ev__"] = null;
			if ($) for (G = 0; G < $.length; G++) L.g($[G]);
			A = B.label;
			if (A && A.parentNode)
			{
				J1(A.parentNode, A);
				$ = A["__ev__"];
				if ($)
				{
					for (G = 0; G < $.length; G++) L.g($[G]);
					A["__ev__"] = null
				}
			}
			if (!F[E]) F[E] = [];
			if (D.type != "R") F[E].push(B);
			B = B.label = A = C = D.element = null
		}
	};
	c.clearAll = function ($)
	{
		this.clearFeatures();
		this.removeQueryArea();
		L.d(this, "clearall");
		d1.b("appid=" + this.appId, "oprt=_clearAll", "param=empty", "type=map")
	};
	c.hideFeatures = function ()
	{
		var A = this.features.length;
		for (var B = 0; B < A; B++)
		{
			var $ = this.features[B];
			if ($ && $.type == "S" && $.element) $.element.hide()
		}
		var _ = this.queryArea;
		if (_ && _.type == "S" && _.element) _.element.hide();
		this.closeInfoWindow();
		L.d(this, "hidefeatures")
	};
	c.ba = function ()
	{
		this.closeInfoWindow();
		l(this.q);
		l(this.cursorTip)
	};
	c.bb = function ()
	{
		w(this.q)
	};
	c.closeInfoWindow = function ()
	{
		var $ = this,
			A = $.iwFeature;
		$.iwFeature = null;
		$.bm();
		if (A) L.d($, "closeinfowin", A);
		if (A && A.type == "S" && A.element)
		{
			A.element.blur();
			var _ = A.element.label;
			if (_) if (A.label.on == "false") P1(_);
			else R1(_)
		}
	};
	c.bd = function ()
	{
		this.lastPageCenter = this.y();
		this.lastPageZoom = this.zoomLevel
	};
	c.clearFeatures = function ()
	{
		var A, $ = [];
		for (var _ = 0; _ < this.features.length; _++)
		{
			A = this.features[_];
			if (!A.isFixed) this.az(A);
			else $.push(this.features[_])
		}
		if (this.features.length != $.length) this.features = $;
		this.closeInfoWindow();
		L.d(this, "clearfeatures")
	};
	c.removeFeatures = function ()
	{
		var _;
		for (var $ = 0; $ < this.features.length; $++)
		{
			_ = this.features[$];
			this.removeFeature(_)
		}
		this.closeInfoWindow();
		L.d(this, "removefeatures")
	};
	J.orderFunc = function (_, $)
	{
		if (_.points[0].y > $.points[0].y) return -1;
		if (_.points[0].y < $.points[0].y) return 1;
		return 0
	};
	c.bf = function (F)
	{
		var C = this,
			E = F.style.obj,
			A = S.m,
			B, $, _;
		B = E.img;
		if (B[0])
		{
			$ = B[1];
			B = B[0]
		}
		else $ = B;
		return new D([B, $], C.q)
	};
	c.bg = function (E, C)
	{
		var D, F, A, B, $, _;
		D = C.points[0];
		F = this.spec.k;
		if (!F.containsSegment(D, D)) D = new G0(parseFloat(this.spec.sds.defaultCX), parseFloat(this.spec.sds.defaultCY));
		A = this.spec.q(D.y, D.x, this.zoomLevel);
		B = this.ad(A.x, A.y);
		E.b(B.x, B.y)
	};
	c.bh = function (E, C)
	{
		if (!E.label) return;
		if (!C) C = this.q;
		var D, A, B = C1("label_" + E.id),
			$, _, F = [];
		if (B && B.texts) return B;
		D = E.caption;
		A = E.label.style;
		B = T("span", C);
		B.id = "label_" + E.id;
		v(B);
		B.style.fontSize = o(12);
		S1(B, 5);
		A = (!A ? "F01" : A);
		if (E.type != "R")
		{
			$ = T("span", B);
			v($);
			_ = L1(D + " ");
			W($, _);
			B.texts = [$]
		}
		else
		{
			$ = T("span", B);
			B.texts = [$];
			W(E.element, B)
		}
		if (D && $) F1($, A);
		$.name = "LABEL_" + D;
		$.unselectable = "on";
		if (E.label.on == "false" || E.type == "L") P1(B);
		else R1(B);
		return B
	};
	c.bi = function (D, C)
	{
		var B = D.element;
		if (B)
		{
			C = !C ? B.label : C;
			if (C)
			{
				var A = D.points,
					$, _, H, F, G, E;
				switch (D.type)
				{
				case "S":
					$ = this.spec.q(A[0].y, A[0].x, this.zoomLevel);
					_ = this.ad($.x, $.y);
					q(C, _.x);
					d(C, _.y);
					q(C.texts[0], B.width / 2);
					d(C.texts[0], -10);
					break;
				case "L":
					P1(C);
					break;
				case "R":
					l(C);
					break
				}
			}
		}
	};
	c.bj = function ($)
	{
		for (var B = 0; B < this.features.length; B++)
		{
			var _ = this.features[B];
			if (_.element)
			{
				if (_.type == "S")
				{
					if (!$) this.bg(_.element, _)
				}
				else this.bz(_);
				if (!$ || _.type != "S") this.bi(_)
			}
		}
		var A = this.queryArea;
		if (A && A.element)
		{
			if (A.type == "S")
			{
				if (!$) this.bg(A.element, A)
			}
			else this.bz(A);
			this.bi(A)
		}
		if (!$) this.bl()
	};
	c.bl = function ()
	{
		var C = this,
			F, D, E, A = C.iwFeature,
			B, $, _;
		if (!A || !A.element || A.type != "S")
		{
			C.closeInfoWindow();
			return
		}
		B = A.element;
		F = A.points;
		F = F[F.length >> 1];
		D = C.spec.q(F.y, F.x, C.zoomLevel);
		E = C.ad(D.x, D.y);
		$ = B.pointCoord;
		$ = !$ ? {
			x: 0,
			y: 0
		} : $;
		_ = B.shadowOffset;
		_ = !_ ? {
			x: 0,
			y: 0
		} : _;
		L.d(C, "repositioninfowin", E.x, E.y, $, C.viewSize, C.bn(F), _)
	};
	c.repositionFeature = function (A, B)
	{
		var _ = this,
			$;
		if (A && A.element)
		{
			if (B)
			{
				B = B.length && B.length > 0 ? B : [B];
				$ = B[0];
				A.points = B;
				A.segments = [B]
			}
			if (A.type == "S")
			{
				if ($) A.bounds = new u0($.x, $.y, $.x, $.y);
				_.bg(A.element, A)
			}
			else _.bz(A);
			_.bi(A);
			_.bl()
		}
	};
	c.bm = function ()
	{
		var C = this,
			F = 0.5,
			D = 0.5,
			E, A, B, $, _ = C.cvLLMC;
		if (C.wheelPoint) $ = C.wheelPoint;
		else if (C.iwFeature)
		{
			B = C.iwFeature.points;
			$ = B[B.length >> 1];
			if ($.x > -180 && $.x < 180 && $.y > -180 && $.y < 180)
			{
				if (!_) C.cvLLMC = _ = new ConvertorLLndMC();
				$ = _.convertLL2MC($)
			}
		}
		if ($)
		{
			A = C.bn($);
			if (A.x >= 0 && (A.x <= 1 && (A.y >= 0 && A.y <= 1)))
			{
				F = A.x;
				D = A.y;
				E = new G0($.x, $.y)
			}
		}
		C.z = (!E ? C.y() : E);
		if (F == C.l.x && D == C.l.y) return;
		C.z = null;
		C.m.x -= _0(C.viewSize.width * (C.l.x - F));
		C.m.y -= _0(C.viewSize.height * (C.l.y - D));
		C.l.x = F;
		C.l.y = D;
		C.z = (!E ? C.y() : E)
	};
	c.bn = function (B)
	{
		var _ = this.ac(),
			A = (B.x - _.minX) / (_.maxX - _.minX),
			$ = (_.maxY - B.y) / (_.maxY - _.minY);
		return new G0(A, $)
	};
	c.panToInfoWindow = function (M, J, K, P, O)
	{
		if (!M || !J || !K) return;
		var L = this,
			N, Q, M, E, C, D, A, B, $, _, H, I, F, G;
		E = L.spec.q(M.y, M.x, L.zoomLevel);
		C = L.ad(E.x, E.y);
		D = new G0(L.m.x, L.m.y);
		A = P + (E.x - C.x);
		B = O + (E.y - C.y);
		$ = _0(L.viewSize.width * L.l.x);
		_ = L.viewSize.width - $;
		H = _0(L.viewSize.height * L.l.y);
		I = L.viewSize.height - H;
		D.y = u(D.y, B + H - 38);
		D.y = r(D.y, E.y - I + 38);
		F = 38;
		G = E.y - K - (D.y - H);
		if (G < 55) F = F + 50;
		else if (G < 295) F = F + 35;
		D.x = u(D.x, A + $ - F);
		D.x = r(D.x, A + J - _ + 38);
		L.z = null;
		L.ap(D)
	};
	c.bp = function ($)
	{
		if (S.l.type == 2 && S.l.os == 2)
		{
			L.f($, "keydown", this.eventHandler("cancelKey"));
			L.f($, "keypress", this.eventHandler("handleKey"))
		}
		else
		{
			L.f($, "keydown", this.eventHandler("handleKey"));
			L.f($, "keypress", this.eventHandler("cancelKey"))
		}
		L.f($, "keyup", this.eventHandler("releaseKey"))
	};
	c.handleKey = function (_)
	{
		var $ = this;
		if ($.ignoreKeyEvent(_)) return true;
		switch (_.keyCode)
		{
		case 38:
		case 40:
		case 37:
		case 39:
		case 34:
		case 33:
		case 36:
		case 35:
			if (J.instancesCnt > 1 && !$.isFocus) return;
			$.div2.innerHTML = "";
			$.p.add(_.keyCode);
			$.startContinuousPan();
			D1(_);
			return false;
		case 27:
			$.r.reset();
			$.r.disable();
			B1($.div, "default");
			$.cursorTip.innerHTML = "";
			$.s.enable();
			D1(_);
			L.d($, "esc");
			return false;
		case 46:
			$.clearAll();
			D1(_);
			return false;
		case 187:
		case 107:
			$.zoomTo($.zoomLevel + 1);
			D1(_);
			d1.b("appid=" + $.appId, "oprt=_keyZoom", "param=+," + ($.zoomLevel + 1), "type=map");
			return false;
		case 189:
		case 109:
			$.zoomTo($.zoomLevel - 1);
			d1.b("appid=" + $.appId, "oprt=_keyZoom", "param=-," + ($.zoomLevel - 1), "type=map");
			D1(_);
			return false
		}
		switch (_.which)
		{
		case 61:
		case 43:
			$.zoomTo($.zoomLevel + 1);
			D1(_);
			return false;
		case 45:
		case 95:
			$.zoomTo($.zoomLevel - 1);
			D1(_);
			return false
		}
		return true
	};
	c.cancelKey = function ($)
	{
		if (this.ignoreKeyEvent($)) return true;
		switch ($.keyCode)
		{
		case 38:
		case 40:
		case 37:
		case 39:
		case 34:
		case 33:
		case 36:
		case 35:
		case 187:
		case 107:
		case 189:
		case 109:
		case 33:
		case 34:
		case 35:
		case 36:
		case 12:
		case 46:
		case 49:
		case 50:
		case 51:
		case 52:
		case 53:
		case 54:
		case 55:
		case 56:
		case 57:
			D1($);
			return false
		}
		switch ($.which)
		{
		case 61:
		case 43:
		case 45:
		case 95:
			D1($);
			return false
		}
		return true
	};
	c.releaseKey = function ($)
	{
		if (this.ignoreKeyEvent($)) return true;
		switch ($.keyCode)
		{
		case 38:
		case 40:
		case 37:
		case 39:
		case 33:
		case 34:
		case 35:
		case 36:
			this.p.remove($.keyCode);
			L.d(this, "keypanend");
			d1.b("appid=" + this.appId, "oprt=_keyPan", "param=" + $.keyCode, "type=map");
			return false
		}
	};
	c.ignoreKeyEvent = function (A)
	{
		if (A.ctrlKey || (A.altKey || A.metaKey)) return true;
		var $, _;
		if (A.target)
		{
			$ = A.target.nodeName;
			_ = A.target.getAttribute("type")
		}
		if (A.srcElement)
		{
			$ = A.srcElement.tagName;
			_ = A.srcElement.type
		}
		$ = $.toLowerCase();
		if (_) _ = _.toLowerCase();
		if (($ == "input" && (_ == "text" || _ == "password")) || $ == "textarea") return true;
		return false
	};
	c.startContinuousPan = function (_, $)
	{
		if (!this.t()) return;
		this.cancelPan();
		if (_ || $) this.autoPanDirect = {
			x: _,
			y: $
		};
		L.d(this, "movestart");
		if (!this.bs)
		{
			this.panSiner = new J0(100);
			this.bs = this.setTimeout(function ()
			{
				this.bt()
			}, 5)
		}
	};
	c.endContinuousPan = function ()
	{
		this.autoPanDirect = null
	};
	c.bt = function ()
	{
		var B = 0,
			_ = 0,
			A = this.p.size,
			$ = this.autoPanDirect;
		if (this.p.size > 0)
		{
			B = (this.p.contains(37) ? 1 : 0) + (this.p.contains(39) ? -1 : 0);
			_ = (this.p.contains(38) ? 1 : 0) + (this.p.contains(40) ? -1 : 0);
			if (B == 0 && _ == 0)
			{
				if (this.p.contains(33))
				{
					B = -1;
					_ = 1
				}
				if (this.p.contains(34))
				{
					B = -1;
					_ = -1
				}
				if (this.p.contains(35))
				{
					B = 1;
					_ = -1
				}
				if (this.p.contains(36))
				{
					B = 1;
					_ = 1
				}
			}
		}
		if ($)
		{
			B = $.x;
			_ = $.y
		}
		if (B || _)
		{
			this.continuousPan(B, _);
			this.bs = this.setTimeout(function ()
			{
				this.bt()
			}, 10)
		}
		else
		{
			this.bs = null;
			L.d(this, "update");
			L.d(this, "moveend")
		}
	};
	c.continuousPan = function (D, B)
	{
		var C = 1;
		if (this.panSiner.more()) C = this.panSiner.next();
		var _ = D > 0 ? Math.floor : Math.ceil,
			A = _(7 * C * D + 5 * D);
		_ = B > 0 ? Math.floor : Math.ceil;
		var $ = _(7 * C * B + 5 * B);
		this.s.moveTo(this.s.left + A, this.s.top + $);
		this.onMove();
		this.ai()
	};
	c.onWindowBlur = function ($)
	{
		if (this.p.size > 0) this.p = new H0()
	};
	c.resetMap = function ()
	{
		var _ = this,
			$, A;
		_.closeInfoWindow();
		if (_.spec.sds)
		{
			$ = new G0(parseFloat(_.spec.sds.defaultCX), parseFloat(_.spec.sds.defaultCY));
			A = _.spec.x(E1(_.spec.sds.defaultLevel) - 1)
		}
		if (A != _.zoomLevel) _.aq($, A);
		else _.ao($);
		d1.b("appid=" + this.appId, "oprt=_resetMap", "param=empty", "type=map")
	};
	c.bu = function (_)
	{
		var $ = this.bx(_);
		q($, 28);
		d($, 5);
		$.style.fontWeight = "bold";
		$.style.color = "#ff0000";
		W(this.a, $);
		this.mapTitle = $
	};
	c.showLogo = function ()
	{
		var A = this,
			$ = T("a", A.a),
			_ = A.copyrightType,
			C = A.viewSize,
			B = 0;
		if (!(_ & 4)) return;
		v($);
		if (C.width < 410 && C.height < 460) B = 1;
		$.style.bottom = o(B ? 26 : 35);
		$.href = S.j[1];
		$.target = "_blank";
		W($, c1.create(S.e + "/images/logo" + (B ? 2 : "") + ".png", B ? 70 : 92, B ? 26 : 35, 2, 0, 3000))
	};
	c.bv = function ()
	{
		var C = this,
			D, E, A, B, $, _ = C.copyrightType,
			I, H = C.isHybrid,
			F = C.isHbLbl;
		if (!(_ & 1)) return;

		function G(C, A, _)
		{
			var B = T(!A ? "span" : "a", _),
				$ = B.style;
			B.innerHTML = C;
			if (A)
			{
				B.href = A;
				B.target = "_blank"
			}
			$.color = "#00f";
			$.fontFamily = "Verdana,sans-serif";
			$.fontSize = "7pt";
			$.lineHeight = "7pt";
			return B
		}
		D = C.mainCopyright;
		if (!D)
		{
			C.mainCopyright = D = C.bx();
			W(C.a, D);
			q(D, _ & 4 ? 95 : 2);
			//q(D, _ & 4 ? 2 : 2);
			D.style.bottom = o(2)
		}
		D.innerHTML = "";
		E = G(S.j[0], S.j[1], D);
		G(" - " + S.j[2], "", D);
		G("&nbsp;- ", "", D);
		B = T("span", D);
		if ((!H && !F) || F)
		{
			G(" Data&#169;", "", B);
			G(S.r[0], S.r[1], B);
			G(" ","",B);
			G(S.t[0], S.t[1], B);
		}
		if (H)
		{
			if (F) G("&nbsp;,", "", B);
			G(" Image&#169;", "", B);
			for (I = 0; I < S.s.length; I++)
			{
				if (I > 0) G("&amp;", "", B);
				G(S.s[I][0], S.s[I][1], B)
			}
		}
		L.d(C, "copyrightupdate", D, B, G)
	};
	c.bw = function ()
	{
		var C, A, B, $, _ = this.copyrightType;
		if (!(_ & 2)) return;
		A = this.bx();
		q(A, 2);
		A.style.bottom = o(12);
		B = T("DIV", A, new G0(_ & 4 ? 95 : 2, -13), new X0(0, 0));
		//B = T("DIV", A, new G0(_ & 4 ? 2 : 2, -13), new X0(0, 0));
		B.style.borderTop = "5px solid #00c";
		B.style.fontSize = o(1);
		$ = this.bx();
		$.style.whiteSpace = "nowrap";
		$.style.color = "#0000ff";
		q($, _ & 4 ? 96 : 3);
		//q($, _ & 4 ? 3 : 3);
		$.style.bottom = o(12);
		W(A, $);
		W(this.a, A);
		this.mapScale = {
			"t": $,
			"w": B
		}
	};
	c.bx = function (A)
	{
		var $ = T("DIV"),
			_ = $.style;
		v($);
		B1($, "default");
		$.unselectable = "on";
		$.onselectstart = Q1;
		if (A != null) $.innerHTML = A;
		_.whiteSpace = "nowrap";
		_.fontSize = o(12);
		_.fontFamily = "Arial, sans serif";
		_.MozUserSelect = "none";
		return $
	};
	c.by = function (E, C, D)
	{
		if (!E.points) return;
		if (!C) C = [];
		if (!D) D = new u0();
		var $ = [],
			_, A = E.segments,
			B = E.levels,
			H = V1(this.ac()),
			F = E.points;
		A = (A && A.length > 1 ? A : [F]);
		A = T1(A, B, this.zoomLevel);
		if (!this.eMapisLive) A = E.type == "R" ? _1(A, H) : A1(A, H);
		E.clipSegments = A;
		if (A.length < 1) A = [
			[F[0], F[1]]
		];
		for (var J = 0; J < A.length; J++)
		{
			for (var G = 0; G < A[J].length; G++)
			{
				_ = this.spec.q(A[J][G].y, A[J][G].x, this.zoomLevel);
				_.x = _0(_.x);
				_.y = _0(_.y);
				if (C.length > 0 && _.x == C[C.length - 1].x && _.y == C[C.length - 1].y)
				{
					_.x++;
					_.y++
				}
				C.push(_);
				if (_.x < D.minX || D.minX == null) D.minX = _.x;
				if (_.y < D.minY || D.minY == null) D.minY = _.y;
				if (_.x > D.maxX || D.maxX == null) D.maxX = _.x;
				if (_.y > D.maxY || D.maxY == null) D.maxY = _.y;
				if (G == 0) $.push("m");
				$.push(_.x);
				$.push(_.y);
				if (G == 0) $.push("l")
			}
			if (E.type == "R") $.push("x")
		}
		$.push("e");
		var I = $.join(" ");
		return I
	};
	c.bz = function (D, J)
	{
		if (D.type == "S") return;
		var A, C, $, _, I, Q, H, M, L, F, K, R, P, N, B, E;
		A = D.bounds;
		C = D.points;
		M = 1;
		L = 1;
		F = this.m;
		N = F.x + " " + F.y;
		J = !J ? D.element : J;
		D.element = J;
		if (J && J._e) Q = J._e;
		R = this.spec.q(A.minY, A.minX, this.zoomLevel);
		P = this.spec.q(A.maxY, A.maxX, this.zoomLevel);
		_ = new u0(R.x, R.y, P.x, P.y);
		D.bitmapBounds = _;
		K = E1(t(_.maxX - _.minX));
		I = E1(t(_.maxY - _.minY));
		if (C.length == 1)
		{
			$ = this.spec.q(C[0].y, C[0].x, this.zoomLevel);
			D.bitmapPoints = [$];
			H = this.ad($.x, $.y);
			B = H.x - (K >> 1);
			E = H.y - (I >> 1);
			if (S.l.type == 1)
			{
				j(J, K);
				k(J, I);
				q(J, B);
				d(J, E)
			}
			else
			{
				A0(Q, "cx", K * 0.5 + 10);
				A0(Q, "cy", I * 0.5 + 10);
				A0(Q, "rx", K >> 1);
				A0(Q, "ry", I >> 1);
				A0(J, "height", o(K + 20));
				A0(J, "width", o(I + 20));
				q(J, H.x - K * 0.5 - 10);
				d(J, H.y - I * 0.5 - 10)
			}
		}
		else if (C.length > 1)
		{
			var G;
			G = this.ad(F.x, F.y);
			$ = [];
			_ = new u0();
			D.bitmapPoints = $;
			D.bitmapBounds = _;
			if (S.l.type == 1)
			{
				j(J, M);
				k(J, L);
				J.filled = (D.type == "R");
				q(J, G.x);
				d(J, G.y);
				J.coordorigin = N;
				J.coordsize = M + " " + L;
				J.path = this.by(D, $, _)
			}
			else
			{
				var O = D.type == "R" ? "1" : "2";
				A0(Q, "d", this.cb(D, $, _));
				K = E1(t(_.maxX - _.minX));
				I = E1(t(_.maxY - _.minY));
				A0(J, "width", o(K));
				A0(J, "height", o(I));
				A0(J, "viewbox", G.x + " " + G.y + " " + K + " " + I);
				q(J, _.minX);
				d(J, _.minY)
			}
		}
		if (S.l.type != 1)
		{
			v(J);
			A0(J, "version", "1.1");
			A0(J, "overflow", "visible")
		}
		this.cd(D);
		return J
	};
	c.redrawVectorFeature = function ($)
	{
		if (!$ || $.type == "S" || !$.element) return;
		this.bz($, $.element)
	};
	c.bk = function (F, D, E)
	{
		if (E)
		{
			var _ = this.ab(),
				B = F.bounds,
				G = this.spec.q(B.minY, B.minX, this.zoomLevel),
				C = this.spec.q(B.maxY, B.maxX, this.zoomLevel),
				A = new u0(G.x, C.y, C.x, G.y);
			if (!_.isIntersect(A)) return
		}
		if (F)
		{
			var $ = F.points,
				H;
			if ($.length == 1)
			{
				if (S.l.type == 1)
				{
					H = T("v:oval");
					H.unselectable = "on";
					H.filled = (F.type == "R");
					v(H)
				}
				else
				{
					H = Z1("svg");
					H._e = Z1("ellipse", H)
				}
			}
			else if ($.length > 1) if (S.l.type == 1)
			{
				H = T("v:shape");
				H.unselectable = "on";
				v(H)
			}
			else
			{
				H = Z1("svg");
				H._e = Z1("path", H)
			}
			this.cd(F, H);
			W(D, H);
			S1(H, 0);
			return H
		}
	};
	c.ca = function (E, C, D)
	{
		try
		{
			var A = r1.loadFromString(E),
				B = A.features,
				$;
			if (!C) C = new u0();
			C.clone(A.bounds);
			for (var F = 0; F < B.length; F++)
			{
				if (D) B[F].isFixed = true;
				if (B[F].detail && B[F].detail.infowin == "true")
				{
					$ = B[F];
					$.detail.infowin = "false"
				}
				this.addFeature(B[F])
			}
			if ($) L.d(this, "hasautoshowinfowin", $);
			return A
		}
		catch (_)
		{
			d1.a(_.description, "MapArea.loadDataXML() exception")
		}
	};
	c.cb = function (E, C, D)
	{
		if (!E.points) return;
		if (!C) C = [];
		if (!D) D = new u0();
		var $ = [],
			_, A = E.segments,
			B = E.levels,
			H = this.ac(),
			I, J, F = E.points;
		A = (A && A.length > 1 ? A : [F]);
		A = T1(A, B, this.zoomLevel);
		if (!this.eMapisLive) A = E.type == "R" ? _1(A, H) : A1(A, H);
		E.clipSegments = A;
		if (A.length < 1) A = [
			[F[0], F[1]]
		];
		for (J = 0; J < A.length; J++)
		{
			for (var G = 0; G < A[J].length; G++)
			{
				_ = this.spec.q(A[J][G].y, A[J][G].x, this.zoomLevel);
				C.push(_);
				_ = this.ad(_.x, _.y);
				_.x = _0(_.x);
				_.y = _0(_.y);
				D.extend(_);
				if (G == 0) $.push("M");
				else $.push("L");
				$.push(_.x);
				$.push(_.y)
			}
			if (E.type == "R") $.push("Z")
		}
		D.minX -= 5;
		D.minY -= 5;
		D.maxX += 5;
		D.maxY += 5;
		for (J = 0; J < $.length; J++)
		{
			if (isNaN($[J])) continue;
			if (isNaN($[J - 1])) $[J] -= D.minX;
			else $[J] -= D.minY
		}
		I = $.join(" ");
		return I
	};
	c.cc = function ($)
	{
		var A, B, D, C, _ = this;
		if (_.fTMTkt.isValid())
		{
			j1.invalidate("fTMTkt");
			for (B = 0; B < $.length; B++)
			{
				if (!$[B][2]) continue;
				A = $[B][0];
				for (D = 0; D < A.length; D++) for (C = 0; C < A[D].length; C++) _.ag(A[D][C], D, C, $[B][1], _.div == $[B][3])
			}
		}
	};
	c.onOL2Mv = function ($)
	{
		$ = $ || event;
		L.d(this, "overlaymousemove", $)
	};
	c.cd = function ($, C)
	{
		C = !C ? $.element : C;
		var J;
		if (C && C._e) J = C._e;
		if ($.style && S.l.type == 1)
		{
			var _ = $.style.obj;
			if (_)
			{
				if (C) while (C.hasChildNodes()) J1(C, C.lastChild);
				var H;
				for (var I in _)
				{
					if (I.indexOf("v:") < 0) continue;
					H = T(I);
					H.on = "true";
					var E = _[I];
					for (var B in E)
					{
						if (typeof (E[B]) == "function") continue;
						H[B] = E[B]
					}
					H.joinstyle = "round";
					W(C, H)
				}
			}
		}
		if ($.style && S.l.type != 1)
		{
			_ = $.style.obj;
			if (_)
			{
				var H, G = "",
					F = "",
					E, D, K;
				for (I in _)
				{
					E = _[I];
					if (I.indexOf("stroke") > -1)
					{
						for (B in E)
						{
							D = E[B];
							switch (B)
							{
							case "color":
								G = "stroke";
								F = D;
								break;
							case "weight":
								G = "stroke-width";
								F = D;
								break;
							case "opacity":
								G = "stroke-opacity";
								F = D.indexOf("%") > -1 ? "" + parseInt(D) / 100 : D;
								break;
							case "dashstyle":
								K = {
									"Solid": "none",
									"ShortDash": "6,2",
									"ShortDot": "2,2",
									"ShortDashDot": "6,2,2,2",
									"ShortDashDotDot": "6,2,2,2,2,2",
									"Dot": "2,6",
									"Dash": "10,6",
									"LongDash": "20,6",
									"DashDot": "10,6,2,6",
									"LongDashDot": "20,6,2,6",
									"LongDashDotDot": "20,6,2,6,2,6"
								};
								G = "stroke-dasharray";
								F = K[D];
								break;
							case "endArrow":
								G = "marker-end";
								F = "url(#" + D + ")";
								if (D == "Classic" && $.type == "L")
								{
									var A, I;
									A = Z1("marker", C);
									A0(A, "id", "Classic");
									A0(A, "viewBox", "0 0 10 10");
									A0(A, "refX", "10");
									A0(A, "refY", "5");
									A0(A, "markerUnits", "strokeWidth");
									A0(A, "markerWidth", "7");
									A0(A, "markerHeight", "18");
									A0(A, "orient", "auto");
									I = Z1("path", A);
									A0(I, "d", "M 0 0 L10 5 L0 10 L3 5 z");
									A0(I, "fill", "blue")
								}
								break
							}
							if (G != "" && F != "") A0(J, G, F)
						}
					}
					else if (I.indexOf("fill") > -1) for (B in E)
					{
						D = E[B];
						switch (B)
						{
						case "color":
							G = "fill";
							F = D;
							break;
						case "opacity":
							G = "fill-opacity";
							F = D.indexOf("%") > -1 ? "" + parseInt(D) / 100 : D;
							break
						}
						if (G != "" && F != "") A0(J, G, F)
					}
				}
				if ($.type == "L") A0(J, "fill", "none");
				A0(J, "stroke-linecap", "round");
				A0(J, "stroke-linejoin", "bevel")
			}
		}
	};
	Y("MapArea", J);
	Z(J, "getCenterLatLng", c.y);
	Z(J, "getBitmapBounds", c.ab);
	Z(J, "getLatLngBounds", c.ac);
	Z(J, "getDivCoordinate", c.ad);
	Z(J, "divToBitmapCoordinate", c.ae);
	Z(J, "recenterOrPanToLatLng", c.ao);
	Z(J, "centerAndZoom", c.aq);
	Z(J, "centerAtLatLng", c.ar);
	Z(J, "centerAtBitmap", c.as);
	Z(J, "switchSpecification", c.av);
	Z(J, "createFeatureElement", c.ay);
	Z(J, "removeFeatureElement", c.az);
	Z(J, "loadDataXML", c.ca);
	Z(J, "setSymbolPosition", c.bg);
	Z(J, "setLabelPosition", c.bi);
	Z(J, "showCopyright", c.bv);

	function H(A, $, _)
	{
		var B = this;
		B._e = B.eventHandler;
		B.map = null;
		B.a = A;
		B.c = $;
		B.b = _;
		B.e = [];
		B.f = false;
		B.g = null;
		B.h = [];
		B.i = [];
		B.j = "auto";
		B.k = B.mapProcess = new E();
		B.l = true;
		B.m = true;
		k1.baseURL = S.b;
		B.p = "1,1";
		B.q = ",,";
		B.appId = "1361";
		L.f(window, "resize", B._e("resizeTo"));
		L.a(B.k, "callback", B._e("handleResult"));
		if (S.l.type == 4) document.body.style.overflow = "hidden";
		B.labelTimer = [];
		B.isInfoWinAutoOpen = true
	}
	var r0 = H.prototype = new n();
	r0.createMapArea = function (E, C, D, A, B, $, _)
	{
		var F, H = this;
		if (_) H.a = _;
		_ = H.a;
		if (!_)
		{
			_ = T("span");
			W(document, _)
		}
		if (!_.style.position) _.style.position = "relative";
		_.style.textAlign = "left";
		L.f(_, S.l.type == 2 ? "DOMMouseScroll" : "mousewheel", function ($)
		{
			D1($)
		});
		if (E && C)
		{
			q(_, E);
			d(_, C)
		}
		if (D && A) H.resizeTo(E1(D), E1(A));
		if (B)
		{
			try
			{
				_.style.border = B + " 1px solid"
			}
			catch (G)
			{}
		}
		H.map = new J(_, H.e, D, A, H.c, H.b, H.copyrightType);
		F = H.map;
		if (H.isHybrid)
		{
			F.isHybrid = H.isHybrid;
			F.isHbLbl = H.isHbLbl;
			if (H.rmpId) F.rmpId = H.rmpId
		}
		F.bp(window.document);
		F.appId = H.appId;
		L.a(F, "update", H._e("update"));
		L.a(F, "moveend", H._e("onMoveEnd"));
		L.a(F, "poiclick", H._e("onMapClick"));
		L.a(F, "mouseover", H._e("onMapMouseOver"));
		L.a(F, "mouseout", H._e("onMapMouseOut"));
		L.a(F, "mousedown", H._e("onMapMouseDown"));
		L.a(F, "drawend", H._e("onDrawEnd"));
		L.a(F, "doubleclick", H._e("onDoubleclick"));
		L.a(F, "mousewheel", H._e("onMW"));
		L.a(F, "hasautoshowinfowin", H._e("autoShowInfowin"));
		L.a(F, "labelclick", H._e("onMapClick"));
		L.a(F, "labelmouseover", H._e("onLabelMouseOver"));
		L.a(F, "labelmouseout", H._e("onMapMouseOut"))
	};
	r0.s = function (A)
	{
		this.f = A;
		if (!A) if (this.h.length > 0)
		{
			var $ = this.h.shift(),
				_ = this.i.shift();
			this.setTimeout(this.submit, 100, $, _)
		}
	};
	r0.t = function ()
	{
		return this.f
	};
	r0.submit = function (E, C, D, A, B, $, _)
	{
		try
		{
			d1.b("appid=" + this.getAppId(), "oprt=" + E.getMapServiceName(), "type=request");
			if (this.t() && D && this.g != C)
			{
				this.h.push(E);
				this.i.push(C);
				return
			}
			this.g = C;
			window.status = unescape("%u6B63%u5728%u67E5%u8BE2%uFF0C%u8BF7%u7A0D%u5019...");
			this.s(true);
			this.k.submit(E, !_ ? this.j : _, A, B, $);
			L.d(this, "submit", E, C)
		}
		catch (B)
		{
			B = h0(this) + ".submit()::" + B.description;
			d1.a(B, "exception")
		}
	};
	r0.handleResult = function (D)
	{
		L.d(this, "callbackstart", D);
		window.status = "";
		var C, B;
		try
		{
			C = D.getResult("hidden_MapTool");
			if (C != "") this.lastMaptool = C;
			C = D.getResult("ErrorMessage");
			if (C != "") L.d(this, "errormessage", C);
			C = D.getResult("hidden_APPID");
			if (C != "")
			{
				this.appId = C;
				this.map.appId = C
			}
			C = D.getResult("SDS");
			if (C != "")
			{
				B = V0.loadFromObj(this.sds);
				var $ = new _(B);
				$.rmpBaseURL = this.n;
				this.map.isLoadVmp = this.l;
				this.map.isLoadAd = this.m;
				this.map.av($);
				this.map.bd();
				this.map.removeFeatures();
				L.d(this, "sdschange", B);
				L.d(this, "inited", B)
			}
			if (this.g && this.g.mapResultCallback) this.g.mapResultCallback(D);
			L.d(this, "callbackend", D);
			L.d(this, "callback", D);
			this.s(false);
			if (this.map && !this.map.f && B)
			{
				var I, J, G, H, E, F;
				H = this.defaultCX;
				E = this.defaultCY;
				F = this.defaultLevel;
				I = new G0(parseFloat(!H ? B.defaultCX : H), parseFloat(!E ? B.defaultCY : E));
				J = !F ? this.map.spec.x(E1(B.defaultLevel) - 1) : E1(F);
				G = I;
				if (!J && J != 0) this.map.ar(G);
				else this.map.aq(G, J);
				this.defaultCX = this.defaultCY = this.defaultLevel = null
			}
		}
		catch (A)
		{
			this.s(false);
			A = "handleResult()::" + A.description;
			d1.a(A, "exception")
		}
	};
	r0.coordRecenterTo = function (D, B, C)
	{
		var $, A, _ = this;
		if (D && B) $ = new G0(parseFloat(D), parseFloat(B));
		if (C) C = parseInt(C);
		A = _.map;
		if (!A)
		{
			_.defaultCX = D;
			_.defaultCY = B;
			_.defaultLevel = C;
			return
		}
		if ($ && (C || C == 0)) A.aq($, C);
		else if ($) A.ao($);
		else if (C) A.zoomTo(C)
	};
	r0.update = function ()
	{
		var $ = this;
		$.delayShowInfoWin();
		L.d($, "update")
	};
	r0.resizeTo = function (_, $)
	{
		if (_ && $)
		{
			j(this.a, _);
			k(this.a, $)
		}
		if (this.map) this.map.onResize()
	};
	r0.getWindowSize = function ($)
	{
		if (!$) $ = new X0(0, 0);
		if (window.self && self.innerWidth)
		{
			$.width = self.innerWidth;
			$.height = self.innerHeight;
			return $
		}
		if (document.documentElement && document.documentElement.clientHeight)
		{
			$.width = document.documentElement.clientWidth;
			$.height = document.documentElement.clientHeight;
			return $
		}
		$.width = document.body.clientWidth;
		$.height = document.body.clientHeight;
		return $
	};
	r0.autoShowInfowin = function ($)
	{
		this.setTimeout(this.onMapMouseOver, 500, $)
	};
	r0.delayShowInfoWin = function ()
	{
		var $ = this;
		window.clearTimeout($.sIWTimer);
		if ($.sIWArgs)
		{
			$.showInfoWindow.apply($, $.sIWArgs);
			$.sIWArgs = null
		}
	};
	r0.showInfoWindow = function (F, D, E, C)
	{
		var B, $, _, A = this,
			I = A.map,
			G, H;
		if (!I || !F.element || F.type != "S") return;
		I.cancelPan();
		B = F.points;
		G = F.level;
		H = A.getLevelIndex();
		if (G)
		{
			G = parseInt(G);
			if (!C) G = G > H ? G : H
		}
		if (!E && ((G && G != H) || !I.isCanPanTo(B[0])))
		{
			A.coordRecenterTo(B[0].x, B[0].y, G);
			A.sIWArgs = [F, D, E];
			A.sIWTimer = A.setTimeout(A.delayShowInfoWin, 500);
			return
		}
		_ = I.iwFeature;
		if (_) L.d(A, "infowindowclose", _);
		$ = I.activeSymbol;
		if ($ && $.type == "S" && $.element) $.element.wink(false);
		L.d(I, "showinfowin", F, D, E)
	};
	r0.getInfoWinArgs = function (E, B)
	{
		if (!E || !E.element) return;
		var A = this,
			C, $, I, H, F = E.element,
			_ = E.points,
			G = A.map,
			D;
		D = (!E.infoWinPoint ? _[_.length >> 1] : E.infoWinPoint);
		C = G.spec.q(D.y, D.x, G.zoomLevel);
		$ = G.ad(C.x, C.y);
		I = F.pointCoord;
		I = !I ? {
			x: 0,
			y: 0
		} : I;
		H = F.shadowOffset;
		H = !H ? {
			x: 0,
			y: 0
		} : H;
		return [E, B, $, I, G.viewSize, G.bn(D), H]
	};
	r0.getVectorDiv = function ()
	{
		if (this.map) return this.map.q
	};
	r0.setHyBrid = function (C, B, $)
	{
		var _ = this,
			A = _.map;
		if (A)
		{
			A.isHybrid = C;
			A.isHbLbl = B;
			if ($) A.rmpId = $;
			if (A.t())
			{
				A.x(1);
				A.aq(A.y(), A.zoomLevel)
			}
			A.showCopyright();
			L.d(this, "hybrid", C, B, $)
		}
		else
		{
			_.isHybrid = C;
			_.isHbLbl = B;
			if ($) _.rmpId = $
		}
	};
	r0.setOverlay = function (A, _)
	{
		var $ = this.map;
		$.isOverLay = A;
		if (_ && typeof (_) == "function") S.g[3] = _;
		if ($.t())
		{
			$.x(0, 1);
			$.aq($.y(), $.zoomLevel)
		}
		L.d(this, "overlay", A)
	};
	r0.onMapMouseDown = function ()
	{};
	r0.onMapClick = function ($)
	{
		if (!$ || !$.element) return;
		this.showInfoWindow($, 1, 1);
		if ($ && $.type != "R") L.d(this, "poiclicked", $)
	};
	r0.onMapMouseOver = function (D)
	{
		var A = this;
		A.MVTXT = "\u53ef\u62d6\u52a8\u6539\u53d8\u4f4d\u7f6e";
		if (D && D.element)
		{
			A.onLabelMouseOver(D);
			var C = D.element,
				B = C.label,
				$, _ = A.map.cursorTip;
			if (B) R1(B);
			if (D.type == "S")
			{
				C.focus();
				if (D.isMovable && _.innerHTML == "") _.innerHTML = A.MVTXT
			}
			else if (D.eventPt)
			{
				$ = D.eventPt;
				if (B && $.x != null && $.y != null)
				{
					q(B, $.x + 5);
					d(B, $.y)
				}
			}
			if (A.isInfoWinAutoOpen)
			{
				window.clearTimeout(A.mIWTimer);
				A.showInfoWindow(D, 1, 1)
			}
		}
	};
	r0.onMapMouseOut = function (C)
	{
		var A = this,
			B = A.map,
			$ = B.iwFeature,
			_ = B.cursorTip;
		if (C && C.type != "R" && C.element)
		{
			if ($ && $ == C) if (A.isInfoWinAutoOpen)
			{
				window.clearTimeout(A.mIWTimer);
				A.mIWTimer = A.setTimeout(function ()
				{
					B.closeInfoWindow()
				}, 500)
			}
			if (_.innerHTML == A.MVTXT) _.innerHTML = "";
			A.onLabelMouseOver(C);
			A.labelTimer[C.id] = A.setTimeout(function ()
			{
				if (!C.element) return;
				if (C.type == "S") C.element.blur();
				var $ = C.element.label;
				if ($ && (C.label.on == "false" || C.type == "L")) P1($)
			}, 200)
		}
	};
	r0.onLabelMouseOver = function (_)
	{
		var $ = this.labelTimer[_.id];
		if ($)
		{
			window.clearTimeout($);
			this.labelTimer[_.id] = null
		}
	};
	r0.onDrawEnd = function (A, $)
	{
		L.d(this, "drawend", A, $);
		var _ = this.operationOnMap;
		if (_ && _.mapWindowCallback) _.mapWindowCallback(A, $);
		this.map.r.reset();
		L.d(this, "operateend", A, $);
		d1.b("M2::drawend ex")
	};
	r0.onMW = function (C)
	{
		var A, B, $, _ = this,
			D = _.map;
		C = C || event;
		if (D)
		{
			if (_.isZoomAtMspt)
			{
				D.wheelPoint = D.getMcXYBySC(C);
				D.bm()
			}
			A = C.wheelDelta;
			B = C.detail;
			$ = !A ? (!B ? 0 : -B) : A;
			if ($ > 0) _.animateZoomTo(D.zoomLevel + 1);
			else if ($ < 0) _.animateZoomTo(D.zoomLevel - 1)
		}
	};
	r0.onDoubleclick = function ($)
	{
		this.isDoubleclick = true
	};
	r0.onMoveEnd = function (_)
	{
		var $ = this;
		if ($.moveEndTimer) window.clearTimeout($.moveEndTimer);
		if ($.isDoubleclick) $.moveEndTimer = $.setTimeout($.animateZoomTo, 300, $.map.zoomLevel + 1);
		$.isDoubleclick = false
	};
	r0.clearAll = function ($)
	{
		this.map.clearAll($);
		L.d(this, "clearall")
	};
	r0.selectTool = function (_, $)
	{
		var A = this.map;
		A.r.reset();
		if (_ == "PAN")
		{
			A.r.disable();
			this.setCursor("default", "");
			A.s.enable();
			l(A.mask)
		}
		else
		{
			A.s.disable();
			A.r.enable();
			A.r.setDrawType(_);
			w(A.mask)
		}
		this.operationOnMap = $;
		L.d(this, "selecttool", _, $)
	};
	r0.setCursor = function (B, _, A, $)
	{
		if (B.indexOf(".") > -1) B = !A ? S.e + "/images/" + B : B;
		B1(this.map.div, B, $);
		this.map.cursorTip.innerHTML = _
	};
	r0.applyZoom = function (D, K, L, M)
	{
		var B, C, _, A, $, I, J, H, G = [],
			E, F = S.l.type != 1 || (S.l.type == 1 && S.l.version == 8);
		B = this.map;
		C = z(Math.log(B.viewSize.width) * Math.LOG2E - 2);
		_ = D - K;
		if (_ > C) _ = C;
		else if (_ < -C) _ = -C;
		A = Math.pow(2, _);
		if (F)
		{
			H = N1(L, "img");
			for (J = 0; J < H.length; J++) if (/\d+(_|,)\d+\.\w{3}$/.test(H[J].src))
			{
				E = H[J].style;
				E.width = o(_0(E1(E.width) * A));
				E.height = o(_0(E1(E.height) * A));
				E.left = o(_0(E1(E.left) * A));
				E.top = o(_0(E1(E.top) * A))
			}
		}
		else L.style.zoom = A;
		$ = B.viewSize.width * B.l.x;
		I = B.viewSize.height * B.l.y;
		q(L, _0((M.x - $) * A + $) - 1);
		d(L, _0((M.y - I) * A + I) - 1)
	};
	r0.animateZoomTo = function (E, C)
	{
		var M = this,
			D = M.map,
			A = D.spec.o,
			B = D.zoomLevel,
			$, _ = D.div,
			J = D.div2,
			K, I = D.isHybrid,
			G = S.l.type != 1 || (S.l.type == 1 && S.l.version == 8),
			F;
		if (E < 0 || E >= A)
		{
			L.d(M, "animatezoomoverflow", A, E);
			return
		}
		if (M.sfS == null)
		{
			L.d(M, "animatezoomstart", A, E);
			M.cRZ = this.oZm = B;
			M.tgZ = E;
			if (!G)
			{
				l(D.q);
				l(D.q2)
			}
			J.innerHTML = "";
			R1(J);
			P1(_);
			if (I) for (K = 0; K < D.v2.length; K++) for (var H = 0; H < D.v2[K].length; H++) P1(D.v2[K][H]);
			for (K = 0; K < D.v3.length; K++) for (H = 0; H < D.v3[K].length; H++) P1(D.v3[K][H]);
			l(D.oL);
			l(D.oL2);
			q(J, _.offsetLeft);
			d(J, _.offsetTop);
			if (I) J.style.zoom = 1;
			F = _.innerHTML.match(/<img\s+[^>]*\"MAPTILEIMAGE\"[^>]*>/gi);
			J.innerHTML = !F ? "" : F.join("");
			if (!I) D.zoomTo(E, 1);
			M.sfS = {
				"x": _.offsetLeft,
				"y": _.offsetTop
			};
			M.sfS2 = {
				"x": J.offsetLeft,
				"y": J.offsetTop
			}
		}
		else if (C == null) return;
		M.cRZ += 0.5 * (M.tgZ - M.cRZ);
		if (G) M.applyZoom(M.tgZ, M.oZm, J, M.sfS2);
		if (G || t(M.tgZ - M.cRZ) < 0.05)
		{
			if (I) D.zoomTo(E, 1);
			w(D.q);
			w(D.q2);
			w(D.oL);
			w(D.oL2);
			window.setTimeout(R1, 200, _);
			if (!I)
			{
				q(_, _0(this.sfS.x));
				d(_, _0(this.sfS.y));
				_.style.zoom = 1
			}
			M.sfS = null;
			L.d(M, "animatezoomend", M.oZm, E);
			d1.b("appid=" + M.getAppId(), "oprt=_animateZoomTo", "param=" + B + "," + E, "type=map")
		}
		else
		{
			if (!I)
			{
				if (t(M.tgZ - M.cRZ) > 0.2) M.applyZoom(M.cRZ, M.oZm, J, M.sfS2);
				R1(_);
				M.applyZoom(M.cRZ, M.tgZ, _, M.sfS)
			}
			else M.applyZoom(M.cRZ, M.oZm, J, M.sfS);
			M.setTimeout(M.animateZoomTo, 50, E, M.sfS)
		}
	};
	r0.smoothZoomEffect = function (C)
	{
		var A = this.map,
			B, _ = 2,
			$, E, F, D;
		if (arguments[1] != null) B = arguments[1];
		else B = (C == "OUT" || C == 1) ? 1 : 20;
		if (B > 0 && B < 21)
		{
			$ = A.viewSize.width / (1 + ((_ - 1) / 20 * B));
			E = A.viewSize.height / (1 + ((_ - 1) / 20 * B));
			F = A.viewSize.width / 2 * (1 - 1 / (1 + ((_ - 1) / 20 * B)));
			D = A.viewSize.height / 2 * (1 - 1 / (1 + ((_ - 1) / 20 * B)));
			$ = E1($);
			E = E1(E);
			F = E1(F);
			D = E1(D);
			if (this.zoomGraphics == null) this.zoomGraphics = new $0(this.a);
			this.zoomGraphics.drawRect(F, D, $, E);
			(C == "OUT" || C == 1) ? B++ : B--;
			this.setTimeout(this.smoothZoomEffect, 30, C, B)
		}
		else if (this.zoomGraphics != null)
		{
			this.zoomGraphics.clear();
			this.zoomGraphics = null
		}
	};
	r0.adjustMapFitFeature = function (F, H)
	{
		if (!F || !F.bounds) return;
		var B = (F.bounds.maxX + F.bounds.minX) >> 1,
			C = (F.bounds.maxY + F.bounds.minY) >> 1,
			_ = new G0(B, C);
		if (F.type == "S" && this.map.t())
		{
			this.map.ao(_);
			var G = this.map.activeSymbol;
			if (G && G.element) G.element.wink(false);
			if (F.element) F.element.wink(true);
			this.map.activeSymbol = F
		}
		else
		{
			var D = t(F.bounds.maxX - F.bounds.minX),
				E = t(F.bounds.maxY - F.bounds.minY),
				$ = this.map.viewSize.width - 80,
				I = this.map.viewSize.height - 70,
				A = this.map.spec.u(new X0(D, E), $, I);
			if (H && A > H) A = H;
			if (!this.map.t() || A != this.map.zoomLevel) this.map.aq(_, A);
			else this.map.ao(_)
		}
	};
	r0.resetMap = function ()
	{
		this.s(false);
		var $ = this.map;
		if ($) $.resetMap();
		L.d(this, "resetmap")
	};
	r0.addWebElement = function ($)
	{
		if (typeof $ == "object" && this.a != null) W(this.a, element)
	};
	r0.setQueryArea = function ($)
	{
		this.map.setQueryArea($)
	};
	r0.setServerScriptType = function ($)
	{
		this.k.a = $
	};
	r0.setSubmitMethod = function ($)
	{
		this.j = $
	};
	r0.timeOut = function ($)
	{
		this.timeout = $
	};
	r0.setTextFields = function ($)
	{
		this.manageInputs($)
	};
	r0.setEngineURL = function ($)
	{
		if ($ != null) this.k.f = $
	};
	r0.setSpInfo = function ($)
	{
		if ($ != null) this.p = $
	};
	r0.setAppId = function ($)
	{
		if ($ != null)
		{
			this.appId = $;
			if (this.map) this.map.appId = $
		}
	};
	r0.setUserInfo = function ($)
	{
		if ($ != null) this.q = $
	};
	r0.setMapImageRoot = function ($)
	{
		if ($ != null) this.n = $.replace(/(.*)\/$/g, "$1") + "/"
	};
	r0.setVmpDataRoot = function ($)
	{
		if ($ != null) this.o = $.replace(/(.*)\/$/g, "$1") + "/"
	};
	r0.setMapImageType = function ($)
	{
		if ($ != null) this.mapImageType = $
	};
	r0.setStyleLibraryRoot = function ($)
	{
		if ($ != null) k1.baseURL = $.replace(/(.*)\/$/g, "$1") + "/"
	};
	r0.setIsLoadVmp = function ($)
	{
		this.l = ($ || $ == "true")
	};
	r0.setIsLoadAd = function ($)
	{
		this.m = ($ || $ == "true")
	};
	r0.setSds = function ($)
	{
		this.sds = $
	};
	r0.getLastMaptool = function ()
	{
		return this.lastMaptool
	};
	r0.getSds = function ()
	{
		return this.map.spec.sds
	};
	r0.getSDSID = function ()
	{
		return this.getSds().id
	};
	r0.getUserInfo = function ()
	{
		return this.q
	};
	r0.getAppId = function ()
	{
		return this.appId
	};
	r0.getSpInfo = function ()
	{
		return this.p
	};
	r0.getMapImageRoot = function ()
	{
		return this.getRmpRootURL()
	};
	r0.getRmpRootURL = function ()
	{
		return this.n.replace(/(.*)\/$/g, "$1") + "/"
	};
	r0.getVmpDataRoot = function ()
	{
		return this.o
	};
	r0.getMapImageType = function ()
	{
		return this.mapImageType
	};
	r0.getCenterX = function ()
	{
		return (this.getBounds().minX + this.getBounds().maxX) / 2
	};
	r0.getCenterY = function ()
	{
		return (this.getBounds().minY + this.getBounds().maxY) / 2
	};
	r0.getBounds = function ()
	{
		return this.map.ac()
	};
	r0.getMapWidth = function ()
	{
		return this.map.viewSize.width
	};
	r0.getMapHeight = function ()
	{
		return this.map.viewSize.height
	};
	r0.getMapLeft = function ()
	{
		return I1(this.a).x
	};
	r0.getMapTop = function ()
	{
		return I1(this.a).y
	};
	r0.getMouseX = function ()
	{
		var $;
		if (typeof window.pageXOffset != "undefined") $ = window.pageXOffset;
		else if (typeof document.compatMode != "undefined" && document.compatMode != "BackCompat") $ = document.documentElement.scrollLeft;
		else if (typeof document.body != "undefined") $ = document.body.scrollLeft;
		return (event.clientX + $) - this.getMapLeft()
	};
	r0.getMouseY = function ()
	{
		var $;
		if (typeof window.pageYOffset != "undefined") $ = window.pageYOffset;
		else if (typeof document.compatMode != "undefined" && document.compatMode != "BackCompat") $ = document.documentElement.scrollTop;
		else if (typeof document.body != "undefined") $ = document.body.scrollTop;
		return (event.clientY + $) - this.getMapTop()
	};
	r0.getEngineURL = function ()
	{
		return this.k.f
	};
	r0.getMapProcess = function ()
	{
		return this.k
	};
	r0.getFeatureById = function (_)
	{
		if (this.map.features && this.map.features.length)
		{
			var $ = this.map.features;
			for (var A = 0; A < $.length; A++) if ($[A].id == _) return $[A]
		}
		return null
	};
	r0.getFeatures = function ()
	{
		return this.map.features
	};
	r0.getStyleLibraryRoot = function ()
	{
		return k1.baseURL
	};
	r0.getLevelIndex = function ()
	{
		return this.map.zoomLevel
	};
	r0.getMapAreaContainer = function ()
	{
		return this.a
	};
	r0.getMaskLayer = function ()
	{
		return this.map.panel
	};
	r0.getMapAreaLayer = function ()
	{
		return this.a
	};
	r0.getServerScriptType = function ()
	{
		return this.k.a
	};
	r0.getHbState = function ()
	{
		var $ = this.map;
		if ($) return [!$.isHybrid ? 0 : 1, !$.isHbLbl ? 0 : 1]
	};
	r0.winsc2mc = function (D, B)
	{
		var A = this,
			E = A.map,
			C, $, _;
		D = !D ? 0 : D;
		B = !B ? 0 : B;
		if (E)
		{
			C = E.ab();
			$ = C.minX + D;
			_ = C.minY + B;
			C = E.spec.r($, _, E.zoomLevel);
			return C
		}
	};
	Y("MapClient", H);

	function F()
	{}
	Y("MapOperation", F);

	function E()
	{
		this.id = "MapProcess0712";
		if (C1(this.id)) this.id = S.i();
		this.a = "jsp";
		this.b = null;
		this.c = "";
		this.d = "";
		this.e = new $();
		this.f = "";
		this.g = []
	}
	var i1 = E.prototype = new n();
	i1.submit = function (D, B, J, H, I)
	{
		try
		{
			this.b = D;
			var $ = "",
				G = this.a,
				C = this.e.toString();
			J = (!J ? this.f : J);
			this.c = J + (J.indexOf("?") > -1 ? "&" : "?") + this.b.getMapRequestString() + (C != "" ? "&" + C : "");
			if (!H) this.c += "&rnd=" + S.i();
			else
			{
				this.c = this.c.replace(/\?/, "+");
				this.c += ".htm";
				this.c = this.c.replace(/\s/gi, "%20").replace(/[%]/gi, "%25")
			}
			if (B == "auto" || B == null) if (this.c.length > 1200) B = "post";
			else B = "get";
			switch (B)
			{
			case "post":
				$ = "syspage/p." + G + "?id=" + this.id + "&r=" + S.i();
				break;
			default:
			case "get":
				$ = "syspage/p.htm" + (this.id != "MapProcess0712" ? "?id=" + this.id : "");
				break
			}
			var _ = this.c,
				A = this.id,
				F = C1(A);
			if (!F) F = R0(A);
			F.requestUrl = _;
			F.callback = this.eventHandler("callback");
			var E = new a0(F.id);
			E.continueWith($, function ()
			{});
			d1.a(this.c, "sending request by " + B + " method")
		}
		catch (A)
		{
			A = "submit()::" + A.description;
			d1.a(A, "exception")
		}
	};
	i1.callback = function (D)
	{
		try
		{
			d1.a(D, "engine response");
			var B, C, $;
			this.d = D;
			$ = new A();
			$.setResult(D);
			C = $.getMapResults();
			var _ = this.e;
			for (var E = 0; E < _.a.length; E++)
			{
				B = _.b[_.a[E]];
				if (typeof (B) == "string" && C[_.a[E]] != null) _.b[_.a[E]] = C[_.a[E]]
			}
			L.d(this, "callback", $)
		}
		catch (_)
		{}
	};
	i1.getLastestRequestString = function ()
	{
		return this.c
	};
	i1.getLastestJsReturn = function ()
	{
		return this.d
	};
	i1.getMapRequest = function ()
	{
		return this.b
	};
	i1.getMapState = function ()
	{
		return this.e
	};
	Y("MapProcess", E);

	function B(_, $)
	{
		var B = _,
			A = $;
		this.setMapServiceName = function ($)
		{
			B = $
		};
		this.setVariant = function ($)
		{
			A = $
		};
		this.getMapServiceName = function ()
		{
			return B
		};
		this.getVariant = function ()
		{
			return A
		};
		this.getMapRequestString = function ()
		{
			try
			{
				var _ = "hidden_MapTool=" + B + "&hidden_Variant=" + A.getVariantString();
				return _
			}
			catch ($)
			{}
		}
	}
	Y("MapRequest", B);

	function A()
	{
		var $;
		this.setResult = function (_)
		{
			$ = O0(_, "!!", "==")
		};
		this.getResult = function (_)
		{
			if ($[_] != null) return $[_];
			else return ""
		};
		this.getMapResults = function ()
		{
			return $
		}
	}
	Y("MapResultFactory", A);

	function _(F)
	{
		var E = [],
			A, B, $, _;
		this.a = "GIF";
		this.b = "JS";
		this.c = this.mpLevels = [];
		this.d = [];
		if (F != null)
		{
			this.sds = F;
			E = this.sds.getMplevels();
			A = this.sds.rmp.mp;
			B = new X0(E1(E[0].cellwidth), E1(E[0].cellheight));
			$ = this.sds.rmp.filter;
			if ($) _ = new u0(parseFloat($.minx), parseFloat($.miny), parseFloat($.maxx), parseFloat($.maxy))
		}
		this.f = B || new X0(400, 300);
		this.g = "#ffffff";
		this.h = S.e + "/images/mapbg50.gif";
		this.i = S.e + "/images/nohybird.gif";
		this.j = S.e + "/images/mapbj.gif";
		this.k = _ || new u0(parseFloat(A.minx), parseFloat(A.miny), parseFloat(A.maxx), parseFloat(A.maxy));
		this.l = new G0(0, 0);
		var _, G, H;
		for (H = 0; H < E.length; H++)
		{
			_ = new Object();
			_.id = E[H].id;
			_.m = new G0(parseFloat(E[H].deltax) / E1(E[H].cellwidth), parseFloat(E[H].deltay) / E1(E[H].cellheight));
			this.d.push(_);
			if ($ && $.mplevelids.indexOf(E[H].id) < 0) continue;
			this.c.push(_)
		}
		this.d.sort(function (_, $)
		{
			return $.m.x - _.m.x
		});
		this.c.sort(function (_, $)
		{
			return $.m.x - _.m.x
		});
		this.n = new Array();
		var D, C;
		for (H = 0; H < this.c.length; H++)
		{
			D = this.s(this.k.minY, this.k.minX, H);
			C = this.s(this.k.maxY, this.k.maxX, H);
			this.n.push(new u0(D.x, C.y, C.x, D.y))
		}
		this.o = this.numZoomLevels = this.c.length
	}
	var h1 = _.prototype;
	h1.p = function (E, C, D)
	{
		var A, B, $, _;
		A = this.q(this.k.minY, this.k.minX, C);
		B = this.q(this.k.maxY, this.k.maxX, C);
		$ = D.width;
		_ = D.height;
		$ = $ >> 1;
		_ = _ >> 1;
		var F = new G0(E.x, E.y);
		if (F.x < A.x - $) F.x = B.x + $;
		if (F.x > B.x + $) F.x = A.x - $;
		if (F.y < B.y - _) F.y = A.y + _;
		if (F.y > A.y + _) F.y = B.y - _;
		return F
	};
	h1.q = function (F, D, E, A)
	{
		var C = this,
			B, $, _ = C.cvtlm,
			G = new Point(D, F);
		if (C.c.length <= 0) return;
		if (!A) A = new G0(0, 0);
		if (F > -360 && F < 360 && D > -360 && D < 360)
		{
			if (!_) C.cvtlm = _ = new ConvertorLLndMC();
			G = _.convertLL2MC(G)
		}
		B = G.x - C.l.x;
		$ = C.l.y - G.y;
		A.x = z(B / C.c[E].m.x);
		A.y = z($ / C.c[E].m.y);
		return A
	};
	h1.r = function (B, _, A, $)
	{
		if (this.c.length <= 0) return;
		if (!$) $ = new G0(0, 0);
		$.x = B * this.c[A].m.x + this.l.x;
		$.y = this.l.y - _ * this.c[A].m.y;
		return $
	};
	h1.s = function (C, A, B, $)
	{
		var _ = this.q(C, A, B, $);
		_.x = z(_.x / this.f.width);
		_.y = z(_.y / this.f.height);
		return _
	};
	h1.t = function (C, A, B, D)
	{
		var E, _ = this,
			$;
		E = _.n;
		if (C < E[B].minX || C > E[B].maxX || A < E[B].minY || A > E[B].maxY) return this.h;
		A = -A;
		A--;
		$ = _.y(C, A, B);
		return D($, C, A, B)
	};
	h1.u = function (B, _, A)
	{
		if (this.c.length <= 0) return;
		_ += 4;
		A += 4;
		for (var $ = this.c.length - 1; $ >= 0; $--) if (z(B.width / this.c[$].m.x) <= _ && z(B.height / this.c[$].m.y) <= A) return $;
		return 0
	};
	h1.getMeterPerPixel = function ($)
	{
		if (this.c.length <= 0) return;
		return this.c[$].m
	};
	h1.v = function ()
	{
		return (!this.sds ? "" : this.sds.caption)
	};
	h1.w = function (E, C, D)
	{
		if (this.c.length <= 0) return;
		var A, B, $, _;
		A = new G0();
		_ = this.c;
		B = _[C].m.x / _[E].m.x;
		$ = _[C].m.y / _[E].m.y;
		A.x = _0(D.x * B);
		A.y = _0(D.y * $);
		return A
	};
	h1.x = function (A)
	{
		var $, _;
		A = E1(A);
		$ = this.d[A];
		_ = this.c;
		if ($) for (var B = 0; B < _.length; B++) if (_[B].id == $.id) return B;
		return 0
	};
	h1.y = function (C, A, B)
	{
		var _ = this,
			E = _.sds,
			$ = [],
			F, D;
		$.push(E.areaid);
		$.push(E.rmp.id);
		$.push(_.c[B].id);
		if (C >= 0) F = z(C / 200);
		else F = "M" + (t(z(C / 200)));
		if (A >= 0) D = z(A / 200);
		else D = "M" + (t(z(A / 200)));
		$.push(F);
		$.push(D);
		$.push((C >= 0 ? C : "M" + t(C)) + "_" + (A >= 0 ? A : "M" + t(A)));
		return $
	};
	Y("MapSpec", _);
	Z(_, "getLatLng", h1.r);
	Z(_, "getTileURL", h1.t);
	Z(_, "getLowestZoomLevel", h1.u);
	Z(_, "getRealLevelIndex", h1.x);
	Z(_, "getId", h1.y);
	Z(_, "getBitmapCoordinate", h1.q);

	function $()
	{
		this.a = new Array();
		this.a.push("hidden_UserID");
		this.a.push("hidden_APPID");
		this.a.push("hidden_DISABLEQDS");
		this.b = new Array();
		for (var $ = 0; $ < this.a.length; $++) this.b[this.a[$]] = "";
		this.b["hidden_DISABLEQDS"] = "true";
		this.toString = function ()
		{
			var B = this.a,
				_, A = [],
				$ = "";
			for (var C = 0; C < B.length; C++)
			{
				_ = this.b[B[C]];
				if (typeof (_) == "string" && _ != "") A.push(B[C] + "=" + _)
			}
			if (A.length > 0) $ = A.join("&");
			return $
		}
	}
	Y("MapState", $);

	function D(A, _)
	{
		var _, $ = this;
		$.icons = A;
		$.layers = [];
		$.allyrs = [];
		$.container = _;
		$.create(A[0], 3)
	}
	var n0 = D.prototype = new n();
	n0.a = function (C, _)
	{
		var $ = this,
			G = C.width,
			E = C.height,
			F = C.src,
			D = C.pointcoord,
			B, A = C.clip;
		if (A)
		{
			A = A.split(",");
			G = E1(A[2]);
			E = E1(A[3])
		}
		else
		{
			G = E1(G);
			E = E1(E)
		}
		_.width = G;
		_.height = E;
		if (_.isImg)
		{
			j(_, G);
			k(_, E)
		}
		if (D)
		{
			D = D.split(",");
			B = {
				x: E1(D[0]),
				y: E1(D[1])
			}
		}
		B = !B ? {
			x: G >> 1,
			y: E >> 1
		} : B;
		_.pointCoord = B
	};
	n0.b = function (B, _)
	{
		var $ = this;
		$.pointer = {
			"x": B,
			"y": _
		};

		function A(A)
		{
			var $ = A.pointCoord;
			q(A, B - $.x);
			d(A, _ - $.y)
		}
		$.f($.layers, A);
		A($.mask)
	};
	n0.c = function ($)
	{
		return ($.indexOf("/") > -1 ? "" : S.m) + $
	};
	n0.d = function (D, C, _, A, $)
	{
		var I = this,
			B = D.clip,
			H = D.width,
			F = D.height,
			G = D.src,
			E = D.pointcoord,
			J;
		if (!H || !F || !G) return;
		H = E1(H);
		F = E1(F);
		if (B && !$)
		{
			B = B.split(",");
			h = c1.clipImg(I.c(G), B[2], B[3], B[0], B[1], H, F, C, _, A, $)
		}
		else h = c1.create(I.c(G), H, F, !C ? 0 : C, !_ ? 0 : _, A, 0, "noprint", $);
		I.a(D, h);
		return h
	};
	n0.create = function (E, U)
	{
		var O = this,
			C, D, A = O.container,
			B, $ = [],
			_, L, M, J, K, H, G, R, I, Q, N;
		C = O.d(E, 0, 0, U);
		if (!C) return;
		C.zIdx = U;
		$.push(C);
		L = C.pointCoord;
		K = C.width;
		H = C.height;
		if (!O.width)
		{
			O.g(L, K, H);
			O.args = []
		}
		O.args.push(
		{
			p: L,
			w: K,
			h: H
		});
		_ = k1.getIconClass(E.iconclass);
		if (_)
		{
			I = _.mask;
			if (I && !O.mask)
			{
				B = O.d(I, 0, 0, 3000, 1);
				R = I.map;
				G = I.shadowoffset;
				if (G)
				{
					G = G.split(",");
					O.shadowOffset = {
						x: E1(G[0]),
						y: E1(G[1])
					}
				}
				if (R && S.l.type != 1 && !S.l.isGecko())
				{
					var P = "map" + S.i(),
						F;
					F = T("area");
					O.map = Q = T("map");
					A0(Q, "name", P);
					A0(F, "shape", "poly");
					A0(F, "alt", "");
					A0(F, "coords", R);
					A0(F, "href", "javascript:void(0)");
					W(Q, F);
					A0(B, "usemap", "#" + P);
					W(B, Q)
				}
			}
			I = _.shadow;
			if (I)
			{
				N = O.d(I, 0, 0, 1);
				N.zIdx = 1;
				$.push(N)
			}
		}
		if (!O.mask)
		{
			if (!B)
			{
				B = W0.a(S.e + "/images/pixel.gif", K, H, 0, 0, 3000);
				B.pointCoord = L;
				B.isImg = 1
			}
			O.mask = B;
			W(A, B);
			Q = !Q ? B : Q;
			O.mouseTarget = Q;
			B1(Q, "pointer");
			Q.onmouseover = function ()
			{
				O.focus()
			};
			Q.onmouseout = function ()
			{
				O.blur()
			};
			O.allyrs.push(B)
		}
		for (M = 0; M < $.length; M++)
		{
			D = $[M];
			if (D) W(A, D)
		}
		O.layers.push($);
		O.allyrs = O.allyrs.concat($)
	};
	n0.e = function ()
	{
		var $ = this;
		$.f($.layers, function (_)
		{
			J1($.container, _)
		});
		J1($.container, $.mask)
	};
	n0.f = function (D, C)
	{
		var B = this,
			_, A = !D ? B.layers : D,
			$, F, E;
		for (F = 0; F < A.length; F++)
		{
			$ = A[F];
			for (E = 0; E < $.length; E++)
			{
				_ = $[E];
				if (_ && C) C(_)
			}
		}
	};
	n0.g = function (B, _, A)
	{
		var $ = this;
		$.pointCoord = B;
		$.width = _;
		$.height = A
	};
	n0.appendTo = function (A)
	{
		var $ = this,
			B, _ = $.allyrs;
		A = !A ? $.container : A;
		for (B = 0; B < _.length; B++) W(A, _[B])
	};
	n0.hide = function ()
	{
		var $ = this;
		$.f($.layers, l);
		l($.mask)
	};
	n0.show = function ()
	{
		var $ = this;
		$.f([$.layers[0]], w);
		w($.mask)
	};
	n0.isVisible = function ()
	{
		return this.mask.style.display != "none"
	};
	n0.focus = function ()
	{
		var C = this,
			D = C.layers,
			E = C.icons,
			A = C.pointer,
			B, $, _, G = C.mask,
			F;
		C.f([D[0]], l);
		if (!D[1]) C.create(E[1], 1000);
		else C.f([D[1]], w);
		F = C.args[1];
		C.g(F.p, F.w, F.h);
		C.a(E[1], G);
		C.b(A.x, A.y);
		if (C.label) S1(C.label, 3000);
		C.isFocus = true
	};
	n0.blur = function ()
	{
		var C = this,
			D = C.layers,
			E = C.icons,
			A = C.pointer,
			B, $, _, G = C.mask,
			F = C.args[0];
		C.f([D[0]], w);
		if (D[1]) C.f([D[1]], l);
		C.g(F.p, F.w, F.h);
		C.a(E[0], G);
		C.b(A.x, A.y);
		if (C.label) S1(C.label, 0);
		C.isFocus = false
	};
	n0.wink = function (A, _)
	{
		var $ = this;
		if (!$.wink) return;
		if (!A || !_)
		{
			window.clearTimeout($.timer);
			$.blur()
		}
		if (A)
		{
			if ($.isFocus) $.blur();
			else $.focus();
			$.timer = $.setTimeout($.wink, 500, A, true)
		}
	};
	n0.setZIndex = function (A)
	{
		var $ = this,
			_ = $.layers;
		$.f([_[0]], function ($)
		{
			S1($, $.zIdx + A)
		});
		S1($.mask, 3000 + A)
	};
	Y("MarkerElement", D);
	Z(D, "setPosition", n0.b);

	function n()
	{}
	n.prototype.getClassName = function ()
	{
		var $ = this.constructor.toString();
		return $.substring($.indexOf("function ") + 9, $.indexOf("("))
	};
	n.prototype.setTimeout = function (B, _)
	{
		var A = this,
			$;
		if (typeof B == "function" && arguments.length > 2)
		{
			$ = Array.prototype.slice.call(arguments, 2);
			return window.setTimeout(function ()
			{
				B.apply(A, $)
			}, _)
		}
		return window.setTimeout(function ()
		{
			B.apply(A)
		}, _)
	};
	n.prototype.eventHandler = function (_)
	{
		var $ = this;
		return function ()
		{
			var B;
			if (arguments.length == 0)
			{
				B = window.event;
				if (B && !B.target) B.target = B.srcElement;
				B = [B]
			}
			else B = arguments;
			try
			{
				return $[_].apply($, B)
			}
			catch (A)
			{
				d1.a("eventHandler: " + A.description + "\n" + h0($) + " " + _)
			}
		}
	};
	Y("G2MObject", n);

	function H0(_)
	{
		this.size = 0;
		if (_) for (var $ = _.length - 1; $ >= 0; $--) this.add(_[$])
	}
	var n1 = H0.prototype;
	n1.add = function ($)
	{
		if (!this.contains($))
		{
			this[":" + $] = 1;
			this.size++
		}
	};
	n1.remove = function ($)
	{
		if (this.contains($))
		{
			delete this[":" + $];
			this.size--
		}
	};
	n1.contains = function ($)
	{
		return this[":" + $] == 1
	};
	Y("PanKeys", H0);

	function J0($)
	{
		this.ticks = $;
		this.tick = 0
	}
	var i0 = J0.prototype;
	i0.reset = function ()
	{
		this.tick = 0
	};
	i0.next = function ()
	{
		this.tick++;
		var $ = Math.PI * (this.tick / this.ticks - 0.5);
		return (w0($) + 1) / 2
	};
	i0.more = function ()
	{
		return this.tick < this.ticks
	};
	Y("PanSiner", J0);

	function I0(B, _, A)
	{
		var $ = this;
		$.eh = $.eventHandler;
		$.a = B ? B : window;
		$.panel = _;
		$.panel2 = A;
		$.c = false;
		$.d = new G0(0, 0);
		$.e = false;
		$.f = null;
		$.g = null;
		$.h = new G0(0, 0);
		$.i = new Array();
		$.j = new Array();
		$.k = $.eh("onMD");
		$.l = $.eh("onMV");
		$.m = $.eh("onMU");
		$.n = $.eh("onClick");
		$.o = $.eh("onDblClick");
		if (S.l.type != 1) L.f(window, "mouseout", $.eh("onWindowMouseOut"))
	}
	var s0 = I0.prototype = new n();
	s0.setDrawType = function (_)
	{
		var $;
		switch (_)
		{
		case "DRAWPOINT":
			$ = "CLICK";
			break;
		case "DRAWLINE":
			$ = "MOUSEUP";
			break;
		case "DRAWPOLYLINE":
			$ = "DBLCLICK";
			break;
		case "DRAWOVAL":
			$ = "MOUSEUP";
			break;
		case "DRAWRECT":
			$ = "MOUSEUP";
			break;
		case "DRAWPOLYGON":
			$ = "DBLCLICK";
			break;
		case "FILLOVAL":
			$ = "MOUSEUP";
			break;
		case "FILLPOLYGON":
			$ = "DBLCLICK";
			break;
		default:
			_ = null;
			$ = null;
			break
		}
		this.removeEvents();
		this.addEvents();
		this.j = new Array();
		this.f = _;
		this.g = $
	};
	s0.onMD = function (A)
	{
		L.d(this, "mousedown", A);
		if (A.cancelDrag) return;
		var $ = A.button == 0 || A.button == 1;
		if (this.c || !$) return false;
		var _ = u1(A, this.a);
		this.d.x = _.x;
		this.d.y = _.y;
		if (this.g == "MOUSEUP")
		{
			this.e = true;
			if (!this.j[0]) this.j[0] = new G0(_.x, _.y);
			L.f(this.a, "mousemove", this.l);
			L.f(this.a, "mouseup", this.m);
			L.f(document.body, "mouseup", this.m)
		}
		this.clickStartTime = (new Date()).getTime();
		this.h.x = A.clientX;
		this.h.y = A.clientY;
		L.d(this, "drawstart");
		this.originalCursor = this.a.style.cursor;
		D1(A)
	};
	s0.onMV = function (_)
	{
		var $ = u1(_, this.a);
		if (!$) return;
		if (S.l.os == 1)
		{
			if (_ == null) return;
			if (this.drawDisabled)
			{
				this.savedMove = new Object();
				this.savedMove.clientX = $.x;
				this.savedMove.clientY = $.y;
				return
			}
			this.setTimeout(function ()
			{
				this.drawDisabled = false;
				this.onMV(this.savedMove)
			}, 30);
			this.drawDisabled = true;
			this.savedMove = null
		}
		this.draw($.x, $.y);
		L.d(this, "drawing", $.x, $.y)
	};
	s0.draw = function (E, C)
	{
		try
		{
			var D = [],
				A = [],
				B = this.j,
				H;
			if (!this.j || this.j.length == 0) return;
			for (H = 0; H < B.length; H++)
			{
				D.push(B[H].x);
				A.push(B[H].y)
			}
			var $ = [],
				_ = [];
			$ = $.concat(D);
			_ = _.concat(A);
			if (!this.i[0]) this.i[0] = new $0(this.panel2 && this.f == "DRAWRECT" ? this.panel2 : this.panel);
			switch (this.f)
			{
			case "DRAWLINE":
				this.i[0].drawLine(D[0], A[0], E, C);
				break;
			case "DRAWPOLYLINE":
				var G = B.length - 1;
				if (!this.i[G]) this.i[G] = new $0(this.panel);
				this.i[G].drawLine(D[G], A[G], E, C);
				break;
			case "DRAWRECT":
				var F, J, I, G;
				if (E <= D[0] && C <= A[0])
				{
					F = E;
					J = C;
					I = D[0] - E;
					G = A[0] - C
				}
				else if (E > D[0] && C <= A[0])
				{
					F = D[0];
					J = C;
					I = E - D[0];
					G = A[0] - C
				}
				else if (E <= D[0] && C > A[0])
				{
					F = E;
					J = A[0];
					I = D[0] - E;
					G = C - A[0]
				}
				else if (E > D[0] && C > A[0])
				{
					F = D[0];
					J = A[0];
					I = E - D[0];
					G = C - A[0]
				}
				this.i[0].drawRect(F, J, I, G);
				break;
			case "DRAWPOLYGON":
				$.push(E);
				_.push(C);
				this.i[0].drawPolygon($, _, B.length + 1);
				break;
			case "FILLOVAL":
				var N = t(E - D[0]),
					M = t(C - A[0]),
					K = E1(Math.sqrt(N * N + M * M));
				this.i[0].fillOval(D[0] - K, A[0] - K, 2 * K, 2 * K);
				break;
			case "FILLPOLYGON":
				$.push(E);
				_.push(C);
				this.i[0].fillPolygon($, _, B.length + 1);
				break
			}
			L.d(this, "draw", E, C)
		}
		catch (O)
		{}
	};
	s0.reDraw = function ($)
	{
		if (this.f == "DRAWPOLYLINE")
		{
			if (!$) $ = this.j;
			this.j = $;
			for (var _ = 0; _ < this.i.length; _++) this.i[_].clear();
			this.i = [];
			for (_ = 0; _ < $.length - 1; _++)
			{
				this.i[_] = new $0(this.panel);
				this.i[_].drawLine($[_].x, $[_].y, $[_ + 1].x, $[_ + 1].y)
			}
		}
	};
	s0.onMU = function (A)
	{
		L.g(this.a, "mouseup", this.m);
		L.g(document.body, "mouseup", this.m);
		L.d(this, "mouseup");
		var $ = (new Date()).getTime(),
			_ = u1(A, this.a);
		if (this.g == "MOUSEUP")
		{
			this.j[1] = new G0(_.x, _.y);
			this.drawEnd()
		}
		D1(A)
	};
	s0.onClick = function (A)
	{
		var $ = A.button == 0 || A.button == 1;
		if (this.c || !$) return false;
		L.d(this, "click", A);
		var _ = u1(A, this.a);
		if (this.g == "CLICK")
		{
			this.j[0] = new G0(_.x, _.y);
			this.drawEnd()
		}
		if (this.g == "DBLCLICK")
		{
			if (this.j.length == 0) L.f(this.a, "mousemove", this.l);
			this.j.push(new G0(_.x, _.y));
			L.d(this, "addnode", this.f, this.j)
		}
		D1(A)
	};
	s0.onDblClick = function (_)
	{
		var $ = _.button == 0 || _.button == 1;
		if (this.c || !$) return false;
		D1(_);
		if (this.g == "DBLCLICK") this.drawEnd();
		L.d(this, "dblclick", _)
	};
	s0.onWindowMouseOut = function ($)
	{
		if (!$.relatedTarget && this.e) this.onMU($)
	};
	s0.drawEnd = function ()
	{
		this.e = false;
		L.d(this, "drawend", this.f, this.j)
	};
	s0.reset = function ()
	{
		this.j = new Array();
		for (var $ = 0; $ < this.i.length; $++) this.i[$].clear();
		this.i = new Array()
	};
	s0.disable = function ()
	{
		this.c = true
	};
	s0.enable = function ()
	{
		this.c = false
	};
	s0.addEvents = function ()
	{
		L.f(this.a, "mousedown", this.k);
		L.f(this.a, "mouseup", this.n);
		L.f(this.a, "dblclick", this.o)
	};
	s0.removeEvents = function ()
	{
		L.g(this.a, "mousedown", this.k);
		L.g(this.a, "mousemove", this.l);
		L.g(this.a, "mouseup", this.n);
		L.g(this.a, "dblclick", this.o)
	};
	Y("PlotObject", I0);

	function G0(_, $)
	{
		this.x = _;
		this.y = $
	}
	var e = G0.prototype;
	e.toString = function ()
	{
		return this.x + "," + this.y
	};
	e.equals = function ($)
	{
		if (!$) return false;
		return this.x == $.x && this.y == $.y
	};
	e.distanceFrom = function (A)
	{
		var $ = this.x - A.x,
			_ = this.y - A.y;
		return Math.sqrt($ * $ + _ * _)
	};
	e.approxEquals = function ($)
	{
		if (!$) return false;
		return M0(this.x, $.x) && M0(this.y, $.y)
	};
	Y("Point", G0);

	function X0(_, $)
	{
		this.width = _;
		this.height = $
	}
	var X = X0.prototype;
	X.toString = function ()
	{
		return "(" + this.width + ", " + this.height + ")"
	};
	X.equals = function ($)
	{
		if (!$) return false;
		return this.width == $.width && this.height == $.height
	};
	X.approxEquals = function ($)
	{
		if (!$) return false;
		return M0(this.width, $.width) && M0(this.height, $.height)
	};
	Y("Scope", X0);

	function V0(E, C, D, A, B, $, _, G, I, F)
	{
		var H = this;
		H.id = E;
		H.name = C;
		H.caption = C;
		H.areaId = D;
		H.areaid = D;
		H.defaultLevel = A;
		H.defaultdisplevel = A;
		H.defaultCX = B;
		H.defaultdispcx = B;
		H.defaultCY = $;
		H.defaultdispcy = $;
		H.rmp = _;
		H.vmp = G;
		H.qds = I;
		H.dom = F
	}
	V0.loadFromObj = function ($)
	{
		if ($ == null) return;
		return new V0($.id, $.caption, $.areaid, $.defaultdisplevel, $.defaultdispcx, $.defaultdispcy, $.rmp, $.vmp, $.qds, $)
	};
	Y("Sds", V0);
	var m0 = V0.prototype;
	m0.getCatalogs = function ()
	{
		if (!this.qds) return null;
		var $ = this.qds.catalog;
		$ = ($.length > 0 ? $ : [$]);
		return $
	};
	m0.getLayers = function (B)
	{
		if (!this.qds) return null;
		var _ = [];
		for (var C = 0; C < this.qds.catalog.length; C++)
		{
			var A = this.qds.catalog[C];
			if (B == null || B == A.id || B.toLowerCase() == "all")
			{
				var $ = (A.layer.length > 0 ? A.layer : [A.layer]);
				_ = _.concat($)
			}
		}
		return _
	};
	m0.getCatalogNameById = function (_)
	{
		var $ = this.getCatalogs();
		if (!$) return;
		for (var A = 0; A < $.length; A++) if (_ == $[A].id) return $[A].caption
	};
	m0.getCatalogIdByName = function (_)
	{
		var $ = this.getCatalogs();
		if (!$) return;
		for (var A = 0; A < $.length; A++) if ($[A].caption.indexOf(_) > -1) return $[A].id
	};
	m0.getLayerNameById = function (_)
	{
		var $ = this.getLayers();
		if (!$) return;
		for (var A = 0; A < $.length; A++) if (_ == $[A].id) return $[A].caption
	};
	m0.getLayerIdByName = function (_)
	{
		var $ = this.getLayers();
		if (!$) return;
		for (var A = 0; A < $.length; A++) if ($[A].caption.indexOf(_) > -1) return $[A].id
	};
	m0.getMplevels = function ()
	{
		if (!this.rmp) return null;
		var $ = this.rmp.mp.mplevel;
		$ = ($.length > 0 ? $ : [$]);
		return $
	};

	function k1()
	{}
	k1.baseURL = "";
	k1.cache = [
	{}, {}];
	k1.getStyleById = function (B)
	{
		var _ = k1.cache[0][B];
		if (_) return _;
		else
		{
			var $ = k1.baseURL.replace(/(.*)\/$/g, "$1") + "/";
			_ = S0($ + B + ".xml");
			if (!_ || !_.firstChild) _ = S0($ + "S01.xml");
			_ = N1(_, "style");
			if (_.length > 0)
			{
				var A = l1.loadFromXML(_[0]);
				k1.cache[0][B] = A;
				return A
			}
		}
		d1.a("load style by id(" + B + ") failed.")
	};
	k1.preLoadStyle = function (C, A)
	{
		A = !A ? "xml" : A.toLowerCase();
		var B, _ = k1.baseURL.replace(/(.*)\/$/g, "$1") + "/" + C + "." + A,
			E, F, D = 0;

		function $(A, $, _)
		{
			if ($)
			{
				E = N1($, "style");
				if (E.length && E.length > 0)
				{
					for (F = 0; F < E.length; F++)
					{
						B = B0(E[F], "id");
						k1.cache[0][B] = l1.loadFromXML(E[F])
					}
					D = 1
				}
				E = N1($, "iconclass");
				if (E.length && E.length > 0)
				{
					for (F = 0; F < E.length; F++)
					{
						B = B0(E[F], "id");
						k1.cache[1][B] = T0(E[F])
					}
					D = 1
				}
				if (D) return
			}
			d1.a("preload style(" + C + ") failed.")
		}
		p1(_, $)
	};
	k1.preLoadJson = function (_, $)
	{
		for (var A = 0; A < _.length; A++) k1.cache[!$ ? 0 : 1][_[A].id] = !$ ? l1.loadFromJson(_[A]) : _[A]
	};
	k1.loadStyle = function (B, $)
	{
		var A = k1.cache[0][B];
		if (A) $(A);
		else
		{
			var _ = k1.baseURL.replace(/(.*)\/$/g, "$1") + "/" + B + ".xml",
				D;
			D = p1(_, null, "", 1);
			if (D && D.responseXML)
			{
				D = N1(D.responseXML, "style");
				if (D.length > 0)
				{
					var C = l1.loadFromXML(D[0]);
					k1.cache[0][B] = C;
					$(C);
					return
				}
			}
			d1.a("load style(" + B + ") failed.")
		}
	};
	k1.getIconClass = function ($)
	{
		return k1.cache[1][$]
	};
	Y("StyleLib", k1);

	function l1(B, _, A, $)
	{
		this.id = B;
		this.type = _;
		this.obj = A;
		this.xml = $
	}
	l1.loadFromXML = function (B)
	{
		var A = B0(B, "id"),
			$ = A.substring(0, 1),
			_ = "S";
		switch ($)
		{
		case "S":
		case "L":
		case "R":
			_ = $;
			break
		}
		try
		{
			f = T0(B)
		}
		catch (_)
		{
			d1.a("e=" + _.toString())
		}
		return new l1(A, _, f, B)
	};
	l1.prototype.getObject = function ()
	{
		return this.obj
	};
	l1.loadFromJson = function (B)
	{
		var A = B.id,
			$ = A.substring(0, 1),
			_ = "S";
		switch ($)
		{
		case "S":
		case "L":
		case "R":
			_ = $;
			break
		}
		return new l1(A, _, B)
	};
	Y("StyleNode", l1);

	function j1(_, $)
	{
		this.id = _;
		this.ticketClass = $
	}
	j1.obj = new Object();
	j1.create = function (_)
	{
		if (!_) _ = "_dtc";
		var $ = j1.obj;
		if (!$[_]) $[_] = 1;
		else $[_]++;
		return new j1($[_], _)
	};
	j1.invalidateAll = function ()
	{
		var A = j1.obj;
		for (var _ in A)
		{
			try
			{
				A[_]++
			}
			catch ($)
			{}
		}
	};
	j1.invalidate = function ($)
	{
		j1.obj[$]++
	};
	j1.prototype.isValid = function ()
	{
		return j1.obj[this.ticketClass] == this.id
	};
	Y("Ticket", j1);

	function C()
	{
		var $ = "OPTIONAL",
			_ = this;
		_.aPPID = $;
		_.userInfo = $;
		_.sPInfo = $;
		_.protocolType = $;
		_.wmsxml = $;
		_.setUserInfo = function ($)
		{
			_.userInfo = $
		};
		_.setAPPID = function ($)
		{
			_.aPPID = $
		};
		_.setSPInfo = function ($)
		{
			_.sPInfo = $
		};
		_.setProtocolType = function ($)
		{
			_.protocolType = $
		};
		_.setWmsxml = function ($)
		{
			_.wmsxml = $
		};
		_.getUserInfo = function ()
		{
			return _.userInfo
		};
		_.getSPInfo = function ()
		{
			return _.sPInfo
		};
		_.getAPPID = function ()
		{
			return _.aPPID
		};
		_.getVariantString = function ()
		{
			var E = "",
				D, _ = "";
			try
			{
				var C = this;
				for (var B in C)
				{
					D = C[B];
					if (typeof (D) == "function") continue;
					if (typeof (D) == "number") D = "" + D;
					if (typeof (D) == "string")
					{
						if (D == "MUST_BE_VALIDATED")
						{
							var A = new Error();
							A.description = "p " + B + " is no value.";
							throw (A)
						}
						D = D.replace(/&amp;/g, "&");
						D = D.replace(/&nbsp;/g, " ");
						D = D.replace(/%u/g, "%25u");
						if (D.indexOf("==") > -1)
						{
							A = new Error();
							A.description = "p " + B + "has==.";
							throw (A)
						}
						if (D.indexOf("!!") > -1)
						{
							A = new Error();
							A.description = "p " + B + "has !!.";
							throw (A)
						}
						if (D != "" && D != $)
						{
							_ += E + B.substring(0, 1).toUpperCase() + B.substring(1) + "==" + D;
							E = "!!"
						}
					}
				}
				return _
			}
			catch (A)
			{}
		};
		this.verifyString = function ()
		{}
	}
	Y("WmspVariant", C);

	function C0()
	{}
	C0.create = function ()
	{
		if (typeof ActiveXObject != "undefined")
		{
			try
			{
				return new ActiveXObject("Microsoft.XMLHTTP")
			}
			catch ($)
			{}
		}
		if (typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
		return null
	};
	Y("XmlHttp", C0);

	function D0($)
	{
		this.xmlhttp = $
	}
	D0.prototype.continueWith = function (A, $)
	{
		var _ = this.xmlhttp;
		_.open("GET", A, true);
		_.onreadystatechange = function ()
		{
			if (_.readyState == 4)
			{
				$(_.responseText);
				_.onreadystatechange = M1
			}
		};
		_.send(null)
	};
	Y("XmlHttpSender", D0);

	function E0($)
	{
		this.a = $
	}
	E0.cache_ = new Object();
	E0.create = function ($)
	{
		return new E0($)
	};
	E0.getCached = function ($)
	{
		return E0.cache_[$]
	};
	E0.cache = function (_, $)
	{
		E0.cache_[_] = $
	};
	E0.prototype.transformToHTML = function (C, A)
	{
		if (typeof C.transformNode != "undefined") A.innerHTML = C.transformNode(this.a);
		else if (typeof XSLTProcessor != "undefined" && typeof XSLTProcessor.prototype.importStylesheet != "undefined")
		{
			var B = new XSLTProcessor();
			B.importStylesheet(this.a);
			var $ = B.transformToFragment(C, window.document);
			A.innerHTML = "";
			W(A, $)
		}
		else
		{
			var _ = "";
			A.innerHTML = _
		}
	};
	E0.asynchronousTransform = function (E, C, D, A, B)
	{
		if (S.l.type == 3 && E0.scriptedTransform)
		{
			var $ = function ()
				{
					E0.scriptedTransform(E, C, D);
					if (A) A()
				};
			if (!C1("nxsl"))
			{
				var _ = R0("nxsl");
				_.onload = $;
				_.src = ""
			}
			else window.setTimeout($, 1);
			return
		}
		var G = E0.getCached(D);
		if (G) window.setTimeout(function ()
		{
			G.transformToHTML(E, C);
			if (A) A()
		}, 1);
		else
		{
			var H = j1.create(B),
				F = D2.create(B, true);
			F.continueWith(D, function (B)
			{
				if (H.isValid())
				{
					var _ = B.replace(/\{\{[#\/!].*?\}\}/g, "").replace(/^[^<]*/, ""),
						$ = t1(_),
						F = E0.create($);
					F.transformToHTML(E, C);
					E0.cache(D, F);
					if (A) A()
				}
			})
		}
	};
	Y("XmlStyleSheet", E0);

	function K($)
	{
		var A = "map.EntireMap",
			_ = $;
		this.submit = function (E, D)
		{
			var C = _,
				$ = new M();
			$.setUserInfo(C.getUserInfo());
			$.setAPPID(C.getAppId());
			$.setSPInfo(C.getSpInfo());
			var B = new MapRequest(A, $);
			C.submit(B, this, false, this.engine, E, !D);
			L.d(this, "submit")
		};
		this.mapWindowCallback = function (_, $)
		{};
		this.mapResultCallback = function (_)
		{
			var $ = _.getResult("ErrorMessage");
			if ($ != "") L.d(this, "errormessage", $);
			L.d(this, "mapresultcallback", _)
		}
	}
	function M()
	{
		this.base = C;
		this.base()
	}
	Y("EntireMapOperation", K);
	Y("EntireMapVariant", M);
	var j0 = N1(document, "SCRIPT"),
		L0 = j0[j0.length - 1],
		F0 = B0(L0, "modules"),
		l0 = B0(L0, "sect");
	L0.loadModules = function ()
	{};
	if (F0)
	{
		F0 = S.o + "c/" + F0.replace(/,/g, "!!") + ".htm";

		function U()
		{
			document.write("<scr" + "ipt id=\"script4modules\" type=\"text/javascript\" src=\"" + F0 + "\"></scr" + "ipt>")
		}
		function o0($)
		{
			$ = !$ ? L0 : $;
			$.src = F0
		}
		if (l0 && l0.toLowerCase() == "true") L0.loadModules = o0;
		else U();
		window.onModulesLoaded = function ($)
		{
			if (L0.onModulesLoaded) L0.onModulesLoaded()
		}
	}
	function g1(A)
	{
		var _ = this,
			B, $ = SEvent.addBuiltInListener;
		_.m = A;
		B = _.m.map;
		SEvent.addListener(A.map, "leftdown", _.eventHandler("onLeftDown"));
		$(B.div, "mousemove", _.eventHandler("onMouseMove"));
		$(B.div, "mouseup", _.eventHandler("onMouseUp"))
	}
	g1.prototype = new n();
	g1.prototype.getOfs = function (C, A, B)
	{
		var _ = this,
			$ = A.element.pointCoord;
		return {
			x: $.x - B.x,
			y: $.y - B.y
		}
	};
	g1.prototype.onMouseMove = function (D)
	{
		var B = this,
			G = B.m.map,
			C, A, $ = B.f,
			_ = B.cpt,
			I, H, F, E;
		if (!D) D = event;
		if (B.offset && $ && $.element)
		{
			C = _getRelativeClickPoint(D, G.div);
			if (!_) _ = B.cpt = C;
			l($.element.label);
			if (G.iwFeature == $) G.closeInfoWindow();
			A = B.getOfs(D, $, B.offset);
			$.element.setPosition(C.x + A.x, C.y + A.y);
			if (Math.abs(C.x - _.x) < 80 && Math.abs(C.y - _.y) < 80)
			{
				I = G.getMcXYBySC(D, A.x, A.y);
				H = B.m.getBounds();
				if (H.minX < I.x && I.x < H.maxX && H.minY < I.y && I.y < H.maxY) SEvent.trigger($, "moving", I)
			}
			B.cpt = C
		}
	};
	g1.prototype.onMouseUp = function (E)
	{
		var B = this,
			F = B.m.map,
			C = B.offset,
			D = B.f,
			A, $, _, G;
		B.offset = B.f = null;
		if (!E) E = event;
		if (E && C && D && D.element) if (Math.abs(B.spos.x - E.clientX) > 0 || Math.abs(B.spos.y - E.clientY) > 0)
		{
			A = B.getOfs(E, D, C);
			G = F.getMcXYBySC(E, A.x, A.y);
			D.points[0] = G;
			_ = D.element;
			if (_)
			{
				w(_.label);
				F.setSymbolPosition(_, D);
				F.setLabelPosition(D)
			}
			SEvent.trigger(B, "moveend", D);
			SEvent.trigger(D, "moveend", E, G)
		}
	};
	g1.prototype.onLeftDown = function (E, C)
	{
		var B = this,
			F = B.m.map,
			D, _, A, $;
		if (E && E.type == "S" && E.isMovable && C)
		{
			$ = C.srcElement || C.target;
			B.offset = _getRelativeClickPoint(C, $);
			B.f = E;
			B.spos = {
				x: C.clientX,
				y: C.clientY
			};
			_stopEvent(C)
		}
	};
	Y("DrapPoint", g1);

	function m1()
	{
		var $ = this;
		$.delay = 20000;
		$.c = 0
	}
	var f1 = m1.prototype = new n();

	function R(A, $)
	{
		var _ = N1(A, $);
		return _ && _.length > 0 ? _[0] : null
	}
	f1.send = function (D, B, C, $, A)
	{
		var _ = this,
			I = window,
			G = R(I.document, "head"),
			H, J = B;
		if (!G)
		{
			if (A) A(D, B);
			return
		}
		if (!I["SGS"]) I["SGS"] = {};
		H = !D ? "_" + (new Date).getTime().toString(36) + (_.c++).toString(36) : D;
		var F = T("script"),
			E = null;
		_.cancel(C1(H));
		if (_.delay > 0) E = I.setTimeout(function ()
		{
			_.removeLoader(H, F);
			if (A) A(D, B);
			d1.write("scs timeout:" + B)
		}, _.delay);
		if (C) I["SGS"][H] = function (A)
		{
			d1.write("callback:" + H);
			I.clearTimeout(E);
			_.removeLoader(H, F);
			try
			{
				C(A, H, B)
			}
			catch ($)
			{
				d1.write("scs.send[SGS." + H + "] error:" + $.description)
			}
		};
		if ($) J += "&cb=SGS." + H;
		A0(F, "type", "text/javascript");
		A0(F, "id", H);
		A0(F, "charset", "gbk");
		A0(F, "src", J);
		W(G, F);
		d1.write("sgs:" + J);
		return {
			id: H,
			url: J
		}
	};
	f1.cancel = function (_)
	{
		if (_ && _.id)
		{
			var $ = C1(_.id);
			if ($ && $.tagName == "SCRIPT" && typeof window["SGS"][_.id] == "function")
			{
				_.delay && window.clearTimeout(_.delay);
				this.removeLoader(_.id, $)
			}
		}
	};
	f1.removeLoader = function (_, $)
	{
		window.setTimeout(function ()
		{
			if ($.parentNode) $.parentNode.removeChild($);
			if (window["SGS"][_]) delete window["SGS"][_]
		}, 0)
	};
	Y("Scs", m1);
	var N = [],
		z0 = [],
		P0 = new m1();

	function G(A, $)
	{
		var _ = A.length,
			B;
		for (B = 0; B < _; B++) $(A[B], B)
	}
	function q0(C, _)
	{
		var A = N,
			B = C.split("."),
			$ = z0;
		if (A[C])
		{
			if (_) _(A[C]);
			else A[C]()
		}
		else if (!$[C])
		{
			$[C] = [_];
			P0.send(B.join("_"), S.e + "/js/" + B.join("/") + ".js", function (_)
			{
				if (_)
				{
					A[C] = _();
					G($[C], function ($)
					{
						if ($) $(A[C]);
						else A[C]()
					})
				}
			})
		}
		else $[C].push(_)
	}
	d1.site = "http://cpv.go2map.com/api/";
	//d1.site = "http://61.135.178.50/api/";
	d1.isApp = true;
	r0.init = function ()
	{
		var $, B = this,
			_ = "SDS==<custom>!!hidden_MapTool==map.EntireMap!!hidden_DISABLEQDS==true!!hidden_APPID==1361",
			A = {
				id: 270,
				name: " ",
				caption: " ",
				areaId: 0,
				areaid: 0,
				defaultLevel: 5,
				defaultdisplevel: 5,
				defaultCX: 11950000,
				defaultdispcx: 11950000,
				defaultCY: 4150000,
				defaultdispcy: 4150000,
				rmp: {
					id: 174,
					name: "",
					caption: "",
					mp: {
						mplevel: [
						{
							caption: "",
							cellcountx: 653,
							cellcounty: 566,
							cellheight: 256,
							cellwidth: 256,
							deltax: 64000,
							deltay: 64000,
							id: 719,
							zoompercell: 64000,
							zoomperpixel: 250,
							zoomscreen: 256000
						}, {
							caption: "",
							cellcountx: 2609,
							cellcounty: 2262,
							cellheight: 256,
							cellwidth: 256,
							deltax: 16000,
							deltay: 16000,
							id: 717,
							zoompercell: 16000,
							zoomperpixel: 62.5,
							zoomscreen: 64000
						}, {
							caption: "",
							cellcountx: 10436,
							cellcounty: 9046,
							cellheight: 256,
							cellwidth: 256,
							deltax: 4000.00000000003,
							deltay: 4000,
							id: 715,
							zoompercell: 4000,
							zoomperpixel: 15.6250000000001,
							zoomscreen: 16000
						}, {
							caption: "",
							cellcountx: 41742,
							cellcounty: 36184,
							cellheight: 256,
							cellwidth: 256,
							deltax: 1000.00000000003,
							deltay: 1000,
							id: 713,
							zoompercell: 1000,
							zoomperpixel: 3.90625000000011,
							zoomscreen: 4000
						}, {
							caption: "",
							cellcountx: 166968,
							cellcounty: 144736,
							cellheight: 256,
							cellwidth: 256,
							deltax: 249.999999999971,
							deltay: 250,
							id: 711,
							zoompercell: 250,
							zoomperpixel: 0.976562499999886,
							zoomscreen: 1000
						}, {
							caption: "",
							cellcountx: 2,
							cellcounty: 2,
							cellheight: 256,
							cellwidth: 256,
							deltax: 32768000,
							deltay: 32768000,
							id: 728,
							zoompercell: 32768000,
							zoomperpixel: 128000,
							zoomscreen: 131072000
						}, {
							caption: "",
							cellcountx: 6,
							cellcounty: 5,
							cellheight: 256,
							cellwidth: 256,
							deltax: 8192000,
							deltay: 8192000,
							id: 726,
							zoompercell: 8192000,
							zoomperpixel: 32000,
							zoomscreen: 32768000
						}, {
							caption: "",
							cellcountx: 21,
							cellcounty: 18,
							cellheight: 256,
							cellwidth: 256,
							deltax: 2048000,
							deltay: 2048000,
							id: 724,
							zoompercell: 2048000,
							zoomperpixel: 8000,
							zoomscreen: 8192000
						}, {
							caption: "",
							cellcountx: 82,
							cellcounty: 71,
							cellheight: 256,
							cellwidth: 256,
							deltax: 512000,
							deltay: 512000,
							id: 722,
							zoompercell: 512000,
							zoomperpixel: 2000,
							zoomscreen: 2048000
						}, {
							caption: "",
							cellcountx: 11,
							cellcounty: 9,
							cellheight: 256,
							cellwidth: 256,
							deltax: 4096000,
							deltay: 4096000,
							id: 725,
							zoompercell: 4096000,
							zoomperpixel: 16000,
							zoomscreen: 16384000
						}, {
							caption: "",
							cellcountx: 41,
							cellcounty: 36,
							cellheight: 256,
							cellwidth: 256,
							deltax: 1024000,
							deltay: 1024000,
							id: 723,
							zoompercell: 1024000,
							zoomperpixel: 4000,
							zoomscreen: 4096000
						}, {
							caption: "",
							cellcountx: 3,
							cellcounty: 3,
							cellheight: 256,
							cellwidth: 256,
							deltax: 16384000,
							deltay: 16384000,
							id: 727,
							zoompercell: 16384000,
							zoomperpixel: 64000,
							zoomscreen: 65536000
						}, {
							caption: "",
							cellcountx: 164,
							cellcounty: 142,
							cellheight: 256,
							cellwidth: 256,
							deltax: 256000,
							deltay: 256000,
							id: 721,
							zoompercell: 256000,
							zoomperpixel: 1000,
							zoomscreen: 1024000
						}, {
							caption: "",
							cellcountx: 327,
							cellcounty: 283,
							cellheight: 256,
							cellwidth: 256,
							deltax: 128000,
							deltay: 128000,
							id: 720,
							zoompercell: 128000,
							zoomperpixel: 500,
							zoomscreen: 512000
						}, {
							caption: "",
							cellcountx: 1305,
							cellcounty: 1131,
							cellheight: 256,
							cellwidth: 256,
							deltax: 32000,
							deltay: 32000,
							id: 718,
							zoompercell: 32000,
							zoomperpixel: 125,
							zoomscreen: 128000
						}, {
							caption: "",
							cellcountx: 5218,
							cellcounty: 4523,
							cellheight: 256,
							cellwidth: 256,
							deltax: 8000.00000000006,
							deltay: 8000,
							id: 716,
							zoompercell: 8000,
							zoomperpixel: 31.2500000000002,
							zoomscreen: 32000
						}, {
							caption: "",
							cellcountx: 20871,
							cellcounty: 18092,
							cellheight: 256,
							cellwidth: 256,
							deltax: 1999.99999999997,
							deltay: 2000,
							id: 714,
							zoompercell: 2000,
							zoomperpixel: 7.81249999999989,
							zoomscreen: 8000
						}, {
							caption: "",
							cellcountx: 83484,
							cellcounty: 72368,
							cellheight: 256,
							cellwidth: 256,
							deltax: 499.999999999971,
							deltay: 500,
							id: 712,
							zoompercell: 500,
							zoomperpixel: 1.95312499999989,
							zoomscreen: 2000
						}, {
							caption: "",
							cellcountx: 524288,
							cellcounty: 524288,
							cellheight: 256,
							cellwidth: 256,
							deltax: 125,
							deltay: 125,
							id: 792,
							zoompercell: 125,
							zoomperpixel: 0.48828125,
							zoomscreen: 500
						}],
						caption: "",
						id: "",
						maxx: 32768000,
						maxy: 32768000,
						minx: -32768000,
						miny: -32768000
					}
				},
				vmp: {
					id: "",
					name: "",
					caption: ""
				},
				qds: {},
				dom: {}
			};
		B.createMapArea();
		B.setSds(A);
		B.mapProcess.callback(_);
		$ = new DrapPoint(B);
		if (B.enableHotLabel) L.a(B.map, "mousemove", function ($)
		{
			q0("modules.hotlabel", function (_)
			{
				_($, B)
			})
		});
		d1.b("params=" + window.location.host + "&&event=mapinited")
	};
	(function ()
	{
		var B = N1(document, "SCRIPT"),
			_, A = /^http:\/\/.*\/lib\/js\/api\.js$/,
			$;
		for (_ = 0; _ < B.length; _++) if (A.test(B[_].src))
		{
			$ = B[_].onGo2mapApiLoad;
			if ($) $()
		}
	})()
})()