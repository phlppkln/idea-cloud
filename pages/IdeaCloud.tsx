import { useEffect, useState } from "react";
import Image from "next/image";

//import game phases
import GameDescription from "./gameViews/GameDescriptionView";
import GameSetupView from "./gameViews/GameSetupView";
import GamePlayView from "./gameViews/GamePlayView";
import GameAnalysisView from "./gameViews/GameAnalysisView";

const IdeaCloud = () => {
  const [view, setView] = useState(<div></div>);

  useEffect(() => {
    showGameDescriptionView();
  }, []);

  const showGameDescriptionView = () => {
    setView(<GameDescription closeView={showGameOverview}></GameDescription>);
  };

  const showGameOverview = () => {
    setView(<GameOverview></GameOverview>);
  };

  const showGameSetupView = () => {
    setView(
      <GameSetupView
        closeView={showGameOverview} /*  startGame={showGamePlayView} */
      ></GameSetupView>
    );
  };

  const showGamePlayView = () => {
    setView(
      <GamePlayView /* endGame={showGameAnalysisView} cancelGame={showGameSetupView} showHelp={showDescription} */
      ></GamePlayView>
    );
  };

  const showGameAnalysisView = () => {
    setView(<GameAnalysisView closeView={showGameOverview}></GameAnalysisView>);
  };

  let GameOverview = () => {
    return (
      <div className="grid">
        <div className="cs1 ce12">
        <div onClick={showGameDescriptionView}>
          {" "}
          <button
            className="button button-secondary button-small"
            type="button"
          >
            <span className="icon-back-1"></span>Back to description
          </button>{" "}
        </div>
        <div>
          <p>
            NodeExplorer consists of three consecutive game phases: Setup, Play
            and Analysis.
          </p>
          <div className="game-phase">
            <div className="game-phase-header">1. Game Setup</div>
            <p>
              In the Setup phase, you can prepare your images for the game and
              build the game space.
            </p>
            <button
              className="button button-primary"
              type="button"
              onClick={showGameSetupView}
            >
              Start Setup
            </button>
          </div>
          <div className="game-phase">
            <div className="game-phase-header">2. Play</div>
            <p>
              During the Play phase, you play the game with your group. Only
              continue when you already have a prepared game space.
            </p>
            <button
              className="button button-primary"
              type="button"
              onClick={showGamePlayView}
            >
              Start Game
            </button>
          </div>
          <div>
            <div className="game-phase">
            <div className="game-phase-header">3. Analysis</div>
              <p>
                After you finished a game, you can analyze the game and export the results for further investigation.
              </p>
            <button
              className="button button-primary"
              type="button"
              onClick={showGameAnalysisView}
            >
              Start Analysis
            </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };

  return <div>{view}</div>;
};
export default IdeaCloud;
