import fsPromises from "fs/promises";

import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

// handle redirect with code and exchange it for the access token
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (typeof req.headers.vector != "string") {
    res.status(400).send("Bad Request");
    return;
  }

  // get vector from request header
  let vectorString = req.headers.vector.split(",");
  let vector: number[] = req.headers.vector.split(",").map(Number);

  // read glove data
  const file = path.join(
    process.cwd(),
    "file",
    "../data/glove-6B-50d/glove6b50d.json"
  );

  const gloveData = await fsPromises.readFile(file);



  res.setHeader("Content-Type", "application/json");
  return res.end(vector.toString());
}
