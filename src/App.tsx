import { useState } from "react";
import "./App.css";
import { AppState, AugmentedLeague } from "./types/types";

import { Game } from "./components/Game";
import { Onboard } from "./components/Onboard";
import { SelectWord } from "./components/SelectWord";
import { Result } from "./components/Result";

function App() {
  const [appState, setAppState] = useState("onboard" as AppState);
  const [chosenWord, setChosenWord] = useState("");
  const [league, setLeague] = useState({} as AugmentedLeague);
  const [finishers, setFinishers] = useState([] as string[]);
  const [score, setScore] = useState(0);

  if (finishers.includes(chosenWord) && appState === "play") {
    setAppState("result");
  }

  console.log("chosen word: ", chosenWord);
  console.log("finishers ", finishers);

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

  function handleAddFinisher(finisher: string) {
    if (!finishers.includes(finisher)) setFinishers([...finishers, finisher]);
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
      innerComponent = (
        <Game
          league={league}
          onAddFinisher={handleAddFinisher}
          chosenWord={chosenWord}
        ></Game>
      );
      break;
    case "result":
      innerComponent = <Result score={score} finishers={finishers}></Result>;
  }

  return (
    <div className="parent">
      <div className="header">
        <div className="header-text">
          <div>Hose Race</div>
          <div>{score}</div>
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
