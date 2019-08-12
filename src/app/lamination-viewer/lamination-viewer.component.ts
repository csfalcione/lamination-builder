import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Polygon, NaryFraction, Chord } from 'laminations-lib';

const mod = (a, b) => ((a % b) + b) % b

const displayPoint = (t: NaryFraction) => t.toRational().join('/')

const displayPolygon = (poly) => {
  return poly.points.map(displayPoint).join(', ')
}

const toAngle = (t: NaryFraction) => 2 * Math.PI * t.toNumber()
const svgPoint = (t: NaryFraction, radius: number) => {
  const angle = toAngle(t)
  const xCoord = Math.floor(radius * Math.cos(angle))
  const yCoord = Math.floor(radius * Math.sin(angle))
  return `${xCoord},${yCoord}`
}

@Component({
  selector: 'app-lamination-viewer',
  templateUrl: './lamination-viewer.component.html',
  styleUrls: ['./lamination-viewer.component.css']
})
export class LaminationViewerComponent implements OnInit {

  @Input() lamination: Array<Polygon>

  @Input() criticalChords: Array<Chord> = []

  @Input() hyperbolic: boolean = true

  @ViewChild('laminationCanvas') canvas: ElementRef

  width = 600
  height = 600

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    const ctx: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d')

    this.clearCanvas(ctx)
    const [midX, midY] = this.getMidpoint()
    // Transforms space so that origin is in middle of canvas, up is
    // the positive y direction, and right is the positive x direction.
    ctx.transform(1, 0, 0, -1, midX, midY)

    ctx.lineWidth = 2
    ctx.fillStyle = '#CC0000'
    this.drawLamination(ctx, this.lamination)

    ctx.lineWidth = 2
    ctx.strokeStyle = '#0000AA'
    this.drawCriticalChords(ctx, this.criticalChords)

    ctx.lineWidth = 3
    ctx.strokeStyle = '#000000'
    this.drawCircle(ctx)

    ctx.resetTransform()
  }

  clearCanvas(ctx: CanvasRenderingContext2D) {
    console.debug("clearing canvas")
    ctx.clearRect(0, 0, this.width, this.height)
  }

  drawCircle(ctx: CanvasRenderingContext2D) {
    const radius = this.getRadius()
    ctx.beginPath()
    ctx.arc(0, 0, radius, 0, 2* Math.PI)
    ctx.clip()
    ctx.closePath()
    ctx.stroke()
  }

  drawLamination(ctx: CanvasRenderingContext2D, lamination: Array<Polygon>) {
    lamination.forEach(poly => this.drawPoly(ctx, poly))
  }

  drawCriticalChords(ctx: CanvasRenderingContext2D, chords: Array<Chord>) {
    chords.map(Polygon.fromChord).forEach(poly => this.drawPoly(ctx, poly))
  }

  drawPoly(ctx: CanvasRenderingContext2D, polygon: Polygon) {
    const radius = this.getRadius()
    const svgPathString = this.makeSVGPath(polygon, radius)
    const path = new Path2D(svgPathString)

    ctx.stroke(path)
    if (polygon.points.length > 2) {
      ctx.fill(path)
    }
  }

  makeSVGPath(polygon: Polygon, circleRadius: number) {
    const pathSpecs = []

    const points = polygon.points

    pathSpecs.push(`M ${svgPoint(points[0], circleRadius)}`)

    for (let i = 1; i < points.length; i++) {
      const point = points[i]
      const prevPoint = points[i - 1]
      pathSpecs.push(this.getLinePathTo(point, prevPoint, circleRadius))
    }

    if (points.length > 2) {
      pathSpecs.push(this.getLinePathTo(points[0], points[points.length - 1], circleRadius))
    }

    return pathSpecs.join(' ')
  }

  getLinePathTo(point: NaryFraction, prevPoint: NaryFraction, circleRadius: number, hyperbolic = this.hyperbolic) {
    if (!hyperbolic) {
      return `L ${svgPoint(point, circleRadius)}`
    }

    const chordWidth = mod(point.toNumber() - prevPoint.toNumber(), 1)
    if (Math.abs(chordWidth - 0.5) < 0.0001) {
      return this.getLinePathTo(point, prevPoint, circleRadius, false)
    }
    const sweepFlag = chordWidth <= 0.5 ? 0 : 1
    const arcRadius = circleRadius * Math.tan(Math.PI*Math.min(chordWidth, 1 - chordWidth))

    return `A ${arcRadius},${arcRadius} 0 0,${sweepFlag} ${svgPoint(point, circleRadius)}`
  }

  getMidpoint(): [number, number] {
    return [this.width / 2, this.height / 2]
  }

  getRadius() {
    return Math.floor(Math.min(this.width, this.height)) / 2 - 10
  }

  prettyPrint(lamination: Array<Polygon>) {
    return lamination.map(displayPolygon).join("\n")
  }

}
