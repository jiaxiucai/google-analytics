//<javascript language="javascript" type="text/javascript" src=服务器地址+路径+"statistics.js"> </script>
/*
 =====================================
|--------Author By BlackSoul---------|
|------------2006.04.27--------------|
|--------BlackSoulylk@gmail.com------|
|------http://blacksoul.cnblogs.cn---|
======================================
*/
//(function () {
var projectId = document.getElementById('atdanalytics').getAttribute('data');
document.write("<script src='http://pv.sohu.com/cityjson?ie=utf-8'><\/script>");
document.write("<script type='text/javascript' src='http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js'></script>");
//console.log(returnCitySN["cip"] + "," + returnCitySN['cid'] + "," + returnCitySN['cname']);
//定义全局量
var ur = "";                                                 //来源地址
var urp = new Array();                                        //来源参数名称
var urpv = new Array();                                       //来源参数值
var arrayCount = 0;                                           //参数数目
pageOpen = new Date();	                            	      //进入页面的时间
var reqURL = "http://115.29.76.144:9002/api/analytics/";          //接收数据的页面地址
//var reqURL = "http://localhost:3433/api/analytics/";        
var GUID = Math.round(Math.random() * 2147483647);    		  //用户唯一随机数
var title = document.title;                                   //网页标题
var uexp = pageOpen.getTime() + (1000 * 60 * 60 * 24 * 30); //设置cookie过期时间 既回访用户的限定
var rtu = "false";                                            //指示用户是否回访用户
//浏览器特征信息
var brower = new Array();
/*
* brower[0] 浏览器类型
* brower[1] 浏览器版本
* brower[2] 浏览器java是否打开 1开-1关
* brower[3] 浏览器flash版本
* brower[4] 浏览器操作系统
* brower[5] 浏览器分辨率
* brower[6] 浏览器色深
* brower[7] 浏览器语言
* brower[8] 浏览器插件 (弃用)
*/
var sEn = new Array();	//搜索引擎的名称
var keyWord = new Array(); //关键字传输形式
sEn[0] = "google"; keyWord[0] = "q";
sEn[1] = "yahoo"; keyWord[1] = "p";
sEn[2] = "msn"; keyWord[2] = "q";
sEn[3] = "aol"; keyWord[3] = "query";
sEn[4] = "lycos"; keyWord[4] = "query";
sEn[5] = "ask"; keyWord[5] = "q";
sEn[6] = "altavista"; keyWord[6] = "q";
sEn[7] = "search"; keyWord[7] = "q";
sEn[8] = "netscape"; keyWord[8] = "query";
sEn[9] = "earthlink"; keyWord[9] = "q";
sEn[10] = "cnn"; keyWord[10] = "query";
sEn[11] = "looksmart"; keyWord[11] = "key";
sEn[12] = "about"; keyWord[12] = "terms";
sEn[13] = "excite"; keyWord[13] = "qkw";
sEn[14] = "mamma"; keyWord[14] = "query";
sEn[15] = "alltheweb"; keyWord[15] = "q";
sEn[16] = "gigablast"; keyWord[16] = "q";
sEn[17] = "voila"; keyWord[17] = "kw";
sEn[18] = "virgilio"; keyWord[18] = "qs";
sEn[19] = "teoma"; keyWord[19] = "q";
sEn[20] = "baidu"; keyWord[20] = "wd";
//test data----------------------------//////////////////////////////-----------/-/-/-/-/-/-/-/-/-/-/-
//sEn[21] = "localhost"; keyWord[21] = "q";

//-----------------------------比较url,如果为搜索引擎则保存关键字-------------
function getKeyword(url) {
    var hostname;
    if (url.indexOf(".") == -1)
    { hostname = url; }
    else
    { hostname = url.substring(url.indexOf("."), url.lastIndexOf(".")); }
    for (var i = 0; i < sEn.length; i++) {
        if (hostname == sEn[i]) {
            for (var j = 0; j < urp.length; j++) {
                if (urp[j] == keyWord[i]) {
                    return urpv[j];
                }
            }
        }
    }
    return "";
}
//将URL转换为地址和页面参数和参数值 参数uri为页面地址
function gethn(uri) {
    if (!uri || uri == "") return "";
    ur = uri;
    var sub;
    //带参数
    if (ur.indexOf("?") != -1) {
        var url = ur.substring(0, ur.indexOf("?"));
        var para = ur.substring(ur.indexOf("?") + 1, ur.length);
        while (para.length > 0) {
            if (para.indexOf("&") == -1) {
                urp[arrayCount] = para.substring(0, para.indexOf("="));
                urpv[arrayCount] = para.substring(para.indexOf("=") + 1, para.length);
                break;
            }
            sub = para.substring(0, para.indexOf("&"));
            urp[arrayCount] = sub.substring(0, sub.indexOf("="));
            urpv[arrayCount] = sub.substring(sub.indexOf("=") + 1, sub.length);
            para = para.substring(para.indexOf("&") + 1, para.length);
            arrayCount++;
        }
        return url;
    }
    else
        return ur;
}

//----------------------------获得域名---------------------------------------------
function getHostName(url) {
    url = url.substring(url.indexOf('://') + 3, url.length);
    url = url.substring(0, url.indexOf("/"));
    return url;
}

//---------------------------获得flash版本------------------------------------------
function getFlash() {
    var f = "-1", n = navigator;
    if (n.plugins && n.plugins.length) {
        for (var ii = 0; ii < n.plugins.length; ii++) {
            if (n.plugins[ii].name.indexOf('Shockwave Flash') != -1) {
                f = n.plugins[ii].description.split('Shockwave Flash ')[1];
                break;
            }
        }
    } else if (window.ActiveXObject) {
        for (var ii = 10; ii >= 2; ii--) {
            try {
                var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');");
                if (fl) { f = ii + '.0'; break; }
            }
            catch (e) { }
        }
    }
    if (f == "-1")
        return f;
    else
        return f.substring(0, f.indexOf(".") + 2);
}

//--------------------------设置异步传输停留时间-----------------------------------
function createXMLHttpRequest() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHttp");
    }
}
//需要说明的一点是GetResidentTime这个函数,google采用了img.load的方法加载了接收处理信息页面的,
//需要再服务器端配置将后缀为.gif或你所取的其他形式的文件使用aspx的方式编译运行.
//因为我原来考虑的是使用xmlHttp异步调用.但是页面退出的时候有时候不执行.所以就弃用了.
//获得停留时间
function GetResidentTime() {
    pageClose = new Date();
    minutes = (pageClose.getMinutes() - pageOpen.getMinutes());
    if (minutes < 0) {
        minutes = minutes + 60;
    }
    seconds = (pageClose.getSeconds() - pageOpen.getSeconds());
    if (seconds < 0) { seconds += 60; }
    time = (seconds + (minutes * 60));

    //------------------------修改此处为接收链接地址 XML 异步传输------------------------------------
    //    var xmlHttp = createXMLHttpRequest();
    //    xmlHttp.open("POST", reqURL + "firstvisit.aspx?" + StrPara(), false);
    //    xmlHttp.send(null);
    //----------------------------图片形式传递-------------------------------------------------------
    if (isReturn() == false) {
        var i = new Image(1, 1);
        i.src = reqURL + "firstvisit/" + projectId + "?" + StrPara() + "&GUID=" + GUID + "&st=" + time;
        i.onload = function () {
            LoadVoid();
        }
        //进入页面的信息
        //if (getCookieValue("GUID") == "noCookie") {
        //    return;
        //}
        //var j = new Image(1, 1);
        //j.src = reqURL + "pageview/" + projectId + "?" + pageView() + "&st=" + time;
        //j.onload = function () {
        //    LoadVoid();
        //}
    }
    else {
        var i = new Image(1, 1);
        i.src = reqURL + "pageview/" + projectId + "?" + pageView() + "&st=" + time;
        i.onload = function () {
            LoadVoid();
        }
    }
}
function LoadVoid() { return; }
//-----------------------------取得第一次浏览网站参数字符串----------------------------------------
function StrPara() {
    //获得浏览器信息
    BrowserInfo();
    var para = "";
    //IP地址和城市名称
    if (returnCitySN) {
        para += "ip=" + returnCitySN["cip"] + "&";
    }
    if (remote_ip_info) {
        para += "country=" + remote_ip_info["country"] + "&";
        para += "province=" + remote_ip_info["province"] + "&";
        para += "city=" + remote_ip_info["city"] + "&";
    }
    //来源地址
    para += "urr=" + getHostName(gethn(document.referrer)) + "&";
    if (para == "urr=&")
        para = "";
    //参数        
    var _urp = "urp=";
    for (var j = 0; j < urp.length; j++) {
        _urp += urp[j] + ",";
    }
    _urp = _urp.substring(0, _urp.length - 1) + "&";
    if (_urp == "urp&")
        _urp = "";
    para += _urp;
    var _urpv = "urpv=";
    for (var i = 0; i < urpv.length; i++) {
        _urpv += urpv[i] + ",";
    }
    _urpv = _urpv.substring(0, _urpv.length - 1) + "&";
    if (_urpv == "urpv&")
        _urpv = "";
    para += _urpv;
    //关键字    
    para += "keyWord=" + getKeyword(getHostName(gethn(document.referrer))) + "&";
    para += "bType=" + brower[0] + "&";
    para += "bVersion=" + brower[1] + "&";
    para += "bJava=" + brower[2] + "&";
    para += "bFlash=" + brower[3] + "&";
    para += "bOS=" + brower[4] + "&";
    para += "bScr=" + brower[5] + "&";
    para += "bColor=" + brower[6] + "&";
    para += "bHl=" + brower[7];
    //para += "bPlugin=" + brower[8];
    return para;
}
//-----------------------用户非第一次浏览网站----------------------------
function pageView() {
    var para = "";
    var strTmp = "";
    if (returnCitySN) {
        para += "ip=" + returnCitySN["cip"] + "&";
        //para += "cname=" + returnCitySN["cname"] + "&";
    }
    if (remote_ip_info) {
        para += "country=" + remote_ip_info["country"] + "&";
        para += "province=" + remote_ip_info["province"] + "&";
        para += "city=" + remote_ip_info["city"] + "&";
    }
    para += "urr=" + getHostName(gethn(document.referrer)) + "&";
    if (para == "urr=&")
        para = "";
    //获得当前地址
    strTmp = "cur=" + gethn(getHref()) + "&";
    para += strTmp;
    //获得参数
    strTmp = "urp=";
    for (var j = 0; j < urp.length; j++) {
        strTmp += urp[j] + ",";
    }
    strTmp = strTmp.substring(0, strTmp.length - 1) + "&";
    if (strTmp == "urp&")
        strTmp = "";
    para += strTmp;

    strTmp = "urpv=";
    for (var i = 0; i < urpv.length; i++) {
        strTmp += urpv[i] + ",";
    }
    strTmp = strTmp.substring(0, strTmp.length - 1) + "&";
    if (strTmp == "urpv&")
        strTmp = "";
    para += strTmp;
    para += "GUID=" + getCookieValue("GUID") + "&";
    para += "title=" + title;
    return para;
}
//-----------------------------------------------------------------------------
//是否回访用户
function isReturn() {
    //如果没有cookie,则为新的用户,设置初始cookie,用户GUID,初次到访时间.上次到访时间为本次
    if (getCookieValue() == "noCookie") {
        setCookie("GUID", GUID);
        setCookie("lastTime", pageOpen.getTime());
        setCookie("firstTime", pageOpen.getTime());
        return false;
    }
        //反之为回访,重设回访时间
    else {
        //若首次进入时间与当前时间比较超多一个月,则为新用户,针对回访用户
        if ((getCookie("firstTime") + 1000 * 60 * 60 * 24 * 30) < pageOpen.getTime()) {
            setCookie("GUID", GUID);
            setCookie("lastTime", pageOpen.getTime());
            setCookie("firstTime", pageOpen.getTime());
            return false;
        }
        //若首次访问时间小于一个月,大于一天,设为回访用户
        if ((getCookie("lastTime") + 1000 * 60 * 60 * 24) > pageOpen.getTime()) {
            setCookie("lastTime", pageOpen.getTime());
            return true;
        }

        return true;
    }
}
//-----------------------获得当前地址-----------------------------
function getHref() {
    return document.location.href;
}
//-----------------------cookie操作开始-----------------------------------------------------------------------------------------------------------------
//设定Cookie值
function setCookie(name, value) {
    var expdate = new Date();
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;
    var expires = 15768000;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    if (expires != null) {
        //设置过期时间24小时
        expdate.setTime(uexp);
        document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expdate.toGMTString()))
            + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain))
            + ((secure == true) ? "; secure=" : "");
    }
}
function delCookie(name)
    //删除Cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}
//获得Cookie的值
function getCookie(fname) {
    var name, value;
    var cookies = new Object();
    var beginning, middle, end;

    beginning = 0;
    while (beginning < document.cookie.length) {
        middle = document.cookie.indexOf("=", beginning);
        end = document.cookie.indexOf(";", beginning);

        if (end == -1) {
            end = document.cookie.length;
        }
        if ((middle > end) || (middle == -1)) {
            name = document.cookie.substring(beginning, end);
            value = "";
        }
        else {
            name = document.cookie.substring(beginning, middle);
            value = document.cookie.substring(middle + 1, end);
        }
        if (name == fname) {
            return unescape(value);
        }
        beginning = end + 2;
    }
}

//-----获取GUID的cookie是否存在获得---------------------------------------------------
function getCookieValue() {
    var guid = getCookie("GUID");
    if (guid != null) {
        return guid;
    }
    else {
        return "noCookie";
    }
}
//---------------------获得注册用户cookie---------------------------------------------
function getRegUserCookie() {
    return;
}
//-----------------------------cookie 操作完毕------------------------------------------------------------------------------------------------------------
//获得插件
function getPlugin() {
    var plugin = "";
    var ua = navigator.userAgent.split(";");
    if (ua.length < 4)
        return "";
    for (var i = 4; i < ua.length; i++) {
        plugin += ua[i] + ",";
    }
    return plugin.substring(0, plugin.length - 2);
}
//-----------------------------------------------------------------------------
//浏览器特征信息
function BrowserInfo() {
    var browser = BroswerUtil.getBrowserVersion();
    console.log(brower);
    brower[0] = browser[0];
    brower[1] = browser[1];
    brower[7] = navigator.language;
    if (navigator.appName == "Netscape") {
        brower[7] = navigator.language;
    }
    else if (navigator.appName == "Microsoft Internet Explorer") {
        brower[7] = navigator.userLanguage;
    }
    brower[2] = navigator.javaEnabled() ? 1 : -1;
    brower[3] = getFlash();
    brower[4] = BroswerUtil.CurrentSystem();
    if (self.screen) {
        sr = screen.width + "x" + screen.height;
        sc = screen.colorDepth + "-bit";
    }
    else if (self.java) {
        var j = java.awt.Toolkit.getDefaultToolkit();
        var s = j.getScreenSize();
        sr = s.width + "x" + s.height;
    }
    //分辨率
    brower[5] = sr;
    //色深
    brower[6] = sc;
    //插件列表
    //brower[8] = getPlugin();
}
BroswerUtil = {
    //检测浏览器版本
    getBrowserVersion: function () {
        var agent = navigator.userAgent.toLowerCase();
        var arr = [];
        var Browser = "";
        var Bversion = "";
        var verinNum = "";
        //IE
        if (agent.indexOf("msie") > 0) {
            var regStr_ie = /msie [\d.]+;/gi;
            Browser = "IE";
            Bversion = "" + agent.match(regStr_ie)
        }
            //firefox
        else if (agent.indexOf("firefox") > 0) {
            var regStr_ff = /firefox\/[\d.]+/gi;
            Browser = "firefox";
            Bversion = "" + agent.match(regStr_ff);
        }
            //Chrome
        else if (agent.indexOf("chrome") > 0) {
            var regStr_chrome = /chrome\/[\d.]+/gi;
            Browser = "chrome";
            Bversion = "" + agent.match(regStr_chrome);
        }
            //Safari
        else if (agent.indexOf("safari") > 0 && agent.indexOf
    ("chrome") < 0) {
            var regStr_saf = /version\/[\d.]+/gi;
            Browser = "safari";
            Bversion = "" + agent.match(regStr_saf);
        }
            //Opera
        else if (agent.indexOf("opera") >= 0) {
            var regStr_opera = /version\/[\d.]+/gi;
            Browser = "opera";
            Bversion = "" + agent.match(regStr_opera);
        } else {
            var browser = navigator.appName;
            if (browser == "Netscape") {
                var version = agent.split(";");
                var trim_Version = version[7].replace(/[ ]/g, "");
                var rvStr = trim_Version.match(/[\d\.]/g).toString();
                var rv = rvStr.replace(/[,]/g, "");
                Bversion = rv;
                Browser = "IE"
            }
        }
        verinNum = (Bversion + "").replace(/[^0-9.]/ig, "");
        arr.push(Browser);
        arr.push(verinNum);
        return arr;
    },
    //---------------------------获得操作系统---------------------------
    CurrentSystem: function () {
        var system = {
            win: false,
            mac: false,
            xll: false,
            iphone: false,
            ipod: false,
            ipad: false,
            ios: false,
            android: false,
            //nokiaN: false,
            //winMobile: false,
            //wii: false,
            //ps: false
        };
        var ua = navigator.userAgent;
        // 检测平台
        var p = navigator.platform;
        system.win = p.indexOf('Win') == 0;
        system.mac = p.indexOf('Mac') == 0;
        system.xll = (p.indexOf('Xll') == 0 || p.indexOf('Linux') == 0);
        // 检测Windows操作系统
        if (system.win) {
            if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
                if (RegExp['$1'] == 'NT') {
                    switch (RegExp['$2']) {
                        case '5.0':
                            system.win = 'Win2000';
                            break;
                        case '5.1':
                            system.win = 'WinXP';
                            break;
                        case '6.0':
                            system.win = 'WinVista';
                            break;
                        case '6.1':
                            system.win = 'Win7';
                            break;
                        case '6.2':
                            system.win = 'Win8';
                            break;
                        case '10.0':
                            system.win = 'Win10';
                            break;
                        default:
                            system.win = 'WinNT';
                            break;
                    }
                } else if (RegExp['$1'] == '9x') {
                    system.win = 'WinME';
                } else {
                    system.win = RegExp['$1'];
                }
            }
        }
        // 移动设备
        system.iphone = ua.indexOf('iPhone') > -1;
        system.ipod = ua.indexOf('iPod') > -1;
        system.ipad = ua.indexOf('iPad') > -1;
        //system.nokiaN = ua.indexOf('nokiaN') > -1;
        // windows mobile
        //if (system.win == 'CE') {
        //    system.winMobile = system.win;
        //} else if (system.win == 'Ph') {
        //    if (/Windows Phone OS (\d+.\d)/i.test(ua)) {
        //        system.win = 'Phone';
        //        system.winMobile = parseFloat(RegExp['$1']);
        //    }
        //}
        // 检测IOS版本
        //if (system.mac && ua.indexOf('Mobile') > -1) {
        //    if (/CPU (?:iPhone )?OS (\d+_\d+)/i.test(ua)) {
        //        system.ios = parseFloat(RegExp['$1'].replace('_', '.'));
        //    } else {
        //        system.ios = 2;    // 不能真正检测出来，所以 只能猜测
        //    }
        //}
        // 检测Android版本
        if (/Android (\d+\.\d+)/i.test(ua)) {
            system.android = parseFloat(RegExp['$1']);
        }
        // 游戏系统
        //system.wii = ua.indexOf('Wii') > -1;
        //system.ps = /PlayStation/i.test(ua);
        if (system.win != false) {
            return "win";
        }
        if (system.mac != false) {
            return "mac";
        }
        if (system.xll != false) {
            return "linux";
        }
        if (system.iphone != false) {
            return "iphone";
        }
        if (system.ipod != false) {
            return "ipod";
        }
        if (system.ipad != false) {
            return "ipad";
        }
        if (system.android != false) {
            return "android";
        }
        return "win";
        //return {
        //    system: system
        //}
    }
};
//})();