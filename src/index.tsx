/*
 * Copyright (c) Madison Bikes and Ben Sandee (tbsandee@orangebikelabs.com) 2021.
 */

import "./index.css";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
// FIXME enable <StrictMode></StrictMode> eventually, which doesn't work any more w/React 18. Markers don't show consistently on map.
root.render(<App />);
