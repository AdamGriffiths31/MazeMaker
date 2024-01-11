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
exports.MazeSolver = void 0;
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue() {
        this._array = [];
    }
    PriorityQueue.prototype.enqueue = function (priority, value) {
        this._array.push({ priority: priority, value: value });
        this._array.sort(function (a, b) { return a.priority - b.priority; });
    };
    PriorityQueue.prototype.dequeue = function () {
        return this._array.shift().value;
    };
    PriorityQueue.prototype.isEmpty = function () {
        return !this._array.length;
    };
    return PriorityQueue;
}());
var Cell = /** @class */ (function () {
    function Cell() {
        this.f = 2147483647;
        this.g = 2147483647;
        this.h = 2147483647;
        this.parent_i = -1;
        this.parent_j = -1;
    }
    return Cell;
}());
var MazeSolver = /** @class */ (function () {
    function MazeSolver(maze) {
        this.grid = maze.grid;
        this.maze = maze;
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
    MazeSolver.prototype.solveRecursive = function (row, col, display, seen) {
        return __awaiter(this, void 0, void 0, function () {
            var key, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        key = "".concat(row, ",").concat(col);
                        if (!this.isInsideGrid(row, col) || this.grid[row][col] === '#' || this.grid[row][col] === 'X' || seen.has(key)) {
                            return [2 /*return*/, false];
                        }
                        if (!display) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.delay(20)];
                    case 1:
                        _d.sent();
                        this.maze.display();
                        _d.label = 2;
                    case 2:
                        seen.add(key);
                        this.grid[row][col] = 'X';
                        if (row === this.endRow && col === this.endCol) {
                            this.grid[row][col] = 'E';
                            return [2 /*return*/, true];
                        }
                        return [4 /*yield*/, this.solveRecursive(row - 1, col, display, seen)];
                    case 3:
                        _c = (_d.sent());
                        if (_c) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.solveRecursive(row + 1, col, display, seen)];
                    case 4:
                        _c = (_d.sent());
                        _d.label = 5;
                    case 5:
                        _b = _c;
                        if (_b) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.solveRecursive(row, col - 1, display, seen)];
                    case 6:
                        _b = (_d.sent());
                        _d.label = 7;
                    case 7:
                        _a = _b;
                        if (_a) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.solveRecursive(row, col + 1, display, seen)];
                    case 8:
                        _a = (_d.sent());
                        _d.label = 9;
                    case 9:
                        if (_a) {
                            return [2 /*return*/, true];
                        }
                        this.grid[row][col] = ' ';
                        return [2 /*return*/, false];
                }
            });
        });
    };
    MazeSolver.prototype.aStarAlgorithmo = function (display) {
        return __awaiter(this, void 0, void 0, function () {
            var start, end, cellDetails, closedList, openList, i, j, directions, current, i, j, _i, directions_1, direction, newDirection, gNew, hNew, fNew;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = [this.startRow, this.startCol];
                        end = [this.endRow, this.endCol];
                        console.log("Start: ".concat(start, " End: ").concat(end));
                        cellDetails = new Array(this.maze.rows);
                        closedList = new Array(this.maze.rows);
                        openList = new PriorityQueue();
                        for (i = 0; i < this.maze.rows; i++) {
                            closedList[i] = new Array(this.maze.columns).fill(false);
                            cellDetails[i] = new Array(this.maze.columns);
                            for (j = 0; j < this.maze.columns; j++) {
                                cellDetails[i][j] = new Cell();
                            }
                        }
                        cellDetails[start[0]][start[1]].f = 0;
                        cellDetails[start[0]][start[1]].g = 0;
                        cellDetails[start[0]][start[1]].h = 0;
                        cellDetails[start[0]][start[1]].parent_i = start[0];
                        cellDetails[start[0]][start[1]].parent_j = start[1];
                        directions = [
                            [-1, 0],
                            [1, 0],
                            [0, 1],
                            [0, -1],
                        ];
                        openList.enqueue(0, start);
                        _a.label = 1;
                    case 1:
                        if (!!openList.isEmpty()) return [3 /*break*/, 7];
                        current = openList.dequeue();
                        i = current[0];
                        j = current[1];
                        closedList[i][j] = true;
                        _i = 0, directions_1 = directions;
                        _a.label = 2;
                    case 2:
                        if (!(_i < directions_1.length)) return [3 /*break*/, 6];
                        direction = directions_1[_i];
                        newDirection = [i + direction[0], j + direction[1]];
                        if (!this.isInsideGrid(newDirection[0], newDirection[1])) return [3 /*break*/, 5];
                        if (!this.isEnd(newDirection[0], newDirection[1], end)) return [3 /*break*/, 4];
                        cellDetails[newDirection[0]][newDirection[1]].parent_i = i;
                        cellDetails[newDirection[0]][newDirection[1]].parent_j = j;
                        return [4 /*yield*/, this.tracePath(cellDetails, end, display)];
                    case 3:
                        _a.sent();
                        this.grid[this.startRow][this.startCol] = 'P';
                        this.grid[this.endRow][this.endCol] = 'E';
                        return [2 /*return*/, true];
                    case 4:
                        if (!closedList[newDirection[0]][newDirection[1]] && this.grid[newDirection[0]][newDirection[1]] === " ") {
                            gNew = cellDetails[i][j].g + 1;
                            hNew = this.calculateHValue(newDirection[0], newDirection[1], end);
                            fNew = gNew + hNew;
                            if (cellDetails[newDirection[0]][newDirection[1]].f == 2147483647 || cellDetails[newDirection[0]][newDirection[1]].f > fNew) {
                                openList.enqueue(fNew, newDirection);
                                cellDetails[newDirection[0]][newDirection[1]].f = fNew;
                                cellDetails[newDirection[0]][newDirection[1]].g = gNew;
                                cellDetails[newDirection[0]][newDirection[1]].h = hNew;
                                cellDetails[newDirection[0]][newDirection[1]].parent_i = i;
                                cellDetails[newDirection[0]][newDirection[1]].parent_j = j;
                            }
                        }
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 1];
                    case 7: return [2 /*return*/, false];
                }
            });
        });
    };
    MazeSolver.prototype.tracePath = function (cellDetails, end, delay) {
        return __awaiter(this, void 0, void 0, function () {
            var row, col, temp_row, temp_col;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        row = end[0];
                        col = end[1];
                        _a.label = 1;
                    case 1:
                        if (!!(cellDetails[row][col].parent_i == row && cellDetails[row][col].parent_j == col)) return [3 /*break*/, 4];
                        this.grid[row][col] = 'X';
                        if (!delay) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.delay(20)];
                    case 2:
                        _a.sent();
                        this.maze.display();
                        _a.label = 3;
                    case 3:
                        temp_row = cellDetails[row][col].parent_i;
                        temp_col = cellDetails[row][col].parent_j;
                        row = temp_row;
                        col = temp_col;
                        return [3 /*break*/, 1];
                    case 4:
                        this.grid[row][col] = 'P';
                        return [2 /*return*/];
                }
            });
        });
    };
    MazeSolver.prototype.calculateHValue = function (row, col, end) {
        return Math.sqrt(Math.pow(row - end[0], 2) + Math.pow(col - end[1], 2));
    };
    MazeSolver.prototype.isEnd = function (row, col, end) {
        return row === end[0] && col === end[1];
    };
    MazeSolver.prototype.solveMaze = function (method, display) {
        return __awaiter(this, void 0, void 0, function () {
            var found, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        found = false;
                        _a = method;
                        switch (_a) {
                            case "dfs": return [3 /*break*/, 1];
                            case "astar": return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.solveRecursive(this.startRow, this.startCol, display, new Set())];
                    case 2:
                        found = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.aStarAlgorithmo(display)];
                    case 4:
                        found = _b.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        this.grid[this.startRow][this.startCol] = 'P';
                        return [2 /*return*/, this.grid];
                }
            });
        });
    };
    MazeSolver.prototype.delay = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    MazeSolver.prototype.getGrid = function () {
        return this.grid;
    };
    return MazeSolver;
}());
exports.MazeSolver = MazeSolver;
exports.default = MazeSolver;
