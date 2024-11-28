import "./App.css";
import { Racetrack } from "./components/Racetrack";

function App() {
  return (
    <div className="main">
      <div className="racetracks">
        <Racetrack name="is" progress={2}></Racetrack>
        <Racetrack name="this" progress={3}></Racetrack>
        <Racetrack name="stuff" progress={1}></Racetrack>
        <Racetrack name="things" progress={4}></Racetrack>
      </div>
    </div>
  );
}

export default App;
