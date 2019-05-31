var version = '0.171.5.8.9.6.3.5';
var adversion = 'ad0.171.5.8.4.5.2.';
var playerW = 640;
var playerH = 480;
var bgAdW = 960;
var bgAdH = 480;
var html5PlayerWidth ;
var html5PlayerHeight ;
function isIPad() {
        return /(iphone|ipad)/i.test(navigator.userAgent)|| /(Android)/i.test(navigator.userAgent);
} 
function createPlayer(playerId,w,h)
{
	html5PlayerWidth = playerW;
	html5PlayerHeight = playerH;
	var fo= new SWFObject("", playerId, playerW, playerH, "10.0.0.0", "#000000");
	fo.addVariable("tai", "kejiao");
	return fo;
}
function writePlayer(fo,divId,bgAdDataPath,rollAdDataPath)
{  
	if(isIPad())
	{
		var jsDataUrl = "http://vdn.apps.cntv.cn/api/getIpadVideoInfo.do?pid=" + fo.getVariable("videoCenterId") + "&tai=ipad";
		includeHtml5PlayerJs('http://js.player.cntv.cn/creator/html5player_bg.js',divId,jsDataUrl); 
	}else
	{
		includePcPlayerJs('http://js.player.cntv.cn/creator/new_common_bg.js',divId,fo,bgAdDataPath,rollAdDataPath); 
	}
}
function includeHtml5PlayerJs(file,divId,jsDataUrl)
{
    var _doc = document.getElementsByTagName('head')[0];
    var js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    _doc.appendChild(js);
    js.onload = function () 
    {
     createHtml5Player(divId,html5PlayerWidth,html5PlayerHeight,jsDataUrl);
    }
    js.onreadystatechange = function ()
    {
      if (js.readyState == 'loaded' || js.readyState == 'complete') 
      {
        alert('IE6、IE7 support js.onreadystatechange');
        createHtml5Player(divId,html5PlayerWidth,html5PlayerHeight,jsDataUrl);
      }
    }
   js.setAttribute('src', file);
   return false;
}
function doCreatePlayer(divId,playerFo,bgAdDataPath,rollAdDataPath)
{
	var fo = createCommonPlayer(divId,html5PlayerWidth,html5PlayerHeight,playerFo);
	doRealwritePlayer(fo,divId,bgAdDataPath,rollAdDataPath);
}
function includePcPlayerJs(file,divId,playerFo,bgAdDataPath,rollAdDataPath)
{
    var _doc = document.getElementsByTagName('head')[0];
    var js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    _doc.appendChild(js);
	if(typeof(js.onload)!="undefined")
	{
      js.onload = function () 
      {
       doCreatePlayer(divId,playerFo,bgAdDataPath,rollAdDataPath);
     }
	}
    js.onreadystatechange = function ()
    {
      if (js.readyState == 'loaded' || js.readyState == 'complete') 
      {
		doCreatePlayer(divId,playerFo,bgAdDataPath,rollAdDataPath);
      }
    }
   js.setAttribute('src', file);
   return false;
}