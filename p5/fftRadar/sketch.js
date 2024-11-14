let x = 0;
let y = 0;
let theta = 0; clockSpeed = 0.007; amplitude = 3; 
let sample;
let bins = 16;
let fft, frequencySpectrum, r;
// let ti = 12

function preload(){
  sample = loadSound('assets/200hzWAV.wav');
}

function setup() {
  createCanvas(500, 500);
  // sample.play(0.1);
  // sample.volume(0.01)
  
  mic = new p5.AudioIn();
  mic.start();
  
  fft = new p5.FFT(0.8, bins);
  fft.setInput(mic);
}


function frequencyFromFFTIndex(binIndex, sound=sample){
  let nyqistFreq = sampleRate(sound)/2;
  let targetMaxFrequency = binIndex * (nyqistFreq/bins);
  
  return targetMaxFrequency
}

function polarSine(frequency, amplitude, innerRadius=100, c = color("rgb(0,255,0)")){
  push();
  stroke(c);
  strokeWeight(1.5);
  r = sin(frequency*theta) * amplitude + innerRadius;
  
  x = width/2 + cos(theta) * r;
  y = height/2 + sin(theta) * r;
  
  point(x,y);
  pop();
}


function draw() {
  theta += clockSpeed;
  background(0, 0, 0, 5);
  frequencySpectrum = fft.analyze();
  
  for(let i = 0; i < frequencySpectrum.length; i++){
    polarSine(
    map(frequencyFromFFTIndex(i), 0, sampleRate(sample)/2, 0, 50),
    map(frequencySpectrum[i], 0, 255, 0, 100),
    map(frequencyFromFFTIndex(i), 0, sampleRate(sample)/2, 100, 250),
    // map(frequencySpectrum[i], 0, 16, 0, 255)
    )
  }
  
  // polarSine(
  // map(frequencyFromFFTIndex(ti), 0, 24000, 0, 50),
  // map(frequencySpectrum[ti], 0, 255, 0, 100)
  // )

//   polarSine(10, 30)
  
}

// make polar sine a class and instantiate it in setup with a randomised theta value
// make it stop once the song ends

// p5 FFT produces frequencies in array in bins from 0 to nyqist freq.
// 48khz Sample rate so nyqist = 24khz or 24000 hz. 
// 0-24000 frequency range means 1 bin freq range = nyqist/total bins.
// max freq at a given index = (approximately) index * nyqist/total bins.
