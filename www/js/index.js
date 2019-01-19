function switch_to_signup(){	
	document.getElementById("front-board").style.transform = "rotateY(-180deg)";	
	document.getElementById("back-board").style.transform = "rotateY( 0deg )";
}
function switch_to_login(){
	document.getElementById("front-board").style.transform = "rotateY(0deg)";	
	document.getElementById("back-board").style.transform = "rotateY( 180deg )";
}