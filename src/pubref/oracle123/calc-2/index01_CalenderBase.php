<html>
<head>
<title></title>
<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
<link href="./theme000.css" rel="stylesheet" type="text/css" />
</head>
<body>

 
<?php
include_once("CalenderBase.php");
		
	
	
	//$sf = new KeyPhraseFinder("月");
	//$sf->main();
	//echo "<hr/>";
	//exit(0);

	$cb = new CalenderBase();
	$cb->main();
	
	$chas = "雨";
	echo "Key Char:" . $chas . "<br>";
	$cha2arr = str_split($chas,3);
	foreach($cha2arr as $i=>$ch){
		$t1 = new CalenderTarget($ch);
		$t1->main();
	}	
	

	function AnyDateIn14Month($dateMod, $yearMax, $daysOf1year){
		$ret="";
		$Count=0;
		$floatDay = $daysOf1year - 365;
		$totAccuPrev=0;
		for($n=1;$n<$yearMax;$n+=1){
			$mod = ($daysOf1year * $n )%60;
			$totAccu = intval ($floatDay * $n);
			
			$bCalary=0;
			if($totAccu != $totAccuPrev){
				$totAccuPrev = $totAccu;
				$bCalary = 1;
			}
			//echo $n;
			if($dateMod===$mod ){
				if(1===$bCalary){
					$ret .= "[$n] ";
					$Count+=1;
				}
				else{
					$ret .= "($n) ";
				}
			}
		}
		echo "$daysOf1year=>(mod=$dateMod)=>(count=$Count)<br>$ret<hr/>";
	}
	


	
	for($mod=0;$mod<=60;$mod+=1){
		AnyDateIn14Month( $mod, 1000,  365.24);
		AnyDateIn14Month( $mod, 1000,  365.242);
		AnyDateIn14Month( $mod, 1000,  365.25);
	}
	exit(0);

	//// 甲子。 乙丑。 丙寅。 丁卯。 戊辰。 己巳。 庚午。十月。 辛未。 壬申。 癸酉。 食 月㞢食 好 旬 歲 年
	$chas = "大小旬日雨雪雹年歲好食春夏秋冬黍星千百巫告西南北翌至元示永貞卜商受祭";
	echo "Key Char:" . $chas . "<br>";
	$cha2arr = str_split($chas,3);
	foreach($cha2arr as $i=>$ch){
		$t1 = new CalenderTarget($ch);
		$t1->main();
	}




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
