import React, { useState } from "react";

type PlayerSetupProps = {
    onStartGame: (playerX: string, playerO: string, symbol: "X" | "O") => void;
};

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onStartGame }) => {
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [symbol, setSymbol] = useState<"X" | "O">("X");

  const handleSubmit = () => {
    if (playerX && playerO) {
      onStartGame(playerX, playerO, symbol);
    }
  };

  return (
    <div>
      <div>
        <h2>Configuração dos Jogadores</h2>
        <input
          type="text"
          placeholder="Nome do Jogador 1"
          value={playerX}
          onChange={(e) => setPlayerX(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nome do Jogador 2"
          value={playerO}
          onChange={(e) => setPlayerO(e.target.value)}
        />
      </div>
      <label>
        <input
          type="radio"
          value="X"
          checked={symbol === "X"}
          onChange={() => setSymbol("X")}
        />
        X
      </label>

      <label>
        <input
          type="radio"
          value="O"
          checked={symbol === "O"}
          onChange={() => setSymbol("O")}
        />
      </label>
      <div>
        <button onClick={handleSubmit}>Iniciar Jogo</button>
      </div>
    </div>
  );
};

export default PlayerSetup;




{/* import { useState } from 'react';
import PlayerSetup from './Register';

function Setup() {
    // Adicione o estado para o nome dos jogadores e a tela de configuração
    const [playerXName, setPlayerXName] = useState<string | null>(null);
    const [playerOName, setPlayerOName] = useState<string | null>(null);
    const [symbol, setSymbol] = useState<'X' | 'O'>('X');
    
    // Função para iniciar o jogo com os nomes dos jogadores
    const startGame = (playerX: string, playerO: string, chosenSymbol: 'X' | 'O') => {
        setPlayerXName(playerX);
        setPlayerOName(playerO);
        setSymbol(chosenSymbol);
    };
    
    // Renderização condicional para mostrar a tela de cadastro ou o jogo
    if (playerXName && playerOName) {
        return ( 
            <div className="App">
                </div>
            );
        } else {
            return (
                <div>
                    <PlayerSetup onStartGame={startGame} />
                </div>
            );
        }
    }
    
    export default Setup;
     */}