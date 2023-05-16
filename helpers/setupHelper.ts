export async function getSelection() {
  const selection = await miro.board.getSelection();
  return selection;
}

export function removeTags(content: string) {
  return content.replace(/(<([^>]+)>)/gi, "");
}

export const createNodeGridFromImages = async (elements: any[]) => {
  if (elements.length === 0) {
    return false;
  }
  let frames: any[] = [];

  let frameWidth: number = 0;
  let frameHeight: number = 0;

  elements.forEach(async (element) => {
    const image = await miro.board.get({
      id: element.imageId,
    });
    if (image.length !== 1 || image[0].type !== "image") {
      throw new Error("Image not found");
    }

    //get frame size and position
    let tmpFrameWidth = image[0].width * 1.5;
    let tmpFrameHeight = image[0].height * 1.5;

    if (tmpFrameWidth > frameWidth) {
      frameWidth = tmpFrameWidth+tmpFrameWidth/2;
    }
    if (tmpFrameHeight > frameHeight) {
      frameHeight = tmpFrameHeight+tmpFrameHeight/2;
    }
  });

  elements.forEach(async (element) => {
    const image = await miro.board.get({
      id: element.imageId,
    });
    if (image.length !== 1 || image[0].type !== "image") {
      throw new Error("Image not found");
    }

    let frame = await miro.board.createFrame({
      x: image[0].x,
      y: image[0].y,
      width: frameWidth,
      height: frameHeight,
      title: element.title,
      style: {
        fillColor: '#ffffff'
      },
    });
    frame.add(image[0]);
    frames.push(frame);
  });

  await sleep(1000);
  await arrangeFramesClustersInGridLayout(frames);
/* 
  let cols: number = Math.ceil(Math.sqrt(elements.length));

  if (cols * cols < elements.length) {
    cols += 1;
  }
  
  let curCol: number = 0;
  let curRow: number = 0;
  let curX = frameX;
  let curY = frameY;

  elements.forEach(async (element) => {
    const image = await miro.board.get({
      id: element.imageId,
    });
    if (image.length !== 1 || image[0].type !== "image") {
      throw new Error("Image not found");
    }

    if (curCol === cols) {
      curCol = 0;
      curRow++;
    }

    curX = frameX + (frameWidth * curCol);
    curY = frameY + (frameHeight * curRow);
    curCol++;

    let frame = await miro.board.createFrame({
      x: curX,
      y: curY,
      width: frameWidth,
      height: frameHeight,
      title: element.title,
      style: {
        fillColor: "#ffffff",
      },
    });
    frame.add(image[0]);
    await sleep(1000);
    //await frame.sync();
    console.log(frame);
    //frames.push(frame);
  });
  await sleep(1000);
  arrangeNodesInGridLayout(frames); */
  return true
};


export const arrangeFramesClustersInGridLayout = async (frames:any) => {
  if (frames.length === 0) {
    throw Error("No frames found");
  }


  let curCol: number = 0;
  let curRow: number = 0;
  let curX = frames[0].x;
  let curY = frames[0].y;

  let cols: number = Math.ceil(Math.sqrt(frames.length));

  if (cols * cols < frames.length) {
    cols += 1;
  }
  
  frames.forEach(async (frame:any) => {
    if (curCol === cols) {
      curCol = 0;
      curRow++;
    }
    if (curCol === cols) {
      curCol = 0;
      curRow++;
    }

    curX = frame.x + (frame.width * curCol);
    curY = frame.y + (frame.height * curRow);
    curCol++;

    frame.x = curX;
    frame.y = curY;
    await sleep(1000);
    await frame.sync();
  }
  );
};


const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};