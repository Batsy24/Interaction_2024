let screenSize = [900, 700];
let size = 10;// DO NOT CHANGE for now. fix later.
let noiseScale= 0.1;
let theta = 0;
let resolution = 50
; //keep higher than 10 until you fix theta or it wont rotate fast enough

let textureOutput = true;
let wireFrame = false;

function setup() {
  createCanvas(screenSize[0], screenSize[1], WEBGL);
  stroke(0);
  strokeWeight(0.5);
  // noStroke();
  
}


function preload(){
  font = loadFont('assets/mc.ttf')
//   grass = loadImage('Textures/grass.png');
//   water = loadImage('Textures/water.png');
//   sand = loadImage('Textures/sand.png');
//   stone = loadImage('Textures/stone.png');
}

function draw() {
  angleMode(DEGREES);
  background(50);
  
  let c = 255;
  push();
  fill(75)
  textFont(font)
  textSize(18)
  text('press SHIFT to enable or disable wireframe mode', -430, -300)
  text('press ENTER to enable or disable textures', -430, -260)
  text('reload sketch to generate new world', -430, -220)
  textSize(12)
  text('change resolution and other settings directly'+ '\n'+'through first 10 lines of script', 100, -305)
  pop();
  
   
  rotateX(-25);
  rotateY(theta)
  for (let y = 0; y < resolution; y += 1) {
    for (let x = 0; x < resolution; x += 1) {
      
      // Scale input coordinates.
      let nx = noiseScale * x;
      let ny = noiseScale * y;
      
      // Compute noise value.
      // let c = 255 * noise(nx, ny);
      // Render.
      // fill(c);
      noiseVals = map(noise(nx,ny), 0, 1, 0, size)
      rectMode(CENTER)
      // rect(size/2 + x*size - width/2, size/2+ y*size - height/2, noiseVals);
      
      //render voxels
      push();
      // colors are hardcoded. check noise distribution and use percentages instead. textures dont look v good at this scale s
      
      if (textureOutput){
        if (size*noiseVals >= 60){
        c = color(58, 179, 218, 155) // water
        // texture(water);
        }
      else if(noiseVals*size >= 55 && noiseVals*size <= 60){
        c = color(236,204,162) // sand
        // texture(sand);
        }
      else if(size*noiseVals >= 25){
        c = color(74,111,40) // grass
        // texture(grass);
        }
      else if(size*noiseVals >0 && noiseVals*size<25){
        c = color(150)
        // texture(stone)
        }
      }
      
      fill(c)
      
      if(wireFrame){
        noFill()
      }
      translate(x*size - resolution*size/2, 
                floor(noiseVals)*size , 
                y*size - resolution*size/2)
      
      box(size)
      theta+=0.0005
      pop();
    }
  }
}


function keyPressed(){
  if(keyCode === ENTER){
    if(textureOutput == true){
      textureOutput = false;
    }
    else{
      textureOutput = true;
    }
  }
  
  if(keyCode === SHIFT){
    if (wireFrame == false){
      wireFrame = true;
    }
    else{
      wireFrame = false;
    }
  }
}


// ISSUES
// make it so that theres fillers under all blocks to create terrain thats not hollow.
// add slidersto control values
// make colors correspond to percentages not hardcoded values
// why is it flashing when rotating???????
// fix the size-theta issue

