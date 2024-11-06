import './Home.css'
function Home (){
    return (
        //sugestão colocar no parametro da rota um id, exemplo /game/1, para quando chamar no codigo em game
        // ele ter um condicional q executa se é individual ou em dupla. 
        <div className="home">
            <h1>Jogo da velha</h1>
            <a href="/game"><button>Um jogador</button></a>
            <a href="/register"><button>Dois jogadores</button></a>
            <a href="https://github.com/CaioDuart3/jogo_da_velha_orc" target="_blank"><button>Repositório</button></a>
        </div>
    );
}

export default Home;