
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

let styles = [];
let video = null;
let isTransferring = false;
let resultImg = null;

let currentModel = 0;

// p5.js function
function setup() {
  // p5.js function to create canvas
  createCanvas(320, 240).parent('canvasContainer');

  // create video capture from webcam
  video = createCapture(VIDEO);

  // hide feed from webcam
  video.hide();

  // The results image from the style transfer
  resultImg = createImg('');
  resultImg.hide();

  // The button to start and stop the transfer process
  select('#startStop').mousePressed(startStop);

  styles[0] = ml5.styleTransfer('models/00-afiche', video, modelLoaded);

  styles[1] = ml5.styleTransfer('models/01-arbol-de-la-vida', video, modelLoaded);

  styles[2] = ml5.styleTransfer('models/01-arbol-de-la-vida', video, modelLoaded);

  styles[3] = ml5.styleTransfer('models/01-arbol-de-la-vida', video, modelLoaded);

  styles[4] = ml5.styleTransfer('models/01-arbol-de-la-vida', video, modelLoaded);

  styles[5] = ml5.styleTransfer('models/01-arbol-de-la-vida', video, modelLoaded);

  styles[6] = ml5.styleTransfer('models/01-arbol-de-la-vida', video, modelLoaded);

  styles[7] = ml5.styleTransfer('models/01-arbol-de-la-vida', video, modelLoaded);

  styles[8] = ml5.styleTransfer('models/01-arbol-de-la-vida', video, modelLoaded);

  // Create a new Style Transfer method with a defined style.
  // We give the video as the second argument
 // style = ml5.styleTransfer('models/udnie', video, modelLoaded);

  // style = ml5.styleTransfer('models/02-contra-la-guerra', video, modelLoaded);
}

function draw(){
  // Switch between showing the raw camera or the style
  if (isTransferring) {
    // image(resultImg, 0, 0, 320, 240);
    image(resultImg, 0, 0, 320, 240);
  } else {
    // image(video, 0, 0, 320, 240);
      image(video, 0, 0, 320, 240);
  }
}

// A function to call when the model has been loaded.
function modelLoaded() {
  select('#status').html("Modelos cargados");
}

// Start and stop the transfer process
function startStop() {
  if (isTransferring) {
    select('#startStop').html('Start');
  } else {
    select('#startStop').html('Stop');
    // Make a transfer using the video
    styles[currentModel].transfer(gotResult);
  }
  isTransferring = !isTransferring;
}

function startStyle(style) {
  // if (isTransferring) {
    // select('#startStop').html('Start');
  // } else {
    // select('#startStop').html('Stop');
    // Make a transfer using the video
   styles[style].transfer(gotResult);
  // }
  // isTransferring = !isTransferring;
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
  }
}
