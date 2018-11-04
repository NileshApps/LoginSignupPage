<html>
<head>	
	<!--<link rel = "stylesheet" type = "text/css" href = "https://storage.googleapis.com/code.getmdl.io/1.0.6/material.indigo-pink.min.css">-->
	<link rel = "stylesheet" href = "css/index.css">
	<!--<link href="https://fonts.googleapis.com/css?family=Poiret+One|Roboto" rel="stylesheet">-->
	<!--<script src = "https://storage.googleapis.com/code.getmdl.io/1.0.6/material.js"></script>-->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>	
	<script src = "js/index.js"></script>
</head>
<body onload = "init()">	
	<div class = "grid" style = "padding:0px;">
		<div class = "board">
			<canvas id = "canvas" class = "canvas" onmouseenter="inCanvas()" onmouseleave="outCanvas()" ontouchmove="dragging(event)" ontouchstart="dragStart(event)" ontouchend="dragEnd(event)" onmousemove="dragging(event)"onmousedown="dragStart(event)" onmouseup="dragEnd(event)"></canvas>	
		</div>
		<!--<div class = "tools">
			<button id = "clear" onclick = "clearButton()">Clear</button>
			<button id = "draw" onclick = "drawButton()">Draw</button>
			<button id = "back" onclick = "go_back()">Back</button>			
		</div>
	-->		
	</div>
	<div class = "below-bar">			
		<button id = "back" style = "width:80%;" onclick = "go_back()">Back</button>
		<br/><br/>
		<button id = "clear" style = "width:80%;" onclick = "clearButton()">Clear</button>
	</div>
</body>
</html>	