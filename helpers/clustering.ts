
class Cluster {
  centroid: number[];
  points: ClusterDataPoint[];

  constructor(centroid: number[]) {
    this.centroid = centroid;
    this.points = [];
  }

  clearPoints() {
    this.points = [];
  }

  addPoint(point: ClusterDataPoint) {
    this.points.push(point);
  }
}

const euclideanDistance = (vector1: number[], vector2: number[]) => {
  let sum: number = 0;
  //console.log('vector1', vector1)
  //console.log('vector2', vector2)
  for (let i = 0; i < vector1.length; i++) {
    sum += Math.pow(vector1[i] - vector2[i], 2);
  }
  return Math.sqrt(sum);
};

/**
 * Assigns each data point to its nearest cluster based on the Euclidean distance.
 * 
 * @param points points to be assigned to clusters
 * @param clusters clusters to assign points to
 */
function assignPointsToClusters(points: ClusterDataPoint[], clusters: Cluster[]): void {

  // iterates over all the data points, calculating the distance to each cluster's centroid
  // and assigning the point to the cluster with the minimum distance.

  //clear points in clusters
  for (const cluster of clusters) {
    cluster.clearPoints();
  }

  // iterate over all points
  for (const point of points) {
    let minDistance = Infinity;
    let assignedCluster: Cluster | undefined;

    // iterate over all clusters
    for (const cluster of clusters) {
      // find the closest cluster to the point
      const distance = euclideanDistance(point.vector, cluster.centroid);
      if (distance < minDistance) {
        minDistance = distance;
        assignedCluster = cluster;
      }
    }

    if (assignedCluster) {
      assignedCluster.addPoint(point);
    }
  }
}

/**
 * updates the centroids of each cluster based on the mean values of its associated data points
 * @param clusters clusters to calculate centroids for
 */
function calculateCentroids(clusters: Cluster[]): void {
  // iterate over all clusters
  for (const cluster of clusters) {
    const numDimensions = cluster.centroid.length; 
    const sumVector: number[] = new Array(numDimensions).fill(0); 

    // iterate over all points in cluster
    for (const point of cluster.points) {
      // iterate over all dimensions of clusters centroid
      for (let i = 0; i < numDimensions; i++) {
        sumVector[i] += point.vector[i];
      }
    }

    const numPoints = cluster.points.length;

    if (numPoints > 0) {
      // calculate mean values
      const newCentroid = sumVector.map((val) => val / numPoints);
      cluster.centroid = newCentroid;
    }
  }
}

/**
 * checks if centroids changed (= their values are different)
 * @param prevCentroids previous centroids
 * @param currentCentroids new centroids
 * @returns true if centroids changed, false otherwise
 */
function didCentroidsChange(prevCentroids: number[][], currentCentroids: number[][]) : boolean {
  if (prevCentroids.length != currentCentroids.length) {
    return true;
  }

  for (let i = 0; i < prevCentroids.length; i++) {
    for (let j = 0; j < prevCentroids[i].length; j++) {
      if (prevCentroids[i][j] != currentCentroids[i][j]) {
        return true;
      }
    }
  }
  return false;
}

/**
 * does K-means clustering
 * @param points 
 * @param k 
 * @returns 
 */
export function kMeansClustering(points: ClusterDataPoint[], k: number): Cluster[] {
  // Initialize clusters with random centroids
  const clusters: Cluster[] = [];
  const shuffledPoints = points.slice().sort(() => Math.random() - 0.5);

  // pick first k points as centroids
  for (let i = 0; i < k; i++) {
    const centroid = shuffledPoints[i].vector;
    const cluster = new Cluster(centroid);
    clusters.push(cluster);
  }

  // Iterate until convergence
  let prevCentroids: number[][] = [];

  while (true) {
    assignPointsToClusters(points, clusters); // assign points to clusters
    calculateCentroids(clusters); // calculate new centroids for clusters

    // check if clusters changed
    const currentCentroids = clusters.map((cluster) => cluster.centroid);

    //console.log("currentCentroids", currentCentroids);
    //console.log("prevCentroids", prevCentroids);
    if (prevCentroids.length != 0) {
      if (!didCentroidsChange(prevCentroids, currentCentroids)) {
        break;
      }
    }

    prevCentroids = currentCentroids;
  }

  return clusters;
}





export function testKMeansClustering(): Cluster[] {
  // Example usage
  const points: ClusterDataPoint[] = [
    { id: "E", vector: [20, 20, 18] },
    { id: "F", vector: [22, 21, 19] },
    { id: "A", vector: [1, 2, 3] },
    { id: "G", vector: [30, 30, 28] },
    { id: "B", vector: [2, 1, 4] },
    { id: "I", vector: [40, 40, 38] },
    { id: "J", vector: [42, 41, 39] },
    { id: "C", vector: [10, 12, 8] },
    { id: "H", vector: [32, 31, 29] },
    { id: "D", vector: [12, 11, 9] },
    { id: "K", vector: [50, 50, 48] },
    { id: "L", vector: [2, 51, 494]},
    { id: "M", vector: [23, 1251, 494]}
  ];

  const k = 4;
  const clusters = kMeansClustering(points, k);

  // Print clusters
  for (let i = 0; i < clusters.length; i++) {
    console.log(`Cluster ${i + 1}:`);
    console.log("Centroid:", clusters[i].centroid);
    console.log("Points:", clusters[i].points);
    console.log("-----------------------");
  }
  return clusters;
}
