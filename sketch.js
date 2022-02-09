var sadto;
var mudio;
var chechoint;
var Restart;
var FIN;
var Restart2;
var FIN2;
var END=0;
var PLAY=1;
var gamestate=PLAY;
var trex;
var trex_running;
var trex_died;
var bordes;
var suelo;
var suelo2;
var inv;
var nube;
var nube2;
var nubesjuntas;
var cactus;
var cactus1;
var cactus2;
var cactus3;
var cactus4;
var cactus5;
var cactus6;
var cactusjuntos;
var score=0
 function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
trex_died=loadAnimation("trex_collided.png");
FIN=loadImage("gameOver.png");
Restart=loadImage("restart.png");
suelo2=loadImage("ground2.png");
nube2=loadImage("cloud.png");
cactus1=loadImage("obstacle1.png");
cactus2=loadImage("obstacle2.png");
cactus3=loadImage("obstacle3.png");
cactus4=loadImage("obstacle4.png");
cactus5=loadImage("obstacle5.png");
cactus6=loadImage("obstacle6.png");
sadto=loadSound("jump.mp3");
chechoint=loadSound("checkpoint.mp3");
mudio=loadSound("die.mp3");
}
function setup()
{
 createCanvas(windowWidth,windowHeight);
 FIN2=createSprite(windowWidth/2,windowHeight/2,10,10)
 Restart2=createSprite(windowWidth/2,windowHeight/2+50,10,10)
 inv=createSprite(300,198,600,5);
 inv.visible=false;
 suelo=createSprite(windowWidth/2,windowHeight-windowHeight/40,windowWidth*2,windowHeight/40);//revisar espacio en blanco 
 suelo.addImage(suelo2);
 trex=createSprite(windowWidth/12,windowHeight/5,20,50);
 trex.addAnimation("running",trex_running,);
 trex.addAnimation("died",trex_died,);
 trex.scale=0.7;
 bordes=createEdgeSprites();
 var Z
 Z=Math.round(random(1,947))
 //console.log(Z)
 cactusjuntos=new Group();
 nubesjuntas=new Group();
 trex.setCollider("circle",0,0,40);
 //trex.debug=true;
 console.log(windowWidth)
 console.log(windowHeight)
 FIN2.addImage(FIN);
 Restart2.addImage(Restart);
 FIN2.scale=0.5;
 Restart2.scale=0.5;
 FIN2.visible=false;
 Restart2.visible=false;

}
function draw()
{
 background("white");
 textSize(12);
 text("score "+score,20,20);

 if(gamestate==PLAY)
 {
    trex.velocityY=trex.velocityY+1;
    score=Math.round(getFrameRate()/55)+score
    suelo.velocityX=-(5+3*(score/100));
    if((touches.length>0||keyDown("space"))&&trex.y>=windowHeight-windowHeight/15)
    {
     trex.velocityY=-13;
     sadto.play();
     touches=[]
    }
    if(suelo.x<0)
    {
     suelo.x=displayWidth/2;
   
    }
    
    cloud();
    CACTUS();
    if(cactusjuntos.isTouching(trex)){
        gamestate=END
        mudio.play();
        FIN2.visible=true;
        Restart2.visible=true;
        }
    if(score>0&&score%100==0){
     chechoint.play();

    }
 }
 
  else if(gamestate==END){

  suelo.velocityX=0;
  cactusjuntos.setVelocityXEach(0);
  nubesjuntas.setVelocityXEach(0);
  trex.velocityY=0
  trex.changeAnimation("died",trex_died);
   cactusjuntos.setLifetimeEach(-1)
   nubesjuntas.setLifetimeEach(-1)
   if(mousePressedOver(Restart2)){
    RESET();
   }
  }

   trex.collide(bordes[3]);
   drawSprites();

}

 function cloud ()
{ 
    if(frameCount%80==0)
    {
     nube=createSprite(windowWidth-50,windowHeight-windowHeight+100,15,12.5);
     nube.velocityX=-5;
     nube.lifetime=150;
     nube.y=Math.round(random(windowHeight-windowHeight+50,windowHeight-windowHeight+150));
     nube.addImage(nube2);
     nube.depth=trex.depth;
     trex.depth=trex.depth+1
     nubesjuntas.add(nube)
    }
}    function RESET()
{
   gamestate=PLAY
   Reset2.visible=false
   FIN2.visible=false
   cactusjuntos.destroyEach();
   nubesjuntas.destroyEach();
   score=0
}
 function CACTUS()
{ if(frameCount%100==0)
    {
        cactus=createSprite(windowWidth-20,windowHeight-40,5,15);
        cactus.scale=0.5
        cactus.velocityX=-(8+3*(score/100));
     var rand=Math.round(random(1,6))   
     cactus.lifetime=windowWidth/cactus.velocityX;
     cactusjuntos.add(cactus)
     switch(rand)
     {
      case 1 : cactus.addImage(cactus1);
      break;
      case 2 : cactus.addImage(cactus2);
      break;
      case 3 : cactus.addImage(cactus3);
      break;
      case 4 : cactus.addImage(cactus4);
      break;
      case 5 : cactus.addImage(cactus5);
      break;
      case 6 : cactus.addImage(cactus6);
      break;
      default:break;
      
     }

                                                           
    }      
    



}
