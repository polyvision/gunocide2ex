function StageBackground(texture_path,width,height){
  var bgTexture = PIXI.Texture.fromImage(texture_path)
  PIXI.Sprite.call(this, bgTexture);

  this.anchor.x = 0.5;
  this.anchor.y = 0.5;
  this.position.x = 400;
  this.position.y = 300;
  this.width = width;
  this.height = height;
}

StageBackground.constructor = StageBackground;
StageBackground.prototype = Object.create(PIXI.Sprite.prototype);