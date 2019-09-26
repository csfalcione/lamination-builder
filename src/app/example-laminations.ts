import { LaminationState } from './builder-state';
import { Observable, from } from 'rxjs';
import { NaryFraction, Chord, Polygon, PullbackLamination, BranchSpec, makeBuilder, makeBranchSpec } from 'laminations-lib';
import { map } from 'rxjs/operators';

const binary = NaryFraction.parseFactory(2)
const ternary = NaryFraction.parseFactory(3)
const quaternary = NaryFraction.parseFactory(4)
const quintary = NaryFraction.parseFactory(5)

interface LaminationDefinition {
  base: number
  initialLeaves: Polygon[]
  branchSpecs: BranchSpec[]
}

export const pullbackObservable = ({ initialLeaves, branchSpecs, base }: LaminationDefinition): Observable<LaminationState> => {
  const branches = makeBuilder(base)(branchSpecs)
  return from(PullbackLamination.iterates(initialLeaves, branches))
    .pipe(
      map(lamination => ({
        lamination,
        criticalChords: branchSpecs.map(spec => spec.chord),
      }))
    )
}


export const rabbitLamination = (): LaminationDefinition => {
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

  return { initialLeaves: [startingTriangle], branchSpecs, base: 2 }
}

export const rabbitLamination_ternary = (): LaminationDefinition => {
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

  return { initialLeaves: [startingTriangle], branchSpecs, base: 3 }
}

export const ternarySymmetricLamination = (): LaminationDefinition => {
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

  const initialLeaves = [
    Chord.new(
      ternary('_01'), // 1/8
      ternary('_21') // 7/8
    ),
    Chord.new(
      ternary('_10'), // 3/8
      ternary('_12') // 5/8
    )
  ].map(Polygon.fromChord)

  return { initialLeaves, branchSpecs, base: 3 }
}

export const criticalTriangleGap_ternary = (): LaminationDefinition => {
  const pointA = ternary('_002')
  const pointB = ternary('1_020')
  const pointC = ternary('2_020')
  
  const branchSpecs = [
    makeBranchSpec(Chord.new(pointA, pointB), pointA),
    makeBranchSpec(Chord.new(pointB, pointC), pointB),
    makeBranchSpec(Chord.new(pointC, pointA), pointC),
  ]

  const initialLeaves = [
    Chord.new(ternary('_011'), ternary('_020')),
    Chord.new(ternary('_002'), ternary('_101')),
    Chord.new(ternary('_110'), ternary('_200')),
  ].map(Polygon.fromChord)

  return { initialLeaves, branchSpecs, base: 3 }
}

export const criticalTriangleGapIRT_ternary = (): LaminationDefinition => {
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

  const initialLeaves = [
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

  return { initialLeaves, branchSpecs, base: 3 }
}

export const irq_fat_quaternary = (): LaminationDefinition => {
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

  return { initialLeaves: [middleSquare], branchSpecs, base: 4 }
}

export const irq_thin_quaternary = (): LaminationDefinition => {
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

  return { initialLeaves: [middleSquare], branchSpecs, base: 4 }
}


export const never_close_quintary = (): LaminationDefinition => {
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
    initialLeaves: [bigTriangle, mediumTriangle, smallTriangle],
    branchSpecs,
    base: 5,
  }
}

