//ҳ��������

var sMax;	// ������������Ǽ��������ֵ
var holder; // ���ͣ�������ֿؼ�
var preSet; // ����������ֵ��ͨ���������������֣�
var rated; //�Ƿ����ֹ����������˽����ע���ֵһ����Ϊ�գ��Ͳ��������֣�

//���õ����
try
{
	createScript();
} catch(eeeee) {}

// ���ͣ���¼�
function rating(num){
	sMax = 0;	// Ĭ��ֵΪ0
	for(n=0; n<num.parentNode.childNodes.length; n++){
		if(num.parentNode.childNodes[n].nodeName == "A"){
			sMax++;	
		}
	}
	
	if(!rated){
		s = num.id.replace("_", ''); // ��ȡѡ�е����ǵ�����������ʹ��_1,_2,_3,_4,_5����Ϊ���ֿؼ���ID����ȻҲ�������ķ�ʽ��
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

// �뿪�¼�
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

// �����������
function rateIt(me,id,fen,url){
	if(!rated){
		preSet = me;
		rated=1;  //��Ϊ1�Ժ󣬾ͱ�������ս�����������޸����ֽ��
		document.getElementById("fenshu").innerHTML = "��л����";
		sendRate(id,fen,url);
		rating(me);
	}else{
		alert("���Ѿ��μ������֣�");
	}
}
// �����������,alert��ʾ��
function rateItAlert(me,id,fen,url){
	if(!rated){
		preSet = me;
		rated=1;  //��Ϊ1�Ժ󣬾ͱ�������ս�����������޸����ֽ��		
		//document.getElementById("fenshu").innerHTML = "��л����";
		sendRate(id,fen,url);
		rating(me);
		alert("���ֳɹ�!!!  ��л���Ĳ���");
	}else{
		alert("���Ѿ��μ������֣�");
	}
}

//ʹ��Ajax��������ʽ�������ֽ�� 
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
		element.onreadystatechange = function(){//IE��
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
        element.onload = function() {//FF��
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
        element.onreadystatechange = function(){//IE��
                var state = element.readyState;
                if (state == "loaded" || state == "interactive" || state == "complete") {
                       if(type==1 && isSucess==1){
							alert("���ɹ�������");
						}else if(type==1 && isSucess==2){
							alert("��ʧ�ܣ�����");
						}else if(type==2 && isSucess==1){
							alert("�ȳɹ�������");
						}else if(type==2 && isSucess==2){
							alert("��ʧ�ܣ�����");
						}
                }
        };

} else {
        element.onload = function() {//FF��
                if(type==1 && isSucess==1){
					alert("���ɹ�������");
				}else if(type==1 && isSucess==2){
					alert("��ʧ�ܣ�����");
				}else if(type==2 && isSucess==1){
					alert("�ȳɹ�������");
				}else if(type==2 && isSucess==2){
					alert("��ʧ�ܣ�����");
				}

        }
	}
}

function addBookmark(title,url) {//���뵽�ղؼ�
		if (window.sidebar) {
			try{
					 window.sidebar.addPanel(title, url,"");
			   }catch(e){
					 alert("�����ղ�ʧ�ܣ��밴CTRL+D");
			   }
			//return true;
		} else if( document.all ) {
			try{
					 window.external.AddFavorite( url, title);
			   }catch(e){
					 alert("�����ղ�ʧ�ܣ��밴CTRL+D");
			   }
			//return true;
		} else if( window.opera && window.print ) {
			//return false;
		}
}
function copyTextToClipboard(copy){//���������а�
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
	alert(copy+"  ҳ���ַ���Ƴɹ�!!!")
	//return false;
}
function copyToClipBoard(text){ //���������url�����а�
	try {
		//var cText =  document.location.toString();
		var cText = text;
		if (window.clipboardData) {
			window.clipboardData.setData("Text", cText);
			alert("�Ѹ��Ʊ�ҳ���������,��������Է�����ĺ�����!");
		} else if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			} catch (e) {
				alert("�������������Ϊ�������ƣ�\n�����Ҫ�˲����������������ַ������'about:config'���س�\nȻ��'signed.applets.codebase_principal_support'����Ϊ'true',�����Ը��Ʋ���!");
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
			alert("�Ѹ��Ʊ�ҳ���������,��������Է�����ĺ�����!");
		}
	} catch (e) {
	}
}

function copyBroadCastToClipBoard(text){ //�����㲥����
	try {
		//var cText =  document.location.toString();
		var cText = "<embed id='a_player_cctv' width='500' height='24' flashvars='pid="+text+"' allowscriptaccess='always' allowfullscreen='true' menu='false' quality='best' bgcolor='#000000' name='v_player_cctv' src='http://player.cntv.cn/standard/cntvAudioPlayer.swf' type='application/x-shockwave-flash'/>";
		if (window.clipboardData) {
			window.clipboardData.setData("Text", cText);
			alert("�Ѹ��ƹ������,��������Է�����ĺ�����!");
		} else if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			} catch (e) {
				alert("�������������Ϊ�������ƣ�\n�����Ҫ�˲����������������ַ������'about:config'���س�\nȻ��'signed.applets.codebase_principal_support'����Ϊ'true',�����Ը��Ʋ���!");
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
			alert("�Ѹ��ƹ������,��������Է�����ĺ�����!");
		}
	} catch (e) {
	}
}

