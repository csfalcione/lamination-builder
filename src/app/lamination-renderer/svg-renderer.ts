import { Polygon, NaryFraction } from 'laminations-lib';

// JS's % operator performs the remainder operation, not the modulus operation.
// They behave differently for negatives.
const mod = (a, b) => ((a % b) + b) % b

const toRadians = (t: NaryFraction) => 2 * Math.PI * t.toNumber()

const svgPoint = (t: NaryFraction, radius: number) => {
  const angle = toRadians(t)
  const xCoord = Math.floor(radius * Math.cos(angle))
  const yCoord = Math.floor(radius * Math.sin(angle))
  return `${xCoord},${yCoord}`
}

const getLinePathTo = (point: NaryFraction, prevPoint: NaryFraction, circleRadius: number, hyperbolic: boolean): string => {
  if (!hyperbolic) {
    return `L ${svgPoint(point, circleRadius)}`
  }

  const chordWidth = mod(point.toNumber() - prevPoint.toNumber(), 1)
  if (Math.abs(chordWidth - 0.5) < 0.0001) {
    return getLinePathTo(point, prevPoint, circleRadius, false)
  }
  const sweepFlag = chordWidth <= 0.5 ? 0 : 1
  const arcRadius = circleRadius * Math.tan(Math.PI * Math.min(chordWidth, 1 - chordWidth))

  return `A ${arcRadius},${arcRadius} 0 0,${sweepFlag} ${svgPoint(point, circleRadius)}`
}

export const makeSVGPath = (polygon: Polygon, circleRadius: number, hyperbolic: boolean): string => {
  const pathSpecs = []

  const points = polygon.points

  pathSpecs.push(`M ${svgPoint(points[0], circleRadius)}`)

  for (let i = 1; i < points.length; i++) {
    const point = points[i]
    const prevPoint = points[i - 1]
    pathSpecs.push(getLinePathTo(point, prevPoint, circleRadius, hyperbolic))
  }

  if (points.length > 2) {
    pathSpecs.push(getLinePathTo(points[0], points[points.length - 1], circleRadius, hyperbolic))
  }

  return pathSpecs.join(' ')
}