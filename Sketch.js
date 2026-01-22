let selfImg, eyeBckImg, blinkImg, blink1Img, blink2Img;
let eyeX = 200, eyeY = 200;
let blinkState = 0; // 0: open, 1: half, 2: closed
let lastBlink = 0;
let blinkInterval = 4000; // ms between blinks
let blinkFrame = 0;

function preload() {
  selfImg = loadImage('images/Self.png');
  eyeBckImg = loadImage('images/Eyebck.png');
  blinkImg = loadImage('images/Blink.png');
  blink1Img = loadImage('images/Blink1.png');
  blink2Img = loadImage('images/Blink2.png');
}


function setup() {
  let cnv = createCanvas(600, 700); // You can change this size as needed
  cnv.parent('about-canvas-container');
  imageMode(CENTER);
}


function draw() {
  background(0,0,0,0);
  // Draw self portrait as background, filling canvas
  image(selfImg, width/2, height/2, width, height);


  // Eye positions and sizes as percentages of canvas (tweak these for your art)
  // Example: left eye is 37.5% from left, 46% from top, 11.5% width, 5.7% height
  let leftEyePct = {x: 0.4, y: 0.39, w: 0.115, h: 0.057};
  let rightEyePct = {x: 0.6, y: 0.39, w: 0.115, h: 0.057};

  // Calculate actual positions and sizes
  let leftEye = {
    x: width * leftEyePct.x,
    y: height * leftEyePct.y,
    w: width * leftEyePct.w,
    h: height * leftEyePct.h
  };
  let rightEye = {
    x: width * rightEyePct.x,
    y: height * rightEyePct.y,
    w: width * rightEyePct.w,
    h: height * rightEyePct.h
  };

  // Calculate eye movement offset (move Blink.png within the socket area, scaled)
  let maxOffset = leftEye.w * 0.22; // 22% of eye width
  let mouseNormL = createVector(mouseX - leftEye.x, mouseY - leftEye.y).limit(maxOffset);
  let mouseNormR = createVector(mouseX - rightEye.x, mouseY - rightEye.y).limit(maxOffset);


  // Draw masked eyes (Blink.png) so they only appear inside the eye socket
  drawMaskedEye(blinkImg, leftEye, mouseNormL);
  drawMaskedEye(blinkImg, rightEye, mouseNormR);

  // Blinking animation (eyelids on top)
  let now = millis();
  if (now - lastBlink > blinkInterval && blinkState === 0) {
    blinkState = 1;
    blinkFrame = 0;
  }
  if (blinkState === 1) {
    drawMaskedEye(blink1Img, leftEye, mouseNormL);
    drawMaskedEye(blink1Img, rightEye, mouseNormR);
    blinkFrame++;
    if (blinkFrame > 10) {
      blinkState = 2;
      blinkFrame = 0;
    }
  } else if (blinkState === 2) {
    drawMaskedEye(blink2Img, leftEye, mouseNormL);
    drawMaskedEye(blink2Img, rightEye, mouseNormR);
    blinkFrame++;
    if (blinkFrame > 10) {
      blinkState = 0;
      lastBlink = now;
    }
  }

}

// Helper to draw an eye image masked to an ellipse (eye socket)
function drawMaskedEye(img, eye, offset) {
  push();
  translate(eye.x, eye.y);
  // Create mask
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.ellipse(0, 0, eye.w, eye.h);
  drawingContext.clip();
  // Draw the eye image centered, then apply offset
  image(img, offset.x, offset.y, eye.w, eye.h);
  drawingContext.restore();
  pop();
}