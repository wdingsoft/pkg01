

//========================= �����������С start =============
function doZoom(size){
	/*var artibody = document.getElementById("artibody");
	if(!artibody){
		return;
	}
	var artibodyChild = artibody.childNodes;
	artibody.style.fontSize = size + "px";
	//�ٶ�artibody div�ڵ�ֱ��html�ڵ�����fontSize����
	for(var i = 0; i < artibodyChild.length; i++){
		if(artibodyChild[i].nodeType == 1){
			artibodyChild[i].style.fontSize = size + "px";
		}
	}*/
	var artibody = document.getElementById("artibody");
	artibody.className = "blkContainerSblkCon blkContainerSblkCon_" + size;
}
//========================= �����������С end =============

//========================= ��ӡ���Ĳ��� start =============
//print js begin
function LoadPrintJsCallBack(){
  if(typeof forSPrint == "object" && forSPrint.Print){
    forSPrint.Print();
  }
}
function LoadPrintJs(){


  var jsFile = "http://www.cctv.com/nettv/js/print_cctv.js";  //��ӡ��js�ļ�url
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
//========================= ��ӡ���Ĳ��� end =============

