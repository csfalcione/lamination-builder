import { RenderSettings, LaminationState, ShapeRenderSettings } from "../definitions";
import { LaminationRenderer } from './lamination-renderer';
import { Polygon, Chord, Polygons } from 'laminations-lib';
import { makeSVGPath, point } from './svg-renderer';
import { RenderPolygon, RenderPolygons } from '../render-polygon';

export const makeCanvasRenderer = (ctx: CanvasRenderingContext2D, settings: RenderSettings): LaminationRenderer<void> => {
  
  const getRadius = () => Math.floor(settings.size / 2) - 10

  const getMidpoint = (): [number, number] => {
    const half = settings.size / 2
    return [half, half]
  }

  const clearCanvas = () => {
    const size = settings.size
    ctx.clearRect(0, 0, size, size)
  }

  const drawPolygon = (polygon: RenderPolygon) => {
    if (polygon.points.size === 0) {
      return;
    }
    
    const radius = getRadius()
    if (polygon.points.size === 1) {
      drawCircle(polygon.settings.strokeWidth / 2, polygon.settings, ...point(polygon.points.first(), radius))
      return
    }

    const svgPathString = makeSVGPath(polygon, radius, settings.renderHyperbolic)
    const path = new Path2D(svgPathString)

    ctx.lineWidth = polygon.settings.strokeWidth
    ctx.strokeStyle = polygon.settings.strokeColor
    ctx.fillStyle = polygon.settings.fillColor

    if (polygon.points.size > 2) {
      ctx.fill(path)
    }
    ctx.stroke(path)
  }

  const drawLamination = (lamination: RenderPolygon[]) => {
    lamination.forEach(drawPolygon)
  }

  const drawCriticalChords = (chords: Chord[], settings: ShapeRenderSettings) => {
    drawLamination(chords.map(Polygons.fromChord).map(p => RenderPolygons.from(p, settings)))
  }

  const drawCircle = (radius, settings: ShapeRenderSettings, x = 0, y = 0) => {
    const circleStrokeWidth = settings.strokeWidth
    ctx.lineWidth = circleStrokeWidth
    ctx.strokeStyle = settings.strokeColor
    ctx.fillStyle = settings.fillColor

    ctx.beginPath()
    ctx.arc(x, y, radius + Math.floor(circleStrokeWidth / 2), 0, 2 * Math.PI)
    ctx.closePath()
    if (settings.fillColor !== 'none') {
      ctx.fill()
    }
    ctx.stroke()
  }

  const render = (laminationState: LaminationState) => {
    clearCanvas()
    const [midX, midY] = getMidpoint()
    // Transforms space so that origin is in middle of canvas, up is
    // the positive y direction, and right is the positive x direction.
    ctx.transform(1, 0, 0, -1, midX, midY)

    drawCircle(getRadius(), settings.circle)
    drawLamination(laminationState.lamination)
    drawCriticalChords(laminationState.criticalChords, settings.criticalChords)

    ctx.resetTransform()
  }

  return {render}
}