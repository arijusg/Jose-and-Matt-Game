var screenHeight = 550;
var screenWidth = 400;
var togleMouse = 1;

var game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var systems = [];

function preload() {
  game.load.image('matt', './assets/matt.png');
  game.load.image('jose', './assets/jose.png');
}

function create() {

  game.stage.backgroundColor = '#ffffff';

  //Starts the arcade physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.minWidth = 200;
  game.scale.minHeight = 225;
  game.scale.maxWidth = 800;
  game.scale.maxHeight = 1100;
  game.scale.pageAlignHorizontally = true;

  game.input.onDown.add(generateHeadSystems);
}

function generateHeadSystems(pointer) {
  var system = new HeadSystem();
  if (togleMouse === 1) {
    system.createHead(pointer.x, pointer.y, 'jose');
    togleMouse = 0;
  }
  else {
    system.createHead(pointer.x, pointer.y, 'matt');
    togleMouse = 1;
  }
  systems.push(system);
}

function update() {
  for (var i = 0; i < systems.length; i++) {
    systems[i].update();
  }
}

function render() {

 }

function HeadSystem() {
  this.heads = [];
}

HeadSystem.prototype.createHead = function (x, y, headSpriteName) {
  var head = game.add.sprite(0, 0, headSpriteName);
  head.width = 100;
  head.height = 100;
  head.x = x;
  head.y = y;
  head.velocityX = 1.5;
  head.velocityY = 5.5;
  this.heads.push(head);
}

HeadSystem.prototype.update = function () {
  for (var i = 0; i < this.heads.length; i++) {
    var head = this.heads[i];

   // head.velocityX += game.rnd.between(-0.5, 0.5);

    head.x += head.velocityX;
    head.y += head.velocityY;

    if (head.x > screenWidth - head.width) {
      head.velocityX *= -1;
    }

    if (head.x < 0) {
      head.velocityX *= -1;
    }

    if (head.y > screenHeight - head.height || head.y < 0) {
      head.velocityY *= -1;
    }
  }
}
