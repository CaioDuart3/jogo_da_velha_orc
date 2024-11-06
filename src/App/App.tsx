import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from '../Game/Game';
import Home from '../Home/Home';
import RegistrationForm from "../Register/Register.tsx";

function RoutesWeb() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
                 <Route path="/register" element={<RegistrationForm />} />
            </Routes>
        </Router>
    );
}

export default RoutesWeb;
