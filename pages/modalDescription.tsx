import * as React from "react";

import GameDescriptionView from "./gameViews/GameDescriptionView";

export default function ModalDescription() {

  React.useEffect(() => {}, []);

  const closeModal = async () => {
    await miro.board.ui.closeModal();
  };

  return (
    <div className="main">
        <div><GameDescriptionView  closeView={closeModal}></GameDescriptionView></div>
    </div>
  );
} 