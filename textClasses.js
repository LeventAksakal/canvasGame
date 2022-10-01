class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    maxFrames = 1,
    padding = { x: 0, y: 0 },
    sprites,
  }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.maxFrames = maxFrames;
    this.currentFrame = 0;
    this.framesElapsed = 0;
    this.hold = 10;
    this.padding = padding;
    this.sprites = sprites;
  }
  draw() {
    c.drawImage(
      this.image,
      (this.currentFrame * this.image.width) / this.maxFrames,
      0,
      this.image.width / this.maxFrames,
      this.image.height,
      this.position.x - this.padding.x,
      this.position.y - this.padding.y,
      (this.image.width * this.scale) / this.maxFrames,
      this.image.height * this.scale
    );
  }

  update() {
    this.draw();
    this.animate();
  }
  animate() {
    this.framesElapsed++;
    if (this.framesElapsed % this.hold == 0) {
      this.currentFrame++;
      if (this.maxFrames == this.currentFrame) {
        this.currentFrame = 0;
      }
    }
  }
}

class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    imageSrc,
    health = 100,
    scale = 1,
    maxFrames = 1,
    padding,
    sprites,
    attackDelay,
    label,
  }) {
    super({ position, imageSrc, scale, maxFrames, padding, sprites });
    this.position = position;
    this.velocity = velocity;
    this.direction = 1;
    this.width = 90;
    this.height = 160;
    this.health = health;
    this.label = label;
    this.hitBox = {
      position: {
        x: this.position.x + 130,
        y: this.position.y + 40,
      },
      width: 40,
      height: 120,
    };
    this.attackBox = {
      position: {
        x: this.position.x + 130 + this.hitBox.width / 2,
        y: this.position.y + 40 + this.hitBox.height / 4,
      },
      width: 0,
      height: 50,
    };

    this.framesElapsed = 0;
    this.hold = 10;
    this.currentFrame = 0;
    this.isDead = false;
    this.isFlipped = false;
    this.attackDelay = attackDelay;
    for (const sprite in this.sprites) {
      this.sprites[sprite].image = new Image();
      this.sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }
  update() {
    this.draw();
    if (!this.isDead) {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.hitBox.position.x = this.position.x + 130;
      this.hitBox.position.y = this.position.y + 40;
      this.attackBox.position.x = this.position.x + 130 + this.hitBox.width / 2;
      this.attackBox.position.y = this.position.y + 40 + this.hitBox.height / 4;
      this.animate();
    }
  }
  draw() {
    c.scale(this.direction, 1);
    c.drawImage(
      this.image,
      (this.currentFrame * this.image.width) / this.maxFrames,
      0,
      this.image.width / this.maxFrames,
      this.image.height,
      this.direction * (this.position.x - this.padding.x),
      this.position.y - this.padding.y,
      (this.direction * (this.image.width * this.scale)) / this.maxFrames,
      this.image.height * this.scale
    );
    c.resetTransform();
    c.restore();
  }

  switchSprites(sprite) {
    if (
      this.image === this.sprites.Attack1.image &&
      this.currentFrame < this.maxFrames - 1
    ) {
      return;
    } else if (
      this.image === this.sprites.Attack2.image &&
      this.currentFrame < this.maxFrames - 1
    ) {
      return;
    } else if (this.image === this.sprites.Death.image) {
      if (this.currentFrame == this.maxFrames - 1) {
        this.isDead = true;
      }
      return;
    } else if (
      this.image === this.sprites.TakeHit.image &&
      this.currentFrame < this.maxFrames - 1
    ) {
      return;
    }
    switch (sprite) {
      case "Attack1":
        if (this.image !== this.sprites.Attack1.image) {
          this.image = this.sprites.Attack1.image;
          this.maxFrames = this.sprites.Attack1.maxFrames;
          this.currentFrame = 0;
        }
        break;
      case "Attack2":
        if (this.image !== this.sprites.Attack2.image) {
          this.image = this.sprites.Attack2.image;
          this.maxFrames = this.sprites.Attack2.maxFrames;
          this.currentFrame = 0;
        }
        break;
      case "Death":
        if (this.image !== this.sprites.Death.image) {
          this.image = this.sprites.Death.image;
          this.maxFrames = this.sprites.Death.maxFrames;
          this.currentFrame = 0;
        }
        break;
      case "Fall":
        if (this.image !== this.sprites.Fall.image) {
          this.image = this.sprites.Fall.image;
          this.maxFrames = this.sprites.Fall.maxFrames;
          this.currentFrame = 0;
        }
        break;
      case "Idle":
        if (this.image !== this.sprites.Idle.image) {
          this.image = this.sprites.Idle.image;
          this.maxFrames = this.sprites.Idle.maxFrames;
          this.currentFrame = 0;
        }
        break;
      case "Jump":
        if (this.image !== this.sprites.Jump.image) {
          this.image = this.sprites.Jump.image;
          this.maxFrames = this.sprites.Jump.maxFrames;
          this.currentFrame = 0;
        }
        break;
      case "Run":
        if (this.image !== this.sprites.Run.image) {
          this.image = this.sprites.Run.image;
          this.maxFrames = this.sprites.Run.maxFrames;
          this.currentFrame = 0;
        }
        break;
      case "TakeHit":
        if (this.image !== this.sprites.TakeHit.image) {
          this.image = this.sprites.TakeHit.image;
          this.maxFrames = this.sprites.TakeHit.maxFrames;
          this.currentFrame = 0;
        }
        break;
    }
  }
}
