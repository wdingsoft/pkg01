	//开关灯
	function lights_on(){
		jQuery("body").css("background-color","#FFFFFF");

        jQuery(".b-tit").css("display",""); 
		jQuery(".cntv_topbar").css("display",""); 
		jQuery("#header").css("display",""); 
		jQuery("#crumb").css("display",""); 
		jQuery("#side").css("display",""); 
		jQuery("#main").css("display",""); 
        jQuery(".art-info").css("display","");

		jQuery(".lc_wi").css("display",""); 
		jQuery(".block").css("display","");
		jQuery(".FooterNav").css("display",""); 
		jQuery("#page_bottom").css("display","");
		 var address = window.location.href;
		if(address.indexOf('http://dianshiju.cntv.cn')>-1||address.indexOf('http://donghua.cntv.cn')>-1){
	     jQuery("#bgAd_div").css("display","");
		 jQuery(".yaodai").css("display",""); 
	 	}
		if(address.indexOf('http://jishi.cntv.cn')>-1|| address.indexOf('http://dianying.cntv.cn')>-1){
	     jQuery("#bgAd_div").css("display","");
		 jQuery("#bgAd_div").css("background-image","");
	     jQuery("#bgAdPlayer").css("display","");
		 jQuery(".yaodai").css("display",""); 
	 	}

	}
	
	function lights_off(){
		jQuery("body").css("background-color","#000");

		jQuery(".b-tit").css("display","none"); 
		jQuery(".cntv_topbar").css("display","none"); 
		jQuery("#header").css("display","none"); 
		jQuery("#crumb").css("display","none"); 
		jQuery("#side").css("display","none"); 
		jQuery("#main").css("display","none"); 
		jQuery(".art-info").css("display","none");

		jQuery(".lc_wi").css("display","none"); 
		jQuery(".block").css("display","none");
		jQuery(".FooterNav").css("display","none");
		jQuery("#page_bottom").css("display","none");
		var address = window.location.href;
		if( address.indexOf('http://dianshiju.cntv.cn')>-1||address.indexOf('http://donghua.cntv.cn')>-1){
	     jQuery("#bgAd_div").css("display","none");
		 jQuery(".yaodai").css("display","none"); 
	 	}
		if(address.indexOf('http://jishi.cntv.cn')>-1||address.indexOf('http://dianying.cntv.cn')>-1){
		jQuery("#bgAdPlayer").css("display","none");
		jQuery("#bgAd_div").css("background-image","url(http://www.cctv.com/download/teleplayvip/960540cntvbj100604.jpg)");
	     jQuery("#bgAd_div").css("display","block");
		 jQuery(".yaodai").css("display","none"); 
	 	}
	}

//获取url中传递过来的flag参数值

var flagValue="";
if(document.location.search!=""){
	if((document.location.search).split("=")[0].substring(1).toLowerCase()=="flag"){
		flagValue= (document.location.search).split("=")[1].substring(0,3);
	 }
}


var i=1;

var urlValue="";

//当url传递的flag参数不是off时，把相关链接下的flag=off参数去掉
if(flagValue.toLowerCase()!="off"){		
		while(document.getElementById("vide"+i)!=null){
			if(document.getElementById("vide"+i).href!=null){	  				
				if(document.getElementById("vide"+i).href.indexOf("?")>0){
					urlValue =document.getElementById("vide"+i).href.split("?")[0];
					document.getElementById("vide"+i).href= urlValue;
				}else{
					break;
				}
			}
			i++;
		}
} else{	  //当url传递的flag参数是off时 ，把相关链接下的flag=off参数加上
		while(document.getElementById("vide"+i)!=null){
			if(document.getElementById("vide"+i).href!=null){	  
				urlValue=document.getElementById("vide"+i).href+"?flag=off";
				//alert(urlValue);
				 document.getElementById("vide"+i).href= urlValue;
			}
			i++;
		}
 } 


//根据传过来得flag决定是否关灯

if(flagValue.toLowerCase()=="off"){
	lights_off();
}