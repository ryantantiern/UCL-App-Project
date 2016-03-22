function writeMessage(canvas, message) {
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = '10px Courier New';
  context.fillStyle = 'black';
  context.fillText(message, 5, 15);
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

    updateIfNoEntry();

    for(i = 0; i < userLine.length - 1; i++){
      // draws the line
      drawLine(userLine[i].x , userLine[i].y, userLine[i+1].x, userLine[i+1].y);
    }


    for( i = 0; i <userLine.length ; i++){
      //shifts line to the left
      userLine[i].x -= 3;
      if(userLine[0].x < 0){
        userLine.splice(0,1);
      }
    }

    // Never ending loop for continuous function 
    setTimeout(function(){drawUserLine();}, 10);

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

  flag = 0;
  currentPos = getMousePos(canvas, e);
  lastRecordedPos = getMousePos(canvas, e);
  userLine.push(currentPos);
  drawUserLine();
  e.target.removeEventListener(e.type, arguments.callee);
  e.target.addEventListener('mousemove', updateUserLine, false);
  e.target.addEventListener('mousedown', pause, false);

}

var updateUserLine = function(e){
  var mousePos = getMousePos(canvas, e);
  currentPos = {x: mousePos.x, y: mousePos.y};
  lastRecordedPos = {x: mousePos.x, y:mousePos.y};
  userLine.push(currentPos);
}

var pause = function(e){
  flag = 1;
  e.target.removeEventListener(e.type, arguments.callee);
  e.target.removeEventListener('mousemove', updateUserLine);
  e.target.addEventListener('mousedown', handler, false);
}

/*function storeMousePosFromUserLine(userline) {
    // This function should take the last element in UserLine
    // every 2ms and store them in an array.
    // If userLine is empty, then store a null character
    var userlineLength = userline.length; 

    if (userline.length != 0) {
        var mouseDetails = {x: userline[userlineLength - 1].x, y:userline[userlineLength - 1].y};
    }
    else {
        var mouseDetails = null;
    }

    userWaveForm.push(mouseDetails);

    
*/


var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var currentPos;
var lastRecordedPos;
var userLine = new Array();

var flag = 0;

canvas.addEventListener('mousedown', handler); 


/*var txtFile = "C:\\Users\\Ryan\\Desktop\\myOutputfile.txt";
var file = new File(txtFile);
var str = "My string of text";

file.open("w"); // open file with write access
file.writeln("First line of text");
file.writeln("Second line of text " + str);
file.write(str);
file.close();*/







