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

function setup() {
  noLoop()
  var myCanvas = createCanvas(600,600)
  w = width/cols
  h = height/rows
  // myCanvas.parent("p5")
  xSpacing = width/cols
  ySpacing = height/cols

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      matrix.push([
        Spot(i*xSpacing,j*ySpacing, xSpacing, ySpacing)
      ])
    }
  }
}

function draw() {

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
    cell[0].display()
  })  
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

function randomDeg(_x, _y, w, h) {
  let randomNumber = (Math.random() * 10).toFixed(1)
  console.log('executed with: ', randomNumber)
  if (randomNumber < 2.5 && randomNumber < 0) {
    console.log(1)
    return 0
  } else if (randomNumber < 5 && randomNumber < 2.5) {
    console.log(2)
    return HALF_PI
  } else if (randomNumber < 7.5 && randomNumber < 5) {
    console.log(3)
    return PI
  } else if (randomNumber < 1.1 && randomNumber > 7.5) {
    console.log(4)
    return HALF_PI + PI
  }
}

function Spot(x, y, w, h) {

  let _x = x
  let _y = y
  let _r = 10
  let hovered = false

  function display() {
    noStroke()
    fill(random(255))

    push()
      translate(_x,_y)
      let r = randomDeg()
      // console.log(Math.random())
      // console.log({r})
      rotate(r)
      arc(0, 0, w, h, 0, HALF_PI)
      translate(0,0)
    pop()
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