import React, { useState } from "react";
import { useContext } from "react";

import { Button } from "../Button/Button";
import { AudioApiContext } from "../../audio/AudioApiContext";

import { useLoadLeague } from "../../hooks/useLoadLeague";
import { AugmentedLeague } from "../../types/types";

export function SelectWord({
  onSubmitWord,
}: {
  onSubmitWord: ({
    nextWord,
    nextLeague,
  }: {
    nextWord: string;
    nextLeague: AugmentedLeague;
  }) => void;
}) {
  const [chosenWord, setChosenWord] = useState("");
  const league = useLoadLeague();
  const { playMusic } = useContext(AudioApiContext);

  function onOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setChosenWord(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmitWord({
      nextWord: chosenWord,
      nextLeague: league,
    });
    playMusic();
  }

  const wordItems =
    "words" in league &&
    league.words.map((word) => (
      <div key={word}>
        <input
          type="radio"
          id={word}
          value={word}
          name="word-choice"
          onChange={onOptionChange}
        ></input>
        <label htmlFor={word}>{word}</label>
      </div>
    ));

  return (
    <main
      className="select-word"
      style={{ textAlign: "center" }}
      aria-live="polite"
    >
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            <h3>
              Which word do you think will show up the most in English on
              Bluesky?
            </h3>
          </legend>
          <div style={{ textAlign: "left" }}>{wordItems}</div>
          <div>
            <Button type="submit" disabled={chosenWord === ""}>
              Play!
            </Button>
          </div>
        </fieldset>
      </form>
    </main>
  );
}
