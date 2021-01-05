let img;
let myFont;

function preload() {
  myFont = loadFont('Staatliches-Regular.ttf');
}

function setup() {
  background(220);
  posterSpaceH = 840;
  posterSpaceW = 594;
  createCanvas(594, 840);
  textInput = createInput("Primary text");
  textInput2 = createInput("Secondary text");
  // createButton('Create');
  createButton('Add text and Generate').mousePressed(generate);
  pg = createGraphics(posterSpaceW, posterSpaceH);
}



function generate() {
  const model = new rw.HostedModel({
    url: "https://attngan-swift.hosted-models.runwayml.cloud/v1/",
    token: "hvQ16i5t5LM7JrM1AGf8+Q==",
  });
  //// You can use the info() method to see what type of input object the model expects
  // model.info().then(info => console.log(info));
  const inputs = {
    "caption": textInput.value(),
  };
  model.query(inputs).then(outputs => {
    const {
      result
    } = outputs;
    // use the outputs in your project
    // console.log(result);
    img = createImg(result, "your headline here");
    img.hide();
  });


}

function draw() {
  if (img) {
    imageMode(CENTER);
    image(img, width / 2, height / 2, posterSpaceW, posterSpaceH);
  }
  textFont(myFont);
  textSize(120);
  textLeading(100)
  fill(255, 255, 255);
  text(textInput.value(), 20, 44, 564, 800);
  textSize(44);
  textLeading(40)
  fill(255, 255, 255);
  text(textInput2.value(), 20, 700, 564, 800)
}

function keyPressed() {
  if (keyCode === RETURN) {
    generate();
  }
}

// function keyTyped() {
//   if (key === "s") {
//     saveFrames("posterGAN", "png", 1, 1);
//   }
// }