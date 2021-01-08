
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime=0;
//var score=0;

function preload(){
  
   createCanvas(600,600);
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage= loadImage("jungle.jpg");
 
}



function setup() {
  
  bg=createSprite(300,270,10,10);
  bg.addImage(bgImage);
  bg.scale=0.7
  bg.velocityX=-2;
  
  
  
  monkey=createSprite(80,380,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  edges=createEdgeSprites();
  
 // ground=createSprite(400,350,900,10);
 // ground.velocityX=-4;
 // ground.x = ground.width /2;
 // console.log(ground.x);
  
  obstacleGroup= createGroup();
  bananaGroup= createGroup();
  
}


function draw() {

  background("180");
  
 // if (ground.x < 0){
 //     ground.x = ground.width/2;
 //   }
  
  if(bg.x<50){
    bg.x=300;
  }
 
  //stroke("white");
  //textSize(20);
  //fill("white");
  //text("Score: "+score,500,50);
  
  spawnObstacles();
  spawnBananas();
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    survivalTime=survivalTime+1;
  }
  
  if(monkey.isTouching(obstacleGroup)){
    obstacleGroup.destroyEach();
    survivalTime=survivalTime-2;
  }
  
  if(survivalTime<0){
    survivalTime=0;
  }
  
  stroke("black");
  textSize(20);
  fill("white");
// survivalTime=Math.ceil(frameCount/getFrameRate());
//survivalTime=survivalTime+Math.round(getFrameRate()/60); 
  
  if(keyDown("space")&& monkey.y>314) {
        monkey.velocityY = -10;
    }
  
  console.log(monkey.y);
  
  monkey.velocityY=monkey.velocityY+0.5;
  
  monkey.collide(edges[3]);
  
  drawSprites();
  text("Survival Time: "+survivalTime,100,50);
}


function spawnObstacles() {
  
  if (frameCount % 100 === 0) {
    obstacle=createSprite(400,380,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    
    obstacle.lifetime=600;
    
    obstacleGroup.add(obstacle);
  }
}

function spawnBananas(){
  
  if (frameCount % 75 === 0) {
     banana = createSprite(400,100,20,20);
    banana.y = Math.round(random(200,300));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    bananaGroup.add(banana);
  }    
}



