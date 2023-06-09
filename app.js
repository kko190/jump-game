const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};

const gravity = 0.5;

class Sprite {
  // 파라미터를 {}로 감싸면 순서를 신경쓰지 않아도 돼서 편리하다.
  constructor({ position, imageSrc }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  draw() {
    if (!this.image) return;
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
  }
}

class Player {
  // player가 가지고 있는 속성을 담는 곳이 constructor
  constructor(position) {
    this.position = position;
    // 중력을 구현하기 위해서 y의 속도를 지정해줌.
    // player의 y값이 변경될때마다 velocity의 y값을 더해주면 됨.
    // 그리고 그 velocity.y도 gravity씩 더해주면 중력을 구현가능.
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.width = 100;
    this.height = 100;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y < canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

// 위에서 만든 player 클래스를 사용하기 위해선 변수에 할당해줘야 함.
const player = new Player({
  x: 0,
  y: 0,
});
const player2 = new Player({
  x: 200,
  y: 0,
});

// 키가 눌려있을 때만 움직임을 주기 위해서 key라는 변수를 만들어 각각의 키의 상태를 불리언 값으로 표현함.
const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
};

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/background.png",
});
function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.scale(4, 4);
  ctx.translate(0, -background.image.height + scaledCanvas.height);
  background.update();
  ctx.restore();
  player.update();
  player2.update();
  // x의 속도를 0으로 주고 조건에 따라 d키와 a키가 눌리면 x의 속도를 주어서 방향키에 반응하게 함.
  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.velocity.x = 2;
  } else if (keys.a.pressed) {
    player.velocity.x = -2;
  }
}

animate();

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "w":
      player.velocity.y = -15;
      break;
  }
});
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }
});
