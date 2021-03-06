
//Definicion de variables
var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height -50;
var dx = 2;
var dy = -2;
var ballRadius = 10;
//variables raqueta
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

//variables de ls ladrillos
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var brickPadding = 10;

var bricks = [];

for(c=0;c<brickColumnCount;c++){
    bricks[c]=[];
    for(r=0;r<brickColumnCount;r++){
        bricks[c][r] = {x : 0, y : 0, status: 1};
    }
}

//Vidas del jugador
var lives=3;

//Contador puntuacion
var score =0;


document.addEventListener("keydown",keydownHandler, false);
document.addEventListener("keyup",keyupHandler,false); 
document.addEventListener("mousemove",mouseMoveHandler,false);

function keydownHandler(e){
    if(e.keyCode == 39){
        rightPressed = true;
    }else if(e.keyCode ==37){
        leftPressed = true;
    }
}

function keyupHandler(e){
    if(e.keyCode == 39){
        rightPressed = false;
    }else if(e.keyCode ==37){
        leftPressed = false;
    }
}

function mouseMoveHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth / 2;
    }
}


function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle="#4a4b88";
    ctx.fill();
    ctx.closePath();
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2);
    ctx.fillStyle = "#4a4b88";
    ctx.fill();
    ctx.closePath();
}

function drawBricks(){
    for(c=0;c<brickColumnCount;c++){
        for(r=0;r<brickRowCount;r++){
            if(bricks[c][r].status == 1){
                var brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x= brickX;
                bricks[c][r].y= brickY;
                ctx.beginPath();
                ctx.rect(brickX,brickY,brickWidth, brickHeight);
                ctx.fillStyle = "#4A4B88";
                ctx.fill();
                ctx.closePath();
            }
            
        }
    }
}

/*function drawBricks(){
    for(c=0;c<brickColumnCount;c++){
        for(r=0;r<brickRowCount;r++){
            var brickx = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
            var bricky = (r*(brickHeight + brickPadding)) + brickOffsetTop;
            bricks[c][r].x=0;
            bricks[c][r].y=0;
            ctx.beginPath();
            ctx.rect(brickx,bricky,brickWidth,brickHeight);
            ctx.fillStyle ="#4a4b88";
            ctx.fill();
            ctx.closePath();
        }
    }
}

function collisionDetection(){
    for(c=0;c<brickColumnCount;c++){
        for(r=0;r<brickRowCount;r++){
            var b = bricks[c][r];
            if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                dy = -dy;
            }
        }
    }
}*/

function collisionDetection(){
    for(c=0;c<brickColumnCount;c++){
        for(r=0;r<brickRowCount;r++){
            var b = bricks[c][r];
            if(b.status == 1){
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                dy = -dy;
                b.status = 0;
                score++;
                if(score == brickRowCount*brickColumnCount){
                    alert("¡Has ganado!");
                    document.location.reload();
                }
                }
            }
            
        }
    }
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#4a4b88";
    ctx.fillText("Puntos: " + score,8,20);
}

function drawLives(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#4a4b88";
    ctx.fillText("Vidas: " + lives,400,20);
}




function draw(){

    //Borrado del lienzo
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawPaddle();
    drawBall();
    drawBricks();
    collisionDetection();
    drawScore();
    drawLives();


    //Rebotes en las paredes
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx;
    }

    if(y + dy < ballRadius){
        dy = -dy;
    } else if( y + dy > canvas.height - ballRadius){
        if(x > paddleX + paddleHeight && x < paddleX + paddleWidth){
            dy = -dy;
        }else{
            lives--;
            if(!lives){
                alert("Game over");
                document.location.reload();
            }else{
                x = canvas.width/2;
                y= canvas.height - 50;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth)/2;
            }
        }

    }

    //movimiento raqueta
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0){
        paddleX += -7;
    }


    x += dx;
    y += dy; 

    //esto susituye al set interval
    //requestAnimationFrame(draw)
}


  
setInterval(draw,20);
