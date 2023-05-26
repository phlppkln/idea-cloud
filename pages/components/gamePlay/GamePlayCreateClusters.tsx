import React, { useEffect, useState } from "react";

import * as clustering from "../../../helpers/clustering";
import * as wordVectorHelper from "../../../helpers/wordVectorHelper";
import * as itemHelper from "../../../helpers/itemHelper";
import { Frame, Item } from "@mirohq/websdk-types";
import { get } from "http";

interface GamePlayCreateClustersProps {
  back: () => void;
  next: () => void;
}

const GamePlayCreateClusters: React.FC<GamePlayCreateClustersProps> = ({
  back,
  next,
}) => {
  const [numClusters, setNumClusters] = useState(2);
  const [loadingVectors, setLoadingVectors] = useState<boolean>(false);
  const [clusterDataPoints, setClusterDataPoints] = useState<
    ClusterDataPoint[]
  >([]);

  const testBtnClicked = async () => {
    console.log("testBtnClicked");
  };

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const numClustersChanged = async (e: any) => {
    let numClustersTmp: any = e.target.value;
    setNumClusters(numClustersTmp);
    await miro.board.setAppData("numClusters", numClustersTmp);
  };

  const selectionValid = async (selection: Item[]) => {
    let valid = true;
    selection.forEach(async (item: Item) => {
      if (item.type === "frame") {
        const children = await item.getChildren();
        children.forEach((child: Item) => {
          if (!(child.type === "sticky_note" || child.type === "image")) {
            valid = false;
          }
        });
      }
    });
    return valid;
  };

  const startClustering = async () => {
    const selection = await miro.board.getSelection();

    setLoadingVectors(true);
    //TODO: check if selection is valid
    /*     if (!await selectionValid(selection)) {
      await showErrorMessageInvalidSelection();
      return;
    } else */ if (typeof numClusters === "undefined" || numClusters === null) {
      await showErrorMessageInvalidNumClusters();
      return;
    } else if (selection.length == 0) {
      await showErrorMessageNoSelection();
      return;
    } else {
      //create a new frame with an image from the selected frame
      let gridStartX: number = 0;
      let gridStartY: number = 0;

      // find the starting position for the new frames
      selection.forEach(async (item) => {
        if (item.type === "frame") {
          if (item.x > gridStartX) {
            gridStartX = item.x;
          }
          if (item.y > gridStartY) {
            gridStartY = item.y;
          }
        }
      });

      buildClusterDataPoints(selection);
    }
  };

  function buildClusterDataPoints(selection: Item[]) {
    return new Promise<ClusterDataPoint[]>((resolve, reject) => {

    let points: ClusterDataPoint[] = [];
    selection.forEach(async (frame) => {
      if (frame.type === "frame") {
        const noteTexts = await getChildNoteTexts(frame);
        wordVectorHelper
          .getAverageVectorFromWords(noteTexts)
          .then((vector) => {
            console.log("average for ", frame.title, ": ", vector);
            return vector;
          })
          .then((vector) => {
            let point = {
              id: frame.id,
              vector: vector,
            };

            points.push(point);
            console.log("points: ", points);
            return points;
          });
      }
    });
  });
  }

  const createClusterNode = async (
    frameAverageVector: number[],
    frame: Frame,
    positionX: number,
    positionY: number
  ) => {
    const boardInfo = await miro.board.getInfo();
    const boardId = boardInfo.id;
    const children = await frame.getChildren();

    children.forEach(async (child) => {
      if (child.type === "image") {
        const imageId = child.id;
        const imgUrl = await getImageUrl(
          "GET",
          "/api/getImageUrl",
          boardId,
          imageId
        );

        const image = await miro.board.createImage({
          title: "This is an image",
          url: imgUrl,
          x: 0, // Default value: horizontal center of the board
          y: 0, // Default value: vertical center of the board
          width: 800, // Set either 'width', or 'height'
          rotation: 0.0,
        });

        //TODO: create a new frame at the position x and y
        //TODO: add the image to the frame
        //TODO: add the frame id to the metadata of the board (to be able to identify it for the event listener later)
      }
    });
  };

  const getImageUrl = async (
    method: string,
    url: string,
    boardId: string,
    imageId: string
  ) => {
    const res = await fetch(url, {
      method: method,
      headers: {
        "content-type": "application/json",
        boardId: boardId,
        imageId: imageId,
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

  const showErrorMessageInvalidSelection = async () => {
    const errorMessage = {
      action: "Invalid selection.",
      followUp: "Please select frames with images and notes and try again.",
    };
    const errorNotification = `${errorMessage.action} ${errorMessage.followUp}`;

    await miro.board.notifications.showError(errorNotification);
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
          Test Clustering
        </button>
      </div>
    </div>
  );
};
export default GamePlayCreateClusters;
