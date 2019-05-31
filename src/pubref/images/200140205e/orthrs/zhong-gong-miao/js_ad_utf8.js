try{
	if (typeof CCTV !="object"){var CCTV={};}
	var isIE = document.all?true:false;
	if (typeof $ !="function"){function $(idI){return document.getElementById(idI);}}
}catch(er){}
var nums =0;
var nums_2 =0;
CCTV.AD=function(){
	this.getBodyTop=function(){
		return Math.max(document.body.scrollTop,document.documentElement.scrollTop);
	};
	this.getBodyHeight=function(){
		return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	};
	var selfObj=this;
	this.ltop=this.rtop=this.mtop=0;
	this.scrollDelay=80;
	this.popWinName="";
	this.popWinBaseUrl="/ad/pop_window.html";
	this.imgBtnCloseSrc="/ad/images/close_button.jpg";
	this.imgBtnCloseTextSrc="/ad/images/close_button_noimg.jpg";
	this.imgBtnReplaySrc="/ad/images/replay_btn.jpg";
	this.imgBtnReplayTextSrc="/ad/images/replay_btn_txt.jpg";
	this.imgBtnMdSrc="/ad/images/md_sm.jpg";
	this.imgBtnMbSrc="/ad/images/md_big.jpg";
	this.ins=[];
	//pop window
	this.addPopWin=function(src,w,h,dispTime){
		var stUrl=this.popWinBaseUrl+"?"+src;
		var curId=this.getNextId();
		this.ins[curId]={
			type:"popwin",
			id:curId,
			state:1//popwin is open and exist
		};
		var selfIns=this.ins[curId];
		selfIns.elm=window.open(stUrl,this.popWinName, "toolbar=no,location=no,directories=no,status=no,menub ar=no,scrollbar=no,resizable=no,copyhistory=yes,width="+w+",height="+h);
		try{
			selfIns.elm.moveTo(5,5);//it's a window
			if(dispTime){setTimeout("adIns.ins["+curId+"].elm.close();adIns.ins["+curId+"].state=3;",dispTime);}
		}catch(e){}
		return selfIns;
	};

	//fly block
	this.addFly=function(srcI,w,h){
		var curId=this.getNextId();
		this.ins[curId]={
			type:"fly",
			id:curId,
			state:1
		};
		var selfIns=this.ins[curId];
		var tagDiv=document.createElement("div");
		selfIns.elm=tagDiv;
		
		tagDiv.style.position="absolute";
		tagDiv.style.border="1px solid #ddd";
		tagDiv.style.overflow="hidden";
		tagDiv.style.width=w+"px";
		tagDiv.style.margin="0";
		tagDiv.style.padding="0";
		
		if(srcI.indexOf('.swf')==-1){//img
			var src2=srcI.split(",");
			var tagA=document.createElement("a");
			tagA.href=src2[1];
			tagA.target="_blank";
			tagA.style.margin="0";
			var tagImg=document.createElement("img");
			tagImg.src=src2[0];
			tagImg.width=w;
			tagImg.height=h;
			tagImg.style.border="none";
			tagImg.style.margin="0";
			tagImg.style.padding="0";
			tagDiv.appendChild(tagA);
			tagA.appendChild(tagImg);
		}else if(srcI.indexOf('.swf')!=-1){//flash
			flashTagIns.setNew(srcI,w,h);
			flashTagIns.setWmode("opaque");
			tagDiv.innerHTML=flashTagIns.toString();
		}
		document.body.appendChild(tagDiv);
		selfIns.dir={x:true, y:true};
		selfIns.elmRec={x:50, y:50, w:(selfIns.elm.offsetWidth), h:(selfIns.elm.offsetHeight)};
		selfIns.flyRec={t:0, r:0, b:0, l:0};
		selfIns.step=1;
		selfIns.delay=20;
		selfIns.timer=null;
		
		
		var float=function(){
			selfIns.flyRec.r = ((document.documentElement.clientWidth == 0)?document.body.clientWidth:document.documentElement.clientWidth)-selfIns.elmRec.w;
			selfIns.flyRec.b = ((document.documentElement.clientHeight == 0)?document.body.clientHeight:document.documentElement.clientHeight)-selfIns.elmRec.h;
			
			selfIns.elmRec.x += selfIns.step*(selfIns.dir.x?1:-1);
			selfIns.elmRec.y += selfIns.step*(selfIns.dir.y?1:-1);
			if (selfIns.elmRec.x < selfIns.flyRec.l) { selfIns.dir.x = true; selfIns.elmRec.x = selfIns.flyRec.l;}
			if (selfIns.elmRec.x > selfIns.flyRec.r) { selfIns.dir.x = false; selfIns.elmRec.x = selfIns.flyRec.r;}
			if (selfIns.elmRec.y < selfIns.flyRec.t) { selfIns.dir.y = true; selfIns.elmRec.y = selfIns.flyRec.t;}
			if (selfIns.elmRec.y > selfIns.flyRec.b) { selfIns.dir.y = false; selfIns.elmRec.y = selfIns.flyRec.b;}
			
			selfIns.elm.style.left = selfIns.elmRec.x + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) + "px";
			selfIns.elm.style.top = selfIns.elmRec.y + Math.max(document.documentElement.scrollTop, document.body.scrollTop) + "px";
		};
		
		selfIns.timer=setInterval(float, selfIns.delay);
		
		selfIns.elm.onmouseover=function(){clearInterval(selfIns.timer)};
		selfIns.elm.onmouseout=function(){selfIns.timer=setInterval(float, selfIns.delay);};
	};
	
	//float but not follow scroll
	this.addFloat=function(srcI,w,h,pos,top,btn){
		var curId=this.getNextId();
		this.ins[curId]={
			type:"float",
			id:curId,
			state:1
		};
		var selfIns=this.ins[curId];
		var tagDiv=document.createElement("div");
		selfIns.elm=tagDiv;
		tagDiv.style.position="absolute";
		tagDiv.style.border="1px solid #ddd";
		tagDiv.style.overflow="hidden";
		tagDiv.style.width=w+"px";
		tagDiv.style.margin="0";
		tagDiv.style.padding="0";
		if((typeof top)=='undefined'){top=0;}
		if(pos=="l"||!pos){//float left
			tagDiv.style.left="3px";
			tagDiv.style.top=(this.ltop+top).toString()+"px";
			this.ltop+=(btn?h+18:h)+top;
		}else if(pos=="r"){//float right
			tagDiv.style.right="3px";
			tagDiv.style.top=(this.rtop+top).toString()+"px";
			this.rtop+=(btn?h+18:h)+top;
		}
		document.body.appendChild(tagDiv);
		if(srcI.indexOf('.swf')==-1){//img
			var src2=srcI.split(",");
			var tagA=document.createElement("a");
			tagA.href=src2[1];
			tagA.style.margin="0";
			var tagImg=document.createElement("img");
			tagImg.src=src2[0];
			tagImg.width=w;
			tagImg.height=h;
			tagImg.style.border="none";
			tagImg.style.margin="0";
			tagImg.style.padding="0";
			tagDiv.appendChild(tagA);
			tagA.appendChild(tagImg);
		}else if(srcI.indexOf('.swf')!=-1){//flash
			flashTagIns.setNew(srcI,w,h);
			flashTagIns.setWmode("opaque");
			tagDiv.innerHTML=flashTagIns.toString();
		}
		///alert(tagDiv.style.display);
		if(btn){//add close button
			var tagImg2=document.createElement("img");
			tagDiv.appendChild(tagImg2);
			tagDiv.style.backgroundColor="#E2E9F3";
			selfIns.btnClose=tagImg2;
			tagImg2.src=selfObj.imgBtnCloseSrc;
			tagImg2.style.position="absolute";
			tagImg2.style.right=Math.round((w-50)/2)+"px";
			tagImg2.style.cursor="pointer";
			tagImg2.style.margin="0";
			tagImg2.style.top=h+"px";
			tagImg2.style.border="none";
			tagImg2.style.padding="0";
			tagImg2.onclick=function(){selfObj.closeInsSelf(selfObj.ins[curId]);};
			tagDiv.style.height=(h+18)+"px";
		}else{
			tagDiv.style.height=h+"px";
		}
		return selfIns;
	};
	this.addFloat_2=function(srcI,w,h,pos,top,btn){
		var screenSize = getScreenSize();
		//alert();
		nums =screenSize.height-(h+22);
		nums_2 = nums + 200;
		var curId=this.getNextId();
		this.ins[curId]={
			type:"float",
			id:curId,
			state:1
		};
		var selfIns=this.ins[curId];
		var tagDiv=document.createElement("div");
		selfIns.elm=tagDiv;
		tagDiv.style.position="absolute";
		tagDiv.style.border="1px solid #ddd";
		tagDiv.style.overflow="hidden";
		tagDiv.style.width=w+"px";
		tagDiv.style.margin="0";
		tagDiv.style.padding="0";
		if((typeof top)=='undefined'){top=0;}
		if(pos=="l"||!pos){//float left
			tagDiv.style.left="3px";
			tagDiv.style.top=nums+"px";
			this.ltop+=(btn?h+18:h)+top;
		}else if(pos=="r"){//float right
			tagDiv.style.right="3px";
			tagDiv.style.top=nums+"px";//////////////////////
			this.rtop+=(btn?h+18:h)+top;
		}
		document.body.appendChild(tagDiv);
		
		if(srcI.indexOf('.swf')==-1){//img
			var src2=srcI.split(",");
			var tagA=document.createElement("a");
			tagA.href=src2[1];
			tagA.style.margin="0";
			var tagImg=document.createElement("img");
			tagImg.src=src2[0];
			tagImg.width=w;
			tagImg.height=h;
			tagImg.style.border="none";
			tagImg.style.margin="0";
			tagImg.style.padding="0";
			tagImg.style.paddingTop="18px";
			tagDiv.appendChild(tagA);
			tagA.appendChild(tagImg);
		}else if(srcI.indexOf('.swf')!=-1){//flash
			flashTagIns.setNew(srcI,w,h);
			flashTagIns.setWmode("opaque");
			tagDiv.innerHTML=flashTagIns.toString();
		}
		///alert(tagDiv.style.display);
		if(btn){//add close button
			var tagImg2=document.createElement("img");
			tagDiv.appendChild(tagImg2);
			tagDiv.style.backgroundColor="#E2E9F3";
			selfIns.btnClose=tagImg2;
			tagImg2.src=selfObj.imgBtnCloseSrc;
			tagImg2.style.position="absolute";
			tagImg2.style.right=0+"px";
			tagImg2.style.cursor="pointer";
			tagImg2.style.margin="0";
			tagImg2.style.top=0+"px";
			tagImg2.style.border="none";
			tagImg2.style.padding="0";
			tagImg2.onclick=function(){selfObj.closeInsSelf(selfObj.ins[curId]);};
			tagDiv.style.height=(h+18)+"px";
			///22
			var tagImg3=document.createElement("img");
			tagDiv.appendChild(tagImg3);
			tagDiv.style.backgroundColor="#E2E9F3";
			selfIns.btnClose=tagImg3;
			tagImg3.src=selfObj.imgBtnMbSrc;
			tagImg3.style.position="absolute";
			tagImg3.style.right=50+"px";
			tagImg3.style.cursor="pointer";
			tagImg3.style.margin="0";
			tagImg3.style.top=0+"px";
			tagImg3.style.border="none";
			tagImg3.style.padding="0";
			tagImg3.onclick=function(){
			  //adIns.delScroll();
			  	var body_h =getScreenSize();
		if(nums>body_h.height-100){
			clearInterval(selfIns.timer)
			selfObj.moveInsSelf_s(selfObj.ins[curId]);}};
			tagDiv.style.height=(h+18)+"px";
			//33
			var tagImg4=document.createElement("img");
			tagDiv.appendChild(tagImg4);
			tagDiv.style.backgroundColor="#E2E9F3";
			selfIns.btnClose=tagImg4;
			tagImg4.src=selfObj.imgBtnMdSrc;
			tagImg4.style.position="absolute";
			tagImg4.style.right=68+"px";
			tagImg4.style.cursor="pointer";
			tagImg4.style.margin="0";
			tagImg4.style.top=0+"px";
			tagImg4.style.border="none";
			tagImg4.style.padding="0";
			tagImg4.onclick=function(){
			 //alert(selfObj.ins[curId].elm);
			 var body_2 =getScreenSize();
		if(nums<body_2.height-100){
			clearInterval(selfIns.timer)
			selfObj.moveInsSelf(selfObj.ins[curId]);
		}};
			tagDiv.style.height=(h+18)+"px";
			
		}else{
			tagDiv.style.height=h+"px";
		}
		return selfIns;
	};
	  function getScreenSize(){
      var w = 0;
      var h = 0;
      if( typeof( window.innerWidth ) == 'number' ) {
        w = window.innerWidth;
        h = window.innerHeight;
     } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
       w = document.documentElement.clientWidth;
       h = document.documentElement.clientHeight;
     } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
       w = document.body.clientWidth;
       h = document.body.clientHeight;
     }
     return {width:w,height:h};
   }
	//float and scroll
	this.addScroll=function(srcI,w,h,pos,top,btn,keepTime){
		var selfIns = this.addFloat(srcI,w,h,pos,top,btn);
		selfIns.type = "floatS";
		selfIns.keepTime=keepTime;
		selfIns.oriTop=parseInt(selfIns.elm.style.top);
		selfIns.timer=window.setInterval("adIns.doScroll()",this.scrollDelay);
		if (keepTime){
			window.setTimeout("adIns.delScroll()",keepTime);
		}
		return selfIns;
	};
	this.addScroll_2=function(srcI,w,h,pos,top,btn,keepTime){
		var selfIns = this.addFloat_2(srcI,w,h,pos,top,btn);
		selfIns.type = "floatS";
		selfIns.keepTime=keepTime;
		selfIns.oriTop=parseInt(selfIns.elm.style.top);
		selfIns.timer=window.setInterval("adIns.doScroll()",this.scrollDelay);
		if (keepTime){
			window.setTimeout("adIns.delScroll()",keepTime);
		}
		return selfIns;
	};
	//float scroll and scan
	this.addScrollScan=function(srcSide,wSide,hSide,posSide,topSide,srcCenter,wCenter,hCenter,topCenter,btn,keepTime){
		var selfIns = this.addScroll(srcSide,wSide,hSide,posSide,topSide,false);
		selfIns.type="floatSS";
		var tagDivMovie=document.createElement("div");
		selfIns.elmM=tagDivMovie;
		tagDivMovie.style.height=(hCenter+18)+"px";
		tagDivMovie.style.width=wCenter+"px";
		tagDivMovie.style.position="absolute";
		tagDivMovie.style.left = ((((document.documentElement.clientWidth == 0)?document.body.clientWidth:document.documentElement.clientWidth) - wCenter)/2).toString() + 'px';
		tagDivMovie.style.top=(this.mtop+(topCenter?topCenter:150))+"px";
		this.mtop+=(hCenter+18);
		document.body.appendChild(tagDivMovie);
		selfIns.oriTopM=parseInt(tagDivMovie.style.top);
		var tagImgCloseBtnM=document.createElement("img");
		tagDivMovie.appendChild(tagImgCloseBtnM);
		tagImgCloseBtnM.src=this.imgBtnCloseSrc;
		tagImgCloseBtnM.style.display="block";
		tagImgCloseBtnM.style.position="absolute";
		tagImgCloseBtnM.style.top="0px";
		tagImgCloseBtnM.style.right="0px";
		tagImgCloseBtnM.style.cursor="pointer";
		tagImgCloseBtnM.onclick=function(){
			selfObj.closeBigVideo(selfIns.id);
		};
		if(srcCenter.indexOf(".swf")==-1){//img
			var src2=srcI.split(",");
			var tagACenter=document.createElement("a");
			tagDivMovie.appendChild(tagACenter);
			tagACenter.href=src2[1];
			tagACenter.style.margin="0";
			var tagImgCenter=document.createElement("img");
			tagACenter.appendChild(tagImgCenter);
			tagImgCenter.src=src2[0];
			tagImgCenter.width=wCenter;
			tagImgCenter.height=hCenter;
			tagImgCenter.style.border="none";
			tagImgCenter.style.margin="0";
			tagImgCenter.style.padding="0";
		}else if(srcCenter.indexOf('.swf')!=-1){//flash
			var tagDivSwf=document.createElement("div");
			tagDivSwf.style.clear="both";
			tagDivSwf.style.position="absolute";
			tagDivSwf.style.top="18px";
			tagDivSwf.style.margin="0";
			tagDivSwf.style.padding="0";
			tagDivMovie.appendChild(tagDivSwf);
			flashTagIns.setNew(srcCenter,wCenter,hCenter);
			flashTagIns.setWmode("opaque");
			tagDivSwf.innerHTML=flashTagIns.toString();
		}
		//create button div
		var tagDivBtn=document.createElement("div");
		selfIns.elm.appendChild(tagDivBtn);
		tagDivBtn.style.margin="0";
		tagDivBtn.style.backgroundColor="#E2E9F3";
		tagDivBtn.style.padding="0";
		tagDivBtn.style.textAlign="center";
		selfIns.elm.style.height=(hSide+18)+"px";
		var tagImg=[];
		for (var i=0; i<3; i++){
			tagImg[i]=document.createElement("img");
			tagDivBtn.appendChild(tagImg[i]);
			var style_2=tagImg[i].style;
			style_2.cursor="pointer";
			style_2.border="none";
		}
		tagImg[0].src=this.imgBtnReplaySrc;//replay ico
		selfIns.btnReplay=tagImg[0];
		tagImg[1].src=this.imgBtnCloseTextSrc;
		selfIns.btnClose=tagImg[1];
		tagImg[2].src=this.imgBtnReplayTextSrc;//replay text
		tagImg[2].style.display="none";
		tagImg[0].onclick=function(){
			selfObj.openBigVideo(selfIns.id);
		};
		tagImg[0].onmouseover=function(){
			tagImg[1].style.display="none";
			tagImg[2].style.display="inline";
		};
		tagImg[0].onmouseout=function(){
			tagImg[2].style.display="none";
			tagImg[1].style.display="inline";
		};
		tagImg[1].onclick=function(){
			selfIns.elm.style.display="none";
		};
		selfIns.elm.style.display="none";
		setTimeout("adIns.closeBigVideo("+selfIns.id+");",(keepTime?keepTime:3000));
		return selfIns;
	};
	//a big area
	this.addShowMoment=function(srcI,w,h,keepTime){
		var curId=this.getNextId();
		this.ins[curId]={
			type:"showMoment",
			id:curId
		};
		var selfIns=this.ins[curId];
		var tagDiv=document.createElement("div");
		selfIns.elm=tagDiv;
		tagDiv.style.overflow="hidden";
		tagDiv.style.border="none";
		///tagDiv.style.border="1px solid #ddd";
		tagDiv.style.height=h+"px";
		tagDiv.style.width=w+"px";
		tagDiv.style.margin="0 auto";
		tagDiv.style.padding="0";
		document.body.appendChild(tagDiv);
		if(srcI.indexOf('.swf')==-1){//img
			var src2=srcI.split(",");
			var tagA=document.createElement("a");
			tagDiv.appendChild(tagA);
			tagA.href=src2[1];
			var tagImg=document.createElement("img");
			tagA.appendChild(tagImg);
			tagImg.src=src2[0];
			tagImg.width=w;
			tagImg.height=h;
			tagImg.style.border="none";
			tagImg.onload=function(){setTimeout("adIns.closeShowMoment("+curId+");",keepTime);};
		}else if(srcI.indexOf('.swf')!=-1){//flash
			flashTagIns.setNew(srcI,w,h);
			flashTagIns.setWmode("opaque");
			tagDiv.innerHTML=flashTagIns.toString();
			setTimeout("adIns.closeShowMoment("+curId+");",keepTime);
		}
		return selfIns;
	};
	//commom function
	this.getNextId=function(){return this.ins.length;};
	this.closeShowMoment=function(idI){
		document.body.removeChild(selfObj.ins[idI].elm);
		///adIns.ins[idI].elm.style.display="none";
	};
	this.closeBigVideo=function(idI){
		this.ins[idI].elmM.style.display="none";
		this.ins[idI].elm.style.display="block";
	};
	this.setTopBase=function(numb, pos){
		if(pos){
			switch(pos){
				case 'l': this.ltop=numb;
					break;
				case 'r': this.rtop=numb;
					break;
				case 'm': this.mtop=numb;
					break;
				default: this.ltop=this.rtop=this.mtop=numb;
			}
		}else{
			this.ltop=this.rtop=this.mtop=numb;
		}
	};
	this.openBigVideo=function(idI){
		this.ins[idI].elm.style.display="none";
		this.ins[idI].elmM.style.display="block";
		///this.ins[idI].movieElm.play();
	};
	this.closeAllFloat=function(obj,typeI){// close all float ad
		var Ins=obj.ins;
		var I=Ins.length;
		for(var i=0;i<I;i++){
			if(Ins[i].type==typeI){
				try{
					Ins[i].elm.style.display="none";
					clearInterval(Ins[i].timer);
				}catch(e){
					///alert(Ins);
				}
			}
		}
	};
	this.closeInsSelf=function(adSelfIns){
		document.body.removeChild(adSelfIns.elm);
		adSelfIns.state=3;
		///obj.style.display="none";
	};
	
	this.moveInsSelf=function(adSelfIns){
		
		nums=nums+202;
		adSelfIns.elm.style.top =nums+"px";
		timer=window.setInterval("adIns.doScroll()",this.scrollDelay)
	
	};
	this.moveInsSelf_s=function(adSelfIns){
		
	
		nums=nums-202;
		adSelfIns.elm.style.top =nums+"px";
		timer=window.setInterval("adIns.doScroll()",this.scrollDelay)
		
	};
	this.delScroll=function(){
		var maxId = this.getNextId();
		for (var i=0; i<maxId; i++){
			var Ins = this.ins[i];
			if (Ins.type=="floatS"){
				Ins.elm.style.top=Ins.oriTop + "px";
				window.clearInterval(Ins.timer);
			}
		}
	};
	this.doScroll=function(){
		var bodyTop = this.getBodyTop();
		
		var maxId = this.getNextId();
		for (var i=0; i<maxId; i++){
			var Ins = this.ins[i];
			if (((Ins.type).indexOf("floatS")!=-1)&&((Ins.state==1))){
				var newTop=bodyTop + nums;
				
				if(newTop>this.getBodyHeight()-Ins.elm.offsetHeight)
				{
					newTop=this.getBodyHeight()-Ins.elm.offsetHeight;
				}
				Ins.elm.style.top = '' + newTop + 'px';
				if (Ins.elmM)
				{
					
					newTop=bodyTop + Ins.oriTopM;
					if(newTop>this.getBodyHeight()-Ins.elmM.offsetHeight)
					{
						newTop=this.getBodyHeight()-Ins.elmM.offsetHeight;
					}
					Ins.elmM.style.top='' + newTop + 'px';
				}
			}
		}
	};
};
var adIns=new CCTV.AD();
///ad in 760
function adChuangkou(a0,a1){
	if (typeof(a1)!=undefined){
		adIns.addPopWin(a0,280,240,a1*1000);
	}else{
		adIns.addPopWin(a0,280,240);
	}
}
function adDuilian(a0){
	kEvent.addEvent(
		window,
		"load",
		function(){
			adIns.addFloat(a0,100,300,"l",5,true);
			adIns.addFloat(a0,100,300,"r",5,true);
		}
	);
}
function adDuilianSingleLeft(a0){
	kEvent.addEvent(
		window,
		"load",
		function(){
			adIns.addFloat(a0,100,300,"l",5,true);
		}
	);
}
function adDuilianSingleRight(a0){
	kEvent.addEvent(
		window,
		"load",
		function(){
			adIns.addFloat(a0,100,300,"r",5,true);
		}
	);
}
function adFubiao(a0,a1){
	kEvent.addEvent(
		window,
		"load",
		function(){
			if (a1 && ((a1=="l") || (a1=="r"))){
				adIns.addScroll(a0,100,200,a1,5,true);
			}else if(!a1){
				adIns.addScroll(a0,100,200,"l",5,true);
			}
		}
	);
}
function adFubiao_box(a0,a1){
	kEvent.addEvent(
		window,
		"load",
		function(){
			if (a1 && ((a1=="l") || (a1=="r"))){
				adIns.addScroll(a0,100,100,a1,5,true);
			}else if(!a1){
				adIns.addScroll(a0,100,100,"l",5,true);
			}
		}
	);
}
function adHuisuo(a0,a1,a2,a3){
	kEvent.addEvent(
		window,
		"load",
		function(){
			if (!a2){a2="l";}
			if (!a3){a3=3;}
			adIns.addScrollScan(a0,100,100,a2,5,a1,200,200,10,true, a3*1000);
		}
	);
}
function adFlyBlock(a0,a1,a2){
	kEvent.addEvent(
		window,
		"load",
		function(){
			adIns.addFly(a0, a1, a2);
		}
	);
}
function adQuanping(a0,a1){
	if (!a1){a1=3;}
	adIns.addShowMoment(a0,760,400,a1*1000);
}
function adFubiao_homepage_100x300(a0,a1){
	kEvent.addEvent(
		window,
		"load",
		function(){
			if ((a1=="l") || (a1=="r")){
				adIns.addScroll(a0,100,300,a1,5,true);
			}
		}
	);
}
function adFubiao_homepage_200x150(a0,a1){
	kEvent.addEvent(
		window,
		"load",
		function(){
			if ((a1=="l") || (a1=="r")){
				adIns.addScroll_2(a0,200,150,a1,5,true);
			}
		}
	);
}
///ad in 760 end