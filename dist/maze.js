"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maze = void 0;
var generator_1 = require("./generator");
var Maze = /** @class */ (function () {
    function Maze(rows, columns, methodName, targetElement) {
        this.solved = false;
        this.grid = new generator_1.Generator(rows, columns).generate(methodName);
        this.playerPosition = this.findPlayerPosition();
        this.targetElement = targetElement;
        this.rows = rows;
        this.columns = columns;
    }
    Maze.prototype.setWall = function (row, column) {
        this.grid[row][column] = '#';
    };
    Maze.prototype.setStart = function (row, column) {
        this.grid[row][column] = 'S';
    };
    Maze.prototype.setExit = function (row, column) {
        this.grid[row][column] = 'E';
    };
    Maze.prototype.display = function () {
        var highlightedContent = this.grid.map(function (row) {
            return row.map(function (cell) {
                return (cell === 'X') ? "<span class=\"solveHighlight\">".concat(cell, "</span>") :
                    (cell === 'P' || cell === 'E') ? "<span class=\"highlight\">".concat(cell, "</span>") : cell;
            }).join('');
        }).join('\n');
        this.targetElement.innerHTML = highlightedContent;
    };
    Maze.prototype.reset = function () {
        this.grid = this.grid.map(function (row) { return row.map(function (cell) { return (cell === 'X') ? ' ' : cell; }); });
        this.solved = false;
    };
    Maze.prototype.findPlayerPosition = function () {
        for (var row = 0; row < this.grid.length; row++) {
            for (var column = 0; column < this.grid[0].length; column++) {
                if (this.grid[row][column] === 'P') {
                    return { row: row, column: column };
                }
            }
        }
        throw new Error('Player not found');
    };
    Maze.prototype.movePlayer = function (direction) {
        var _a = this.playerPosition, row = _a.row, column = _a.column;
        switch (direction) {
            case 'W':
                if (row > 0 && this.grid[row - 1][column] !== '#') {
                    this.grid[row][column] = ' ';
                    this.playerPosition.row -= 1;
                }
                break;
            case 'A':
                if (column > 0 && this.grid[row][column - 1] !== '#') {
                    this.grid[row][column] = ' ';
                    this.playerPosition.column -= 1;
                }
                break;
            case 'S':
                if (row < this.grid.length - 1 && this.grid[row + 1][column] !== '#') {
                    this.grid[row][column] = ' ';
                    this.playerPosition.row += 1;
                }
                break;
            case 'D':
                if (column < this.grid[0].length - 1 && this.grid[row][column + 1] !== '#') {
                    this.grid[row][column] = ' ';
                    this.playerPosition.column += 1;
                }
                break;
            default:
                break;
        }
        if (this.grid[this.playerPosition.row][this.playerPosition.column] === 'E') {
            alert('You win!');
        }
        this.grid[this.playerPosition.row][this.playerPosition.column] = 'P';
    };
    return Maze;
}());
exports.Maze = Maze;
