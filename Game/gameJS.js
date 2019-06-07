
var canvas;
var gl;

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );


    gl.clearColor( 0, 0, 0, 1.0 );
		vBuffer = gl.createBuffer();

    //
    //  Load shaders and initialize attribute buffers
    //

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    render();
};

//-------------------------------------------------------------------------------
//key listener

var leftPressed = 0;
var rightPressed=0;
window.addEventListener("keydown", keyDown, false); //for detecting keydown
window.addEventListener("keyup", keyUp, false); //for detecting key up
function keyDown(key) {
  if (key.key == "ArrowLeft"){
    leftPressed=1;
  }
  if (key.key == "ArrowRight"){
    rightPressed=1;
  }
}
function keyUp(key) {
  if (key.key == "ArrowLeft"){
    leftPressed=0;
  }
  if (key.key == "ArrowRight"){
    rightPressed=0;
  }
}

//vairables involved in drawing the game
var redWidth= 0.1;
var maxX= 1-redWidth;
var minX= -1+redWidth;
var redDownSpeed= 2000; //changes the time between each interval of it coming down
var redBoxRandomness=100; //changes how frequently you want the boxes to change directions
var redBoxXSpeed=0.01;

//first row
var firstRowY=0.95;
var firstRowX=new Array(5);
var firstRowXDirection=new Array(5);


//second row
var secondRowY= 0.70;
var secondRowX=new Array(5);
var secondRowXDirection=new Array(5);

//player controlled greenbox
var greenSpeed= 0.01;
var greenWidth=redWidth;
var greenX=-0.05; //green starting location
var greenY=(-1+2*greenWidth);


//for loop for filling up the arrays
for(var i=0;i<5;i++){
	firstRowX[i]= (Math.random()*(maxX-minX)+minX);
	secondRowX[i]=(Math.random()*(maxX-minX)+minX);

	//direction arrays
	firstRowXDirection[i]=Math.floor(Math.random()*(2)); //fils it up with 1 or -1
	secondRowXDirection[i]=Math.floor(Math.random()*(2)); //fills it up with 1 or -1
}

//for moving the boxes down
setInterval(function(){
	if(firstRowY && secondRowY>= -0.7){
		firstRowY+= -0.1;
		secondRowY+= -0.1;
	}
},redDownSpeed);

function render() {

	// Six Vertices
	var vertices = [
		vec2 (firstRowX[0], firstRowY),
		vec2 (firstRowX[0]+redWidth, firstRowY),
		vec2 (firstRowX[0]+redWidth, firstRowY-(2*redWidth)),
		vec2 (firstRowX[0], firstRowY),
		vec2 (firstRowX[0]+redWidth, firstRowY-(2*redWidth)),
		vec2 (firstRowX[0], firstRowY-(2*redWidth)),

		vec2 (firstRowX[1], firstRowY),
		vec2 (firstRowX[1]+redWidth, firstRowY),
		vec2 (firstRowX[1]+redWidth, firstRowY-(2*redWidth)),
		vec2 (firstRowX[1], firstRowY),
		vec2 (firstRowX[1]+redWidth, firstRowY-(2*redWidth)),
		vec2 (firstRowX[1], firstRowY-(2*redWidth)),

		vec2 (firstRowX[2], firstRowY),
		vec2 (firstRowX[2]+redWidth, firstRowY),
		vec2 (firstRowX[2]+redWidth, firstRowY-(2*redWidth)),
		vec2 (firstRowX[2], firstRowY),
		vec2 (firstRowX[2]+redWidth, firstRowY-(2*redWidth)),
		vec2 (firstRowX[2], firstRowY-(2*redWidth)),

		vec2 (firstRowX[3], firstRowY),
		vec2 (firstRowX[3]+redWidth, firstRowY),
		vec2 (firstRowX[3]+redWidth, firstRowY-(2*redWidth)),
		vec2 (firstRowX[3], firstRowY),
		vec2 (firstRowX[3]+redWidth, firstRowY-(2*redWidth)),
		vec2 (firstRowX[3], firstRowY-(2*redWidth)),

		vec2 (firstRowX[4], firstRowY),
		vec2 (firstRowX[4]+redWidth, firstRowY),
		vec2 (firstRowX[4]+redWidth, firstRowY-(2*redWidth)),
		vec2 (firstRowX[4], firstRowY),
		vec2 (firstRowX[4]+redWidth, firstRowY-(2*redWidth)),
		vec2 (firstRowX[4], firstRowY-(2*redWidth)),

		vec2 (secondRowX[0], secondRowY),
		vec2 (secondRowX[0]+redWidth, secondRowY),
		vec2 (secondRowX[0]+redWidth, secondRowY-(2*redWidth)),
		vec2 (secondRowX[0], secondRowY),
		vec2 (secondRowX[0]+redWidth, secondRowY-(2*redWidth)),
		vec2 (secondRowX[0], secondRowY-(2*redWidth)),

		vec2 (secondRowX[1], secondRowY),
		vec2 (secondRowX[1]+redWidth, secondRowY),
		vec2 (secondRowX[1]+redWidth, secondRowY-(2*redWidth)),
		vec2 (secondRowX[1], secondRowY),
		vec2 (secondRowX[1]+redWidth, secondRowY-(2*redWidth)),
		vec2 (secondRowX[1], secondRowY-(2*redWidth)),

		vec2 (secondRowX[2], secondRowY),
		vec2 (secondRowX[2]+redWidth, secondRowY),
		vec2 (secondRowX[2]+redWidth, secondRowY-(2*redWidth)),
		vec2 (secondRowX[2], secondRowY),
		vec2 (secondRowX[2]+redWidth, secondRowY-(2*redWidth)),
		vec2 (secondRowX[2], secondRowY-(2*redWidth)),

		vec2 (secondRowX[3], secondRowY),
		vec2 (secondRowX[3]+redWidth, secondRowY),
		vec2 (secondRowX[3]+redWidth, secondRowY-(2*redWidth)),
		vec2 (secondRowX[3], secondRowY),
		vec2 (secondRowX[3]+redWidth, secondRowY-(2*redWidth)),
		vec2 (secondRowX[3], secondRowY-(2*redWidth)),

		vec2 (secondRowX[4], secondRowY),
		vec2 (secondRowX[4]+redWidth, secondRowY),
		vec2 (secondRowX[4]+redWidth, secondRowY-(2*redWidth)),
		vec2 (secondRowX[4], secondRowY),
		vec2 (secondRowX[4]+redWidth, secondRowY-(2*redWidth)),
		vec2 (secondRowX[4], secondRowY-(2*redWidth)),

    //greenbox, player controlled
    vec2 (greenX, greenY),
		vec2 (greenX+greenWidth, greenY),
		vec2 (greenX+greenWidth, greenY-(2*greenWidth)),
		vec2 (greenX, greenY),
		vec2 (greenX+greenWidth, greenY-(2*greenWidth)),
		vec2 (greenX, greenY-(2*greenWidth)),

	];


	//moving the boxes side to side randomly
	for(var j=0; j<5;j++){

		if(firstRowXDirection[j]==1){
			firstRowX[j]+=redBoxXSpeed;

		}
		else if(firstRowXDirection[j]==0){
			firstRowX[j]-=redBoxXSpeed;
		}

		if(secondRowXDirection[j]==1){
			secondRowX[j]+=redBoxXSpeed;

		}
		else if(secondRowXDirection[j]==0){
			secondRowX[j]-=redBoxXSpeed;
		}

		if(Math.floor(Math.random()*(redBoxRandomness))==1 || (firstRowX[j])<=(minX-redWidth) || firstRowX[j]>= maxX){
			if(firstRowXDirection[j]==1){
				firstRowXDirection[j]=0;
			}
			else if(firstRowXDirection[j]==0){
				firstRowXDirection[j]=1;
			}
		}
		if(Math.floor(Math.random()*(redBoxRandomness))==1 || (secondRowX[j])<=(minX-redWidth) || secondRowX[j]>= (maxX)){
			if(secondRowXDirection[j]==1){
				secondRowXDirection[j]=0;
			}
			else if(secondRowXDirection[j]==0){
				secondRowXDirection[j]=1;
			}
		}

	}

  //moving the green box
  if (leftPressed==1){
    greenX-=greenSpeed;
  }
  if (rightPressed==1){
    greenX+=greenSpeed;
  }




	// document.getElementById("trace").innerHTML=secondRowY;

	// Binding the vertex buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

	gl.clear( gl.COLOR_BUFFER_BIT );
  gl.drawArrays( gl.TRIANGLES, 0, vertices.length ); //changed to length so that it's not hard coded in and will self update
	window.requestAnimationFrame(render);
}
