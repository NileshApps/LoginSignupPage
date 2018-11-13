function setLocal(val){
	localStorage.mode = val;
}
Date.prototype.getWeek = function() {
    var dt = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - dt) / 86400000) + dt.getDay()+1)/7);
};
function init(){
var NewD = new Date();
var DayCode = NewD.getDay();
if(DayCode>=1 && DayCode<=5)
	document.getElementById(DayCode).style.fontSize = "30px";	
var db = window.openDatabase("test", "1.0", "Test DB", 1000000);
var InVal = window.localStorage.getItem(get_in_str());
if (InVal != null){
	D = new Date(InVal);
	console.log(D);
	document.getElementById('in').innerHTML = "<br/><br/><br/><u>Check In </u><br/>"+get_time_str_without_sec2(D);	
}
var OutVal = window.localStorage.getItem(get_out_str());
if (OutVal != null){
	D = new Date(OutVal);
	console.log(D);
	document.getElementById('out').innerHTML = "<br/><br/><br/><u>Check Out </u><br/>"+get_time_str_without_sec2(D);	
}
var TimeCompleted = window.localStorage.getItem(get_total_time_str());
console.log(TimeCompleted);
if(TimeCompleted!=null){
	document.getElementById('time-done').innerHTML = "<br/><u>Today's Time </u><br/>"+get_time_from_msec(TimeCompleted);		
}
else{
	document.getElementById('time-done').innerHTML = "<br/><u>Today's Time </u><br/>"+get_time_from_msec(0);	
}
var WeekTime = window.localStorage.getItem(get_week_str());
console.log(WeekTime);
if(WeekTime!=null){
	document.getElementById('time-left').innerHTML = "<br/>"+get_time_from_msec(WeekTime);		
}
else{
	document.getElementById('time-left').innerHTML = "<br/>"+get_time_from_msec(get_total_time());	
}
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
function get_date_str(){
var today = new Date();
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
function get_time_str_without_sec(){
var today = new Date();
var hh = today.getHours();
var mm = today.getMinutes();
return hh+":"+mm;
}
function get_time_str_without_sec2(today){
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
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
var hh = today.getHours();
var mm = today.getMinutes();
var sec = today.getSeconds();
return today;
}
function get_in_str(){
	return get_date_str() + "_in";
}
function get_out_str(){
	return get_date_str() + "_out";
}
function get_total_time_str(){
	return get_date_str() + "_tt";
}
function get_week_str(){
var myDate = new Date();
myDate.getFullYear()+":"+myDate.getWeek()+"_hours";
}
function get_total_time(){
	return 40*60*60*1000;
}
function checkIn(){
var key = get_in_str();
var val = window.localStorage.getItem(key);
if(val == null){		
	window.localStorage.setItem(key,get_datetime_object().toString());
	document.getElementById('in').innerHTML = "<br/><br/><br/><u>Check In </u><br/>"+get_time_str_without_sec();	
}
}
function checkOut(){
var keyin = get_in_str();
var InVal = window.localStorage.getItem(keyin);
if (InVal == null){
	alert("You did not Check-In today.");
}
else{
var key = get_out_str();
var val = window.localStorage.getItem(key);
if(val == null){	
	window.localStorage.setItem(key,get_datetime_object().toString());
	var ND = new Date(InVal);
	var diff = get_datetime_object().getTime() - ND.getTime();
	console.log("Diff",diff,get_datetime_object(),InVal);
	window.localStorage.setItem(get_total_time_str(),diff);			
	document.getElementById('out').innerHTML = "<br/><br/><br/><u>Check Out </u><br/>"+get_time_str_without_sec();
	document.getElementById('time-done').innerHTML = "<br/><u>Today's Time </u><br/>"+get_time_from_msec(diff);
	var WeekTime = window.localStorage.getItem(get_week_str());
	if(WeekTime == null)
		var time = get_total_time();
	else
		var time = WeekTime;
	window.localStorage.setItem(get_week_str(),time-diff);
	document.getElementById('time-left').innerHTML = "<br/>"+get_time_from_msec(time-diff);
	}
}
}
function ResetApp(){
	window.localStorage.clear();
	document.getElementById('in').innerHTML = "<button class = 'buttonNew' onclick = 'checkIn()' style = 'background-color: #0288D1;'><b>Check In </b></button>";
	document.getElementById('out').innerHTML = "<button class = 'buttonNew' onclick = 'checkOut()' style = 'background-color: #D32F2F;'><b>Check Out</b></button>";	
	document.getElementById('time-done').innerHTML = "<br/><u>Today's Time </u><br/>"+get_time_from_msec(0);
	document.getElementById('time-left').innerHTML = "<br/>"+get_time_from_msec(get_total_time());
}
function ShowDevInfo(){
	alert("App Developed By: Cyatrosi\nDate: 14/11/2018\nDescription: Keep Track of your office work hours.\nJust Check in and Check out when you punch and \nLet the app do the math.");
}