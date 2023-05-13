import initMiro from "../../initMiro";
import { NextApiRequest, NextApiResponse } from "next";

// handle redirect with code and exchange it for the access token
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { miro } = initMiro(req, res);
  const api = miro.as('');

  const boardId = req.headers.boardid;
  const imageId = req.headers.imageid;

  //console.log("boardId: " + boardId);
  //console.log("imageId: " + imageId);

  if (req.method === "GET") {
    try {
      const miroRes = await miro
        .as("")
        ._api.call("GET", `v2/boards/${boardId}/images/${imageId}`);

      //console.log(miroRes.body);

      res.send(miroRes.body);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: err + "Failed to perform api operation",
      });
    }
    return;
  }
}
