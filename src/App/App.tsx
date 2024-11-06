import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from '../Game/Game';
import Home from '../Home/Home';
//import Register from '../Register/Register'

function RoutesWeb() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
                {/* <Route path="/register" element={<Register />} /> */}
            </Routes>
        </Router>
    );
}

export default RoutesWeb;
