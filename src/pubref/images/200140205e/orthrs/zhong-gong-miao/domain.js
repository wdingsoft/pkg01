//全局变量


var ibugu="http://bugu.cntv.cn";
var enttv="http://ent.cntv.cn";
var dianying="http://dianying.cntv.cn";
var dianshiju="http://dianshiju.cntv.cn";
var tansuo="http://tansuo.cntv.cn";
var jilupian="http://jilu.cntv.cn";

var donghua="http://donghua.cntv.cn";
var yinshi="http://yinshi.cntv.cn";
var jiankang="http://jiankang.cntv.cn";
var aier="http://baby.cntv.cn";
var younibo="http://youpro.cntv.cn";


var pinglun="";
var dianji_url="http://ia.apps.cntv.cn/act/platform/showMsg.jsp";//点击量
var pingfen_url="http://ia.apps.cntv.cn/act/platform/subGrade.jsp";//打分
var dingcai_url="http://ia.apps.cntv.cn/act/platform/subDCGrade.jsp";//顶、踩
//var visitor_url="http://192.168.111.229:9080/act/platform/getVisitorInfo.jsp";//
//var paihang_url="http://192.168.111.229:9080/act/platform/getXml.jsp";//

var channelId="860010-1212010100";//三级页视频埋码
if (typeof (c_url)!="undefined"){
var domain_all_1 = c_url.substring(7);
var domain_all = domain_all_1.substring(0,domain_all_1.indexOf("/"));
var adCall="http://d.cntv.cn/html.ng/site=cntv%26video=forward%26smartcount=1%26page_group=dianbo%26subsite="+domain_all+"%26CHANNEL="+multiVariate.split(",")[0]+"%26sorts="+multiVariate.split(",")[7];//视频广告adcall
}


