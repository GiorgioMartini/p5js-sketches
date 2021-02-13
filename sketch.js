let darkPurple = '#352D39'
let pink = '#FF6978'

const between = (x, min, max) =>  x >= min && x <= max

function isOverGridPoint (mouseX, mouseY, x, y, range = 20) {
  return (between(mouseX, x-range, x+range) && between(mouseY, y-range, y+range))
    ? true
    : false
}

// https://coolors.co/ff6978-fffcf9-b1ede8-6d435a-352d39
  const windowResized = (p5) => resizeCanvas(windowWidth, windowHeight)
  const lineThresh = 40
  let color = pink
  let spots = []
  let cols = 20
  let canvas
  let rows

  function Spot(p5, x, y) {
    let _x = x
    let _y = y
    let _r = 2
    let hovered = false

    function display() {
      noStroke()
      fill(color)
      ellipse(_x, _y, _r)
    }

    function fade() {
      if (_r >= 0) {
        _r -= 1
      } else {
        hovered = false
      }
    }

    function flash() {
        _r = 20
        hovered = true
    }

    function randomWalk() {
      _x += random(-0.5,0.5)
      _y += random(-0.5,0.5)
    }

    function values () {
      return {
        _x,
        _y,
        hovered,
      }
    }

    return {
      display,
      flash,
      randomWalk,
      values,
      fade,
    }
  }

  function setup() {
    canvas = createCanvas(windowWidth, windowHeight /*, WEBGL*/)
    background(darkPurple);
    canvas.position(0, 0).style('z-index', '-1')
    
    cols = map(width, 0, 2000 , 2, 30)
    const gridSize  = width/cols
    rows = height/gridSize

    for (let x = 0; x < cols+1; x++) {
      for (let y = 0; y < rows+1; y++) {
        spots.push(Spot(p5, x * gridSize, y * gridSize))
      }
    }
  }

  function draw () {
    background(darkPurple)
    strokeWeight(1)
    spots.forEach((s, i) => {
      let { _x, _y, hovered } = s.values()
      s.randomWalk()
      s.display()
      if (i !== 0 && isOverGridPoint(mouseX, mouseY, _x, _y)) s.flash() 
      hovered && s.fade()

      spots.forEach(ref => {
        if (between(_x, ref.values()._x-lineThresh, ref.values()._x+lineThresh) && between(_y, ref.values()._y-lineThresh, ref.values()._y+lineThresh)) {
          stroke(color)
          strokeWeight(1)
          line(_x, _y, ref.values()._x, ref.values()._y)
        }
      })
    })
  }

  // mouseClicked = () => {
  //   console.log(8)
  // }
