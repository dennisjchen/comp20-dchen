//Global Variables
var xFrog; 
var yFrog; 
var frogW = 22; 
var frogH = 18; 
var frogSpeed;
var numLives = 3;
var numLevel;
var score;
var time; 
var successfulPads;
var timer;
var isOver;
var sprite; 
var lilypad;
var canvas; 
var ctx;
var intervalID;
var logs = new Array();
var cars = new Array();
var pads = new Array();
var drawSuccess = new Array();
var farthestDistance = 490;

//Initializes all the global variables
function initialize(){
    xFrog = 190; 
    yFrog = 490; 
    frogSpeed = 0;
    successfulPads = 0;
    timer = 0;
    numLevel = 1; 
    score = 0;
    time = 100; 
    isOver = false;
    for(var i = 0;i < 5; i++){
        drawSuccess[i] = false;
    }
    createSpriteLocations();
    canvas = document.getElementById('game');
    ctx = canvas.getContext("2d");
    sprite = new Image();
    lilypad = new Image();
    sprite.src = "assets/frogger_sprites.png";
    lilypad.src = "assets/lilypad.png";
    drawBoard();
    sprite.onload = function() {
        var delay = 50;
        intervalID = setInterval(gameLoop, delay); //calls and continues game loop
    }
}

//The loop that runs constantly until game is over
function gameLoop() {
    timer += 50;
    if(isOver){
        clearInterval(intervalID);
    }
    document.addEventListener("keydown", moveFrog ,false);
    update();
    drawBoard();
    if(isOver){
        ctx.font = "60px Helvetica";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("GAME OVER ", 20, 300); //Prints game is over to screen
    }
}

//Updates all objects and also calls check for collision
function update(){
    xFrog += frogSpeed;
    for(n in logs){
        logs[n].initX += logs[n].speed;
        if(logs[n].initX > 399){
            logs[n].initX = -180;
            logs[n].speed = Math.floor((Math.random()*4)+1)+numLevel*2-numLevel;
        }
        else if (logs[n].initX < -200){
            logs[n].initX = 398;
            logs[n].speed = (-1)*Math.floor((Math.random()*4)+1)-numLevel*2+numLevel;
        }
    }
    for(n in cars){
        cars[n].initX += cars[n].speed;
        if(cars[n].initX > 396){
            cars[n].initX = 5;
            cars[n].speed = Math.floor((Math.random()*6)+1)+numLevel*2-numLevel;
        }
        else if (cars[n].initX < -23){
            cars[n].initX = 395;
            cars[n].speed = (-1)*Math.floor((Math.random()*4)+1)-numLevel*2+numLevel;
        }
    }
    checkCollision();
}

//Plays the hop sound (will interrupt if pressed continually)
function soundHop(){
    var hopSound = new Audio("assets/dp_frogger_hop.wav");
    hopSound.play();
}

//Looks for user input on keys and updates frogger position while playing sound
function moveFrog(e){
    var keyCode = e.keyCode;
    if( keyCode == 37 && xFrog >= 24){ //move left
        xFrog = xFrog - 29;
        soundHop();
    }
    if( keyCode == 38 && yFrog >= 100){ //move up
        yFrog = yFrog - 33.8;
        if(yFrog < farthestDistance){
            farthestDistance = yFrog;
            score = score + 10;
            if(farthestDistance <= 84.4){
                farthestDistance = 490;
            }
        }
        soundHop();
    }
    if( keyCode == 39 && xFrog <= 350){//Move right
        xFrog = xFrog + 29;
        soundHop();
    }
    if( keyCode == 40 && yFrog <= 489){ //move down
        yFrog = yFrog + 33.8;
        soundHop();
    }
    if (keyCode == 27){
        isOver = true;
    }
}

//Draws the board, which will go on to call draw functions for stats and frogger itself
function drawBoard() {
    if(canvas.getContext) {
        ctx.fillStyle = "#191970";
        ctx.fillRect(0, 0, 400, 277); //Draw water
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 310, 400, 255); //Draw road
        ctx.drawImage(sprite, 1 ,119 ,390, 34, 0, 277, 400, 34);
        ctx.drawImage(sprite, 1 ,119 ,390, 36, 0, 480, 400, 36); //Draw purple roads
        ctx.drawImage(sprite, 13, 12, 321, 31, 14, 16, 321, 31); //Frogger header
        ctx.drawImage(sprite, 0 ,55 ,390, 53, 0, 60, 400, 53); //Green grass
        for(n in pads){
            ctx.drawImage(lilypad, 0, 0, 500, 432, pads[n].initX+(n*44), pads[n].initY, pads[n].imageWidth, pads[n].imageHeight);
        }
        for (n in logs){
            if(n == 1 || n == 3){
                ctx.drawImage(sprite, 8, 166 ,177, 22, logs[n].initX, logs[n].initY, 177,22);
                ctx.drawImage(sprite, 10, 267, 28, 20, cars[n].initX, cars[n].initY, 28,20);
            }
            else{
                ctx.drawImage(sprite, 6, 229, 86, 23, logs[n].initX, logs[n].initY, 86,23);
                ctx.drawImage(sprite, 9, 300, 25, 23, cars[n].initX, cars[n].initY, 25,23);
            }
            
        }
        drawStats();
        drawFrogger();
        for(n in drawSuccess){
            if(drawSuccess[n]){
                ctx.drawImage(sprite, 13, 371, 22, 18, pads[n].initX+(n*44), pads[n].initY, 22, 18);
            }
        }
    }
    else {
        alert('Sorry, canvas is not supported. Use another browser.');
    }
}

//Draws the stats for playler
function drawStats() {
    ctx.font = "22px Helvetica";
    ctx.fillStyle = "#8AFB17";
    ctx.fillText("Level " + numLevel, 61, 535);
    for(var i = 0; i < numLives; i++){ //Draws # frogs based on lives left
        ctx.drawImage(sprite, 12, 330, 18, 26, 6+i*19, 517, 14, 16);
    }
    ctx.font = "12px Helvetica";
    ctx.fillText("Score: " + score, 9, 551);
}

//Draws frogger
function drawFrogger(){
    ctx.drawImage(sprite, 13, 371, 22, 18, xFrog, yFrog, 22, 18); //Draws Frogger based on starting coordinates
}

//Initializes locations and data of sprites (logs, vehicles and lilypads)
function createSpriteLocations(){
    increment = 33.8;
    logs[0] = {"imageWidth":86, "imageHeight":23, "initX":8, "initY":250-(0*increment), "speed":Math.floor((Math.random()*4)+1)+1};
    logs[1] = {"imageWidth":177, "imageHeight":23, "initX":35, "initY":250-(1*increment), "speed":(-1)*Math.floor((Math.random()*5)+1)-1};
    logs[2] = {"imageWidth":86, "imageHeight":23, "initX":100, "initY":250-(2*increment), "speed":Math.floor((Math.random()*4)+1)+1};
    logs[3] = {"imageWidth":177, "imageHeight":23, "initX":50, "initY":250-(3*increment), "speed":(-1)*Math.floor((Math.random()*4)+1)-1};
    logs[4] = {"imageWidth":86, "imageHeight":23, "initX":20, "initY":250-(4*increment), "speed":Math.floor((Math.random()*4)+1)+1};
    cars[0] = {"imageWidth":25, "imageHeight":23, "initX":4, "initY":454-(0*increment), "speed":Math.floor((Math.random()*6)+1)+1};
    cars[1] = {"imageWidth":28, "imageHeight":23, "initX":4, "initY":454-(1*increment), "speed":(-1)*Math.floor((Math.random()*6)+1)-1};
    cars[2] = {"imageWidth":25, "imageHeight":23, "initX":4, "initY":454-(2*increment), "speed":Math.floor((Math.random()*6)+1)+1};
    cars[3] = {"imageWidth":28, "imageHeight":23, "initX":4, "initY":454-(3*increment), "speed":(-1)*Math.floor((Math.random()*6)+1)-1};
    cars[4] = {"imageWidth":25, "imageHeight":23, "initX":4, "initY":454-(4*increment), "speed":Math.floor((Math.random()*6)+1)+1};
    for (var i = 0; i < 5; i++){
        pads[i] = {"imageWidth":22, "imageHeight":18, "initX":16, "initY": 84.4, "beenLanded":false};
        pads[i].initX = pads[i].initX + (i*44);
    }
}

//Checks for collisions against water, pads and cars
function checkCollision(){
    frogSpeed = 0;
    var onLog = false;
    for(n in pads){
        if(xFrog+frogW >= pads[n].initX+n*44 && xFrog <= pads[n].initX+n*44+pads[n].imageWidth){
            if(yFrog+frogH >= pads[n].initY && yFrog <= pads[n].initY+pads[n].imageHeight){
                drawSuccess[n] = true;
                if(pads[n].beenLanded == true){
                    collideDIE();
                }
                pads[n].beenLanded = true;
                collidePAD();
                break;
            }
        }
    }
    for(n in logs){
        if(xFrog+frogW >= logs[n].initX && xFrog <= logs[n].initX+logs[n].imageWidth){
            if(yFrog+frogH >= logs[n].initY && yFrog <= logs[n].initY+logs[n].imageHeight){
                onLog = true;
                frogSpeed = logs[n].speed;
                break;
            }
        }
    }
    for(n in cars){
        if(xFrog+frogW >= cars[n].initX && xFrog <= cars[n].initX+cars[n].imageWidth){
            if(yFrog+frogH >= cars[n].initY && yFrog <= cars[n].initY+cars[n].imageHeight){
                collideDIE();
                break;
            }
        }
    }
    if(yFrog < 253.4 && !onLog){
        collideDIE();
    }
}

//If frogger collides with pad, it is brought home, score increments
//And possibly a level up if 5 DIFFERENT pads have been landed on
function collidePAD(){
    var timeScore = Math.round((60000-timer)/10000)*100;
    score = score + 50 + timeScore;
    successfulPads = successfulPads + 1;
    if(successfulPads == 5){
        levelUp();
    }
    xFrog = 190;
    yFrog = 490;
    timer = 0;
}

//Once five lily pads have been landed on, speed is increased, plays level up sound
//Adds score and resets board
function levelUp(){
    var levelSound = new Audio("assets/dp_frogger_coin.wav");
    levelSound.play();
    numLevel = numLevel + 1;
    successfulPads = 0;
    score = score + 1000;
    logs[0].speed = Math.floor((Math.random()*4)+1)+numLevel*2-numLevel;
    logs[1].speed = (-1)*Math.floor((Math.random()*4)+1)-numLevel*2+numLevel;
    logs[2].speed = Math.floor((Math.random()*4)+1)+1+numLevel*2-numLevel;
    logs[3].speed = (-1)*Math.floor((Math.random()*4)+1)-numLevel*2+numLevel;
    logs[4].speed = Math.floor((Math.random()*4)+1)+numLevel*2-numLevel;
    cars[0].speed = Math.floor((Math.random()*6)+1)+numLevel*2-numLevel;
    cars[1].speed = (-1)*Math.floor((Math.random()*6)+1)-numLevel*+numLevel;
    cars[2].speed = Math.floor((Math.random()*6)+1)+numLevel*-numLevel;
    cars[3].speed = (-1)*Math.floor((Math.random()*6)+1)-numLevel*2+numLevel;
    cars[4].speed = Math.floor((Math.random()*6)+1)+numLevel*2-numLevel;
    for(var n = 0; n < 5; n++){
        drawSuccess[n] = false;
        pads[n].beenLanded = false;
    }
}

//If frogger collides with water or car, lose a life, reset position and play death sound
function collideDIE(){
    numLives = numLives - 1;
    if(numLives == 0){
        isOver = true;
    }
    var deathSound = new Audio("assets/dp_frogger_squash.wav");
    deathSound.play();
    xFrog = 190;
    yFrog = 490;
}