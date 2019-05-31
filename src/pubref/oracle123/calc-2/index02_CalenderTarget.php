<html>
<head>
<title></title>
<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
<link href="./theme000.css" rel="stylesheet" type="text/css" />
</head>
<body>

 
<?php
include_once("CalenderBase.php");
		
	
	



	
	//exit(0);

	//// 甲子。 乙丑。 丙寅。 丁卯。 戊辰。 己巳。 庚午。十月。 辛未。 壬申。 癸酉。 食 月㞢食 好 旬 歲 年
	$chas = "大小旬日雨雪雹年歲好食春夏秋冬黍星千百巫告西南北翌至元示永貞卜商受祭災牛牝牡牢犬羊羌羞萑虎豕隹隻雀馬魚鹿麋麓黽龍鬥門鬼風行祖祭用王生往帚尤夕史勿出其來令今人亡于㱿";
	echo "Key Char:" . $chas . "<br>";
	$cha2arr = str_split($chas,3);
	foreach($cha2arr as $i=>$ch){
		$t1 = new CalenderTarget();
		$t1->SetTarget($ch);
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
