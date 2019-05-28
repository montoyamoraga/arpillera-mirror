
// variables for images
let imagesPrefix = "images/";
let imagesSuffix = ".jpg";
let imagesNames = ["00-afiche", "01-arbol-de-la-vida",
                  "02-contra-la-guerra", "03-cristo-en-bikini",
                  "04-el-circo", "05-el-hombre",
                  "06-la-cantante-calva", "07-la-cueca"];

// add prefix and suffix to image names
for (let i = 0; i < imagesNames.length; i++) {
  imagesNames[i] = imagesPrefix + imagesNames[i] + imagesSuffix;
}

// variables for styles
let stylesPrefix = "models/";
let stylesNames = ["00-afiche", "01-arbol-de-la-vida",
                  "02-contra-la-guerra", "03-cristo-en-bikini",
                  "04-el-circo", "05-el-hombre",
                  "06-la-cantante-calva", "07-la-cueca"];

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

// array for storing images
let images = [];

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

  // load models
  for (let i = 0; i< stylesNames.length; i++) {
    styles.push(ml5.styleTransfer(stylesNames[i], video, modelLoaded));
  }

  // retrieve all images
  for (let i = 0; i < imagesNames.length; i++) {
    images.push(document.getElementById("img" + i));
  }

  // hide all pictures except for 0th:
  for (let i = 1; i < images.length; i++) {
    images[i].hidden = true;
  }

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
  select('#status').html("Models loaded!");
}

// start and stop the transfer process
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
  if (numberKey >= 1 && numberKey <=8) {
    // update currentModel
    currentModel = numberKey - 1;
    //update image, hide all and only make one visible
    for (let i = 0; i < images.length; i++) {
      images[i].hidden = true;
    }
    images[currentModel].hidden = false;
  }
  // TODO: retrieve spacebar to toggle style transfer
  if (keyCode == " ") {
    console.log("yo space");
  }
}
