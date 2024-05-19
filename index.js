document.addEventListener("DOMContentLoaded", () => {
  const circle = document.getElementById("circle");

  const a = 0.005;
  const startX = 500;

  let moveReq;
  let blowReq;

  function moveCircle() {
    let x = parseFloat(circle.getAttribute("cx")) + 0.5;
    let y = 400 - a * (x - startX) ** 2;

    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    drawTail();

    if (x > 900) return;

    moveReq = requestAnimationFrame(moveCircle);
  }

  function blowCircle() {
    let r = parseFloat(circle.getAttribute("r")) + 0.3;
    circle.setAttribute("r", r);

    blowReq = requestAnimationFrame(blowCircle);
  }
  function popCircle() {
    cancelAnimationFrame(moveReq);
    cancelAnimationFrame(blowReq);
  }

  circle.addEventListener("click", popCircle);

  moveCircle();
  blowCircle();
});

function drawTail() {
  const circle = document.getElementById("circle");

  // invisible assistant dots for creating tail
  const dot_co = document.getElementById("dot-co"); // tail point
  const dot_cr = document.getElementById("dot-cr"); // right contact to the circle
  const dot_cl = document.getElementById("dot-cl"); // left contact to the circle

  // two curved lines to be a tail
  const tail_l = document.getElementById("tail-l");
  const tail_r = document.getElementById("tail-r");

  // the circle's cennter coordinates and radius
  const circleX = parseFloat(circle.getAttribute("cx"));
  const circleY = parseFloat(circle.getAttribute("cy"));
  const circleR = parseFloat(circle.getAttribute("r"));

  // calculate invisible dot positions
  const dot_co_x = parseFloat(dot_co.getAttribute("cx"));
  const dot_co_y = parseFloat(dot_co.getAttribute("cy"));
  const dot_cr_x = circleX + circleR * Math.cos(Math.PI / 3);
  const dot_cr_y = circleY + circleR * Math.sin(Math.PI / 3);
  const dot_cl_x = circleX - circleR;
  const dot_cl_y = circleY;

  // set dot positions
  dot_cr.setAttribute("cx", dot_cr_x);
  dot_cr.setAttribute("cy", dot_cr_y);
  dot_cl.setAttribute("cx", dot_cl_x);
  dot_cl.setAttribute("cy", dot_cl_y);

  // control point for left curved line (tail_l)
  // const controlLX = (dot_cl_x + dot_co_x) / 2;
  const controlLX = (dot_cl_x + dot_co_x) / 2;
  const controlLY = dot_cl_y + 130;
  // control point for right curved line (tail_r)
  const controlRX = (dot_cr_x + dot_co_x) / 2;
  const controlRY = dot_cr_y + 80;

  // Construct the path string for the curved line and assistant straight line (CL - CR)
  const pathStr_l = `M ${dot_cl_x},${dot_cl_y} Q ${controlLX},${controlLY} ${dot_co_x},${dot_co_y}`;
  const pathStr_r = `M ${dot_co_x},${dot_co_y} Q ${controlRX},${controlRY} ${dot_cr_x},${dot_cr_y}`;
  const pathStr_assist = `M ${dot_cr_x},${dot_cr_y} L ${dot_cl_x},${dot_cl_y}`;

  // Set the path string to the curved line
  tail_l.setAttribute("d", pathStr_l);
  tail_r.setAttribute("d", pathStr_r);
}

// // Get the circle and dot elements
// const circle = document.getElementById("myCircle");
// const dot_o = document.getElementById("dot0");
// const dot_cr = document.getElementById("dot1");
// const dot_cl = document.getElementById("dot2");
// const curvedLine1 = document.getElementById("curvedLine1");
// const curvedLine2 = document.getElementById("curvedLine2");
// const straightLine = document.getElementById("straightLine");
// const filledShape = document.getElementById("filledShape");

// // Get the circle's center coordinates and radius
// const circleX = parseFloat(circle.getAttribute("cx"));
// const circleY = parseFloat(circle.getAttribute("cy"));
// const circleRadius = parseFloat(circle.getAttribute("r"));

// // Calculate dot positions
// const dot_cr_x = circleX + circleRadius * Math.cos(Math.PI / 3);
// const dot_cr_y = circleY + circleRadius * Math.sin(Math.PI / 3);
// const dot_cl_x = circleX - circleRadius;
// const dot_cl_y = circleY;

// // Set dot positions
// dot_cr.setAttribute("cx", dot_cr_x);
// dot_cr.setAttribute("cy", dot_cr_y);
// dot_cl.setAttribute("cx", dot_cl_x);
// dot_cl.setAttribute("cy", dot_cl_y);

// // Get the coordinates of the dots
// const dot_co_x = parseFloat(dot_o.getAttribute("cx"));
// const dot_co_y = parseFloat(dot_o.getAttribute("cy"));

// // Calculate control point for curved line
// const controlLX = (dot_cl_x + dot_co_x) / 2;
// const controlLY = dot_cl_y + 130;

// // Construct the path string for the curved line
// const pathString = `M ${dot_cl_x},${dot_cl_y} Q ${controlLX},${controlLY} ${dot_co_x},${dot_co_y}`;

// // Set the path string to the curved line
// curvedLine1.setAttribute("d", pathString);

// /////////

// // Calculate control point for curved line
// const controlRX = (dot_cr_x + dot_co_x) / 2;
// const controlRY = dot_cr_y + 80;

// // Construct the path string for the curved line
// // const pathString1 = `M ${dot_cr_x},${dot_cr_y} Q ${controlRX},${controlRY} ${dot_co_x},${dot_co_y}`;
// const pathString1 = `M ${dot_co_x},${dot_co_y} Q ${controlRX},${controlRY} ${dot_cr_x},${dot_cr_y}`;

// // Set the path string to the curved line
// curvedLine2.setAttribute("d", pathString1);

// // set the straight line
// const pathString2 = `M ${dot_cr_x},${dot_cr_y} L ${dot_cl_x},${dot_cl_y}`;
// straightLine.setAttribute("d", pathString2);

// /////
// const compoundPathString = `M ${dot_co_x}, ${dot_co_y} Q ${controlRX},${controlRY} ${dot_cr_x},${dot_cr_y} L ${dot_cl_x},${dot_cl_y} Q ${controlLX},${controlLY} ${dot_co_x},${dot_co_y}`;
// filledShape.setAttribute("d", compoundPathString);
