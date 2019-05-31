document.oncontextmenu=new Function('event.returnValue=false;');
document.onselectstart=new Function('event.returnValue=false;');
function tabit(btn){
	var idname = new String(btn.id);
	var s = idname.indexOf("_");
	var e = idname.lastIndexOf("_")+1;
	var tabName = idname.substr(0, s);
	var id = parseInt(idname.substr(e, 1));
	var tabNumber = btn.parentNode.childNodes.length;
	for(i=0;i<tabNumber;i++){
			//document.getElementById(tabName+"_div_"+i).style.display = "none";
			document.getElementById(tabName+"_btn_"+i).className = "";
		};
		//document.getElementById(tabName+"_div_"+id).style.display = "block";
		btn.className = "curr";
};

function etabit(btn){
	var idname = new String(btn.id);
	var s = idname.indexOf("_");
	var e = idname.lastIndexOf("_")+1;
	var tabName = idname.substr(0, s);
	var id = parseInt(idname.substr(e, 1));
	var tabNumber = btn.parentNode.childNodes.length;
	for(i=0;i<tabNumber;i++){
			document.getElementById(tabName+"_div_"+i).style.display = "none";
			document.getElementById(tabName+"_btn_"+i).className = "";
		};
		document.getElementById(tabName+"_div_"+id).style.display = "block";
		btn.className = "curr";
};

function ShowNewImg(sDate1, sDate2){
	var aDate, oDate1, oDate2, iDays 
	aDate = sDate1.split("-") 
	oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为12-18-2002格式 
	aDate = sDate2.split("-") 
	oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) 
	iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24) //把相差的毫秒数转换为天数 

	if (iDays < 3 && iDays >= 0 )
	{
		document.write("<img src='/skin/default/images/news_bz.gif'/>")
	}
};