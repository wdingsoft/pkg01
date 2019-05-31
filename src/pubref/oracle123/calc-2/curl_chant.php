<?php
class curl_test{

	public function curl_test(){

		$useragent = $_SERVER['HTTP_USER_AGENT'];
		$strCookie = 'PHPSESSID=' . $_COOKIE['PHPSESSID'] . '; path=/';
		session_write_close();
		

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, 'http://24.96.158.103/lamp/wroot/tool/_edit/explore?dir=../../../../');
		//curl_setopt($ch, CURLOPT_URL, 'http://www.chant.org/member_login/login.aspx');//http://www.chant.org/member_login/login.aspx
		curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
		curl_setopt($ch, CURLOPT_POST, false);
		curl_setopt($ch, CURLOPT_POSTFIELDS, "username=wding&password=admin&dir=../");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_COOKIESESSION, true);
		curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookie-name');  //could be empty, but cause problems on some hosts
		curl_setopt($ch, CURLOPT_COOKIEFILE, '/tmp/curlcookie.txt');  //could be empty, but cause problems on some hosts
		curl_setopt( $ch, CURLOPT_COOKIE, $strCookie );
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		
		$answer = curl_exec($ch);
		if (curl_error($ch)) {
			echo curl_error($ch);
		}
		//echo $answer;
		//another request preserving the session
		//die("");
		curl_setopt($ch, CURLOPT_URL, 'http://24.96.158.103/lamp/wroot/tool/_edit/explore/login/checkin.php?dir=../../');
		curl_setopt($ch, CURLOPT_REFERER, "http://24.96.158.103/lamp/wroot/tool/_edit/explore/login/checkin.php?dir=../../");

		//curl_setopt($ch, CURLOPT_URL, 'http://www.example.com/profile');
		curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0');
		curl_setopt($ch, CURLOPT_POSTFIELDS, "username=wding&password=admin&dir=../");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_COOKIESESSION, true);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookie-name');  //could be empty, but cause problems on some hosts
		curl_setopt($ch, CURLOPT_COOKIEFILE, '/tmp/curlcookie.txt');  //could be empty, but cause problems on some hosts
		curl_setopt($ch, CURLOPT_COOKIE, $strCookie );
		$answer = curl_exec($ch);
		if (curl_error($ch)) {
			echo curl_error($ch);
		}
		echo $answer;
	}
}//test

//$t=new curl_test();

//die("");






class curl_chant{

	public function curl_chant(){
		$filename="chant_member_login.htm";
		$data=file_get_contents($filename);
		//$this->getfields($data);
	}
	public function run(){
		$useragent = $_SERVER['HTTP_USER_AGENT'];
		$strCookie = 'PHPSESSID=' . $_COOKIE['PHPSESSID'] . '; path=/';
		session_write_close();


		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, 'http://www.chant.org/member_login/login.aspx');
		//curl_setopt($ch, CURLOPT_URL, 'http://www.chant.org/member_login/login.aspx');//http://www.chant.org/member_login/login.aspx
		curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
		curl_setopt($ch, CURLOPT_POST, false);
		//curl_setopt($ch, CURLOPT_POSTFIELDS, "username=wding&password=admin&dir=../");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_COOKIESESSION, true);
		curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookie-name');  //could be empty, but cause problems on some hosts
		curl_setopt($ch, CURLOPT_COOKIEFILE, '/tmp/curlcookie.txt');  //could be empty, but cause problems on some hosts
		curl_setopt($ch, CURLOPT_COOKIE, $strCookie );
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		//curl_setopt($ch, CURLOPT_AUTOREFERER, true);
		//curl_setopt($ch, CURLOPT_HEADER, true);

		$answer = curl_exec($ch);
		if (curl_error($ch)) {
			echo curl_error($ch);
		}
		
		$filename="chant_member_login.htm";
		file_put_contents($filename, $answer) ;
		//another request preserving the session
		$fields= $this->getfields($answer);
		file_put_contents($filename."2a", $fields) ;
		
		if(strlen($fields)===0)return;
		die("[$filename]$fields");
		
		curl_setopt($ch, CURLOPT_URL, 'http://www.chant.org/member_login/login.aspx');
		//curl_setopt($ch, CURLOPT_REFERER, "http://www.chant.org/member_login/login.aspx");

		//curl_setopt($ch, CURLOPT_URL, 'http://www.example.com/profile');
		//curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0');
		curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_COOKIESESSION, true);
		curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookie-name');  //could be empty, but cause problems on some hosts
		curl_setopt($ch, CURLOPT_COOKIEFILE, '/tmp/curlcookie.txt');  //could be empty, but cause problems on some hosts
		curl_setopt($ch, CURLOPT_COOKIE, $strCookie );
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		$answer = curl_exec($ch);
		if (curl_error($ch)) {
			echo curl_error($ch);
		}
		$filename="chant_member_logined.htm";
		file_put_contents($filename, $answer) ;
		echo $answer;
	}
	public function getfields($answer){
		if(strlen($answer)==0){
			echo "filesize=0";
		}
		//<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwUKLTI4NjcwNjY5Mw9kFgICAw9kFggCAQ9kFgICCQ8PFgIeBFRleHRlZGQCAg8PFgIeB1Zpc2libGVoZGQCAw8PFgIfAWhkZAIEDw8WAh8BaGRkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYDBQxJbWFnZUJ1dHRvbjEFDEltYWdlQnV0dG9uMgUMSW1hZ2VCdXR0b24zOhC0Rw/CFQ/jDjwucsUFMhkjJHU=" />
		
		$pattern="/[\s]__VIEWSTATE[\"][\s]value=[\"][\"a-zA-Z0-9\+\/]*/";
		$pattern="/__VIEWSTATE[\"]\svalue=\"/";
		$values="";
		$pattern="/__VIEWSTATE[\"]\svalue=\"([a-zA-Z0-9\r\n\+\/\s=]*)/";
		preg_match($pattern, $answer, $matches);
		if(count($matches)!=2){
			echo "<font color='red'>no match</font>";
			return "";
		}
		//print_r($matches);
		$data=$matches[1];
		$bret = base64_decode($data);
		echo $bret;
		if($bret){
			echo "<font color='green'>$data</font><hr>\n";
		}
		else{
			echo "<font color='red'>$data</font><hr>\n";
		}
		$ret =  "__VIEWSTATE=".$matches[1];
		$RetArr=array();
		$RetArr["__VIEWSTATE"]=$matches[1];
		
		
		$pattern="/__EVENTVALIDATION[\"]\svalue=\"([a-zA-Z0-9\r\n\+\/\s=]*)/";
		preg_match($pattern, $answer, $matches);
		$RetArr["__EVENTVALIDATION"]=$matches[1];
		$data=$matches[1];
		$bret = base64_decode($data);
		echo $bret;
		if($bret){
			echo "<font color='green'>$data</font><hr>\n";
		}
		else{
			echo "<font color='red'>$data</font><hr>\n";
		}
		
		$ret .=  "&". "__EVENTVALIDATION=". $matches[1];
		
		//echo $ret;
		$ret.="&TextBox2=jingclili&TextBox1=oracle123";
		echo "$ret<hr>\n";
		
		$RetArr["TextBox2"]="jingcili";
		$RetArr["TextBox1"]="oracle123";
		
		print_r($RetArr);
		
		$encode="";
		foreach($RetArr as $key=>$val){
			$encode .= urlencode($key)."=" . urlencode($val). "&";
		}
		echo $RetArr . "<hr>\n";
		return $encode;
	}
}//test



$t=new curl_chant();
$t->run();
die("");





$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://www.chant.org/member_login/login.aspx');
curl_setopt($ch, CURLOPT_URL, 'http://www.chant.org/member_login/login.aspx');
///curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/32.0.1700.107 Chrome/32.0.1700.107 Safari/537.36');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, "TextBox2=jincili&TextBox1=oracle123&__VIEWSTATE=/wEPDwUKLTI4NjcwNjY5Mw9kFgICAw9kFggCAQ9kFgICCQ8PFgIeBFRleHRlZGQCAg8PFgIeB1Zpc2libGVoZGQCAw8PFgIfAWhkZAIEDw8WAh8BaGRkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYDBQxJbWFnZUJ1dHRvbjEFDEltYWdlQnV0dG9uMgUMSW1hZ2VCdXR0b24zOhC0Rw/CFQ/jDjwucsUFMhkjJHU=&__EVENTVALIDATION=/wEWBgLB9PfPCwLs0fbZDALs0bLrBgLSwpnTCALSwtXkAgLSwsGJCsxqL+ZTj4pKeKtsXLsOPH7LRo/e");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_COOKIESESSION, true);
curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookie-name');  //could be empty, but cause problems on some hosts
curl_setopt($ch, CURLOPT_COOKIEFILE, '/var/www/tmp/');  //could be empty, but cause problems on some hosts
$answer = curl_exec($ch);
if (curl_error($ch)) {
	echo curl_error($ch);
}
echo $answer;
//another request preserving the session
die("");
curl_setopt($ch, CURLOPT_URL, 'http://www.example.com/profile');
curl_setopt($ch, CURLOPT_POST, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, "");
$answer = curl_exec($ch);
if (curl_error($ch)) {
	echo curl_error($ch);
}




?>