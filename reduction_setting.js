var totalHP=0;
var currentHP=0;
var attack;
var skill=[0,0,0,0,0];
var id=0;
var error=0;
var death=0;
var buff=0.6;
var reductionRate=1/3;
var damageinc=0;
var miss_flag=[0,0,0,0,0];
var logo=0;

function startCalculation()
{
	death=0;
	error=0;
	getHP();
	for(var i=0;i<5;i++) getSKILL(i);
	poisonCheck();
	for(var i=0;i<5;i++)
	{
		if(death==1) break;
		getATK(i);
		getSKILL(i);
		calculateDamage(i);
	}
	if(error==1)
	{
		document.getElementById("resultLabel").style.background = "#FCC";
		document.getElementById("resultLabel").style.color = "#F00";
		document.getElementById("resultLabel").style.border = "8px #F00 dashed";
		document.getElementById("resultLabel").style.visibility = "visible";
		document.getElementById("resultLabel").innerHTML = "E R R O R";
	}
	else if(!isNaN(currentHP)&&error==0&&death==0) 
	{
		if(currentHP<totalHP*0.5)
		{
			document.getElementById("resultLabel").style.background = "#FFB";
			document.getElementById("resultLabel").style.color = "#F70";
			document.getElementById("resultLabel").style.border = "8px #F70 dashed";
		}
		else if(currentHP>=totalHP*0.5)
		{
			document.getElementById("resultLabel").style.background = "#CF9";
			document.getElementById("resultLabel").style.color = "#0A0";
			document.getElementById("resultLabel").style.border = "8px #0A0 dashed";
		}
		document.getElementById("resultLabel").style.visibility = "visible";
		document.getElementById("resultLabel").innerHTML = "血量剩餘： "+currentHP;
	}
	else if(!isNaN(currentHP)&&error==0&&death==1) 
	{
		document.getElementById("resultLabel").style.background = "#FCC";
		document.getElementById("resultLabel").style.color = "#F00";
		document.getElementById("resultLabel").style.border = "8px #F00 dashed";
		document.getElementById("resultLabel").style.visibility = "visible";
		document.getElementById("resultLabel").innerHTML = "血量無法承受攻擊";
	}
}

function getHP()
{
	totalHP = document.getElementById("totalHP").value;
	currentHP = document.getElementById("currentHP").value;
	if(isNaN(totalHP)||isNaN(currentHP))
	{
		alert("[錯誤]數字格式不符，請重新輸入");
		error=1;
	}
	else if(eval(totalHP)<0||eval(currentHP<0))
	{
		alert("[錯誤]血量不得小於零，請重新輸入");
		error=1;
	}
	else if(eval(totalHP)<eval(currentHP))
	{
		alert("[錯誤]當前血量("+currentHP+")大於總血量("+totalHP+")，請重新輸入");
		error=1;
	}
	else if(totalHP==''||currentHP=='')
	{
		alert("[錯誤]請輸入血量");
		error=1;
	}
}

function getATK(id)
{
	switch(id)
	{
		case 0:
			attack = document.getElementById("atk_1").value;
		break;
		case 1:
			attack = document.getElementById("atk_2").value;
		break;
		case 2:
			attack = document.getElementById("atk_3").value;
		break;
		case 3:
			attack = document.getElementById("atk_4").value;
		break;
		case 4:
			attack = document.getElementById("atk_5").value;
		break;
	}
	
	if(miss_flag[id]==1) attack=0;
	if(isNaN(attack))
	{
		alert("[錯誤]數字格式不符，請重新輸入");
		error=1;
	}
	else if(eval(attack)<0)
	{
		alert("[錯誤]攻擊力不得小於零，請重新輸入");
		error=1;
	}
	if(currentHP<=0) death=1;
	if(damageinc==1) attack=attack*1.5;
}

function getSKILL(id)
{
	switch(id)
	{
		case 0:
			skill[0] = document.getElementById("skill_1").value;
		break;
		case 1:
			skill[1] = document.getElementById("skill_2").value;
		break;
		case 2:
			skill[2] = document.getElementById("skill_3").value;
		break;
		case 3:
			skill[3] = document.getElementById("skill_4").value;
		break;
		case 4:
			skill[4] = document.getElementById("skill_5").value;
		break;
	}
	
	if(skill[id]<0||skill[id]>35)
	{
		alert("[錯誤]找不到對應特技！");
		error=1;
	}
	if(currentHP<=0) death=1;
	
}
function poisonCheck()
{
	var max_poison_rate=0;
	for(var j=0;j<5;j++)
	{
		switch(skill[j])
		{
			case '4':
				if(max_poison_rate<0.075) max_poison_rate=0.075;
			break;
			case '5':
				if(max_poison_rate<0.15) max_poison_rate=0.15;
			break;
			case '6':
				if(max_poison_rate<0.2) max_poison_rate=0.2;
			break;
			case '7':
				if(max_poison_rate<0.3) max_poison_rate=0.3;
			break;
			case '8':
				if(max_poison_rate<0.4) max_poison_rate=0.4;
			break;
			case '9':
				if(max_poison_rate<0.5) max_poison_rate=0.5;
			break;
			case '10':
				if(max_poison_rate<0.6) max_poison_rate=0.6;
			break;
			case '11':
				if(max_poison_rate<0.7) max_poison_rate=0.7;
			break;
			case '12':
				if(max_poison_rate<0.8) max_poison_rate=0.8;
			break;
			case '13':
				if(max_poison_rate<0.9) max_poison_rate=0.9;
			break;
			default:
				currentHP = currentHP;
		}
	}
	if(max_poison_rate>0) currentHP = currentHP-totalHP*max_poison_rate;
}
function calculateDamage(id)
{
	switch(skill[id])
	{
		case '0':
			currentHP = currentHP-damageReduction(attack);
		break;
		case '1':
			currentHP = currentHP-attack;
		break;
		case '2':
			currentHP = currentHP-damageReduction(attack);
			currentHP = currentHP-damageReduction(attack);
		break;
		case '3':
			currentHP = currentHP-damageReduction(attack);
			currentHP = currentHP-damageReduction(attack);
			currentHP = currentHP-damageReduction(attack);
		break;
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
		case '10':
		case '11':
		case '12':
		case '13':
			currentHP = currentHP-damageReduction(attack);
		break;
		case '14':
			if(miss_flag[id]==0) currentHP = currentHP-totalHP*0.3;
		break;
		case '15':
			if(miss_flag[id]==0) currentHP = currentHP-totalHP*0.4;
		break;
		case '16':
			if(miss_flag[id]==0) currentHP = currentHP-totalHP*0.5;
		break;
		case '17':
			if(miss_flag[id]==0) currentHP = currentHP-totalHP*0.7;
		break;
		case '18':
			if(miss_flag[id]==0) currentHP = currentHP-totalHP*0.8;
		break;
		case '19':
			if(miss_flag[id]==0) currentHP = currentHP-totalHP*0.9;
		break;
		case '20':
			if(miss_flag[id]==0) currentHP = currentHP-totalHP*1;
		break;
		case '21':
			if(miss_flag[id]==0) currentHP = currentHP-damageReduction(totalHP*0.3);
		break;
		case '22':
			if(miss_flag[id]==0) currentHP = currentHP-damageReduction(totalHP*0.4);
		break;
		case '23':
			if(miss_flag[id]==0) currentHP = currentHP-damageReduction(totalHP*0.5);
		break;
		case '24':
			if(miss_flag[id]==0) currentHP = currentHP-damageReduction(totalHP*0.7);
		break;
		case '25':
			if(miss_flag[id]==0) currentHP = currentHP-damageReduction(totalHP*0.8);
		break;
		case '26':
			if(miss_flag[id]==0) currentHP = currentHP-damageReduction(totalHP*0.9);
		break;
		case '27':
			currentHP = currentHP-damageReduction(attack)-totalHP*0.1;
		break;
		case '28':
			currentHP = currentHP-damageReduction(attack)-totalHP*0.2;
		break;
		case '29':
			currentHP = currentHP-damageReduction(attack)-totalHP*0.25;
		break;
		case '30':
			currentHP = currentHP-damageReduction(attack)-totalHP*0.4;
		break;
		case '31':
			currentHP = currentHP-damageReduction(attack*20);
			currentHP = currentHP-damageReduction(attack*20);
		break;
		case '32':
			currentHP = currentHP-damageReduction(attack*50);
		break;
		case '33':
			currentHP = currentHP-damageReduction(attack*2);
		break;
		case '34':
			currentHP = currentHP-damageReduction(attack*3);
		break;
		case '35':
			currentHP = currentHP-damageReduction(attack*10);
		break;
		
		default:
			currentHP = currentHP;
	}
	currentHP = Math.floor(currentHP);
	if(currentHP<=0)
	{
		death=1;
		currentHP=0;
	}
}
function damageReduction(attack)
{
	attack = Math.ceil(attack * (1-buff*Math.pow(currentHP/totalHP,reductionRate)));
	return attack;
}

function buff_none()
{
	reductionRate=1/3;
	buff=0.6;
}
function buff_2()
{
	reductionRate=1/3;
	buff=0.8;
}

function skillGraphicChange(id)
{
	switch(id)
	{
		case 'skill_1':
			graphic_ID = 'skill_graphic_1';
		break;
		case 'skill_2':
			graphic_ID = 'skill_graphic_2';
		break;
		case 'skill_3':
			graphic_ID = 'skill_graphic_3';
		break;
		case 'skill_4':
			graphic_ID = 'skill_graphic_4';
		break;
		case 'skill_5':
			graphic_ID = 'skill_graphic_5';
		break;
	
	}
	skill_graphic = document.getElementById(id).value;
	switch(skill_graphic)
	{
		case '0':
			document.getElementById(graphic_ID).src = "./img/no_skill.png";
		break;
		case '1':
			document.getElementById(graphic_ID).src = "./img/phantom.png";
		break;	
		case '2':
			document.getElementById(graphic_ID).src = './img/double_strike.png';
		break;	
		case '3':
			document.getElementById(graphic_ID).src = './img/triple_strike.png';
		break;
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
		case '10':
		case '11':
		case '12':
		case '13':
			document.getElementById(graphic_ID).src = './img/poison.png';
		break;
		case '14':
			document.getElementById(graphic_ID).src = './img/hp_reduction_30.png';
		break;
		case '15':
			document.getElementById(graphic_ID).src = './img/hp_reduction_40.png';
		break;
		case '16':
			document.getElementById(graphic_ID).src = './img/hp_reduction_50.png';
		break;
		case '17':
			document.getElementById(graphic_ID).src = './img/hp_reduction_70.png';
		break;
		case '18':
			document.getElementById(graphic_ID).src = './img/hp_reduction_80.png';
		break;
		case '19':
			document.getElementById(graphic_ID).src = './img/hp_reduction_90.png';
		break;
		case '20':
			document.getElementById(graphic_ID).src = './img/hp_reduction_100.png';
		break;
		case '21':
			document.getElementById(graphic_ID).src = './img/hp_reduction_30.png';
		break;
		case '22':
			document.getElementById(graphic_ID).src = './img/hp_reduction_40.png';
		break;
		case '23':
			document.getElementById(graphic_ID).src = './img/hp_reduction_50.png';
		break;
		case '24':
			document.getElementById(graphic_ID).src = './img/hp_reduction_70.png';
		break;
		case '25':
			document.getElementById(graphic_ID).src = './img/hp_reduction_80.png';
		break;
		case '26':
			document.getElementById(graphic_ID).src = './img/hp_reduction_90.png';
		break;
		case '27':
		case '28':
		case '29':
		case '30':
			document.getElementById(graphic_ID).src = './img/post_reduction.png';
		break;
		case '31':
		case '32':
		case '33':
		case '34':
			document.getElementById(graphic_ID).src = './img/trojan.png';
		break;
		case '35':
			document.getElementById(graphic_ID).src = './img/attack_10.png';
		break;
	}
}

var manual=0;
function manualText()
{
	manual++;
	if(manual%2==1)
	{
		document.getElementById("manual").style.visibility = 'visible';
		document.getElementById("calc").style.top = '750px';
		document.getElementById("recommend").style.top = '1150px';
		document.getElementById("recommend_ultimate").style.top = '1340px';
		document.getElementById("recommend_mainroute").style.top = '1340px';
		document.getElementById("recommend_weeklymission").style.top = '1340px';
		document.getElementById("recommend_storystages").style.top = '1340px';
		document.getElementById("recommend_infinitecorridor").style.top = '1340px';
	}
	else
	{
		document.getElementById("manual").style.visibility = 'hidden';
		document.getElementById("calc").style.top = '300px';
		document.getElementById("recommend").style.top = '700px';
		document.getElementById("recommend_ultimate").style.top = '890px';
		document.getElementById("recommend_mainroute").style.top = '890px';
		document.getElementById("recommend_weeklymission").style.top = '890px';
		document.getElementById("recommend_storystages").style.top = '890px';
		document.getElementById("recommend_infinitecorridor").style.top = '890px';
	}
}



function ultimateOpen()
{
	document.getElementById("recommend_ultimate").style.display = 'inline';
	document.getElementById("recommend_mainroute").style.display = 'none';
	document.getElementById("recommend_weeklymission").style.display = 'none';
	document.getElementById("recommend_storystages").style.display = 'none';
	document.getElementById("recommend_infinitecorridor").style.display = 'none';
	
	document.getElementById("ultimate").style.color = '#7A0099';
	document.getElementById("ultimate").style.background = '#D1BBFF';
	document.getElementById("ultimate").style.border = '8px #7A0099 double';
	document.getElementById("mainroute").style.color = '#008800';
	document.getElementById("mainroute").style.background = '#99FF99';
	document.getElementById("mainroute").style.border = '8px #008800 double';
	document.getElementById("weeklymission").style.color = '#008800';
	document.getElementById("weeklymission").style.background = '#99FF99';
	document.getElementById("weeklymission").style.border = '8px #008800 double';
	document.getElementById("storystages").style.color = '#008800';
	document.getElementById("storystages").style.background = '#99FF99';
	document.getElementById("storystages").style.border = '8px #008800 double';
	document.getElementById("infinitecorridor").style.color = '#008800';
	document.getElementById("infinitecorridor").style.background = '#99FF99';
	document.getElementById("infinitecorridor").style.border = '8px #008800 double';
}
function mainrouteOpen()
{
	document.getElementById("recommend_ultimate").style.display = 'none';
	document.getElementById("recommend_mainroute").style.display = 'inline';
	document.getElementById("recommend_weeklymission").style.display = 'none';
	document.getElementById("recommend_storystages").style.display = 'none';
	document.getElementById("recommend_infinitecorridor").style.display = 'none';
	
	document.getElementById("ultimate").style.color = '#008800';
	document.getElementById("ultimate").style.background = '#99FF99';
	document.getElementById("ultimate").style.border = '8px #008800 double';
	document.getElementById("mainroute").style.color = '#7A0099';
	document.getElementById("mainroute").style.background = '#D1BBFF';
	document.getElementById("mainroute").style.border = '8px #7A0099 double';
	document.getElementById("weeklymission").style.color = '#008800';
	document.getElementById("weeklymission").style.background = '#99FF99';
	document.getElementById("weeklymission").style.border = '8px #008800 double';
	document.getElementById("storystages").style.color = '#008800';
	document.getElementById("storystages").style.background = '#99FF99';
	document.getElementById("storystages").style.border = '8px #008800 double';
	document.getElementById("infinitecorridor").style.color = '#008800';
	document.getElementById("infinitecorridor").style.background = '#99FF99';
	document.getElementById("infinitecorridor").style.border = '8px #008800 double';
	
}
function weeklymissionOpen()
{
	document.getElementById("recommend_ultimate").style.display = 'none';
	document.getElementById("recommend_mainroute").style.display = 'none';
	document.getElementById("recommend_weeklymission").style.display = 'inline';
	document.getElementById("recommend_storystages").style.display = 'none';
	document.getElementById("recommend_infinitecorridor").style.display = 'none';
	
	document.getElementById("ultimate").style.color = '#008800';
	document.getElementById("ultimate").style.background = '#99FF99';
	document.getElementById("ultimate").style.border = '8px #008800 double';
	document.getElementById("mainroute").style.color = '#008800';
	document.getElementById("mainroute").style.background = '#99FF99';
	document.getElementById("mainroute").style.border = '8px #008800 double';
	document.getElementById("weeklymission").style.color = '#7A0099';
	document.getElementById("weeklymission").style.background = '#D1BBFF';
	document.getElementById("weeklymission").style.border = '8px #7A0099 double';
	document.getElementById("storystages").style.color = '#008800';
	document.getElementById("storystages").style.background = '#99FF99';
	document.getElementById("storystages").style.border = '8px #008800 double';
	document.getElementById("infinitecorridor").style.color = '#008800';
	document.getElementById("infinitecorridor").style.background = '#99FF99';
	document.getElementById("infinitecorridor").style.border = '8px #008800 double';
}
function storystagesOpen()
{
	document.getElementById("recommend_ultimate").style.display = 'none';
	document.getElementById("recommend_mainroute").style.display = 'none';
	document.getElementById("recommend_weeklymission").style.display = 'none';
	document.getElementById("recommend_storystages").style.display = 'inline';
	document.getElementById("recommend_infinitecorridor").style.display = 'none';
	
	document.getElementById("ultimate").style.color = '#008800';
	document.getElementById("ultimate").style.background = '#99FF99';
	document.getElementById("ultimate").style.border = '8px #008800 double';
	document.getElementById("mainroute").style.color = '#008800';
	document.getElementById("mainroute").style.background = '#99FF99';
	document.getElementById("mainroute").style.border = '8px #008800 double';
	document.getElementById("weeklymission").style.color = '#008800';
	document.getElementById("weeklymission").style.background = '#99FF99';
	document.getElementById("weeklymission").style.border = '8px #008800 double';
	document.getElementById("storystages").style.color = '#7A0099';
	document.getElementById("storystages").style.background = '#D1BBFF';
	document.getElementById("storystages").style.border = '8px #7A0099 double';
	document.getElementById("infinitecorridor").style.color = '#008800';
	document.getElementById("infinitecorridor").style.background = '#99FF99';
	document.getElementById("infinitecorridor").style.border = '8px #008800 double';
}
function infinitecorridorOpen()
{
	document.getElementById("recommend_ultimate").style.display = 'none';
	document.getElementById("recommend_mainroute").style.display = 'none';
	document.getElementById("recommend_weeklymission").style.display = 'none';
	document.getElementById("recommend_storystages").style.display = 'none';
	document.getElementById("recommend_infinitecorridor").style.display = 'inline';
	
	document.getElementById("ultimate").style.color = '#008800';
	document.getElementById("ultimate").style.background = '#99FF99';
	document.getElementById("ultimate").style.border = '8px #008800 double';
	document.getElementById("mainroute").style.color = '#008800';
	document.getElementById("mainroute").style.background = '#99FF99';
	document.getElementById("mainroute").style.border = '8px #008800 double';
	document.getElementById("weeklymission").style.color = '#008800';
	document.getElementById("weeklymission").style.background = '#99FF99';
	document.getElementById("weeklymission").style.border = '8px #008800 double';
	document.getElementById("storystages").style.color = '#008800';
	document.getElementById("storystages").style.background = '#99FF99';
	document.getElementById("storystages").style.border = '8px #008800 double';
	document.getElementById("infinitecorridor").style.color = '#7A0099';
	document.getElementById("infinitecorridor").style.background = '#D1BBFF';
	document.getElementById("infinitecorridor").style.border = '8px #7A0099 double';
}

function clearData()
{
	document.getElementById("totalHP").value='';
	document.getElementById("currentHP").value='';
	document.getElementById("atk_1").value='';
	document.getElementById("atk_2").value='';
	document.getElementById("atk_3").value='';
	document.getElementById("atk_4").value='';
	document.getElementById("atk_5").value='';
	document.getElementById("skill_1").value='0';
	document.getElementById("skill_2").value='0';
	document.getElementById("skill_3").value='0';
	document.getElementById("skill_4").value='0';
	document.getElementById("skill_5").value='0';
	skillGraphicChange('skill_1');
	skillGraphicChange('skill_2');
	skillGraphicChange('skill_3');
	skillGraphicChange('skill_4');
	skillGraphicChange('skill_5');
}

var selectul;
var ultimate=[0,0,0,0];
function seriesUltimate(selectul)
{
	ultimate=[0,0,0,0];
	ultimate[selectul-1]=1;
	for(var k=1;k<=4;k++)
	{
		if(ultimate[k-1]==1)
		{
			document.getElementById("ul"+k).style.display = 'table';
			if(document.getElementById("ul"+k+"_attr"))document.getElementById("ul"+k+"_attr").style.display = 'table';
			document.getElementById("sul"+k).style.color = '#FF8800';
			document.getElementById("sul"+k).style.background = '#FFEE99';
			document.getElementById("sul"+k).style.border = '8px #FF8800 double';
		}
		else
		{
			document.getElementById("ul"+k).style.display = 'none';
			if(document.getElementById("ul"+k+"_attr"))document.getElementById("ul"+k+"_attr").style.display = 'none';
			document.getElementById("sul"+k).style.color = '#0000FF';
			document.getElementById("sul"+k).style.background = '#CCDDFF';
			document.getElementById("sul"+k).style.border = '8px #0000FF double';
		}
	}
	
}

var attr, table_name;
function attri(attr, table_name)
{
	if(attr!='all')
	{
		var w=document.getElementById(table_name).offsetWidth;
		var tab=document.getElementById(table_name).rows;
		var x=document.getElementById(table_name).rows.length;
		for(var k=0; k<x; k++)
		{
			if(tab[k].className==attr || tab[k].className=='header')
			{
				tab[k].cells[0].style.width=520;
				tab[k].cells[1].style.width=140;
				tab[k].cells[2].style.width=w-650;
				tab[k].cells[0].style.border='2px #000 solid';
				tab[k].cells[1].style.border='2px #000 solid';
				tab[k].cells[2].style.border='2px #000 solid';
				tab[k].style.display = 'table-row';
			}
			else tab[k].style.display = 'none';
		}
	}
	else
	{
		var w=document.getElementById(table_name).offsetWidth;
		var tab=document.getElementById(table_name).rows;
		var x=document.getElementById(table_name).rows.length;
		for(var k=0; k<x; k++)
		{
			tab[k].cells[0].style.width=520;
			tab[k].cells[1].style.width=140;
			tab[k].cells[2].style.width=w-650;
			tab[k].style.display = 'table-row';
		}
	}
}

var selectw;
var week=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
function seriesWeek(selectw)
{
	week=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	week[selectw-1]=1;
	for(var k=1;k<=33;k++)
	{
		if(week[k-1]==1)
		{
			document.getElementById("w"+k).style.display = 'table';
			document.getElementById("sw"+k).style.color = '#FF8800';
			document.getElementById("sw"+k).style.background = '#FFEE99';
			document.getElementById("sw"+k).style.border = '8px #FF8800 double';
		}
		else
		{
			document.getElementById("w"+k).style.display = 'none';
			document.getElementById("sw"+k).style.color = '#0000FF';
			document.getElementById("sw"+k).style.background = '#CCDDFF';
			document.getElementById("sw"+k).style.border = '8px #0000FF double';
		}
	}
	
}
var selects;
var story=[0,0,0,0,0,0];
function seriesStory(selects)
{
	story=[0,0,0,0,0,0];
	story[selects-1]=1;
	for(var g=1;g<=6;g++)
	{
		if(story[g-1]==1)
		{
			document.getElementById("s"+g).style.display = 'table';
			document.getElementById("ss"+g).style.color = '#FF8800';
			document.getElementById("ss"+g).style.background = '#FFEE99';
			document.getElementById("ss"+g).style.border = '8px #FF8800 double';
		}
		else
		{
			document.getElementById("s"+g).style.display = 'none';
			document.getElementById("ss"+g).style.color = '#0000FF';
			document.getElementById("ss"+g).style.background = '#CCDDFF';
			document.getElementById("ss"+g).style.border = '8px #0000FF double';
		}
	}
	
}

var selectm;
var main=[0,0,0];
function seriesMain(selectm)
{
	main=[0,0,0];
	main[selectm-1]=1;
	for(var k=1;k<=3;k++)
	{
		if(main[k-1]==1)
		{
			document.getElementById("m"+k).style.display = 'table';
			document.getElementById("sm"+k).style.color = '#FF8800';
			document.getElementById("sm"+k).style.background = '#FFEE99';
			document.getElementById("sm"+k).style.border = '8px #FF8800 double';
		}
		else
		{
			document.getElementById("m"+k).style.display = 'none';
			document.getElementById("sm"+k).style.color = '#0000FF';
			document.getElementById("sm"+k).style.background = '#CCDDFF';
			document.getElementById("sm"+k).style.border = '8px #0000FF double';
		}
	}
	
}

var selectm_s;
var main_s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
function seriesMain_stage(selectm_s)
{
	main_s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	main_s[selectm_s-1]=1;
	for(var k=1;k<=15;k++)
	{
		if(main_s[k-1]==1)
		{
			document.getElementById("m"+k+"_s").style.display = 'table';
			document.getElementById("sm"+k+"_s").style.color = '#FF3333';
			document.getElementById("sm"+k+"_s").style.background = '#FFCCCC';
			document.getElementById("sm"+k+"_s").style.border = '8px #FF3333 double';
		}
		else
		{
			document.getElementById("m"+k+"_s").style.display = 'none';
			document.getElementById("sm"+k+"_s").style.color = '#BB5500';
			document.getElementById("sm"+k+"_s").style.background = '#FFDDAA';
			document.getElementById("sm"+k+"_s").style.border = '8px #BB5500 double';
		}
		
	}
	
}

function fullHP()
{
	totalHP = document.getElementById("totalHP").value;

	if(isNaN(totalHP))
	{
		alert("[錯誤]數字格式不符，請重新輸入");
		error=1;
	}
	else if(eval(totalHP)<0)
	{
		alert("[錯誤]血量不得小於零，請重新輸入");
		error=1;
	}
	else if(totalHP=='')
	{
		alert("[錯誤]請先輸入血量");
		error=1;
	}
	else
	{
		currentHP = totalHP;
		document.getElementById("currentHP").value = currentHP;
	}
	if(error==1) 
	{
		
		document.getElementById("resultLabel").style.background = "#FCC";
		document.getElementById("resultLabel").style.color = "#F00";
		document.getElementById("resultLabel").style.border = "8px #F00 dashed";
		document.getElementById("resultLabel").style.visibility = "visible";
		document.getElementById("resultLabel").innerHTML = "E R R O R";
	}
}

function damageInc()
{
	if(document.getElementById("damageinc").checked==true)
	{
		damageinc=1;
	}
	else damageinc=0;
}

var miss_id;
function miss_hit(miss_id)
{
	if(miss_flag[miss_id-1]==0)
	{
		miss_flag[miss_id-1]=1;
		document.getElementById("miss_"+miss_id).src = './img/miss.png';
	}
	else
	{
		miss_flag[miss_id-1]=0;
		document.getElementById("miss_"+miss_id).src = './img/miss_dark.png';
	}
}

function logoChange()
{
	logo++;
	if(logo%3==0) document.getElementById("logo").src = './img/dasheng_1.png';
	else if(logo%3==1) document.getElementById("logo").src = './img/dasheng_2.png';
	else document.getElementById("logo").src = './img/dasheng_3.png';
}

function NullSrcReplace(obj)
{
    var attr=obj.parentElement.parentElement.className;
    switch(attr)
	{
		case 'water':
			obj.src='./img/noname_1.png';
        break;
        case 'fire':
			obj.src='./img/noname_2.png';
        break;
        case 'earth':
			obj.src='./img/noname_3.png';
        break;
        case 'light':
			obj.src='./img/noname_4.png';
        break;
        case 'dark':
			obj.src='./img/noname_5.png';
        break;
        default:
			obj.src='./img/noname.png';
    }
}

/* Icon change */

var logo_u49=0;
function headChange_u49()	/* 曠古戰王．吉爾伽美什 */
{
	logo_u49++;
	if(logo_u49%2==0)
	{
		document.getElementById("logo_u49").src = './img/ultimate_49_1.png';
		document.getElementById("logo_u49").alt = "曠古戰王．吉爾伽美什";
		document.getElementById("logo_u49").title = "曠古戰王．吉爾伽美什";
	}
	else if(logo_u49%2==1)
	{
		document.getElementById("logo_u49").src = './img/ultimate_49_2.png';
		document.getElementById("logo_u49").alt = "浴血戰王．吉爾伽美什";
		document.getElementById("logo_u49").title = "浴血戰王．吉爾伽美什";
	}
}

var logo_u61=0;
function headChange_u61()	/* 正義的酷刑．假面判官 */
{
	logo_u61++;
	if(logo_u61%2==0)
	{
		document.getElementById("logo_u61").src = './img/ultimate_61_1.png';
		document.getElementById("logo_u61").alt = "正義的酷刑．假面判官";
		document.getElementById("logo_u61").title = "正義的酷刑．假面判官";
	}
	else if(logo_u61%2==1)
	{
		document.getElementById("logo_u61").src = './img/ultimate_61_2.png';
		document.getElementById("logo_u61").alt = "滅罪貴公子．審結判官";
		document.getElementById("logo_u61").title = "滅罪貴公子．審結判官";
	}
}

var main_8_5_3_3=0;
function change_main_8_5_3_3(main_8_5_3_3)	/* 偽八封王 */
{
	if(main_8_5_3_3==1)
	{
		document.getElementById("main_8_5_3_3_1").style.display = 'none';
		document.getElementById("main_8_5_3_3_2").style.display = 'table-row';
	}
	else if(main_8_5_3_3==2)
	{
		document.getElementById("main_8_5_3_3_1").style.display = 'table-row';
		document.getElementById("main_8_5_3_3_2").style.display = 'none';
	}
}

var logo_u64=0;
function headChange_u64()	/* 魅之歌姬．派蒙 */
{
	logo_u64++;
	if(logo_u64%2==0)
	{
		document.getElementById("logo_u64").src = './img/ultimate_64_1.png';
		document.getElementById("logo_u64").alt = "魅之歌姬．派蒙";
		document.getElementById("logo_u64").title = "魅之歌姬．派蒙";
	}
	else if(logo_u64%2==1)
	{
		document.getElementById("logo_u64").src = './img/ultimate_64_2.png';
		document.getElementById("logo_u64").alt = "媚惑魔音．派蒙";
		document.getElementById("logo_u64").title = "媚惑魔音．派蒙";
	}
}