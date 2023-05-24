import fsPromises from "fs/promises";

import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

// handle redirect with code and exchange it for the access token
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (typeof req.headers.word != "string") {
    res.status(400).send("Bad Request");
    return;
  }

  // get word from request header
  const key: string = req.headers.word;

  // read glove data
  const file = path.join(
    process.cwd(),
    "file",
    "../data/glove-6B-50d/glove6b50d.json"
  );

  const gloveData = await fsPromises.readFile(file);

  // convert buffer object to json
  let text = gloveData.toString("utf8");
  if (text.codePointAt(0) === 0xfeff) {
    // UTF8 BOM
    text = text.substring(1);
  }
  let gloveDataJSON = JSON.parse(text);

  // get vector from glove data
  let vector: number[] = [];
  if (gloveDataJSON.hasOwnProperty(key)) {
    vector = gloveDataJSON[key];
  } else {
    res.status(404).send("Key not found");
    return;
  }

  res.setHeader("Content-Type", "application/json");
  return res.end(vector.toString());
}
