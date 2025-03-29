const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');


const seed = Math.floor(Math.random() * 0xFFFFFFFF);

const N = 1, S = 2, E = 4, W = 8;
const IN = 0x10;
const FRONTIER = 0x20;
const OPPOSITE = { [E]: W, [W]: E, [N]: S, [S]: N };

let width = 20;
let height = 20;

let grid = Array.from({ length: height }, () => Array(width).fill(0));
let frontier = [];
let currentStack = [];
let visited = [];
let startX, startY, endX, endY;

const generationMethods = {
    "Prim": generatePrimMaze,
    "Recursive Backtracking": generateRecursiveBacktrackingMaze,
    "Kruskal": generateKruskalMaze
};
let currentMethod = "Prim";

function addFrontier(x, y) {
    if (x >= 0 && y >= 0 && y < height && x < width && grid[y][x] === 0) {
        grid[y][x] |= FRONTIER;
        frontier.push([x, y]);
    }
}

function mark(x, y) {
    grid[y][x] |= IN;
    addFrontier(x - 1, y);
    addFrontier(x + 1, y);
    addFrontier(x, y - 1);
    addFrontier(x, y + 1);
}

function neighbors(x, y) {
    const n = [];
    if (x > 0 && (grid[y][x - 1] & IN)) n.push([x - 1, y]);
    if (x + 1 < width && (grid[y][x + 1] & IN)) n.push([x + 1, y]);
    if (y > 0 && (grid[y - 1][x] & IN)) n.push([x, y - 1]);
    if (y + 1 < height && (grid[y + 1][x] & IN)) n.push([x, y + 1]);
    return n;
}

function direction(fx, fy, tx, ty) {
    if (fx < tx) return E;
    if (fx > tx) return W;
    if (fy < ty) return S;
    if (fy > ty) return N;
}

const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
let cellSize = canvas.width / width;

function drawCell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
}

function empty(cell) {
    return cell === 0 || cell === FRONTIER;
}

function displayMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (y === startY && x === startX) {
                drawCell(x, y, 'green');
            } else if (y === endY && x === endX) {
                drawCell(x, y, 'red');
            } else if (cell & 0x40) {
                drawCell(x, y, 'blue');
            } else if (cell & IN) {
                drawCell(x, y, 'white');
            } 
            
            // Draw walls
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            if (!(cell & N)) {
                ctx.beginPath();
                ctx.moveTo(x * cellSize, y * cellSize);
                ctx.lineTo((x + 1) * cellSize, y * cellSize);
                ctx.stroke();
            }
            if (!(cell & S)) {
                ctx.beginPath();
                ctx.moveTo(x * cellSize, (y + 1) * cellSize);
                ctx.lineTo((x + 1) * cellSize, (y + 1) * cellSize);
                ctx.stroke();
            }
            if (!(cell & E)) {
                ctx.beginPath();
                ctx.moveTo((x + 1) * cellSize, y * cellSize);
                ctx.lineTo((x + 1) * cellSize, (y + 1) * cellSize);
                ctx.stroke();
            }
            if (!(cell & W)) {
                ctx.beginPath();
                ctx.moveTo(x * cellSize, y * cellSize);
                ctx.lineTo(x * cellSize, (y + 1) * cellSize);
                ctx.stroke();
            }
        });
    });
}


startX = Math.floor(Math.random() * width);
startY = Math.floor(Math.random() * height);
do {
    endX = Math.floor(Math.random() * width);
    endY = Math.floor(Math.random() * height);
} while (endX === startX && endY === startY);

mark(startX, startY);
while (frontier.length) {
    const [x, y] = frontier.splice(Math.floor(Math.random() * frontier.length), 1)[0];
    const n = neighbors(x, y);
    const [nx, ny] = n[Math.floor(Math.random() * n.length)];
    const dir = direction(x, y, nx, ny);
    grid[y][x] |= dir;
    grid[ny][nx] |= OPPOSITE[dir];
    mark(x, y);
    displayMaze();
    setTimeout(() => {}, 10);
}

function solve(delay) {
    if (!currentStack.length) {
        visited = Array.from({ length: height }, () => Array(width).fill(false));
        currentStack = [[startX, startY]];
    }

    function step() {
        if (!solving || !currentStack.length) return;
        const [x, y] = currentStack.pop();
        if (x === endX && y === endY) {
            solving = false;
            document.getElementById('solveButton').textContent = 'Solve';
            return;
        }
        if (visited[y][x]) return step();
        visited[y][x] = true;
        grid[y][x] |= 0x40; // Mark as visited

        const directions = [];
        if (x > 0 && !visited[y][x - 1] && (grid[y][x] & W)) directions.push([x - 1, y]);
        if (x + 1 < width && !visited[y][x + 1] && (grid[y][x] & E)) directions.push([x + 1, y]);
        if (y > 0 && !visited[y - 1][x] && (grid[y][x] & N)) directions.push([x, y - 1]);
        if (y + 1 < height && !visited[y + 1][x] && (grid[y][x] & S)) directions.push([x, y + 1]);

        currentStack.push(...directions);
        displayMaze();
        setTimeout(step, delay);
    }

    step();
}

function generatePrimMaze() {
    solving = false;
    solveButton.textContent = 'Solve';
    grid = Array.from({ length: height }, () => Array(width).fill(0));
    frontier = [];
    currentStack = [];
    visited = [];
    startX = Math.floor(Math.random() * width);
    startY = Math.floor(Math.random() * height);
    do {
        endX = Math.floor(Math.random() * width);
        endY = Math.floor(Math.random() * height);
    } while (endX === startX && endY === startY);
    mark(startX, startY);
    while (frontier.length) {
        const [x, y] = frontier.splice(Math.floor(Math.random() * frontier.length), 1)[0];
        const n = neighbors(x, y);
        const [nx, ny] = n[Math.floor(Math.random() * n.length)];
        const dir = direction(x, y, nx, ny);
        grid[y][x] |= dir;
        grid[ny][nx] |= OPPOSITE[dir];
        mark(x, y);
    }
    displayMaze();
}

function generateRecursiveBacktrackingMaze() {
    solving = false;
    solveButton.textContent = 'Solve';
    grid = Array.from({ length: height }, () => Array(width).fill(0));
    currentStack = [];
    visited = [];
    startX = Math.floor(Math.random() * width);
    startY = Math.floor(Math.random() * height);
    do {
        endX = Math.floor(Math.random() * width);
        endY = Math.floor(Math.random() * height);
    } while (endX === startX && endY === startY);

    function carvePassagesFrom(cx, cy) {
        const directions = [N, S, E, W].sort(() => Math.random() - 0.5);
        for (const direction of directions) {
            const nx = cx + (direction === E ? 1 : direction === W ? -1 : 0);
            const ny = cy + (direction === S ? 1 : direction === N ? -1 : 0);
            if (ny >= 0 && ny < height && nx >= 0 && nx < width && grid[ny][nx] === 0) {
                grid[cy][cx] |= direction;
                grid[ny][nx] |= OPPOSITE[direction];
                carvePassagesFrom(nx, ny);
            }
        }
    }

    carvePassagesFrom(startX, startY);
    displayMaze();
}

function generateKruskalMaze() {
    solving = false;
    solveButton.textContent = 'Solve';
    currentStack = [];
    visited = [];
    grid = Array.from({ length: height }, () => Array(width).fill(0));
    const sets = Array.from({ length: height }, () => Array(width).fill(null));
    const edges = [];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            sets[y][x] = { x, y, parent: null };
            sets[y][x].parent = sets[y][x];
            if (x > 0) edges.push([x, y, W]);
            if (y > 0) edges.push([x, y, N]);
        }
    }

    function find(set) {
        if (set.parent !== set) set.parent = find(set.parent);
        return set.parent;
    }

    function union(set1, set2) {
        const root1 = find(set1);
        const root2 = find(set2);
        if (root1 !== root2) root2.parent = root1;
    }

    edges.sort(() => Math.random() - 0.5);

    while (edges.length) {
        const [x, y, direction] = edges.pop();
        const nx = x + (direction === E ? 1 : direction === W ? -1 : 0);
        const ny = y + (direction === S ? 1 : direction === N ? -1 : 0);
        const set1 = sets[y][x];
        const set2 = sets[ny][nx];

        if (find(set1) !== find(set2)) {
            grid[y][x] |= direction;
            grid[ny][nx] |= OPPOSITE[direction];
            union(set1, set2);
        }
    }

    startX = Math.floor(Math.random() * width);
    startY = Math.floor(Math.random() * height);
    do {
        endX = Math.floor(Math.random() * width);
        endY = Math.floor(Math.random() * height);
    } while (endX === startX && endY === startY);

    grid[startY][startX] |= IN;
    grid[endY][endX] |= IN;

    displayMaze();
}

function resizeCanvas() {
    canvas.width = width * cellSize;
    canvas.height = height * cellSize;
}

function generateNewMaze() {
    width = parseInt(widthInput.value, 10);
    height = parseInt(heightInput.value, 10);
    cellSize = canvas.width / width;
    resizeCanvas();
    grid = Array.from({ length: height }, () => Array(width).fill(0));
    generationMethods[currentMethod]();
}

resizeCanvas();

const newMazeButton = document.getElementById('newMazeButton');
newMazeButton.addEventListener('click', generateNewMaze);

const methodSelect = document.getElementById('methodSelect');
methodSelect.addEventListener('change', (event) => {
    currentMethod = event.target.value;
});

displayMaze();