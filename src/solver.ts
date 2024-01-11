import { Maze } from "./maze";
class PriorityQueue {
    private _array: any[];

    constructor() {
        this._array = [];
    }

    enqueue(priority: number, value: any): void {
        this._array.push({priority, value});
        this._array.sort((a, b) => a.priority - b.priority);
    }

    dequeue(): any {
        return this._array.shift().value;
    }

    isEmpty(): boolean {
        return !this._array.length;
    }
}

class Cell {
    f: number;
    g: number;
    h: number;
    parent_i: number;
    parent_j: number;

    constructor() {
        this.f = 2147483647;
        this.g = 2147483647;
        this.h = 2147483647;
        this.parent_i = -1;
        this.parent_j = -1;
    }
}

export class MazeSolver {
    private grid: string[][];
    private startRow: number;
    private startCol: number;
    private endRow: number;
    private endCol: number;
    private maze: Maze;

    constructor(maze: Maze) {
        this.grid = maze.grid;
        this.maze = maze;
        this.findStartAndEnd();
    }

    private findStartAndEnd(): void {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[row].length; col++) {
                if (this.grid[row][col] === 'P') {
                    this.startRow = row;
                    this.startCol = col;
                } else if (this.grid[row][col] === 'E') {
                    this.endRow = row;
                    this.endCol = col;
                }
            }
        }
    }

    private isInsideGrid(row: number, col: number): boolean {
        return row >= 0 && row < this.grid.length && col >= 0 && col < this.grid[0].length;
    }

    private async solveRecursive(row: number, col: number, display: boolean, seen: Set<string>): Promise<boolean> {
        const key = `${row},${col}`;
        if (!this.isInsideGrid(row, col) || this.grid[row][col] === '#' || this.grid[row][col] === 'X' || seen.has(key)) {
            return false;
        }

        if (display) {
            await this.delay(20);
            this.maze.display();
        }
        seen.add(key);
        this.grid[row][col] = 'X';

        if (row === this.endRow && col === this.endCol) {
            this.grid[row][col] = 'E';
            return true;
        }

        if (
            await this.solveRecursive(row - 1, col, display, seen) ||
            await this.solveRecursive(row + 1, col, display, seen) ||
            await this.solveRecursive(row, col - 1, display, seen) ||
            await this.solveRecursive(row, col + 1, display, seen)
        ) {
            return true;
        }

        this.grid[row][col] = ' ';
        return false;
    }

    public async aStarAlgorithmo(display: boolean): Promise<boolean> {
        const start = [this.startRow, this.startCol] as [number, number];
        const end = [this.endRow, this.endCol] as [number, number];
        console.log(`Start: ${start} End: ${end}`);

        let cellDetails: Cell[][] = new Array(this.maze.rows);
        let closedList: boolean[][] = new Array(this.maze.rows);
        let openList: PriorityQueue = new PriorityQueue();

        for (let i = 0; i < this.maze.rows; i++) {
            closedList[i] = new Array(this.maze.columns).fill(false);
            cellDetails[i] = new Array(this.maze.columns);
            for (let j = 0; j < this.maze.columns; j++) {
                cellDetails[i][j] = new Cell();
            }
        }

        cellDetails[start[0]][start[1]].f = 0;
        cellDetails[start[0]][start[1]].g = 0;
        cellDetails[start[0]][start[1]].h = 0;
        cellDetails[start[0]][start[1]].parent_i = start[0];
        cellDetails[start[0]][start[1]].parent_j = start[1];

        const directions = [
            [-1, 0],
            [1, 0],
            [0, 1],
            [0, -1],
        ];

        openList.enqueue(0, start);

        while (!openList.isEmpty()) {
            const current: [number, number] = openList.dequeue();
            const i = current[0];
            const j = current[1];
            closedList[i][j] = true;

            for (const direction of directions) {
                const newDirection = [i + direction[0], j + direction[1]] as [number, number];

                if (this.isInsideGrid(newDirection[0], newDirection[1])) {
                    if (this.isEnd(newDirection[0], newDirection[1], end)) {
                        cellDetails[newDirection[0]][newDirection[1]].parent_i = i;
                        cellDetails[newDirection[0]][newDirection[1]].parent_j = j;
                        await this.tracePath(cellDetails, end, display);
                        this.grid[this.startRow][this.startCol] = 'P';
                        this.grid[this.endRow][this.endCol] = 'E';
                        return true;
                    }
                    if (!closedList[newDirection[0]][newDirection[1]] && this.grid[newDirection[0]][newDirection[1]] === " ") {
                        const gNew = cellDetails[i][j].g + 1;
                        const hNew = this.calculateHValue(newDirection[0], newDirection[1], end);
                        const fNew = gNew + hNew;

                        if (cellDetails[newDirection[0]][newDirection[1]].f == 2147483647 || cellDetails[newDirection[0]][newDirection[1]].f > fNew) {
                            openList.enqueue(fNew, newDirection);
                            cellDetails[newDirection[0]][newDirection[1]].f = fNew;
                            cellDetails[newDirection[0]][newDirection[1]].g = gNew;
                            cellDetails[newDirection[0]][newDirection[1]].h = hNew;
                            cellDetails[newDirection[0]][newDirection[1]].parent_i = i;
                            cellDetails[newDirection[0]][newDirection[1]].parent_j = j;
                        }
                    }
                }
            }
        }
        return false
    }

    private async tracePath(cellDetails: Cell[][], end: [number, number], delay: boolean): Promise<void> {
        let row = end[0];
        let col = end[1];

        while (!(cellDetails[row][col].parent_i == row && cellDetails[row][col].parent_j == col)) {
            this.grid[row][col] = 'X';
            if (delay) {
                await this.delay(20);
                this.maze.display();
            }
            const temp_row = cellDetails[row][col].parent_i;
            const temp_col = cellDetails[row][col].parent_j;
            row = temp_row;
            col = temp_col;
        }
        this.grid[row][col] = 'P';
    }
    private calculateHValue(row: number, col: number, end: [number, number]): number {
        return Math.sqrt(Math.pow(row - end[0], 2) + Math.pow(col - end[1], 2));
    }

    private isEnd(row: number, col: number, end: [number, number]): boolean {
        return row === end[0] && col === end[1];
    }

    public async solveMaze(method: string, display: boolean): Promise<string[][]> {
        let found = false;
        switch (method) {
            case "dfs":
                found = await this.solveRecursive(this.startRow, this.startCol, display, new Set());
                break;
            case "astar":
                found = await this.aStarAlgorithmo(display);
                break;
        }
        this.grid[this.startRow][this.startCol] = 'P';
        return this.grid;
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public getGrid(): string[][] {
        return this.grid;
    }
}

export default MazeSolver;
