//页面点击评分

var sMax;	// 最大数量的星星即最大评分值
var holder; // 鼠标停留的评分控件
var preSet; // 保存了评分值（通过单击来进行评分）
var rated; //是否评分过，并保存了结果（注意此值一旦设为空，就不能再评分）

//调用点击量
try
{
	createScript();
} catch(eeeee) {}

// 鼠标停留事件
function rating(num){
	sMax = 0;	// 默认值为0
	for(n=0; n<num.parentNode.childNodes.length; n++){
		if(num.parentNode.childNodes[n].nodeName == "A"){
			sMax++;	
		}
	}
	
	if(!rated){
		s = num.id.replace("_", ''); // 获取选中的星星的索引，这里使用_1,_2,_3,_4,_5来做为评分控件的ID，当然也有其他的方式。
		a = 0;
		for(i=1; i<=sMax; i++){		
			if(i<=s){
				document.getElementById("_"+i).className = "on";
				holder = a+1;
				a++;
			}else{
				document.getElementById("_"+i).className = "";
			}
		}
	}
}

// 离开事件
function off(me){
	if(!rated){
		if(!preSet){	
			for(i=1; i<=sMax; i++){		
				document.getElementById("_"+i).className = "";
			}
		}else{
			rating(preSet);
			//document.getElementById("rateStatus").innerHTML = document.getElementById("ratingSaved").innerHTML;
		}
	}
}

// 点击进行评分
function rateIt(me,id,fen,url){
	if(!rated){
		preSet = me;
		rated=1;  //设为1以后，就变成了最终结果，不能再修改评分结果
		document.getElementById("fenshu").innerHTML = "感谢参与";
		sendRate(id,fen,url);
		rating(me);
	}else{
		alert("您已经参加了评分！");
	}
}
// 点击进行评分,alert提示的
function rateItAlert(me,id,fen,url){
	if(!rated){
		preSet = me;
		rated=1;  //设为1以后，就变成了最终结果，不能再修改评分结果		
		//document.getElementById("fenshu").innerHTML = "感谢参与";
		sendRate(id,fen,url);
		rating(me);
		alert("评分成功!!!  感谢您的参与");
	}else{
		alert("您已经参加了评分！");
	}
}

//使用Ajax或其他方式发送评分结果 
function sendRate(id,fen,url){
	var element = document.createElement("script");
	if(fen=="no"){
		element.src = pingfen_url+"?articleId="+id+"&url="+url+"&type=yemian";
	}else{
		element.src = pingfen_url+"?articleId="+id+"&gradeNum="+fen+"&url="+url+"&type=yemian";
	}
    element.type = "text/javascript";
    element.language = "javascript";
    document.getElementsByTagName("head")[0].appendChild(element);
	if(document.all){
		element.onreadystatechange = function(){//IE用
        var state = element.readyState;
        if (state == "loaded" || state == "interactive" || state == "complete") {
			if(fen=="no"){
				document.getElementById("fenshu").innerHTML = dafen;
			}else{
				document.getElementById("fenshu").innerHTML = fen;
			}
			}
		}
} else {
        element.onload = function() {//FF用
			if(fen=="no"){
				document.getElementById("fenshu").innerHTML = dafen;
			}else{
				document.getElementById("fenshu").innerHTML = fen;
			}
        }
}
}

function dojsp(id,type,url){
	var element = document.createElement("script");
	element.src = dingcai_url+"?articleId="+id+"&oper="+type+"&url="+url+"&type=yemian";
    element.type = "text/javascript";
    element.language = "javascript";
    document.getElementsByTagName("head")[0].appendChild(element);
		if(document.all){
        element.onreadystatechange = function(){//IE用
                var state = element.readyState;
                if (state == "loaded" || state == "interactive" || state == "complete") {
                       if(type==1 && isSucess==1){
							alert("顶成功！！！");
						}else if(type==1 && isSucess==2){
							alert("顶失败！！！");
						}else if(type==2 && isSucess==1){
							alert("踩成功！！！");
						}else if(type==2 && isSucess==2){
							alert("踩失败！！！");
						}
                }
        };

} else {
        element.onload = function() {//FF用
                if(type==1 && isSucess==1){
					alert("顶成功！！！");
				}else if(type==1 && isSucess==2){
					alert("顶失败！！！");
				}else if(type==2 && isSucess==1){
					alert("踩成功！！！");
				}else if(type==2 && isSucess==2){
					alert("踩失败！！！");
				}

        }
	}
}

function addBookmark(title,url) {//加入到收藏夹
		if (window.sidebar) {
			try{
					 window.sidebar.addPanel(title, url,"");
			   }catch(e){
					 alert("加入收藏失败，请按CTRL+D");
			   }
			//return true;
		} else if( document.all ) {
			try{
					 window.external.AddFavorite( url, title);
			   }catch(e){
					 alert("加入收藏失败，请按CTRL+D");
			   }
			//return true;
		} else if( window.opera && window.print ) {
			//return false;
		}
}
function copyTextToClipboard(copy){//拷贝到剪切板
	if (window.clipboardData){
		window.clipboardData.setData("Text", copy);}
	else if (window.netscape){
		netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
	var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
	if (!clip) return;
		var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
	if (!trans) return;
		trans.addDataFlavor('text/unicode');
	var str = new Object();
	var len = new Object();
	var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
	var copytext=copy;
	str.data=copytext;
	trans.setTransferData("text/unicode",str,copytext.length*2);
	var clipid=Components.interfaces.nsIClipboard;
	if (!clip) return false;
	clip.setData(trans,null,clipid.kGlobalClipboard);}
	alert(copy+"  页面地址复制成功!!!")
	//return false;
}
function copyToClipBoard(text){ //拷贝标题和url到剪切板
	try {
		//var cText =  document.location.toString();
		var cText = text;
		if (window.clipboardData) {
			window.clipboardData.setData("Text", cText);
			alert("已复制本页标题和链接,现在你可以发给你的好友了!");
		} else if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			} catch (e) {
				alert("您的浏览器设置为不允许复制！\n如果需要此操作，请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true',再重试复制操作!");
				//return false;
			}
			var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
			if (!clip) 
				return;
			var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
			if (!trans) {
				return;
			}
			trans.addDataFlavor('text/unicode');
			var str = new Object();
			var len = new Object();
			var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
			
			str.data = cText;
			trans.setTransferData("text/unicode", str, cText.length * 2);
			var clipid = Components.interfaces.nsIClipboard;
			if (!clip) 
				//return false;
			clip.setData(trans, null, clipid.kGlobalClipboard);
			alert("已复制本页标题和链接,现在你可以发给你的好友了!");
		}
	} catch (e) {
	}
}

function copyBroadCastToClipBoard(text){ //拷贝广播代码
	try {
		//var cText =  document.location.toString();
		var cText = "<embed id='a_player_cctv' width='500' height='24' flashvars='pid="+text+"' allowscriptaccess='always' allowfullscreen='true' menu='false' quality='best' bgcolor='#000000' name='v_player_cctv' src='http://player.cntv.cn/standard/cntvAudioPlayer.swf' type='application/x-shockwave-flash'/>";
		if (window.clipboardData) {
			window.clipboardData.setData("Text", cText);
			alert("已复制共享代码,现在你可以发给你的好友了!");
		} else if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			} catch (e) {
				alert("您的浏览器设置为不允许复制！\n如果需要此操作，请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true',再重试复制操作!");
				//return false;
			}
			var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
			if (!clip) 
				return;
			var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
			if (!trans) {
				return;
			}
			trans.addDataFlavor('text/unicode');
			var str = new Object();
			var len = new Object();
			var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
			
			str.data = cText;
			trans.setTransferData("text/unicode", str, cText.length * 2);
			var clipid = Components.interfaces.nsIClipboard;
			if (!clip) 
				//return false;
			clip.setData(trans, null, clipid.kGlobalClipboard);
			alert("已复制共享代码,现在你可以发给你的好友了!");
		}
	} catch (e) {
	}
}

