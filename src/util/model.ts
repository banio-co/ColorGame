export type Dictionary<T> = {
  [key: string]: T;
};

export type Point = Readonly<{
  x: number;
  y: number;
}>;

export type Polygon = Readonly<{
  points: Point[];
}>;

export type Node = {
  id: string;
  color: string;
  polygons: Polygon[];
  neighbors: Dictionary<Node>;
};
