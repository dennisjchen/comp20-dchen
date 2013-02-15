//Global Variables
var xStart;
var yStart;
var numLives;
var numLevel;
var score; var highscore;
var time;
var isOver;
var vSpeed;
var vLoc;
var logSpeed;
var logLoc;
var canvas;
var ctx;
var sprite;

//Function that begins the game
function start_game() {
    initialize();
    drawBoard();
}

//Initializes all the global variables
function initialize(){
    xStart = 190;
    yStart = 488;
    numLives = 3;
    numLevel = 1;
    score = 0; highscore = 0;
    time = 100;
    isOver = false;
    vSpeed = 1;
    vLoc = 10;
    lSpeed = 1;
    logLoc = 10;
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
    ctx.fillText("Level " + numLevel, 61, 530);
    for(var i = 0; i < numLives; i++){ //Draws # frogs based on lives left
        ctx.drawImage(sprite, 12, 330, 18, 26, 6+i*19, 512, 14, 16);
    }
    ctx.font = "12px Helvetica";
    ctx.fillText("Score: " + score, 9, 546);
    ctx.fillText("Highscore: " + highscore, 81, 546);
}
//Draws frogger
function drawFrogger(){
        ctx.drawImage(sprite, 13, 371, 22, 16, xStart, yStart, 22, 16); //Draws Frogger based on starting coordinates
}