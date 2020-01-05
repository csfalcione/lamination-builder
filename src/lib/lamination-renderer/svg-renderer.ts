import { Polygon, NaryFraction, Chord } from 'laminations-lib';
import { RenderSettings, LaminationState } from '../definitions';
import { LaminationRenderer } from './lamination-renderer';

// JS's % operator performs the remainder operation, not the modulus operation.
// They behave differently for negatives.
const mod = (a, b) => ((a % b) + b) % b

const toRadians = (t: NaryFraction) => 2 * Math.PI * t.toNumber()

const svgPoint = (t: NaryFraction, radius: number) => {
  const angle = toRadians(t)
  const xCoord = radius * Math.cos(angle)
  const yCoord = radius * Math.sin(angle)
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

  pathSpecs.push(`M ${svgPoint(points.first(), circleRadius)}`)

  for (let i = 1; i < points.size; i++) {
    const point = points.get(i)
    const prevPoint = points.get(i - 1)
    pathSpecs.push(getLinePathTo(point, prevPoint, circleRadius, hyperbolic))
  }

  if (points.size > 2) {
    pathSpecs.push(getLinePathTo(points.first(), points.last(), circleRadius, hyperbolic))
  }

  return pathSpecs.join(' ')
}

const tag = (name: string, attributes: Object = {}, body: string = ''): string => {
  const renderedAttributes = Object.entries(attributes)
    .filter(([key, _]) => attributes.hasOwnProperty(key))
    .map(([key, val]) => `${key}="${val}"`)
    .join(' ')
  return `<${name} ${renderedAttributes}>${body}</${name}>`
}

const defaultSvgAttrs = {
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
}

export const makeSvgRenderer = (settings: RenderSettings): LaminationRenderer<string> => {
  const radius = Math.floor(2 * settings.size) - 10

  const render = (laminationState: LaminationState): string => {
    const midpoint = 2 * settings.size // Quadruple the size
    const transform = `matrix(1,0,0,-1,${midpoint},${midpoint})`

    const circle = tag('circle', {
      r: radius,
      stroke: settings.circleColor,
      'stroke-width': 3,
      fill: 'none',
      transform,
    })

    const chords = laminationState.lamination
      .map((polygon: Polygon) => {
        if (polygon.points.size === 0) {
          return;
        }
        let strokeWidth = 1
        if (polygon.toChords().some((chord: Chord) => {
          const width = chord.upper.toNumber() - chord.lower.toNumber()
          return width < 0.01 || 1 - width < 0.01
        })) {
          strokeWidth = 0.25
        }
        return tag('path', {
          stroke: settings.chordColor,
          fill: polygon.points.size > 2 ? settings.polygonColor : 'none',
          'stroke-width': strokeWidth,
          transform,
          d: makeSVGPath(polygon, radius, settings.renderHyperbolic)
        })
      })
      .join('')
    
    const criticalChords = laminationState.criticalChords
      .map((chord: Chord) => tag('path', {
        stroke: settings.criticalChordColor,
        'stroke-width': 2,
        fill: 'none',
        transform,
        d: makeSVGPath(Polygon.fromChord(chord), radius, settings.renderHyperbolic)
      }))
      .join('')

    return tag('svg', {
      ...defaultSvgAttrs,
      width: 4 * settings.size,
      height: 4 * settings.size,
      'background-color': settings.backgroundColor,
    }, `${circle}${chords}${criticalChords}`)
  }

  return {render}
}