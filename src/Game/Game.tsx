import { useState, useEffect } from 'react';
import './Game.css'

type Players = "O" | "X";

interface Marks {
  [key: string]: Players;
}

function Game() { 

  const [turn, setTurn] = useState<Players>("O");
  const [winner, setWinner] = useState<Players | null> (null);
  const [draw, setDraw] = useState<boolean | null> (null);
  const [marks, setMarks ] = useState<Marks>({}); //! trocar
  const [winsO, setWinsO] = useState(0);
  const [winsX, setWinsX] = useState(0);  
  const gameOver = !!winner || !!draw;

  /*
  "key": "player",
  "1": "O",
  "2": "X",
  */

  const play = (index:number) => {

    if(marks[index] || gameOver){
      return;
    }

    setMarks( prev => ({...prev, [index]:turn})); //! trocar
    setTurn(prev => prev === "O" ? "X" : "O" );
  };

  const getSquares = () => {
    return new Array(9).fill(true);
  };

  const getCellPlayer = (index: number) => {
    if(!marks[index]) return;
    return marks[index];
  }

  const getWinner = () => {
    const victoryLines = [
      [0, 1, 2],
      [3, 4 ,5],
      [6, 7, 8],

      [0, 4 ,8],
      [2, 4 ,6],
      [0, 3 ,6],

      [1, 4 ,7],
      [2, 5 ,8],

    ]

    for (const line of victoryLines){
      const [a, b, c] = line;

      if  (marks[a] && marks[a] === marks[b] && marks[a] === marks[c]){
        return marks[a];
      }
    }
  }

  const reset = () =>{
    setTurn(marks[0] === "O" ? "X" : "O");
    setMarks({});
    setWinner(null);
    setDraw(null);
  }

  useEffect(() => {
    const winner = getWinner()

    if (winner){
      setWinner(winner)
      if (winner === "O") {
        setWinsO((prevWinsO) => prevWinsO + 1);
      } else {
        setWinsX((prevWinsX) => prevWinsX + 1);
      }
    } else{
      if (Object.keys(marks).length === 9){
        setDraw(true)
      }
    }
  }, [marks])

  return (
    <div className='container'>
        <div className='wins'>
          <h2>Jogador X: {winsX}</h2>
        </div>
      <div className='container-board'>
        { winner && <h1>Jogador {winner} ganhou! </h1>}
        {draw && <h1>Empate!</h1>}
        {gameOver && <button onClick={reset}>Jogar novamente</button>}
          {!gameOver && <h1>Vez de {turn}</h1>}
          <div className='frame'>
            <div className={`board ${gameOver ? "gameOver": null}`}>
              {getSquares().map(( _ , i)=>( // pesquisar map()
                  <div className={` cell ${getCellPlayer(i)}`} onClick={()=> play(i)}>
                      {marks[i]}
                  </div>
              ))}
            </div>
          </div>
      </div>
        <div className='wins'>
          <h2>Jogador O: {winsO}</h2>
        </div>
    </div>

  )
}

export default Game
