import { League, AugmentedLeague } from "../types/types";

const TARGET_SECONDS = 24;

export function calculateFinishLine(medianPerSecond: number) {
  const roughSeconds = medianPerSecond * TARGET_SECONDS;
  return Math.round(roughSeconds / 4) * 4;
}

async function getData(): Promise<League[]> {
  const response = await fetch("../../data/leagues.json");
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const json = await response.json();
  return json;
}

export async function loadLeague(): Promise<AugmentedLeague> {
  const leagues = (await getData()) as League[];
  const randIndex = Math.floor(Math.random() * leagues.length);
  const league = leagues[randIndex] as AugmentedLeague;
  league.finishLine = calculateFinishLine(league.medianPerSecond);
  return league;
}
