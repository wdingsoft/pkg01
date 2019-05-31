var hex_chr = "0123456789abcdef"; 
function rhex(num) 
{ 
str = ""; 
for(j = 0; j <= 3; j++) 
str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) + 
hex_chr.charAt((num >> (j * 8)) & 0x0F); 
return str; 
} 
function str2blks_MD5(str) 
{ 
nblk = ((str.length + 8) >> 6) + 1; 
blks = new Array(nblk * 16); 
for(i = 0; i < nblk * 16; i++) blks[i] = 0; 
for(i = 0; i < str.length; i++) 
blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8); 
blks[i >> 2] |= 0x80 << ((i % 4) * 8); 
blks[nblk * 16 - 2] = str.length * 8; 
return blks; 
} 
function add(x, y) 
{ 
var lsw = (x & 0xFFFF) + (y & 0xFFFF); 
var msw = (x >> 16) + (y >> 16) + (lsw >> 16); 
return (msw << 16) | (lsw & 0xFFFF); 
} 
function rol(num, cnt) 
{ 
return (num << cnt) | (num >>> (32 - cnt)); 
} 
function cmn(q, a, b, x, s, t) 
{ 
return add(rol(add(add(a, q), add(x, t)), s), b); 
} 
function ff(a, b, c, d, x, s, t) 
{ 
return cmn((b & c) | ((~b) & d), a, b, x, s, t); 
} 
function gg(a, b, c, d, x, s, t) 
{ 
return cmn((b & d) | (c & (~d)), a, b, x, s, t); 
} 
function hh(a, b, c, d, x, s, t) 
{ 
return cmn(b ^ c ^ d, a, b, x, s, t); 
} 
function ii(a, b, c, d, x, s, t) 
{ 
return cmn(c ^ (b | (~d)), a, b, x, s, t); 
} 
function MD5(str) 
{ 
x = str2blks_MD5(str); 
var a = 1732584193; 
var b = -271733879; 
var c = -1732584194; 
var d = 271733878; 
for(i = 0; i < x.length; i += 16) 
{ 
var olda = a; 
var oldb = b; 
var oldc = c; 
var oldd = d; 
a = ff(a, b, c, d, x[i+ 0], 7 , -680876936); 
d = ff(d, a, b, c, x[i+ 1], 12, -389564586); 
c = ff(c, d, a, b, x[i+ 2], 17, 606105819); 
b = ff(b, c, d, a, x[i+ 3], 22, -1044525330); 
a = ff(a, b, c, d, x[i+ 4], 7 , -176418897); 
d = ff(d, a, b, c, x[i+ 5], 12, 1200080426); 
c = ff(c, d, a, b, x[i+ 6], 17, -1473231341); 
b = ff(b, c, d, a, x[i+ 7], 22, -45705983); 
a = ff(a, b, c, d, x[i+ 8], 7 , 1770035416); 
d = ff(d, a, b, c, x[i+ 9], 12, -1958414417); 
c = ff(c, d, a, b, x[i+10], 17, -42063); 
b = ff(b, c, d, a, x[i+11], 22, -1990404162); 
a = ff(a, b, c, d, x[i+12], 7 , 1804603682); 
d = ff(d, a, b, c, x[i+13], 12, -40341101); 
c = ff(c, d, a, b, x[i+14], 17, -1502002290); 
b = ff(b, c, d, a, x[i+15], 22, 1236535329); 
a = gg(a, b, c, d, x[i+ 1], 5 , -165796510); 
d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632); 
c = gg(c, d, a, b, x[i+11], 14, 643717713); 
b = gg(b, c, d, a, x[i+ 0], 20, -373897302); 
a = gg(a, b, c, d, x[i+ 5], 5 , -701558691); 
d = gg(d, a, b, c, x[i+10], 9 , 38016083); 
c = gg(c, d, a, b, x[i+15], 14, -660478335); 
b = gg(b, c, d, a, x[i+ 4], 20, -405537848); 
a = gg(a, b, c, d, x[i+ 9], 5 , 568446438); 
d = gg(d, a, b, c, x[i+14], 9 , -1019803690); 
c = gg(c, d, a, b, x[i+ 3], 14, -187363961); 
b = gg(b, c, d, a, x[i+ 8], 20, 1163531501); 
a = gg(a, b, c, d, x[i+13], 5 , -1444681467); 
d = gg(d, a, b, c, x[i+ 2], 9 , -51403784); 
c = gg(c, d, a, b, x[i+ 7], 14, 1735328473); 
b = gg(b, c, d, a, x[i+12], 20, -1926607734); 
a = hh(a, b, c, d, x[i+ 5], 4 , -378558); 
d = hh(d, a, b, c, x[i+ 8], 11, -2022574463); 
c = hh(c, d, a, b, x[i+11], 16, 1839030562); 
b = hh(b, c, d, a, x[i+14], 23, -35309556); 
a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060); 
d = hh(d, a, b, c, x[i+ 4], 11, 1272893353); 
c = hh(c, d, a, b, x[i+ 7], 16, -155497632); 
b = hh(b, c, d, a, x[i+10], 23, -1094730640); 
a = hh(a, b, c, d, x[i+13], 4 , 681279174); 
d = hh(d, a, b, c, x[i+ 0], 11, -358537222); 
c = hh(c, d, a, b, x[i+ 3], 16, -722521979); 
b = hh(b, c, d, a, x[i+ 6], 23, 76029189); 
a = hh(a, b, c, d, x[i+ 9], 4 , -640364487); 
d = hh(d, a, b, c, x[i+12], 11, -421815835); 
c = hh(c, d, a, b, x[i+15], 16, 530742520); 
b = hh(b, c, d, a, x[i+ 2], 23, -995338651); 
a = ii(a, b, c, d, x[i+ 0], 6 , -198630844); 
d = ii(d, a, b, c, x[i+ 7], 10, 1126891415); 
c = ii(c, d, a, b, x[i+14], 15, -1416354905); 
b = ii(b, c, d, a, x[i+ 5], 21, -57434055); 
a = ii(a, b, c, d, x[i+12], 6 , 1700485571); 
d = ii(d, a, b, c, x[i+ 3], 10, -1894986606); 
c = ii(c, d, a, b, x[i+10], 15, -1051523); 
b = ii(b, c, d, a, x[i+ 1], 21, -2054922799); 
a = ii(a, b, c, d, x[i+ 8], 6 , 1873313359); 
d = ii(d, a, b, c, x[i+15], 10, -30611744); 
c = ii(c, d, a, b, x[i+ 6], 15, -1560198380); 
b = ii(b, c, d, a, x[i+13], 21, 1309151649); 
a = ii(a, b, c, d, x[i+ 4], 6 , -145523070); 
d = ii(d, a, b, c, x[i+11], 10, -1120210379); 
c = ii(c, d, a, b, x[i+ 2], 15, 718787259); 
b = ii(b, c, d, a, x[i+ 9], 21, -343485551); 
a = add(a, olda); 
b = add(b, oldb); 
c = add(c, oldc); 
d = add(d, oldd); 
} 
return rhex(a) + rhex(b) + rhex(c) + rhex(d); 
} 
function halfhour(){
//请求用户中心消息代码
var m="http://my.cntv.cn/intf/homepage/msgnum.php";
var d=document.createElement("script");d.setAttribute("charset","gb2312");
d.type="text/javascript";d.language="javascript";
d.src=m;document.getElementById("message").appendChild(d);
d.onload=d.onreadystatechange=function(){
if(!this.readyState||this.readyState=="loaded"||this.readyState=="complete"){
//document.getElementById("msg_1").innerHTML=message_1;
}
}
}
window.setInterval("halfhour()",1800000);  //定时获取用户中心的消息(间隔为30分钟)
var errtype="";var _0="";var nicknm="";var _1="";var vtcccode="";var userid = "";var sns_userid = "";
getCookie1();
function getCookie1(){
var a="verifycode=";
if(document.cookie.length>0){offset=document.cookie.indexOf(a);
if(offset!=-1){offset+=a.length;end=document.cookie.indexOf(";",offset);
if(end==-1){end=document.cookie.length}var b=unescape(document.cookie.substring(offset,end));
if(b!=null&&b.length>0){var c="http://passport.cctv.com/app_pass/verify/login3/jiemi.jsp?verifycode="+b;
var d=document.createElement("script");
d.setAttribute("charset","gb2312");
d.type="text/javascript";
d.language="javascript";
d.src=c;document.getElementById("passport").appendChild(d);d.onload=d.onreadystatechange=function(){if(!this.readyState||this.readyState=="loaded"||this.readyState=="complete"){
if(_errtype==0&&_errtype!="" && _mailflg!=0){
/*if(_nicknm.length>5){
_nicknm=_nicknm.substr(0,4)+"...";
}else{
_nicknm=_nicknm;
}*/
sns_userid = _userseqid;
document.getElementById('login').style.display='none';
document.getElementById('logon2').style.display='block';
document.getElementById("cookie_user_name2").innerHTML="<a href='http://my.cntv.cn' target='_blank' onmouseover='showSelect3(this); return false'>"+_nicknm+"</a>";
document.getElementById("cookid2").value=_usrid; userid = _usrid;
document.getElementById("nicknm2").value=_nicknm; nicknm = _nicknm;
document.getElementById("xy").href="http://xiyou.cntv.cn/"+_userseqid+"/index.html";
document.getElementById("xy1").href="http://xiyou.cntv.cn/"+_userseqid+"/index.html";
//////


if(_email.indexOf("@cntv.cn")!=-1){
document.getElementById("yx_f").style.color="";
document.getElementById("yx_f").href="http://mail.cntv.cn/";
document.getElementById("yx_f").target="_blank";
}else if(_email.indexOf("@vip.cntv.cn")!=-1){
document.getElementById("vip_yx_f").style.color="";
document.getElementById("vip_yx_f").href="http://vip.cntv.cn/";
document.getElementById("vip_yx_f").target="_blank";
}
halfhour();
}else{ 
/*if(_nicknm.length>5){
_nicknm=_nicknm.substr(0,4)+"...";
}else{
_nicknm=_nicknm;
}*/
document.getElementById('login').style.display='none'; 
document.getElementById('logon1').style.display='block';
//document.getElementById("cookie_user_name").innerHTML=_nicknm.substr(0,4)+"..."; nicknm = _nicknm;
//document.getElementById("cookie_user_name").href="http://passport.cntv.cn/o_activation.jsp";
document.getElementById("jihuoyourmail").href="http://passport.cntv.cn/o_activation.jsp?usrid_other="+p_uid+"&addons="+window.location.href.replace(/>|</g,'');
document.getElementById("xy").href="http://xiyou.cntv.cn/"+_userseqid+"/index.html";
document.getElementById("xy1").href="http://xiyou.cntv.cn/"+_userseqid+"/index.html";
}
try {
jQuery('#show-login').hide();
jQuery('#show-logout').show();	
jQuery('#show-username').text(_nicknm);
} catch(e) {}
}}}}else{resetLogin(); nicknm = "";}}}function   inputAutoClear(a){a.onfocus=function(){if(this.value==this.defaultValue){this.value=''}};a.onblur=function(){if(this.value==''){this.value=this.defaultValue}};if(a.value==a.defaultValue){a.value=''}}
function trim(a){return a.replace(/(^\s*)|(\s*$)/g,"")}function check_form1(){
document.getElementById("usrid2011").value=document.getElementById("usrid2011").value;
document.getElementById("passwd2011").value=document.getElementById("passwd2011").value;
//判断用户输入的账号是否是中文
var re = /[^\u4e00-\u9fa5]/; 
var flg=re.test(document.getElementById("usrid2011").value);
if(document.getElementById("usrid2011").value=="" || document.getElementById("usrid2011").value=="帐号"){
document.getElementById("usrid2011").focus();
return false;
}else if(document.getElementById("passwd2011").value==""){
document.getElementById("passwd_view").style.display="none";
document.getElementById("passwd2011").style.display="block";
document.getElementById("passwd2011").focus();
return false;
}else if(flg==false){
alert("帐号或密码错误");
document.getElementById("usrid2011").value=""
document.getElementById("usrid2011").focus();
return false;
}
if(flg==true){		
var b="http://passport.cntv.cn/app_pass/verify/login3/interface_check_usrid_pass_new.jsp?usrid="+document.getElementById("usrid2011").value+"&passwd="+encodeURIComponent(document.getElementById("passwd2011").value);
var c=document.createElement("script");c.setAttribute("charset","gb2312");c.type="text/javascript";c.language="javascript";
var cc = function(){
if(!this.readyState||this.readyState=="loaded"||this.readyState=="complete"){
if(errtype==0&&errtype!=""){  
//获得登录用户跳转页面
var titleName=document.getElementById("g_txt").innerHTML;
if(titleName=="微博"){
window.open("http://t.cntv.cn/index.php?m=index","_blank");
}else if(titleName=="社区"){
window.open("http://my.cntv.cn","_blank");
}else if(titleName=="博客"){
window.open("http://blog.cntv.cn/spacecp.php?docp=me","_blank");
}else if(titleName=="播客"){
window.open("http://xiyou.cntv.cn/"+userseqid+"/index.html","_blank");
}else if(titleName=="论坛"){
window.open("http://bbs.cntv.cn/my.php","_blank");
}else if (titleName == "免费邮箱" && document.getElementById("usrid2011").value.indexOf("@cntv.cn") != -1) {
window.open("http://mail.cntv.cn/")
} else if (titleName == "VIP邮箱" && document.getElementById("usrid2011").value.indexOf("@vip.cntv.cn") != -1) {
window.open("http://vip.cntv.cn/ ")
}
try {
jQuery('#show-login').hide();
jQuery('#show-logout').show();	
jQuery('#show-username').text(nicknm);
} catch(eeeeee) {}
/*if(nicknm.length>5){
nicknm=nicknm.substr(0,4)+"...";
}else{
nicknm=nicknm;
}*/
var js1=document.createElement("script");
js1.setAttribute("charset","gb2312");
js1.type="text/javascript";
js1.language="javascript"; 
js1.src="http://passport.cntv.cn/app_pass/verify/logincookie/setcookie2.jsp?verifycode="+verifycodecookie+"&"+new Date().getTime();
document.getElementById("passport").appendChild(js1);
var js11=document.createElement("script");
js11.setAttribute("charset","gb2312");
js11.type="text/javascript";
js11.language="javascript"; 
js11.src="http://passport.cctv.com/app_pass/verify/logincookie/setcookie1.jsp?verifycode="+verifycodecookie+"&"+new Date().getTime();
document.getElementById("passport").appendChild(js11);

document.getElementById('login').style.display='none';
document.getElementById('logon1').style.display='none';
document.getElementById('logon2').style.display='block';
halfhour();
document.getElementById("cookie_user_name2").innerHTML="<a href='http://my.cntv.cn'  target='_blank' onmouseover='showSelect3(this); return false'>"+nicknm+"</a>";
document.getElementById("cookid2").value=usrid;
document.getElementById("nicknm2").value=nicknm.substr(0,4)+"...";
document.getElementById("xy").href="http://xiyou.cntv.cn/"+userseqid+"/index.html";
document.getElementById("xy1").href="http://xiyou.cntv.cn/"+userseqid+"/index.html";
sns_userid = userseqid;
if(emailid.indexOf("@cntv.cn")!=-1){
document.getElementById("yx_f").style.color="";
document.getElementById("yx_f").href="http://mail.cntv.cn/";
document.getElementById("yx_f").target="_blank";
}else if(emailid.indexOf("@vip.cntv.cn")!=-1){
document.getElementById("vip_yx_f").style.color="";
document.getElementById("vip_yx_f").href="http://vip.cntv.cn/";
document.getElementById("vip_yx_f").target="_blank";
}
}else if(errtype==-1){ 
document.getElementById("usrid2011").focus();
return false;
}else if(errtype==-4){
alert("帐号或密码错误");
document.getElementById("usrid2011").value=document.getElementById("usrid2011").value;
return false;
}else if(errtype==-5){
alert("帐号或密码错误");
document.getElementById("usrid2011").value=document.getElementById("usrid2011").value;
return false;
}else if(errtype==-3){
document.getElementById("passwd2011").focus();
return false;
}else if(errtype==-55){	
document.getElementById('login').style.display='none';
document.getElementById('logon1').style.display='block';
//document.getElementById("cookie_user_name").innerHTML=nicknm.substr(0,4)+"...";
document.getElementById("jihuoyourmail").href="http://passport.cntv.cn/o_activation.jsp?usrid_other="+document.getElementById('usrid2011').value+"&addons="+window.location.href.replace(/>|</g,'');
document.getElementById("cookie_user_name").href="http://my.cntv.cn";
try {
jQuery('#show-login').hide();
jQuery('#show-logout').show();	
jQuery('#show-username').text(nicknm);
} catch(e) {}
var js1=document.createElement("script");
js1.setAttribute("charset","gb2312");
js1.type="text/javascript";
js1.language="javascript";
js1.src="http://passport.cntv.cn/app_pass/verify/logincookie/setcookie2.jsp?verifycode="+verifycodecookie+"&"+new Date().getTime();
document.getElementById("passport").appendChild(js1);	
var js11=document.createElement("script");
js11.setAttribute("charset","gb2312");
js11.type="text/javascript";
js11.language="javascript"; 
js11.src="http://passport.cctv.com/app_pass/verify/logincookie/setcookie1.jsp?verifycode="+verifycodecookie+"&"+new Date().getTime();
document.getElementById("passport").appendChild(js11);
}else if(errtype==-36){
alert("帐号被封，请联系客服");
return false;
}else{
window.location.reload();return false
}
}
};
c.onload=cc;
c.onreadystatechange=cc;
c.src=b;document.getElementById("passport").appendChild(c);
}

}
function logout_20111107(){
var e = document.createElement("script");
e.type="text/javascript";
e.charset="gbk";
e.onload = e.onreadystatechange = function() {
if (e.readyState && e.readyState != 'loaded' && e.readyState != 'complete')return;
e.onreadystatechange = e.onload = null;

var l = document.createElement("script");
l.type="text/javascript";
l.charset="gbk";
l.onload = l.onreadystatechange = function() {
if (l.readyState && l.readyState != 'loaded' && l.readyState != 'complete')return;
l.onreadystatechange = l.onload = null;

};
l.src="http://passport.cctv.com/app_pass/verify/logincookie/delcookie.jsp?" + (new Date()).getTime();
document.getElementsByTagName("head")[0].appendChild(l);
var ll = document.createElement("script");
ll.type="text/javascript";
ll.charset="gbk";
ll.onload = ll.onreadystatechange = function() {
if (ll.readyState && ll.readyState != 'loaded' && ll.readyState != 'complete')return;
ll.onreadystatechange = ll.onload = null;
document.getElementById('login').style.display='block';
document.getElementById("usrid2011").value="帐号";
document.getElementById("passwd2011").value="";
document.getElementById('g_txt').innerHTML='选择去向';
document.getElementById("xy").href="javascript:void(0);";
document.getElementById("xy1").href="javascript:void(0);";
document.getElementById("passwd_view").style.display="block";
document.getElementById("passwd2011").style.display="none";
document.getElementById('logon1').style.display='none';
document.getElementById('logon2').style.display='none';
window.location.reload();
};
ll.src="http://passport.cntv.cn/app_pass/verify/logincookie/delcookie2.jsp?" + (new Date()).getTime();
document.getElementsByTagName("head")[0].appendChild(ll);

};
e.src="http://passport.cntv.cn/logout.jsp?" + (new Date()).getTime();
document.getElementsByTagName("head")[0].appendChild(e);
//document.getElementById("iframe_logout").src="http://passport.cntv.cn/logout.jsp";
document.getElementById('login').style.display='block';
document.getElementById("usrid2011").value="帐号";
document.getElementById("passwd2011").value="";
document.getElementById('g_txt').innerHTML='选择去向';
document.getElementById("xy").href="javascript:void(0);";
document.getElementById("xy1").href="javascript:void(0);";
document.getElementById("passwd_view").style.display="block";
document.getElementById("passwd2011").style.display="none";
document.getElementById('logon1').style.display='none';
document.getElementById('logon2').style.display='none';
}
function show_pwd(){
document.getElementById("passwd_view").style.display="none";
document.getElementById("passwd2011").style.display="block";
document.getElementById("passwd2011").focus();
}
jQuery("#yx").bind("click",function(){
if(document.getElementById("yx").className=="unusable"){
}else{
document.getElementById('g_txt').innerHTML='免费邮箱';
}
});
//更改了 target_email() 新增一个click
jQuery("#vipyx").bind("click",
function() {
if (document.getElementById("vipyx").className == "unusable") {} else {
document.getElementById('g_txt').innerHTML = 'VIP邮箱';
}
});
function target_email() {
var uid = document.getElementById("usrid2011").value;
if (uid.indexOf("@vip.cntv.cn") != -1) {
document.getElementById("vipyx").className = "";
jQuery("#vipyx").bind("click",
function() {
if (document.getElementById("vipyx").className == "unusable") {} else {
document.getElementById('g_txt').innerHTML = 'VIP邮箱';
}
});
} else {
document.getElementById("vipyx").className = "unusable";
}
if (uid.indexOf("@cntv.cn") != -1) {
document.getElementById("yx").className = "";
jQuery("#yx").bind("click",
function() {
if (document.getElementById("yx").className == "unusable") {} else {
document.getElementById('g_txt').innerHTML = '免费邮箱';
}
});
} else {
document.getElementById("yx").className = "unusable";
}
}
function SetHome(obj,vrl){
try{
obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
}
catch(e){
if(window.netscape) {
try {
netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
}
catch (e) {
alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
}
var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
prefs.setCharPref('browser.startup.homepage',vrl);
}
}
}



function XN_CheckAllCnText(str){
	var reg=/[\u4E00-\u9FA5]/g 
	if (reg.test(str)){
		return true;
	}else{
		return false;
	} 
} 


/*
	check_fromliuyan方法;
	作用：留言登录框的提交；
*/
function check_fromliuyan(){

	//判断show-login、show-logout是否存在
	if(document.getElementById("show-login") == null && document.getElementById("show-logout") == null){
		//若不存在，打开登录页面
		var localUrl = document.location.href;
		var passportUrl="http://passport.cntv.cn/login.jsp?addons="+localUrl+"&errtype=0";
		var tmp=window.open(passportUrl,"_self","");
	}else{
		try{
			var username = trim(jQuery('#show-login input:eq(0)').val());
			var password = trim(jQuery('#show-login input:eq(1)').val());
			
			if(username == ""||username =="邮箱/用户名"){
				alert("请输入登录帐号");
				document.getElementById("username").focus();
				return false;
			}
			if(XN_CheckAllCnText(username)){
				alert("不能用昵称登录，请使用邮箱或用户名");
				document.getElementById("username").focus();
				return false;
			}

			if (password == "")
			{
				alert("请输入密码");
				document.getElementById("password").focus();
				return false;
			}

			var b="http://passport.cntv.cn/app_pass/verify/login3/interface_check_usrid_pass_new.jsp?usrid="+username+"&passwd="+encodeURIComponent(password);
			var c=document.createElement("script");c.setAttribute("charset","gb2312");
			c.type="text/javascript";c.language="javascript";
			c.src=b;
			document.getElementById("passport").appendChild(c);
			c.onload=c.onreadystatechange=function(){
				if(!this.readyState||this.readyState=="loaded"||this.readyState=="complete"){
						if(errtype==0&&errtype!=""){
						//提交成功：
						/*if(nicknm.length>5){
						nicknm=nicknm.substr(0,4)+"...";
						}else{
						nicknm=nicknm;
						}*/
						document.getElementById('login').style.display='none';
						document.getElementById('logon1').style.display='none';
						document.getElementById('logon2').style.display='block';
						halfhour();
						document.getElementById("cookie_user_name2").innerHTML="<a href='http://my.cntv.cn'  target='_blank' onmouseover='showSelect3(this); return false'>"+nicknm+"</a>";
						document.getElementById("cookid2").value=usrid;
						document.getElementById("nicknm2").value=nicknm;
						document.getElementById("xy").href="http://xiyou.cntv.cn/"+userseqid+"/index.html";
						document.getElementById("xy1").href="http://xiyou.cntv.cn/"+userseqid+"/index.html";
						if(emailid.indexOf("@cntv.cn")!=-1){
						document.getElementById("yx_f").style.color="";
						document.getElementById("yx_f").href="http://mail.cntv.cn/";
						document.getElementById("yx_f").target="_blank";
						}else if(emailid.indexOf("@vip.cntv.cn")!=-1){
						document.getElementById("vip_yx_f").style.color="";
						document.getElementById("vip_yx_f").href="http://vip.cntv.cn/";
						document.getElementById("vip_yx_f").target="_blank";
						}
					
						document.getElementById("show-login").style.display="none";
						document.getElementById("show-username").innerHTML=nicknm;
						document.getElementById("show-logout").style.display="block";
						
						}else if(errtype==-1){
							alert("账号为空");
						}else if(errtype==-4){
							alert("账号不存在");
						}else if(errtype==-5){
							alert("密码不正确");
						}else if(errtype==-3){
							alert("密码为空");
						}else if(errtype==-36){
							alert("该账号被封，请联系客服");
						}else if(errtype==-55){
							alert("账号尚未激活");
						}else{
							window.location.reload();return false;
						}
				}
			}
		}catch(eeeee) {
			var localUrl = document.location.href;
			var passportUrl="http://passport.cntv.cn/login.jsp?addons="+localUrl+"&errtype=0";
			var tmp=window.open(passportUrl,"_self","");
		}
	}
}

/*
	声明相关变量
*/
var href = window.location.href;

/*
	cntv_getCookie()
*/
function cntv_getCookie() {
	getCookie1();
}
function getCookie() {
	cntv_getCookie();
}
/*
	resetLogin(flag)
*/
function resetLogin(flag){
	document.getElementById('login').style.display='block';
	document.getElementById("usrid2011").value="帐号";
	document.getElementById("passwd2011").value="";
	document.getElementById('g_txt').innerHTML='选择去向';
	document.getElementById("xy").href="javascript:void(0);";
	document.getElementById("xy1").href="javascript:void(0);";
	document.getElementById("passwd_view").style.display="block";
	document.getElementById("passwd2011").style.display="none";
	document.getElementById('logon1').style.display='none';
	document.getElementById('logon2').style.display='none';

	try{jQuery('#show-logout').hide(); jQuery('#show-login').show(); jQuery('#show-username').text('');}catch(e){}
	if(flag && jQuery('#iframeID').attr('src')!=undefined){
		jQuery('#iframeID').attr('src', jQuery('#iframeID').attr('src'));
	}
}

/*
	登录退出
*/

function logout(){
	logout_20111107();
}	

/*显示名称内容*/
function showSelect3(p){
	var s_btn = document.getElementById("name_btn");
	if(s_btn.style.display==""){s_btn.style.display="none";}
	s_btn.style.display = s_btn.style.display=="none"?"block":"none";
}


/*显示去向内容*/
function showSelect2(p){
	var s_btn = document.getElementById("goto_btn");
	if(s_btn.style.display==""){s_btn.style.display="none";}
	s_btn.style.display = s_btn.style.display=="none"?"block":"none";
}


jQuery(document).mousedown(function(e){
	var node =  e.target || e.srcElement;
	var evn=(node && 3 == node.nodeType)? node.parentNode:node;
	
	if(evn.parentNode){
		if(evn.parentNode.parentNode){
					if(evn.parentNode.parentNode!=document){
						if(
							 evn.parentNode.getAttribute("id")=="name_btn" || evn.parentNode.getAttribute("id")=="goto_btn" || 
							 evn.getAttribute("id")=="name_btn" || evn.getAttribute("id")=="goto_btn"
							 ) {
							return;
						}
					}
		}
	}

	document.getElementById('goto_btn').style.display = 'none';
	document.getElementById('name_btn').style.display = 'none';

});
var array_yu = [{"id":"1","img_title":"电脑","img":"http://p5.img.cctvpic.com/10/HOMEPAGE/2012/img/u31_original.png","width":"20"},{"id":"2","img_title":"手机","img":"http://p5.img.cctvpic.com/10/HOMEPAGE/2012/img/u9_original.png","width":"11"},{"id":"3","img_title":"平板","img":"http://p5.img.cctvpic.com/10/HOMEPAGE/2012/img/u29_original.png","width":"16"}];
function showSelect5(p){
	 //18865591
	var s_btn = document.getElementById("tc");

	if(s_btn.style.display==""){s_btn.style.display="none"; }
	s_btn.style.display = s_btn.style.display=="none"?"block":"none";
	var o = document.createElement('script');
o.src = "http://history.apps.cntv.cn/interface/jsonp/service.php?client=3&method=video.getUserVideoRecordList&cb=callback&data="+encodeURIComponent('{"uid":'+sns_userid+'}')+"&"+Math.random();
document.getElementsByTagName("HEAD")[0].appendChild(o);
}
 function tc(){	
	 var $=jQuery;
	 $("#tc ul li").hover(function(){
		 $(this).css("background-color","#f2f2f2");
		 },function(){
			 $(this).css("background-color","#fff");	
			}
	);
	 $("#tc").mouseleave(function(){
							$("#tc").css("display","none");	
							$(".gc1").attr("class","gc");
			
										});
	 

	 
	 
	$("#tc ul .li_ts").mouseover(function(){
					$(this).css("background-color","#fff");			
										}); 
	 
	 

	 
	 }

function gc(){
	var $=jQuery;
	$(".gc").click(function(){
							
							
					if($(this).attr("class")=="gc"){
						$(this).attr("class","gc1");
						}	else{	
				$(this).attr("class","gc");			
						}
					return false;
							});
	
	
	$("#name_btn").mouseleave(function(){
			  $("#name_btn").css("display","none");
									   });
	
	
	}
gc();
function checkTime(i)
{
if (i<10) 
 {i="0" + i}
 return i
}
function callback(json){
	//alert(json.response["code"]);
	if(json.code === 0){
		html = [];
		for(var i in json.list){
			var time = json.list[i].position;
			var img_clienttype = json.list[i].clienttype;
			var src = "";
			var width=0;
			var img_title = "";
			var title = "";
			if(time==-1){
				fina = "已看完";
			}else{
				var hour = checkTime(parseInt(time/60/60));
				var minutes = checkTime(parseInt(time/60)%60);
				var seconds = checkTime(time%60);
				if(hour==0&&minutes==0&seconds==0){
					fina = "已看到&nbsp;00：00：00";
				}else{
					fina = "已看到&nbsp;"+hour+"："+minutes+"："+seconds;
				}
			}
			if(json.list[i].title.length>12){
				title = json.list[i].title.substring(0,11)+"...";
			}else{
				title = json.list[i].title;
			}
			
			if(img_clienttype==1){
				src = array_yu[0].img;
				width = array_yu[0].width;
				img_title = array_yu[0].img_title;
			}else if(img_clienttype==2){
				src = array_yu[1].img;
				width = array_yu[1].width;
				img_title = array_yu[1].img_title;
			}else if(img_clienttype==3){
				src = array_yu[2].img;
				width = array_yu[2].width;
				img_title = array_yu[2].img_title;
			}else{
				src = array_yu[0].img;
				width = array_yu[0].width;
				img_title = array_yu[0].img_title;
			}
			
				html.push('<li><span class="sp_1"><img src="'+src+'" width="'+width+'" height="20" title="'+img_title+'"></span><div class="d_2"><p class="p_1"><a target="_blank" href="'+json.list[i].pageurl+'" title="'+json.list[i].title+'">'+title+'</a></p><p class="p_2">'+fina+'</p></div></li>');
			
		}
		var str = "";
		var len = 0;
		if(html.length>=5){
			len = 5
		}else{
			len = html.length;
		}
		for(var i=0;i<len;i++){
			str+=html[i];
		}
		
		document.getElementById('gkjl').innerHTML = str+"<li class='li_ts'><p><a target='_blank' href='http://my.cntv.cn/openapp/19/index.php'>查看全部&gt;&gt;</a></p></li>";
		
	}else if(json.code === -201){
		document.getElementById('gkjl').innerHTML = '<li style="background:none;height:20px;"><div class="d_2" style="width:190px;padding-left:0px;"><p class="p_1" style="text-align:center;">没有任何视频观看记录</p></div></li>'
	}
	tc();
}