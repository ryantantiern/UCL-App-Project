function writeMessage(canvas, message) {
  var context = canvas.getContext('2d');
  //context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = '30px Courier New';
  context.fillStyle = 'black';
  context.fillText(message, 30, 40);
}
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}


function drawLine(x1, y1, x2, y2){
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

function drawUserLine(){
  // this is the main loop
  console.log("Draw User Line");
  
  if(flag == 0){
    context.clearRect(0, 0, canvas.width, canvas.height);

    // update userLine conitnuously so that it is never empty
    updateIfNoEntry();

    for(i = 0; i < userLine.length - 1; i++){
      // draws the line
      drawLine(userLine[i].x , userLine[i].y, userLine[i+1].x, userLine[i+1].y);
    }

    getValue();


    for( i = 0; i <userLine.length ; i++){
      //shifts line to the left
      userLine[i].x -= 3 ;
      if(userLine[0].x < 0){
        userLine.splice(0,1);
      }
    }

    // Never ending loop for continuous function 
    writeMessage(canvas, "Press e to see waveform. this will end the program.");

    setTimeout(function(){drawUserLine();}, 10);

  }

}

function getValue() {
  // push value into final Array
  var savedValue ={"x": null, "y": null, "timeStamp": null}; // JS object
  var timeElapsed = Date.now() - startTime;
  savedValue["timeStamp"] = timeElapsed;
  $.extend(savedValue, userLine[userLine.length - 1]);
  trackedWave.push(savedValue); // NOTE :: elements here do not represent a full waveform 
                                // as the x values have not been corrected to the screen width
                                // Array of objects ->> json formated
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
  
}  

function printFinalWaveForm(correctedWave){
  context.clearRect(0, 0, canvas.width, canvas.height);
  for(i = 0; i <correctedWave.length - 1; i++){
    drawLine(correctedWave[i].x , correctedWave[i].y, correctedWave[i+1].x, correctedWave[i+1].y);
  }
}                    

var end_DrawUserLine = function(e){
  // Stop loop 
  console.log("End_Draw_User_Line");
  if(e.keyCode == 69){
    flag = 1;
    var new_element = canvas.cloneNode(true);
    /*canvas.parentNode.replaceChild(new_element, canvas);
    canvas.removeEventListener('mousemove', updateUserLine);
    canvas.removeEventListener('mousedown', handler); // True when paused
    canvas.removeEventListener('mousedown', pause); // True when not paused
    e.target .removeEventListener(e.type, arguments.callee);
    adjustWaveToScreen(trackedWave);
    /* TRACKED WAVE SHOULD BE SAVED AS A JSON FILE HERE THEN EXPORTED TO DB*/
    printFinalWaveForm(trackedWave);

    var str_json = JSON.stringify(trackedWave);
    var request= new XMLHttpRequest();
    request.open("POST", "http://localhost/JSON_Handler.php", true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(str_json);

    
  }
}

function updateIfNoEntry(){
      // updates state of userLine
    if(userLine[userLine.length - 1].x != lastRecordedPos.x ){
      // push last recorded value in if last value of userLine does not equal to last recorded value
      // this is to ensure continuous entry of values
      var bufferPos = {x:null, y:null};
      $.extend(true, bufferPos, lastRecordedPos);
      userLine.push(bufferPos);
    }
}


var handler = function(e){
  console.log("handler");

  flag = 0; //-> starts updateUserLine
  currentPos = getMousePos(canvas, e);
  lastRecordedPos = getMousePos(canvas, e);
  userLine.push(currentPos);
  drawUserLine(); //-> goto drawUserLine
  e.target.removeEventListener(e.type, arguments.callee);
  e.target.addEventListener('mousemove', updateUserLine, false); 
  e.target.addEventListener('mousedown', pause, false); //-> goto pause

}

var updateUserLine = function(e){
  var mousePos = getMousePos(canvas, e);
  currentPos = {x: mousePos.x, y: mousePos.y};
  lastRecordedPos = {x: mousePos.x, y:mousePos.y};
  userLine.push(currentPos);
}

var pause = function(e){
  flag = 1; //-> stops updateUserLine
  e.target.removeEventListener(e.type, arguments.callee);
  e.target.removeEventListener('mousemove', updateUserLine); 
  e.target.addEventListener('mousedown', handler, false); ///-> goto handler
} 



var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

$("body").css("overflow", "hidden"); // Hide scrollbar
                                     // canvas width and height will be set to the size of window      

var currentPos;
var lastRecordedPos;
var userLine = new Array();
var startTime = Date.now();
var trackedWave = new Array(); // Raw mouse tracked values 
                               // Array of objects
var flag = 0; // turns drawUserLine on or off

canvas.addEventListener('mousedown', handler); // ideal use case -> go to handler
window.addEventListener('keydown', end_DrawUserLine); // to be edited based on audio file 










