<html>
<head>
<title></title>
<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
<link href="./theme000.css" rel="stylesheet" type="text/css" />
</head>
<body>

 
<?php
include_once("CalenderBase.php");

$key="其";
if( !isset($_REQUEST["keyword"]) ){
  echo("keyword not set. please use example ?keyword=$key <hr/>");
}
else{
  $key=$_REQUEST["keyword"];
}
	
	$sf = new Neighbor_Frq();//AllWordsList_Ya();
	$sf->DataFileName="../calendar_srcripts/Months.txt";
	$sf->KeyChar=$key;
	$sf->iNeighborRange=array(-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9);
	echo "keyword:".$sf->KeyChar;
	$sf->main();
	echo "<hr/>";
	
	exit(0);
		
	
	

?>


</body>
</html>