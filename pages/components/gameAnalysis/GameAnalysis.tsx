import React, { useEffect, useState } from "react";

interface GameAnalysisProps {
  back: () => void;
  next: () => void;
}

const GameAnalysis: React.FC<GameAnalysisProps> = ({ back, next }) => { 

  const exportData = async () => {
    //TODO: export data
    console.log("export data");
  };

  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        <div onClick={back}>
          {" "}
          <button
            className="button button-secondary button-small"
            type="button"
          >
            <span className="icon-back-1"></span>Back
          </button>{" "}
        </div>
        <h1>3. Analysis</h1>
        <p>
        To export the game data select all items of the game (initial frames and cluster frames). </p>
        <div>
        <button
          className="button button-primary"
          type="button"
          onClick={exportData}
        >
          Export Data
        </button>
        </div>
        <div>
        <button
          className="button button-primary"
          type="button"
          onClick={next}
        >
          Close Analysis
        </button>
        </div>
      </div>
    </div>
  );
};
export default GameAnalysis;


