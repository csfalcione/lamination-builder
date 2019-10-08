import { Polygon, NaryFraction, Chord, makeBranchSpec } from 'laminations-lib'
import {Validator} from 'jsonschema'
import { LaminationData } from './definitions'



export interface LaminationDefinition {
  base: number
  leaves: Array<{
    points: string[]
  }>
  branches: Array<{
    chord: [string, string]
    endpoints: string[]
  }>
  name?: string
}

const polygonSchema = {
  'id': '/Polygon',
  'type': 'object',
  'properties': {
    'points': {
      'type': 'array',
      'items': {'type': 'string'}
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

const parseLaminationDefinition = (def: LaminationDefinition): LaminationData => {
  const base = def.base
  const parsePoint = NaryFraction.parseFactory(base)
  
  const leaves = def.leaves.map(poly => Polygon.new(poly.points.map(parsePoint)))

  const branchSpecs = def.branches.map((branchDef) => {
    const chordPoints = branchDef.chord.map(parsePoint)
    const chord = Chord.new(chordPoints[0], chordPoints[1])

    const endpoints = branchDef.endpoints.map(parsePoint)

    return makeBranchSpec(chord, ...endpoints)
  })

  return {
    base,
    leaves,
    branchSpecs,
    name: def.name || 'lamination',
  }
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
