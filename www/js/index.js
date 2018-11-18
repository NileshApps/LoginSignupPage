var hrupRepeater,hrdownRepeater;
var dblClkTimeout;
var lastLongPress;
function setLocal(val){
	localStorage.mode = val;
}
var activeDay;
Date.prototype.getWeek = function() {
    var dt = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - dt) / 86400000) + dt.getDay()+1)/7);
};
function init(){
//window.localStorage.clear();
var NewD = new Date();
var DayCode = NewD.getDay();
change_active_day(DayCode);
fillup_info(DayCode);
//var db = window.openDatabase("test", "1.0", "Test DB", 1000000);
/*
var InVal = window.localStorage.getItem(get_in_str());
if (InVal != null){
	D = new Date(InVal);
	console.log(D);
	document.getElementById('in').innerHTML = "<br/><u>Check In </u><br/>"+get_time_str_without_sec2(D);	
}
var OutVal = window.localStorage.getItem(get_out_str());
if (OutVal != null){
	D = new Date(OutVal);
	console.log(D);
	document.getElementById('out').innerHTML = "<br/><u>Check Out </u><br/>"+get_time_str_without_sec2(D);	
}
var TimeCompleted = window.localStorage.getItem(get_total_time_str());
console.log(TimeCompleted);
if(TimeCompleted!=null){
	document.getElementById('time-done').innerHTML = "<br/>Your Today's time is "+get_time_from_msec(TimeCompleted);		
}
else{
	document.getElementById('time-done').innerHTML = "";	
}
var WeekTime = window.localStorage.getItem(get_week_str());
console.log(WeekTime);
if(WeekTime!=null){
	document.getElementById('time-left').innerHTML = get_time_from_msec(WeekTime);		
}
else{
	document.getElementById('time-left').innerHTML = get_time_from_msec(get_total_time());	
}
*/
}
function get_time_from_msec(msec){	
var hh = Math.floor(msec / 1000 / 60 / 60);
msec -= hh * 1000 * 60 * 60;
var mm = Math.floor(msec / 1000 / 60);
msec -= mm * 1000 * 60;
var ss = Math.floor(msec / 1000);
msec -= ss * 1000;
return hh+":"+mm+":"+ss;
}
function get_date_str(today){
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
return yyyy+"/"+mm+"/"+dd;
}
function get_time_str(){
var today = new Date();
var hh = today.getHours();
var mm = today.getMinutes();
var sec = today.getSeconds();
return hh+":"+mm+":"+sec;
}
function get_time_str_without_sec(today){
var hh = today.getHours();
var mm = today.getMinutes();
return hh+":"+mm;
}
function get_datetime_str(){
var str = get_date_str()+" "+get_time_str();
return str;
}
function get_datetime_object(){
var today = new Date();
return today;
}
function get_in_str(D){
	return get_date_str(D) + "_in";
}
function get_out_str(D){
	return get_date_str(D) + "_out";
}
function get_total_time_str(D){	
	return get_date_str(D) + "_tt";
}
function get_week_str(myDate){
	myDate.getFullYear()+":"+myDate.getWeek()+"_hours";
}
function get_week_str(){
	var myDate = new Date();
	myDate.getFullYear()+":"+myDate.getWeek()+"_hours";
}
function get_total_time(){
	return 40*60*60*1000;
}
function get_default_in_time(){
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth();
var yyyy = today.getFullYear();	
return RetDate = new Date(yyyy,mm,dd,11,0,0);
}
function get_default_out_time(){
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth();
var yyyy = today.getFullYear();	
return RetDate = new Date(yyyy,mm,dd,19,0,0);
}
function checkIn(){
var date = new Date();	
In(date,false);
}
function In(date,force){
var TDiff = get_diff_in_ms(date,activeDay);
var Diff = date.getTime() - TDiff;
var CurDate = new Date(TDiff);
console.log("checkIn :",Diff);
if(Diff==0 || force){
	var key = get_in_str(CurDate);
	var val = window.localStorage.getItem(key);
	if(val == null){		
		window.localStorage.setItem(key,date.toString());
		document.getElementById('in').innerHTML = "<br/><u>Check In </u><br/>"+get_time_str_without_sec(date);	
	}
}
else if(Diff>0){
	var key = get_in_str(CurDate);
	var val = window.localStorage.getItem(key);
	if(val == null){				
		window.localStorage.setItem(key,get_default_in_time().toString());
		document.getElementById('in').innerHTML = "<br/><u>Check In </u><br/>"+get_time_str_without_sec(get_default_in_time());	
	}	
}
}
function checkOut(){
var date = new Date();
Out(date,false);
}
function Out(date,force){
var TDiff = get_diff_in_ms(date,activeDay);
var Diff = date.getTime() - TDiff;
var CurDate = new Date(TDiff);
if(Diff == 0){
var keyin = get_in_str(date);
var InVal = window.localStorage.getItem(keyin);
if (InVal == null){
	alert("You did not Check-In today.");
}
else{
var key = get_out_str(date);
var val = window.localStorage.getItem(key);
if(val == null){	
	window.localStorage.setItem(key,date.toString());
	var ND = new Date(InVal);
	var diff = date.getTime() - ND.getTime();
	//console.log("Diff",diff,get_datetime_object(),InVal);
	window.localStorage.setItem(get_total_time_str(date),diff);			
	document.getElementById('out').innerHTML = "<br/><u>Check Out </u><br/>"+get_time_str_without_sec(date);
	document.getElementById('time-done').innerHTML = "<br/>Your Today's time is "+get_time_from_msec(diff);
	var WeekTime = window.localStorage.getItem(get_week_str());
	if(WeekTime == null)
		var time = get_total_time();
	else
		var time = WeekTime;
	window.localStorage.setItem(get_week_str(),time-diff);
	document.getElementById('time-left').innerHTML = get_time_from_msec(time-diff);
	}
}
}
else if(Diff>0){
var keyin = get_in_str(CurDate);
var InVal = window.localStorage.getItem(keyin);
if (InVal == null){
	alert("You did not Check-In.");
}
else{
var key = get_out_str(CurDate);
var val = window.localStorage.getItem(key);
if(val == null){	
	window.localStorage.setItem(key,get_default_out_time().toString());
	var ND = new Date(InVal);
	var diff = Math.max(0,get_default_out_time().getTime() - ND.getTime());
	//console.log("Diff",diff,get_datetime_object(),InVal);
	window.localStorage.setItem(get_total_time_str(CurDate),diff);			
	document.getElementById('out').innerHTML = "<br/><u>Check Out </u><br/>"+get_time_str_without_sec(get_default_out_time());
	document.getElementById('time-done').innerHTML = "<br/>Your Today's time is "+get_time_from_msec(diff);
	var WeekTime = window.localStorage.getItem(get_week_str());
	if(WeekTime == null)
		var time = get_total_time();
	else
		var time = WeekTime;
	window.localStorage.setItem(get_week_str(),time-diff);
	document.getElementById('time-left').innerHTML = get_time_from_msec(time-diff);
	}
}
}
}
function ResetApp(){
	window.localStorage.clear();
	document.getElementById('in').innerHTML = "<button class = 'buttonNew' onclick = 'checkIn()' style = 'background-color: #0288D1;'><b>Check In </b></button>";
	document.getElementById('out').innerHTML = "<button class = 'buttonNew' onclick = 'checkOut()' style = 'background-color: #D32F2F;'><b>Check Out</b></button>";	
	document.getElementById('time-done').innerHTML = "";
	document.getElementById('time-left').innerHTML = get_time_from_msec(get_total_time());
}
function ShowDevInfo(){
	alert("App Developed By: Cyatrosi\nDate: 14/11/2018\nDescription: Keep Track of your office work hours.\nJust Check in and Check out when you punch and \nLet the app do the math.");
}
function get_cdata_for_day(DayCode,IsActive){  
	if(DayCode == 1){
		if(IsActive == true)
			return "<center><button onclick = 'show_cur_info("+DayCode+")' class='mdl-button mdl-js-button mdl-button--icon active-day'><b>M</b></button></center>";
		else
			return "<button onclick = 'show_cur_info("+DayCode+")' class = 'mdl-button mdl-js-button mdl-button--icon inactive-day'>M</button>";
		}
	else if(DayCode == 2 || DayCode == 4){
		if(IsActive == true)
			return "<center><button onclick = 'show_cur_info("+DayCode+")' class='mdl-button mdl-js-button mdl-button--icon active-day'><b>T</b></button></center>";
		else
			return "<button onclick = 'show_cur_info("+DayCode+")' class = 'mdl-button mdl-js-button mdl-button--icon inactive-day'>T</button>";
	}	
	else if(DayCode == 3){
		if(IsActive == true)
			return "<center><button onclick = 'show_cur_info("+DayCode+")' class='mdl-button mdl-js-button mdl-button--icon active-day'><b>W</b></button></center>";
		else
			return "<button onclick = 'show_cur_info("+DayCode+")' class = 'mdl-button mdl-js-button mdl-button--icon inactive-day'>W</button>";
		}	
	else if(DayCode == 5){
		if(IsActive == true)
			return "<center><button onclick = 'show_cur_info("+DayCode+")' class='mdl-button mdl-js-button mdl-button--icon active-day'><b>F</b></button></center>";
		else
			return "<button onclick = 'show_cur_info("+DayCode+")' class = 'mdl-button mdl-js-button mdl-button--icon inactive-day'>F</button>";
		}
	else if(DayCode == 6 || DayCode == 0){
		if(IsActive == true)
			return "<center><button onclick = 'show_cur_info("+DayCode+")' class='mdl-button mdl-js-button mdl-button--icon active-day'><b>S</b></button></center>";
		else
			return "<button onclick = 'show_cur_info("+DayCode+")' class = 'mdl-button mdl-js-button mdl-button--icon inactive-day'>S</button>";
		}
	else
		return "";	
}
function fillup_info(id){
var NewD = new Date();
var TDiff = get_diff_in_ms(NewD,id);
var Diff = NewD.getTime() - TDiff;
var CurDate = new Date(TDiff);
console.log("Fill:",id," ms = ",Diff," with date ",CurDate);
var InVal = window.localStorage.getItem(get_in_str(CurDate));
if (InVal != null){
	D = new Date(InVal);	
	console.log(D,InVal,get_in_str(CurDate));
	document.getElementById('in').innerHTML = "<br/><u>Check In </u><br/>"+get_time_str_without_sec(D);	
}
else{
	if(Diff>=0)
		document.getElementById('in').innerHTML = "<button id = 'in_button' ontouchstart = 'init_timeout(this.id)' ontouchend = 'clear_timeout(this.id)' onmousedown = 'init_timeout(this.id)' onmouseup = 'clear_timeout(this.id)' onclick = 'checkIn()' class='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored buttonClassy' style = 'background-color: transparent;border:2px solid #0091EA;'>IN</button>";
	else
		document.getElementById('in').innerHTML = "";
}
var OutVal = window.localStorage.getItem(get_out_str(CurDate));
if (OutVal != null){
	D = new Date(OutVal);		
	document.getElementById('out').innerHTML = "<br/><u>Check Out </u><br/>"+get_time_str_without_sec(D);	
}
else{
	if(Diff>=0)
		document.getElementById('out').innerHTML = "<button id = 'out_button' ontouchstart = 'init_timeout(this.id)' ontouchend = 'clear_timeout(this.id)' onmousedown = 'init_timeout(this.id)' onmouseup = 'clear_timeout(this.id)' onclick = 'checkOut()' class='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored buttonClassy' style = 'background-color: transparent;border:2px solid #DD2C00;'>OUT</button>";
	else
		document.getElementById('out').innerHTML = "";
}
var TimeCompleted = window.localStorage.getItem(get_total_time_str(CurDate));
if(TimeCompleted!=null){
	document.getElementById('time-done').innerHTML = "<br/>Your Today's time is "+get_time_from_msec(TimeCompleted);		
}
else{
	document.getElementById('time-done').innerHTML = "";	
}
var WeekTime = window.localStorage.getItem(get_week_str(CurDate));
if(WeekTime!=null){
	document.getElementById('time-left').innerHTML = get_time_from_msec(WeekTime);		
}
else{
	document.getElementById('time-left').innerHTML = get_time_from_msec(get_total_time());	
}
}
function change_active_day(DayCode){
activeDay = DayCode;
for(var CurDay=0;CurDay<=6;++CurDay){	
	if(DayCode>=0 && DayCode<=6){
		if(DayCode == CurDay)
			document.getElementById(CurDay).innerHTML = get_cdata_for_day(CurDay,true);				
		else			
			document.getElementById(CurDay).innerHTML = get_cdata_for_day(CurDay,false);			
	}
	else{
		document.getElementById(DayCode).innerHTML = get_cdata_for_day(CurDay,false);	
	}
}
document.getElementById('time-done').innerHTML = "";
}
function show_cur_info(id){
	change_active_day(id);
	fillup_info(id);
}
function get_diff_in_ms(NewD,id){
var DayCode = NewD.getDay();
return NewD.getTime() - ((DayCode-id)*86400*1000);
}
function dec_hr_counter(Name){	
	if(Name == "hr")
		document.getElementById('hour').innerHTML = Math.max(0,parseInt(document.getElementById('hour').innerHTML) - 1);	
	if(Name == "mn")
		document.getElementById('minute').innerHTML = Math.max(0,parseInt(document.getElementById('minute').innerHTML) - 1);	
}
function inc_hr_counter(Name){	
	console.log('incC');
	if(Name == 'hr')
		document.getElementById('hour').innerHTML = Math.min(23,parseInt(document.getElementById('hour').innerHTML) + 1);	
	if(Name == 'mn')
		document.getElementById('minute').innerHTML = Math.min(59,parseInt(document.getElementById('minute').innerHTML) + 1);	
}
function pauseAnimation(El){
	El.style.animationIterationCount = 0;
}
function inc(val){
	if(val == 'hr'){
		inc_hr_counter('hr');
		hrupRepeater=setTimeout(function(){inc(val);}, 200);
	}
	if(val == 'mn'){
		inc_hr_counter('mn');
		hrupRepeater=setTimeout(function(){inc(val);}, 150);
	}
}
function dec(val){
	if(val == 'hr'){
		dec_hr_counter('hr');
		hrdownRepeater=setTimeout(function(){dec(val);}, 200);
	}
	if(val == 'mn'){
		dec_hr_counter('mn');
		hrdownRepeater=setTimeout(function(){dec(val);}, 150);
	}
}
function nullifyUp(val){
	if(val == 'hr')
		clearTimeout(hrupRepeater);
	if(val == 'mn')
		clearTimeout(hrupRepeater);
}
function nullifyDown(val){
	if(val == 'hr')
		clearTimeout(hrdownRepeater);
	if(val == 'mn')
		clearTimeout(hrdownRepeater);
}
function showClock(){
	var D = new Date();
	document.getElementById('hour').innerHTML = D.getHours();
	document.getElementById('minute').innerHTML = D.getMinutes();
	document.getElementById('time-selector').style.display = "block";
}
function hideClock(){	
	document.getElementById('hour').innerHTML = "";
	document.getElementById('minute').innerHTML = "";
	document.getElementById('time-selector').style.display = "none";
}
function init_timeout(val){	
	console.log("init_timeout",val,lastLongPress);
	lastLongPress = val;	
	dblClkTimeout = setTimeout(showClock,500);	
}
function clear_timeout(val){		
	clearTimeout(dblClkTimeout);	
}
function exec(){
	var D = new Date();
	var hr = parseInt(document.getElementById('hour').innerHTML);	
	var mn = parseInt(document.getElementById('minute').innerHTML);	
	D.setHours(hr);
	D.setMinutes(mn);
	document.getElementById('time-selector').style.display = "none";
	if(lastLongPress == 'in_button')
		In(D,true);
	if(lastLongPress == 'out_button')
		Out(D,true);
}