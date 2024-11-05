import React, { useState } from "react";

type PlayerSetupProps = {
    onStartGame: (playerX: string, playerO: string, symbol: 'X' | 'O') => void;
};

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onStartGame }) => {
    const [playerX, setPlayerX] = useState('');
    const [playerO, setPlayerO] = useState('');
    const [symbol, setSymbol] = useState<'X' | 'O'>('X');

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
                    checked={symbol === 'X'}
                    onChange={() => setSymbol('X')}
                />
                X
            </label>
            
            <label>
                <input
                 type="radio"
                 value="O"
                 checked={symbol === 'O'}
                 onChange={() => setSymbol('O')}
                />
            </label>
            <div>
                <button onClick={handleSubmit}>Iniciar Jogo</button>
            </div>
        </div>
        // <div>
        //     <h2>Configuração dos Jogadores</h2>
        //     <input
        //     type="text"
        //     placeholder="Nome do Jogador 1"
        //     value={playerX}
        //     onChange={(e) => setPlayerX(e.target.value)}
        //     />

        //     <input
        //     type="text"
        //         placeholder="Nome do Jogador 2"
        //         value={playerO}
        //         onChange={(e) => setPlayerO(e.target.value)}
        //     />
        // </div>
        // <label>
        //     <input>
        //     type="radio"
        //     value="x"
        //     checked={symbol === 'X'}
        //     onChange={() => setSymbol('X')}
        //     </input>
        // </label>
    )
}

export default PlayerSetup

