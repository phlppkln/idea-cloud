import React, { useEffect, useState } from "react";
import { createNodeGridFromImages } from "../../helpers/setupHelper";
import Image from 'next/image';

import loadingGif from '../../public/loading.gif';
interface GameSetupViewProps {
  closeView: () => void;
}

const GameSetupView: React.FC<GameSetupViewProps> = ({ closeView }) => {
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getImageTitle = async (
    method: string,
    url: string,
    boardId: string,
    imgUrl: string
  ) => {
    //update the `format` query parameter from its default of “preview” to instead be “original” (see https://community.miro.com/developer-platform-and-apis-57/retrieve-the-name-and-extension-of-the-image-file-11819)
    let urlTmp = new URL(imgUrl);
    urlTmp.searchParams.set("format", "original");
    imgUrl = urlTmp.toString();

    //console.log(imgUrl);

    const res = await fetch(url, {
      method: method,
      headers: {
        "content-type": "application/json",
        boardId: boardId,
        imageUrl: imgUrl,
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
      const titleData = await res.json();
      //console.log(titleData);
      return extractTitle(titleData.url);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const extractTitle = (imageData: string) => {
    const myArray = imageData.split("%3B%20filename%3D%22");
    const myA1 = myArray[1].split("%22%3B%20filename");
    return myA1[0];
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

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const setupGame = async () => {
    setLoading(true);
    console.log("game setup started");
    const boardInfo = await miro.board.getInfo();
    const selection = await miro.board.getSelection();

    interface Image {
      imageId: string;
      title: string;
    }
    let images: Image[] = [];

    //for every selected image, get the image title and build the game grid
    selection.forEach(async (item) => {
      if (item.type == "image") {
        let imageTitle: string = "";
        if (item.title != "") {          
          //if the image has a title, use it
          imageTitle = item.title;
        } else {
          //if the image has no title, get it from the API
          imageTitle = await getTitleFromAPI(boardInfo.id, item.id);
        }
        //push the image to the array
        images.push({ imageId: item.id, title: imageTitle });
      }
    });
    //create the game layout
    setSelectedImages(images);
    await sleep(10000);
    if(!await createNodeGridFromImages(images)){
      await showErrorMessage();
    };
    setLoading(false);
  };

  const showErrorMessage = async () => {
    const errorMessage = {
      code: 7,
      action: "Could not build game layout.",
      followUp: 'Please select the images and try again.',
    };
    const errorNotification = `${errorMessage.action} ${errorMessage.followUp} (${errorMessage.code})`;
    
await miro.board.notifications.showError(errorNotification);
  }


  const getTitleFromAPI = async (boardId:any, itemId:any) => {
    const imgUrl = await getImageUrl(
      "GET",
      "/api/getImageUrl",
      boardId,
      itemId
    );
    //console.log(imgUrl);

    let titleTmp = await getImageTitle(
      "GET",
      "/api/getImageTitle",
      boardId,
      imgUrl
    );
    if (titleTmp) {
      return titleTmp;
    } else {
      return "ImageId: " + itemId;
    }
  }

  const loadingMessage = () => {
    if(loading) {
      return <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px"}}>
        <Image src={loadingGif} alt="loading" style={{width: "20%", height: "20%"}}/>
        <p>Loading...</p>
        </div>

    }
    else {
      return <div></div>
    }
  }

  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        <div onClick={closeView}>
          {" "}
          <button
            className="button button-secondary button-small"
            type="button"
          >
            <span className="icon-back-1"></span>Back
          </button>{" "}
        </div>
        <h1>Game Setup</h1>
        <p>
          As a first step, you need to drag your images on the Miro board.
          Select the images and press the "Setup Game" button. This puts each
          image into a frame and organizes the nodes in a grid.
        </p>

        <p>
          <strong>
            Important: Only start the game when you have a question you want to
            explore with the images. Make sure that this questions will generate
            enough information from the players. Generally speaking, this
            question should be a question that can be answered with a single
            word, for example "What do you think...", "What is your impression
            ...", etc.
          </strong>
        </p>
        <button
          className="button button-primary"
          type="button"
          onClick={setupGame}
        >
          Setup Game
        </button>
        {loadingMessage()}
      </div>
    </div>
  );
};
export default GameSetupView;


