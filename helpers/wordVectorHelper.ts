/* import glovesImport from "../data/glove-6B-50d/smallTestData.json";
//import glovesImport from "../data/glove-6B-50d/glove6b50d.json";
const gloves = <any>glovesImport; */

/******* helper functions *******/
const calculateEuclideanDistance = (vector1: number[], vector2: number[]) => {
  let sum: number = 0;
  for (let i = 0; i < vector1.length; i++) {
    sum += Math.pow(vector1[i] - vector2[i], 2);
  }
  return Math.sqrt(sum);
};

/* const getClosestMatches = (vec: number[]) => {
  var sims: [string, number][] = [];

  for (let word in gloves) {
    let sim = getCosineSimilarity(vec, gloves[word]);
    sims.push([word, sim]);
  }
  sims.sort((a: any, b: any) => {
    return b[1] - a[1];
  });

  return sims;
}; */

const dotProduct = (a: any, b: any) => {
  return a.reduce((sum: any, a: any, idx: number) => {
    return sum + a * b[idx];
  }, 0);
};

const magnitude = (a: any) => {
  return Math.sqrt(
    a.reduce((sum: any, val: any) => {
      return sum + val * val;
    }, 0)
  );
};

const getCosineSimilarity = (a: any, b: any) => {
  return dotProduct(a, b) / (magnitude(a) * magnitude(b));
};



/******* main functions *******/

function getVectorForWord(method: string, url: string, word: string) {
  return new Promise<string>((resolve, reject) => {
    fetch(url, {
      method: method,
      headers: {
        "content-type": "application/json",
        word: word,
      },
    })
      .then((res) => res.text())
      .then((res) => resolve(res));
  });
}

export const getAverageVectorFromWords = async (words: string[]) => {
  let nodeVectors: number[][] = [];
  for (const word of words) {
    let vec = await getVectorForWord("GET", "/api/getWordVector", word);
    //convert to number[]
    const wordVectorNumber = convertStringToNumberArray(vec);
    nodeVectors.push(wordVectorNumber);
  }
  //calculate average vector
  let averageVector: number[] = [];
  for (let i = 0; i < nodeVectors[0].length; i++) {
    let sum = 0;
    for (let j = 0; j < nodeVectors.length; j++) {
      sum += nodeVectors[j][i];
    }
    averageVector.push(sum / nodeVectors.length);
  }
  return averageVector;
};

const convertStringToNumberArray = (str: string) => {
  const strArray = str.split(",");
  const numArray: number[] = [];
  strArray.forEach((str) => {
    numArray.push(Number(str));
  });
  return numArray;
};