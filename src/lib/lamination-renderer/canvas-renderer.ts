import { RenderSettings, LaminationState } from "../definitions";
import { LaminationRenderer } from './lamination-renderer';
import { Polygon, Chord } from 'laminations-lib';
import { makeSVGPath } from './svg-renderer';

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

  const drawPolygon = (polygon: Polygon) => {
    if (polygon.points.size === 0) {
      return;
    }
    const radius = getRadius()
    const svgPathString = makeSVGPath(polygon, radius, settings.renderHyperbolic)
    const path = new Path2D(svgPathString)

    ctx.stroke(path)
    if (polygon.points.size > 2) {
      ctx.fill(path)
    }
  }

  const drawLamination = (lamination: Polygon[]) => {
    lamination.forEach(drawPolygon)
  }

  const drawCriticalChords = (chords: Chord[]) => {
    drawLamination(chords.map(Polygon.fromChord))
  }

  const drawCircle = (radius) => {
    ctx.beginPath()
    ctx.arc(0, 0, radius, 0, 2 * Math.PI)
    ctx.clip()
    ctx.closePath()
    ctx.stroke()
  }

  const render = (laminationState: LaminationState) => {
    clearCanvas()
    const [midX, midY] = getMidpoint()
    // Transforms space so that origin is in middle of canvas, up is
    // the positive y direction, and right is the positive x direction.
    ctx.transform(1, 0, 0, -1, midX, midY)

    ctx.lineWidth = 3
    ctx.strokeStyle = settings.circleColor
    drawCircle(getRadius() + 1)

    ctx.lineWidth = 2
    ctx.strokeStyle = settings.chordColor
    ctx.fillStyle = settings.polygonColor
    drawLamination(laminationState.lamination)

    ctx.lineWidth = 2
    ctx.strokeStyle = settings.criticalChordColor
    drawCriticalChords(laminationState.criticalChords)

    ctx.resetTransform()
  }

  return {render}
}