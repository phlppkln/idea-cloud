interface Data {
    id: string;
    vector: number[];
  }
  
  class Cluster {
    centroid: number[];
    points: Data[];
  
    constructor(centroid: number[]) {
      this.centroid = centroid;
      this.points = [];
    }
  
    clearPoints() {
      this.points = [];
    }
  
    addPoint(point: Data) {
      this.points.push(point);
    }
  }
  
  function euclideanDistance(vector1: number[], vector2: number[]): number {
    const squaredDistances = vector1.map((val, idx) => (val - vector2[idx]) ** 2);
    const sumOfSquaredDistances = squaredDistances.reduce((acc, val) => acc + val, 0);
    return Math.sqrt(sumOfSquaredDistances);
  }
  
  function assignPointsToClusters(points: Data[], clusters: Cluster[]): void {
    for (const cluster of clusters) {
      cluster.clearPoints();
    }
  
    for (const point of points) {
      let minDistance = Infinity;
      let assignedCluster: Cluster | undefined;
  
      for (const cluster of clusters) {
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
  
  function calculateCentroids(clusters: Cluster[]): void {
    for (const cluster of clusters) {
      const numDimensions = cluster.centroid.length;
      const sumVector:number[] = new Array(numDimensions).fill(0);
  
      for (const point of cluster.points) {
        for (let i = 0; i < numDimensions; i++) {
          sumVector[i] += point.vector[i];
        }
      }
  
      const numPoints = cluster.points.length;
  
      if (numPoints > 0) {
        const newCentroid = sumVector.map((val) => val / numPoints);
        cluster.centroid = newCentroid;
      }
    }
  }
  
  function kMeansClustering(points: Data[], k: number): Cluster[] {
    // Initialize clusters with random centroids
    const clusters: Cluster[] = [];
    const shuffledPoints = points.slice().sort(() => Math.random() - 0.5);
  
    for (let i = 0; i < k; i++) {
      const centroid = shuffledPoints[i].vector;
      const cluster = new Cluster(centroid);
      clusters.push(cluster);
    }
  
    // Iterate until convergence
    let prevCentroids: number[][] = [];
  
    while (true) {
      assignPointsToClusters(points, clusters);
      calculateCentroids(clusters);
  
      const currentCentroids = clusters.map((cluster) => cluster.centroid);
  
      if (currentCentroids.every((centroid, idx) => euclideanDistance(centroid, prevCentroids[idx]) === 0)) {
        break;
      }
  
      prevCentroids = currentCentroids;
    }
  
    return clusters;
  }
  
  // Example usage
  const points: Data[] = [
    { id: "A", vector: [1, 2, 3] },
    { id: "B", vector: [2, 1, 4] },
    { id: "C", vector: [10, 12, 8] },
    { id: "D", vector: [12, 11, 9] },
    { id: "E", vector: [20, 20, 18] },
    { id: "F", vector: [22, 21, 19] },
  ];
  
  const k = 2;
  const clusters = kMeansClustering(points, k);
  
  // Print clusters
  for (let i = 0; i < clusters.length; i++) {
    console.log(`Cluster ${i + 1}:`);
    console.log("Centroid:", clusters[i].centroid);
    console.log("Points:", clusters[i].points);
    console.log("-----------------------");
  }