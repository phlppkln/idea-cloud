import React, { useEffect, useState } from "react";
import GameSetupPage1 from "../components/gameSetup/GameSetupPage1";
import GameSetupPage2 from "../components/gameSetup/GameSetupPage2";
interface GameSetupViewProps {
  closeView: () => void;
}

const GameSetupView: React.FC<GameSetupViewProps> = ({ closeView }) => {
  const [page, setPage] = useState(<div></div>);

  useEffect(() => {
    openPage1();
  }, []);

  const openPage1 = () => {
    
    setPage(<GameSetupPage1 back={closeView} next={openPage2}></GameSetupPage1>);
  };

  const openPage2 = () => {
    setPage(<GameSetupPage2 back={openPage1} next={closeView}></GameSetupPage2>);
  };


  return <div>{page}</div>;
};
export default GameSetupView;


