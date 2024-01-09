import { Generator } from './generator';

export class Maze {
    public grid: string[][];
    public rows: number;
    public columns: number;
    private playerPosition: { row: number; column: number };
    private targetElement: HTMLElement;

    constructor(rows: number, columns: number, methodName: string, targetElement: HTMLElement) {
        this.grid = new Generator(rows, columns).generate(methodName);
        this.playerPosition = this.findPlayerPosition();
        this.targetElement = targetElement;
        this.rows = rows;
        this.columns = columns;
    }

    setWall(row: number, column: number): void {
        this.grid[row][column] = '#';
    }

    setStart(row: number, column: number): void {
        this.grid[row][column] = 'S';
    }

    setExit(row: number, column: number): void {
        this.grid[row][column] = 'E';
    }

    display(): void {
        const highlightedContent = this.grid.map(row =>
            row.map(cell =>
                (cell === 'X') ? `<span class="solveHighlight">${cell}</span>` :
                    (cell === 'P' || cell === 'E') ? `<span class="highlight">${cell}</span>` : cell
            ).join('')
        ).join('\n');

        this.targetElement.innerHTML = highlightedContent;
    }

    reset(): void {
        this.grid = this.grid.map(row => row.map(cell => (cell === 'X') ? ' ' : cell));
    }

    findPlayerPosition(): { row: number; column: number } {
        for (let row = 0; row < this.grid.length; row++) {
            for (let column = 0; column < this.grid[0].length; column++) {
                if (this.grid[row][column] === 'P') {
                    return { row, column };
                }
            }
        }

        throw new Error('Player not found');
    }

    movePlayer(direction: string): void {
        const { row, column } = this.playerPosition;

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
    }
}