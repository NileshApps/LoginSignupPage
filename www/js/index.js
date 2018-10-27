var board = [];
var cvsHeight,cvsWidth;
var isDrawing = false,insideCanvas = false;
var cvsDim;
var cvs;	
var ctx;	
var prevX = -1,prevY = -1;
var posVector = [];
function init(){	
	cvs = document.getElementById("canvas");	
	ctx = cvs.getContext("2d");	
	cvsHeight = cvs.height = canvas.offsetHeight;
	cvsWidth = cvs.width = cvs.offsetWidth;	 			
	console.log("width:",cvsWidth," height:",cvsHeight);
	console.log("X: ",cvs.offsetLeft," Y: ",cvs.offsetTop);	
	console.log(cvs.offsetParent);		
	var point = {x:-1,y:-1};
	posVector.push(point);
	cvs.addEventListener('touchmove', dragging, false);
	cvs.addEventListener('touchstart', dragStart, false);
	cvs.addEventListener('touchend', dragEnd, false);   
	//cvsDim = {top:rect.top,left:rect.left,bottom:rect.bottom,right:rect.right};
	//cvsDim.top = rect.top;
	//cvsDim.left = rect.left;
	//cvsDim.bottom = rect.bottom;
	//cvsDim.right =  rect.right;
	//console.log(cvsDim.top, cvsDim.left, cvsDim.bottom, cvsDim.right);		
}
function dragStart(event){
	isDrawing = true;
	if(isDrawing && insideCanvas)
		draw_pixel(event);			
}
function dragging(event){	
	if(isDrawing && insideCanvas){						
		draw_pixel(event);		
		//console.log("X: ",x," Y: ",y);
	}
}
function draw_pixel(event){
	if(event.type == "mousemove" || event.type == "mousedown" || event.type == "mouseup"){			
			var x = event.pageX;
			var y = event.pageY;						
	}
	else{			
			event.preventDefault();						
			var touch = event.touches[0];						
			var x = disc[i].LineX;			
			var y = disc[i].LineY;									
		}
	//cvs = document.getElementById("canvas");		
	//ctx = cvs.getContext("2d");
	//var x = event.pageX-cvs.offsetLeft;
	//var y = event.pageY-cvs.offsetTop;			
	if(prevX == -1 || prevY == -1){
		ctx.beginPath();
		ctx.moveTo(x,y);				
	}
	else{		
		ctx.lineTo(x,y);
		ctx.stroke();	
	}	
	var point = {x:x,y:y};	
	posVector.push(point);	
	prevX = x;prevY = y;
}
function dragEnd(event){	
	isDrawing = false;
	prevX = prevY = -1;
	var point = {x:-1,y:-1};
	posVector.push(point);	
}
function inCanvas(){
	insideCanvas = true;	
}
function outCanvas(){
	insideCanvas = false;	
}
function clearButton(){	
	clearCanvas();	
	send_canvas(make_pos_vector_data(posVector));
	posVector = [];
}
function make_pos_vector_data(posVector){
	packet = {};
	for(i=0;i<posVector.length;++i){
		packet[String(i)] = posVector[i];
	}
	return packet;
}
function drawButton(){		
	get_canvas();	 	
}
function clearCanvas(){
	ctx.clearRect(0, 0, cvs.width, cvs.height);
}
function draw_canvas(Mdata){
	length_data = parseInt(Mdata['length']);	
	data = Mdata['data'];
	clearCanvas();
	var point = {x:-1,y:-1}
	posVector.push(point);
	for(i=1;i<length_data;++i){
		x = parseInt(data[String(i)]['x']);
		y = parseInt(data[String(i)]['y']);
		prevx = parseInt(data[String(i-1)]['x']);
		prevy = parseInt(data[String(i-1)]['y']);		
		if(x!=-1 && y!=-1){
			if(prevx == -1 || prevy == -1){
				ctx.beginPath();
				ctx.moveTo(x,y);				
			}
			else{		
				ctx.lineTo(x,y);
				ctx.stroke();	
			}	
		}
		else
			ctx.beginPath();
		var point = {x:x,y:y}
		posVector.push(point);
	}	
}
/*
function send_canvas(){	
	var request = new XMLHttpRequest();
	request.open('GET', 'http://127.0.0.1:5000/draw', true);	
	request.onload = function () {  	
//  	console.log(this.response);  		
	Display.innerHTML = '';
  	Index = this.response;
  	var Resp = JSON.parse(this.response);
  	console.log(Resp);  	
  	pokemon_list.push(Resp);
  	++pokemon_list_index;
  	Name = Resp.Name; //getNameFromIndex(Index);
    var Url = name_to_image_link(Name);//getNameFromIndex(Index) + End;    
    //var Url = "F:\\Python27\\PokemonSprites\\charizard\\Normal\\1.png";
    console.log(Url);   
    var div = make_pokemon_card(Url,Name,pokemon_list_index);
    Display.appendChild(div);
	}
	request.send();	
	return this.response;
}
 $(document).ready( function() {
        $('#clear').click(function() {
           var formdata = serialize({x:10,y:20});
           $.ajax({
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formdata),
                dataType: 'json',
                url: 'http://127.0.0.1:5000/get_canvas',
                success: function (e) {
                    console.log(e);
                    //window.location = "http://192.168.57.223:5000/preview";                    
                },
                error: function(error) {
                console.log(error);
            }
            });
        });
  });
*/
function send_canvas_data(){
	send_canvas(make_pos_vector_data(posVector));
}
 function send_canvas(formdata){
 	//var formdata = serialize({x:10,y:20});
 	//var formdata = {x:10,y:20};
           $.ajax({
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formdata),
                dataType: 'json',                
                url: 'https://pictionary23.herokuapp.com/canvas_data',
                success: function (e) {
                    console.log(e);
                    //window.location = "http://192.168.57.223:5000/preview";                    
                },
                error: function(error) {
                console.log(error);
            }
        })
 }
 function get_canvas(){ 	
 	//var formdata = serialize({x:10,y:20});
 	//var formdata = {x:10,y:20};
           $.ajax({
                type: 'GET',
                contentType: 'application/json',                
                dataType: 'json',                
                url: 'https://pictionary23.herokuapp.com/canvas_data',
                success: function (e) {
                    console.log(e);                      
                    draw_canvas(e);                                                         
                    //window.location = "http://192.168.57.223:5000/preview";                    
                },
                error: function(error) {
                console.log(error);
            }
        })  	      
 }

 let game = setInterval(send_canvas_data,2000);