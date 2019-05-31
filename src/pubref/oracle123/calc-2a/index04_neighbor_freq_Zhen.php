<html>
<head>
<title></title>
<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
<link href="./theme000.css" rel="stylesheet" type="text/css" />
</head>
<body>

 
<?php
include_once("CalenderBase.php");


	
	$sf = new Neighbor_Frq();//AllWordsList_Ya();
	$sf->DataFileName="../calendar_srcripts/Months.txt";
	$sf->KeyChar="貞";
	$sf->iNeighborRange=array(-2,-1,1,2);
	echo "keyword:".$sf->KeyChar;
	$sf->main();
	echo "<hr/>";
	
	exit(0);
		
	
	

?>


</body>
</html>