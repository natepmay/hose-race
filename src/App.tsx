import { useState } from "react";
import "./App.css";
import { AppState } from "./types/types";

import { Game } from "./components/Game";

import { useFirehose } from "./hooks/useFirehose";
import { loadLeague } from "./utils/loadLeague";

const league = await loadLeague();

function App() {
  const [appState, setAppState] = useState("onboard" as AppState);

  return (
    <div className="parent">
      <div className="header">
        <div className="header-text">
          <div>Hose Race</div>
          <div>3010</div>
        </div>
      </div>
      <Game league={league}></Game>

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
