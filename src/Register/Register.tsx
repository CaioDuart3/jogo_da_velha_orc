import {useState} from 'react';
import './Register.css';
import {useNavigate} from "react-router-dom";

function RegistrationForm() {
    const [playerOneName, setPlayerOneName] = useState('');
    const [playerTwoName, setPlayerTwoName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event : any) => {
        event.preventDefault();
        localStorage.setItem('playerOneName', playerOneName);
        localStorage.setItem('playerTwoName', playerTwoName);
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
                    <label>Nome do Jogador 2:
                        <input
                            type="text"
                            value={playerTwoName}
                            onChange={(e) => setPlayerTwoName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default RegistrationForm;
