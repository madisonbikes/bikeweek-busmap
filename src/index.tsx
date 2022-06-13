/*
 * Copyright (c) Madison Bikes and Ben Sandee (tbsandee@orangebikelabs.com) 2021.
 */

import "./index.css";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
// FIXME enable <StrictMode></StrictMode> eventually, which doesn't work any more w/React 18.
// Markers don't show up consistently because of automatic component mount/unmount designed
// to ferret out badly-coded apps. I suspect the "badly-coded" app is either @react-google-maps/api
// or the underlying Google Maps SDK. Will wait for them to fix.
root.render(<App />);
