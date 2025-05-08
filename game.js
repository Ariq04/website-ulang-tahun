const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");
context.scale(20, 20);

const arena = createMatrix(12, 20);

let dropCounter = 0;
let dropInterval = 350;
let lastTime = 0;
let gameOver = false;

function createMatrix(w, h) {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

function collide(arena, player) {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

function playerDrop() {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    playerReset();
    arenaSweep();
  }
  dropCounter = 0;
}

function playerMove(dir) {
  player.pos.x += dir;
  if (collide(arena, player)) {
    player.pos.x -= dir;
  }
}

function playerReset() {
  const pieces = "TJLOSZI";
  player.matrix = createPiece(
    pieces[Math.floor(Math.random() * pieces.length)]
  );
  player.pos.y = 0;
  player.pos.x =
    ((arena[0].length / 2) | 0) - ((player.matrix[0].length / 2) | 0);

  // Cek game over di sini, setelah reset
  if (collide(arena, player)) {
    gameOver = true;
    document.getElementById("gameOverMsg").style.display = "block";
  }
}

function createPiece(type) {
  if (type === "T") {
    return [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];
  } else if (type === "O") {
    return [
      [2, 2],
      [2, 2],
    ];
  } else if (type === "L") {
    return [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0],
    ];
  } else if (type === "J") {
    return [
      [4, 0, 0],
      [4, 4, 4],
      [0, 0, 0],
    ];
  } else if (type === "Z") {
    return [
      [5, 5, 0],
      [0, 5, 5],
      [0, 0, 0],
    ];
  } else if (type === "S") {
    return [
      [0, 6, 6],
      [6, 6, 0],
      [0, 0, 0],
    ];
  } else if (type === "I") {
    return [
      [0, 0, 0, 0],
      [7, 7, 7, 7],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
  }
}

function rotateMatrix(matrix) {
  return matrix[0].map((_, i) => matrix.map((row) => row[i])).reverse();
}

function rotate() {
  const cloned = JSON.parse(JSON.stringify(player.matrix));
  const rotated = rotateMatrix(cloned);
  player.matrix = rotated;

  if (collide(arena, player)) {
    player.matrix = cloned; // batal rotate jika tabrakan
  }
}

function moveLeft() {
  playerMove(-1);
}

function moveRight() {
  playerMove(1);
}

function arenaSweep() {
  outer: for (let y = arena.length - 1; y > 0; --y) {
    for (let x = 0; x < arena[y].length; ++x) {
      if (arena[y][x] === 0) {
        continue outer;
      }
    }
    const row = arena.splice(y, 1)[0].fill(0);
    arena.unshift(row);
    y++;
    // Increase speed
    dropInterval *= 0.95;
  }
}

const colors = [
  null, // 0 = tidak ada warna
  "#FF0D72", // 1 = T
  "#0DC2FF", // 2 = O
  "#0DFF72", // 3 = L
  "#F538FF", // 4 = J
  "#FF8E0D", // 5 = Z
  "#FFE138", // 6 = S
  "#3877FF", // 7 = I
];

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = colors[value];
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(arena, { x: 0, y: 0 });
  drawMatrix(player.matrix, player.pos);
}

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;
  if (dropCounter > dropInterval && !gameOver) {
    playerDrop();
  }
  draw();
  if (!gameOver) {
    requestAnimationFrame(update);
  }
}

const player = {
  pos: { x: 0, y: 0 },
  matrix: null,
};

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    playerMove(-1);
  } else if (event.key === "ArrowRight") {
    playerMove(1);
  } else if (event.key === "ArrowDown") {
    playerDrop();
  }
});

playerReset();
update();

function confirmGameOver() {
  document.getElementById("gameOverMsg").style.display = "none";
  document.getElementById("lovePopup").style.display = "flex";
}

function showGameOverPopup() {
  document.getElementById("gameOverPopup").style.display = "block";
}

function closeLovePopup() {
  document.getElementById("lovePopup").style.display = "none";
  restartGame();
}
function restartGame() {
  location.reload(); // ini akan me-restart game dengan muat ulang halaman
}
