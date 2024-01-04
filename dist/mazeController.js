"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MazeController = void 0;
var maze_1 = require("./maze");
var solver_1 = require("./solver");
var MazeController = /** @class */ (function () {
    function MazeController() {
        this.targetElement = document.getElementById('maze-display');
        this.initializeButtons();
        this.newMaze();
    }
    MazeController.prototype.initializeButtons = function () {
        var _this = this;
        var generateButton = document.getElementById('generate');
        var solveButton = document.getElementById('solve');
        generateButton.addEventListener('click', function () {
            _this.newMaze();
        });
        solveButton.addEventListener('click', function () {
            _this.solveMaze();
        });
    };
    MazeController.prototype.newMaze = function () {
        var rowInputElement = document.getElementById('rows');
        var colInputElement = document.getElementById('columns');
        var values = this.validateRowAndColInput(rowInputElement, colInputElement);
        this.maze = new maze_1.Maze(values[0], values[1]);
        this.startMaze();
    };
    MazeController.prototype.validateRowAndColInput = function (rowElement, columnElement) {
        var row = parseInt(rowElement.value, 10) || 0;
        var column = parseInt(columnElement.value, 10) || 0;
        return [row, column];
    };
    MazeController.prototype.startMaze = function () {
        var _this = this;
        if (this.targetElement && this.maze) {
            this.maze.display(this.targetElement);
            document.addEventListener('keydown', function (event) {
                var key = event.key.toUpperCase();
                if (['W', 'A', 'S', 'D'].includes(key)) {
                    _this.maze.movePlayer(key);
                    _this.maze.display(_this.targetElement);
                }
            });
        }
    };
    MazeController.prototype.solveMaze = function () {
        var solved = new solver_1.MazeSolver(this.maze.grid).solveMaze();
        if (this.targetElement && solved) {
            this.maze.grid = solved;
            this.maze.display(this.targetElement);
        }
    };
    return MazeController;
}());
exports.MazeController = MazeController;
