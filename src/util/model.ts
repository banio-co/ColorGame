export type Dictionary<T> = {
  [key: string]: T;
};

export type Point = Readonly<{
  x: number;
  y: number;
}>;

export type Polygon = Readonly<Point[]>;

export type Cell = {
  id: string;
  color: string | null;
  polygons: Polygon[];
  neighbors: string[];
};
