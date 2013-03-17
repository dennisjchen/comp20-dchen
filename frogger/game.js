//Global Variables
var xFrog; var yFrog; var frogW = 22; var frogH = 18; var frogSpeed;
var numLives = 3;
var numLevel;
var score;
var time; var successfulPads;
var isOver;
var vSpeed;
var vLoc; var logSpeed; var logLoc;
var sprite; var lilypad;
var canvas; var ctx;
var intervalID;
var logs = new Array(); var extraLogs = Array();
var cars = new Array();
var pads = new Array();
var drawSuccess = new Array();
var farthestDistance = 490;

//Initializes all the global variables
function initialize(){
    xFrog = 190; yFrog = 490; frogSpeed = 0;
    successfulPads = 0;
    numLevel = 1; score = 0;
    time = 100; isOver = false; vSpeed = 1;
    vLoc = 10;
    lSpeed = 1;
    logLoc = 10;
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
    sprite.onload = function() {
        var delay = 50;
        intervalID = setInterval(gameLoop, delay);
    }
}

function gameLoop() {
    if(isOver){
        clearInterval(intervalID);
    }
    document.addEventListener("keydown", moveFrog ,false);
    update();
    drawBoard();
    if(isOver){
        ctx.font = "60px Helvetica";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("GAME OVER ", 20, 300);
    }
}

//Draws the board, which will go on to call draw functions for stats and frogger itself
function drawBoard() {
    canvas = document.getElementById('game');
    if(canvas.getContext) {
        ctx = canvas.getContext("2d");
        ctx.fillStyle = "#191970";
        ctx.fillRect(6, 6, 386, 271); //Draw water
        ctx.fillStyle = "#000000";
        ctx.fillRect(6, 310, 386, 243); //Draw road
        sprite = new Image();
        sprite.src = "assets/frogger_sprites.png";
        sprite.onload = function() {
            ctx.drawImage(sprite, 1 ,119 ,390, 34, 6, 277, 386, 34);
            ctx.drawImage(sprite, 1 ,119 ,390, 36, 6, 480, 386, 36); //Draw purple roads
            ctx.drawImage(sprite, 13, 12, 321, 31, 19, 16, 321, 31); //Frogger header
            ctx.drawImage(sprite, 0 ,55 ,390, 53, 6, 60, 386, 53); //Green grass
            ctx.drawImage(sprite, 8 ,166 ,177, 22, 40, 160, 177, 22); //Log
            ctx.drawImage(sprite, 10, 267, 28, 20, 50, 400, 28, 20); //Pink car
            ctx.drawImage(sprite, 108, 303, 44, 18, 160, 340, 44, 18); //white truck
            drawStats();
            drawFrogger();
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
        pads[i] = {"imageWidth":22, "imageHeight":18, "initX":16, "initY": 84.4};
        pads[i].initX = pads[i].initX + (i*44);
    }
}

//Draws frogger
function drawFrogger(){
        ctx.drawImage(sprite, 13, 371, 22, 16, xStart, yStart, 22, 16); //Draws Frogger based on starting coordinates
}