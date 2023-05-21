import { useEffect, useState } from "react";

//import game phases
import GameSetupView from "./gameViews/GameSetupView";
import GamePlayView from "./gameViews/GamePlayView";
import GameAnalysisView from "./gameViews/GameAnalysisView";

const DigDeeper = () => {
  const [view, setView] = useState(<div></div>);

  useEffect(() => {
    startApplication();
  }, []);

  const startApplication = () => {
    showGameOverview();
  }

  const showGameDescriptionModal = async () => {
      await miro.board.ui.openModal({
        url: "/modalDescription",
        fullscreen: true,
      });
  };

  const showGameOverview = () => {
    setView(<GameOverview></GameOverview>);
  };

  const showGameSetupView = () => {
    setView(
      <GameSetupView
        closeView={showGameOverview}
      ></GameSetupView>
    );
  };

  const showGamePlayView = () => {
    setView(
       <GamePlayView closeView={showGameOverview}></GamePlayView> 
    );
  };

  const showGameAnalysisView = () => {
    setView(<GameAnalysisView closeView={showGameOverview}></GameAnalysisView>);
  };

  let GameOverview = () => {
    return (
      <div className="grid">
        <div className="cs1 ce12">

          <div>
            <p>
              DigDeeper is a game that lets you explore and discover hidden
              patterns between images. It uses language-based semantic
              similarity to sort and cluster information into relationships.
              Your job, as the facilitator, is to set up and guide the players
              through the game. After a game is finished you can analyze the
              collected data with your own tool of choice.
            </p>
            <div onClick={showGameDescriptionModal}>
            {" "}
            <button
              className="button button-secondary button-small"
              type="button"
            >Open Game Description
            </button>{" "}
          </div>

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
                  After you finished a game, you can analyze the game and export
                  the results for further investigation.
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
export default DigDeeper;
