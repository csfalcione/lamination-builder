import { Polygon, Polygons } from 'laminations-lib'
import { ShapeRenderSettings } from './definitions'
import { Pair } from './pair/pair'

export interface Settings {
    renderSettings: ShapeRenderSettings,
    ignore?: boolean,
}

export type RenderPolygon = Pair<Polygon, Settings>

const from = (poly: Polygon, settings: Settings): RenderPolygon => new Pair(poly, settings)

const mapForward = (poly: RenderPolygon): RenderPolygon => poly.mapLeft(Polygons.mapForward)

export const RenderPolygons = {
    from,
    mapForward,
}
