var rows = 8;
var columns = 8;

var currentTile = null;
var otherTile = null; // This will track the empty tile (56.jpg)

var turns = 0;
// Generate an array from 1 to 64
var imgOrder = Array.from({ length: 64 }, (_, i) => i + 1);

// Shuffle the array randomly
imgOrder.sort(() => Math.random() - 0.5);

window.onload = function() {
    let board = document.getElementById("board");

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r + "-" + c; // Assign unique ID
            let imgNumber = imgOrder.shift();
            tile.src = "../img/RE4/" + imgNumber + ".jpg"; // Set image

            tile.draggable = true; // Enable drag
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            board.append(tile);

            // Track the empty tile (56.jpg)
            if (imgNumber === "56") {
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
    if (this.src.includes("56.jpg")) {
        otherTile = this; // Ensure only empty tile is swapped
    }
}

function dragEnd() {
    if (!currentTile || !otherTile) return;

    // Ensure only the empty tile (56.jpg) can be swapped
    if (!otherTile.src.includes("56.jpg")) return;

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
