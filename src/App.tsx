import React from 'react';
import AirportBoard from './components/AirportBoard';
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <AirportBoard />
        </BrowserRouter>
    );
}

export default App;