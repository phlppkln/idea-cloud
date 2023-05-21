import React, { useEffect, useState } from "react";

interface GamePlayDoClusteringProps {
  back: () => void;
  next: () => void;
}

const GamePlayDoClustering: React.FC<GamePlayDoClusteringProps> = ({ back, next }) => {
  const [numClusters, setNumClusters] = useState(2);
  const [trackedFrames, setTrackedFrames] = useState([] as any[]);

  useEffect(() => {
    const setAppData = async () => {
      let numClustersTmp:number = await miro.board.getAppData('numClusters');
      setNumClusters(numClustersTmp);

      let trackedFramesTmp:any[] = await miro.board.getAppData('trackedFrames');
      setTrackedFrames(trackedFramesTmp);
    }
    setAppData();

    miro.board.ui.on('experimental:items:update', async (e) => {
      try{
              e.items.forEach(async (item) => {
        if(item.type === 'frame') {
          console.log(item);
          if(trackedFrames.includes(item.id)) {        
            updateClusters();
          }
        }
      });
      }
      catch(e) {
        console.log(e);
      }

    });

  }, []);

  const updateClusters = async () => {
    //TODO: update clusters
    console.log('update clusters');
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
        You can now start to organize the duplicated images into {numClusters} clusters. All newly created images are surrounded by a colored frame. A yellow frame indicates that this item is surrounded with images of the same cluster, whereas a blue frame indicates that its neighbors belong to a different cluster. The clustering is done when all images are surrounded by a yellow frame.</p>
        
          <p>Involve the group in this process as much as possible.
        </p>
        <button
          className="button button-primary"
          type="button"
          onClick={next}
        >
          Finish Clustering
        </button>
      </div>
    </div>
  );
};
export default GamePlayDoClustering;


