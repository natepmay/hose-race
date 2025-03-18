import { useState } from "react";
import useLocalStorage from "use-local-storage";

import "./App.css";
import { AppState, AugmentedLeague, ResultsData } from "./types/types";
import { getResultsData } from "./utils/getResultsData";

import { Game } from "./components/Game/Game";
import { Onboard } from "./components/Onboard/Onboard";
import { SelectWord } from "./components/SelectWord/SelectWord";
import { Result } from "./components/Result/Result";
import { GithubLogo } from "./components/GithubLogo";
import { Header } from "./components/Header/Header";
import { AudioProvider } from "./audio/AudioProvider";

function App() {
  const [appState, setAppState] = useState("onboard" as AppState);
  const [chosenWord, setChosenWord] = useState("");
  const [league, setLeague] = useState({} as AugmentedLeague);
  const [finishers, setFinishers] = useState([] as string[]);
  const [score, setScore] = useState(0);
  const [resultsData, setResultsData] = useState({} as ResultsData);
  const darkModePreference = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", darkModePreference);

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
    <div className={`parent ${isDark ? "dark" : "light"}`}>
      <AudioProvider>
        <Header score={score} isDark={isDark} setIsDark={setIsDark} />
        {innerComponent}
        <footer className="footer">
          <div className="footer-text">
            <div>by Nate May</div>
            <div>
              <GithubLogo />
            </div>
          </div>
        </footer>
      </AudioProvider>
    </div>
  );
}

export default App;
