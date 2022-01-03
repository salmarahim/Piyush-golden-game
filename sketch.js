
var player,playerImg;
var Bullet,bulletImg;
var PlayerbulletGroup
var enemy,enemyImg;
var invisible;
var bgImg,bg;
var Inb;
var enemyGroup,bulletGroup;
var score=0;
var live=3
var restart,restartImg;
var eStop;

var play=0;
var end=1;
var gameState=play;


function preload(){

playerImg=loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png");
eimg=loadAnimation("img/man1.png","img/man2.png","img/man3.png","img/man4.png","img/man5.png","img/man6.png");
bulletImg=loadImage("b.png");
bgImg=loadImage("bg1.png");  
bImg=loadImage("b.png")
restartImg=loadImage("button.png")
eStop=loadAnimation("img/man6.png")

}  

function setup() {

  var canvas= createCanvas(1000,500);
  canvas.position(280,120)

  bg=createSprite(500,200,800,400)
  bg.addImage("bg",bgImg)
  bg.velocityX=-2;
  bg.scale=1.5;

 

  player=createSprite(200,400)
  player.addAnimation("pImg",playerImg)
  player.scale=1;
  player.debug=false
  player.setCollider("rectangle",0,0,100,300)

  invisible=createSprite(400,450,700,20)
  invisible.visible=false;

  Inb=createSprite(1000,230,10,90)
  Inb.visible=false;

  restart=createSprite(500,150)
  restart.addImage("restart",restartImg)
  restart.scale=0.2
  restart.visible=false

  enemyGroup=new Group();
  bulletGroup=new Group();
  PlayerbulletGroup=new Group();

}

function draw() {

  background(0);

  if(gameState===play){

    if(bg.x<0){
      bg.x=bg.width/2
     }

     if(keyDown("SPACE")){
      var Bullet=createSprite(300,250)
      Bullet.addImage("b",bulletImg)
      Bullet.scale=0.2;
      Bullet.velocityX=18;
      PlayerbulletGroup.add(Bullet);
     }

     if(PlayerbulletGroup.isTouching(enemyGroup)){
      enemyGroup.destroyEach();
      bulletGroup.destroyEach();
      PlayerbulletGroup.destroyEach();
      score=score+1;
    }
  
    if(player.isTouching(bulletGroup)){
      player.visible=false
      //live=live-1
      gameState=end;
      enemyGroup.destroyEach();
    }

    if(live<=0){
      
    }


    spawnEnemy();

  }else if(gameState===end){

  bg.velocityX=0;
  enemyGroup.setVelocityXEach(0);
  bulletGroup.setVelocityXEach(0);
  
  player.visible=false
  
  enemyGroup.setLifetimeEach(-2);
  bulletGroup.setLifetimeEach(-2);
  
  restart.visible=true

 // eimg.looping=false

  
  if(mousePressedOver(restart)){
    gameState=play;
    enemyGroup.destroyEach();
    bulletGroup.destroyEach();
    restart.visible=false
    player.visible=true
    bg.velocityX=-2
    score=0
    live=3
    eimg.looping=true
  }
  
  }

  player.collide(invisible);

  

 

  

  drawSprites();

  textSize(20)
  fill("black")
  text("PRESS SPACE TO FIRE",400,100)

  text("Score :"+score,900,80)
  //text("Lives :"+live,900,120)

  
  }

function spawnEnemy(){

  if(frameCount % 150 === 0 ){

  var enemy=createSprite(1000,300)
  enemy.addAnimation("E",eimg)
  enemy.addAnimation("e",eStop)
  enemy.scale=2
  enemy.velocityX=-5
  enemy.lifetime=200 

  var enemyBullet=createSprite(enemy.x-100,enemy.y-50)
  enemyBullet.addImage("b",bImg)

  enemyBullet.velocityX=-16
  enemyBullet.scale=0.3
  enemyBullet.lifetime=1000/16

  enemy.debug=false
  enemy.setCollider("rectangle",0,0,100,300)

  enemyGroup.add(enemy);
  bulletGroup.add(enemyBullet);

  }
}

