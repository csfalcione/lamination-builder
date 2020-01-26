import { Fraction, Polygons, Fractions, Chords } from 'laminations-lib'
import {Validator} from 'jsonschema'
import { LaminationData, LaminationDefinition, RenderSettings, ShapeRenderSettings } from './definitions'
import { List } from 'immutable'
import { RenderPolygons, RenderPolygon } from './render-polygon'

const definitionSchema = {
  'id': '/LaminationDefinition',
  'type': 'object',
  'properties': {
    'base': {'type': 'integer', 'minimum': 2},
    'name': {'type': 'string'},
    'description': {'type': 'string'},
    'leaves': {
      'type': 'array',
      'items': {'$ref': '/Polygon'}
    },
    'branches': {
      'type': 'array',
      'items': {'$ref': '/Branch'}
    },
    'settings': {'type': '/RenderSettings'},
  },
  'required': ['base', 'leaves', 'branches']
}

const polygonSchema = {
  'id': '/Polygon',
  'type': 'object',
  'properties': {
    'points': {
      'type': 'array',
      'items': {'type': 'string'},
      'minItems': 1,
    },
    'branch': {
      'type': 'boolean'
    },
    'flipEndpoints': {
      'type': 'boolean'
    },
    'flipDiameters': {
      'type': 'boolean'
    }
  },
  'required': ['points']
}

const branchSchema = {
  'id': '/Branch',
  'type': 'object',
  'properties': {
    'chord': {
      'type': 'array',
      'items': {'type': 'string'}
    },
    'endpoints': {
      'type': 'array',
      'items': {'type': 'string'}
    },
    'flip': {
      'type': 'boolean'
    }
  },
  'required': ['chord', 'endpoints']
}

const renderSettingsSchema = {
  'id': '/RenderSettings',
  'type': 'object',
  'properties': {
    'size': {'type': 'integer', 'minimum': 32},
    'renderHyperbolic': {'type': 'boolean'},
    'backgroundColor': {'type': 'string'},
    'polygons': {'type': '/ShapeRenderSettings'},
    'criticalChords': {'type': '/ShapeRenderSettings'},
    'circle': {'type': '/ShapeRenderSettings'},
  },
}

const shapeRenderSettingsSchema = {
  'id': '/ShapeRenderSettings',
  'type': 'object',
  'properties': {
    'fillColor': {'type': 'string'},
    'strokeColor': {'type': 'string'},
    'strokeWidth': {'type': 'integer', 'minimum': 0},
  },
}

const getValidator = () => {
  let validator = new Validator()
  validator.addSchema(polygonSchema, '/Polygon')
  validator.addSchema(branchSchema, '/Branch')
  validator.addSchema(renderSettingsSchema, '/RenderSettings')
  validator.addSchema(shapeRenderSettingsSchema, '/ShapeRenderSettings')
  return validator
}

const newPolygon = (points: Fraction[], settings: ShapeRenderSettings): RenderPolygon =>
  RenderPolygons.from(Polygons.create(List(points)), settings)

const override = <T extends object>(base: T, child: T): T => {
  if (child == null) return base
  return Object.assign(Object.create(base), child)
}

const overrideRenderSettings = (base: RenderSettings, overrides: RenderSettings): RenderSettings => {
  if (overrides == null) return base

  const polygons = override(base.polygons, overrides.polygons)
  const criticalChords = override(base.criticalChords, overrides.criticalChords)
  const circle = override(base.circle, overrides.circle)

  let result = override(base, overrides)
  result.polygons = polygons
  result.criticalChords = criticalChords
  result.circle = circle

  return result
}

const mod = (a, b) => ((a % b) + b) % b
const parseLaminationDefinition = (def: LaminationDefinition, defaultRenderSettings: RenderSettings): LaminationData => {
  const base = def.base
  const parsePoint = Fractions.parseFactory(base)
  const renderSettings = overrideRenderSettings(defaultRenderSettings, def.settings)

  let branchSpecs = def.branches.map((branchDef) => {
    const chordPoints = branchDef.chord.map(parsePoint)
    const chord = Chords.create(chordPoints[0], chordPoints[1])

    const endpoints = branchDef.endpoints.map(parsePoint)
    return {...branchDef, chord, endpoints}
  })
  
  const leaves = def.leaves.map(leafDef => {
    const polygonSettings = override(renderSettings.polygons, leafDef.settings)
    const polygon = newPolygon(leafDef.points.map(parsePoint), polygonSettings)
    
    if (leafDef.branch === true) {
      const points = polygon.unwrapLeft().points
      Polygons.toChords(polygon.unwrapLeft())
      // First find the appropriate endpoint for each branch.
      .map((chord, idx) => {
        const offset = leafDef.flipEndpoints? 1 : 0
        const endpoint = polygon.unwrapLeft().points.get(mod(idx + offset, points.size))
        return {chord, endpoint}
      })
      // Then create appropriate branches.
      .map(({chord, endpoint}) => {
        return {
          chord,
          endpoints: [endpoint],
          flip: leafDef.flipDiameters === true && Chords.isDiameter(chord)
        }
      })
      .forEach(branchSpec => branchSpecs.push(branchSpec))
    }

    return polygon
  })

  return {
    base,
    leaves,
    branchSpecs,
    name: def.name || 'lamination',
    description: def.description,
    renderSettings,
  }
}

export const parseLamination = (parsedJson: any, defaultRenderSettings: RenderSettings): Promise<LaminationData> => {
  const validator = getValidator()
  const result = validator.validate(parsedJson, definitionSchema)
  return new Promise((resolve, reject) => {
    if (!result.valid) {
      reject(result.toString())
      return
    }

    resolve(parseLaminationDefinition(parsedJson, defaultRenderSettings))
  })
}
