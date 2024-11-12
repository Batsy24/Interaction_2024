let canvas;
let mic;
let vmin;

function windowResized(){
   resizeCanvas(windowWidth, windowHeight);
}

function findVmin(){
    if(windowWidth > windowHeight){
         vmin = windowHeight;
    }
    else{
         vmin = windowWidth;
    }

    return vmin;
}

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
  }
  
  function draw() {
    vmin = findVmin();
    background(0);
  }

  // display image using html css, add black on top with p5 and create mask for transparency