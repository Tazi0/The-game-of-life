function make2DArray(colms, rows) {
    var arr = new Array(colms)
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows)
    }
    return arr
}

var resolution = 10
var colms
var rows
var grid
var inverted = false
var randomColor = true

var docWidth = window.innerWidth
var docHeight = window.innerHeight

function setup() {
    createCanvas(docWidth, docHeight)
    colms = round(width / resolution)
    rows = round(height / resolution)
    grid = make2DArray(colms, rows)
    for (let x = 0; x < colms; x++) {
        for (let y = 0; y < rows; y++) {
            grid[x][y] = {
                active: Math.round(Math.random(1)), 
                color: (randomColor) ? [random(255), random(255), random(255)] : (inverted) ? 0 : 255
            }
        }
    }
}

function draw() {
    background((inverted) ? 255 : 0)
    for (let i = 0; i < colms; i++) {
        for (let j = 0; j < rows; j++) {
            var x = i * resolution
            var y = j * resolution
            var item = grid[i][j]

            if(item.active == 1) {
                fill(item.color)
                ellipse(x, y, resolution, resolution, resolution)
            }
        }
    }

    var next = make2DArray(colms, rows)

    // make next grid
    for (let x = 0; x < colms; x++) {
        for (let y = 0; y < rows; y++) {
            let item = grid[x][y]
            let state = item.active

            let alive = neighbours(grid, x, y)

            next[x][y] = {}

            if(state == 0 && alive == 3) {
                next[x][y].active = 1;
            } else if(state == 1 && (alive < 2 || alive > 3)) {
                next[x][y].active = 0
            } else {
                next[x][y].active = state
            }

            next[x][y].color = item.color

        }
    }

    grid = next
}

function neighbours(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + colms) % colms;
        let row = (y + j + rows) % rows;
        sum += grid[col][row].active;
      }
    }
    sum -= grid[x][y].active;
    return sum;
  }