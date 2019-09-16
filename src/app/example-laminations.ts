import { LaminationState } from './builder-state';
import { Observable, from } from 'rxjs';
import { NaryFraction, Chord, BranchRegion, makeRegion, Polygon, PullbackLamination } from 'laminations-lib';
import { map } from 'rxjs/operators';

const binary = NaryFraction.parseFactory(2)
const ternary = NaryFraction.parseFactory(3)
const quaternary = NaryFraction.parseFactory(4)

interface LaminationDefinition {
  initialLeaves: Polygon[],
  criticalChords: Chord[],
  branches: BranchRegion[],
}

export const pullbackObservable = ({initialLeaves, criticalChords, branches}: LaminationDefinition): Observable<LaminationState> => {
  return from(PullbackLamination.iterates(initialLeaves, branches))
  .pipe(
    map(lamination => ({
      lamination,
      criticalChords,
    }))
  )
}

const makeFinalBranch = (branches: BranchRegion[]): BranchRegion => {
  return makeRegion((p) => !branches.some(branch => branch.isInBranch(p)))
}

const fillOutBranches = (d: number, branches: BranchRegion[]): BranchRegion[] => {
  if (branches.length >= d) {
    return branches
  }
  return [...branches, makeFinalBranch(branches)]
}


export const rabbitLamination = (): LaminationDefinition => {
  const criticalChord = Chord.new(
    binary('_001'), // 1/7
    binary('1_010') // 9/14
  )
  const criticalChords = [criticalChord]

  const firstRegion = (point: NaryFraction) => criticalChord.inInnerRegion(point) || point.equals(criticalChord.lower)

  const branches: Array<BranchRegion> = fillOutBranches(
      2,
      [firstRegion,].map(makeRegion)
  )

  const startingTriangle = Polygon.new([
    binary('_001'), // 1/7
    binary('_010'), // 2/7
    binary('_100'), // 4/7
  ])

  return {initialLeaves: [startingTriangle], criticalChords, branches}
}

export const rabbitLamination_ternary = (): LaminationDefinition => {
  const pointA = ternary('_001')
  const pointB = ternary('1_010')
  const pointC = ternary('2_010')

  const criticalA = Chord.new(pointA, pointB)
  const criticalB = Chord.new(pointB, pointC)
  const criticalC = Chord.new(pointC, pointA)
  const criticalChords = [
    criticalA,
    criticalB,
    criticalC,
  ]

  const firstRegion = (p) => criticalA.inInnerRegion(p) || p.equals(pointA)
  const secondRegion = (p) => criticalB.inInnerRegion(p) || p.equals(pointB)

  const branches: Array<BranchRegion> = fillOutBranches(3, [
    firstRegion,
    secondRegion,
  ].map(makeRegion))

  const startingTriangle = Polygon.new([
    ternary('_001'),
    ternary('_010'),
    ternary('_100'),
  ])

  return {initialLeaves: [startingTriangle], criticalChords, branches}
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
  const criticalChords = [criticalA, criticalB]

  const firstRegion = (point: NaryFraction) => criticalA.inOuterRegion(point) || point.equals(criticalA.lower)
  const secondRegion = (point: NaryFraction) => criticalB.inInnerRegion(point) || point.equals(criticalB.upper)

  const branches: Array<BranchRegion> = fillOutBranches(3, [
    firstRegion,
    secondRegion,
  ].map(makeRegion))

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

  return {initialLeaves, criticalChords, branches}
}

export const criticalTriangleGap_ternary = (): LaminationDefinition => {
  const pointA = ternary('_002')
  const pointB = ternary('1_020')
  const pointC = ternary('2_020')

  const criticalA = Chord.new(pointA, pointB)
  const criticalB = Chord.new(pointB, pointC)
  const criticalC = Chord.new(pointC, pointA)
  const criticalChords = [
    criticalA,
    criticalB,
    criticalC,
  ]

  const firstRegion = (p) => criticalA.inInnerRegion(p) || p.equals(pointA)
  const secondRegion = (p) => criticalB.inInnerRegion(p) || p.equals(pointB)

  const branches: Array<BranchRegion> = fillOutBranches(3, [
    firstRegion,
    secondRegion,
  ].map(makeRegion))

  const initialLeaves = [
    Chord.new(ternary('_011'), ternary('_020')),
    Chord.new(ternary('_002'), ternary('_101')),
    Chord.new(ternary('_110'), ternary('_200')),
  ].map(Polygon.fromChord)

  return {initialLeaves, criticalChords, branches}
}

export const criticalTriangleGapIRT_ternary = (): LaminationDefinition => {
  const pointA = ternary('_002')
  const pointB = ternary('_101')
  const pointC = ternary('2_011')
  const pointD = ternary('2_020')

  const criticalA = Chord.new(pointA, pointD)
  const criticalB = Chord.new(pointB, pointC)
  const criticalChords = [
    criticalA,
    criticalB,
  ]

  const firstRegion = (p) => criticalA.inOuterRegion(p) || p.equals(pointD)
  const secondRegion = (p) => criticalB.inInnerRegion(p) || p.equals(pointC)

  const branches: Array<BranchRegion> = fillOutBranches(3, [
    firstRegion,
    secondRegion,
  ].map(makeRegion))

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

  return {initialLeaves, criticalChords, branches}
}

export const irq_fat_quaternary = (): LaminationDefinition => {
  const pointA = quaternary('0_233')
  const pointB = quaternary('_030')
  const pointC = quaternary('1_300')
  const pointD = quaternary('1_302')
  const pointE = quaternary('_230')
  const pointF = quaternary('_323')

  const criticalA = Chord.new(pointA, pointF)
  const criticalB = Chord.new(pointB, pointC)
  const criticalC = Chord.new(pointD, pointE)
  const criticalChords = [
    criticalA,
    criticalB,
    criticalC,
  ]

  const firstRegion = (p) => criticalA.inOuterRegion(p) || p.equals(pointA)
  const secondRegion = (p) => criticalB.inInnerRegion(p) || p.equals(pointC)
  const thirdRegion = (p) => criticalC.inInnerRegion(p) || p.equals(pointD)

  const branches: Array<BranchRegion> = fillOutBranches(4, [
    firstRegion,
    secondRegion,
    thirdRegion
  ].map(makeRegion))

  const middleSquare = Polygon.new([
    pointB,
    quaternary('_130'),
    pointE,
    pointF,
  ])

  return {initialLeaves: [middleSquare], criticalChords, branches}
}

export const irq_thin_quaternary = (): LaminationDefinition => {
  const pointA = quaternary('_010')
  const pointB = quaternary('_100')
  const pointC = quaternary('2_001')
  const pointD = quaternary('_200')
  const pointE = quaternary('3_002')
  const pointF = quaternary('3_100')

  const criticalA = Chord.new(pointA, pointF)
  const criticalB = Chord.new(pointB, pointC)
  const criticalC = Chord.new(pointD, pointE)
  const criticalChords = [
    criticalA,
    criticalB,
    criticalC,
  ]

  const firstRegion = (p) => criticalA.inOuterRegion(p) || p.equals(pointF)
  const secondRegion = (p) => criticalB.inInnerRegion(p) || p.equals(pointC)
  const thirdRegion = (p) => criticalC.inInnerRegion(p) || p.equals(pointE)

  const branches: Array<BranchRegion> = fillOutBranches(4, [
    firstRegion,
    secondRegion,
    thirdRegion
  ].map(makeRegion))

  const middleSquare = Polygon.new([
    quaternary('_033'),
    pointB,
    pointD,
    quaternary('_300'),
  ])

  return {initialLeaves: [middleSquare], criticalChords, branches}
}

