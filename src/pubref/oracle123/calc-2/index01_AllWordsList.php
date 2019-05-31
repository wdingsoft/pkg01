<html>
<head>
<title></title>
<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
<link href="./theme000.css" rel="stylesheet" type="text/css" />
</head>
<body><font face='chant'>

 
<?php
include_once("CalenderBase.php");
	echo "Type of months<br>";
	$ca = new Calendar_TypesOfMonths();
	$ca->main();
	echo "<hr/>";
	
	$sf = new AllWordsList();
	$sf->main();
	echo "<hr/>";
	
	exit(0);
		
	
	

?>

</font>
</body>
</html>
