import { useState, useEffect } from "react";
import { League, AugmentedLeague } from "../types/types";

const TARGET_SECONDS = 24;

function calculateFinishLine(medianPerSecond: number) {
  const roughSeconds = medianPerSecond * TARGET_SECONDS;
  return Math.round(roughSeconds / 4) * 4;
}

async function getData(): Promise<League[]> {
  const response = await fetch("/leagues.json");
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const json = await response.json();
  return json;
}

async function getLeagueData(): Promise<AugmentedLeague> {
  const leagues = (await getData()) as League[];
  const randIndex = Math.floor(Math.random() * leagues.length);
  const league = leagues[randIndex] as AugmentedLeague;
  league.finishLine = calculateFinishLine(league.medianPerSecond);
  return league;
}

export function useLoadLeague() {
  const [league, setLeague] = useState({} as AugmentedLeague);
  useEffect(() => {
    const getAndSet = async () => {
      const leagueResult = await getLeagueData();
      console.log("leagueResult: ", leagueResult);
      setLeague(leagueResult);
    };
    getAndSet();
  }, []);
  return league;
}
