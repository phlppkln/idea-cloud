import React, { useEffect, useState } from "react";

interface GameAnalysisViewProps {
  closeView: () => void;
}

const GameAnalysisView: React.FC<GameAnalysisViewProps> = ({ closeView }) => {
  const openAnalysisModal = async () => {
    await miro.board.ui.openModal({
      url: "/modalDescription",
      fullscreen: true,
    });
  };

  return (
    <div className="main">
      <div>GameAnalysisView</div>
      <button
        className="button button-primary"
        type="button"
        onClick={openAnalysisModal}
      >
        Start Analysis
      </button>
      <button
        className="button button-primary"
        type="button"
        onClick={closeView}
      >
        Close Game Analysis
      </button>
    </div>
  );
};
export default GameAnalysisView;
