var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300)
  tower.addImage(towerImg);
  tower.velocityY=2;
  
  ghost = createSprite(300,300)
  ghost.addImage(ghostImg);
  ghost.scale=0.5;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background(0);
  
  if(gameState==="play"){
  if(tower.y >600){
    tower.y=300;
  }
  
  if(keyDown("space")){
  ghost.velocityY=-8;  
  }
  ghost.velocityY=ghost.velocityY + 0.7;
  
  if(keyDown("left_arrow")){
  ghost.x= ghost.x - 3;  
  }
  if(keyDown("right_arrow")){
  ghost.x = ghost.x +3;  
  } 
  if(climbersGroup.isTouching(ghost)){
  ghost.velocityY=0;  
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
  ghost.destroy(); 
  gameState="end";  
  }
  
    
 spawnDoors();
 drawSprites();
  }
  if(gameState==="end"){
   //spookySound.play(); 
   textSize(30) 
   fill("yellow") 
   text("Game Over",250,300) 
  } 
  
}

function spawnDoors() {
  if(frameCount %200===0){
  door = createSprite(200,0)
  climber = createSprite(200,50)
  invisibleBlock = createSprite(200,65);  
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 2;  
  door.addImage(doorImg)
  climber.addImage(climberImg)  
  door.velocityY=2;  
  climber.velocityY=2; 
  invisibleBlock.velocityY=2;  
  door.x=Math.round(random(100,500))  
  climber.x=door.x;  
  invisibleBlock.x = door.x;  
  door.lifetime=300;  
  climber.lifetime=300;  
  ghost.depth=door.depth;
  ghost.depth = ghost.depth +1; 
  invisibleBlock.debug = true;  
  doorsGroup.add(door);  
  climbersGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);  
  }
  
}

