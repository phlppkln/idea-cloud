import React, { useEffect, useState } from "react";

interface GameSetupPage2Props {
  back: () => void;
  next: () => void;
}

const GameSetupPage2: React.FC<GameSetupPage2Props> = ({ back, next }) => { 

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
        <h1>1. Game Setup</h1>
        <p>
        Your game is now set and ready to play. Go to the “Play” phase to begin.
        </p>

        <p>
          <strong>
            Important: Only start the game when you have a question you want to
            explore with the images. Make sure that this questions will generate
            enough information from the players. Generally speaking, this
            question should be a question that can be answered with a single
            word, for example "What do you think...", "What is your impression
            ...", etc.
          </strong>
        </p>
        <button
          className="button button-primary"
          type="button"
          onClick={next}
        >
          Finish Setup
        </button>
      </div>
    </div>
  );
};
export default GameSetupPage2;


