interface Projector {
  depth: number;
  lensOffset: number;
  lensDiameter: number;
  throwRatio: number;
  aspectRatio: [number, number];
  offset: number;
  lumen: number;
  maxZoom?: number
}

export {type Projector}