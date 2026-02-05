// Renzo Baird Portfolio - Interactive Sketch
let selfImg, eyeBckImg, blinkImg, blink1Img, blink2Img;
let blinkState = 0; // 0: open, 1: half, 2: closed
let lastBlink = 0;
let blinkInterval = 4000; // ms between blinks
let blinkFrame = 0;

// Original aspect ratio: 600x700 (width:height = 6:7)
const ASPECT_RATIO = 6 / 7;
// Image scale factor (0.9 = 90% of original size)
const IMG_SCALE = 0.9;

function preload() {
  selfImg = loadImage('images/Self.png');
  eyeBckImg = loadImage('images/Eyebck.png');
  blinkImg = loadImage('images/Blink.png');
  blink1Img = loadImage('images/Blink1.png');
  blink2Img = loadImage('images/Blink2.png');
}

function getCanvasSize() {
  // Use viewport height for sizing - fill most of viewport
  let availableHeight = window.innerHeight * 0.85;
  let availableWidth = window.innerWidth * 0.9;
  
  // Calculate size while maintaining aspect ratio (6:7)
  // Try fitting by height first
  let h = availableHeight;
  let w = h * ASPECT_RATIO;
  
  // If too wide, fit by width instead
  if (w > availableWidth) {
    w = availableWidth;
    h = w / ASPECT_RATIO;
  }
  
  return { width: w, height: h };
}

function setup() {
  pixelDensity(window.devicePixelRatio || 2);
  let size = getCanvasSize();
  let cnv = createCanvas(size.width, size.height);
  cnv.parent('about-canvas-container');
  imageMode(CENTER);
}

function windowResized() {
  let size = getCanvasSize();
  resizeCanvas(size.width, size.height);
}


function draw() {
  clear();
  // Draw images at their natural size to avoid blur from scaling
  let imgW = width;
  let imgH = height;
  // Position images so head is visible and body fades at bottom
  let imgY = height / 2;
  
  // Draw self portrait anchored at bottom
  image(selfImg, width/2, imgY, imgW, imgH);
  // Layering: Eyebck.png, Blink.png
  image(eyeBckImg, width/2, imgY, imgW, imgH);
  // Subtle eye movement based on mouse position
  let maxOffset = 6; // Maximum movement in pixels (very subtle)
  let offsetX = map(mouseX, 0, width, -maxOffset, maxOffset);
  let offsetY = map(mouseY, 0, height, -maxOffset, maxOffset);
  image(blinkImg, width/2 + offsetX, imgY + offsetY, imgW, imgH);

  // Animate blink using Blink1 and Blink2
  let now = millis();
  if (now - lastBlink > blinkInterval && blinkState === 0) {
    blinkState = 1;
    blinkFrame = 0;
  }
  if (blinkState === 1) {
    image(blink1Img, width/2, imgY, imgW, imgH);
    blinkFrame++;;
    if (blinkFrame > 7) { // half-blink for 7 frames (medium)
      blinkState = 2;
      blinkFrame = 0;
    }
  } else if (blinkState === 2) {
    image(blink2Img, width/2, imgY, imgW, imgH);
    blinkFrame++;;
    if (blinkFrame > 7) { // closed for 7 frames (medium)
      blinkState = 3;
      blinkFrame = 0;
    }
  } else if (blinkState === 3) {
    image(blink1Img, width/2, imgY, imgW, imgH);
    blinkFrame++;;
    if (blinkFrame > 7) { // half-blink for 7 frames (medium)
      blinkState = 0;
      lastBlink = now;
    }
  }
}

