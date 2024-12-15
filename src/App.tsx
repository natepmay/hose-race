import { useState } from "react";
import "./App.css";
import { AppState, AugmentedLeague, ResultsData } from "./types/types";
import { getResultsData } from "./utils/getResultsData";

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
  const [resultsData, setResultsData] = useState({} as ResultsData);

  if (finishers.includes(chosenWord) && appState === "play") {
    const resultsData = getResultsData(finishers, chosenWord);
    setResultsData(resultsData);
    setScore(score + resultsData.newPoints);
    setAppState("result");
  }

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

  function handlePlayAgain() {
    setChosenWord("");
    setLeague({} as AugmentedLeague);
    setFinishers([] as string[]);
    setAppState("select");
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
          finishers={finishers}
        ></Game>
      );
      break;
    case "result":
      innerComponent = (
        <Result
          score={score}
          resultsData={resultsData}
          onPlayAgain={handlePlayAgain}
        ></Result>
      );
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
