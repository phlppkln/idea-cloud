import React, { useEffect, useState } from "react";

import * as clustering from "../../../helpers/clustering";
import * as wordVectorHelper from "../../../helpers/wordVectorHelper";
import * as itemHelper from "../../../helpers/itemHelper";
import { Frame } from "@mirohq/websdk-types";

interface GamePlayCreateClustersProps {
  back: () => void;
  next: () => void;
}

const GamePlayCreateClusters: React.FC<GamePlayCreateClustersProps> = ({
  back,
  next,
}) => {
  const [numClusters, setNumClusters] = useState(2);

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const numClustersChanged = async (e: any) => {
    let numClustersTmp: any = e.target.value;
    setNumClusters(numClustersTmp);
    await miro.board.setAppData("numClusters", numClustersTmp);
  };

  const startClustering = async () => {
    const boardInfo = await miro.board.getInfo();
    const selection = await miro.board.getSelection();

    if (typeof numClusters === "undefined" || numClusters === null) {
      await showErrorMessageInvalidNumClusters();
      return;
    } else if (selection.length == 0) {
      await showErrorMessageNoSelection();
      return;
    } else {
      let maxX: number = 0;
      let maxY: number = 0;

      // find the position for the new frames
      selection.forEach(async (item) => {
        if (item.type === "frame") {
          if (item.x > maxX) {
            maxX = item.x;
          }
          if (item.y > maxY) {
            maxY = item.y;
          }
        }
      });

      selection.forEach(async (item) => {
        if (item.type === "frame") {
          let frameAverageVector: number[] = [];

          const noteTexts = await getChildNoteTexts(item);
          console.log(wordVectorHelper.getAverageVectorFromWords(noteTexts));

          console.log("Frame: " + item.title);
          console.log("Texts: " + noteTexts);
          console.log("-----------------")


          //TODO: create a new frame with an image from the selected frame
          createFrameWithImage(item, maxX, maxY);

          //TODO:
        }
      });
      // get the vectors from the selected nodes

      //TODO: create clusters
      //const clusters: Cluster[] = clustering.testKMeansClustering();
    }
  };

  const getNodeAverageVector = async (words:string) => {

    let nodeVectors: number[][] = [];
    for(let i = 0; i < words.length; i++){
      let word = words[i];
    const wordVector:string = await getWordVector(
      "GET",
      "/api/getWordVector",
      word
    );
    //convert to number[]
    const wordVectorNumber = convertStringToNumberArray(
      wordVector
    );
    nodeVectors.push(wordVectorNumber);
    }

    
  };

  const convertStringToNumberArray = (str: string) => {
    const strArray = str.split(",");
    const numArray: number[] = [];
    strArray.forEach((str) => {
      numArray.push(Number(str));
    });
    return numArray;
  };

  const getWordVector = async (
    method: string,
    url: string,
    word: string
  ) => {
    const res = await fetch(url, {
      method: method,
      headers: {
        "content-type": "application/json",
        word: "hello",
      },
    });
    if (res.status !== 200) {
      const text = await res.text();
      try {
        throw new Error(JSON.parse(text));
      } catch (err) {
        throw new Error(text);
      }
    }

    try {
      const sampleItem = await res.json();
      return sampleItem.data.imageUrl;
    } catch (err) {
      console.error(err);
      return null;
    }
  };


  const createFrameWithImage = async (
    frame: Frame,
    positionX: number,
    positionY: number
  ) => {
    const children = await frame.getChildren();

    children.forEach(async (child) => {
      if (child.type === "image") {
        //TODO: create a new frame at the position x and y
        //TODO: add the image to the frame
        //TODO: add the frame id to the metadata of the board (to be able to identify it for the event listener later)
      }
    });
  };

  const getChildNoteTexts = async (frame: Frame) => {
    const children = await frame.getChildren();

    const childNoteTexts: string[] = [];

    children.forEach(async (child) => {
      if (child.type === "sticky_note") {
        childNoteTexts.push(itemHelper.removeTagsFromText(child.content));
      }
    });
    return childNoteTexts;
  };

  const showErrorMessageInvalidNumClusters = async () => {
    const errorMessage = {
      action: "Invalid number of clusters.",
      followUp: "Please select a number and try again.",
    };
    const errorNotification = `${errorMessage.action} ${errorMessage.followUp}`;

    await miro.board.notifications.showError(errorNotification);
  };

  const showErrorMessageNoSelection = async () => {
    const errorMessage = {
      action: "No items selected.",
      followUp: "Select images and try again.",
    };
    const errorNotification = `${errorMessage.action} ${errorMessage.followUp}`;

    await miro.board.notifications.showError(errorNotification);
  };

  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        <div onClick={back}>
          {" "}
          <button
            className="button button-secondary button-small"
            type="button"
          >
            <span className="icon-back-1"></span>Back
          </button>{" "}
        </div>
        <h1>2. Play</h1>
        <p>
          Now you can start to cluster the annotated images. To do so, select
          all nodes containing the image and the players sticky notes.{" "}
        </p>

        <p>
          Next, enter the number of clusters/categories you want to split the
          images into and press the "Start clustering" button.
        </p>
        <div className="form-group">
          <label htmlFor="select-1">Number of clusters</label>
          <select
            className="select"
            id="number-clusters"
            value={numClusters}
            onChange={numClustersChanged}
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button
          className="button button-primary button-right"
          type="button"
          onClick={startClustering}
        >
          Start Clustering
        </button>

        <button
          className="button button-primary button-right"
          type="button"
          onClick={testBtnClicked}
        >
          TestAPI
        </button>
      </div>
    </div>
  );
};
export default GamePlayCreateClusters;
