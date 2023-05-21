import React, { useEffect, useState } from "react";

import GameAnalysis from "../components/gameAnalysis/GameAnalysis";

interface GameAnalysisViewProps {
  closeView: () => void;
}

const GameAnalysisView: React.FC<GameAnalysisViewProps> = ({ closeView }) => {
  const [page, setPage] = useState(<div></div>);
  useEffect(() => {
    openAnalysis();
  }, []);

  const openAnalysis = () => {
    setPage(<GameAnalysis back={closeView} next={closeView}></GameAnalysis>);
  };

  return <div>{page}</div>
};
export default GameAnalysisView;
