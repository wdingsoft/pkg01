<html>
<head>
		<title></title>
		<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
		<link href="../../../theme000.css" rel="stylesheet" type="text/css" />
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script src="./_table_calc.jsx"></script>
        <script>
        $(document).ready(function(){
            //Table_Calc_Tot({RowStart:2,RowStop:8,ColStart:2, ColStop:30, DestRow:9});
			$("#rate_row").click(function(){			
				for(var irow=2;irow<1000;irow+=1){
					rate_row(irow);
				}
			});
        });//ready////
		function rate_row(irow ){
			$("table:eq(1) tr:eq(" + irow + ")").find("td").each(function(i){
				if( i>=2 ){
					var td=$(this).text();
					if(td.length>0){
						var iVal = $("table:eq(0) tr:eq(64) td:eq("+i+")").text();
						var iVal2 = parseInt(td)*100/parseInt(iVal)  ;
						console.log( "td="+td + ".iVal="+iVal+"="+iVal2);
						$(this).html(td+"<br>"+Math.round(iVal2));
					}
				}
			});
		}
        </script>
</head>
<body>

<?php
include_once("CalenderBase.php");
		
	
	$cb = new CalenderBase();
	//$cb->main();



	

	$chas = "";///";

	$cha2arr = array(1041468,1041409,1041229,1037819,1039495, 1040451,1039048, 1041175,1039505,1041805,
	1037824,1039939,1037554,1037229,1036515,1038952,1039578,1039198,1039499,1041587,
	1039197,1040112,1036699,1040971,1037343,1037230,1041533,1040715,1040271,1040983,
	1040826,1041511,1037700,1038355,1039798,1038422,1041404,1037561,1037322,1038665,
	1040557,1041230,1039983);
    
	$cha2arr = file("../calendar_srcripts/Months_All_Chant_list.txt");
    $trs_Tm="";
    $trs_Head="";
	$t1 = new CalenderTarget_Topic();
	foreach($cha2arr as $i=>$tar){
		//set_time_limit(6000);
		if($i>0){
			$tar=trim($tar);
			echo $tar."<br>";
			if(strlen($tar)===0) break;
			$t1->SetTarget($tar);
			$t1->main();
			$trs_Tm .= $t1->trs_Tm;
			$trs_Head= $t1->trs_header;
		}
		
	}
    echo "<table border='1'><caption>$chas</caption>";
    echo $trs_Head;
    echo $trs_Tm;
    echo $t1->getEmptyTR();
    echo "</table>";




?>

<button id="rate_row">start</button>
 
</body>
</html>
