import { Delaunay, Voronoi } from 'd3-delaunay';
import { reduce } from 'lodash';
import { PRNG } from 'seedrandom';

import { Dictionary, Polygon, Cell, Point } from './model';
import { getNumberInRange } from './random';

// [x, y]
type D3Point = [number, number];
// [xMin, yMin, xMax, yMax]
type ViewBounds = [number, number, number, number];

// Parse D3Points into more readable Point type
const parsePoints = (d3Points: D3Point[]): Point[] => {
  return d3Points.map((point) => ({
    x: point[0],
    y: point[1],
  }));
};

// Gets and parses Polygon data from a voronoi diagram
const getPolygons = (voronoi: Voronoi<D3Point[]>): Polygon[] => {
  const polygons: Polygon[] = [];
  const iterable = voronoi.cellPolygons();
  for (const entry of iterable) {
    polygons.push(parsePoints(entry as unknown as D3Point[]));
  }

  return polygons;
};

// Gets neighbors for a given Polygon and generates a Cell object with a unique index based id
const parseCell = (voronoi: Voronoi<D3Point[]>, polygon: Polygon, index: number): Cell => {
  const neighbors: Set<string> = new Set();
  const iterable = voronoi.neighbors(index);
  for (const entry of iterable) {
    // TODO: Use hash function to generate better IDs...
    neighbors.add(`cell-${entry}`);
  }

  return {
    id: `cell-${index}`,
    color: null,
    polygons: [ polygon ],
    neighbors,
  };
};

/**
 * Generates game cells
 * @param {D3Point[]} points d3-delaunay consumable [x, y] points
 * @param {ViewBounds} viewBounds Viewport boundaries (xMin, yMin, xMax, yMax)
 * @return {Dictionary<Cell>} "Massaged" data representing the vornoi diagram with pre-processed properties
 */
export const generateCells = (points: D3Point[], viewBounds: ViewBounds): Dictionary<Cell> => {
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

/**
 * Generates a set of points used to generate a voronoi diagram
 * @param {PRNG} rng Seeded random number generator from 'seedrandom'
 * @param {number} count Number of points to generate
 * @param {ViewBounds} viewBounds Viewport boundaries (xMin, yMin, xMax, yMax)
 * @return {D3Point[]} d3-delaunay consumable [x, y] points
 */
export const generatePoints = (rng: PRNG, count: number, viewBounds: ViewBounds): D3Point[] => {
  const points: D3Point[] = [];

  for (let i = 0; i < count; i++) {
    points.push([
      getNumberInRange(rng, viewBounds[0], viewBounds[2]),
      getNumberInRange(rng, viewBounds[1], viewBounds[3]),
    ]);
  }

  return points;
};
