const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const replayButton = document.getElementById("replayButton");
const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./background.png",
});
const shop = new Sprite({
  position: {
    x: 650,
    y: 160,
  },
  imageSrc: "./shop.png",
  maxFrames: 6,
  scale: 2.5,
});
const player = new Fighter({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  imageSrc: "./npc1/Idle.png",
  attackDelay: 3,
  maxFrames: 8,
  scale: 2.28,
  padding: { x: 70, y: 120 },
  sprites: {
    Attack1: {
      imageSrc: "./npc1/Attack1.png",
      maxFrames: 6,
    },
    Attack2: {
      imageSrc: "./npc1/Attack2.png",
      maxFrames: 6,
    },
    Death: {
      imageSrc: "./npc1/Death.png",
      maxFrames: 6,
    },
    Fall: {
      imageSrc: "./npc1/Fall.png",
      maxFrames: 2,
    },
    Idle: {
      imageSrc: "./npc1/Idle.png",
      maxFrames: 8,
    },
    Jump: {
      imageSrc: "./npc1/Jump.png",
      maxFrames: 2,
    },
    Run: {
      imageSrc: "./npc1/Run.png",
      maxFrames: 8,
    },
    TakeHit: {
      imageSrc: "./npc1/Take Hit.png",
      maxFrames: 4,
    },
  },
});
const enemy = new Fighter({
  position: { x: canvas.width + 460, y: 0 },
  velocity: { x: 0, y: 0 },
  maxFrames: 4,
  imageSrc: "./npc2/Idle.png",
  attackDelay: 2,
  scale: 2.18,
  padding: { x: 70, y: 120 },
  sprites: {
    Attack1: {
      imageSrc: "./npc2/Attack1.png",
      maxFrames: 4,
    },
    Attack2: {
      imageSrc: "./npc2/Attack2.png",
      maxFrames: 4,
    },
    Death: {
      imageSrc: "./npc2/Death.png",
      maxFrames: 7,
    },
    Fall: {
      imageSrc: "./npc2/Fall.png",
      maxFrames: 2,
    },
    Idle: {
      imageSrc: "./npc2/Idle.png",
      maxFrames: 4,
    },
    Jump: {
      imageSrc: "./npc2/Jump.png",
      maxFrames: 2,
    },
    Run: {
      imageSrc: "./npc2/Run.png",
      maxFrames: 8,
    },
    TakeHit: {
      imageSrc: "./npc2/Take Hit.png",
      maxFrames: 3,
    },
  },
});
let attacks = ["Attack1", "Attack2"];
let randomNumber;
canvas.width = 1024;
canvas.height = 576;
let gravity = 0.3;
let isHittable = {
  player: false,
  enemy: false,
};
c.fillRect(0, 0, canvas.width, canvas.height);
let key = {
  a: false,
  d: false,
  w: false,
  s: false,
  space: false,
  arrowUp: false,
  arrowDown: false,
  arrowRight: false,
  arrowLeft: false,
  enter: false,
};

function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  if (timer == 0) {
    document.querySelector("#displayText").style.display = "flex";
    cancelAnimationFrame(animationFrame);

    replayButton.style.display = "flex";
  }
  if (player.health <= 0) {
    player.switchSprites("Death");
  } else if (enemy.health <= 0) {
    enemy.switchSprites("Death");
  }
}
let timer = 60;
let timerId;
let animationFrame;
function decreaseTimer() {
  if (timer > 0) {
    timer--;
    document.querySelector("#timer").textContent = String(timer);
    timerId = setTimeout(decreaseTimer, 1000);
  } else {
    determineWinner({ player, enemy, timerId });
  }
}
decreaseTimer();

function animate() {
  animationFrame = requestAnimationFrame(animate);
  if (player.isDead) {
    document.querySelector("#displayText").innerHTML = "PLAYER 2 WINS";
    document.querySelector("#displayText").style.display = "flex";
    cancelAnimationFrame(animationFrame);
    replayButton.style.display = "flex";
  } else if (enemy.isDead) {
    document.querySelector("#displayText").innerHTML = "PLAYER 1 WINS";
    document.querySelector("#displayText").style.display = "flex";
    cancelAnimationFrame(animationFrame);
    replayButton.style.display = "flex";
  }
  background.update();
  shop.update();

  player.update();
  enemy.update();

  if (key.s) {
    gravity = 0.5;
  } else {
    gravity = 0.3;
  }
  if (key.d && key.a) {
    player.velocity.x = 0;
  } else if (key.d) {
    player.velocity.x = 3;
    player.attackBox.width = 217;
    player.direction = 1;
  } else if (key.a) {
    player.direction = -1;
    player.velocity.x = -3;
    player.attackBox.width = -217;
  } else {
    player.velocity.x = 0;
  }

  if (player.position.y + player.height <= canvas.height - 98) {
    player.velocity.y += gravity;
  } else if (key.w) {
    player.velocity.y = -15;
  } else {
    player.position.y = 481.4 - player.height;
    player.velocity.y = 0;
  }
  if (key.arrowUp && enemy.position.y == 481.4 - enemy.height) {
    enemy.velocity.y = -15;
  }
  if (key.w && player.position.y == 481.4 - player.height) {
    player.velocity.y = -15;
  }

  if (key.arrowDown) {
    gravity = 0.5;
  } else {
    gravity = 0.3;
  }
  if (player.position.x <= -90) {
    player.position.x = -90;
  } else if (player.position.x >= 840) {
    player.position.x = 840;
  }
  if (enemy.position.x >= 840) {
    enemy.position.x = 840;
  } else if (enemy.position.x <= -90) {
    enemy.position.x = -90;
  }

  if (key.arrowRight && key.arrowLeft) {
    enemy.velocity.x = 0;
  } else if (key.arrowRight) {
    enemy.velocity.x = 3;
    enemy.attackBox.width = 180;
    enemy.direction = 1;
  } else if (key.arrowLeft) {
    enemy.direction = -1;
    enemy.velocity.x = -3;
    enemy.attackBox.width = -180;
  } else {
    enemy.velocity.x = 0;
  }

  if (enemy.position.y + enemy.height <= canvas.height - 98) {
    enemy.velocity.y += gravity;
  } else if (key.arrowUp) {
    enemy.velocity.y = -15;
  } else {
    enemy.velocity.y = 0;
    enemy.position.y = 481.4 - enemy.height;
  }
  //PLAYER 1 ANIMATION
  if (player.velocity.x > 0) {
    player.switchSprites("Run");
  }
  if (player.velocity.x < 0) {
    player.switchSprites("Run");
  }
  if (player.velocity.y < 0) {
    player.switchSprites("Jump");
  } else if (player.velocity.y > 0) {
    player.switchSprites("Fall");
  }
  if (player.velocity.x == 0 && player.velocity.y == 0) {
    player.switchSprites("Idle");
  }
  if (key.space) {
    randomNumber = Math.floor(Math.random() * attacks.length);
    player.switchSprites(attacks[randomNumber]);
  }
  //PLAYER 2 ANIMATION
  if (enemy.velocity.x > 0) {
    enemy.switchSprites("Run");
  }
  if (enemy.velocity.x < 0) {
    enemy.switchSprites("Run");
  }
  if (enemy.velocity.y < 0) {
    enemy.switchSprites("Jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprites("Fall");
  }
  if (enemy.velocity.x == 0 && enemy.velocity.y == 0) {
    enemy.switchSprites("Idle");
  }
  if (key.enter) {
    randomNumber = Math.floor(Math.random() * attacks.length);
    enemy.switchSprites(attacks[randomNumber]);
  }

  if (
    Math.abs(
      player.attackBox.position.x +
        player.attackBox.width / 2 -
        enemy.hitBox.position.x -
        enemy.hitBox.width / 2
    ) <
    (Math.abs(enemy.hitBox.width) + Math.abs(player.attackBox.width)) / 2
  ) {
    isHittable.enemy = true;
  } else {
    isHittable.enemy = false;
  }
  if (
    Math.abs(
      enemy.attackBox.position.x +
        enemy.attackBox.width / 2 -
        player.hitBox.position.x -
        player.hitBox.width / 2
    ) <
    (Math.abs(player.hitBox.width) + Math.abs(enemy.attackBox.width)) / 2
  ) {
    isHittable.player = true;
  } else {
    isHittable.player = false;
  }
  if (key.space && isHittable.enemy && player.currentFrame == 4) {
    enemy.switchSprites("TakeHit");
    enemy.health -= 10;
    document.querySelector("#enemyHealth").style.width = enemy.health + "%";
  }
  if (key.enter && isHittable.player && enemy.currentFrame == 2) {
    player.switchSprites("TakeHit");
    player.health -= 10;
    document.querySelector("#playerHealth").style.width = player.health + "%";
  }
  if (key.space && player.currentFrame == 4) {
    key.space = false;
  }
  if (key.enter && enemy.currentFrame == 2) {
    key.enter = false;
  }

  if (player.health <= 0 || enemy.health <= 0) {
    determineWinner({ player, enemy, timerId });
  }
}
animate();

window.addEventListener("keydown", (Event) => {
  switch (Event.key) {
    case "d":
      key.d = true;
      break;
    case "a":
      key.a = true;
      break;
    case "w":
      key.w = true;
      break;
    case "s":
      key.s = true;
      break;
    case "ArrowRight":
      key.arrowRight = true;
      break;
    case "ArrowLeft":
      key.arrowLeft = true;
      break;
    case "ArrowUp":
      key.arrowUp = true;
      break;
    case "ArrowDown":
      key.arrowDown = true;
      break;
    case " ":
      key.space = true;
      break;
    case "Enter":
      key.enter = true;
  }
});

window.addEventListener("keyup", (Event) => {
  switch (Event.key) {
    case "d":
      key.d = false;
      break;
    case "a":
      key.a = false;
      break;
    case "w":
      key.w = false;
      break;
    case "s":
      key.s = false;
      break;
    case "ArrowRight":
      key.arrowRight = false;
      break;
    case "ArrowLeft":
      key.arrowLeft = false;
      break;
    case "ArrowUp":
      key.arrowUp = false;
      break;
    case "ArrowDown":
      key.arrowDown = false;
      break;
  }
});
