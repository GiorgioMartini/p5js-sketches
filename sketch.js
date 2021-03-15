let dancingLine2

function isOdd(num) { return num % 2;}

function setup() {
  createCanvas(windowWidth,windowHeight)
  background("#18020C")
  dancingLine1 = makeDancingLine()
  dancingLine2 = makeDancingLine(true)
}

function draw() {
  background("#18020C")
  translate(width/2, height/2)
  dancingLine1.display()
  dancingLine2.display()
}

function makeDancingLine(flip) {
  let history = []
  let linesAmt =60
  let col = 255
  let v1 = createVector(0,0)
  let v2 = createVector(0,0)
  
  let x1Angle = flip ? 90 : 0
  let y1Angle = flip ? 90 : 0
  let x2Angle = flip ? 90 : 0
  let y2Angle = flip ? 90 : 0

  let x1AngleOff = 0.03
  let y1AngleOff = 0.002
  let x2AngleOff = 0.015
  let y2AngleOff = 0.02  
  
  let r1 = flip ? 250 : 300 
  let r2 = flip ? 250 : 300 

  function display() {
    v1.set(r1 * sin(x1Angle), r1 * sin(y1Angle))
    v2.set(r2 * sin(x2Angle), r2 * sin(y2Angle))

    history.push([v1.x, v1.y, v2.x, v2.y]) 
    
    if (history.length > linesAmt) history.splice(0,1)
    
    col = flip
      ? "#E5FFDE"
      : "#634B66"

    history.forEach((linea, i) => {
      stroke(col) 
      strokeWeight(2)
      line(linea[0],linea[1],linea[2],linea[3])
    })

    x1Angle += flip ? x1AngleOff : x1AngleOff + 0.01
    y1Angle += flip ? y1AngleOff : y1AngleOff + 0.01
    x2Angle += flip ? x2AngleOff : x2AngleOff + 0.01
    y2Angle += flip ? y2AngleOff : y2AngleOff + 0.01
  }

  return {
    display,
  }
}
