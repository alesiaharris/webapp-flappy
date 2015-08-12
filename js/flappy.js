// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = 0;
var labelScore;
var player;
var pipes = [];

jQuery("#greeting-form").on("submit", function(event_details) {
    var greeting = "Hello ";
    var name = jQuery("#fullName").val();
    var greeting_message = greeting + name;
    jQuery("#greeting-form").hide();
    jQuery("#greeting").append("<p>" + greeting_message + "</p>");
    //event_details.preventDefault();
});





/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "../assets/playboy4.png");
    game.load.image("backgroundImg", "../assets/dollar.jpg");
    game.load.audio("score", "../assets/point.ogg");
    game.load.image("pipe","../assets/pipe.png");


}
/*0
 * Initialises the game. This function is only called once.
 */
function create() {
  //  game.stage.setBackgroundColor('#FF3399');
    game.add.image(0, 0, "backgroundImg");
    game.add.text(45, 90, "Welcome",
        {font: "60px Doulos SIL sil ", fill: "#E8196C"});
    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(400, 170, "playerImg");
    player.scale.x = -0.052;
    player.scale.y = 0.052;
    game.physics.arcade.enable(player);
    player.body.velocity.x = 100;
    player.body.velocity.y = -100;
    player.body.gravity.y = 200;

    //game.input.onDown.add(clickHandler);

    // Call spaceHandler when space bar pressed
    /*game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);*/

    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);

    labelScore = game.add.text(20, 20, "0");
    //labelScore.setText(score.toString());
    // set the background colour of the scene

  //  player.anchor.setTo(0.5, 0.5);



    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);
    //game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, generatePipe);

    /*game.input.keyboard

        .onDown.add(playerJump);*/
   var pipeInterval = 1.75;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
        generatePipe);
}

function spaceHandler() {
    score = score + 1;
    game.sound.play("score");
    labelScore.setText(score.toString());
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  /*  if (player.body.y < 0 || player.body.y > 400) {
        gameOver();
    }
    player.rotation = Math.atan(player.body.velocity.y / 200);*/



}

function clickHandler(event) {
    alert("The position is: " + event.x + " " + event.y);
    // game.add.sprite(event.x, event.y, "playerImg");
}

function changeScore() {
    score = score + 1;
    labelScore.setText(score.toString());
}

function moveLeft() {
    player.x -= 10;
}

function moveRight() {
    player.x += 10;
}

function moveUp() {
    player.y -= 10;
}

function moveDown() {
    player.y += 10;
}

function generatePipe() {

    var gap = game.rnd.integerInRange(1, 5);
    for (var count = 0; count < 8; count++) {
        if (count != gap && count != gap + 1) {
            addPipeBlock(750, count * 50);
        }
    }
    changeScore();
}

function gameOver() {

}

//    for (var count = 2; count < 10; count += 2)
//        game.add.sprite(count * 50, 200, "pipe");

//}
function addPipeBlock(x, y) {
    // create a new pipe block
    var pipeBlock = game.add.sprite(x, y, "pipe");
    // insert it in the 'pipes' array
    pipes.push(pipeBlock);
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -200;


}
function playerJump() {
    player.body.velocity.y = -200;
}