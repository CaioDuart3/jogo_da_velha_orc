import {useState} from 'react';
import './Register.css';
import {useNavigate} from "react-router-dom";

function RegistrationForm() {
    const [playerOneName, setPlayerOneName] = useState('');
    const [playerTwoName, setPlayerTwoName] = useState('');
    const [playerOneSymbol, setPlayerOneSymbol] = useState('X');
    const [playerTwoSymbol, setPlayerTwoSymbol] = useState('O');

    const navigate = useNavigate();

    const handleSubmit = (event : any) => {
        event.preventDefault();
        if (playerOneSymbol === playerTwoSymbol) {
            alert('Os símbolos dos jogadores devem ser diferentes');
            return;
        }
        localStorage.setItem('playerOneName', playerOneName);
        localStorage.setItem('playerTwoName', playerTwoName);
        localStorage.setItem('playerOneSymbol', playerOneSymbol);
        localStorage.setItem('playerTwoSymbol', playerTwoSymbol);
        navigate('/game');
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Registro para Jogo da Velha</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome do Jogador 1:
                        <input
                            type="text"
                            value={playerOneName}
                            onChange={(e) => setPlayerOneName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>Escolha seu Símbolo (Jogador 1):
                        <select value={playerOneSymbol} onChange={(e) => setPlayerOneSymbol(e.target.value)}>
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
                            onChange={(e) => setPlayerTwoName(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <div>
                    <label>Escolha seu Símbolo (Jogador 2):
                        <select value={playerTwoSymbol} onChange={(e) => setPlayerTwoSymbol(e.target.value)}>
                            <option value="X">X</option>
                            <option value="O">O</option>
                        </select>
                    </label>
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default RegistrationForm;
