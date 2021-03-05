let frame
let img
let uploadImg
let gridAmount = 10
let matrix = []
let xSpacing
let ySpacing
let w
let h
let input
let colors
let dotsSize
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
  // noLoop()
  var myCanvas = createCanvas(700,700)
  // myCanvas.parent("p5")
}

function draw() {
  frameCount > 0
    ? frameRate(0.2)
    : frameRate(1)

  gridAmount = Math.ceil(random(1,15))
  w = width/gridAmount
  h = height/gridAmount
  xSpacing = width/gridAmount
  ySpacing = height/gridAmount
  colors = getColors(palette)
  dotsSize = random(width/80, width/18)

  for (let i = 0; i < gridAmount; i++) {
    for (let j = 0; j < gridAmount; j++) {
      matrix.push([
        Spot(i*xSpacing,j*ySpacing, xSpacing, ySpacing)
      ])
    }
  }

  background(colors.bg)
  matrix.forEach((cell, i) => {
    noStroke()
    cell[0].display(xSpacing, ySpacing)
  })  
  matrix = []
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

    fill(getRandomFromArray(colors.colors))
    ellipse(0,0,dotsSize)
  } else if (randomNumber >= 3.3 && randomNumber < 6.6) {
    let col2 = getRandomFromArray(colors.colors)
    fill(col2)
    arc(0, 0, w, h, 0, PI)

    fill(getRandomFromArray(colors.colors))
    ellipse(0,0,dotsSize)
  } else if (randomNumber >= 6.6 && randomNumber <= 10) {
    let col3 = getRandomFromArray(colors.colors)
    fill(col3)
    arc(0, 0, w, h, 0, PI)
    let col4 = getRandomFromArray(colors.colors)
    fill(col4)
    arc(0, 0, w, h, PI, PI + HALF_PI)

    fill(getRandomFromArray(colors.colors))
    ellipse(0,0,dotsSize)
  } 
}

function Spot(x, y, w, h) {
  let _x = x
  let _y = y

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

  return {
    display,
  }
}
