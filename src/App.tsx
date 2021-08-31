/*
 * Copyright (c) Madison Bikes and Ben Sandee (tbsandee@orangebikelabs.com) 2021.
 */

import React from 'react';
import './App.css';
import {MapLoader} from "./MapLoader";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <MapLoader/>
            </header>
        </div>
    );
}

export default App;
