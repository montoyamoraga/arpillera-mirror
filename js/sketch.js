
// variables for images
let imagesPrefix = "images/";
let imagesSuffix = ".jpg";

let imagesOriginalNames = ["00-afiche", "01-arbol-de-la-vida",
                  "02-contra-la-guerra", "03-cristo-en-bikini",
                  "04-el-circo", "05-el-hombre",
                  "06-la-cantante-calva", "07-la-cueca",
                  "08-thiago-de-mello"];

let imagesNames = imagesOriginalNames.slice(0);

// add prefix and suffix to image names
for (let i = 0; i < imagesNames.length; i++) {
  imagesNames[i] = imagesPrefix + imagesNames[i] + imagesSuffix;
}

// variables for styles
let stylesPrefix = "models/";
let stylesNames = imagesOriginalNames.slice(0);

// add prefix  to model names
for (let i = 0; i < stylesNames.length; i++) {
  stylesNames[i] = stylesPrefix + stylesNames[i];
}

// variable for holding styles
let styles = [];

let video = null;
let isTransferring = false;
let resultImg = null;

let currentModel = 0;

// variable for storing playground div element
let playgroundDiv = null;

// array for storing images
let images = [];

// p5.js function
function setup() {

  // p5.js function to create canvas
  let canvas = createCanvas(640, 480).parent('canvasContainer');

  // center canvas
  let x = 5 * (windowWidth - width) / 10;
  let y = 6 * (windowHeight - height) / 10;
  canvas.position(x, y);

  // create video capture from webcam
  video = createCapture(VIDEO);

  // hide feed from webcam
  video.hide();

  // The results image from the style transfer
  resultImg = createImg('');
  resultImg.hide();

  // load models
  for (let i = 0; i< stylesNames.length; i++) {
    styles.push(ml5.styleTransfer(stylesNames[i], video, modelLoaded));
  }

  // retrieve all images
  for (let i = 0; i < imagesNames.length; i++) {
    images.push(document.getElementById("img" + i));
  }

  playgroundDiv = document.getElementById("playgroundDiv");

}

function draw(){
  // Switch between showing the raw camera or the style
  if (isTransferring) {
    image(resultImg, 0, 0, 640, 480);
  } else {
    image(video, 0, 0, 640, 480);
  }
}

// A function to call when the model has been loaded.
function modelLoaded() {
  // select('#status').html("Models loaded!");
  console.log("models loaded!");
  startStop();
}

// start and stop the transfer process
function startStop() {
  if (isTransferring) {
    // select('#startStop').html('Start');
  } else {
    // select('#startStop').html('Stop');
    // Make a transfer using the video
    styles[currentModel].transfer(gotResult);
  }
  isTransferring = !isTransferring;
}

function startStyle(style) {
   styles[style].transfer(gotResult);
}

// When we get the results, update the result image src
function gotResult(err, img) {
  resultImg.attribute('src', img.src);
  if (isTransferring) {
    styles[currentModel].transfer(gotResult);
  }
}

function keyPressed() {
  // substract 48 to retrieve number
  let numberKey = keyCode - 48;
  // check that key is a number
  if (numberKey >= 1 && numberKey <=9) {
    // update currentModel
    currentModel = numberKey - 1;

    let auxText = "background-image:url(images/" + imagesOriginalNames[currentModel] + ".jpg)"

    playgroundDiv.style = auxText;
  }
}
