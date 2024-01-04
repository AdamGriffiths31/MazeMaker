export class MazeSolver {
    private grid: string[][];
    private startRow: number;
    private startCol: number;
    private endRow: number;
    private endCol: number;

    constructor(grid: string[][]) {
        this.grid = grid;
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

    private solveRecursive(row: number, col: number): boolean {
        if (!this.isInsideGrid(row, col) || this.grid[row][col] === '#' || this.grid[row][col] === 'X') {
            return false;
        }

        this.grid[row][col] = 'X';

        if (row === this.endRow && col === this.endCol) {
            this.grid[row][col] = 'E';
            return true; 
        }

        if (
            this.solveRecursive(row - 1, col) ||
            this.solveRecursive(row + 1, col) ||
            this.solveRecursive(row, col - 1) ||
            this.solveRecursive(row, col + 1)
        ) {
            return true; 
        }

        this.grid[row][col] = ' '; 
        return false;
    }

    public solveMaze(): string[][] { 
        const found = this.solveRecursive(this.startRow, this.startCol);
        this.grid[this.startRow][this.startCol] = 'P';
        return this.grid;
    }

    public getGrid(): string[][] {
        return this.grid;
    }
}

export default MazeSolver;
