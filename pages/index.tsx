import {GetServerSideProps} from 'next';
import {useEffect, useState} from 'react';
import initMiro from '../initMiro';

import IdeaCloud from './IdeaCloud';

export const getServerSideProps: GetServerSideProps =
  async function getServerSideProps({req}) {
    const {miro} = initMiro(req);

    // redirect to auth url if user has not authorized the app
    if (!(await miro.isAuthorized(''))) {
      return {
        redirect: {
          destination: miro.getAuthUrl(),
          permanent: false,
        },
      };
    }

    const api = miro.as('');

    const boards: string[] = [];

    for await (const board of api.getAllBoards()) {


      boards.push(board.name || '');
    }

    return {
      props: {
        boards,
      },
    };
  };

export default function Main(/* {boards}: {boards: string[]} */) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [view, setView] = useState(<div></div>);

  useEffect(() => {
    setView(<WelcomeScreen></WelcomeScreen>);

    if (new URLSearchParams(window.location.search).has('panel')) return;

    window.miro.board.ui.on('icon:click', async () => {
      window.miro.board.ui.openPanel({
        url: `/?panel=1`,
      });
      startNodeExplorer();
    });

  }, []);

  const startNodeExplorer = () => {
    console.log("startNodeExplorer")
    setView(<IdeaCloud></IdeaCloud>)
  }


  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        <IdeaCloud></IdeaCloud>
      </div>
    </div>
  );
}

const WelcomeScreen = () => {
  return (
    <div className="welcome-screen">
      <h1>NodeExplorer</h1>
      <h2>Object of Play</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
        </p>
        <h2>Number of Players</h2>
        <p>
          1-???
        </p>
        <h2>Duration of Play</h2>
        <p>
          5 minutes - ???
        </p>
        <h2>How to Play</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          </p>
        <h2>Strategy</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          </p>
        <h2>Additional Information</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          </p>
        </div>
  )
}
