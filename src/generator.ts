enum CellType {
    Wall = '#',
    Path = ' ',
    Start = 'P',
    End = 'E',
}

export class Generator {
    private rows: number;
    private columns: number;
    private maze: string[][];

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
        this.maze = new Array(rows).fill(null).map(() => new Array(columns).fill(CellType.Wall));
    }

    generateMaze(): string[][] {
        this.initializeGrid();

        const startingRow = Math.floor(Math.random() * this.rows);
        const startingColumn = Math.floor(Math.random() * this.columns);

        this.createBacktracking (startingRow, startingColumn);
        this.maze[startingRow][startingColumn] = CellType.Start;
        this.createEnd();
        return this.maze;
    }

    private initializeGrid() {
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                this.maze[row][column] = CellType.Wall;
            }
        }
    }

    private createBacktracking (x: number, y: number): void {
        this.maze[x][y] = CellType.Path;
    
        const directions = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0]
        ];
    
        directions.sort(() => Math.random() - 0.5);
    
        for (const [dx, dy] of directions) {
            const nx = x + 2 * dx;
            const ny = y + 2 * dy;
    
            if (nx >= 0 && nx < this.rows && ny >= 0 && ny < this.columns && this.maze[nx][ny] === CellType.Wall) {
                this.maze[x + dx][y + dy] = CellType.Path; 
                this.createBacktracking (nx, ny); 
            }
        }
    }

    private createEnd(): void {
        const endingRow = Math.floor(Math.random() * this.rows);
        const endingColumn = Math.floor(Math.random() * this.columns);

        if (this.maze[endingRow][endingColumn] === CellType.Path) {
            this.maze[endingRow][endingColumn] = CellType.End;
        } else {
            this.createEnd();
        }
    }

    private primsAlgorithm(): void {
        this.initializeGrid();
    }
}