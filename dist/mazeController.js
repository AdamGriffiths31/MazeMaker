"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        var displayButton = document.getElementById('display');
        var resetButton = document.getElementById('reset');
        var dfsButton = document.getElementById('dfs');
        generateButton.addEventListener('click', function () {
            _this.newMaze();
        });
        solveButton.addEventListener('click', function () {
            _this.solveMaze("astar");
        });
        displayButton.addEventListener('click', function () {
            _this.solveMaze("astar", true);
        });
        dfsButton.addEventListener('click', function () {
            _this.solveMaze("dfs");
        });
        resetButton.addEventListener('click', function () {
            _this.maze.reset();
            _this.maze.display();
        });
        document.addEventListener('keydown', function (event) {
            var key = event.key.toUpperCase();
            if (['W', 'A', 'S', 'D'].includes(key)) {
                _this.maze.movePlayer(key);
                _this.maze.display();
            }
        });
    };
    MazeController.prototype.newMaze = function () {
        var rowInputElement = document.getElementById('rows');
        var colInputElement = document.getElementById('columns');
        var values = this.validateRowAndColInput(rowInputElement, colInputElement);
        var methodName = this.getRadioValue();
        this.maze = new maze_1.Maze(values[0], values[1], methodName, this.targetElement);
        this.startMaze();
    };
    MazeController.prototype.getRadioValue = function () {
        var radioButtons = document.getElementsByName('algorithm');
        for (var i = 0; i < radioButtons.length; i++) {
            var radioButton = radioButtons[i];
            if (radioButton.checked) {
                return radioButton.value;
            }
        }
        return 'backtracking';
    };
    MazeController.prototype.validateRowAndColInput = function (rowElement, columnElement) {
        var row = parseInt(rowElement.value, 10) || 0;
        var column = parseInt(columnElement.value, 10) || 0;
        return [row, column];
    };
    MazeController.prototype.startMaze = function () {
        if (this.targetElement && this.maze) {
            this.maze.display();
        }
    };
    MazeController.prototype.solveMaze = function (method, display) {
        if (display === void 0) { display = false; }
        return __awaiter(this, void 0, void 0, function () {
            var solved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new solver_1.MazeSolver(this.maze).solveMaze(method, display)];
                    case 1:
                        solved = _a.sent();
                        if (this.targetElement && solved) {
                            this.maze.grid = solved;
                            this.maze.display();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return MazeController;
}());
exports.MazeController = MazeController;
