import { Polygon, Polygons } from 'laminations-lib'
import { ShapeRenderSettings } from './definitions'
import { Pair } from './pair/pair'

export type RenderPolygon = Pair<Polygon, ShapeRenderSettings>

const from = (poly: Polygon, settings: ShapeRenderSettings): RenderPolygon => new Pair(poly, settings)

const mapForward = (poly: RenderPolygon): RenderPolygon => poly.mapLeft(Polygons.mapForward)

export const RenderPolygons = {
    from,
    mapForward,
}
