const colors = ["#2f3136", "#2a2b30", "#7d8187", "#1e1f23", "#5f6a89"];
const backgroundColor = "#000";
const width = window.innerWidth;
const height = window.innerHeight;
const totalFrames = 1000;
let frameCount = 0;
let recording = false;
let recordingStarted = false;
let frameDelta = 0;
let m;
let b;
let particles = [];

let c01 = (g) => {
  return constrain(g, 0, 1);
};

let ease = (p) => {
  p = c01(p);
  return 3 * p * p - 2 * p * p * p;
};

function easeInQuint(x) {
  return x * x * x * x * x;
}

function easeOutQuart(x) {
  return 1 - pow(1 - x, 4);
}

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - pow(2, -10 * x);
}

function setup() {
  canvas = createCanvas(width, height);
  noiseSeed(20);
  let bg = color(backgroundColor);
  background(bg);
}

function draw() {
  frameCount += 1;
  frameDelta = (2 * Math.PI * (frameCount % totalFrames)) / totalFrames;

  colorMode(RGB);
  blendMode(BLEND);

  let bg = color(backgroundColor);
  //bg.setAlpha(10);
  background(bg);

  let w = 10;
  let h = 10;
  let space = 50;
  let dots = 30;

  //translate((-w * space) / 2, (-h * space) / 2);
  translate((window.innerWidth / 2) - ((w * space) / 2), (window.innerHeight / 2) - ((h * space) / 2));
  
  blendMode(ADD);
  
  const delta = frameDelta * 10;
  
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      
      for (let l = 0; l < dots; l++) {
        push();

        let n = 10;
        let x1 = i * space;
        let y1 = j * space;

        let x = x1 - sin(delta + (l / 10) + j) * n;
        let y = y1 + cos(delta + (l / 10) + i) * n;
1
        translate(x, y, 0);

        scale((l + 1) / (dots + 1));

        colorMode(HSB);

        let pct = 0.5 + Math.sin((delta / (i + 1) * (j + 1))) + (l / dots) * 0.5;
        let hue = map(pct, 0, 1, 0, 160);
        let c = color(hue, 255, 255, 255);
        fill(c);
        noStroke();

        circle(0, 0, 20);

        pop();
      }
    }
  }

  //checkForRecording();
}

function setGradient(s, c1, c2) {
  // noprotect
  noFill();
  for (var y = 0; y < s.height; y++) {
    var inter = map(y, 0, s.height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    s.stroke(c);
    s.line(0, y, s.width, y);
  }
}

function getPolar(x, y, r, a) {
  // Get as radians
  var fa = a * (Math.PI / 180);

  // Convert coordinates
  var dx = r * Math.cos(fa);
  var dy = r * Math.sin(fa);

  // Add origin values (not necessary)
  var fx = x + dx;
  var fy = y + dy;

  return [fx, fy];
}

