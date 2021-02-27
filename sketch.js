let img
let uploadImg
const cols = 10
const rows = 10
let matrix = []
let xSpacing
let ySpacing
let w
let h
let input
let colors
let palette = [
  '#B5D6B2',
  '#53131E',
  '#5A464C',
  '#FFFACC',
  '#FFEFBD'
]

function getColors(items) {
  let _items = [...items]
  let randomColId = Math.floor(Math.random() * _items.length)
  _items.splice(randomColId, 1)

  console.log('bg: ', items[randomColId])
  debugger
  return {
    bg: items[randomColId],
    colors: _items
  }
}

function getRandomFromArray(items) {
  let result = items[Math.floor(Math.random() * items.length)]
  return result
}

function setup() {
  noLoop()
  colors = getColors(palette)
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
  console.log({bg: colors.bg})
  background(colors.bg)

  matrix.forEach((cell, i) => {
    noStroke()
    cell[0].display(xSpacing, ySpacing)
  })  

}

function randomDeg(_x, _y, w, h) {
  let randomNumber = (Math.random() * 10).toFixed(1)
  if (randomNumber < 2.5 && randomNumber < 0) {
    return 0
  } else if (randomNumber < 5 && randomNumber < 2.5) {
    return HALF_PI
  } else if (randomNumber < 7.5 && randomNumber < 5) {
    return PI
  } 
}

function randomSign(w,h) {
  let randomNumber = (Math.random() * 10).toFixed(1)

  if (randomNumber >= 0 && randomNumber < 3.3) {
    let col1 = getRandomFromArray(colors.colors)
    fill(col1)
    arc(0, 0, w, h, 0, HALF_PI)
  } else if (randomNumber >= 3.3 && randomNumber < 6.6) {
    let col2 = getRandomFromArray(colors.colors)
    fill(col2)
    arc(0, 0, w, h, 0, PI)
  } else if (randomNumber >= 6.6 && randomNumber <= 10) {
    let col3 = getRandomFromArray(colors.colors)
    fill(col3)
    arc(0, 0, w, h, 0, PI)
    let col4 = getRandomFromArray(colors.colors)
    fill(col4)
    arc(0, 0, w, h, PI, PI + HALF_PI)
  } else {
    alert(randomNumber)
  }
}

// function randomShape(w,h) {
//   let randomNumber = (Math.random() * 10).toFixed(1)
//   if (randomNumber < 2.5 && randomNumber > 0) {
//     fill(0)
//     let r = randomDeg()
//     console.log(1)
//     rotate(r)
//     arc(0, 0, w, h, 0, HALF_PI)
//   } else if (randomNumber < 5 && randomNumber > 2.5) {
//     debugger
//     fill(255,0,0)
//     let r = randomDeg()
//     console.log(2)
//     fill(0,255,0)
//     rotate(r)
//     arc(0, 0, w, h, 0, PI)
//   } else if (randomNumber < 7.5 && randomNumber > 5) {
//     fill(0,0,255)
//     let r = randomDeg()
//     console.log(3)
//     rotate(r)
//     arc(0, 0, w, h, 0, TWO_PI)
//   } else if (randomNumber < 1.1 && randomNumber > 7.5) {
//     fill(100)
//     let r = randomDeg()
//     console.log(4)
//     rotate(r)
//     arc(0, 0, w, h, 0, QUARTER_PI)
//   }

// }

function Spot(x, y, w, h) {
  let _x = x
  let _y = y
  let _r = 10
  let hovered = false

  function display(xoff, yoff) {
    noStroke()

    push()
      translate(_x+xoff/2,_y+yoff/2)
  
      let r = randomDeg()
      rotate(r)
      randomSign(w,h)
      translate(0,0)
    pop()
  }

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
    values,
  }
}
