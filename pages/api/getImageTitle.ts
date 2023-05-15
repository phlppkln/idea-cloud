import initMiro from "../../initMiro";
import { NextApiRequest, NextApiResponse } from "next";

// handle redirect with code and exchange it for the access token
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { miro } = initMiro(req, res);
  //const api = miro.as("");

  //const boardId = req.headers.boardid;
  let imageUrl = req.headers.imageurl;

  if (typeof imageUrl === "string") {
    imageUrl = imageUrl;
  } else {
    throw new Error("URL of image is not a string");
  }

  console.log(imageUrl)

  //console.log("boardId: " + boardId);
  //console.log("imageUrl: " + imageUrl);

  if (req.method === "GET") {
    try {
      const miroRes = await miro.as("")._api.call("GET", imageUrl);

      //console.log(miroRes.body);

      res.send(miroRes.body);
    } catch (err) {
      console.error(err);
      res.status(500).send({
        error: err + "Failed to perform api operation",
      });
    }
    return;
  }
}
