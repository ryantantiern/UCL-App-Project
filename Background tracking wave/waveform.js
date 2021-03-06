
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
		t: Date.now() - startTime
  };
}
function drawLine(x1, y1, x2, y2){
  context.beginPath();
  context.moveTo(x1, y1);
  context.quadraticCurveTo((x1+x2)/2,(y1+y2)/2, x2, y2);
	//context.lineTo(x2,y2);
	context.lineWidth = 3;
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
  if(play == 1){
		context.clearRect(0, 0, canvas.width, canvas.height);
		//FOR TESTING
		drawLine(canvas.width/2, 0, canvas.width/2, canvas.height);
		if(userLine[0] != null){
			for(i = 0; i < userLine.length - 1; i++){
				drawLine(userLine[i].x , userLine[i].y, userLine[i+1].x, userLine[i+1].y);
			}
		}
		setTimeout(function(){drawUserLine();}, 20);
  }
}

function move_line_left(){
	if(play == 1){
		for(i = 0; i < userLine.length; i++){
		 userLine[i].x -= 1;
		}
		setTimeout(function(){move_line_left();}, (40500)/(6.49*20/100*window.innerHeight));
	}
}


function updateIfNoEntry(){
	
	if(play == 1 && mouse_move == 0){
		if(lastRecordedPos != null){
				var bufferPos = {x:lastRecordedPos.x, y:lastRecordedPos.y, t:Date.now()- startTime};
				userLine.push(bufferPos);
		}
		setTimeout(function (){updateIfNoEntry();}, 10);
	}
}
function mouseStopped(){
	mouse_move = 0;
	updateIfNoEntry();
}

function track_wave(){
	if(play == 1){
		if(userLine[userLine.length-1] != null){
			var temp = new Object();
			temp.x = userLine[userLine.length-1].x;
			temp.y = userLine[userLine.length-1].y;
			temp.t = userLine[userLine.length-1].t;
			
			trackedWave.push(temp);
		}
		setTimeout(function(){track_wave();}, 20);
	}
}


var handler_end = function(){
  // Stop loop 
  play = 0;
  canvas.removeEventListener('mousemove', updateUserLine);
  audio.removeEventListener('pause', handler_pause); // True when not paused
  audio.removeEventListener('play', handler_play);
	
	if(audio.ended){
		evaluatePlot(trackedWave);
		console.log(trackedWave[30]);

		// converts array into json format
		var str_json = JSON.stringify(trackedWave);

		// opens a request to server
		var request= new XMLHttpRequest();
		var php_sess_addData= "../../php/sess_addData.php";
		request.open("POST", php_sess_addData, true);
		request.setRequestHeader("Content-type", "application/json");
		request.send(str_json);
	}

}

var handler_play = function (){	
;
	if(onMusic_go == 0){
		onMusic_go = 1;
		onMusic_correction = Date.now() - startTime;
	}
	canvas.addEventListener('mousemove', updateUserLine);
	canvas.addEventListener('mousemove', function(){
		mouse_move = 1;
		clearTimeout(timer);
		timer=setTimeout(function(){mouseStopped();}, 50);
	});
	track_wave();
  move_line_left();
  drawUserLine();
  play = 1;
	
	
}

var handler_pause = function(){
	canvas.removeEventListener('mousemove', updateUserLine);
  play = 0; 
}

var manual_pp = function(e){
	if(e.keyCode == 27 || e.keyCode == 80){
		if(audio.paused){
			audio.play();
			play = 1;
		}
		else{
			audio.pause();
			play = 0;
		}
	}
}

function evaluatePlot(uncorrectedWave){
	// values will be relative instead of absolute
	
	// X plot
	var midPoint = canvas.width/2;
  for(i = 0; i < uncorrectedWave.length; i++){
    uncorrectedWave[i].x = (uncorrectedWave[i].x - midPoint)/midPoint;
  }
	
	// Y plot
	for(i = 0; i < uncorrectedWave.length; i++){
    uncorrectedWave[i].y = uncorrectedWave[i].y/(window.innerHeight * 0.7);
  }
	
	// time
	for(i = 0; i < uncorrectedWave.length; i++){
    uncorrectedWave[i].t = uncorrectedWave[i].t - onMusic_correction;
		uncorrectedWave[i].t = uncorrectedWave[i].t/(audio.duration * 1000) ;
  }
}  


var canvas = document.getElementById('myCanvas');
var audio = document.getElementById('myAudio');
var context = canvas.getContext('2d');
var startTime = Date.now();																		 
var currentPos = null;
var lastRecordedPos = null;
var userLine = [];
var trackedWave = [];
var timer; 
var onMusic_correction;


var play = 1; //0=OFF 1=ON
var mouse_move = 0;
var onMusic_go = 0;

// Canvas Style
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;


window.addEventListener('keydown',manual_pp);
audio.addEventListener('play',handler_play);
audio.addEventListener('pause', handler_pause);
audio.addEventListener('ended', handler_end);

			// Above, I included Jquery as it was the recommended way to do this.
        // speed in milliseconds - found a forumla for song 1 to make the speed right regardless of window size
		
        var scrollSpeed = 40000/(6.49*20/100*window.innerHeight);
				console.log(audio.duration);

        // set the default position  - window width/2, so it starts in the center
        var current = canvas.width/2;

		//function that scrolls the pitch wave
    function bgscroll(){
			//decrease 1 pixel every time the function is called
			current-=1;
			//From my understanding, 'current' is x value and what's after the '+' is y value.
			//Given that the resolution is 1080p, the pitch wave height would be 216px, so 20%
			//therefore, I set the height at 'px 40%' so it always places it in the center :)
			$('canvas').css('background-position', current + 'px 20%');
		}
		//Calls the scrolling function repeatedly
		setInterval("bgscroll()", scrollSpeed);






