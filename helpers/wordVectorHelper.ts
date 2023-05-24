/* import glovesImport from "../data/glove-6B-50d/smallTestData.json";
//import glovesImport from "../data/glove-6B-50d/glove6b50d.json";
const gloves = <any>glovesImport; */

/******* helper functions *******/
/* const getWordVector = (word: string) => {
  if (word.length == 0) {
    //TODO: Add error handling for invalid word
    return;
  }
  let vector = gloves[word];
  console.log("vector", vector)
  return vector;
}; */

const calculateEuclideanDistance = (vector1: number[], vector2: number[]) => {
  let sum: number = 0;
  for (let i = 0; i < vector1.length; i++) {
    sum += Math.pow(vector1[i] - vector2[i], 2);
  }
  return Math.sqrt(sum);
};

const getClosestMatches = (vec: number[]) => {
  var sims: [string, number][] = [];

  for (let word in gloves) {
    let sim = getCosineSimilarity(vec, gloves[word]);
    sims.push([word, sim]);
  }
  sims.sort((a: any, b: any) => {
    return b[1] - a[1];
  });

  return sims;
};

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

/**
 * returns euclidean distances between all words in words array based on word2vec
 * @param words words to compare to
 * @returns euclidean distances between all words
 */
export const getEuclideanDistances = (words: string[]) => {
  let distances: string[] = [];
  //console.log("words:", words);

  // check if all words are in gloves
  words.forEach((word: string) => {
    if (!gloves.hasOwnProperty(word)) {
      return [false, word];
    }
  });

  // calculate euclidean distance between all words
  for (let i = 0; i < words.length; i++) {
    let word1Vector: number[] = getWordVector(words[i]);
    for (let j = i + 1; j < words.length; j++) {
      let word2Vector: number[] = getWordVector(words[j]);
      let text =
        "The euclidean distance between *" +
        words[i] +
        "* and *" +
        words[j] +
        "* is: " +
        calculateEuclideanDistance(word1Vector, word2Vector);
      distances.push(text);
    }
  }
  return distances;
};

/**
 * returns the n most similar words that are not in the words array based on euclidean distance from word2vec
 * @param n number of new words to return
 * @param words words to compare to
 * @returns new words
 */
export const getUniqueNewWords = (n: number, words: string[]) => {
  // check if all words are in gloves
  words.forEach((word: string) => {
    if (!gloves.hasOwnProperty(word)) {
      return [false, word];
    }
  });

  // get vectors for all words
  let vectors: number[][] = [];
  words.forEach((word: string) => {
    vectors.push(getWordVector(word));
  });
  //console.log(vectors)

  // calculate average vector
  let averageVector: number[] = [];
  for (let i = 0; i < vectors[0].length; i++) {
    let sum: number = 0;
    vectors.forEach((vector: number[]) => {
      sum += vector[i];
    });
    averageVector.push(sum / vectors.length);
  }
  // console.log('averageVector', averageVector)

  // get n closest matches
  /*   let similarWords: string[] = [];
  for (let i = 0; i <= n; i++) {
    let newWord = getClosestMatches(averageVector);
    //console.log(newWord);

  } */
  let similarWords = getClosestMatches(averageVector);
  //console.log(similarWords);

  let nNewWords: string[] = [];
  for (let i = 0; i < similarWords.length; i++) {
    // push if similar word is not in words array
    if (!words.includes(similarWords[i][0])) {
      nNewWords.push(similarWords[i][0]);
    }

    // break if n new words are found
    if (nNewWords.length == n) {
      break;
    }
  }

  //console.log('nNewWords', nNewWords)
  return nNewWords;
};

export const getAverageVectorFromWords = (words: string[]) => {
    // check if all words are in gloves
    words.forEach((word: string) => {
        if (!gloves.hasOwnProperty(word)) {
            return [false, word];
        }
    });

    // get vectors for all words
    let vectors: number[][] = [];
    words.forEach((word: string) => {
        vectors.push(getWordVector(word));
    });

    console.log(vectors)

    // calculate average vector
    let averageVector: number[] = [];
    for (let i = 0; i < vectors[0].length; i++) {
        let sum: number = 0;
        vectors.forEach((vector: number[]) => {
            sum += vector[i];
        });
        averageVector.push(sum / vectors.length);
    }

    return averageVector;
}

