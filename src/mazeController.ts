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
    const displayButton = document.getElementById('display') as HTMLButtonElement;
    const resetButton = document.getElementById('reset') as HTMLButtonElement;
    const dfsButton = document.getElementById('dfs') as HTMLInputElement;

    generateButton.addEventListener('click', () => {
      this.newMaze();
    });

    solveButton.addEventListener('click', () => {
      this.solveMaze("astar");
    });

    displayButton.addEventListener('click', () => {
      this.solveMaze("astar",true);
    });

    dfsButton.addEventListener('click', () => {
      this.solveMaze("dfs");
    });

    resetButton.addEventListener('click', () => {
      this.maze.reset();
      this.maze.display();
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key.toUpperCase();
        if (['W', 'A', 'S', 'D'].includes(key)) {
          this.maze.movePlayer(key);
          this.maze.display();
        }
      });

  }

  private newMaze() {
    const rowInputElement = document.getElementById('rows') as HTMLInputElement;
    const colInputElement = document.getElementById('columns') as HTMLInputElement;
    const values = this.validateRowAndColInput(rowInputElement, colInputElement);
    const methodName = this.getRadioValue();
    this.maze = new Maze(values[0], values[1], methodName,this.targetElement);

    this.startMaze();
  }

  private getRadioValue(): string {
    const radioButtons = document.getElementsByName('algorithm');
    for (let i = 0; i < radioButtons.length; i++) {
      const radioButton = radioButtons[i] as HTMLInputElement;
      if (radioButton.checked) {
        return radioButton.value;
      }
    }
    return 'backtracking';
  }

  private validateRowAndColInput(rowElement: HTMLInputElement, columnElement: HTMLInputElement): [number, number] {
    const row = parseInt(rowElement.value, 10) || 0;
    const column = parseInt(columnElement.value, 10) || 0;

    return [row, column];
  }

  private startMaze() {
    if (this.targetElement && this.maze) {
      this.maze.display();
    }
  }

  private async solveMaze(method: string,display: boolean = false) {
    if (this.maze.solved) {
      return;
    }
    const solved = await new MazeSolver(this.maze).solveMaze(method,display);
    if (this.targetElement && solved) {
      this.maze.solved = true;
      this.maze.grid = solved;
      this.maze.display();
    }
  }
}