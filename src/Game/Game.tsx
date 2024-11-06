import { useState, useEffect } from 'react';
import './Game.css';
import {useNavigate} from "react-router-dom";

type Players = "O" | "X";

interface Marks {
  [key: string]: Players;
}

function Game() {
  const [turn, setTurn] = useState<Players>("O");
  const [winner, setWinner] = useState<Players | null>(null);
  const [draw, setDraw] = useState<boolean | null>(null);
  const [marks, setMarks] = useState<Marks>({});
  const [winsO, setWinsO] = useState(0);
  const [winsX, setWinsX] = useState(0);
  const [playerOneName, setPlayerOneName] = useState('');
  const [playerTwoName, setPlayerTwoName] = useState('');
  const gameOver = !!winner || !!draw;
  const navigate = useNavigate();


  useEffect(() => {
    const nameO = localStorage.getItem('playerOneName');
    const nameX = localStorage.getItem('playerTwoName');
    setPlayerOneName(`${nameO} O` || 'Jogador O');
    setPlayerTwoName(`${nameX} X` || 'Jogador X');
  }, []);

  const play = (index: number) => {
    if (marks[index] || gameOver) {
      return;
    }

    setMarks(prev => ({ ...prev, [index]: turn }));
    setTurn(prev => prev === "O" ? "X" : "O");
  };

  const getSquares = () => new Array(9).fill(null);

  const getWinner = () => {
    const victoryLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 4, 8], [2, 4, 6], [0, 3, 6],
      [1, 4, 7], [2, 5, 8],
    ];

    for (const line of victoryLines) {
      const [a, b, c] = line;
      if (marks[a] && marks[a] === marks[b] && marks[a] === marks[c]) {
        return marks[a];
      }
    }
  };

  const reset = () => {
    setTurn("O");
    setMarks({});
    setWinner(null);
    setDraw(null);
  };

  const resetScore = () => {
    setWinsO(0);
    setWinsX(0);
  
    setTurn(marks[0] === "O" ? "X" : "O");
    setMarks({});
    setWinner(null);
    setDraw(null);
  }

  const returnHome = () => {
    localStorage.removeItem('playerOneName');
    localStorage.removeItem('playerTwoName');
    navigate('/');

  }

  useEffect(() => {
    const winner = getWinner();
    if (winner) {
      setWinner(winner);
      winner === "O" ? setWinsO(winsO + 1) : setWinsX(winsX + 1);
    } else if (Object.keys(marks).length === 9) {
      setDraw(true);
    }
  }, [marks]);

  return (
      <div className='container'>
        <div className='wins'>
          <h2>{playerTwoName}: {winsX}</h2>
        </div>
        <div className='container-board'>
          {winner && <h1>{winner === "X" ? playerTwoName : playerOneName} ganhou!</h1>}
          {draw && <h1>Empate!</h1>}
          {gameOver && <button onClick={reset}>Jogar novamente</button>}
          {!gameOver && <h1>Vez de {turn === "O" ? playerOneName : playerTwoName}</h1>}
          <div className='frame'>
            <div className={`board ${gameOver ? "gameOver" : ""}`}>
              {getSquares().map((_, i) => (
                  <div key={i} className={`cell ${marks[i]}`} onClick={() => play(i)}>
                    {marks[i]}
                  </div>
              ))}
            </div>
          </div>

          <div className='end'>
            <button onClick={returnHome}>Home</button>
            <button onClick={resetScore}>Resetar Placar</button>
          </div>
        </div>
        <h2>{playerOneName}: {winsO}</h2>
      </div>
  );
}

export default Game;
