import React, { useEffect, useState } from "react";

interface GamePlayFindLabelsProps {
  back: () => void;
  next: () => void;
}

const GamePlayFindLabels: React.FC<GamePlayFindLabelsProps> = ({ back, next }) => { 
  const [numClusters, setNumClusters] = useState(2);

  useEffect(() => {
    const setAppData = async () => {
      let numClustersTmp:number = await miro.board.getAppData('numClusters');
      setNumClusters(numClustersTmp);
    }
    setAppData();
  }, []);

  const findLabels = async () => {
    //TODO: find labels
    console.log('find labels');
  }

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
          <strong>Number of Clusters: {numClusters}</strong>

        </p>
        <p>
        You have successfully clustered all images! Now, you can find labels for the clusters by asking players for suggestions or with the "Find labels" button. Pressing this button will automatically add a label to a cluster based on the players sticky notes. You can add as many labels as you want.</p>
                <button
          className="button button-primary"
          type="button"
          onClick={findLabels}
        >
          Find Labels
        </button>
          <p>Whenever you feel ready to end the game, you can go back to the game phases overview. 
        </p>

        <button
          className="button button-primary"
          type="button"
          onClick={next}
        >
          End Game
        </button>
      </div>
    </div>
  );
};
export default GamePlayFindLabels;


