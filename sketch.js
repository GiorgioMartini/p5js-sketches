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
  '#227c9d',
  '#17c3b2',
  '#ffcb77',
  '#fef9ef',
  '#fe6d73'
]

function getColors(items) {
  let _items = [...items]
  let randomColId = Math.floor(Math.random() * _items.length)
  _items.splice(randomColId, 1)

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
  background(colors.bg)

  matrix.forEach((cell, i) => {
    noStroke()
    cell[0].display(xSpacing, ySpacing)
  })  
}

function randomDeg(_x, _y, w, h) {
  let randomNumber = (Math.random() * 10).toFixed(1)
  if (randomNumber >= 0 && randomNumber < 2.5) {
    return 0
  } else if (randomNumber >= 2.5 && randomNumber < 5) {
    return HALF_PI
  } else if (randomNumber >= 5 && randomNumber < 7.5) {
    return PI
  } else {
    return TWO_PI
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
