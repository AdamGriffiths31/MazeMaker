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

    public generate(methodName: string): string[][] {
        switch (methodName) {
            case 'backtracking':
                return this.backtracking();
            case 'prims':
                return this.primsAlgorithm();
        }
        return this.primsAlgorithm();
    }

    private backtracking(): string[][] {
        this.initializeGrid();

        const startingRow = Math.floor(Math.random() * this.rows);
        const startingColumn = Math.floor(Math.random() * this.columns);

        this.createBacktracking(startingRow, startingColumn);
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

    private createBacktracking(x: number, y: number): void {
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
                this.createBacktracking(nx, ny);
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

    private primsAlgorithm(): string[][] {
        this.initializeGrid();

        const startingRow = Math.floor(Math.random() * this.rows);
        const startingColumn = Math.floor(Math.random() * this.columns);
        this.maze[startingRow][startingColumn] = CellType.Path;

        let frontier = [] as [number, number][];
        frontier.push([startingRow, startingColumn]);
        while (frontier.length > 0) {
            const [x, y] = frontier.pop() as [number, number];
            const neighbors = this.neighbors(x, y);
            if (neighbors.length > 0) {
                const [nX, nY] = neighbors[Math.floor(Math.random() * neighbors.length)];
                this.createCorridor(x, y, nX, nY);
            }

            const newFrontier = this.getFrontier(x, y);
            if (newFrontier.length != 0) {
                for (const [nx, ny] of newFrontier) {
                    frontier.push([nx, ny]);
                }
            }
        }

        this.maze[startingRow][startingColumn] = CellType.Start;
        this.createEnd();

        return this.maze;
    }

    private getFrontier(x: number, y: number): [number, number][] {
        let frontier = [] as [number, number][];
        const directions = [
            [0, 2],
            [2, 0],
            [0, -2],
            [-2, 0]
        ];

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (this.isValidFrontier(nx, ny)) {
                frontier.push([nx, ny]);
            }
        }
        return frontier;
    }

    private neighbors(x: number, y: number): [number, number][] {
        let neighbors: [number, number][] = [];

        const directions = [
            [0, 2],
            [2, 0],
            [0, -2],
            [-2, 0]
        ];

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (this.isValidPassage(nx, ny)) {
                neighbors.push([nx, ny]);
            }
        }

        return neighbors;
    }

    private createCorridor(x: number, y: number, nX: number, nY: number): void {
        const dirX = Math.floor((x + nX) / 2);
        const dirY = Math.floor((y + nY) / 2);

        this.maze[dirX][dirY] = CellType.Path;
        this.maze[x][y] = CellType.Path;
    }

    private isValidPosition(x: number, y: number): boolean {
        return x >= 0 && x < this.rows && y >= 0 && y < this.columns;
    }

    private isValidPassage(x: number, y: number): boolean {
        return this.isValidPosition(x, y) && this.maze[x][y] !== CellType.Wall;
    }

    private isValidFrontier(x: number, y: number): boolean {
        return this.isValidPosition(x, y) && this.maze[x][y] === CellType.Wall;
    }
}