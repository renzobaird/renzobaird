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
  // Draw all blink images at the same size and position for alignment
  image(blinkImg, width/2, height/2, width, height);
  image(blink1Img, width/2, height/2, width, height);
  image(blink2Img, width/2, height/2, width, height);
}

