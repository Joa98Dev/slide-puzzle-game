var rows = 3;
var columns = 3;

var currentTile = null;
var otherTile = null; // This will track the empty tile (9.jpg)

var turns = 0;
var imgOrder = ["7", "4", "1", "5", "9", "3", "2", "6", "8"]; // 9.jpg is the empty tile

window.onload = function() {
    let board = document.getElementById("board");

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r + "-" + c; // Assign unique ID
            let imgNumber = imgOrder.shift();
            tile.src = "../img/SA2/" + imgNumber + ".jpg"; // Set image

            tile.draggable = true; // Enable drag
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            board.append(tile);

            // Track the empty tile (9.jpg)
            if (imgNumber === "9") {
                otherTile = tile;
            }
        }
    }
};

function dragStart() {
    currentTile = this; // Tile being dragged
}

function dragOver(event) {
    event.preventDefault(); // Allow dropping
}

function dragEnter(event) {
    event.preventDefault(); // Needed for drop to work
}

function dragLeave() {}

function dragDrop() {
    if (this.src.includes("9.jpg")) {
        otherTile = this; // Ensure only empty tile is swapped
    }
}

function dragEnd() {
    if (!currentTile || !otherTile) return;

    // Ensure only the empty tile (9.jpg) can be swapped
    if (!otherTile.src.includes("9.jpg")) return;

    let currentCords = currentTile.id.split("-");
    let r = parseInt(currentCords[0]);
    let c = parseInt(currentCords[1]);

    let otherCords = otherTile.id.split("-");
    let r2 = parseInt(otherCords[0]);
    let c2 = parseInt(otherCords[1]);

    // Check adjacency (horizontal or vertical movement only)
    let isAdjacent = (r === r2 && Math.abs(c - c2) === 1) || (c === c2 && Math.abs(r - r2) === 1);

    if (isAdjacent) {
        // Swap images
        let tempSrc = currentTile.src;
        currentTile.src = otherTile.src;
        otherTile.src = tempSrc;

        // Update the empty tile reference
        otherTile = currentTile;

        // Increment move count
        turns++;
        document.getElementById("turns").innerText = turns;
    }

    // Reset tile references
    currentTile = null;
}
