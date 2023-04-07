import React, { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { ScoreBoard } from "./components/ScoreBoard";

function App() {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);

  const checkWinner = (board) => {
    for (let index = 0; index < WIN_CONDITIONS.length; index++) {
      const [x, y, z] = WIN_CONDITIONS[index];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  };

  const resetGame = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  const clickHandler = (boxIndex) => {
    const updatedBoard = board.map((value, index) => {
      if (index == boxIndex) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    });
    const winner = checkWinner(updatedBoard);
    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore });
      } else {
        let { xScore } = scores;
        xScore += 1;
        setScores({ ...scores, xScore });
      }
    }

    setBoard(updatedBoard);
    setXPlaying((val) => !val);
  };

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetGame : clickHandler} />
    </div>
  );
}

export default App;
