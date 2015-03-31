var game;
var plat;
var dude;
var starGroup;
var cursor;
var scoreSound;
var myscore = 0;
var scoreText;
$(function()
  {    
//alert("hello game..");
game = new Phaser.Game(
    800,600,Phaser.AUTO, "",
    {
        preload:preload,
        create:create,
        update:update 
    }
    );
});


function preload(){
    game.load.image("star", "assets/star.png");
    game.load.image("ground", "assets/platform.png");
    game.load.image("sky", "assets/sky.png");
    game.load.spritesheet("dude","assets/dude.png",32,48);
    game.load.audio("score","assets/score.wav");
console.log(">>> preload");

}

function create(){
   
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0,0,"sky");
    //game.add.sprite(50,50,"star");
   // game.add.sprite(0,500,"ground");
    scoreSound = game.add.audio("score");

    plat = game.add.group();
    plat.enableBody = true;
    var ground = plat.create(0,game.world.height - 64, "ground");
    ground.scale.setTo(2,2);
  
    
    var obj = plat.create(-150,200, "ground");
obj.body.immovable = true;
  var obj =  plat.create(400,400, "ground");
obj.body.immovable = true;

starGroup = game.add.group();
for (var i = 0; i < 12; i++) {
    var obj = starGroup.create(game.world.width/12 *i,10,"star");
    obj.enableBody = true;
    game.physics.arcade.enable(obj);

    obj.body.bounce.y = 0.5;
    obj.body.gravity.y = (30 * Math.random())+10;
    obj.body.collideWorldBounds = true;
    //obj.gravity.y = 30;
};


dude = game.add.sprite(0,game.world.height - 150,"dude");
dude.animations.add("left",[0,1,2,3],10,true);
dude.animations.add("right",[5,6,7,8],10,true);
dude.animations.add("face",[4],10,true);

game.physics.arcade.enable(dude);
game.physics.arcade.enable(plat);

  ground.body.immovable =  true;
//  plat.body.immovable = true;

dude.body.bounce.y = 0.5;
dude.body.gravity.y = 30;
dude.body.collideWorldBounds = true;


cursor = game.input.keyboard.createCursorKeys();

scoreText = game.add.text( 30,30,"Score :0");
    console.log(">>> create");
}

function update(){

game.physics.arcade.collide(dude,plat);
game.physics.arcade.collide(starGroup,plat);
game.physics.arcade.collide(dude,starGroup,dudeAndStar);


    if(cursor.left.isDown){
        dude.animations.play("left");
         dude.body.velocity.x = -150;
        console.log("left");
    }
    else if (cursor.right.isDown){
         dude.animations.play("right");
          dude.body.velocity.x = 150;
         console.log("right");
    }
    else if (cursor.up.isDown){

        dude.animations.play("face");
        //dude.body.velocity.x = 100;
         dude.body.velocity.y = -100;
    }
     else if (cursor.down.isDown){

        dude.animations.play("face");
        dude.body.velocity.x = 0;
         dude.body.velocity.y = 100;
    }
    else {
        dude.animations.frame = 4;
        dude.body.velocity.x = 0;
    }
console.log(">>> update");
}


function dudeAndStar (dude, oneStar) {
    
    // oneStar.body.velocity.x = 0;
      //   oneStar.body.velocity.y = 100;


      if(oneStar.body.velocity.x > 30){
        myscore += 10;
        scoreText.text = "Score :" + (myscore);
         scoreSound.play();
         oneStar.kill();
      }else
      {
        if(oneStar.body.velocity.x < 0){
            oneStar.body.velocity.x = 30;
        }else
        {
            //oneStar.body.velocity.x = -30;
             myscore += 10;
            scoreText.text = "Score :" + (myscore);
             scoreSound.play();
             oneStar.kill();
        }
      }
     
}