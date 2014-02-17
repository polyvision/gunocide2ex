function PlayerShip(normal_textures){
  PIXI.MovieClip.call(this, normal_textures);
  
  this.anchor.x = 0.5;
  this.anchor.y = 0.5;
  this.animationSpeed = 0.5;
  this.gotoAndPlay(0);
}

PlayerShip.constructor = PlayerShip;
PlayerShip.prototype = Object.create(PIXI.MovieClip.prototype);