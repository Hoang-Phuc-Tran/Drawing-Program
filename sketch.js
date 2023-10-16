// Set the toolbar's width.
let toolbar = 150;
// Set border size
let border = 10;
// Set the pivot mode.
let pivotMode = false;
// Store the pivot point position
let pivotPoint;
// An array to hold the vertices positions
let vertices = [];

// Rotate icons
let iconRotateCW;
let iconRotateCCW;
// Up, Down, Left, Right Icons
let iconUpButton;
let iconDownButton;
let iconLeftButton;
let iconRightButton;
// Scale up and down icons
let iconScaleUpButton;
let iconScaleDownButton;
// Clear button icons
let iconClearButton;
let iconPivotButton;
// Rotate buttons
let rotateCWButton;
let rotateCCWButton;

// Up, Down, Left, Right buttons
let upButton;
let downButton;
let leftButton;
let rightButton;

// Scale up and Down buttons
let scaleUpButton;
let scaleDownButton;

// Clear Icon buttons
let clearButton;
let pivotButton;
// coordinateXButton
let coordinateXButton = 10;
let heightButton = 50;
let weightButton = 130;

// Define a class for creating buttons
class Button {
  // Constructor for the Button class
  constructor(x, y, width, height, callback, image = null) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.callback = callback;
    this.img = image;
  }

  show() {
    fill(255);
    if (this === pivotButton && pivotMode) {
      fill(100, 200, 100);
    }
    rect(this.x, this.y, this.width, this.height);

    // Check if an image has been set for this button
    if (this.img) {
      image(this.img, this.x, this.y, this.width, this.height);
    }
  }

  //check if the button has been clicked
  clicked(px, py) {
    if (px > this.x && px < this.x + this.width && py > this.y && py < this.y + this.height) {
      this.callback();
    }
  }
}

function preload() {
  // Load the image
  iconRotateCW = loadImage("assets/fightJoy_08.png");
  iconRotateCCW = loadImage("assets/fightJoy_07.png");
  iconUpButton = loadImage("assets/arrowUp.png");
  iconDownButton = loadImage("assets/arrowDown.png");
  iconLeftButton = loadImage("assets/arrowLeft.png");
  iconRightButton = loadImage("assets/arrowRight.png");
  iconScaleUpButton = loadImage("assets/zoomIn.png");
  iconScaleDownButton = loadImage("assets/zoomOut.png");
  iconClearButton = loadImage("assets/cross.png");
  iconPivotButton = loadImage("assets/joystickRight.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialize the Rotate buttons
  rotateCWButton = new Button(
    coordinateXButton,
    coordinateXButton,
    weightButton,
    heightButton,
    rotateVerticesCW,
    iconRotateCW
  );
  rotateCCWButton = new Button(
    coordinateXButton,
    70,
    weightButton,
    heightButton,
    rotateVerticesCCW,
    iconRotateCCW
  );

  // Initialize Up, Down, Left, Right buttons
  upButton = new Button(coordinateXButton, 130, weightButton, heightButton, moveUp, iconUpButton);
  downButton = new Button(
    coordinateXButton,
    190,
    weightButton,
    heightButton,
    moveDown,
    iconDownButton
  );
  leftButton = new Button(
    coordinateXButton,
    250,
    weightButton,
    heightButton,
    moveLeft,
    iconLeftButton
  );
  rightButton = new Button(
    coordinateXButton,
    310,
    weightButton,
    heightButton,
    moveRight,
    iconRightButton
  );

  //Initialize Scale up and down buttons
  scaleUpButton = new Button(
    coordinateXButton,
    370,
    weightButton,
    heightButton,
    scaleUp,
    iconScaleUpButton
  );
  scaleDownButton = new Button(
    coordinateXButton,
    430,
    weightButton,
    heightButton,
    scaleDown,
    iconScaleDownButton
  );

  //Initialize clear and pivot buttons
  clearButton = new Button(
    coordinateXButton,
    490,
    weightButton,
    heightButton,
    clearScreen,
    iconClearButton
  );
  pivotButton = new Button(
    coordinateXButton,
    550,
    weightButton,
    heightButton,
    togglePivotMode,
    iconPivotButton
  );

  // Initialize the pivot point to the center
  pivotPoint = {
    x: (width - toolbar - border) / 2 + toolbar + border,
    y: height / 2,
  };
}

function draw() {
  background(220);

  // Drawing toolbar area
  fill(150);
  rect(0, 0, toolbar, height);

  // Drawing border
  fill(50);
  rect(toolbar, 0, border, height);

  // Draw the elements on the Drawing Board
  drawShapes();

  // Show buttons
  rotateCWButton.show();
  rotateCCWButton.show();
  // Show Up, Down, Left, Right buttons
  upButton.show();
  downButton.show();
  leftButton.show();
  rightButton.show();
  // Show scale up and down buttons
  scaleUpButton.show();
  scaleDownButton.show();
  // Show clear button
  clearButton.show();
  // Show pivot button
  pivotButton.show();
}

function mousePressed() {
  // Click rotations
  rotateCWButton.clicked(mouseX, mouseY);
  rotateCCWButton.clicked(mouseX, mouseY);
  // Click movement buttons
  upButton.clicked(mouseX, mouseY);
  downButton.clicked(mouseX, mouseY);
  leftButton.clicked(mouseX, mouseY);
  rightButton.clicked(mouseX, mouseY);
  // Click scale up and down buttons
  scaleUpButton.clicked(mouseX, mouseY);
  scaleDownButton.clicked(mouseX, mouseY);
  // Click clear button
  clearButton.clicked(mouseX, mouseY);
  // Toggle pivot button
  pivotButton.clicked(mouseX, mouseY);

  // If in the drawing area
  if (mouseX > toolbar + border) {
    if (pivotMode) {
      pivotPoint = { x: mouseX, y: mouseY };
    } else {
      vertices.push({ x: mouseX, y: mouseY });
    }
  }
}

function drawShapes() {
  // Draw connecting lines if there are 2 or more vertices
  if (vertices.length > 1) {
    stroke(0, 0, 255);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let v of vertices) {
      vertex(v.x, v.y);
    }
    // If there are three or more vertices, close the shape
    if (vertices.length >= 3) {
      endShape(CLOSE);
    } else {
      endShape();
    }
  }

  // Draw vertices
  fill(255, 0, 0);
  noStroke();
  for (let vertex of vertices) {
    ellipse(vertex.x, vertex.y, 6, 6);
  }

  // Draw pivot point
  fill(0, 255, 0); // Green color
  ellipse(pivotPoint.x, pivotPoint.y, 6, 6);
}

/*
 * Function: rotateVerticesCW()
 * Description: This function is used to rotates all currently drawn vertices 45
 * degrees around the pivot point in a clockwise direction
 * Parameters: None
 * Returns: None.
 */
function rotateVerticesCW() {
  // Convert 45 degrees to radians
  let angle = radians(45);

  for (let i = 0; i < vertices.length; i++) {
    let vertex = vertices[i];

    // Translate vertex so that pivot is the origin
    vertex = myTranslate(vertex, createVector(-pivotPoint.x, -pivotPoint.y));

    let pointMatrix = [[vertex.x], [vertex.y], [1]];

    // Rotation matrix
    let rotationMatrix = [
      [cos(angle), -sin(angle), 0],
      [sin(angle), cos(angle), 0],
      [0, 0, 1],
    ];

    let result = matrixMultiply(rotationMatrix, pointMatrix);

    vertex.x = result[0][0];
    vertex.y = result[1][0];

    // Translate vertex back to original position
    vertex = myTranslate(vertex, pivotPoint);
    vertices[i] = vertex;
  }
}

/*
 * Function: rotateVerticesCCW()
 * Description: This function is used to rotates all currently drawn vertices 45
 * degrees around the pivot point in a counterclockwise direction
 * Parameters: None
 * Returns: None.
 */
function rotateVerticesCCW() {
  // Convert -45 degrees
  let angle = -radians(45);

  for (let i = 0; i < vertices.length; i++) {
    let vertex = vertices[i];

    // Translate vertex so that pivot is the origin
    vertex = myTranslate(vertex, createVector(-pivotPoint.x, -pivotPoint.y));

    let pointMatrix = [[vertex.x], [vertex.y], [1]];

    // Rotation matrix
    let rotationMatrix = [
      [cos(angle), -sin(angle), 0],
      [sin(angle), cos(angle), 0],
      [0, 0, 1],
    ];

    let result = matrixMultiply(rotationMatrix, pointMatrix);

    vertex.x = result[0][0];
    vertex.y = result[1][0];

    // Translate vertex back to original position
    vertex = myTranslate(vertex, pivotPoint);
    vertices[i] = vertex;
  }
}

/*
 * Code from week 4
 * Function: matrixMultiply(matrixA, matrixB)
 * Description: This function is used to multiply 2 matrices
 * Parameters: There is two parameters (matrixA, matrixB))
 * Returns: None.
 */
function matrixMultiply(matrixA, matrixB) {
  let columnOfMatrixA = matrixA[0].length;
  let rowOfMatrixA = matrixA.length;
  let columnOfMatrixB = matrixB[0].length;
  let rowOfMatrixB = matrixB.length;

  if (columnOfMatrixA !== rowOfMatrixB) {
    console.log("Cannot multiply 2 matrices.\n");
    return null;
  }

  let final = [];

  for (let i = 0; i < rowOfMatrixA; i++) {
    final[i] = [];
    for (let j = 0; j < columnOfMatrixB; j++) {
      let sum = 0;
      for (let k = 0; k < columnOfMatrixA; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      final[i][j] = sum;
    }
  }

  return final;
}

/*
 * Code from week 4
 * Function: myTranslate(point, translation)
 * Description: This function is used to translate
 * Parameters: There is two parameters (point, translation)
 * Returns: None.
 */
function myTranslate(point, translation) {
  let _point = [[point.x], [point.y], [1]];

  let _translation = [
    [1, 0, translation.x],
    [0, 1, translation.y],
    [0, 0, 1],
  ];

  // Call the matrixMultiply function
  let result = matrixMultiply(_translation, _point);

  // Create vector
  return createVector(result[0][0], result[1][0]);
}

/*
 * Function: moveUp()
 * Description: This function is used to to move up all the vertices to 10px
 * Parameters: None
 * Returns: None.
 */
function moveUp() {
  for (let i = 0; i < vertices.length; i++) {
    vertices[i] = myTranslate(vertices[i], createVector(0, -10));
  }
}

/*
 * Function: moveDown()
 * Description: This function is used to to move down all the vertices to 10px
 * Parameters: None
 * Returns: None.
 */
function moveDown() {
  for (let i = 0; i < vertices.length; i++) {
    vertices[i] = myTranslate(vertices[i], createVector(0, 10));
  }
}

/*
 * Function: moveLeft()
 * Description: This function is used to to move left all the vertices to 10px
 * Parameters: None
 * Returns: None.
 */
function moveLeft() {
  for (let i = 0; i < vertices.length; i++) {
    vertices[i] = myTranslate(vertices[i], createVector(-10, 0));
  }
}

/*
 * Function: moveRight()
 * Description: This function is used to to move right all the vertices to 10px
 * Parameters: None
 * Returns: None.
 */
function moveRight() {
  for (let i = 0; i < vertices.length; i++) {
    vertices[i] = myTranslate(vertices[i], createVector(10, 0));
  }
}

/*
 * Function: scaleUp()
 * Description: This function is used to scale all vertices up by 5% relative to the pivot point
 * Parameters: None
 * Returns: None.
 */
function scaleUp() {
  scaleGeneral(1.05);
}

/*
 * Function: scaleUp()
 * Description: This function is used to scale all vertices down by 5% relative to the pivot point
 * Parameters: None
 * Returns: None.
 */
function scaleDown() {
  scaleGeneral(0.95);
}

/*
 * Function: scaleGeneral(value)
 * Description: This function is used to scale vertices relative to the pivot point
 * Parameters: value - double
 * Returns: None.
 */
function scaleGeneral(value) {
  for (let i = 0; i < vertices.length; i++) {
    let vertex = vertices[i];

    // Translate vertex so that pivot is the origin
    vertex = myTranslate(vertex, createVector(-pivotPoint.x, -pivotPoint.y));

    vertex.x *= value;
    vertex.y *= value;

    // Translate vertex back to original position
    vertex = myTranslate(vertex, pivotPoint);
    vertices[i] = vertex;
  }
}

/*
 * Function: clearScreen()
 * Description: This function is used to remove all the vertices and reset the
 * pivot point to the default location
 * Parameters: None
 * Returns: None.
 */
function clearScreen() {
  vertices = [];
  pivotPoint = {
    x: (width - toolbar - border) / 2 + toolbar + border,
    y: height / 2,
  };
}

/*
 * Function: togglePivotMode()
 * Description: This function is used to toggle pivot mode
 * Parameters: None
 * Returns: None.
 */
function togglePivotMode() {
  pivotMode = !pivotMode;
}
