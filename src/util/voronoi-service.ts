import { Delaunay, Voronoi } from 'd3-delaunay';
import { reduce } from 'lodash';

import { Dictionary, Polygon, Cell, Point } from './model';

type D3Point = [number, number];

const parsePoints = (d3Points: D3Point[]): Point[] => {
  return d3Points.map((point) => ({
    x: point[0],
    y: point[1],
  }));
};

const getPolygons = (voronoi: Voronoi<D3Point[]>): Polygon[] => {
  const polygons: Polygon[] = [];
  const iterable = voronoi.cellPolygons();
  for (const entry of iterable) {
    polygons.push(parsePoints(entry as unknown as D3Point[]));
  }

  return polygons;
};

const parseCell = (voronoi: Voronoi<D3Point[]>, polygon: Polygon, index: number): Cell => {
  const neighbors: string[] = [];
  const iterable = voronoi.neighbors(index);
  for (const entry of iterable) {
    // TODO: Use hash function to generate better IDs...
    neighbors.push(`node-${entry}`);
  }

  return {
    id: `cell-${index}`,
    color: null,
    polygons: [ polygon ],
    neighbors,
  };
};

export const generateNodes = (points: D3Point[], viewBounds: [number, number, number, number]): Dictionary<Cell> => {
  const delaunay = Delaunay.from(points);
  const voronoi = delaunay.voronoi(viewBounds);

  // Gets all cell polygon definitions from the generated voronoi diagram
  const polygons = getPolygons(voronoi);

  // Create a cell from each polygon
  const cells: Cell[] = polygons.map((polygon, index) => parseCell(voronoi, polygon, index));

  // Parse nodes into dictionary of nodes by id
  const cellsById = reduce<Cell, Dictionary<Cell>>(cells, (result, cell) => {
    result[cell.id] = cell;
    return result;
  }, {});

  return cellsById;
};
