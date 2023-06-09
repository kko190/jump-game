const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;

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

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  player2.update();
}

animate();
