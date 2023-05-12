export async function getSelection() {
  const selection = await miro.board.getSelection();
  return selection;
}

export function removeTags(content: string) {
  return content.replace(/(<([^>]+)>)/gi, "");
}

/**
 *
 * @param data selected miro items
 * @returns clusters of miro items as an ClusterInterface array with ClusterDataPointInterface as data
 */
export const buildBoardClusters = async (data: any) => {
  if (data === 0) {
    throw Error("No data found");
  }

  let clusters: ClusterInterface[] = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].type === "frame") {
      let dataPoints: ClusterDataPointInterface[] = await processFrameChildren(
        data[i]
      );

      //set label of cluster
      let cluster: ClusterInterface = {
        label: data[i].title,
        data: dataPoints,
      };

      clusters.push(cluster);
    }
  }

  return clusters;
};

/**
 * Process frame children and add them to the cluster.
 * Data points are added to the cluster if they are sticky notes or images.
 *
 * @param frame containing miro items to be added to the cluster as data points
 * @returns children of the frame as cluster data points array
 */
const processFrameChildren = async (frame: any) => {
  let clusterDataPoints: ClusterDataPointInterface[] = [];
  const children = await frame.getChildren();

  for (const child of children) {
    if (child.type === "sticky_note") {
      clusterDataPoints.push({
        type: "sticky_note",
        id: child.id,
        x: child.x,
        y: child.y,
        parentId: frame.id,
        content: removeTags(child.content),
        color: child.style.backgroundColor,
        width: child.width,
        height: child.height,
        shape: child.shape,
      });
    } else if (child.type === "image") {
      clusterDataPoints.push({
        type: "image",
        id: child.id,
        x: child.x,
        y: child.y,
        parentId: frame.id,
        title: child.title,
        width: child.width,
        height: child.height,
      });
    } else if (child.type === "connector") {
      //TODO: add connections to cluster
    }
  }
  return clusterDataPoints;
};

export const createFrameClustersFromImages = async () => {
  let images: any[] = [];

  const selection = await getSelection();
  for (const item of selection) {
    if (item.type === "image") {
      images.push(item);
    }
  }

  if (images.length === 0) {
    throw Error("No images found");
  }

  let frames: any[] = [];
  for (const image of images) {
    let frameWidth = image.width * 2;
    let frameHeight = image.height * 2;

    let frame = await miro.board.createFrame({
      x: image.x,
      y: image.y,
      width: frameWidth,
      height: frameHeight,
      title: image.x + " " + image.y,
      style: {
        fillColor: 'ffffff'
      },
    });
    frame.add(image);
    frames.push(frame);
  }

  arrangeFramesClustersInGridLayout(frames);
};

export const arrangeFramesClustersInGridLayout = async (frames:any) => {
  if (frames.length === 0) {
    throw Error("No frames found");
  }

  let leftMin = frames[0].x;
  let topMin = frames[0].y;
  let frameHeightMax = frames[0].height;
  let frameWidthMax = frames[0].width;

  for (const frame of frames) {
    if (frame.x < leftMin) {
      leftMin = frame.x;
    }
    if (frame.y < topMin) {
      topMin = frame.y;
    }
    if (frame.height > frameHeightMax) {
      frameHeightMax = frame.height;
    }
    if (frame.width > frameWidthMax) {
      frameWidthMax = frame.width;
    }
  }

  let curX = leftMin;
  let curY = topMin;

  let columns = Math.ceil(Math.sqrt(frames.length));

  for(const frame of frames) {
    frame.x = curX;
    frame.y = curY;
    await frame.sync();

    curX += frameWidthMax + 100;
    curY += frameHeightMax + 100;
  }
}