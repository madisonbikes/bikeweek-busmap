/*
 * Copyright (c) Madison Bikes and Ben Sandee (tbsandee@orangebikelabs.com) 2021.
 */

import "./App.css";
import { MapLoader } from "./MapLoader";

function App(): JSX.Element {
  return (
    <div className="App">
      <h3>Bike Week 2022 Bus Map</h3>
      <MapLoader />
    </div>
  );
}

export default App;
