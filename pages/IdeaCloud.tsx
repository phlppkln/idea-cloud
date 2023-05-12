import { useEffect, useState } from "react";
import Image from "next/image";

//import game phases
import GameSetupView from "./gameViews/GameSetupView";
import GamePlayView from "./gameViews/GamePlayView";
import GameAnalysisView from "./gameViews/GameAnalysisView";

const IdeaCloud = () => {
  const [view, setView] = useState(<div></div>);

  useEffect(() => {
    showStartView();
  }, []);

  const showStartView = () => {
    setView(<GameDescription></GameDescription>);
  };

  const showGameSetupView = () => {
    setView(<GameSetupView closeView={showStartView} startGame={showGamePlayView}></GameSetupView>);
  };

  const showGamePlayView = () => {
    setView(<GamePlayView endGame={showGameAnalysisView} cancelGame={showGameSetupView} showHelp={showDescription}></GamePlayView>);
  };

  const showGameAnalysisView = () => {
    setView(<GameAnalysisView></GameAnalysisView>);
  };

  let GameDescription = () => {
    return (
      <div>
        <div>
          IdeaCloud is a tool for brainstorming and organizing ideas. It is
          based on the Affinity Diagram technique that helps to discover
          embedded patters of thinking. The objective of the game is to give
          players the ability to find a "Ground Truth" for the data. It
          furthermore enables the creation of the design technique of{" "}
          <a href="https://en.wikipedia.org/wiki/Concept_map" target="_blank">
            concept mapping
          </a>
          the .
        </div>
        <div>
          <button
            className="button button-primary"
            type="button"
            onClick={showGameSetupView}
          >
            Start Game
          </button>
        </div>
      </div>
    );
  };

  return <div>{view}</div>;
};
export default IdeaCloud;
