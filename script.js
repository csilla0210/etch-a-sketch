const canvas = document.querySelector(".canvas");
const canvasSize = document.querySelector("input#c-size");
const blackPencil = document.querySelector("button.draw-black");
const colorPencil = document.querySelector("button.draw-color");
const eraser = document.querySelector("button.eraser");
const clear = document.querySelector("button.clear");

drawCanvas(10,canvas.offsetWidth);

canvasSize.addEventListener("change", () => {
    numOfCells = canvasSize.value;
    clearCanvas(canvas);
    drawCanvas(numOfCells, canvas.offsetWidth);
})

blackPencil.addEventListener("click", () => {
    setAllCells(canvas, "black", changeCellColor);   
})

colorPencil.addEventListener("click", () => {
    setAllCells(canvas, randomColor, changeCellRandomColor);
})
eraser.addEventListener("click", () => {
    setAllCells(canvas, "unset", changeCellColor);
})
clear.addEventListener("click", () => {
    clearAllCells(canvas, "unset", changeCellColor);
})


function setAllCells(canvas, value, callback) {
    const rows = canvas.childNodes;
    rows.forEach((row) => {
        const cells = row.childNodes;
        cells.forEach((cell) => {
            cell.addEventListener("mouseover", function(){
                callback(this, value);
            });
        })
    })
}

function clearAllCells(canvas, value, callback) {
    const rows = canvas.childNodes;
    rows.forEach((row) => {
        const cells = row.childNodes;
        cells.forEach((cell) => {
            callback(cell, value);
        })
    })
}

function changeCellColor(cell, color) {
    cell.style.backgroundColor = color;
    if (color === "unset") {
        cell.style.borderColor = "lightgrey";
    } else {
        cell.style.borderColor = color;
    }
}

function changeCellRandomColor(cell, color) {
    const randomColor = color();
    cell.style.backgroundColor = randomColor;
    cell.style.borderColor = randomColor;
}

function randomColor() {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor;
}


function clearCanvas(canvas) {
    canvas.innerHTML = "";

}

function drawCanvas(numOfCells, canvasWidth) {
    for (let i = 0; i < numOfCells; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        canvas.appendChild(row);
        for(let j = 0; j < numOfCells; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("style", "width: " + canvasWidth / numOfCells + "px;");
            cell.style.height = cell.style.width;
            row.appendChild(cell);
        }
    }
}

