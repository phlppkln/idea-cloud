import React, { useEffect, useState } from "react";

interface GameSetupViewProps {
  closeView: () => void;
}

const GameSetupView: React.FC<GameSetupViewProps> = ({ closeView }) => {

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

    console.log(imgUrl);

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
      console.log(titleData);
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

  const restHandler = async () => {
    const boardInfo = await miro.board.getInfo();
    const selection = await miro.board.getSelection();

    selection.forEach(async (item) => {
      if (item.type == "image") {
        //for every selected image, get the image title
        const imgUrl = await getImageUrl(
          "GET",
          "/api/getImageUrl",
          boardInfo.id,
          item.id
        );
        console.log(imgUrl);
        
        const imgTitle = await getImageTitle(
          "GET",
          "/api/getImageTitle",
          boardInfo.id,
          imgUrl
        );
        console.log(imgTitle);
      }
    });
    //await apiCall("GET", "/api/getImagesTitle", boardInfo.id);
  };

  const sdkHandler = async () => {
    console.log("testSDK");
    const image = await miro.board.createImage({
      title: "This is an image",
      url: "https://miro.com/blog/wp-content/uploads/2020/10/organize-their-Miro-boards-for-trainings-and-workshops.svg",
      x: 0, // Default value: horizontal center of the board
      y: 0, // Default value: vertical center of the board
      width: 800, // Set either 'width', or 'height'
      rotation: 0.0,
    });

    // Output the created item to the developer console
    console.log(image);
    return image;
  };

  return (
    <div>
      <div>GameSetupView</div>
      <button
        className="button button-primary"
        type="button"
        onClick={closeView}
      >
        Close GameSetupView
      </button>

      <button
        className="button button-primary"
        type="button"
        onClick={sdkHandler}
      >
        Test SDK
      </button>

      <button
        className="button button-primary"
        type="button"
        onClick={restHandler}
      >
        Test REST Api
      </button>
    </div>
  );
};
export default GameSetupView;
