import { Polygon, Fraction, Polygons, Fractions, Chords } from 'laminations-lib'
import {Validator} from 'jsonschema'
import { LaminationData } from './definitions'
import { List } from 'immutable'

const newPolygon = (points: Fraction[]): Polygon => Polygons.create(List(points))

export interface LaminationDefinition {
  base: number
  description?: string
  leaves: Array<{
    points: string[]
    branch?: boolean
    flipEndpoints?: boolean
    flipDiameters?: boolean
  }>
  branches: Array<{
    chord: [string, string]
    endpoints: string[]
    flip?: boolean
  }>
  name?: string
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

const definitionSchema = {
  'id': '/LaminationDefinition',
  'type': 'object',
  'properties': {
    'base': {'type': 'number'},
    'name': {'type': 'string'},
    'description': {'type': 'string'},
    'leaves': {
      'type': 'array',
      'items': {'$ref': '/Polygon'}
    },
    'branches': {
      'type': 'array',
      'items': {'$ref': '/Branch'}
    }
  },
  'required': ['base', 'leaves', 'branches']
}

const getValidator = () => {
  let validator = new Validator()
  validator.addSchema(polygonSchema, '/Polygon')
  validator.addSchema(branchSchema, '/Branch')
  return validator
}

const mod = (a, b) => ((a % b) + b) % b
const parseLaminationDefinition = (def: LaminationDefinition): LaminationData => {
  const base = def.base
  const parsePoint = Fractions.parseFactory(base)

  let branchSpecs = def.branches.map((branchDef) => {
    const chordPoints = branchDef.chord.map(parsePoint)
    const chord = Chords.create(chordPoints[0], chordPoints[1])

    const endpoints = branchDef.endpoints.map(parsePoint)
    return {...branchDef, chord, endpoints}
  })
  
  const leaves = def.leaves.map(leafDef => {
    const polygon = newPolygon(leafDef.points.map(parsePoint))
    
    if (leafDef.branch === true) {
      const points = polygon.points
      Polygons.toChords(polygon)
      // First find the appropriate endpoint for each branch.
      .map((chord, idx) => {
        const offset = leafDef.flipEndpoints? 1 : 0
        const endpoint = polygon.points.get(mod(idx + offset, points.size))
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

  let result: LaminationData = {
    base,
    leaves,
    branchSpecs,
    name: def.name || 'lamination',
  }

  if (def.description != null) {
    result.description = def.description
  }

  return result
}

export const parseLamination = (parsedJson: any): Promise<LaminationData> => {
  const validator = getValidator()
  const result = validator.validate(parsedJson, definitionSchema)
  return new Promise((resolve, reject) => {
    if (!result.valid) {
      reject(result.toString())
      return
    }

    resolve(parseLaminationDefinition(parsedJson))
  })
}
