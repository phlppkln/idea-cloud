import { useEffect, useState } from "react";

//import game phases
import GameSetupView from "./gameViews/GameSetupView";
import GamePlayView from "./gameViews/GamePlayView";
import GameAnalysisView from "./gameViews/GameAnalysisView";

const IdeaCloud = () => {
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
              Abstracting individual ideas into a collective perspective is a key component of group work and ideation processes.
              IdeaCloud lets you explore and discover these hidden patterns. It uses language-based semantic
              similarity to show links between ideas and separate perspecties.
              This enables individuals to better articulate their own ideas and allows groups to organize spread out information. 
            </p>
            <div onClick={showGameDescriptionModal}>
            {" "}
            <button
              className="button button-secondary button-small"
              type="button"
            ><span className="icon icon-help-question"></span>Help
            </button>{" "}
          </div>

            <div className="game-phase game-setup-container">
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
            <div className="game-phase game-play-container">
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
              <div className="game-phase game-analysis-container">
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
export default IdeaCloud;
