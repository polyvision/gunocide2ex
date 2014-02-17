/**
* Player class
* responsible for movement, sprite management and other stuff
**/

function Player(pixie_stage){
  self = this;
  this.stage = pixie_stage;

  this.iMovementDirectionX = 0;
  this.iMovementDirectionY = 0;
  this.iMovementSpeed = 10;
  this.currentPlayerShipSprite = null;
}

Player.constructor = Player;
Player.prototype = new Object();

Player.prototype.load_assets = function(){
  // loading the sprites for the player
  var assetsToLoader = [ "data/banshee/normal.json","data/banshee/banshee_links.json","data/banshee/banshee_rechts.json"];

  var loader = new PIXI.AssetLoader(assetsToLoader);
  // we define the event when the assets got loaded, and we're binding this so that we have access to the player instance
  // in the loaded_animations function
  loader.onComplete = this.loaded_animations.bind(this);

  loader.load();
}

Player.prototype.loaded_animations = function(){

    
    var normal_animations = [];
    normal_animations.push(PIXI.Texture.fromFrame("normal1.png"));
    normal_animations.push(PIXI.Texture.fromFrame("normal2.png"));

    var left_animations = [];
    left_animations.push(PIXI.Texture.fromFrame("banshee_links1.png"));
    left_animations.push(PIXI.Texture.fromFrame("banshee_links2.png"));
    left_animations.push(PIXI.Texture.fromFrame("banshee_links3.png"));
    left_animations.push(PIXI.Texture.fromFrame("banshee_links4.png"));
    left_animations.push(PIXI.Texture.fromFrame("banshee_links5.png"));
    left_animations.push(PIXI.Texture.fromFrame("banshee_links6.png"));

    var right_animations = [];
    right_animations.push(PIXI.Texture.fromFrame("banshee_rechts1.png"));
    right_animations.push(PIXI.Texture.fromFrame("banshee_rechts2.png"));
    right_animations.push(PIXI.Texture.fromFrame("banshee_rechts3.png"));
    right_animations.push(PIXI.Texture.fromFrame("banshee_rechts4.png"));
    right_animations.push(PIXI.Texture.fromFrame("banshee_rechts5.png"));
    right_animations.push(PIXI.Texture.fromFrame("banshee_rechts6.png"));

    this.playerSprite = new PlayerShip(normal_animations);
    this.playerSprite.position.x = 400;
    this.playerSprite.position.y = 500;

    // some specials values for the animations to the left and right
    this.playerSpriteLeft = new PlayerShip(left_animations);
    this.playerSpriteLeft.loop = false;
    this.playerSpriteLeft.animationSpeed = 0.2;

    this.playerSpriteRight = new PlayerShip(right_animations);
    this.playerSpriteRight.loop = false;
    this.playerSpriteRight.animationSpeed = 0.2;

    this.currentPlayerShipSprite = this.playerSprite; // setting the current displayed animation
    this.stage.addChild(this.currentPlayerShipSprite);
}

Player.prototype.move_left  = function(){
  this.iMovementDirectionX = -1; 
}

Player.prototype.move_right  = function(){
  this.iMovementDirectionX = 1;
}

Player.prototype.stop_movementX = function() {
  this.iMovementDirectionX = 0;
}

Player.prototype.move_up  = function(){
  this.iMovementDirectionY = -1; 
}

Player.prototype.move_down  = function(){
  this.iMovementDirectionY = 1;
}

Player.prototype.stop_movementY = function() {
  this.iMovementDirectionY = 0;
}

Player.prototype.update = function(delta){
  if(this.iMovementDirectionX == -1){ // moving left
    this.currentPlayerShipSprite.position.x -= this.iMovementSpeed;
    
    if(this.currentPlayerShipSprite != this.playerSpriteLeft){
      this.playerSpriteLeft.position.x = this.currentPlayerShipSprite.position.x;
      this.playerSpriteLeft.position.y = this.currentPlayerShipSprite.position.y;

      this.stage.removeChild(this.currentPlayerShipSprite);
      this.currentPlayerShipSprite = this.playerSpriteLeft;
      this.currentPlayerShipSprite.gotoAndPlay(0);
      this.stage.addChild(this.currentPlayerShipSprite);
    }
  }else  if(this.iMovementDirectionX == 1){ // moving right
    this.currentPlayerShipSprite.position.x += this.iMovementSpeed;   

    if(this.currentPlayerShipSprite != this.playerSpriteRight){
      this.playerSpriteRight.position.x = this.currentPlayerShipSprite.position.x;
      this.playerSpriteRight.position.y = this.currentPlayerShipSprite.position.y;

      this.stage.removeChild(this.currentPlayerShipSprite);
      this.currentPlayerShipSprite = this.playerSpriteRight;
      this.currentPlayerShipSprite.gotoAndPlay(0);
      this.stage.addChild(this.currentPlayerShipSprite);
    }
  }else if(this.iMovementDirectionX == 0){
    if(this.playerSprite && (this.currentPlayerShipSprite != this.playerSprite)){
      this.playerSprite.position.x = this.currentPlayerShipSprite.position.x;
      this.playerSprite.position.y = this.currentPlayerShipSprite.position.y;

      this.stage.removeChild(this.currentPlayerShipSprite);
      this.currentPlayerShipSprite = this.playerSprite;
      this.currentPlayerShipSprite.gotoAndPlay(0);
      this.stage.addChild(this.currentPlayerShipSprite);
    }
  }

  if(this.iMovementDirectionY == -1){
    this.currentPlayerShipSprite.position.y -= this.iMovementSpeed;   
  }else  if(this.iMovementDirectionY == 1){
    this.currentPlayerShipSprite.position.y += this.iMovementSpeed;   
  }

  // don't let the player move outsite the screen
  if(this.currentPlayerShipSprite){
    if(this.currentPlayerShipSprite.position.x < 0){
      this.currentPlayerShipSprite.position.x = 0;
    }

    if(this.currentPlayerShipSprite.position.x > 800){
      this.currentPlayerShipSprite.position.x = 800;
    }

    if(this.currentPlayerShipSprite.position.y > 600){
      this.currentPlayerShipSprite.position.y = 600;
    }

    if(this.currentPlayerShipSprite.position.y < 400){
      this.currentPlayerShipSprite.position.y = 400;
    }  
  } // end of if(this.currentPlayerShipSprite)
}