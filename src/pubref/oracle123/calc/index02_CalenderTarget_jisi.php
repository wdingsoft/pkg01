<html>
<head>
		<title></title>
		<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
		<link href="../../../theme000.css" rel="stylesheet" type="text/css" />
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script src="./_table_calc.js"></script>
        <script>
        $(document).ready(function(){
            //Table_Calc_Tot({RowStart:2,RowStop:8,ColStart:2, ColStop:30, DestRow:9});
        });//ready
        </script>

</head>
<body>

 
<?php
include_once("CalenderBase.php");
		
	
	



	
	//exit(0);
//示祀祈祊祖祝祭
    //典冊 舟
	//// 甲子。 乙丑。 丙寅。 丁卯。 戊辰。 己巳。 庚午。十月。 辛未。 壬申。 癸酉。 食 月㞢食 好 旬 歲 年
	$chas = "示祀祈祊祖祝祭";
	echo "Key Char= " . $chas . "<br>";
	$cha2arr = str_split($chas,3);
    
    $trs_Tm="";
    $trs_Head="";
	foreach($cha2arr as $i=>$ch){
		$t1 = new CalenderTarget_Topic($ch);
		$t1->main();
        $trs_Tm .= $t1->trs_Tm;
        $trs_Head= $t1->trs_header;
	}
    echo "<table border='1'><caption>$chas</caption>";
    echo $trs_Head;
    echo $trs_Tm;
    echo $t1->getEmptyTR();
    echo "</table>";




	//$app = new App();
	//$app->test();


	echo "<hr/>\n";
	$y4_days=365.25*4;//1461;
	for($i=1;$i<=80;$i+=1){
    $mod=($y4_days*$i) % 60;
    echo "$i::$mod <br/>";
}
?>


</body>
</html>
