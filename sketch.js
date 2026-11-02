let webcam;
let previousButtons =[];
let mic;
let delay;
let fft;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mySound = loadSound('/v3/media/night.mp3');
  webcam = createCapture(VIDEO);
  webcam.size(640,480);
  webcam.hide(); //hide default vid element outside canvas
  fft = new p5.FFT();
  mic = new p5.AudioIn();
  mic.start();
  delay = new p5.Delay(0.3, 0.26);
  fft.setInput(mic);

   mic.disconnect();
  mic.connect(delay);
}

function draw(){ 
  background(20);
push();
  //door
  fill("#3D3D3D");
  stroke('black');
  strokeWeight(3);
  rect(10,100,260,700);
  //doorknob
  fill("#717171");
  strokeWeight(2);
  stroke("#A0A0A0");
  ellipse(45,500,30);

  //window
fill("#001250");
  stroke('black');
  strokeWeight(3);
  rect(1050,70,280,280);
  fill('black');
  noStroke();
  rect(1050,200,280,10);
  fill('black');
  noStroke();
  rect(1180,70,10,280);

  //moon
  fill("#FFE778");
  noStroke();
  ellipse(1250,130,70,70);
  fill("#001250");
  noStroke();
  ellipse(1270,130,50,50);


  //screen before the webcam turns on
  fill('black');
  noStroke();
  rect(300,70,690,545);
  //webcam
  image(webcam, 325,100);


pop();
//TV frame
  noFill();
  stroke('gray');
  strokeWeight(40);
  rect(300,70,690,545);
    //speaker
fill('black');
  stroke("#3D3D3D");
  strokeWeight(3);
  rect(1050,455,200,350);
  fill("#3D3D3D");
  stroke("#A0A0A0");
  ellipse(1150,550,100,100);
  fill("#3D3D3D");
  stroke("#A0A0A0");
  ellipse(1150,670,100,100);


  // make instructions when no controller connected
  let gp = navigator.getGamepads()[0];
  if(!gp){
    fill(0);
    stroke('white');
    strokeWeight(2.5);
    textSize(24);
    text("Peripheral required for TV's hesitant tolerance.", width/3.3, height/1.1);
    return;
  }
  
  handleButtons(gp);
}

function handleButtons(gp){
  gp.buttons.forEach((button,index) => {
    let currentlyPressed = button.pressed;
    let previouslyPressed = previousButtons[index] || false;
    
    //newly pressed
    if(currentlyPressed){
      switch(index){
          
          //A
        case 0:
          filter(THRESHOLD);
          //mySound.play();
         break;
          
          //B
        case 1:
          filter(POSTERIZE, 3);
          //mySound.play();
          break;
        
          //X
        case 2:
           filter(BLUR);
           //mySound.play();
          break;
          
          //Y
        case 3:
          filter(GRAY);
          //mySound.play();
          break;

          //LEFT SHOULDER
        case 4:
          image(webcam, 325,100,213,160); //top left
          image(webcam, 538,100,213,160); //top middle
          image(webcam, 751,100,213,160); //top right
          image(webcam, 325,260,213,160); //middle left
          image(webcam, 538,260,213,160); //middle
          image(webcam, 751,260,213,160); //middle right
          image(webcam, 325,420,213,160); //bottom left
          image(webcam, 538,420,213,160); //bottom middle
          image(webcam, 751,420,213,160); //bottom middle right
          break;
      }
      
    }
    previousButtons[index] = currentlyPressed;
    
  });
}
