<html>
<head>
<title></title>
<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
<link href="./theme000.css" rel="stylesheet" type="text/css" />
</head>
<body>

 
<?php
include_once("CalenderBase.php");
		
	
	


	//// 甲子。 乙丑。 丙寅。 丁卯。 戊辰。 己巳。 庚午。十月。 辛未。 壬申。 癸酉。 食 月㞢食 好 旬 歲 年
	$chas = "𡧊貞㱿爭";//亘𤰈韋內永王㱿大小旬日雨雪雹年歲祀好食春夏秋冬黍星千百巫告西南北翌至元示永貞卜商受祭";
	echo "Key Char:" . $chas . "<br>";
	$cha2arr = str_split($chas,4);
	foreach($cha2arr as $i=>$ch){
		//echo "Key Char:" . $ch . "<br>";
		//$t1 = new CalenderTarget($ch);
		//$t1->main();
	}

$t1 = new CalenderTarget("祀");
		$t1->main();
		

$t1 = new CalenderTarget("歲");
		$t1->main();


$t1 = new CalenderTarget("年");
		$t1->main();

		
		
		
		
$t1 = new CalenderTarget("𡧊");
		$t1->main();

$t1 = new CalenderTarget("貞");
		$t1->main();


$t1 = new CalenderTarget("㱿");
		$t1->main();

$t1 = new CalenderTarget("爭");
		$t1->main();
		
		$t1 = new CalenderTarget("𡧊");
		$t1->main();

$t1 = new CalenderTarget("亘");
		$t1->main();


$t1 = new CalenderTarget("𤰈");
		$t1->main();

$t1 = new CalenderTarget("韋");
		$t1->main();
		
		
		
		
		
		
?>


</body>
</html>
