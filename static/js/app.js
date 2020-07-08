// number of columns in the maze
const MAZE_COLUMNS = 30;
let drawWalls = false;
let mazeRows = generateMaze();

const neighboursDiv = document.querySelector("#neighbours");
const frontierDiv = document.querySelector("#frontier");

console.log(neighboursDiv);


const bfs = document.querySelector('#BFS');
bfs.addEventListener('click', e => {
    console.log('hola');
    // remove previous solution path if exists
    // TODO: check this code... classnoma incorrect
    let solutionCells = document.querySelectorAll(".solution");
    if (solutionCells.length != 0) {
        solutionCells.forEach(solutionCell => {
            solutionCell.style.backgroundColor = "#2f4454";
            solutionCell.className = "cell";
        });
    }
    // generate wall array
    let wallArr = getWallArray();
    console.log(wallArr);
    // call the bfs route, passing "MAZE_COLUMNS, mazeRows, start/end state, wall arr
    let data = {
        width: MAZE_COLUMNS,
        height: mazeRows,
        wall: wallArr,
        start: [1, 1], // 5th row 6th column
        end: [4, 4]
    };

    // fetch call
    fetch('/bfs', {
            method: "POST",
            body: JSON.stringify(data),
            cache: "no-cache",
            headers: new Headers({
                "content-type": "application/json"
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            let path = data.path;

            // SEARCH SPACE COVERED BY THE ALGO
            // TODO: display all the paths explored by the algorithm...
            let exploredTracks = data.tracks;
            console.log(exploredTracks);
            let i = 0; // for transition animation delay 
            exploredTracks.forEach(cell => {
                let id = getID(cell)
                console.log(id);
                let e = document.getElementById(id);

                let currentNodeDiv = document.createElement("div");
                currentNodeDiv.className = "active_node";
                currentNodeDiv.id = id + " e" // e for explored?
                    // add event listener 
                currentNodeDiv.addEventListener("click", (e) => {
                    let id = e.target.id;
                    console.log(id);
                    // split the id...
                    let rowCol = id.split(" ")[0].split("-");
                    let row = rowCol[0];
                    let col = rowCol[1];
                    console.log(row, col);

                    // compare the state arr and get the matching obj
                    let arr = [Number(row), Number(col)];

                    exploredTracks.forEach(n => {
                        let state = n.state;
                        if ((state[0] - 1) === arr[0] && (state[1] - 1) === arr[1]) {
                            console.log(n.neighbours);
                            console.log(n.frontier_state);

                            (n.neighbours).forEach(arr => {
                                let x = document.createElement("p");
                                x.innerHTML = arr.toString();
                                neighboursDiv.appendChild(x);
                            });

                            (n.frontier_state).forEach(s => {
                                let x = document.createElement("p");
                                x.innerHTML = s.toString();
                                frontierDiv.appendChild(x);
                            });

                        }
                    });

                }, false);

                e.appendChild(currentNodeDiv);
                setTimeout(function() {
                    currentNodeDiv.classList.add('anim');
                }, 250 * i);
                i = i + 1;
            });

            // SOLUTION CODE
            path.forEach(node => {
                // flask app returns values with 1 indexing
                // so convert to 0 indexing by subtracting 1
                let idRow = node.state[0] - 1
                let idCol = node.state[1] - 1
                let id = idRow + "-" + idCol
                console.log(id);
                // display solution by changing bg-color of the elements
                let nodeEle = document.getElementById(id);
                nodeEle.className = "solution";
                let solDiv = document.createElement("div");
                solDiv.className = "sol_div";
                nodeEle.appendChild(solDiv);
                setTimeout(function() {
                    solDiv.classList.add('anim');
                }, exploredTracks.length * 250);

            });
        })
        .catch((error) => {
            console.log('Error:', error);
        });
});


function getID(node) {
    let idRow = node.state[0] - 1;
    let idCol = node.state[1] - 1;
    let id = idRow + "-" + idCol;
    return id
}

function getNeighbourID(n) {
    let idRow = n[0] - 1;
    let idCol = n[1] - 1;
    let id = idRow + "-" + idCol;
    return id
}

function getWallArray() {
    //get all the elements with class 'wall'
    const wallElements = document.querySelectorAll('.wall');
    let wallArr = new Array(mazeRows).fill(0).map(() => new Array(MAZE_COLUMNS).fill(0));
    console.log(wallArr);
    wallElements.forEach(wallElement => {
        console.log(wallElement.id);
        // id is in the this format  => row-column
        let rowCol = wallElement.id.split('-');
        let row = rowCol[0];
        let col = rowCol[1];
        wallArr[row][col] = 1;
    });
    return wallArr;
}

function generateMaze() {
    // get the reference for the #maze
    var maze = document.querySelector("#maze");
    let mazeWidth = maze.getBoundingClientRect().width;
    let mazeHeight = maze.getBoundingClientRect().height;
    console.log(mazeWidth, mazeHeight);

    let columnWidth = Math.floor(mazeWidth / MAZE_COLUMNS);
    let mazeRows = Math.floor(mazeHeight / columnWidth);
    console.log(columnWidth);
    console.log(mazeRows);

    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    tbl.style.borderCollapse = "collapse";
    var tblBody = document.createElement("tbody");

    tbl.addEventListener('mousedown', e => {
        drawWalls = true;
        console.log("drawWall on")
    });

    tbl.addEventListener('mouseup', e => {
        drawWalls = false;
        console.log("drawWall off")
    });

    // creating all cells
    for (var i = 0; i < mazeRows; i++) {
        // creates a table row
        var row = document.createElement("tr");

        for (var j = 0; j < MAZE_COLUMNS; j++) {
            // Create a <td> element and put the <td> at
            // the end of the table row
            var cell = document.createElement("td");
            cell.style.height = columnWidth.toString() + "px";
            // assign id
            let cell_ID = i.toString() + "-" + j.toString();
            cell.setAttribute("id", cell_ID);
            cell.setAttribute("class", "cell");
            // add listeners
            cell.addEventListener('mouseover', respondMouseMove);
            row.appendChild(cell);
        }
        // add the row to the end of the table body
        tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into #maze
    maze.appendChild(tbl);
    return mazeRows
}


function respondMouseMove(e) {
    // get the id of the element over which mouse is
    if (drawWalls === true) {
        console.log(e.target);
        // improve this logic
        if (e.target.className != "wall") {
            e.target.style.backgroundColor = "#F5F5DC";
            e.target.setAttribute("class", "wall");
        } else {
            e.target.style.backgroundColor = "#2f4454";
            e.target.setAttribute("class", "cell")
        }
    }
}


// //get all the neighbours
//  let neighbours = cell.neighbours;
//  console.log(neighbours);
// neighbours.forEach(neighbour => {
//     console.log(i)
//     let id = getNeighbourID(neighbour);
//     console.log(id);
//     let n_ele = document.getElementById(id);
//     // append a div at lower bottom corner for the neighbour cell
//     let n_div = document.createElement("div");
//     n_div.className = "neighbour_div";
//     // run animation for neighbours
//     n_ele.appendChild(n_div);
//     setTimeout(function() {
//         n_div.classList.add('scale');
//     }, 250 * i);
// });