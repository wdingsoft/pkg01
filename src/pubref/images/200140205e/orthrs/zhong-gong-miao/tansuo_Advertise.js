//if(video_CHANNEL == null) {video_CHANNEL = "";}
//if(sorts == null) {sorts = "";}
if(typeof(dfp_subsite)=='undefined'){
	var dfp_subsite=location.href.split("/")[2].split(".cntv.cn")[0];	//subsiteÖµ
}
var ad_Curtain = "";
var ad_BG = "";
var ad_Roll = "";
var ad_Call = "";
var call_code = "";
var ad_Pause = "";
var ad_After = "";
var ad_Corner = "";
var isPlay3rdAd = "";
var ad_Calls = "";//DFPÇ°Ìù
//var channelId_code='860010-1212010100';
if(typeof(video_ad_channel_id)=='undefined'){
	var video_ad_channel_id="";
}


var mydomainname=window.location.href.split('.')[0];

if (mydomainname=='http://chunwan' || mydomainname=='http://wlchunwan'){
    //ad_Call = "http://d.cntv.cn/forward.nghtml?site=cntv%26video=forward%26smartcount=1%26page_group=dianbo%26subsite="+chnl_domain+"%26CHANNEL="+chnl_domain+"%26sorts="+video_ad_primary_column_id.substr(0,6);
	ad_Calls = "http://pubads.g.doubleclick.net/gampad/adx?iu=/8962/web_cntv/dicengye_qiantiepian1&sz=7x1&c="+new Date().getTime()+"&m=text/xml&t=page_group%3Ddianbo%26subsite%3D"+dfp_subsite+"%26CHANNEL%3D"+chnl_domain+"%26sorts%3D"+video_ad_primary_column_id.substr(0,6)
   + "{!@#}" + "http://pubads.g.doubleclick.net/gampad/adx?iu=/8962/web_cntv/dicengye_qiantiepian2&sz=7x2&c="+new Date().getTime()+"&m=text/xml&t=page_group%3Ddianbo%26subsite%3D"+dfp_subsite+"%26CHANNEL%3D"+chnl_domain+"%26sorts%3D"+video_ad_primary_column_id.substr(0,6);
}else {
	//ad_Call = "http://d.cntv.cn/html.ng/locgeo=1%26site=cntv%26video=forward%26smartcount=1%26page_group=dianbo%26subsite="+chnl_domain+"%26CHANNEL="+video_ad_channel_id+"%26sorts="+video_ad_primary_column_id.substr(0,6);
	ad_Calls = "http://pubads.g.doubleclick.net/gampad/adx?iu=/8962/web_cntv/dicengye_qiantiepian1&sz=7x1&c="+new Date().getTime()+"&m=text/xml&t=page_group%3Ddianbo%26subsite%3D"+dfp_subsite+"%26CHANNEL%3D"+video_ad_channel_id+"%26sorts%3D"+video_ad_primary_column_id.substr(0,6)
   + "{!@#}" + "http://pubads.g.doubleclick.net/gampad/adx?iu=/8962/web_cntv/dicengye_qiantiepian2&sz=7x2&c="+new Date().getTime()+"&m=text/xml&t=page_group%3Ddianbo%26subsite%3D"+dfp_subsite+"%26CHANNEL%3D"+video_ad_channel_id+"%26sorts%3D"+video_ad_primary_column_id.substr(0,6);
}

	//ad_Curtain = "";
	//ad_BG = "http://d.cntv.cn/html.ng/locgeo=1%26site=cntv%26video=background%26smartcount=1%26page_group=dianbo%26subsite="+chnl_domain+"%26CHANNEL="+video_ad_channel_id+"%26sorts="+video_ad_primary_column_id.substr(0,6);
	//ad_Roll = "http://d.cntv.cn/html.ng/locgeo=1%26site=cntv%26video=zoumadeng%26smartcount=1%26page_group=dianbo%26subsite="+chnl_domain+"%26CHANNEL="+video_ad_channel_id+"%26sorts="+video_ad_primary_column_id.substr(0,6);
	//ad_Pause = "http://d.cntv.cn/html.ng/locgeo=1%26site=cntv%26video=pause%26smartcount=1%26page_group=dianbo%26subsite="+chnl_domain+"%26CHANNEL="+video_ad_channel_id+"%26sorts="+video_ad_primary_column_id.substr(0,6);
	//ad_After = "http://d.cntv.cn/html.ng/locgeo=1%26site=cntv%26video=ending%26smartcount=1%26page_group=dianbo%26subsite="+chnl_domain+"%26CHANNEL="+video_ad_channel_id+"%26sorts="+video_ad_primary_column_id.substr(0,6);
	//ad_Corner = "http://d.cntv.cn/html.ng/locgeo=1%26site=cntv%26video=jiaobiao%26smartcount=1%26page_group=dianbo%26subsite="+chnl_domain+"%26CHANNEL="+video_ad_channel_id+"%26sorts="+video_ad_primary_column_id.substr(0,6);
	ad_After =  "http://pubads.g.doubleclick.net/gampad/adx?iu=/8962/web_cntv/dicengye_houtiepian&sz=8x1&c="+new Date().getTime()+"&m=text/xml&t=page_group%3Ddianbo%26subsite%3D"+dfp_subsite+"%26CHANNEL%3D"+video_ad_channel_id+"%26sorts%3D"+video_ad_primary_column_id.substr(0,6);
	ad_Pause =  "http://pubads.g.doubleclick.net/gampad/adx?iu=/8962/web_cntv/dicengye_zanting&sz=1x1&c="+new Date().getTime()+"&m=text/xml&t=page_group%3Ddianbo%26subsite%3D"+dfp_subsite+"%26CHANNEL%3D"+video_ad_channel_id+"%26sorts%3D"+video_ad_primary_column_id.substr(0,6);
	ad_Corner =  "http://pubads.g.doubleclick.net/gampad/adx?iu=/8962/web_cntv/dicengye_jiaobiao&sz=1x1&c="+new Date().getTime()+"&m=text/xml&t=page_group%3Ddianbo%26subsite%3D"+dfp_subsite+"%26CHANNEL%3D"+video_ad_channel_id+"%26sorts%3D"+video_ad_primary_column_id.substr(0,6);
	ad_BG =  "http://pubads.g.doubleclick.net/gampad/adx?iu=/8962/web_cntv/dicengye_shipinbeijing&sz=1x1&c="+new Date().getTime()+"&m=text/xml&t=page_group%3Ddianbo%26subsite%3D"+dfp_subsite+"%26CHANNEL%3D"+video_ad_channel_id+"%26sorts%3D"+video_ad_primary_column_id.substr(0,6);
	ad_Wenzi =  "http://pubads.g.doubleclick.net/gampad/adx?iu=/8962/web_cntv/dicengye_kongzhitiaowenzi&sz=1x1&c="+new Date().getTime()+"&m=text/xml&t=page_group%3Ddianbo%26subsite%3D"+dfp_subsite+"%26CHANNEL%3D"+video_ad_channel_id+"%26sorts%3D"+video_ad_primary_column_id.substr(0,6);
	ad_Banner =  "http://pubads.g.doubleclick.net/gampad/adx?iu=/8962/web_cntv/dicengye_xuanfubanner&sz=1x1&c="+new Date().getTime()+"&m=text/xml&t=page_group%3Ddianbo%26subsite%3D"+dfp_subsite+"%26CHANNEL%3D"+video_ad_channel_id+"%26sorts%3D"+video_ad_primary_column_id.substr(0,6);
	
if (video_ad_channel_id == "CN33"){
    ad_Call = "";
    ad_Corner ="";
}

ad_Calls = encodeURIComponent(ad_Calls);ad_After = encodeURIComponent(ad_After);ad_Pause = encodeURIComponent(ad_Pause);ad_Corner = encodeURIComponent(ad_Corner);ad_BG = encodeURIComponent(ad_BG);ad_Wenzi = encodeURIComponent(ad_Wenzi);ad_Banner = encodeURIComponent(ad_Banner);