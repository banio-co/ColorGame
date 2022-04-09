export type Dictionary<T> = Readonly<{
  [key: string]: T;
}>

export type Point = {
  x: number;
  y: number;
};

export type Polygon = {
  points: Point[];
}

export type Node = Readonly<{
  id: string;
  color: string;
  position: Point;
  neighbors: Dictionary<Node>;
}>;
