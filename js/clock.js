var canvas = document.getElementById("clockCanvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
//var radiusW = canvas.width / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;

// Draw the initial clock
drawClock();

// Update the clock once a second
setInterval(drawClock, 1000);

// Update the clock of the browser window changes
window.addEventListener('resize', drawClock, false);

function drawClock() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (canvas.height < canvas.width) {
    radius = canvas.height / 2;
  } else {
    radius = canvas.width / 2;
  }

  radiusW = canvas.width / 2;
  radiusH = canvas.height / 2;
  ctx.translate(radiusW, radiusH);
  radius = radius * 0.90;

  updateClock();
}

function updateClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'palegoldenrod';
  ctx.fill();
  grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius * 0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = "bold " + radius * 0.20 + "px Courier New, Courier, monospace";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (num = 1; num < 13; num++) {
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.82);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.82);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  //hour
  hour = hour % 12;
  hour = (hour * Math.PI / 6) +
    (minute * Math.PI / (6 * 60)) +
    (second * Math.PI / (360 * 60));
  drawHand(ctx, hour, radius * 0.5, radius * 0.07, "black", radius);
  //minute
  minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
  drawHand(ctx, minute, radius * 0.7, radius * 0.06, "black", radius);
  // second
  second = (second * Math.PI / 30);
  drawHand(ctx, second, radius * 0.9, radius * 0.02, "red", radius);
}

function drawHand(ctx, pos, length, width, color, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.02, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.rotate(-pos);
}