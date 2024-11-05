import PlayerSetup from './PlayerSetup';



function Setup(){
    // Adicione o estado para o nome dos jogadores e a tela de configuração
    const [playerXName, setPlayerXName] = useState<string | null>(null);
    const [playerOName, setPlayerOName] = useState<string | null>(null);
    const [playerXName, setPlayerXName] = useState<string | null>(null);
    const [symbol, setSymbol] = useState<'X' | 'O'>('X');
    
    // Função para iniciar o jogo com os nomes dos jogadores
    const startGame = (playerX: string, playerO: string, chosenSymbol: 'X' | 'O') => {
      setPlayerXName(playerX);
      setPlayerOName(playerO);
      setSymbol(chosenSymbol);
    }
    
    // Renderização condicional para mostrar a tela de cadastro ou o jogo
    if (playerXName && playerOName) {
      return( 
        <div className="App">
          {/* Resto do código do jogo */}
        </div>
      )  
    
    }
    else{
      return (<div><PlayerSetup onStartGame ={startGame}></PlayerSetup></div>)
    }
    }
    export default Setup