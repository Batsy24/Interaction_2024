const playerColor = "#cfcdb7";
const bgColor = "#c1ba9e";
let gameMode = false;
let attack = false;
let bullets = [];
let obstacleA = [];
let canvasSize = [400, 400];
let bossHp;

let totalPts = 2;
let spin = (Math.PI * 2) / totalPts;
let spinSpeed = 0.03;

// check if two rects collide. pygame has this inbuilt its crazy that p5 doesnt
function collideRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  let colliderPos = createVector(x1, y1);
  let obstaclePos = createVector(x2, y2);
  let collided = null;

  push();
  rectMode(CENTER);
  if (
    x1 - w1 / 2 < x2 + w2 / 2 &&
    x1 + w1 / 2 > x2 - w2 / 2 &&
    y1 - h1 / 2 < y2 + h2 / 2 &&
    y1 + h1 / 2 > y2 - h2 / 2
  ) {
    collided = true;
  } else {
    collided = false;
  }
  pop();

  return collided;
}

function spinner(spin, radius) {
  let x = boss.posX + cos(spin) * radius;
  let y = boss.posY + sin(spin) * radius;

  let pos = createVector(x, y);

  return pos;
}

function obstacleRandomiser(
  obstacleList,
  pos,
  obstacleObjects = ProjectileA,
  shootSpeed = 6
) {
  if (frameCount % 6 == 0) {
    if (attack == true) {
      obstacleA.push(new ProjectileA(pos));
    }
  }

  for (let n = 0; n < obstacleList.length; n++) {
    obstacleList[n].shoot();
  }
}

function setup() {
  createCanvas(canvasSize[0], canvasSize[1]);
  fullscreen();
  bossHp = new healthBar(100, 5, 200, 80, boss.hp, boss);
}

function draw() {
  spin += spinSpeed;
  // console.log(mouseX, mouseY);
  background(bgColor);

    if(player.pX > 200 && boss.eX +boss.pX <= 212){
        boss.eX += 0.3
      }

  //   else if(player.pX < 200 && boss.posX + boss.eX >= 188){
  //     if(boss.posX+boss.eX >= 188){
  //       boss.eX -= 0.3
  //   }

  if (gameMode == false) {
    // be not afraid text
    push();
    textAlign(CENTER);
    textFont("courier");
    textSize(16);
    fill("#F0E9D1");
    text("[pr3ss sp4ce. be n0t afraid]", 200, 60);
    pop();
  }

  boss.draw();

  if (keyIsDown(32)) {
    gameMode = true;
    attack = true;
  }

  if (gameMode == true) {
    boss.innerAngle += 1 * (Math.PI / 180);
    boss.outerAngle -= 0.7 * (Math.PI / 180);
    bossHp.draw();
    player.draw();
    player.move();

    push();
    fill("#f87f1e");

    // please do this with a for loop instead of this
    let posA = spinner(spin, 70);
    let posB = spinner(spin + PI / totalPts, 70);
    let posC = spinner(spin + (PI * 2) / totalPts, 70);
    let posD = spinner(spin + (PI * 3) / totalPts, 70);
    // circle(posA.x, posA.y, 20) // uncomment to visualise shooter

    obstacleRandomiser(obstacleA, posA);
    obstacleRandomiser(obstacleA, posB);
    obstacleRandomiser(obstacleA, posC);
    obstacleRandomiser(obstacleA, posD);

    pop();
  }
}

class biblicallyAccurateAditya {
  constructor(posX, posY) {
    this.hp = 1000;

    this.posX = posX;
    this.posY = posY;
    this.scale = 1.3;
    // can be used to scale up or down the entire boss size

    this.innerNumEyes = 8;
    this.outerNumEyes = 10;
    this.innerAngle = (Math.PI * 2) / this.innerNumEyes; // angles used to control rotation of eyes
    this.outerAngle = (Math.PI * 2) / this.outerNumEyes;
    this.eX = 0;
  }

  eyeRingSetup(
    circleRadius,
    ringRadius,
    angle,
    numEyes,
    rotateEyes = true,
    eyeColor = "#5e5b56",
    whiteColor = "#FDF7E3"
  ) {
    // probably not the best way to solve this. try more elegant way later!
    for (let i = angle; i < 360; i += TAU / numEyes) {
      let x = this.posX + cos(i) * ringRadius;
      let y = this.posY + sin(i) * ringRadius;

      push(); //draws the white of the eye
      if (rotateEyes) {
        translate(x, y);
        rotate(i + PI / 2);
        fill(whiteColor);
        ellipse(0, 0, 10 * this.scale, circleRadius * 2);
      } else {
        fill(whiteColor);
        ellipse(x, y, 10 * this.scale, circleRadius * 2);
      }

      pop();

      fill(eyeColor);
      circle(x, y, circleRadius * 2);
    }
  }

  // method to draw everything
  draw() {
    noStroke();

    push(); // The main eye body: dark grey
    fill("#5e5b56");
    circle(this.posX, this.posY, 55 * this.scale);
    pop();

    push(); // the white of the eye
    fill("#FDF7E3");
    ellipse(this.posX, this.posY, 55 * this.scale, 20 * this.scale);
    pop();

    push(); // the iris of the eye
    fill("#A39377");
    circle(this.posX + this.eX, this.posY, 20 * this.scale);
    pop();

    push(); // the evil pupil
    fill("#5e5b56");
    ellipse(this.posX + this.eX, this.posY, 4 * this.scale, 20 * this.scale);
    pop();

    push(); // inner ring of eyes
    noFill();
    strokeWeight(6 * this.scale);
    stroke("#A09C86");
    circle(this.posX, this.posY, 78 * this.scale);
    pop();

    push(); // outer ring of eyes
    noFill();
    strokeWeight(6 * this.scale);
    stroke("#e7deaf");
    circle(this.posX, this.posY, 108 * this.scale);
    pop();

    push(); // eyes on inner ring
    this.eyeRingSetup(
      2 * this.scale,
      39 * this.scale,
      this.innerAngle,
      this.innerNumEyes,
      false
    ); //inner eyes
    this.eyeRingSetup(
      2 * this.scale,
      54 * this.scale,
      this.outerAngle,
      this.outerNumEyes,
      true,
      "#FDF7E3",
      "#8b7e67"
    ); //outer eyes
    pop();
  }

  attack() {
    let angle = PI / 6;
    let radius = 75;
    for (let i = angle; i < 360; i += TAU / 6) {
      let x = this.posX + cos(i) * radius;
      let y = this.posY + sin(i) * radius;

      if (mouseIsPressed) {
        obstacles.push(new ProjectileA([x, y], [mouseX, mouseY]));
        console.log("length", obstacles.length);
      }
    }
  }
}

class Player {
  constructor(pX, pY, velocity) {
    this.hp = 3;
    this.pX = pX;
    this.pY = pY;
    this.velocity = velocity;
    this.direction = 0;
    this.size = 10;
    this.fireRate = 5;
  }

  draw() {
    // console.log("length of bullets Array = ", bullets.length);

    if (frameCount % this.fireRate == 0) {
      if (mouseIsPressed) {
        bullets.push(new Bullet([this.pX, this.pY]));
      }
    }

    for (let i = 0; i < bullets.length; i++) {
      bullets[i].shoot(boss);
    }

    push();
    fill("#EDEBDC");

    translate(this.pX, this.pY);
    this.direction = atan2(mouseY - this.pY, mouseX - this.pX);

    rotate(this.direction);

    triangle(this.size + 3, 0, -this.size, -this.size, -this.size, this.size);
    pop();
  }

  //store pos in vectors and normalise vector or set mag manually to avoid weird diagonal movement

  move() {
    if (keyIsDown(87)) {
      this.pY -= this.velocity;
    }
    if (keyIsDown(68)) {
      this.pX += this.velocity;
    }
    if (keyIsDown(65)) {
      this.pX -= this.velocity;
    }
    if (keyIsDown(83)) {
      this.pY += this.velocity;
    }
  }
}

class Bullet {
  constructor(origin, dmg = 3, speed = 3, size = 5) {
    this.dmg = dmg;
    this.size = size;
    this.speed = speed;
    this.originVector = createVector(origin[0], origin[1]);
    this.aimVector = createVector(mouseX, mouseY);
    this.directionVector = p5.Vector.sub(this.aimVector, this.originVector);
    this.direction = this.directionVector.heading();
    this.n = 0;
  }

  shoot(boss) {
    this.originVector.x += cos(this.direction) * this.speed;
    this.originVector.y += sin(this.direction) * this.speed;
    let b = circle(this.originVector.x, this.originVector.y, this.size);

    if (
      // delete if out of bounds
      this.originVector.x >= canvasSize[0] + this.size / 2 ||
      this.originVector.x <= -this.size / 2 ||
      this.originVector.y >= canvasSize[1] + this.size / 2 ||
      this.originVector.y <= -this.size / 2
    ) {
      let index = bullets.indexOf(this);
      bullets.splice(index, 1);
    }

    if (
      collideRect(
        200,
        170,
        118,
        118, // check for collision against boss.
        this.originVector.x,
        this.originVector.y,
        this.size - 2,
        this.size - 2
      ) == true
    ) {
      let index = bullets.indexOf(this);
      bullets.splice(index, 1);

      boss.hp -= this.dmg;
    }
  }
}

// instead of new class each time just make a parent class and inherit all projectiles from that. These projectile classes are like identitcal to each other.

//fix the declaration issue!! its not hard
class ProjectileA {
  constructor(origin, dmg = 1, speed = 1, size = 8) {
    this.origin = origin;
    this.aim = createVector(boss.posX, boss.posY);
    this.dvec = p5.Vector.sub(this.origin, this.aim);
    this.theta = this.dvec.heading();

    this.speed = speed;
    this.size = size;
    this.dmg = dmg;
  }

  shoot() {
    this.origin.x += cos(this.theta) * this.speed;
    this.origin.y += sin(this.theta) * this.speed;

    circle(this.origin.x, this.origin.y, this.size);
  }
}

class healthBar {
  constructor(length, breadth, X, Y, hp, entity) {
    this.maxHp = hp;
    this.entity = entity;

    this.hpLength = length;
    this.hpWidth = breadth;
    this.position = createVector(X, Y);

    this.scalingFactor = this.hpLength / this.maxHp;
  }

  draw() {
    push();
    rectMode(CENTER);
    fill("#e4dfcb");
    rect(this.position.x, this.position.y, this.hpLength, this.hpWidth);
    fill("#4a473e");
    let offset = ((this.maxHp - this.entity.hp) / 2) * this.scalingFactor;
    rect(
      this.position.x - offset,
      this.position.y,
      this.entity.hp * this.scalingFactor,
      this.hpWidth
    );

    pop();
  }
}

let boss = new biblicallyAccurateAditya(200, 170);
let player = new Player(200, 280, 2);

// MAIN ISSUES
// player spawn direction
// normalise movement vector to fix diagonal movement
// make rects a class like pygame and give each entity their own. dont hardcode collisions. and move dmg logic too maybe, the taking boss as argument thing is weird.
// all projectiles can be just one class or maybe inherit from a projectile parent class. no need for seperate classes
// enemy shooting
// death missing
// fx missing. easy fix just add last
// out of bounds for player missing
// tons of inelegant code and bad solutions
