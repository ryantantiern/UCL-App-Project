
function getMousePos(canvas, evt) {
  var timeElapsed = Date.now() - startTime;
	var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
		t: Date.now() - startTime;
  };
}
function drawLine(x1, y1, x2, y2){
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}
var updateUserLine = function(e){
  var mousePos = getMousePos(canvas, e);
  currentPos = {x: mousePos.x, y: mousePos.y, t: mousePos.t};
  lastRecordedPos = {x: mousePos.x, y:mousePos.y};
  userLine.push(currentPos);
}

function drawUserLine(){
  // drawing loop 
  if(handler_play == 0){
		context.clearRect(0, 0, canvas.width, canvas.height);

		if(userLine[0] != null){
			for(i = 0; i < userLine.length - 1; i++){
				drawLine(userLine[i].x , userLine[i].y, userLine[i+1].x, userLine[i+1].y);
			}
		}
		setTimeout(function(){drawUserLine();}, 20);
  }
}

function move_line_left(){
	if(handler_play == 1){
		for(i = 0; i < userLine.length; i++){
		 userLine[i].x -= 1;
		 if(userLine[0].x < 0){
			 userLine.splice(0,1);
		 }
		}
		setTimeout(function(){move_line_left();}, 20);
	}
}

function updateIfNoEntry(){
	if(handler_play == 1){
    if(userLine[userLine.length - 1].x != lastRecordedPos.x ){
      var bufferPos = {x:lastRecordedPos.x, y:lastRecordedPos.y,t: Date.now()- startTime};
      userLine.push(bufferPos);
    }
		setTimeout(function {updateIfNoEntry(); 20});
	}
}

function track_wave(){
	if(handler_play == 1){
		if(userLine[length-1] != null){
			trackedWave.push(userLine[length-1]);
		}
		setTimeout(function(){track_wave();}, 20);
	}
}


var handler_end = function(){
  // Stop loop 
  play = 0;
  canvas.removeEventListener('mousemove', updateUserLine);
  audio.removeEventListener('handler_pause', handler_pause); // True when not paused
  audio.removeEventListener('handler_play', handler_play);
}

var handler_play = function(){
  canvas.addEventListener('mousemove', updateUserLine);
  move_line_left();
  drawUserLine();
  play = 1;
	
}

var handler_pause = function(e){
	canvas.removeEventListener('mousemove', updateUserLine);
  play = 0; 
} 
function adjustWaveToScreen(uncorrectedWave){
  // waveform produced is a record of Y-values over time. 
  // These values are spread over the screen width equally.
  var dX = canvas.width/uncorrectedWave.length;
  var correctedX = 0;
  for(i = 0; i < uncorrectedWave.length; i++){
    uncorrectedWave[i].x = correctedX;
    correctedX += dX;
  }
  


var canvas = document.getElementById('myCanvas');
var audio = document.getElementById('myAudio');
var context = canvas.getContext('2d');
var startTime = Date.now();																		 
var currentPos;
var lastRecordedPos;
var userLine = new Array();
var trackedWave = new Array(); 

var play = 1; //0=OFF 1=ON

// Canvas Style
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;

$("body").css("overflow", "hidden"); 


audio.addEventListener('play',handler_play);
audio.addEventListener('pause', handler_pause);
audio.addEventListener('ended', handler_end);
















