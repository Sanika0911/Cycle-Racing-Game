var canvas, backgroundImg;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cyclists, cyclist1, cyclist2, cyclist3, cyclist4;

var track_Img, cyclist1_Img, cyclist2_Img, cyclist3_Img;
var groundImg;

function preload(){
  track_Img = loadImage("images/Road.png");
  cyclist1_Img = loadImage("images/opponent1.png");
  cyclist2_Img = loadImage("images/opponent2.png");
  cyclist3_Img = loadImage("images/opponent3.png");
  backgroundImg = loadImage("images/background.png");
  groundImg = loadImage("images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 3){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
