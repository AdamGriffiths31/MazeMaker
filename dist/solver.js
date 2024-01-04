"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MazeSolver = void 0;
var MazeSolver = /** @class */ (function () {
    function MazeSolver(grid) {
        this.grid = grid;
        this.findStartAndEnd();
    }
    MazeSolver.prototype.findStartAndEnd = function () {
        for (var row = 0; row < this.grid.length; row++) {
            for (var col = 0; col < this.grid[row].length; col++) {
                if (this.grid[row][col] === 'P') {
                    this.startRow = row;
                    this.startCol = col;
                }
                else if (this.grid[row][col] === 'E') {
                    this.endRow = row;
                    this.endCol = col;
                }
            }
        }
    };
    MazeSolver.prototype.isInsideGrid = function (row, col) {
        return row >= 0 && row < this.grid.length && col >= 0 && col < this.grid[0].length;
    };
    MazeSolver.prototype.solveRecursive = function (row, col) {
        if (!this.isInsideGrid(row, col) || this.grid[row][col] === '#' || this.grid[row][col] === 'X') {
            return false;
        }
        this.grid[row][col] = 'X';
        if (row === this.endRow && col === this.endCol) {
            this.grid[row][col] = 'E';
            return true;
        }
        if (this.solveRecursive(row - 1, col) ||
            this.solveRecursive(row + 1, col) ||
            this.solveRecursive(row, col - 1) ||
            this.solveRecursive(row, col + 1)) {
            return true;
        }
        this.grid[row][col] = ' ';
        return false;
    };
    MazeSolver.prototype.solveMaze = function () {
        var found = this.solveRecursive(this.startRow, this.startCol);
        this.grid[this.startRow][this.startCol] = 'P';
        return this.grid;
    };
    MazeSolver.prototype.getGrid = function () {
        return this.grid;
    };
    return MazeSolver;
}());
exports.MazeSolver = MazeSolver;
exports.default = MazeSolver;
