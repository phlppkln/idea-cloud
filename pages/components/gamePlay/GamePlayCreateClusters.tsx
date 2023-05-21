import React, { useEffect, useState } from "react";

interface GamePlayCreateClustersProps {
  back: () => void;
  next: () => void;
}

const GamePlayCreateClusters: React.FC<GamePlayCreateClustersProps> = ({
  back,
  next,
}) => {

  const [numClusters, setNumClusters] = useState(2);

  const numClustersChanged = async (e) => {
    let numClustersTmp:any = e.target.value;
    setNumClusters(numClustersTmp);
    await miro.board.setAppData('numClusters', numClustersTmp);
  };

  const startClustering = async () => {
    if(typeof numClusters === 'undefined' || numClusters === null) {
      await showErrorMessageInvalidNumClusters();
      return;
    }
    else{
      next();
      //TODO: create clusters
    }
  };

  const showErrorMessageInvalidNumClusters = async () => {
    const errorMessage = {
      action: "Invalid number of clusters.",
      followUp: "Please select a number and try again.",
    };
    const errorNotification = `${errorMessage.action} ${errorMessage.followUp}`;

    await miro.board.notifications.showError(errorNotification);
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
        <h1>2. Play</h1>
        <p>
          Now you can start to cluster the annotated images. To do so, select
          all nodes containing the image and the players sticky notes.{" "}
        </p>

        <p>
          Next, enter the number of clusters/categories you want to split the
          images into and press the "Start clustering" button.
        </p>
        <div className="form-group">
          <label htmlFor="select-1">Number of clusters</label>
          <select className="select" id="number-clusters" value={numClusters} onChange={numClustersChanged}>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button
          className="button button-primary button-right"
          type="button"
          onClick={startClustering}
        >
          Start Clustering
        </button>
      </div>
    </div>
  );
};
export default GamePlayCreateClusters;
