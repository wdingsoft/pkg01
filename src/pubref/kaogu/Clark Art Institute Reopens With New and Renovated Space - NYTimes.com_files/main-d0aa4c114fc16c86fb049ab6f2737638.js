define("ab/tests/bar1/bar1_sale_text_button_1114/main",["ab/vendor/jquery","ab/libs/utils","ab/libs/tracking_strategies/delegation_tracking_strategy","ab/libs/tracking_facade","ab/libs/test/strict_test","ab/libs/variation","ab/libs/engine/ga","ab/libs/tracker/event_tracker","ab/tests/bar1/bar1_sale_text_button_1114/config"],function(t,e,a,n,r,i,s,o,_){"use strict";var c=t(".masthead-tools, #Bar1, #memberTools"),b=e.inherits(r,{name:"bar1_sale_text_button_1114",restoreContainers:function(){t.getScript("http://graphics8.nytimes.com/marketing/ADX/bar1/bar1_eventtracker_v1_2.js"),t.getScript("http://graphics8.nytimes.com/marketing/abTest/addfloodlight_bar1.js"),c.removeClass("hidden")}}),l=[{selector:"#nyt-button-sub, #nyt-text-sub",category:"hover",eventType:"mouseover",action:"hover",label:"hovercarddisplay"}],g=e.inherits(i,{name:"control",trackOptions:[],changeDom:function(){c.prepend(e.Template("bar1_sale_text_button_1114__ctrl__html")).prepend(e.Template("bar1_sale_text_button_1114__ctrl__style")),this.logger.info("CONTROL has been applied.")},setTracking:function(t){t.setTracking(this.trackOptions.concat(l))}}),p=e.inherits(i,{name:"Variation1",trackOptions:[],changeDom:function(){c.prepend(e.Template("bar1_sale_text_button_1114__var1__html")).prepend(e.Template("bar1_sale_text_button_1114__var1__style")),this.logger.info("VAR1 has been applied.")},setTracking:function(t){t.setTracking(this.trackOptions.concat(l))}}),m=new s({experimentId:_.experimentId,component:"bar1",env:_.gaMode,variationId:s.getDebugVarFromUrl(_.gaMode)}),d=new o({expId:_.experimentId,testName:"Bar1_Holiday_Dec14",module:"Bar1"},{isLiteTracking:!0});m.getUid().done(function(t){d.setAttrs({UIDplatform:"Google",globalUID:t})});var u=new b({variations:[g,p],trackerFacade:new n({gua:m,evt:d}),engine:m,trackingStrategy:a});return u.runExperiment(),u});
//# sourceMappingURL=main.js.map