import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
    const [playerOneName, setPlayerOneName] = useState<string>('');
    const [playerTwoName, setPlayerTwoName] = useState<string>('');
    const [playerOneSymbol, setPlayerOneSymbol] = useState<string>('X');
    const [playerTwoSymbol, setPlayerTwoSymbol] = useState<string>('O');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (playerOneSymbol === playerTwoSymbol) {
            alert('Os símbolos dos jogadores devem ser diferentes.');
            return;
        }

        if (playerOneName.length > 20 || playerTwoName.length > 20) {
            alert('Os nomes podem ter somente até 20 caracteres.');
            return;
        }

        localStorage.setItem('playerOneName', playerOneName);
        localStorage.setItem('playerTwoName', playerTwoName);
        localStorage.setItem('playerOneSymbol', playerOneSymbol);
        localStorage.setItem('playerTwoSymbol', playerTwoSymbol);
        navigate('/game');
    };

    const handlePlayerOneNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        if (name.length <= 20) {
            setPlayerOneName(name);
            setError('');
        } else {
            setError('Os nomes podem ter somente até 20 caracteres.');
        }
    };

    const handlePlayerTwoNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        if (name.length <= 20) {
            setPlayerTwoName(name);
            setError('');
        } else {
            setError('Os nomes podem ter somente até 20 caracteres.');
        }
    };

    return (
        <div className="container-register">
            <h1>Registro para <b className='color-text'>Jogo da Velha</b></h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome do Jogador 1:
                        <input
                            type="text"
                            value={playerOneName}
                            onChange={handlePlayerOneNameChange}
                            required
                        />
                    </label>
                    <label>Escolha seu Símbolo (Jogador 1):
                        <select
                            value={playerOneSymbol}
                            onChange={(e) => setPlayerOneSymbol(e.target.value)}
                        >
                            <option value="X">X</option>
                            <option value="O">O</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>Nome do Jogador 2:
                        <input
                            type="text"
                            value={playerTwoName}
                            onChange={handlePlayerTwoNameChange}
                            required
                        />
                    </label>
                    <label>Escolha seu Símbolo (Jogador 2):
                        <select
                            value={playerTwoSymbol}
                            onChange={(e) => setPlayerTwoSymbol(e.target.value)}
                        >
                            <option value="X">X</option>
                            <option value="O">O</option>
                        </select>
                    </label>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default RegistrationForm;
