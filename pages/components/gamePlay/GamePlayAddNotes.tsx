import React, { useEffect, useState } from "react";

interface GamePlayAddNotesProps {
  back: () => void;
  next: () => void;
}

const GamePlayAddNotes: React.FC<GamePlayAddNotesProps> = ({ back, next }) => { 

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
        <h1>2. Play</h1>
        <p>
        Now, ask players to silently visit each image and add sticky notes with a response to the question for each node.        </p>
        
          <p>We suggest that each player should leave at least three sticky notes. Depending on the number of images this should take around 10 minutes. After all players are finished you can go the next task and start to cluster the images.</p>
          
          <p>
          <strong>
          Important: The sticky notes from players need to be in the same frame as the corresponding image and only one word per sticky note is allowed. 
          </strong>
        </p>
        <button
          className="button button-primary button-right"
          type="button"
          onClick={next}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default GamePlayAddNotes;


