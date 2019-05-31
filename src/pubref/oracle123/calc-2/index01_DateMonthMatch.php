<html>
<head>
<title></title>
<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
<link href="./theme000.css" rel="stylesheet" type="text/css" />
</head>
<body>

 
<?php
include_once("CalenderBase.php");
	
	
	
	$app = new DateMonthMap();
	$app->mapCalc();


	echo "<hr/>\n";
	$y4_days=365.25*4;//1461;
	for($i=1;$i<=80;$i+=1){
    $mod=($y4_days*$i) % 60;
    echo "$i::$mod <br/>";
}
?>


</body>
</html>
