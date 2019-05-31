<?php

include_once("UtiCurl.php");



$ucs = new UtiCurl_Simpple();

$url="http://www.guoxue.com/book/shiji/0028.htm";
$filename="../curl_data/aaa.htm";
//$ucs->run($url, $filename);

//echo "<hr/>$filename";


for($i=1; $i<=120;$i++){
	$strn = sprintf("%04d",$i);
	echo $strn."<br>";
	$url="http://www.guoxue.com/book/shiji/$strn.htm";
	$filename="../curl_data/$strn.htm";
	echo $url. " ==> " . $filename . "<br>\n";
	$ucs->run($url, $filename);
	set_time_limit(0);
}



?>