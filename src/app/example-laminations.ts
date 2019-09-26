import { LaminationState } from './builder-state';
import { Observable, from } from 'rxjs';
import { NaryFraction, Chord, Polygon, PullbackLamination, BranchSpec, makeBuilder, makeBranchSpec } from 'laminations-lib';
import { map } from 'rxjs/operators';

const binary = NaryFraction.parseFactory(2)
const ternary = NaryFraction.parseFactory(3)
const quaternary = NaryFraction.parseFactory(4)
const quintary = NaryFraction.parseFactory(5)

export interface ParsedLamination {
  base: number
  leaves: Polygon[]
  branchSpecs: BranchSpec[]
  name?: string
}

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

export const parseLaminationDefinition = (def: LaminationDefinition): ParsedLamination => {
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

export const pullbackObservable = ({ leaves, branchSpecs, base }: ParsedLamination): Observable<LaminationState> => {
  const branches = makeBuilder(base)(branchSpecs)
  return from(PullbackLamination.iterates(leaves, branches))
    .pipe(
      map(lamination => ({
        lamination,
        criticalChords: branchSpecs.map(spec => spec.chord),
      }))
    )
}


export const rabbitLamination = (): ParsedLamination => {
  const criticalChord = Chord.new(
    binary('_001'), // 1/7
    binary('1_010') // 9/14
  )
  
  const branchSpecs = [
    makeBranchSpec(criticalChord, criticalChord.lower)
  ]

  const startingTriangle = Polygon.new([
    binary('_001'), // 1/7
    binary('_010'), // 2/7
    binary('_100'), // 4/7
  ])

  return { leaves: [startingTriangle], branchSpecs, base: 2 }
}

export const rabbitLamination_ternary = (): ParsedLamination => {
  const pointA = ternary('_001')
  const pointB = ternary('1_010')
  const pointC = ternary('2_010')

  const criticalA = Chord.new(pointA, pointB)
  const criticalB = Chord.new(pointB, pointC)
  const criticalC = Chord.new(pointC, pointA)
  
  const branchSpecs = [
    makeBranchSpec(criticalA, pointA),
    makeBranchSpec(criticalB, pointB),
    makeBranchSpec(criticalC, pointC)
  ]

  const startingTriangle = Polygon.new([
    ternary('_001'),
    ternary('_010'),
    ternary('_100'),
  ])

  return { leaves: [startingTriangle], branchSpecs, base: 3 }
}

export const ternarySymmetricLamination = (): ParsedLamination => {
  const criticalA = Chord.new(
    ternary('_01'), // 1/8
    ternary('2_10') // 19/24
  )
  const criticalB = Chord.new(
    ternary('0_21'), // 7/24
    ternary('_12') // 5/8
  )
  
  const branchSpecs = [
    makeBranchSpec(criticalA, criticalA.lower),
    makeBranchSpec(criticalB, criticalB.upper),
  ]

  const leaves = [
    Chord.new(
      ternary('_01'), // 1/8
      ternary('_21') // 7/8
    ),
    Chord.new(
      ternary('_10'), // 3/8
      ternary('_12') // 5/8
    )
  ].map(Polygon.fromChord)

  return { leaves: leaves, branchSpecs, base: 3 }
}

export const criticalTriangleGap_ternary = (): ParsedLamination => {
  const pointA = ternary('_002')
  const pointB = ternary('1_020')
  const pointC = ternary('2_020')
  
  const branchSpecs = [
    makeBranchSpec(Chord.new(pointA, pointB), pointA),
    makeBranchSpec(Chord.new(pointB, pointC), pointB),
    makeBranchSpec(Chord.new(pointC, pointA), pointC),
  ]

  const leaves = [
    Chord.new(ternary('_011'), ternary('_020')),
    Chord.new(ternary('_002'), ternary('_101')),
    Chord.new(ternary('_110'), ternary('_200')),
  ].map(Polygon.fromChord)

  return { leaves: leaves, branchSpecs, base: 3 }
}

export const criticalTriangleGapIRT_ternary = (): ParsedLamination => {
  const pointA = ternary('_002')
  const pointB = ternary('_101')
  const pointC = ternary('2_011')
  const pointD = ternary('2_020')

  const criticalA = Chord.new(pointA, pointD)
  const criticalB = Chord.new(pointB, pointC)
  
  const branchSpecs = [
    makeBranchSpec(criticalA, pointD),
    makeBranchSpec(criticalB, pointC),
  ]

  const leaves = [
    Polygon.new([
      pointA,
      pointB,
      ternary('_201')
    ]),

    Polygon.new([
      ternary('_011'),
      ternary('_020'),
      ternary('_012')
    ]),

    Polygon.new([
      ternary('_110'),
      ternary('_200'),
      ternary('_120')
    ])
  ]

  return { leaves: leaves, branchSpecs, base: 3 }
}

export const irq_fat_quaternary = (): ParsedLamination => {
  const pointA = quaternary('0_233')
  const pointB = quaternary('_030')
  const pointC = quaternary('1_300')
  const pointD = quaternary('1_302')
  const pointE = quaternary('_230')
  const pointF = quaternary('_323')

  const branchSpecs = [
    makeBranchSpec(Chord.new(pointA, pointF), pointA),
    makeBranchSpec(Chord.new(pointB, pointC), pointC),
    makeBranchSpec(Chord.new(pointD, pointE), pointD),
  ]

  const middleSquare = Polygon.new([
    pointB,
    quaternary('_130'),
    pointE,
    pointF,
  ])

  return { leaves: [middleSquare], branchSpecs, base: 4 }
}

export const irq_thin_quaternary = (): ParsedLamination => {
  const pointA = quaternary('_010')
  const pointB = quaternary('_100')
  const pointC = quaternary('2_001')
  const pointD = quaternary('_200')
  const pointE = quaternary('3_002')
  const pointF = quaternary('3_100')

  const branchSpecs = [
    makeBranchSpec(Chord.new(pointA, pointF), pointF),
    makeBranchSpec(Chord.new(pointB, pointC), pointC),
    makeBranchSpec(Chord.new(pointD, pointE), pointE),
  ]

  const middleSquare = Polygon.new([
    quaternary('_033'),
    pointB,
    pointD,
    quaternary('_300'),
  ])

  return { leaves: [middleSquare], branchSpecs, base: 4 }
}


export const never_close_quintary = (): ParsedLamination => {
  const pointA = quintary('0_033')
  const pointB = quintary('_033')
  const pointC = quintary('1_330')
  const pointD = quintary('_200')
  const pointE = quintary('3_002')
  const pointF = quintary('_303')
  const pointG = quintary('_330')
  const pointH = quintary('4_303')

  const branchSpecs = [
    makeBranchSpec(Chord.new(pointA, pointF), pointA),
    makeBranchSpec(Chord.new(pointB, pointC), pointC),
    makeBranchSpec(Chord.new(pointD, pointE), pointE),
    makeBranchSpec(Chord.new(pointG, pointH), pointH),
  ]

  const bigTriangle = Polygon.new([
    pointB,
    pointD,
    quintary('_300')
  ])

  const mediumTriangle = Polygon.new([
    quintary('_020'),
    quintary('_030'),
    pointF
  ])

  const smallTriangle = Polygon.new([
    quintary('_002'),
    quintary('_003'),
    pointG
  ])

  return {
    leaves: [bigTriangle, mediumTriangle, smallTriangle],
    branchSpecs,
    base: 5,
  }
}

export const never_close_quintary_def: LaminationDefinition = {
  name: 'never close (quintary)',
  base: 5,
  leaves: [
    {points: ['_033', '_200', '_300']},
    {points: ['_020', '_030', '_303']},
    {points: ['_002', '_003', '_330']}
  ],
  branches: [
    {
      chord: ['0_033', '_303'],
      endpoints: ['0_033']
    },
    {
      chord: ['_033', '1_330'],
      endpoints: ['1_330']
    },
    {
      chord: ['_200', '3_002'],
      endpoints: ['3_002']
    },
    {
      chord: ['_330', '4_303'],
      endpoints: ['4_303']
    },
  ]
}

