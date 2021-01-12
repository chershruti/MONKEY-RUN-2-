var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var fruitGroup, obstacleGroup
var score = 0
var survival_time = 0
//var backgroundImage, background

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  //backgroundImage = loadImage("")
 
}



function setup() {
  
//creating monkey 
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running)  
  monkey.scale = 0.1
  
  //creaing ground
  ground = createSprite(400,350,900,10)
  ground.velocityX = -4
  ground.x = ground.width/2
  console.log(ground.x)
    
}


function draw() {
  background("white")
  
  
  if(keyDown("space")){
    monkey.velocityY = -5
  }
  
  //gravity
  monkey.velocityY = monkey.velocityY + 0.08
    
  //resetting of ground
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  //getting points
  if(fruitGroup.isTouching(monkey)){ 
  fruitGroup.destroyEach()
  score = score + 2
  ground.velocityX = ground.velocityX + 0.002
  }
  
  //game over
  if(obstacleGroup.isTouching(monkey)){
    obstacle.destroyEach();
    score = score - 1
    monkeySize();
  }
  //for monkey to collide with ground
  monkey.collide(ground)
  
  //calling reward and obstacle function in draw
  fruits();
  stone();
  
  //score
  text("score:"+score,500,50)
  
  //survival time
  survival_time = Math.ceil(frameCount/frameRate())
  text("survival time:"+survival_time,150,50)
  
  drawSprites();
}

//new function for fruits
function fruits(){
  if(frameCount % 80 === 0){
    banana = createSprite(600,120,10,20)
    banana.y = Math.round(random(120,200))
    banana.addImage("eating",bananaImage)
    banana.velocityX = -4
    banana.lifetime = 150
    banana.scale = 0.1
    fruitGroup.add(banana)
  }
}

//new function for obstacle  
function stone(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(600,165,10,40)
    obstacle.addImage("blocking",obstacleImage)
    obstacle.scale = 0.1
    obstacle.velocityx = -6
    obstacleGroup.add(obstacle)
    
  }
}
//new function to change size of monkey
function monkeySize(){
  switch(score)
    case 10: monkey.scale = 0.12
        break;
    case 20: monkey.scale = 0.14 
        break;
    case 30: monkey.scale = 0.16
        break;
    case 40: monkey.scale = 0.18
        break;
    default:  break;    
}


