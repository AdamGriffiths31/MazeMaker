import { Maze } from './maze';
import { MazeSolver } from './solver';

export class MazeController {
    private targetElement: HTMLElement;
    private maze: Maze;
  
    constructor() {
      this.targetElement = document.getElementById('maze-display');
      this.initializeButtons();
      this.newMaze();
    }
  
    private initializeButtons() {
      const generateButton = document.getElementById('generate') as HTMLButtonElement;
      const solveButton = document.getElementById('solve') as HTMLButtonElement;
  
      generateButton.addEventListener('click', () => {
        this.newMaze();
      });
  
      solveButton.addEventListener('click', () => {
        this.solveMaze();
      });
    }
  
    private newMaze() {
      const rowInputElement = document.getElementById('rows') as HTMLInputElement;
      const colInputElement = document.getElementById('columns') as HTMLInputElement;
      const values = this.validateRowAndColInput(rowInputElement, colInputElement);
      this.maze = new Maze(values[0], values[1]);
  
      this.startMaze();
    }
  
    private validateRowAndColInput(rowElement: HTMLInputElement, columnElement: HTMLInputElement): [number, number] {
      const row = parseInt(rowElement.value, 10) || 0;
      const column = parseInt(columnElement.value, 10) || 0;
  
      return [row, column];
    }
  
    private startMaze() {
      if (this.targetElement && this.maze) {
        this.maze.display(this.targetElement);
  
        document.addEventListener('keydown', (event) => {
          const key = event.key.toUpperCase();
          if (['W', 'A', 'S', 'D'].includes(key)) {
            this.maze.movePlayer(key);
            this.maze.display(this.targetElement);
          }
        });
      }
    }
  
    private solveMaze() {
      const solved = new MazeSolver(this.maze.grid).solveMaze();
      if (this.targetElement && solved) {
        this.maze.grid = solved;
        this.maze.display(this.targetElement);
      }
    }
  }