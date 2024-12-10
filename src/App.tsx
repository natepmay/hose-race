import { useState } from "react";
import "./App.css";
import { AppState, AugmentedLeague } from "./types/types";

import { Game } from "./components/Game";
import { Onboard } from "./components/Onboard";

// import { loadLeague } from "./utils/loadLeague";
import { SelectWord } from "./components/SelectWord";

// const league = await loadLeague();

function App() {
  const [appState, setAppState] = useState("onboard" as AppState);
  const [chosenWord, setChosenWord] = useState("");
  const [league, setLeague] = useState({} as AugmentedLeague);

  console.log("chosen word: ", chosenWord);

  function handleSubmitWord({
    nextWord,
    nextLeague,
  }: {
    nextWord: string;
    nextLeague: AugmentedLeague;
  }) {
    setChosenWord(nextWord);
    setLeague(nextLeague);
    setAppState("play");
  }

  let innerComponent;
  switch (appState) {
    case "onboard":
      innerComponent = (
        <Onboard onBegin={() => setAppState("select")}></Onboard>
      );
      break;
    case "select":
      innerComponent = (
        <SelectWord onSubmitWord={handleSubmitWord}></SelectWord>
      );
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
