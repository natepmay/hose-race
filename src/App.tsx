import "./App.css";
import { Racetracks } from "./components/Racetracks";
import { Lines } from "./components/Lines";
import { useFirehose } from "./hooks/useFirehose";
import { loadLeague } from "./utils/loadLeague";

const league = await loadLeague();

function App() {
  const { postText, wordCount } = useFirehose(league.words);
  return (
    <div className="parent">
      <div className="header">
        <div className="header-text">
          <div>Hose Race</div>
          <div>3010</div>
        </div>
      </div>
      <div className="post-card-slot">
        <div className="post-card">{postText.text}</div>
      </div>
      <div className="all-racetrack-content">
        <Lines finishLine={league.finishLine}></Lines>
        {/* Do I need the "tracks" wrapper? */}
        <div className="tracks">
          <Racetracks
            wordCount={wordCount}
            postText={postText}
            finishLine={league.finishLine}
          ></Racetracks>
        </div>
      </div>
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
