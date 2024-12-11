interface Params {
  score: number;
  finishers: string[];
}

export function Result({ score, finishers }: Params) {
  return (
    <div>
      <h2>You finished!</h2>
    </div>
  );
}
