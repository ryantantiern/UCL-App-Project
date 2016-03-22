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

function retract(){
  console.log("Retract");
  context.clearRect(0, 0, canvas.width, canvas.height);
  for(i = 0; i < userLine.length - 1; i++){
    drawLine(userLine[i].x , userLine[i].y, userLine[i+1].x, userLine[i+1].y);
  }
  for( i = 0; i <userLine.length - 1; i++){
    userLine[i].x -= 1;
    if(userLine[0].x < 0){
      userLine.splice(0,1);
    }
    if(userLine.length > 2 
            && userLine[userLine.length - 1].x - userLine[userLine.length - 2].x > 3 
            && userLine[userLine.length - 1].y == userLine[userLine.length - 2].y ){
      var temp = {x: userLine[userLine.length - 2].x + 2, y: userLine[userLine.length - 2].y};
      userLine.splice(userLine.length - 1, 0, temp);
    }
  }
  if(flag != 1){  
   setTimeout(function(){retract();}, 5);
 }
  
 //setTimeout(function () { storeMousePosFromUserLine(); }, 2);
}

/* function initializeArray(e){
  var initialPoint = getMousePos(canvas, e);
  userLine.push(initialPoint);
} */



var handler = function(e){
  console.log("handler");

  retract();

  //initializeArray(e); 

  e.target.removeEventListener(e.type, arguments.callee);

  e.target.addEventListener('mousemove', runMain, false);

}

var runMain = function(e){
  var mousePos = getMousePos(canvas, e);
  var tempVar = {x: mousePos.x, y: mousePos.y};
  userLine.push(tempVar);
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

    
}*/ 


function switchFlag(){
  if(flag == 0){
    flag = 1;
  }
  else{
    flag = 0;
  }
}



var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var flag = 0;

var userLine = new Array();
//var userWaveForm = new Array();



canvas.addEventListener('mousedown', handler); 
var txtFile = "C:\\Users\\Ryan\\Desktop\\myOutputfile.txt";
var file = new File(txtFile);
var str = "My string of text";

file.open("w"); // open file with write access
file.writeln("First line of text");
file.writeln("Second line of text " + str);
file.write(str);
file.close();







