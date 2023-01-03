
const canvas = document.querySelector("canvas");

// 캔버스에 그림을 그릴때 사용하는 것
const ctx = canvas.getContext("2d");

// width와 height는 canvas의 품질을 높이기 위하여 js에서 수정
canvas.width = 800;
canvas.height = 800;

ctx.fillRect(210, 200, 15, 100);
ctx.fillRect(350, 200, 15, 100);
ctx.fillRect(260, 200, 60, 200);

ctx.arc(290, 150, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(270, 150, 8, Math.PI, 2 * Math.PI);
ctx.arc(300, 150, 8, Math.PI, 2 * Math.PI);
ctx.fill();

