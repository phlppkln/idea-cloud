import React, { useEffect } from 'react'
import * as relationshipHelper from '../../helpers/relationshipHelper';

interface GamePlayViewProps {
  closeView: () => void;
}

const GamePlayView: React.FC<GamePlayViewProps> = () => {
/* 
  const startClustering = async () => {
    console.log("start clustering");
    
    const boardInfo = await miro.board.getInfo();
    const selection = await miro.board.getSelection();

        let clusterNodes: any[] = [];

    selection.forEach(async (item) => {
      if (item.type == "frame") {
        const children = await item.getChildren();
        let nodeLabels: any[] = [];

        children.forEach((child) => {
          if (child.type == "sticky_note") {
            const label = child.content;
            nodeLabels.push(label);
          }
        });
        
        //build similarity vector
        let similarityVector: number[] = [];
        
      }
    }); 
  };*/


  return (
    <div className="main">        <div onClick={closeView}>
    {" "}
    <button
      className="button button-secondary button-small"
      type="button"
    >
      <span className="icon-back-1"></span>Back
    </button>{" "}
  </div>
      <button
        className="button button-primary"
        type="button"
        onClick={startClustering}
      >
        Start Clustering
      </button>
    </div>
  );
};
export default GamePlayView;
