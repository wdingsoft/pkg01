<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8"><title>
?fname=
</title>
</head>
<body>

		(1)□□〔卜〕，㱿，<font color="#ff3300">貞</font><font color="#ff3300">王</font>大令眾人曰：〔<font face="chant" size="">󰪒</font>田，其〕受〔年〕。
        
        
        <hr/>
            
            
            
            <font face="chant" >(1)□□〔󽲙〕，󾂭，<font>󾖠</font><font color="#ff0000">󾍍</font>󽃣󽆛󽂂󽀀󽎭：〔󾍮󽰵，󾁃〕󾉗〔󽠉〕。</font>

 
<hr/><hr/> 
<font face="chant" >

<?php

$fname=$_REQUEST["fname"];
if(!isset($fname)){
    $fname="./Months.txt";
    echo "default  ?fname=$fname <hr/>";
}

$lines = file($fname);
foreach($lines as $k=>$line){
    echo "<br>".$line;
}


?>




</font>
                
   

</body></html>