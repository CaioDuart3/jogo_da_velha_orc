import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Game.css';

type Players = "O" | "X";

interface Marks {
  [key: string]: Players;
}

function Game() {
  const [playerOneSymbol, setPlayerOneSymbol] = useState<Players>("O");
  const [playerTwoSymbol, setPlayerTwoSymbol] = useState<Players>("X");
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
    const nameO = localStorage.getItem('playerOneName') || 'Jogador O';
    const nameX = localStorage.getItem('playerTwoName') || 'Jogador X';
    const symbol1 = localStorage.getItem('playerOneSymbol') as Players || 'O';
    const symbol2 = localStorage.getItem('playerTwoSymbol') as Players || 'X';
    setPlayerOneName(nameO);
    setPlayerTwoName(nameX);
    setPlayerOneSymbol(symbol1);
    setPlayerTwoSymbol(symbol2);
    setTurn(symbol1);
  }, []);

  const play = (index: number) => {
    if (marks[index] || gameOver) {
      return;
    }
    setMarks(prev => ({ ...prev, [index]: turn }));
    setTurn(prev => prev === playerOneSymbol ? playerTwoSymbol : playerOneSymbol);
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
    setTurn(playerOneSymbol);
    setMarks({});
    setWinner(null);
    setDraw(null);
  };

  const resetScore = () => {
    setWinsO(0);
    setWinsX(0);
    reset();
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
      winner === playerOneSymbol ? setWinsO(winsO + 1) : setWinsX(winsX + 1);
    } else if (Object.keys(marks).length === 9) {
      setDraw(true);
    }
  }, [marks, playerOneSymbol, playerTwoSymbol]);

  return (
      <div className='container'>
        <div className='wins'>
          <h2>{playerOneName}: <b className='pts'>{winsO}</b></h2>
        </div>

        <div className='container-board'>
        <div className='btns'>
            <button onClick={returnHome}>Início</button>
            <button onClick={resetScore}>Resetar Placar</button>
          </div>
          <div className='frame'>
            {!gameOver && <h1>Vez de {turn === playerOneSymbol ? playerOneName : playerTwoName}</h1>}
            {winner && <h1>{winner === playerTwoSymbol ? playerTwoName : playerOneName} ganhou!</h1>}
            {draw && <h1>Empate!</h1>}
            <div className={`board ${gameOver ? "gameOver" : ""}`}>
              {getSquares().map((_, i) => (
                  <div key={i} className={`cell ${marks[i]}`} onClick={() => play(i)}>
                    {marks[i]}
                  </div>
              ))}
            </div>
          </div>
          <div className='btns'>{gameOver && <button onClick={reset}>Jogar novamente</button>}</div>

        </div>

        <div className='wins'>
          <h2>{playerTwoName}: <b className='pts'>{winsX}</b></h2>
        </div>
      </div>
  );
}

export default Game;
