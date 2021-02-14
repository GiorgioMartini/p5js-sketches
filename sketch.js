let img
let uploadImg
const cols = 20
const rows = 20
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
  noLoop()
  var myCanvas = createCanvas(img.width, img.height)
  image(uploadImg ? uploadImg : img, 0, 0)
  w = width/cols
  h = height/rows
  // input = createFileInput(handleFile);
  // myCanvas.parent("p5")
  xSpacing = width/cols
  ySpacing = height/cols

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      matrix.push([
        Spot(i*xSpacing,j*ySpacing, xSpacing, ySpacing),
        get(i*xSpacing,j*ySpacing)
      ])
    }
  }
}

function draw() {
  uploadImg && resizeCanvas(uploadImg.width, uploadImg.height);

  // let newCols = Math.ceil(map(mouseX, 0, width, 0, 40))
  // let newRows = Math.ceil(map(mouseY, 0, height, 0, 40))

  // If mouse is inside the canvas:
  // if (mouseX > 1 && mouseX < width && mouseY > 1 && mouseY < height) {
  //   w = width/newCols
  //   h = height/newRows
  //   matrix = buildNewMatrix(newCols, newRows, width/newCols, height/newRows)
  // } else {
  //   w = width/cols
  //   h = height/rows
  //   matrix = buildNewMatrix(cols, rows, width/cols, height/rows)
  // }

  // image(uploadImg ? uploadImg : img, 0, 0)
  // saveColors(matrix)
  // background(0)
  // shuffleArray(matrix)
  background(0)

  matrix.forEach((cell, i) => {
    noStroke()
    cell[0].display(cell[1])
  })  
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

// function buildNewMatrix(rows, cols, xS, yS) {
//   let m = []
//   for (let i = 0; i < rows+1; i++) {
//     for (let j = 0; j < cols+1; j++) {
//       m.push([i*xS,j*yS])
//     }
//   }
//   return m
// }

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    uploadImg = createImg(file.data, '');
    uploadImg.hide();
  } else {
    uploadImg = null;
  }
}  

function maybe() {
  return random() < 0.1
}

function Spot(x, y, w, h) {
  let _x = x
  let _y = y
  let _r = 10
  let hovered = false

  function display(col) {
    noStroke()
    fill(col)
    ellipseMode(CORNER)
    // ellipse(_x, _y, w, h)
    arc(_x, _y, w, h, 0, PI + QUARTER_PI, CHORD);

    // maybe() && rect(_x+5, _y+5, 20)
  }

  // function fade() {
  //   if (_r >= 0) {
  //     _r -= 1
  //   } else {
  //     hovered = false
  //   }
  // }

  // function flash() {
  //     _r = 20
  //     hovered = true
  // }

  // function randomWalk() {
  //   _x += random(-0.5,0.5)
  //   _y += random(-0.5,0.5)
  // }

  function values () {
    return {
      _x,
      _y,
      hovered,
    }
  }

  return {
    display,
    // flash,
    // randomWalk,
    values,
    // fade,
  }
}