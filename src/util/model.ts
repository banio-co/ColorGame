export type Dictionary<T> = {
  [key: string]: T;
};

export type Point = {
  x: number;
  y: number;
};

export type Polygon = {
  points: Point[];
}

export type Node = {
  id: string;
  color: string;
  polygons: Polygon[];
  neighbors: Dictionary<Node>;
};
