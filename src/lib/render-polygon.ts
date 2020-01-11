import { Polygon, Polygons } from 'laminations-lib'
import { ShapeRenderSettings } from './definitions'

export interface RenderPolygon extends Polygon {
    settings: ShapeRenderSettings,
}

const from = (poly: Polygon, settings: ShapeRenderSettings): RenderPolygon => ({
    ...poly,
    settings,
})

const raiseChild = (parent: RenderPolygon, child: Polygon): RenderPolygon => from(child, parent.settings)

const map = (poly: RenderPolygon, func: (inner: Polygon) => Polygon): RenderPolygon => from(func(poly), poly.settings)

const mapForward = (poly: RenderPolygon): RenderPolygon => map(poly, Polygons.mapForward)

export const RenderPolygons = {
    from,
    raiseChild,
    map,
    mapForward,
}
