import React, { useEffect, useState } from 'react'


//import game play components
import GamePlayAddNotes from '../components/gamePlay/GamePlayAddNotes';
import GamePlayCreateClusters from '../components/gamePlay/GamePlayCreateClusters';
import GamePlayDoClustering from '../components/gamePlay/GamePlayDoClustering';
import GamePlayFindLabels from '../components/gamePlay/GamePlayFindLabels';

interface GamePlayViewProps {
  closeView: () => void;
}

const GamePlayView: React.FC<GamePlayViewProps> = ({ closeView }) => {
  const [page, setPage] = useState(<div></div>);

  useEffect(() => {
    openAddNotes();
  }, []);

  const openAddNotes = () => {
    setPage(<GamePlayAddNotes back={closeView} next={openCreateClusters}></GamePlayAddNotes>);
  };
  const openCreateClusters = () => {
    setPage(<GamePlayCreateClusters back={openAddNotes} next={openDoClustering}></GamePlayCreateClusters>);
  };

  const openDoClustering = () => {
    setPage(<GamePlayDoClustering back={openCreateClusters} next={openFindLabels}></GamePlayDoClustering>);
  };

  const openFindLabels = () => {
    setPage(<GamePlayFindLabels back={openDoClustering} next={closeView}></GamePlayFindLabels>);
  };


  return <div>{page}</div>;
};
export default GamePlayView;
