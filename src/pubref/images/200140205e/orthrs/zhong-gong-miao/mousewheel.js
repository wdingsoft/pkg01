(function(H){H.fn.drag=function(K,J,I){if(J){this.bind("dragstart",K)}if(I){this.bind("dragend",I)}return !K?this.trigger("drag"):this.bind("drag",J?J:K)};var D=H.event,B=D.special,F=B.drag={not:":input",distance:0,setup:function(I){I=H.extend({distance:F.distance,not:F.not},I||{});I.distance=G(I.distance);D.add(this,"mousedown",E,I)},teardown:function(){D.remove(this,"mousedown",E);if(this===F.dragging){F.dragging=F.proxy=null}C(this,true)}};function E(K){var J=this,I,L=K.data||{};if(J===document){K.dragTarget=J=L.elem;K.dragProxy=F.proxy||J;K.cursorOffsetX=L.pageX-L.left;K.cursorOffsetY=L.pageY-L.top;K.offsetX=K.pageX-K.cursorOffsetX;K.offsetY=K.pageY-K.cursorOffsetY}else{if(F.dragging||K.which!=1||H(K.target).is(L.not)){return }}switch(K.type){case"mousedown":H.extend(L,H(J).offset(),{elem:J,target:K.target,pageX:K.pageX,pageY:K.pageY});D.add(document,"mousemove mouseup",E,L);C(J,false);return false;case !F.dragging&&"mousemove":if(G(K.pageX-L.pageX)+G(K.pageY-L.pageY)<L.distance){break}K.target=L.target;I=A(K,"dragstart",J);if(I!==false){F.dragging=J;F.proxy=K.dragProxy=H(I)[0]||J}case"mousemove":if(F.dragging){I=A(K,"drag",J);if(B.drop){B.drop.allowed=(I!==false);B.drop.handler(K)}if(I!==false){break}K.type="mouseup"}case"mouseup":D.remove(document,"mousemove mouseup",E);if(F.dragging){if(B.drop){B.drop.handler(K)}A(K,"dragend",J)}C(J,true);F.dragging=F.proxy=null;break}}function A(K,I,J){K.type=I;return D.handle.call(J,K)}function G(I){return Math.pow(I,2)}function C(J,I){if(!J){return }J.unselectable=I?"off":"on";J.onselectstart=function(){return I};if(J.style){J.style.MozUserSelect=I?"":"none"}}})(jQuery);

(function($){$.event.special.mousewheel={setup:function(){var handler=$.event.special.mousewheel.handler;if($.browser.mozilla)$(this).bind('mousemove.mousewheel',function(event){$.data(this,'mwcursorposdata',{pageX:event.pageX,pageY:event.pageY,clientX:event.clientX,clientY:event.clientY});});if(this.addEventListener)this.addEventListener(($.browser.mozilla?'DOMMouseScroll':'mousewheel'),handler,false);else
this.onmousewheel=handler;},teardown:function(){var handler=$.event.special.mousewheel.handler;$(this).unbind('mousemove.mousewheel');if(this.removeEventListener)this.removeEventListener(($.browser.mozilla?'DOMMouseScroll':'mousewheel'),handler,false);else
this.onmousewheel=function(){};$.removeData(this,'mwcursorposdata');},handler:function(event){var args=Array.prototype.slice.call(arguments,1);event=$.event.fix(event||window.event);$.extend(event,$.data(this,'mwcursorposdata')||{});var delta=0,returnValue=true;if(event.wheelDelta)delta=event.wheelDelta/120;if(event.detail)delta=-event.detail/3;if($.browser.opera)delta=-event.wheelDelta;event.data=event.data||{};event.type="mousewheel";args.unshift(delta);args.unshift(event);return $.event.handle.apply(this,args);}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel");},unmousewheel:function(fn){return this.unbind("mousewheel",fn);}});})(jQuery);

var jq=jQuery;
function mouseRoll(divid){
	this.emId=divid;
	
	var	img_roll=jq("#"+this.emId+" .img_mid"),
		img_left=jq("#"+this.emId+" .img_left img"),
		img_right=jq("#"+this.emId+" .img_right img"),
		w0=128;
		img_roll.each(function(inx,roll){
			roll=jq(roll);
			var inc=jq('<div class="inc_roll"/>').appendTo(roll);
			inc.append(roll.find(">*:first"));
			var lis=inc.find("li");
			var len=lis.length;
			var ul=inc.find("ul");
			var licur=inc.find("li.cur");
			ul.css("width",len*w0+"px");
			var w=[roll[0].offsetWidth,len*w0];
			var mo=200,
				curr=0,
				li_p=0,
				mo_l=7,
				ul_ml=0;
			var is_m=false;
			lis.each(function(i,li){
				li=jq(li);
				/*li.hover(function(){
						jq(this).find(".pic").animate({"marginTop":0},{'duration':mo})
					},function(){
						jq(this).find(".pic").animate({"marginTop":(-69)},{'duration':mo});				
					});*/
				if(li.hasClass("cur")){
					li.hover(function(){
						jq(this).find(".pic").animate({"marginTop":(-69)},{'duration':mo})
					},function(){
						jq(this).find(".pic").animate({"marginTop":0},{'duration':mo});				
					});
				}
				else{
					li.hover(function(){
						jq(this).find(".pic").animate({"marginTop":0},{'duration':mo})
					},function(){
						jq(this).find(".pic").animate({"marginTop":(-69)},{'duration':mo});				
					});
				}
			});
			
			
			
			if(w[0]-w[1]>=0) return;
			var bar_roll=jq('<div class="bar_roll"><s></s><i><b><b><b></b></b></b></i></div>').appendTo(roll),
				s=bar_roll.find("s"),
				btn=bar_roll.find("i");
			inc.css("width",w[0]+"px");
			bar_roll.css("width",(w[0]-6)+"px");
			s.css("width",(w[0]-6)+"px");
			jq(jq.dir(btn[0],"firstChild").pop()).css("width",(w[0]*w[0]/w[1]-8)/2+"px");
			
			var btnXW=[0,bar_roll[0].offsetWidth-btn[0].offsetWidth],
				sRate=Math.min(1,btnXW[1]/(w[1]-w[0])),
				wheel=-45*sRate;
			
			function leng(index){
				if(index<=0) index=0;
				if(index>=len-7) index=len-7;
				if(!is_m){
					is_m=true;
					inc.animate({'scrollLeft':index*w0},{"duration":mo,"complete":function(){
					is_m=false;
					}});
					li_p=index;
					ul_ml=index*w0;
					if(btn.css("left")>btnXW[1]){return btn.css("left",btnXW[1]);}
					btn.css("left",index/(len-7)*btnXW[1]+"px");						
				}
				
			}
			
			
			var darg_posW=null,
				drag_left=null;
			btn.bind("dragstart",function(ev){
				drag_posW=ev.offsetX;
				drag_left=parseInt(btn.css("left"));
			}).bind("drag",function(ev){
				var offsetX=ev.offsetX-drag_posW;
				var left=Math.max(btnXW[0],Math.min(btnXW[1],offsetX+drag_left));				
				var val=Math.floor((left/btnXW[1])*(len-7));
				leng(val);
			})
			
			function sat(obj){
				var e=obj.offsetLeft;
				if(obj=obj.offsetParent){
					e+=obj.offsetLeft;
				}
				return e;
			}
			s.css("cursor","pointer");
			s.click(function(event){
				var left_ago=sat(this);
				var left_now=Math.min(btnXW[1],(event.pageX||event.screenX)-left_ago);
				var val=Math.floor((left_now/btnXW[1])*(len-7));
				leng(val);
			});
			
			function roll_(val,page){
				page=page||mo_l;
				leng(li_p+val*page);
				//var left=Math.ceil(ul_ml/(w[1]-w[0])*btnXW[1]);
			}
			
			img_left.click(function(){
				img_left.css("cursor","pointer");
				roll_(-1);
				});
			
			img_right.click(function(){
				img_right.css("cursor","pointer");
				roll_(1);
				})
				
			roll.mousewheel(function(ev,delta){
				var btnLeft=parseInt(btn.css("left"))||0;
				if((btnLeft==btnXW[0]&&delta>0)||btnLeft==btnXW[1]&&delta<0) return true;
					var btnLeft;
				if(delta<0){
					btnLeft=Math.max(btnXW[0],Math.min(btnXW[1],btnLeft+wheel*delta+50));
				}else{btnLeft=Math.max(btnXW[0],Math.min(btnXW[1],btnLeft+wheel*delta))}	
					var val=Math.floor(btnLeft/btnXW[1]*(len-7));
					leng(val);
				return false;
			});
			
		});
}

