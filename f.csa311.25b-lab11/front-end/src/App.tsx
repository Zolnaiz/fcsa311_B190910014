import React from 'react';
import './App.css';
import { GameState, Cell } from './game';
import BoardCell from './Cell';

interface Props { }

class App extends React.Component<Props, GameState> {
  private initialized: boolean = false;

  constructor(props: Props) {
    super(props);
    this.state = {
      cells: [],
      message: ""
    };
  }

  newGame = async () => {
    const response = await fetch('/newgame');
    const json = await response.json();

    this.setState({
      cells: json['cells'],
      message: json['message']
    });
  }

  undo = async () => {
    const response = await fetch('/undo');
    const json = await response.json();

    this.setState({
      cells: json['cells'],
      message: json['message']
    });
  }

  play(x: number, y: number): React.MouseEventHandler {
    return async (e) => {
      e.preventDefault();

      const response = await fetch(`/play?x=${x}&y=${y}`);
      const json = await response.json();

      this.setState({
        cells: json['cells'],
        message: json['message']
      });
    }
  }

  createCell(cell: Cell, index: number): React.ReactNode {
    if (cell.playable) {
      return (
        <div key={index}>
          <a href='/' onClick={this.play(cell.x, cell.y)}>
            <BoardCell cell={cell}></BoardCell>
          </a>
        </div>
      );
    }

    return (
      <div key={index}>
        <BoardCell cell={cell}></BoardCell>
      </div>
    );
  }

  componentDidMount(): void {
    if (!this.initialized) {
      this.newGame();
      this.initialized = true;
    }
  }

  render(): React.ReactNode {
    return (
      <div>
        <div id="instructions">
          {this.state.message}
        </div>

        <div id="board">
          {this.state.cells.map((cell, i) => this.createCell(cell, i))}
        </div>

        <div id="bottombar">
          <button onClick={this.newGame}>New Game</button>
          <button onClick={this.undo}>Undo</button>
        </div>
      </div>
    );
  }
}

export default App;