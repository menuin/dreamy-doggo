let moveReq;
let blowReq;
let freeReq; // free tail animation

let frameCount = 0; // used for calculating control point

let controlRYvar = 20;

document.addEventListener("DOMContentLoaded", () => {
  drawCircle();
});

function drawCircle() {
  initSetting();

  const svg = document.getElementById("svg");
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );

  circle.setAttribute("id", "circle");
  circle.setAttribute("cx", "500"); // initial center coordinate x
  circle.setAttribute("cy", "400"); // inital center coordinate y
  circle.setAttribute("r", "0"); // initial radius
  // circle.setAttribute("fill", "transparent");
  circle.setAttribute("fill", "blue");
  // circle.setAttribute("stroke", "black");

  svg.appendChild(circle);

  circle.addEventListener("click", popCircle);

  moveCircle();
  blowCircle();
}
function initSetting() {
  controlRYvar = 20;

  const dot_co = document.getElementById("dot-co"); // tail point
  dot_co.setAttribute("cx", 500);
  dot_co.setAttribute("cy", 400);
}

function moveCircle() {
  const circle = document.getElementById("circle");

  frameCount++;

  const a = 0.005;
  const startX = 500;

  let x = parseFloat(circle.getAttribute("cx")) + 0.5;
  let y = 400 - a * (x - startX) ** 2;

  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);

  drawTail(frameCount);

  if (x > 630) {
    cancelAnimationFrame(blowReq);
    freeCircle();
  }

  moveReq = requestAnimationFrame(moveCircle);
}

function blowCircle() {
  const circle = document.getElementById("circle");

  let r = parseFloat(circle.getAttribute("r")) + 0.3;
  circle.setAttribute("r", r);

  blowReq = requestAnimationFrame(blowCircle);
}

function drawTail(frameCount) {
  const circle = document.getElementById("circle");

  // invisible assistant dots for creating tail
  const dot_co = document.getElementById("dot-co"); // tail point
  const dot_cr = document.getElementById("dot-cr"); // right contact to the circle
  const dot_cl = document.getElementById("dot-cl"); // left contact to the circle

  // two curved lines to be a tail
  const tail_l = document.getElementById("tail-l");
  const tail_r = document.getElementById("tail-r");
  const tail_assist = document.getElementById("tail-assist");

  // the circle's center coordinates and radius
  const circleX = parseFloat(circle.getAttribute("cx"));
  const circleY = parseFloat(circle.getAttribute("cy"));
  const circleR = parseFloat(circle.getAttribute("r"));

  // calculate invisible dot positions
  const dot_co_x = parseFloat(dot_co.getAttribute("cx"));
  const dot_co_y = parseFloat(dot_co.getAttribute("cy"));
  const dot_cr_x = circleX + circleR * Math.cos(Math.PI / 3);
  const dot_cr_y = circleY + circleR * Math.sin(Math.PI / 3) - 0.5;
  // const dot_cl_x = circleX - circleR;
  const dot_cl_x = circleX - circleR * Math.cos((Math.PI / 180) * 18);
  // const dot_cl_y = circleY;
  const dot_cl_y = circleY - circleR * Math.sin((Math.PI / 180) * 15);

  // set dot positions
  dot_cr.setAttribute("cx", dot_cr_x);
  dot_cr.setAttribute("cy", dot_cr_y);
  dot_cl.setAttribute("cx", dot_cl_x);
  dot_cl.setAttribute("cy", dot_cl_y);

  // control point for left curved line (tail_l)
  const controlLX = (dot_cl_x + dot_co_x) / 2;
  // const controlLY = dot_cl_y + 130;
  const controlLY = dot_cl_y + 30 * 0.01 * frameCount;
  // control point for right curved line (tail_r)
  const controlRX = (dot_cr_x + dot_co_x) / 2;
  const controlRY = dot_cr_y + controlRYvar * 0.01 * frameCount;

  // Construct the path string for the curved line and assistant straight line (CL - CR)
  const pathStr_l = `M ${dot_cl_x},${dot_cl_y} Q ${controlLX},${controlLY} ${dot_co_x},${dot_co_y}`;
  const pathStr_r = `M ${dot_co_x},${dot_co_y} Q ${controlRX},${controlRY} ${dot_cr_x},${dot_cr_y}`;
  const pathStr_assist = `M ${dot_cr_x},${dot_cr_y} L ${dot_cl_x},${dot_cl_y}`;

  // Set the path string to the curved line
  tail_l.setAttribute("d", pathStr_l);
  tail_r.setAttribute("d", pathStr_r);
  tail_assist.setAttribute("d", pathStr_assist);

  const tail_filled = document.getElementById("tail-filled");
  const compoundPathString = `M ${dot_co_x}, ${dot_co_y} Q ${controlRX},${controlRY} ${dot_cr_x},${dot_cr_y} L ${dot_cl_x},${dot_cl_y} Q ${controlLX},${controlLY} ${dot_co_x},${dot_co_y}`;
  tail_filled.setAttribute("d", compoundPathString);
}

function freeCircle() {
  // free tail animation
  const circle = document.getElementById("circle");
  const dot_co = document.getElementById("dot-co"); // tail point
  const dot_cr = document.getElementById("dot-cr"); // right contact to the circle
  const dot_cl = document.getElementById("dot-cl"); // left contact to the circle

  const dest_x =
    (parseFloat(dot_cr.getAttribute("cx")) +
      parseFloat(dot_cl.getAttribute("cx"))) /
    2;
  const dest_y =
    (parseFloat(dot_cr.getAttribute("cy")) +
      parseFloat(dot_cl.getAttribute("cy"))) /
    2;

  const next_tail_x = parseFloat(dot_co.getAttribute("cx")) + 10;
  const next_tail_y = parseFloat(dot_co.getAttribute("cy")) - 10;
  controlRYvar -= 1;

  dot_co.setAttribute("cx", next_tail_x);
  dot_co.setAttribute("cy", next_tail_y);

  if (next_tail_x > dest_x || next_tail_y < dest_y) {
    removeTail();
    return;
  }
}

function popCircle() {
  const circle = document.getElementById("circle");
  circle.remove();

  // remove tail
  removeTail();

  // reset frame count
  frameCount = 0;

  setTimeout(() => {
    drawCircle();
  }, 800); // bubble generated after timeout

  cancelAnimationFrame(moveReq);
}

function removeTail() {
  const tail_l = document.getElementById("tail-l");
  const tail_r = document.getElementById("tail-r");
  const tail_assist = document.getElementById("tail-assist");
  const tail_filled = document.getElementById("tail-filled");

  tail_l.setAttribute("d", "");
  tail_r.setAttribute("d", "");
  tail_assist.setAttribute("d", "");
  tail_filled.setAttribute("d", "");
}
