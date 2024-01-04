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
    Generator.prototype.generateMaze = function () {
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
    };
    return Generator;
}());
exports.Generator = Generator;
