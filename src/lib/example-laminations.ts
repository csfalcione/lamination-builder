import { Fractions, Fraction, Chords, Polygons, Polygon, makeBranchSpec } from 'laminations-lib';
import { LaminationDefinition } from './lamination-parser';
import { LaminationData } from './definitions';
import { List } from 'immutable';

const binary = Fractions.parseFactory(2)
const ternary = Fractions.parseFactory(3)
const quaternary = Fractions.parseFactory(4)
const quintary = Fractions.parseFactory(5)

const newPolygon = (points: Fraction[]): Polygon => Polygons.create(List(points))


export const rabbitLamination = (): LaminationData => {
  const criticalChord = Chords.create(
    binary('_001'), // 1/7
    binary('1_010') // 9/14
  )
  
  const branchSpecs = [
    makeBranchSpec(criticalChord, criticalChord.lower)
  ]

  const startingTriangle = newPolygon([
    binary('_001'), // 1/7
    binary('_010'), // 2/7
    binary('_100'), // 4/7
  ])

  return { 
    leaves: [startingTriangle],
    branchSpecs,
    base: 2,
    name: "Rabbit",
    description: "Lamination corresponding to the Douady Rabbit Julia set."
  }
}

export const rabbitLamination_ternary = (): LaminationData => {
  const pointA = ternary('_001')
  const pointB = ternary('1_010')
  const pointC = ternary('2_010')

  const criticalA = Chords.create(pointA, pointB)
  const criticalB = Chords.create(pointB, pointC)
  const criticalC = Chords.create(pointC, pointA)
  
  const branchSpecs = [
    makeBranchSpec(criticalA, pointA),
    makeBranchSpec(criticalB, pointB),
    makeBranchSpec(criticalC, pointC)
  ]

  const startingTriangle = newPolygon([
    ternary('_001'),
    ternary('_010'),
    ternary('_100'),
  ])

  return { leaves: [startingTriangle], branchSpecs, base: 3, name: "Rabbit (ternary)" }
}

export const ternarySymmetricLamination = (): LaminationData => {
  const criticalA = Chords.create(
    ternary('_01'), // 1/8
    ternary('2_10') // 19/24
  )
  const criticalB = Chords.create(
    ternary('0_21'), // 7/24
    ternary('_12') // 5/8
  )
  
  const branchSpecs = [
    makeBranchSpec(criticalA, criticalA.lower),
    makeBranchSpec(criticalB, criticalB.upper),
  ]

  const leaves = [
    Chords.create(
      ternary('_01'), // 1/8
      ternary('_21') // 7/8
    ),
    Chords.create(
      ternary('_10'), // 3/8
      ternary('_12') // 5/8
    )
  ].map(Polygons.fromChord)

  return { leaves: leaves, branchSpecs, base: 3, name: "Temple" }
}

export const criticalTriangleGap_ternary = (): LaminationData => {
  const pointA = ternary('_002')
  const pointB = ternary('1_020')
  const pointC = ternary('2_020')
  
  const branchSpecs = [
    makeBranchSpec(Chords.create(pointA, pointB), pointA),
    makeBranchSpec(Chords.create(pointB, pointC), pointB),
    makeBranchSpec(Chords.create(pointC, pointA), pointC),
  ]

  const leaves = [
    Chords.create(ternary('_011'), ternary('_020')),
    Chords.create(ternary('_002'), ternary('_101')),
    Chords.create(ternary('_110'), ternary('_200')),
  ].map(Polygons.fromChord)

  return { leaves: leaves, branchSpecs, base: 3, name: "Critical Triangle with Gap" }
}

export const criticalTriangleGapIRT_ternary = (): LaminationData => {
  const pointA = ternary('_002')
  const pointB = ternary('_101')
  const pointC = ternary('2_011')
  const pointD = ternary('2_020')

  const criticalA = Chords.create(pointA, pointD)
  const criticalB = Chords.create(pointB, pointC)
  
  const branchSpecs = [
    makeBranchSpec(criticalA, pointD),
    makeBranchSpec(criticalB, pointC),
  ]

  const leaves = [
    newPolygon([
      pointA,
      pointB,
      ternary('_201')
    ]),

    newPolygon([
      ternary('_011'),
      ternary('_020'),
      ternary('_012')
    ]),

    newPolygon([
      ternary('_110'),
      ternary('_200'),
      ternary('_120')
    ])
  ]

  return { leaves: leaves, branchSpecs, base: 3, name: "Critical Identity Return Triangle" }
}

export const irq_fat_quaternary = (): LaminationData => {
  const pointA = quaternary('0_233')
  const pointB = quaternary('_030')
  const pointC = quaternary('1_300')
  const pointD = quaternary('1_302')
  const pointE = quaternary('_230')
  const pointF = quaternary('_323')

  const branchSpecs = [
    makeBranchSpec(Chords.create(pointA, pointF), pointA),
    makeBranchSpec(Chords.create(pointB, pointC), pointC),
    makeBranchSpec(Chords.create(pointD, pointE), pointD),
  ]

  const middleSquare = newPolygon([
    pointB,
    quaternary('_130'),
    pointE,
    pointF,
  ])

  return { leaves: [middleSquare], branchSpecs, base: 4, name: "Fat Identity Return Quadrilateral" }
}

export const irq_thin_quaternary = (): LaminationData => {
  const pointA = quaternary('_010')
  const pointB = quaternary('_100')
  const pointC = quaternary('2_001')
  const pointD = quaternary('_200')
  const pointE = quaternary('3_002')
  const pointF = quaternary('3_100')

  const branchSpecs = [
    makeBranchSpec(Chords.create(pointA, pointF), pointF),
    makeBranchSpec(Chords.create(pointB, pointC), pointC),
    makeBranchSpec(Chords.create(pointD, pointE), pointE),
  ]

  const middleSquare = newPolygon([
    quaternary('_033'),
    pointB,
    pointD,
    quaternary('_300'),
  ])

  return { leaves: [middleSquare], branchSpecs, base: 4, name: "Thin Identity Return Triangle" }
}


export const never_close_quintary = (): LaminationData => {
  const pointA = quintary('0_033')
  const pointB = quintary('_033')
  const pointC = quintary('1_330')
  const pointD = quintary('_200')
  const pointE = quintary('3_002')
  const pointF = quintary('_303')
  const pointG = quintary('_330')
  const pointH = quintary('4_303')

  const branchSpecs = [
    makeBranchSpec(Chords.create(pointA, pointF), pointA),
    makeBranchSpec(Chords.create(pointB, pointC), pointC),
    makeBranchSpec(Chords.create(pointD, pointE), pointE),
    makeBranchSpec(Chords.create(pointG, pointH), pointH),
  ]

  const bigTriangle = newPolygon([
    pointB,
    pointD,
    quintary('_300')
  ])

  const mediumTriangle = newPolygon([
    quintary('_020'),
    quintary('_030'),
    pointF
  ])

  const smallTriangle = newPolygon([
    quintary('_002'),
    quintary('_003'),
    pointG
  ])

  return {
    leaves: [bigTriangle, mediumTriangle, smallTriangle],
    branchSpecs,
    base: 5,
    name: "Never Close (quintary)"
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

export const template = 
`{
  "name": "EXAMPLE LAMINATION",
  "base": 3,
  "description": "Sample description.",
  "branches": [
    {
      "chord": ["_002", "2_020"],
      "endpoints": ["2_020"]
    },
    {
      "chord": ["_101", "2_011"],
      "endpoints": ["2_011"]
    }
  ],
  "leaves": [
    {"points": ["_002", "_101", "_201"]},
    {"points": ["_011", "_020", "_012"]},
    {"points": ["_110", "_200", "_120"]}
  ]
}
`

