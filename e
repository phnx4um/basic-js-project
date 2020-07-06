[1mdiff --git a/static/css/style.css b/static/css/style.css[m
[1mindex db13afb..6c205ac 100644[m
[1m--- a/static/css/style.css[m
[1m+++ b/static/css/style.css[m
[36m@@ -48,7 +48,8 @@[m [mtable {[m
 }[m
 [m
 td {[m
[31m-    border: thin solid #376e6f;[m
[32m+[m[32m    border: thin solid #407172;[m
[32m+[m[32m    position: relative;[m
 }[m
 [m
 .button {[m
[36m@@ -62,4 +63,13 @@[m [mtd {[m
     font-size: 14px;[m
     margin: 4px 2px;[m
     cursor: pointer;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.neighbour_div {[m
[32m+[m[32m    position: absolute;[m
[32m+[m[32m    top: 0;[m
[32m+[m[32m    right: 0;[m
[32m+[m[32m    height: 20%;[m
[32m+[m[32m    width: 20%;[m
[32m+[m[32m    background-color: azure;[m
 }[m
\ No newline at end of file[m
[1mdiff --git a/static/js/app.js b/static/js/app.js[m
[1mindex a584565..4c95ef2 100644[m
[1m--- a/static/js/app.js[m
[1m+++ b/static/js/app.js[m
[36m@@ -7,11 +7,12 @@[m [mconst bfs = document.querySelector('#BFS');[m
 bfs.addEventListener('click', e => {[m
     console.log('hola');[m
     // remove previous solution path if exists[m
[32m+[m[32m    // TODO: check this code... classnoma incorrect[m
     let solutionCells = document.querySelectorAll(".solution");[m
     if (solutionCells.length != 0) {[m
         solutionCells.forEach(solutionCell => {[m
             solutionCell.style.backgroundColor = "#2f4454";[m
[31m-            solutionCell.className = "cell"[m
[32m+[m[32m            solutionCell.className = "cell";[m
         });[m
     }[m
     // generate wall array[m
[36m@@ -41,6 +42,26 @@[m [mbfs.addEventListener('click', e => {[m
             let path = data.path;[m
             // TODO: display all the paths explored by the algorithm...[m
             console.log(data.tracks)[m
[32m+[m[32m            let exploredTracks = data.tracks[m
[32m+[m[32m            exploredTracks.forEach(cell => {[m
[32m+[m[32m                let id = getID(cell)[m
[32m+[m[32m                console.log(id);[m
[32m+[m[32m                // get the DOM element[m
[32m+[m[32m                let e = document.getElementById(id);[m
[32m+[m[32m                // e.style.backgroundColor = "#90afc5";[m
[32m+[m[32m                // get all the neighbours too[m
[32m+[m[32m                let neighbours = cell.neighbours;[m
[32m+[m[32m                console.log(neighbours)[m
[32m+[m[32m                neighbours.forEach(neighbour => {[m
[32m+[m[32m                    let id = getNeighbourID(neighbour);[m
[32m+[m[32m                    console.log(id);[m
[32m+[m[32m                    let n_ele = document.getElementById(id);[m
[32m+[m[32m                    // append a div at lower bottom corner for the neighbour cell[m
[32m+[m[32m                    n_div = document.createElement("div");[m
[32m+[m[32m                    n_div.className = "neighbour_div"[m
[32m+[m[32m                    n_ele.appendChild(n_div);[m
[32m+[m[32m                });[m
[32m+[m[32m            });[m
             path.forEach(node => {[m
                 // flask app returns values with 1 indexing[m
                 // so convert to 0 indexing by subtracting 1[m
[36m@@ -60,6 +81,21 @@[m [mbfs.addEventListener('click', e => {[m
 [m
 });[m
 [m
[32m+[m
[32m+[m[32mfunction getID(node) {[m
[32m+[m[32m    let idRow = node.state[0] - 1;[m
[32m+[m[32m    let idCol = node.state[1] - 1;[m
[32m+[m[32m    let id = idRow + "-" + idCol;[m
[32m+[m[32m    return id[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mfunction getNeighbourID(n) {[m
[32m+[m[32m    let idRow = n[0] - 1;[m
[32m+[m[32m    let idCol = n[1] - 1;[m
[32m+[m[32m    let id = idRow + "-" + idCol;[m
[32m+[m[32m    return id[m
[32m+[m[32m}[m
[32m+[m
 function getWallArray() {[m
     //get all the elements with class 'wall'[m
     const wallElements = document.querySelectorAll('.wall');[m
[36m@@ -116,9 +152,9 @@[m [mfunction generateMaze() {[m
                 // assign id[m
             let cell_ID = i.toString() + "-" + j.toString()[m
             cell.setAttribute("id", cell_ID);[m
[31m-            cell.setAttribute("class", "cell")[m
[31m-                // add listeners[m
[31m-            cell.addEventListener('mouseover', respondMouseMove)[m
[32m+[m[32m            cell.setAttribute("class", "cell");[m
[32m+[m[32m            // add listeners[m
[32m+[m[32m            cell.addEventListener('mouseover', respondMouseMove);[m
             row.appendChild(cell);[m
         }[m
         // add the row to the end of the table body[m
