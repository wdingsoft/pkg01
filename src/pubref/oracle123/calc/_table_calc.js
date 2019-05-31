$(document).ready(function(){

 //alert( $("table:eq(0) tr:first-child td:eq("+10+ ")").text() );


  $("table:eq(5) tr:eq(1) td").each(function(i){
      if( i > 0 && i <16 ){
         //var dat = $("table:eq(0) tr:eq(62) td:eq("+ (1+i) + ")").text();
         //$(this).text( dat );
      };
  });


Table_Calc_Total();

////Table_Calc_Tot({RowStart:2,RowStop:8,ColStart:2, ColStop:30, DestRow:9});

});//ready
function Table_Calc_Tot(parms){
//sample:Table_Calc_Tot({RowStart:2,RowStop:8,ColStart:2, ColStop:30, DestRow:9});
    for(var iCol=parms.ColStart; iCol<=parms.ColStop;iCol+=1){
        Table_Calc_Tot_Col(iCol,parms);
    }
}
function Table_Calc_Tot_Col(col,parms){
    var Tot=0;
    for(var iRow=parms.RowStart; iRow<=parms.RowStop;iRow+=1){
        var td=$( "table:eq(0)" +" tr:eq("+iRow+") td:eq("+col+")").text();
        Tot += parseInt(td) ;
    }
    $( "table:eq(0)" +" tr:eq("+parms.DestRow+") td:eq("+col+")").text(Tot);
}







function Table_Calc_Total(){
  var TotArr=[];
  for(var i=0;i<33;i+=1) TotArr[i]=0;
  var TotTrObj;
  console.log("Table_Calc_Total");
  $( "table:eq(0)" +" tr").each(function(iRow){
        TotTrObj=$(this);
      if(iRow>=2){
        $(this).find("td").each(function(kCol){
           var td = $(this).text();
           console.log("tr="+iRow+",td="+kCol+",td="+td);
           if("Tot"==td){
           }
           if(kCol>1 && td.length>0){
                TotArr[kCol]+=parseInt(td) ;
           }
        });
      }
  });
  
  $(TotTrObj).find("td").each(function(kCol){
        console.log("Table_Total ="+kCol);
        if(kCol>1){
                console.log("Table_Calc_Total ="+kCol);
                $(this).text(TotArr[kCol]);
        }
  });
  
}//////////cpySrc2DestTable
