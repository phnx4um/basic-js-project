generate_maze()


function generate_maze() {

    // number of columns in the maze
    const MAZE_COLUMNS = 20;

    // get the reference for the #maze
    var maze = document.querySelector("#maze");
    let mazeWidth = maze.getBoundingClientRect().width;
    let mazeHeight = maze.getBoundingClientRect().height;

    let columnWidth = Math.floor(mazeWidth / MAZE_COLUMNS);
    let mazeRows = Math.floor(mazeHeight / columnWidth);

    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    tbl.style.borderCollapse = "collapse";
    var tblBody = document.createElement("tbody");

    // creating all cells
    for (var i = 0; i < mazeRows; i++) {
        // creates a table row
        var row = document.createElement("tr");

        for (var j = 0; j < MAZE_COLUMNS; j++) {
            // Create a <td> element and put the <td> at
            // the end of the table row
            var cell = document.createElement("td");
            cell.style.height = columnWidth.toString() + "px"
            cell.style.border = "thin solid #ccc";

            let cell_ID = i.toString() + "-" + j.toString()
            cell.setAttribute("id", cell_ID);
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