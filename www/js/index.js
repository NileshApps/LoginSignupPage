function setLocal(val){
	localStorage.mode = val;
}
function init(){
//var val = window.localStorage.getItem('nilesh');
//document.getElementById('time-left').innerHTML = val;
//if(val == null)
//	window.localStorage.setItem('nilesh','saxena');
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
var hh = today.getHours();
var mm = today.getMinutes();
var sec = today.getSeconds();
console.log(dd,mm,yyyy,hh,mm,sec);
//var db = window.openDatabase("test", "1.0", "Test DB", 1000000);
}
function clickLS(){
var val = window.localStorage.getItem('nilesh');
document.getElementById('time-left').innerHTML = val;
if(val == null)
	window.localStorage.setItem('nilesh','saxena');
}