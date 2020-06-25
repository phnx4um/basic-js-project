let drawWalls = false;

generate_maze()


function generate_maze() {

    // number of columns in the maze
    const MAZE_COLUMNS = 23;

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
            cell.style.height = columnWidth.toString() + "px"
                // assign id
            let cell_ID = i.toString() + "-" + j.toString()
            cell.setAttribute("id", cell_ID);
            cell.setAttribute("class", "cell")
                // add listeners
            cell.addEventListener('mouseover', respondMouseMove)
            row.appendChild(cell);
        }
        // add the row to the end of the table body
        tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into #maze
    maze.appendChild(tbl);
}


function respondMouseMove(e) {
    // get the id of the element over which mouse is
    if (drawWalls === true) {
        console.log(e.target);
        // improve this logic
        if (e.target.className != "wall") {
            e.target.style.backgroundColor = "#C06C84";
            e.target.setAttribute("class", "wall");
        } else {
            e.target.style.backgroundColor = "#355C7D";
            e.target.setAttribute("class", "cell")
        }
    }
}