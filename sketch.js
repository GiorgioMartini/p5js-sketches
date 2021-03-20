let canvasWidth = 400
let canvasHeight = canvasWidth*1.5
let row
let grid
let amtOfHorizontalCircles = 20
let linesAmt = 50
let ySpacing = 10
let lineSpacing = canvasHeight/linesAmt
const interval = 500
let circleSizeMultiplier = 9 
const circleSizeProbability = 0.6   
let rotation = 6.7

function setup () {
  if(window.innerWidth < 800) {
    canvasWidth = window.innerWidth-80
    canvasHeight = canvasWidth*1.5
    lineSpacing = canvasHeight/linesAmt
    circleSizeMultiplier = canvasWidth/40
    rotation = 0.2
    var myCanvas = createCanvas(canvasWidth, canvasHeight, WEBGL)
    console.log('small')
  	myCanvas.parent("p5full")
  } else {
    var myCanvas = createCanvas(canvasWidth, canvasHeight, WEBGL)
    console.log('big')
  	myCanvas.parent("p5")
  }

  smooth() 
  background("#140c28")
  grid = createGrid([], linesAmt, lineSpacing)
  setInterval(slideRow, interval)
}

function draw () {
  rotateX(rotation)
  translate((-canvasWidth/2)+10, -canvasHeight/2, 100)
  background("#140c28")
  grid.forEach( row => {
    row.forEach( x => {
      x.display()
    })
  })
}


const createCircle = (fillColor, x, y, maxRadius) => {
let xpos = x
let ypos = y
 return {
   xpos,
   ypos,
   display() {
     noStroke()
     fill(fillColor)
     ellipse(xpos, ypos, maxRadius, maxRadius)
   },
   slide(amt) {
     if( ypos >  linesAmt * lineSpacing ) {
       maxRadius = randomCircleSize(circleSizeMultiplier, circleSizeProbability)
       ypos = lineSpacing
     }
     ypos += amt
   },
 }
}

function randomLevelFromHsl(h, s, min, max) {
  // Probability of color being more lit
  const r = random(1)
  if( r > 0.7 ) { 
    return `hsl(${h}, ${s}%, ${random(min, max).toFixed()}%)`   
  }
  return `hsl(${h}, ${s}%, ${random(min/2, max/2).toFixed()}%)` 
}

function randomCircleSize(multiplier, probabilityToBeSmall/* e.g. 0.7 */) {
  // Probability of size
  const r = random(1)
  if( r < probabilityToBeSmall ) { 
    return r * multiplier/2
  }
  return r * multiplier
}

function createLine(arr, amt, startingPoint, y) {
  if( arr.length < amt) {
     arr.push(createCircle(randomLevelFromHsl(20, 80, 20, 50), startingPoint,  y, randomCircleSize(circleSizeMultiplier, circleSizeProbability) ))
     createLine(arr, amt, startingPoint += width/amtOfHorizontalCircles, y)
  }
  return arr
}

function createGrid(arr, linesAmt, y) {
  if( arr.length < linesAmt) {
    arr.push(createLine([], amtOfHorizontalCircles, 0, y))
    createGrid(arr, linesAmt, y += lineSpacing)} 
  return arr
}

function slideRow() {
  // shifts heights, and moves y's to begginig of they are higher tha Height
  grid.forEach( (line) => {
    line.forEach( x => {
    x.slide(ySpacing)
    })
  })
}
