interface Image {
  imageId: string;
  title: string;
}

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
