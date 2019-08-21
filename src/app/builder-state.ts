import { Polygon, Chord } from 'laminations-lib';

export interface LaminationState {
  lamination: Array<Polygon>,
  criticalChords: Array<Chord>,
}

export interface RenderSettings {
  renderHyperbolic: boolean,
  size: number,
  polygonColor: string,
  chordColor: string,
  criticalChordColor: string,
  backgroundColor: string,
  circleColor: string,
}

export interface BuilderState {
  laminationState: LaminationState,
  renderSettings: RenderSettings,
}

