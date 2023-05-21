import * as React from "react";

import GameDescriptionView from "./gameViews/GameDescriptionView";

export default function ModalDescription() {

  React.useEffect(() => {}, []);

  return (
    <div className="main">
        <div><GameDescriptionView></GameDescriptionView></div>
    </div>
  );
} 