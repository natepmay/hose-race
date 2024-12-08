import "./App.css";
import { Racetracks } from "./components/Racetracks";
import { useFirehose } from "./hooks/useFirehose";

const wordsToRace = ["crazy", "comic", "missouri", "five"];
const finishLine = 15;

function App() {
  const { postText, wordCount } = useFirehose(wordsToRace);
  return (
    <div className="parent">
      <div className="header">
        <div className="header-text">
          <div>Hose Race</div>
          <div>3010</div>
        </div>
      </div>
      <div className="all-racetrack-content">
        <div className="lines">
          <div className="full-line line1">
            <div className="line-label">0</div>
            <div className="line"></div>
          </div>
          <div className="full-line line2">
            <div className="line-label">25</div>
            <div className="line"></div>
          </div>
          <div className="full-line line3">
            <div className="line-label">50</div>
            <div className="line"></div>
          </div>
          <div className="full-line line4">
            <div className="line-label">75</div>
            <div className="line"></div>
          </div>
          <div className="full-line finish">
            <div className="line-label">100</div>
            <div className="line"></div>
          </div>
        </div>
        {/* Do I need the "tracks" wrapper? */}
        <div className="tracks">
          <Racetracks
            wordCount={wordCount}
            postText={postText}
            finishLine={finishLine}
          ></Racetracks>
        </div>
      </div>
      <div className="post-card-slot">
        <div className="post-card">{postText.text}</div>
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
