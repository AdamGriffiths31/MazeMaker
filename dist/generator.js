"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
var CellType;
(function (CellType) {
    CellType["Wall"] = "#";
    CellType["Path"] = " ";
    CellType["Start"] = "P";
    CellType["End"] = "E";
})(CellType || (CellType = {}));
var Generator = /** @class */ (function () {
    function Generator(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.maze = new Array(rows).fill(null).map(function () { return new Array(columns).fill(CellType.Wall); });
    }
    Generator.prototype.generate = function (methodName) {
        switch (methodName) {
            case 'backtracking':
                return this.backtracking();
            case 'prims':
                return this.primsAlgorithm();
        }
        return this.primsAlgorithm();
    };
    Generator.prototype.backtracking = function () {
        this.initializeGrid();
        var startingRow = Math.floor(Math.random() * this.rows);
        var startingColumn = Math.floor(Math.random() * this.columns);
        this.createBacktracking(startingRow, startingColumn);
        this.maze[startingRow][startingColumn] = CellType.Start;
        this.createEnd();
        return this.maze;
    };
    Generator.prototype.initializeGrid = function () {
        for (var row = 0; row < this.rows; row++) {
            for (var column = 0; column < this.columns; column++) {
                this.maze[row][column] = CellType.Wall;
            }
        }
    };
    Generator.prototype.createBacktracking = function (x, y) {
        this.maze[x][y] = CellType.Path;
        var directions = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0]
        ];
        directions.sort(function () { return Math.random() - 0.5; });
        for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
            var _a = directions_1[_i], dx = _a[0], dy = _a[1];
            var nx = x + 2 * dx;
            var ny = y + 2 * dy;
            if (nx >= 0 && nx < this.rows && ny >= 0 && ny < this.columns && this.maze[nx][ny] === CellType.Wall) {
                this.maze[x + dx][y + dy] = CellType.Path;
                this.createBacktracking(nx, ny);
            }
        }
    };
    Generator.prototype.createEnd = function () {
        var endingRow = Math.floor(Math.random() * this.rows);
        var endingColumn = Math.floor(Math.random() * this.columns);
        if (this.maze[endingRow][endingColumn] === CellType.Path) {
            this.maze[endingRow][endingColumn] = CellType.End;
        }
        else {
            this.createEnd();
        }
    };
    Generator.prototype.primsAlgorithm = function () {
        this.initializeGrid();
        var startingRow = Math.floor(Math.random() * this.rows);
        var startingColumn = Math.floor(Math.random() * this.columns);
        this.maze[startingRow][startingColumn] = CellType.Path;
        var frontier = [];
        frontier.push([startingRow, startingColumn]);
        while (frontier.length > 0) {
            var _a = frontier.pop(), x = _a[0], y = _a[1];
            var neighbors = this.neighbors(x, y);
            if (neighbors.length > 0) {
                var _b = neighbors[Math.floor(Math.random() * neighbors.length)], nX = _b[0], nY = _b[1];
                this.createCorridor(x, y, nX, nY);
            }
            var newFrontier = this.getFrontier(x, y);
            if (newFrontier.length != 0) {
                for (var _i = 0, newFrontier_1 = newFrontier; _i < newFrontier_1.length; _i++) {
                    var _c = newFrontier_1[_i], nx = _c[0], ny = _c[1];
                    frontier.push([nx, ny]);
                }
            }
        }
        this.maze[startingRow][startingColumn] = CellType.Start;
        this.createEnd();
        return this.maze;
    };
    Generator.prototype.getFrontier = function (x, y) {
        var frontier = [];
        var directions = [
            [0, 2],
            [2, 0],
            [0, -2],
            [-2, 0]
        ];
        for (var _i = 0, directions_2 = directions; _i < directions_2.length; _i++) {
            var _a = directions_2[_i], dx = _a[0], dy = _a[1];
            var nx = x + dx;
            var ny = y + dy;
            if (this.isValidFrontier(nx, ny)) {
                frontier.push([nx, ny]);
            }
        }
        return frontier;
    };
    Generator.prototype.neighbors = function (x, y) {
        var neighbors = [];
        var directions = [
            [0, 2],
            [2, 0],
            [0, -2],
            [-2, 0]
        ];
        for (var _i = 0, directions_3 = directions; _i < directions_3.length; _i++) {
            var _a = directions_3[_i], dx = _a[0], dy = _a[1];
            var nx = x + dx;
            var ny = y + dy;
            if (this.isValidPassage(nx, ny)) {
                neighbors.push([nx, ny]);
            }
        }
        return neighbors;
    };
    Generator.prototype.createCorridor = function (x, y, nX, nY) {
        var dirX = Math.floor((x + nX) / 2);
        var dirY = Math.floor((y + nY) / 2);
        this.maze[dirX][dirY] = CellType.Path;
        this.maze[x][y] = CellType.Path;
    };
    Generator.prototype.isValidPosition = function (x, y) {
        return x >= 0 && x < this.rows && y >= 0 && y < this.columns;
    };
    Generator.prototype.isValidPassage = function (x, y) {
        return this.isValidPosition(x, y) && this.maze[x][y] !== CellType.Wall;
    };
    Generator.prototype.isValidFrontier = function (x, y) {
        return this.isValidPosition(x, y) && this.maze[x][y] === CellType.Wall;
    };
    return Generator;
}());
exports.Generator = Generator;
