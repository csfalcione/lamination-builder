import { LaminationState } from './builder-state';
import { Observable, from } from 'rxjs';
import { NaryFraction, Chord, BranchRegion, makeRegion, Polygon, PullbackLamination } from 'laminations-lib';
import { map } from 'rxjs/operators';

const binary = NaryFraction.factory(2)
const ternary = NaryFraction.factory(3)
const quaternary = NaryFraction.factory(4)

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
    binary([], [0, 0, 1]), // 1/7
    binary([1], [0, 1, 0]) // 9/14
  )
  const criticalChords = [criticalChord]

  const firstRegion = (point: NaryFraction) => criticalChord.inInnerRegion(point) || point.equals(criticalChord.lower)

  const branches: Array<BranchRegion> = fillOutBranches(
      2,
      [firstRegion,].map(makeRegion)
  )

  const startingTriangle = Polygon.new([
    binary([], [0, 0, 1]), // 1/7
    binary([], [0, 1, 0]), // 2/7
    binary([], [1, 0, 0]), // 4/7
  ])

  return {initialLeaves: [startingTriangle], criticalChords, branches}
}

export const rabbitLamination_ternary = (): LaminationDefinition => {
  const pointA = ternary([], [0, 0, 1])
  const pointB = ternary([1], [0, 1, 0])
  const pointC = ternary([2], [0, 1, 0])

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
    ternary([], [0, 0, 1]),
    ternary([], [0, 1, 0]),
    ternary([], [1, 0, 0]),
  ])

  return {initialLeaves: [startingTriangle], criticalChords, branches}
}

export const ternarySymmetricLamination = (): LaminationDefinition => {
  const criticalA = Chord.new(
    ternary([], [0, 1]), // 1/8
    ternary([2], [1, 0]) // 19/24
  )
  const criticalB = Chord.new(
    ternary([0], [2, 1]), // 7/24
    ternary([], [1, 2]) // 5/8
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
      ternary([], [0, 1]), // 1/8
      ternary([], [2, 1]) // 7/8
    ),
    Chord.new(
      ternary([], [1, 0]), // 3/8
      ternary([], [1, 2]) // 5/8
    )
  ].map(Polygon.fromChord)

  return {initialLeaves, criticalChords, branches}
}

export const criticalTriangleGap_ternary = (): LaminationDefinition => {
  const pointA = ternary([], [0, 0, 2])
  const pointB = ternary([1], [0, 2, 0])
  const pointC = ternary([2], [0, 2, 0])

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
    Chord.new(ternary([], [0, 1, 1]), ternary([], [0, 2, 0])),
    Chord.new(ternary([], [0, 0, 2]), ternary([], [1, 0, 1])),
    Chord.new(ternary([], [1, 1, 0]), ternary([], [2, 0, 0])),
  ].map(Polygon.fromChord)

  return {initialLeaves, criticalChords, branches}
}

export const criticalTriangleGapIRT_ternary = (): LaminationDefinition => {
  const pointA = ternary([], [0, 0, 2])
  const pointB = ternary([], [1, 0, 1])
  const pointC = ternary([2], [0, 1, 1])
  const pointD = ternary([2], [0, 2, 0])

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
      ternary([], [2, 0, 1])
    ]),

    Polygon.new([
      ternary([], [0, 1, 1]),
      ternary([], [0, 2, 0]),
      ternary([], [0, 1, 2])
    ]),

    Polygon.new([
      ternary([], [1, 1, 0]),
      ternary([], [2, 0, 0]),
      ternary([], [1, 2, 0])
    ])
  ]

  return {initialLeaves, criticalChords, branches}
}

export const irq_fat_quaternary = (): LaminationDefinition => {
  const pointA = quaternary([0], [2, 3, 3])
  const pointB = quaternary([], [0, 3, 0])
  const pointC = quaternary([1], [3, 0, 0])
  const pointD = quaternary([1], [3, 0, 2])
  const pointE = quaternary([], [2, 3, 0])
  const pointF = quaternary([], [3, 2, 3])

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
    quaternary([], [1, 3, 0]),
    pointE,
    pointF,
  ])

  return {initialLeaves: [middleSquare], criticalChords, branches}
}

export const irq_thin_quaternary = (): LaminationDefinition => {
  const pointA = quaternary([], [0, 1, 0])
  const pointB = quaternary([], [1, 0, 0])
  const pointC = quaternary([2], [0, 0, 1])
  const pointD = quaternary([], [2, 0, 0])
  const pointE = quaternary([3], [0, 0, 2])
  const pointF = quaternary([3], [1, 0, 0])

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
    quaternary([], [0, 3, 3]),
    pointB,
    pointD,
    quaternary([], [3, 0, 0]),
  ])

  return {initialLeaves: [middleSquare], criticalChords, branches}
}

