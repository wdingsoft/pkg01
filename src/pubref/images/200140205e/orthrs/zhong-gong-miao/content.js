

//========================= 设置字体大中小 start =============
function doZoom(size){
	/*var artibody = document.getElementById("artibody");
	if(!artibody){
		return;
	}
	var artibodyChild = artibody.childNodes;
	artibody.style.fontSize = size + "px";
	//再对artibody div内的直接html节点设置fontSize属性
	for(var i = 0; i < artibodyChild.length; i++){
		if(artibodyChild[i].nodeType == 1){
			artibodyChild[i].style.fontSize = size + "px";
		}
	}*/
	var artibody = document.getElementById("artibody");
	artibody.className = "blkContainerSblkCon blkContainerSblkCon_" + size;
}
//========================= 设置字体大中小 end =============

//========================= 打印正文部分 start =============
//print js begin
function LoadPrintJsCallBack(){
  if(typeof forSPrint == "object" && forSPrint.Print){
    forSPrint.Print();
  }
}
function LoadPrintJs(){


  var jsFile = "http://www.cctv.com/nettv/js/print_cctv.js";  //打印主js文件url
  jsFile += "?t="+ (new Date()).getTime();
  
  var js = document.createElement("script");
  js.setAttribute("src",jsFile); 
  js.setAttribute("type","text\/javascript");

  js.setAttribute( "id", "cntvPrintJsUrl");

  js.onreadystatechange = function(){
  if(js.readyState=="loaded"){
     LoadPrintJsCallBack();
  }
};
//for ff
js.onload = LoadPrintJsCallBack;
  document.body.insertBefore(js,null); // null for ff
}


//print js end
//========================= 打印正文部分 end =============

