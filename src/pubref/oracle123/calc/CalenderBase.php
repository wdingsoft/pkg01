<?php

// 甲子。 乙丑。 丙寅。 丁卯。 戊辰。 己巳。 庚午。十月。 辛未。 壬申。 癸酉。 食 月㞢食 好 旬 歲 年 雨



class CalenderBase{
	// 甲子。 乙丑。 丙寅。 丁卯。 戊辰。 己巳。 庚午。十月。 辛未。 壬申。 癸酉。 食 月㞢食 好 旬 歲 年
	public $HE="甲乙丙丁戊己庚辛壬癸";
	public $ER="子丑寅卯辰巳午未申酉戌亥";
	public $JZ=Array();
	public $MONTHS=Array( 14=>"十四月",13=>"十三月",12=>"十二月",11=>"十一月",10=>"十月",9=>"九月",8=>"八月",7=>"七月",6=>"六月",5=>"五月",4=>"四月",3=>"三月",2=>"二月",1=>"一月");

	public $OutMatrix=array();

	public $DataFileName="../calendar_srcripts/Months.txt";// -- any scripts contains month.
	
	public function mb_str_split( $string ) {
		# Split at all position not after the start: ^
		# and not before the end: $
		return preg_split('/(?<!^)(?!$)/u', $string );
	} 
	public function CalenderBase(){
		$this->MONTHS[]="正月";
		$this->MONTHS[]="生月";
		$this->MONTHS[]="木月";
		$this->MONTHS[]="今月";
		$this->MONTHS[]="������月";
		
		$this->MONTHS[]="冬月";
		$this->MONTHS[]="茲月";
		
		$this->MONTHS[]="才月";	
		$this->MONTHS[]="貞月";			
		$this->MONTHS[]="㞢月";
		$this->MONTHS[]="夕月";	
		
		$this->MONTHS[]="酉月";
		$this->MONTHS[]="申月";


		foreach($this->MONTHS as $idx=>$mon){
			//echo $idx.$mon . "<br/>";
		}

		//make jia-zi 60 rounding.
		$he = $this->mb_str_split($this->HE);//str_split($this->HE,3);
		$er = $this->mb_str_split($this->ER);//str_split($this->ER,3);
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
			if("#"===$line[0]) continue;
			
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
		$this->showMatrix( "Month-Day" );
	}
	public function showMatrix($caption){
		$Notes =" Freqency Statistics in OBI<br/>(generated from 21477 pecies of oracle bones inscritions that contains 月.)";
		echo "<table border='1'><caption>$caption$Notes</caption>";
		
		echo $this->showMatrix_trs_headers();

		$totAllMon=0;
		$tot_bottom=array();

		echo $this->showMatrix_trs_60rows($caption,  $totAllMon,  $tot_bottom);

		$ar = $this->showMatrix_trs_Tm_rows("",  $totAllMon,  $tot_bottom);
        $trs = implode($ar);
        echo $trs;


		echo "</table>\n";
	}
	public function showMatrix_trs_headers(){
			//horz index title.
		$trs = "<tr><td/><td/>";
		for($j=1;$j<=count($this->MONTHS);$j+=1){
			$trs .= "<td>";
			$trs .= $j;
			$trs .= "</td>";
		}
		$trs .= "<td></td><td></td></tr>\n";
		
		//horz title
		$trs .= "<tr><td/><td/>";
		for($j=1;$j<=count($this->MONTHS);$j+=1){
			$trs .= "<td>";
			$trs .= $this->MONTHS[$j];
			$trs .= "</td>";
		}
		$trs .= "<td title='Total occurence of the day with month'>Tn1</td>";
		$trs .= "<td title='Total occurence of the day without month'>Tn0</td>";
		$trs .= "<td title='Total occurence of the day with and without month'>Tn</td></tr>\n";
		return $trs;
	}
	public function showMatrix_trs_Tm_rows($caption, & $totAllMon, & $tot_bottom){
		//// tot with date
		$trs1 = "<tr><td></td><td>Tm1</td>";
		for($j=1; $j<=count($this->MONTHS); $j+=1){
			$trs1 .=  "<td  class='Tm1'>" . $tot_bottom[$j] . "</td>";
		}
		$trs1 .=  "<td class='tot_both' title='total occurence with both day and month'>($totAllMon)</td><td></td>";
		$trs1 .=  "</tr>\n";

		///// tot without date
		$tot=0;
		$trs2 =  "<tr class='Tm0'><td></td><td>Tm0</td>";
		for($j=1; $j<=count($this->MONTHS); $j+=1){
			$itm = $this->OutMatrix[0][$j];
			$tot += $itm;
			$trs2 .=  "<td class='Tm0'>" . $itm . "</td>";
		}
		//echo "<td  class='nodate' title='tot_nodate'>$tot</td><td class='nodate_nomonth' title='tot nodata nomonth'>".$this->OutMatrix[0][0]."</td>";
		$trs2 .=  "<td/><td  class='nodate' title='tot_nodate'><a title='sum of row'>". $tot . "</a>\\<a title='sum of column'>" . $tot_bottom[0] . "</a></td>";
		$trs2 .=  "<td>\\<a title='sum of column'>" . ($tot_bottom[0] + $totAllMon) . "</a></td>";
		$trs2 .=  "</tr>";
		
		///// tot with and without date
		$totCount=0;
		$trs3 =  "<tr class='Total_for_month'><td>$caption</td><td>Tm</td>";
		for($j=1; $j<=count($this->MONTHS); $j+=1){
			$t1 = $tot_bottom[$j];
			$t0 = $this->OutMatrix[0][$j];
			$tot = $t1 + $t0;
			$totCount +=$tot;
			$trs3 .=  "<td class='tot'>" . $tot . "</td>";
		}
		//echo "<td></td><td></td><td><a title='sum of row'>". $totCount . "\\<a title='sum of column'>" . ($tot_bottom[0] + $totAllMon) . "</a><td/>";
		$trs3 .=  "<td></td><td><a title='sum of row'>". $totCount . "\\<a title='sum of column'>" .  "</a></td>";
		$trs3 .=  "</tr>";
		return array($trs1,$trs2,$trs3);
	}
public function showMatrix60rows($caption, & $totAllMon, & $tot_bottom){
	$trs = $this->showMatrix_trs_60rows($caption,  $totAllMon,  $tot_bottom);
	echo $trs;
}
public function showMatrix_trs_60rows($caption, & $totAllMon, & $tot_bottom){
		for($j=0; $j<=count($this->MONTHS); $j+=1){
			$tot_bottom[$j]=0;
		}
		$tr="<tr>";
		for($i=1;$i<=60;$i+=1){
			
			$tr .= "<td>$i</td>";
			$tr .= "<td>";
			$tr .= $this->JZ[$i];
			$tr .= "</td>";

			$totInRow=0;
			for($j=1; $j<=count($this->MONTHS); $j+=1){
				$itm = $this->OutMatrix[$i][$j];
				$totInRow += $itm;
				$tot_bottom[$j] += $itm;
					
				$tr .= "<td>";
				if(0==$itm){
					$tr .= "-";
				}
				else{
					$tr .= $itm;
				}
				$tr .= "</td>";

			}
			$totAllMon += $totInRow;
			//
			$itm = $this->OutMatrix[$i][0]; //no-month
			$tot_bottom[0] += $itm;


			$tr .= "<td class='Tn1'>";
			$tr .= $totInRow;
			$tr .= "</td>";

			$tr .= "<td class='Tn0'>";
			$tr .=  $itm;//no month
			$tr .= "</td>";
			
			$tr .= "<td class='Td2'>";
			$tr .=  $totInRow + $itm;//with and without month
			$tr .= "</td>";



			$tr .= "</tr>\n";
		}
		return $tr;
}
public function showMatrix_bk($caption){
		$caption .=" Freqency Statistics in OBI<br/>(generated from 21477 pecies of oracle bones inscritions that contains 月.)";
		echo "<table border='1'><caption>$caption</caption>";

		//horz index title.
		echo "<tr><td/><td/>";
		for($j=1;$j<=count($this->MONTHS);$j+=1){
			echo "<td>";
			echo $j;
			echo "</td>";
		}
		echo "<td></td><td></td></tr>\n";
		
		//horz title
		echo "<tr><td/><td/>";
		for($j=1;$j<=count($this->MONTHS);$j+=1){
			echo "<td>";
			echo $this->MONTHS[$j];
			echo "</td>";
		}
		echo "<td title='Total occurence of the day with month'>Tn1</td>";
		echo "<td title='Total occurence of the day without month'>Tn0</td>";
		echo "<td title='Total occurence of the day with and without month'>Tn</td></tr>\n";


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
				if(0==$itm){
					echo "-";
				}
				else{
					echo $itm;
				}
				echo "</td>";

			}
			$totAllMon += $totInRow;
			//
			$itm = $this->OutMatrix[$i][0]; //no-month
			$tot_bottom[0] += $itm;


			echo "<td class='Tn1'>";
			echo $totInRow;
			echo "</td>";

			echo "<td class='Tn0'>";
			echo  $itm;//no month
			echo "</td>";
			
			echo "<td class='Td2'>";
			echo  $totInRow + $itm;//with and without month
			echo "</td>";



			echo "</tr>\n";
		}

		//// tot with date
		echo "<tr><td></td><td>Tm1</td>";
		for($j=1; $j<=count($this->MONTHS); $j+=1){
			echo "<td  class='Tm1'>" . $tot_bottom[$j] . "</td>";
		}
		echo "<td class='tot_both' title='total occurence with both day and month'>($totAllMon)</td><td></td>";
		echo "</tr>\n";

		///// tot without date
		$tot=0;
		echo "<tr class='Tm0'><td></td><td>Tm0</td>";
		for($j=1; $j<=count($this->MONTHS); $j+=1){
			$itm = $this->OutMatrix[0][$j];
			$tot += $itm;
			echo "<td class='Tm0'>" . $itm . "</td>";
		}
		//echo "<td  class='nodate' title='tot_nodate'>$tot</td><td class='nodate_nomonth' title='tot nodata nomonth'>".$this->OutMatrix[0][0]."</td>";
		echo "<td/><td  class='nodate' title='tot_nodate'><a title='sum of row'>". $tot . "</a>\\<a title='sum of column'>" . $tot_bottom[0] . "</a></td>";
		echo "<td>\\<a title='sum of column'>" . ($tot_bottom[0] + $totAllMon) . "</a></td>";
		echo "</tr>";
		
		///// tot with and without date
		$totCount=0;
		echo "<tr class='Total_for_month'><td></td><td>Tm</td>";
		for($j=1; $j<=count($this->MONTHS); $j+=1){
			$t1 = $tot_bottom[$j];
			$t0 = $this->OutMatrix[0][$j];
			$tot = $t1 + $t0;
			$totCount +=$tot;
			echo "<td class='tot'>" . $tot . "</td>";
		}
		//echo "<td></td><td></td><td><a title='sum of row'>". $totCount . "\\<a title='sum of column'>" . ($tot_bottom[0] + $totAllMon) . "</a><td/>";
		echo "<td></td><td><a title='sum of row'>". $totCount . "\\<a title='sum of column'>" .  "</a></td>";
		echo "</tr>";



		echo "</table>\n";
	}
	
	
	
	
	
}//////////class CalenderBase{

//貞������㱿爭亘������韋內永王㱿
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
class CalenderTarget_Topic extends CalenderTarget{
    public $trs_header;
    public $trs_Tm;
	public function showMatrix($caption){
		$totAllMon=0;
		$tot_bottom=array();
		$this->trs_header = $this->showMatrix_trs_headers($caption,  $totAllMon,  $tot_bottom);

        $this->showMatrix_trs_60rows($caption,  $totAllMon,  $tot_bottom);
        
        $ar=$this->showMatrix_trs_Tm_rows($caption,  $totAllMon,  $tot_bottom);
		$this->trs_Tm = $ar[2];
	}
    public function getEmptyTR(){
    
        $trs="<tr id='Tot'><td>Tot</td>";
        for($i=0;$i<30;$i+=1){
            $trs .= "<td></td>";
        }
        $trs .= "</tr>";
        return $trs;
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
		$arr = $this->mb_str_split($line, 3);
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

class Calendar_TypesOfMonths extends CalenderBase{
	public $KeyPhrase=array();
	public function workline($line){
		$pos =strpos($line, "月");
		//$arr = mb_split($line, "UTF-8"); //str_split($line, 3);
		$arr = $this->mb_str_split($line); //str_split($line, 3);
		foreach($arr as $i => $ch){
			if ( $i < 1 ) continue;
			if ( "月" != $ch ){
				continue;
			}					
			
			$prev1 = $arr[$i-1];			
			$typeOfmonth = $prev1 . "月" ;
			
			if( $i >=2 ) {
				$prev2 = $arr[$i-2];	
				if( "十" == $prev2 ){
					$typeOfmonth = $prev2 . $typeOfmonth ;
				}
			}		
			
			
			if(!isset($this->KeyPhrase[$typeOfmonth])){
				$this->KeyPhrase[$typeOfmonth]=0;
			}
			$this->KeyPhrase[$typeOfmonth] +=1;
		}
		//echo $pos .
	}
	public function showWork(){
		$i=0;
		arsort($this->KeyPhrase);
		
		echo "<table border='1'><caption>Type of Months in OBI </caption>";
		echo "<tr><td>#</td><td>Month</td><td>Freq</td></tr>";
		foreach($this->KeyPhrase as $key=>$val){
			if( in_array( $key, $this->MONTHS ) ) { 
			  $i+=1;		
			  echo "<tr><td>$i</td><td>$key</td><td>$val</td></tr>\n";
			}
		}
		echo "</table>";
	}
}






class DateMonthMap extends CalenderBase{
	public $KeyPhrase=array();
    public $The14thMonthDate;
    public $The1sthMonthDate;

    public function DateMonthMap(){
        parent::CalenderBase();
    	$this->The14thMonthDate=array();
		foreach($this->JZ as $i=>$vm){
            //echo "$i :: $vm <br>\n";
			$this->The14thMonthDate[$vm]=0;
		}
    }
    public function mapCalc(){
        
        $dlta=0.001;
        for($i=0; $i<10;$i++){
            $dltaYr=$dlta*$i;
            echo "<hr>[$i]";
            $this->CatchWW($dltaYr,0);
        }
        
        
        $this->showDateIn14Month();
    }
	public function CatchWW($dltyr, $bShow){
		//parent::CalenderBase();
		
		
		$fdays_per_year=365.25 + $dltyr; //0.00003;//365.2522;//1461; //WW:365.25002
        //if [-0.00002,0.00002] WW=0;
        
		$idays_accumulation=0;
		$fdays_accumulation=0;
        
        $YrDeltaWuWu=0;
        $YrWuWuPrev=-1;
        $YrSpanWuWu=array();
        		
        $JZPeriodYrIdx="";
        
        
		$intercalaryOld=0;
        
        if($bShow){
		echo "fdays_accumulation=$fdays_accumulation";		
        echo "<table border='1'>";
		echo "<tr><td>year</td><td>fdays_accumulation</td><td>idays_accumulation</td><td>adjust</td><td>modDateOfJz</td><td>". "last day" ."</td><td>Xun</td></tr>\n";
        }
        
		for($i=1;$i<=10000;$i+=1){
			$fdays_accumulation+=$fdays_per_year;
			$idays_accumulation = round($fdays_accumulation);//PHP_ROUND_HALF_DOWN
			
			$modDateOfXun=($fdays_accumulation) % 10;
			$modDateOfJz=($fdays_accumulation) % 60;
			$modDayOfYear = ($fdays_accumulation) % 365;	
			
			
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
				if(!isset($this->The14thMonthDate[$lastDay])) {                    
                    $this->The14thMonthDate[$lastDay]=0;
                    echo "<font color='red'>eroor:$modDateOfJz, $lastDay</font>";
                }

                if(55===$modDateOfJz){
                    $adjust = "$adjust ($lastDay)";
                    if($YrWuWuPrev!=$i){
                        if($YrWuWuPrev>0){
                            $YrDeltaWuWu=$i-$YrWuWuPrev;
                            if(!isset($YrSpanWuWu[$YrDeltaWuWu])){
                                $YrSpanWuWu[$YrDeltaWuWu]=0;
                            }
                            $YrSpanWuWu[$YrDeltaWuWu] +=1;
                        }
                        $YrWuWuPrev=$i;
                    }
                }
				$this->The14thMonthDate[$lastDay] +=1;
			}
            if(1===$modDateOfJz){
                 $JZPeriodYrIdx .="$i,";   
            }            
			
			if($bShow) echo "<tr><td>$i</td><td>$fdays_accumulation</td><td>$idays_accumulation</td><td>$adjust</td><td>$modDateOfJz</td><td>$lastDay</td><td>$Xun</td></tr>\n";

			//echo $pos .
		}//
		if($bShow) echo "</table>"; 
        
        echo "$dltyr=$fdays_per_year.";
        print_r($YrSpanWuWu);
        echo "<br>jzPeriodYear=$JZPeriodYrIdx.";
	}
	public function showDateIn14Month(){
		echo "<table border='1'><caption>date of 14th month</caption>";
		foreach( $this->JZ as $idx=>$mon){
            $count=$this->The14thMonthDate[$mon];
			echo "<tr><td>$idx</td><td>$mon</td><td>$count</td></tr>\n";
		}
		echo "</table>";
	}
}





class Neighbor_Frq extends CalenderBase{
	public $KeyChar="亞";
	public $iNeighborRange=array(-1,1,2);
	
	public $KeyPhrase=array();

	public $linIndx=0;
   
    
    public $arrNeighborL=array();
	public $arrNeighborR=array();
    
    public $arrNeighborArr=array();
    
	public function Neighbor_Frq(){
		parent::CalenderBase();
		$this->arrNeighborArr[0]=array();//reserved for ovallall neighbor freq
	}
	public function workline($line){
		mb_internal_encoding("UTF-8");		
		
		$Ya=$this->KeyChar;//"亞";	
		
		$this->linIndx+=1;
		$arr = $this->mb_str_split ($line);
		foreach($arr as $i => $ch){
			//echo $ch . "==";
			if($ch===$Ya) {
				foreach ( $this->iNeighborRange as $iNeighborIdx) {
					$this->CatchNeighors($i, $arr, $iNeighborIdx); 
				}                								                
			}
			if(!isset($this->KeyPhrase[$ch])){
				$this->KeyPhrase[$ch]=0;
			}
			$this->KeyPhrase[$ch] +=1;
		}
		//echo "<br/>";
	}
    public function CatchNeighors($iKeyIndx, $arrChars, $iNeighborIdx){
		if(0===$iNeighborIdx) return;
                if( !isset($this->arrNeighborArr[$iNeighborIdx]) ){
                    $this->arrNeighborArr[$iNeighborIdx]=array();
                }
                $iIndx=$iKeyIndx + $iNeighborIdx;
				if( !isset($arrChars[$iIndx]) ) {
                    return;
                }
                $chNeighbor=$arrChars[$iIndx];
				//echo "[$chNeighbor]".$this->KeyChar."=====================================";
				if( $chNeighbor === $this->KeyChar ) {
					//echo "=====================================";
					return;
				}
				
				if( !isset($this->arrNeighborArr[$iNeighborIdx][$chNeighbor]) ){
						$this->arrNeighborArr[$iNeighborIdx][$chNeighbor]=0;
				}
				$this->arrNeighborArr[$iNeighborIdx][$chNeighbor]+=1;
				
				//Left
				if($iNeighborIdx<0){
					if(!isset($this->arrNeighborL[$chNeighbor])){
						$this->arrNeighborL[$chNeighbor]=0;
					}
					$this->arrNeighborL[$chNeighbor]+=1;
				}
				
				//Right
				if($iNeighborIdx>0){
					if(!isset($this->arrNeighborR[$chNeighbor])){
						$this->arrNeighborR[$chNeighbor]=0;
					}
					$this->arrNeighborR[$chNeighbor]+=1;
				}
                
                //overall
                if(!isset($this->arrNeighborArr[0][$chNeighbor])){
                    $this->arrNeighborArr[0][$chNeighbor]=0;
                }
                $this->arrNeighborArr[0][$chNeighbor]+=1;
    }
	public function showWork(){
  		echo  "<div style='align:center;border:1px solid red'>";
        $this->showWork_arrNeighborsTables();
		echo  "</div>";  
		
		//echo  "<div  style='align:left'>";			
        //echo "<br/><hr/>all words list<hr/>";
        echo  "<table border='1'><caption>all</caption>\n";
        $this->showWork_arr($this->KeyPhrase);
        echo "</table>";
        //echo  "</div>";

        return;
        
	}
    public function showWork_arr($Arr){
        $i=0;
        ksort( $Arr);
        arsort($Arr);

        foreach($Arr as $key=>$val){
            $intval =  $this->_uniord($key); // ord($key); //str.charCodeAt(0); 
            //if($intval<10000) continue;
			$bSkip=false;
            switch($intval){
                case 65292: //，
				case 12308: //〔
				case 12309: //〕
				case 12290: //。
				case 65072://︰
                //case 65306:
                //case 65279:
                //case 65279﻿:
                //case 65109:
                //case 65104:
                $bSkip=true;
                break;
				case 65:
                default:
				if($intval<10000) $bSkip=true;
				if($intval>100000) $bSkip=true;
                break;
            }
            if(true===$bSkip) continue;
			//echo "<tr><td>$i</td><td>[$intval]$key</td><td>$val</td></tr>\n";
			//echo "<tr><td>$i</td><td>$key</td><td>$val</td></tr>\n";
			//echo "<tr><td>$key</td><td>$val</td></tr>\n";
			//echo "<tr><td>[$intval]$key$val</td></tr>\n";
			echo "<tr><td>$key$val</td></tr>\n";
			$i+=1;
		}
    }
    
    public function showWork_arrNeighborsTables(){ 
		ksort($this->arrNeighborArr);
        foreach($this->arrNeighborArr as $iNeighborIdx=>$arr){
			if(0===$iNeighborIdx){
				//$this->showWork_singleNeighborTable( "L" , $this->arrNeighborL);
				$this->showWork_singleNeighborTable( $this->KeyChar , $arr);	
				//$this->showWork_singleNeighborTable( "R" , $this->arrNeighborR);
			}
			else{
				$this->showWork_singleNeighborTable( $iNeighborIdx , $arr);
			}
		}
    }
	
	public function showWork_singleNeighborTable($iNeighborIdx, $arr){ 
			echo  "<table style='float:left' border='1' class='table_$iNeighborIdx'><caption>" . $iNeighborIdx ."</caption>\n";
            //echo  "<tr><td>Cf</td></tr>\n";
            $this->showWork_arr($arr);
            echo  "</table>\n";
    }
    
    public function utfCharToNumber($char) {
        $i = 0;
        $number = '';
        while (isset($char{$i})) {
            $number.= ord($char{$i});
            ++$i;
            }
        return $number;
    }
    public function uniord($u) {
		$ord = mb_detect_order($u);
        $k = mb_convert_encoding($u, 'UCS-2LE', 'UTF-8');
		
		$k = mb_convert_encoding($u, $ord, 'UTF-8');
		
        $k1 = ord(substr($k, 0, 1));
        $k2 = ord(substr($k, 1, 1));
		//$k3 = ord(substr($k, 2, 1));
        return  $k2 * 256 + $k1;
    } 
	

	

   public function _uniord($c) {
		if (ord($c{0}) >=0 && ord($c{0}) <= 127)
			return ord($c{0});
		if (ord($c{0}) >= 192 && ord($c{0}) <= 223)
			return (ord($c{0})-192)*64 + (ord($c{1})-128);
		if (ord($c{0}) >= 224 && ord($c{0}) <= 239)
			return (ord($c{0})-224)*4096 + (ord($c{1})-128)*64 + (ord($c{2})-128);
		if (ord($c{0}) >= 240 && ord($c{0}) <= 247)
			return (ord($c{0})-240)*262144 + (ord($c{1})-128)*4096 + (ord($c{2})-128)*64 + (ord($c{3})-128);
		if (ord($c{0}) >= 248 && ord($c{0}) <= 251)
			return (ord($c{0})-248)*16777216 + (ord($c{1})-128)*262144 + (ord($c{2})-128)*4096 + (ord($c{3})-128)*64 + (ord($c{4})-128);
		if (ord($c{0}) >= 252 && ord($c{0}) <= 253)
			return (ord($c{0})-252)*1073741824 + (ord($c{1})-128)*16777216 + (ord($c{2})-128)*262144 + (ord($c{3})-128)*4096 + (ord($c{4})-128)*64 + (ord($c{5})-128);
		if (ord($c{0}) >= 254 && ord($c{0}) <= 255)    //  error
			return FALSE;
		return 0;
	}   //  function _uniord()
}

?>