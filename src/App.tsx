import { useState } from "react";
import "./App.css";
import { AppState } from "./types/types";

import { Game } from "./components/Game";
import { Onboard } from "./components/Onboard";

import { loadLeague } from "./utils/loadLeague";

const league = await loadLeague();

function App() {
  const [appState, setAppState] = useState("onboard" as AppState);

  let innerComponent;
  switch (appState) {
    case "onboard":
      innerComponent = <Onboard onBegin={() => setAppState("play")}></Onboard>;
      break;
    case "play":
      innerComponent = <Game league={league}></Game>;
      break;
  }

  return (
    <div className="parent">
      <div className="header">
        <div className="header-text">
          <div>Hose Race</div>
          <div>3010</div>
        </div>
      </div>

      {innerComponent}

      <div className="footer">
        <div className="footer-text">
          <div>by Nate May</div>
          <div>[GH]</div>
        </div>
      </div>
    </div>
  );
}

export default App;
