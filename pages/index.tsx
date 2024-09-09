import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import initMiro from "../initMiro";

import IdeaCloud from "./IdeaCloud";


export const getServerSideProps: GetServerSideProps =
  async function getServerSideProps({ req }) {
    const { miro } = initMiro(req);

    // If the user doesn't authorize the app, redirect to auth URL
    if (!(await miro.isAuthorized(""))) {
      return {
        redirect: {
          destination: miro.getAuthUrl(),
          permanent: false,
        },
      };
    }

      return {
        props: {},
      };
  };

export default function Main() {
  const [panelHeight, setPanelHeight] = useState("100px");

  useEffect(() => {
    const handleResize = () => {
      setPanelHeight(window.innerHeight+"px");
    };
    window.addEventListener('resize', handleResize);    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    if (new URLSearchParams(window.location.search).has("panel")) {
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);

    }

    window.miro.board.ui.on("icon:click", async () => {
      window.miro.board.ui.openPanel({
        url: `/?panel=1`,
      });
    });


    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="main" style={{ height: panelHeight, overflowY: "auto"}}>
      <div className="">
      <IdeaCloud></IdeaCloud>
        </div>
    </div>
  );
}

