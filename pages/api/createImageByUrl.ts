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
  const imageUrl = req.headers.imageurl;
  const posX = req.headers.posx;
    const posY = req.headers.posy;
  

  const options = {
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({
      data: {
        url: 'https://miro.com/static/images/page/mr-index/localization/en/slider/ideation_brainstorming.png'
      },
      position: {origin: 'center', x: posX, y: posY}
    })
  };
  
  fetch('https://api.miro.com/v2/boards/board_id/images', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

  if (req.method === "POST") {
    try {
      const miroRes = await miro
        .as("")
        ._api.call("POST", `v2/boards/${boardId}/images/${imageId}`);

      console.log(miroRes.body);

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
