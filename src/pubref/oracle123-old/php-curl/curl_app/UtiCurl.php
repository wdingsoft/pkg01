<?php
class UtiCurl_Simpple{
	public function run($url, $filename){

		$useragent = $_SERVER['HTTP_USER_AGENT'];
		$strCookie = 'PHPSESSID=' . $_COOKIE['PHPSESSID'] . '; path=/';
		session_write_close();
		

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		//curl_setopt($ch, CURLOPT_URL, 'http://www.chant.org/member_login/login.aspx');//http://www.chant.org/member_login/login.aspx
		curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
		curl_setopt($ch, CURLOPT_POST, false);
		//curl_setopt($ch, CURLOPT_POSTFIELDS, "username=wding&password=admin&dir=../");
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
		//echo
		echo strlen($answer) . "(b)";
		$ret = file_put_contents($filename, $answer);
		echo $ret;
	}
}//test



?>