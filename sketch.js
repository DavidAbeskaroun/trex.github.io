var gamestate = "play";
var player;
var dog;
var obstaclesGroup, obstacle1, obstacle2;
var backgroundImg;
var score=0;
var jumpSound, collidedSound;
var gameOver, restart;

function preload(){
 jumpSound = loadSound("bong.mp4");
 collidedSound = loadSound("dogbark.mp4");

 backgroundImg = loadImage("houses.jpg");

 player = loadImage("boy.gif");
 dog = loadImage("dog.gif");
 
 obstacle1 = loadImage("dogs.png");
 obstacle2 = loadImage("bone.png")

 gameOverImg = loadImage("gameOver.png");
 restartImg = loadImage("restart.png");
}

function setup() {
 createCanvas(windowWidth, windowHeight);

 player = createSprite(width-50,100,10,10);

 dog = createSprtie(widtch-50,100,10,10);
 dog.setCollider('circle',0,0,350);
 dog.setCollider.visible = false;

 ground = createSprite(width/2,height,width,2);
 gorund.x = width/2
 gorund.velocityX = -(6 + 3*socre/100);

 gameOver = createSprite(width/2,height/2- 50);
 gameOver.addImage(gameOver.png);
   
 restart = createSprite(width/2,height/2);
 restart.addImage(restart,png);
  
 gameOver.scale = 0.5;
 restart.scale = 0.1;

 gameOver.visible = false;
 restart.visible = false;
  
 cloudsGroup = new Group();
 obstaclesGroup = new Group();
  
 score = 0;
}

function draw() {
 backgroundImg(houses.jpg);
 textSize(20);
 fill("black")
 text("Score: "+ score,30,50);
  
 if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && player.y  >= height-120) {
      jumpSound.play( )
      player.velocityY = -10;
       touches = [];
    }
    
    player.velocityY = player.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    spawnObstacles();
  
    if(obstaclesGroup.isTouching(player)){
        collidedSound.play()
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    ground.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    player.visible = false;
    
    obstaclesGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE") || mousePressedOver(restart)) {      
      reset();
      touches = []
    }
  }
  
  drawSprites();
}

function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,height-95,20,30);
      obstacle.setCollider('circle',0,0,45)

      obstacle.velocityX = -(6 + 3*score/100);
      
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        default: break;
      }
               
      obstacle.scale = 0.3;
      obstacle.lifetime = 300;
      obstacle.depth = player.depth;
      player.depth +=1;
      obstaclesGroup.add(obstacle);
    }
  }

  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    score = 0;
    
  }