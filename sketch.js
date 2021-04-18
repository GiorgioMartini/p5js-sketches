
let img
let uploadImg
const cols = 35
const rows = 35
let matrix = []
let xSpacing
let ySpacing
let w
let h
let input;

function preload() {
  img = loadImage('https://i.imgur.com/6B788ty.jpg')
}

function setup() {
  if(window.innerWidth < 800) {
    img.resize(window.innerWidth-80, 0)
    var myCanvas = createCanvas(img.width, img.height)
    console.log('small')
  	// myCanvas.parent("p5full")
  } else {
    var myCanvas = createCanvas(img.width, img.height)
    console.log('wide')
  	// myCanvas.parent("p5")
  }

  w = width/cols
  h = height/rows
  // myCanvas.parent("p5")

  xSpacing = width/cols
  ySpacing = height/cols

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      matrix.push([i*xSpacing,j*ySpacing])
    }
  }
}

function saveColors(matrix) {
  matrix.forEach((cell, i) => {
    matrix[i].push(get(cell[0], cell[1]))
  })    
}
  
function draw() {
  let _newCols = map(mouseX, 0, width, 0, 40)
  let newCols = Math.ceil(_newCols)
  let _newRows = map(mouseY, 0, height, 0, 40)
  let newRows = Math.ceil(_newRows)

  if (mouseX > 1 && mouseX < width && mouseY > 1 && mouseY < height) {
    w = width/newCols
    h = height/newRows
    matrix = buildNewMatrix(newCols, newRows, width/newCols, height/newRows)
  } else {
    w = width/cols
    h = height/rows
    matrix = buildNewMatrix(cols, rows, width/cols, height/rows)
  }
  image(img, 0, 0)
  saveColors(matrix)
  background(0)
  shuffleArray(matrix)

  matrix.forEach((cell, i) => {
    fill(cell[2])
    noStroke()
    ellipseMode(CORNER)
    ellipse(cell[0], cell[1], w, h)
  })  

}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function buildNewMatrix(rows, cols, xS, yS) {
  let m = []
  for (let i = 0; i < rows+1; i++) {
    for (let j = 0; j < cols+1; j++) {
      m.push([i*xS,j*yS])
    }
  }
  return m
}