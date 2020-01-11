import { BranchSpec, Chord } from 'laminations-lib'
import { RenderPolygon } from './render-polygon';

export interface LaminationDefinition {
  base: number
  name?: string
  description?: string
  leaves: Array<{
    points: string[]
    branch?: boolean
    flipEndpoints?: boolean
    flipDiameters?: boolean
    settings?: ShapeRenderSettings
  }>
  branches: Array<{
    chord: [string, string]
    endpoints: string[]
    flip?: boolean
  }>
  settings?: RenderSettings
}

export interface LaminationData {
  base: number
  leaves: RenderPolygon[]
  branchSpecs: BranchSpec[]
  name: string
  description?: string
  renderSettings: RenderSettings
}

export interface LaminationState {
  lamination: RenderPolygon[],
  criticalChords: Chord[],
}

export interface ShapeRenderSettings {
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
}

export interface RenderSettings {
  size?: number,
  renderHyperbolic?: boolean,
  backgroundColor?: string,
  polygons?: ShapeRenderSettings,
  criticalChords?: ShapeRenderSettings,
  circle?: ShapeRenderSettings,
}

export interface BuilderState {
  laminationState: LaminationState,
  renderSettings: RenderSettings,
}