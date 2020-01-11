import { Polygon, Fraction, Chord, Fractions, Chords, Polygons } from 'laminations-lib';
import { RenderSettings, LaminationState } from '../definitions';
import { LaminationRenderer } from './lamination-renderer';
import { RenderPolygon } from '../render-polygon';

// JS's % operator performs the remainder operation, not the modulus operation.
// They behave differently for negatives.
const mod = (a, b) => ((a % b) + b) % b

const toRadians = (t: Fraction) => 2 * Math.PI * Fractions.toNumber(t)

const svgPoint = (t: Fraction, radius: number) => {
  const angle = toRadians(t)
  const xCoord = radius * Math.cos(angle)
  const yCoord = radius * Math.sin(angle)
  return `${xCoord},${yCoord}`
}

const getLinePathTo = (point: Fraction, prevPoint: Fraction, circleRadius: number, hyperbolic: boolean): string => {
  if (!hyperbolic) {
    return `L ${svgPoint(point, circleRadius)}`
  }

  const chordWidth = mod(Fractions.toNumber(point) - Fractions.toNumber(prevPoint), 1)
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
  const radius = Math.floor(settings.size / 2) - 10

  const render = (laminationState: LaminationState): string => {
    const midpoint = settings.size / 2 // Quadruple the size
    const transform = `matrix(1,0,0,-1,${midpoint},${midpoint})`

    const circle = tag('circle', {
      r: radius + 1,
      stroke: settings.circle.strokeColor,
      'stroke-width': settings.circle.strokeWidth,
      fill: settings.circle.fillColor,
      transform,
    })

    const chords = laminationState.lamination
      .map((polygon: RenderPolygon) => {
        if (polygon.points.size === 0) {
          return
        }
        let strokeWidth = polygon.settings.strokeWidth
        if (Polygons.toChords(polygon).some((chord: Chord) => {
          const width = Chords.width(chord)
          return width < 0.01 || 1 - width < 0.01
        })) {
          strokeWidth = strokeWidth * 0.25
        }
        return tag('path', {
          stroke: polygon.settings.strokeColor,
          fill: polygon.points.size > 2 ? polygon.settings.fillColor : 'none',
          'stroke-width': strokeWidth,
          transform,
          d: makeSVGPath(polygon, radius, settings.renderHyperbolic)
        })
      })
      .join('')
    
    const criticalChords = laminationState.criticalChords
      .map((chord: Chord) => tag('path', {
        stroke: settings.criticalChords.strokeColor,
        'stroke-width': settings.criticalChords.strokeWidth,
        fill: 'none',
        transform,
        d: makeSVGPath(Polygons.fromChord(chord), radius, settings.renderHyperbolic)
      }))
      .join('')

    return tag('svg', {
      ...defaultSvgAttrs,
      width: settings.size,
      height: settings.size,
      style: `background-color: ${settings.backgroundColor};`,
    }, `${circle}${chords}${criticalChords}`)
  }

  return {render}
}