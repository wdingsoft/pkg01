//file:all_month_frq.js

        $(document).ready(function(){
            //Table_Calc_Tot({RowStart:2,RowStop:8,ColStart:2, ColStop:30, DestRow:9});
            $("td").click(function(){
                $(this).css("background-color","yellow");
            });
            
			$("#rate_row").text("---start---");
			$("#rate_row").click(function(){
                var retRow = rate_row();
				$(this).text("retRow="+retRow);
			});
        });//ready////
		
		
		
		
		function rate_row_i(irow ){
            var Max=-1;
            var tdObjMax;
			$("table:eq(1) tr:eq(" + irow + ")").find("td").each(function(i){
                if(11==i){
                    $(this).css("background-color","grey");
                 }            
				if( i>=2 && i<=15){

					var td=$(this).text();
					if(td.length>0){
						var iVal = $("table:eq(0) tr:eq(64) td:eq("+i+")").text();
						var iVal2 = parseInt(td)*100/parseInt(iVal)  ;
                        if(iVal2>=Max){
                            Max=iVal2;
                            tdObjMax = $(this);
                        }
						//console.log( "td="+td + ".iVal="+iVal+"="+iVal2);
						$(this).html(iVal2.toFixed(1));
					}
				}
			});
            
            $(tdObjMax).css("background-color","red");
		}
        function rate_row( ){
			var retRow=0;
			$("table:eq(1) tr").each(function(irow){
				retRow=irow;
                if(irow>=2){
                    var tdObjMax;
                    var Max=-1;
                    $(this).find("td").each(function(iCol){
                        if(11==iCol){
                            $(this).css("background-color","grey");
                        }            
                        if( iCol>=2 && iCol<15){
                            var td=$(this).text();
                            if(td.length>0){
                                var iVal = $("table:eq(0) tr:eq(64) td:eq("+iCol+")").text();
                                var iVal2 = parseInt(td)*100/parseInt(iVal)  ;
                                if(iVal2>=Max){
                                    Max=iVal2;
                                    tdObjMax = $(this);
                                }
                                //console.log( "td="+td + ".iVal="+iVal+"="+iVal2);
                                $(this).html(iVal2.toFixed(1));
                            }
                        }//if( iCol>=2 && iCol<=15){
                    });
                    $(tdObjMax).css("background-color","red");
                }//if(irow>=2){
            });
			return retRow;
		}
       