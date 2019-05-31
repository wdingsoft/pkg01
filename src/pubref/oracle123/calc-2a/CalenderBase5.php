

<?php

// 甲子。 乙丑。 丙寅。 丁卯。 戊辰。 己巳。 庚午。十月。 辛未。 壬申。 癸酉。 食 月㞢食 好 旬 歲 年 雨



class CalenderBase{
	// 甲子。 乙丑。 丙寅。 丁卯。 戊辰。 己巳。 庚午。十月。 辛未。 壬申。 癸酉。 食 月㞢食 好 旬 歲 年
	public $HE="甲乙丙丁戊己庚辛壬癸";
	public $ER="子丑寅卯辰巳午未申酉戌亥";
	public $JZ=Array();
	public $MONTHS=Array( 14=>"十四月",13=>"十三月",12=>"十二月",11=>"十一月",10=>"十月",9=>"九月",8=>"八月",7=>"七月",6=>"六月",5=>"五月",4=>"四月",3=>"三月",2=>"二月",1=>"一月");

	public $OutMatrix=array();

	public $DataFileName="../calendar_srcripts/Months.txt";
	public function CalenderBase(){
		$this->MONTHS[]="正月";
		$this->MONTHS[]="生月";
		$this->MONTHS[]="今月";
		$this->MONTHS[]="木月";
		$this->MONTHS[]="茲月";
		$this->MONTHS[]="才月";
		$this->MONTHS[]="冬月";
		$this->MONTHS[]="正月";
		$this->MONTHS[]="㞢月";

		$this->MONTHS[]="夕月";
		$this->MONTHS[]="酉月";
		$this->MONTHS[]="申月";


		foreach($this->MONTHS as $idx=>$mon){
			//echo $idx.$mon . "<br/>";
		}

		//make jia-zi 60 rounding.
		$he = str_split($this->HE,3);
		$er = str_split($this->ER,3);
		for($k=0;$k<60;$k+=1){
			$i=$k % 10;
			$j=$k % 12;
			$jz= $he[$i] . $er[$j];//substr ($this->ER, $j,4);
			$this->JZ[$k+1]=$jz;
		}

		foreach( $this->JZ as $idx=>$mon){
			//echo $idx.$mon . "<br/>";
		}

		$this->ini($this->OutMatrix);
	}
	public function ini(&$matrix){
		for($i=0;$i<=count($this->JZ);$i+=1){
			for($j=0;$j<=count($this->MONTHS);$j+=1){
				$matrix[$i][$j]=0;
			}
		}
	}

	public function main(){
		$fname = $this->DataFileName;//"../calendar_srcripts/Months.txt";

		$lines = file($fname);
		echo "fname=" . $fname. "; totlines=".count($lines) . "<br>";
		$lineIdx=0;
		foreach($lines as  $line){
			# do same stuff with the $line
			$line = trim($line);
			
			if(strlen($line)<=3) continue;
			if(preg_match("/[0-9]+[\s]/",$line, $matches)) {				
				$lineIdx+=1;
				$itemIdx=(int)($matches[0]);
				if($lineIdx != $itemIdx){	
					print_r($matches);			
					echo "<font color='red'><br>$lineIdx != $itemIdx == $line<br></font>";
				}
				continue;
			}

			$this->workline($line);
		}
		$this->showWork();
	}
	public function workline($line){
		$idxMon=-1;
		foreach($this->MONTHS as $i=>$mon){
			if (strpos($line, $mon) !== false) {
				//echo $line. "<br/>";
				$idxMon=$i;
				break;
			}
		}

		$idxJz=-1;
		foreach($this->JZ as $i=>$jz){
			if (strpos($line, $jz) !== false) {
				//echo $line. "<br/>";
				$idxJz=$i;
				break;
			}
		}


		if( ($idxMon > 0)  && ($idxJz > 0) ) {
			$this->OutMatrix[$idxJz][$idxMon] += 1;   //for both mon and jz available.
			$this->stat_tabular($idxMon, $idxJz, $line);
			//echo $line."<br>";
		}
		else if($idxMon>0) {
			$this->OutMatrix[0][$idxMon] +=1; //only for mon
			$this->stat_month($idxMon, $line);
			//echo $line."<br>";
		}

		else if($idxJz>0){
			$this->OutMatrix[$idxJz][0] += 1; //only for Jz
			$this->stat_jz($idxJz, $line);
		}
		else{
			//$this->OutMatrix[0][0] +=1;
			$this->stat_outof_tablular(0,0,$line);
		}

		return;

		//echo $line. "<br/>";
	}
	public function stat_jz($idxJz, $line){
	}
	public function stat_month($iMonth, $line){
	}
	public function stat_tabular($row,$col, $line){
	}
	public function stat_outof_tablular($row,$col, $line){
	}

	public function showWork(){
		$this->showMatrix( "Month-Date Freqency Of String" );
	}
	public function showMatrix($caption){
		echo "<table border='1'><caption>$caption</caption>";

		echo "<tr><td/><td/>";
		for($j=1;$j<=count($this->MONTHS);$j+=1){
			echo "<td>";
			echo $this->MONTHS[$j];
			echo "</td>";
		}
		echo "<td>Total</td><td>no month</td></tr>\n";


		$totAllMon=0;
		$tot_bottom=array();
		for($j=0; $j<=count($this->MONTHS); $j+=1){
			$tot_bottom[$j]=0;
		}

		for($i=1;$i<=60;$i+=1){
			echo "<tr>";
			echo "<td>$i</td>";
			echo "<td>";
			echo $this->JZ[$i];
			echo "</td>";

			$totInRow=0;
			for($j=1; $j<=count($this->MONTHS); $j+=1){
				$itm = $this->OutMatrix[$i][$j];
				$totInRow += $itm;
				$tot_bottom[$j] += $itm;
					
				echo "<td>";
				echo $itm;
				echo "</td>";

			}
			$totAllMon += $totInRow;
			//
			$itm = $this->OutMatrix[$i][0]; //no-month
			$tot_bottom[0] += $itm;


			echo "<td>";
			echo $totInRow;
			echo "</td>";

			echo "<td>";
			echo  $itm;//no month
			echo "</td>";



			echo "</tr>\n";
		}

		//// tot
		echo "<tr><td></td><td>Total</td>";
		for($j=1; $j<=count($this->MONTHS); $j+=1){
			echo "<td  class='tot'>" . $tot_bottom[$j] . "</td>";
		}
		echo "<td class='tot2' title='tot covered in dates and months'>($totAllMon)</td><td class='tot' title='tot no-month'>" . $tot_bottom[0] . "</td>";
		echo "</tr>\n";

		///// no date
		$tot=0;
		echo "<tr><td></td><td>nodate</td>";
		for($j=1; $j<=count($this->MONTHS); $j+=1){
			$itm = $this->OutMatrix[0][$j];
			$tot += $itm;
			echo "<td class='nodate'>" . $itm . "</td>";
		}
		echo "<td  class='nodate' title='tot_nodate'>$tot</td><td class='nodate_nomonth' title='tot nodata nomonth'>".$this->OutMatrix[0][0]."</td>";
		echo "</tr>";



		echo "</table>\n";
	}
}



class CalenderTarget extends CalenderBase{
	public $target;
	public $statMatrix;
	public $tot_in_mon=Array();
	public $tot_in_day=Array();
	public function CalenderTarget($cha){
		parent::CalenderBase();
		$this->target=$cha;
		$this->ini($this->statMatrix);
		for($row=0; $row<=count($this->JZ); $row+=1){
			for($col=0; $col<=count($this->MONTHS); $col+=1){
				$this->statMatrix[$row][$col]=0;
				$this->tot_in_mon[$col] =0;
			}
			$this->tot_in_day[$row] =0;
		}
	}
	public function stat_jz($idxJz,$line){
		if (strpos($line, $this->target) === false) {
			//echo $line. "<br/>";
			return;
		}
		$this->statMatrix[$idxJz][0] +=1;
		$this->tot_in_day[$idxJz] +=1;
		$this->tot_in_mon[0] +=1;
	}
	public function stat_month($iMonth, $line){
		if (strpos($line, $this->target) === false) {
			return;
			//echo $line. "<br/>";
		}
		$this->statMatrix[0][$iMonth] +=1;
		$this->tot_in_mon[$iMonth] +=1;
		$this->tot_in_day[0] +=1;
	}
	public function stat_tabular($iMonth, $idxJz, $line){
		if (strpos($line, $this->target) === false) {
			return;
			//echo $line. "<br/>";
		}
		$this->statMatrix[$idxJz][$iMonth] +=1;
		$this->tot_in_mon[$iMonth] +=1;
		$this->tot_in_day[$idxJz] +=1;
	}
	public function stat_outof_tablular($row,$col, $line){
		if (strpos($line, $this->target) === false) {
			return;
			//echo $line. "<br/>";
		}
		$this->statMatrix[0][0] +=1;
	}
	public function showWork(){
		$this->OutMatrix = $this->statMatrix;
		$this->showMatrix( $this->target );
		return;
	}
}//CaenderBase




class KeyPhraseFinder extends CalenderBase{
	public $KeyChar;
	public $KeyPhrase=array();
	public $KeyLen=1;
	public function KeyPhraseFinder($char){
		$this->KeyChar = $char;
	}
	public function workline($line){
		$pos = strpos($line, $this->KeyChar);
		if ( false === $pos || $pos <= 2*3) {return;};
		//echo $line. "<br/>";
		$i=$this->KeyLen;
		$pos -=$i*3;
		$phrase = substr($line, $pos, ($i+1)*3);
		if(!isset($this->KeyPhrase[$phrase])){
			$this->KeyPhrase[$phrase]=0;
		}
		$this->KeyPhrase[$phrase] +=1;
		//echo $pos .
	}
	public function showWork(){
		$i=0;
		foreach($this->KeyPhrase as $key=>$val){
			echo $i . "::: " . $key ."=$val<br>";
			$i+=1;
		}
	}
}


class AllWordsList extends CalenderBase{
	public $KeyPhrase=array();

	public function workline($line){
		$arr = str_split($line, 3);
		foreach($arr as $i => $ch){
			if(!isset($this->KeyPhrase[$ch])){
				$this->KeyPhrase[$ch]=0;
			}
			$this->KeyPhrase[$ch] +=1;
		}
		//echo $pos .
	}
	public function showWork(){
		$i=0;
		ksort($this->KeyPhrase);
		foreach($this->KeyPhrase as $key=>$val){
			echo $i . "::: " . $key ." --->$val<br>";
			$i+=1;
		}
	}
}





class DateMonthMap extends CalenderBase{
	public $KeyPhrase=array();

	public function mapCalc(){
		//parent::CalenderBase();
		
		$this->showJiazi();
		$fdays_per_year=365.2522;//1461;
		$idays_accumulation=0;
		$fdays_accumulation=0;
		$DateMonthMapArr=array();
		foreach($this->JZ as $i=>$vm){
			$DateMonthMapArr[$i]=0;
		}
		$The14thMonth=array();
		$intercalaryOld=0;
		echo "fdays_accumulation=$fdays_accumulation";
		echo "<table border='1'>";
		echo "<tr><td>year</td><td>fdays_accumulation</td><td>idays_accumulation</td><td>adjust</td><td>modDateOfJz</td><td>". "last day" ."</td><td>Xun</td></tr>\n";
		for($i=1;$i<=8000;$i+=1){
			$fdays_accumulation+=$fdays_per_year;
			$idays_accumulation = round($fdays_accumulation);//PHP_ROUND_HALF_DOWN
			
			$modDateOfXun=($idays_accumulation) % 10;
			$modDateOfJz=($idays_accumulation) % 60;
			$modDayOfYear = ($idays_accumulation) % 365;	
			
			
			$adjust="";
			if($intercalaryOld!=$modDayOfYear){
				$intercalaryOld=$modDayOfYear;
				$adjust="+" . $modDayOfYear;			
			}
			
			$Xun="";
			if(0===$modDateOfXun){
				$Xun="xun";
			}
			
			if(0===$modDateOfJz){
				$modDateOfJz=60;
			}
			$lastDay=$this->JZ[$modDateOfJz];
			if(strlen($adjust)>0){
				if(!isset($The14thMonth[$lastDay])) $The14thMonth[$lastDay]=0;
				$The14thMonth[$lastDay] +=1;
			}
			
			echo "<tr><td>$i</td><td>$fdays_accumulation</td><td>$idays_accumulation</td><td>$adjust</td><td>$modDateOfJz</td><td>$lastDay</td><td>$Xun</td></tr>\n";

			//echo $pos .
		}
		echo "</table>"; 
		
		echo "<table border='1'>";
		foreach($The14thMonth as $lastDay=>$count){
			echo "<tr><td>$lastDay</td><td>$count</td></tr>\n";
		}
		echo "</table>";
	}
	public function showJiazi(){
		echo "<table border='1'>";
		foreach( $this->JZ as $idx=>$mon){
			echo "<tr><td>$idx</td><td>$mon</td><tr/>\n";
		}
		echo "</table>";
	}
}

?>

