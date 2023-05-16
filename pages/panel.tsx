import * as React from "react";
import IdeaCloud from "./IdeaCloud";

export default function Panel() {

  React.useEffect(() => {}, []);
  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        <IdeaCloud></IdeaCloud>
    </div>
    </div>
  );
}