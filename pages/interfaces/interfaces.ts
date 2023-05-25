interface Image {
  imageId: string;
  title: string;
}

interface ClusterDataPoint {
    id: string;
    vector: number[];
  }

  
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


interface Node {
  id: string;
  frameId: string;
  imageId: string;
  stickyIds: string[];
}

class InformationNode {
  id: string;
  avgVector: number[];
  clusterId: number;
  newWordCounter: number = 0;

  constructor(id: string, avgVector: number[], clusterId: number) {
    this.id = id;
    this.avgVector = avgVector;
    this.clusterId = clusterId;
  }

  async getNewWordOfCluster() {
    this.newWordCounter++;
        const res = await fetch("/api/getSimilarWord", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        vector: this.avgVector.toString(),
        distance: this.newWordCounter.toString(),
      },
    });
    if (res.status !== 200) {
      const text = await res.text();
      try {
        throw new Error(JSON.parse(text));
      } catch (err) {
        throw new Error(text);
      }
    }

    try {
      const sampleItem = await res.json();
      return sampleItem.data.imageUrl;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

}